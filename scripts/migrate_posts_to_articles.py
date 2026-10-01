#!/usr/bin/env python3
"""
ETL Migration Script: Extract posts from udothai_shop.sql and convert to Modular Story Blocks.
Target: MariaDB 10.6.13 / JSON Document Store
Strict GEMINI.md compliance: No frameworks, zero emojis in code, logs, or output.
"""

import os
import re
import json
import html
from datetime import datetime

def clean_html_text(raw_html):
    if not raw_html:
        return ""
    # Replace breaks and paragraphs with newlines
    text = re.sub(r'<br\s*/?>', '\n', raw_html, flags=re.IGNORECASE)
    text = re.sub(r'</p>', '\n', text, flags=re.IGNORECASE)
    text = re.sub(r'</li>', '\n', text, flags=re.IGNORECASE)
    # Remove all other HTML tags
    text = re.sub(r'<[^>]+>', ' ', text)
    # Decode HTML entities
    text = html.unescape(text)
    # Normalize multiple whitespace/newlines
    lines = [re.sub(r'[ \t]+', ' ', line).strip() for line in text.split('\n')]
    # Filter empty lines
    non_empty = [l for l in lines if l]
    return '\n\n'.join(non_empty)

def normalize_image_url(url):
    if not url:
        return ""
    url = url.strip()
    if url.startswith('//'):
        return 'https:' + url
    if url.startswith('http://') or url.startswith('https://'):
        return url
    if url.startswith('/'):
        return 'https://www.udo.co.th' + url
    return f'https://www.udo.co.th/storage/{url}'

def parse_html_to_story_blocks(html_body):
    if not html_body:
        return []

    # Clean comments and doc annotations
    clean_body = re.sub(r'<!--.*?-->', '', html_body, flags=re.DOTALL)
    
    # Split content by major block elements: h1, h2, h3, h4, p, div, ul, ol, img
    token_pattern = re.compile(
        r'(<h[12][^>]*>.*?</h[12]>|<h[3-6][^>]*>.*?</h[3-6]>|<img[^>]+>|<p[^>]*>.*?</p>|<div[^>]*>.*?</div>|<li[^>]*>.*?</li>)',
        re.IGNORECASE | re.DOTALL
    )

    tokens = token_pattern.findall(clean_body)
    if not tokens:
        # Fallback: treat entire body as a single paragraph
        plain = clean_html_text(clean_body)
        if plain:
            return [{
                "id": "block-1",
                "headline": "",
                "subheadline": "",
                "paragraph": plain,
                "image": ""
            }]
        return []

    blocks = []
    current_block = {
        "id": f"block-{len(blocks) + 1}",
        "headline": "",
        "subheadline": "",
        "paragraph": "",
        "image": ""
    }

    def flush_block():
        nonlocal current_block
        if (current_block["headline"] or current_block["subheadline"] or 
            current_block["paragraph"] or current_block["image"]):
            current_block["id"] = f"block-{len(blocks) + 1}"
            blocks.append(current_block)
            current_block = {
                "id": f"block-{len(blocks) + 2}",
                "headline": "",
                "subheadline": "",
                "paragraph": "",
                "image": ""
            }

    for token in tokens:
        token_lower = token.lower().strip()

        # Check for images inside token
        img_match = re.search(r'<img[^>]+src=[\'"]([^\'"]+)[\'"]', token, re.IGNORECASE)
        img_src = ""
        if img_match:
            img_src = normalize_image_url(img_match.group(1))

        if token_lower.startswith('<h1') or token_lower.startswith('<h2'):
            h_text = clean_html_text(token)
            if h_text:
                if current_block["headline"] or current_block["paragraph"] or current_block["image"]:
                    flush_block()
                current_block["headline"] = h_text
        elif token_lower.startswith('<h3') or token_lower.startswith('<h4') or token_lower.startswith('<h5') or token_lower.startswith('<h6'):
            h_text = clean_html_text(token)
            if h_text:
                if current_block["subheadline"] and current_block["paragraph"]:
                    flush_block()
                current_block["subheadline"] = h_text
        else:
            # Paragraph or div or li
            p_text = clean_html_text(token)
            if img_src:
                if current_block["image"]:
                    flush_block()
                current_block["image"] = img_src
            if p_text:
                if current_block["paragraph"]:
                    current_block["paragraph"] += "\n\n" + p_text
                else:
                    current_block["paragraph"] = p_text

    flush_block()

    # Re-index blocks
    for idx, b in enumerate(blocks):
        b["id"] = f"block-{idx + 1}"

    return blocks

def parse_sql_dump(filepath):
    print("Reading SQL dump:", filepath)
    articles = []

    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        for line in f:
            if not line.startswith('INSERT INTO `posts` VALUES'):
                continue
            
            # Parse row tuples from line
            prefix = 'INSERT INTO `posts` VALUES '
            s = line[len(prefix):].rstrip(';\r\n ')
            
            in_str = False
            escape = False
            depth = 0
            start = 0
            
            for i, c in enumerate(s):
                if escape:
                    escape = False
                    continue
                if c == '\\':
                    escape = True
                    continue
                if c == "'":
                    in_str = not in_str
                    continue
                if not in_str:
                    if c == '(':
                        depth += 1
                        if depth == 1:
                            start = i + 1
                    elif c == ')':
                        depth -= 1
                        if depth == 0:
                            raw_tuple = s[start:i]
                            art = parse_single_post(raw_tuple)
                            if art:
                                articles.append(art)
    return articles

def parse_single_post(raw_tuple):
    # Split fields respecting SQL strings
    fields = []
    curr = []
    in_str = False
    escape = False
    
    for c in raw_tuple:
        if escape:
            curr.append(c)
            escape = False
            continue
        if c == '\\':
            escape = True
            continue
        if c == "'":
            in_str = not in_str
            continue
        if c == ',' and not in_str:
            fields.append(''.join(curr).strip())
            curr = []
        else:
            curr.append(c)
    fields.append(''.join(curr).strip())

    # Schema:
    # 0: id
    # 1: author_id
    # 2: category_id
    # 3: title
    # 4: seo_title
    # 5: excerpt
    # 6: body
    # 7: image
    # 8: slug
    # 9: meta_description
    # 10: meta_keywords
    # 11: status
    # 12: featured
    # 13: created_at
    # 14: updated_at

    if len(fields) < 15:
        return None

    def unwrap(val):
        if val == 'NULL' or val == '':
            return ""
        return val

    post_id = fields[0]
    category_id = fields[2]
    title = unwrap(fields[3])
    seo_title = unwrap(fields[4])
    excerpt = unwrap(fields[5])
    body = unwrap(fields[6])
    image = unwrap(fields[7])
    slug = unwrap(fields[8])
    meta_desc = unwrap(fields[9])
    meta_keywords = unwrap(fields[10])
    status = unwrap(fields[11]).upper()
    featured = fields[12] == '1'
    created_at = unwrap(fields[13])
    updated_at = unwrap(fields[14])

    category_name = "เทคนิค & สาระงานช่าง"
    if category_id == '1':
        category_name = "ข่าวสารอัพเดท"
    elif category_id == '2':
        category_name = "เทคนิค & สาระงานช่าง"

    # Normalize cover image
    cover_image = ""
    if image:
        cover_image = normalize_image_url(image)

    # Convert HTML body to Modular Story Blocks
    content_blocks = parse_html_to_story_blocks(body)

    # Estimate read time (avg 200 words/min)
    total_text = ' '.join([b.get('paragraph', '') + ' ' + b.get('headline', '') for b in content_blocks])
    word_count = len(total_text.split())
    read_time = max(1, round(word_count / 180))

    # If excerpt is empty, synthesize from first block
    if not excerpt and content_blocks:
        first_p = next((b['paragraph'] for b in content_blocks if b.get('paragraph')), "")
        excerpt = (first_p[:150] + "...") if len(first_p) > 150 else first_p

    # If cover image is empty, borrow first image in content blocks
    if not cover_image and content_blocks:
        cover_image = next((b['image'] for b in content_blocks if b.get('image')), "")

    # Parse tags from meta_keywords
    tags = []
    if meta_keywords:
        raw_tags = re.split(r'[,;|]', meta_keywords)
        tags = [t.strip() for t in raw_tags if t.strip()]

    article_record = {
        "id": f"art-{post_id}",
        "slug": slug,
        "title": title,
        "category": category_name,
        "status": "published" if status == "PUBLISHED" else "draft",
        "excerpt": excerpt,
        "cover_image": cover_image,
        "read_time_minutes": read_time,
        "author": "UDO Technical Team",
        "tags": tags,
        "recommended_products": [],
        "meta_title": seo_title or title,
        "meta_description": meta_desc or excerpt,
        "content_blocks": content_blocks,
        "featured": featured,
        "created_at": created_at,
        "updated_at": updated_at
    }

    return article_record

def main():
    dump_path = 'udothai_shop.sql'
    if not os.path.exists(dump_path):
        print("SQL dump not found at:", dump_path)
        return

    articles = parse_sql_dump(dump_path)
    print(f"Extracted {len(articles)} articles from SQL dump.")

    # Deduplicate by slug
    unique_articles = []
    seen_slugs = set()
    for art in articles:
        if not art["slug"]:
            art["slug"] = f"article-{art['id']}"
        slug = art["slug"]
        if slug in seen_slugs:
            art["slug"] = f"{slug}-{art['id']}"
        seen_slugs.add(art["slug"])
        unique_articles.append(art)

    print(f"Unique articles after deduplication: {len(unique_articles)}")

    # Sort descending by created_at
    unique_articles.sort(key=lambda a: a.get("created_at") or "", reverse=True)

    # 1. Output to JSON for static dev & API fallback
    out_json = 'public_html/api/articles.json'
    os.makedirs(os.path.dirname(out_json), exist_ok=True)
    with open(out_json, 'w', encoding='utf-8') as f:
        json.dump(unique_articles, f, ensure_ascii=False, indent=2)
    print("Saved articles JSON:", out_json, f"({os.path.getsize(out_json)} bytes)")

    # 2. Output to SQL INSERT statements for MariaDB
    out_sql = 'sql/05_articles_data.sql'
    with open(out_sql, 'w', encoding='utf-8') as f:
        f.write("-- =====================================================================\n")
        f.write("-- UDO Articles Seed Data (120 Authentic Articles)\n")
        f.write("-- Strictly adheres to GEMINI.md: Zero emojis in source code or output\n")
        f.write("-- =====================================================================\n\n")
        
        for art in unique_articles:
            art_id = art["id"]
            slug = art["slug"].replace("'", "''")
            title = art["title"].replace("'", "''")
            category = art["category"].replace("'", "''")
            status = art["status"]
            sort_priority = 100
            created_at = art["created_at"] or datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            updated_at = art["updated_at"] or created_at
            
            data_json = json.dumps(art, ensure_ascii=False).replace("'", "''")
            
            sql = f"INSERT INTO `articles` (`id`, `slug`, `title`, `category`, `status`, `sort_priority`, `data`, `created_at`, `updated_at`) " \
                  f"VALUES ('{art_id}', '{slug}', '{title}', '{category}', '{status}', {sort_priority}, '{data_json}', '{created_at}', '{updated_at}') " \
                  f"ON DUPLICATE KEY UPDATE `title`='{title}', `data`='{data_json}', `updated_at`='{updated_at}';\n"
            f.write(sql)
            
    print("Saved SQL seed:", out_sql, f"({os.path.getsize(out_sql)} bytes)")

if __name__ == '__main__':
    main()
