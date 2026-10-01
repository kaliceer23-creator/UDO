#!/usr/bin/env python3
"""
ETL Migration Script: Extract posts from udothai_shop.sql and convert into clean, natural Markdown.
Target: MariaDB 10.6.13 / JSON Document Store / articles.json
Strict GEMINI.md compliance: No frameworks, zero emojis in code, logs, or output.
"""

import os
import re
import json
import html
from datetime import datetime

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

EMOJI_PATTERN = re.compile(
    '['
    '\U0001F600-\U0001F64F'
    '\U0001F300-\U0001F5FF'
    '\U0001F680-\U0001F6FF'
    '\U0001F1E0-\U0001F1FF'
    '\U00002702-\U000027B0'
    '\U000024C2-\U0001F251'
    '\U0001F900-\U0001F9FF'
    '\U0001FA70-\U0001FAFF'
    '\U00002600-\U000026FF'
    '\U00002300-\U000023FF'
    '\u2705\u2714\u2713\u274C\u274E\u2728\u2757\u2744\u2705\u25aa\u25ab\u25fe\u25fd'
    ']+',
    flags=re.UNICODE
)

def strip_emojis(text):
    if not text:
        return ""
    cleaned = EMOJI_PATTERN.sub('', text)
    cleaned = re.sub(r'[\uFE00-\uFE0F\u200D]', '', cleaned)
    return cleaned

def convert_html_table_to_markdown(table_html):
    """Convert HTML table into standard GFM pipe table."""
    rows = re.findall(r'<tr[^>]*>(.*?)</tr>', table_html, flags=re.DOTALL | re.IGNORECASE)
    if not rows:
        return ""

    parsed_rows = []
    for r in rows:
        cells = re.findall(r'<t[hd][^>]*>(.*?)</t[hd]>', r, flags=re.DOTALL | re.IGNORECASE)
        clean_cells = []
        for c in cells:
            # Clean inner tags but keep bold/code
            c_text = re.sub(r'<[^>]+>', ' ', c)
            c_text = html.unescape(c_text)
            c_text = re.sub(r'\s+', ' ', c_text).strip()
            # Escape pipes inside cells
            c_text = c_text.replace('|', '\\|')
            clean_cells.append(c_text)
        if clean_cells:
            parsed_rows.append(clean_cells)

    if not parsed_rows:
        return ""

    # Determine max columns
    max_cols = max(len(r) for r in parsed_rows)
    # Pad rows to have uniform column count
    for r in parsed_rows:
        while len(r) < max_cols:
            r.append('')

    header = parsed_rows[0]
    separator = ['---'] * max_cols
    body_rows = parsed_rows[1:]

    lines = []
    lines.append('| ' + ' | '.join(header) + ' |')
    lines.append('| ' + ' | '.join(separator) + ' |')
    for r in body_rows:
        lines.append('| ' + ' | '.join(r) + ' |')

    return '\n' + '\n'.join(lines) + '\n'

def convert_html_to_markdown(raw_html):
    """
    Convert raw post HTML body into clean, natural Markdown.
    Removes legacy Google Docs / MS Word junk and handles images, tables, lists.
    """
    if not raw_html:
        return ""

    text = raw_html

    # Clean HTML comments and doc guid artifacts
    text = re.sub(r'<!--.*?-->', '', text, flags=re.DOTALL)
    text = re.sub(r'<span[^>]*id="docs-internal-guid-[^"]*"[^>]*>&nbsp;</span>', '', text, flags=re.IGNORECASE)

    # Convert tables first before stripping tags
    def replace_table(match):
        return convert_html_table_to_markdown(match.group(0))
    text = re.sub(r'<table[^>]*>.*?</table>', replace_table, text, flags=re.DOTALL | re.IGNORECASE)

    # Convert images to Markdown syntax: ![alt](url)
    def replace_img(match):
        img_tag = match.group(0)
        src_m = re.search(r'src=[\'"]([^\'"]+)[\'"]', img_tag, re.IGNORECASE)
        alt_m = re.search(r'alt=[\'"]([^\'"]*)[\'"]', img_tag, re.IGNORECASE)
        if not src_m:
            return ""
        src = normalize_image_url(src_m.group(1))
        alt = alt_m.group(1).strip() if alt_m else "ภาพประกอบเนื้อหา"
        return f"\n\n![{alt}]({src})\n\n"
    text = re.sub(r'<img[^>]+>', replace_img, text, flags=re.IGNORECASE)

    # Convert headings
    text = re.sub(r'<h1[^>]*>(.*?)</h1>', lambda m: f"\n\n# {re.sub(r'<[^>]+>', '', m.group(1)).strip()}\n\n", text, flags=re.DOTALL | re.IGNORECASE)
    text = re.sub(r'<h2[^>]*>(.*?)</h2>', lambda m: f"\n\n## {re.sub(r'<[^>]+>', '', m.group(1)).strip()}\n\n", text, flags=re.DOTALL | re.IGNORECASE)
    text = re.sub(r'<h3[^>]*>(.*?)</h3>', lambda m: f"\n\n### {re.sub(r'<[^>]+>', '', m.group(1)).strip()}\n\n", text, flags=re.DOTALL | re.IGNORECASE)
    text = re.sub(r'<h[4-6][^>]*>(.*?)</h[4-6]>', lambda m: f"\n\n#### {re.sub(r'<[^>]+>', '', m.group(1)).strip()}\n\n", text, flags=re.DOTALL | re.IGNORECASE)

    # Convert blockquotes
    text = re.sub(r'<blockquote[^>]*>(.*?)</blockquote>', lambda m: f"\n\n> {re.sub(r'<[^>]+>', '', m.group(1)).strip()}\n\n", text, flags=re.DOTALL | re.IGNORECASE)

    # Convert unordered lists
    def replace_ul(match):
        items = re.findall(r'<li[^>]*>(.*?)</li>', match.group(1), flags=re.DOTALL | re.IGNORECASE)
        lines = []
        for it in items:
            it_text = re.sub(r'<[^>]+>', ' ', it)
            it_text = html.unescape(it_text)
            it_text = re.sub(r'\s+', ' ', it_text).strip()
            if it_text:
                lines.append(f"- {it_text}")
        return '\n\n' + '\n'.join(lines) + '\n\n'
    text = re.sub(r'<ul[^>]*>(.*?)</ul>', replace_ul, text, flags=re.DOTALL | re.IGNORECASE)

    # Convert ordered lists
    def replace_ol(match):
        items = re.findall(r'<li[^>]*>(.*?)</li>', match.group(1), flags=re.DOTALL | re.IGNORECASE)
        lines = []
        for idx, it in enumerate(items, 1):
            it_text = re.sub(r'<[^>]+>', ' ', it)
            it_text = html.unescape(it_text)
            it_text = re.sub(r'\s+', ' ', it_text).strip()
            if it_text:
                lines.append(f"{idx}. {it_text}")
        return '\n\n' + '\n'.join(lines) + '\n\n'
    text = re.sub(r'<ol[^>]*>(.*?)</ol>', replace_ol, text, flags=re.DOTALL | re.IGNORECASE)

    # Convert links
    def replace_link(match):
        href = match.group(1)
        inner = re.sub(r'<[^>]+>', '', match.group(2)).strip()
        if not inner:
            return ""
        return f"[{inner}]({href})"
    text = re.sub(r'<a[^>]+href=[\'"]([^\'"]+)[\'"][^>]*>(.*?)</a>', replace_link, text, flags=re.DOTALL | re.IGNORECASE)

    # Convert bold & italic
    text = re.sub(r'<(?:strong|b)[^>]*>(.*?)</(?:strong|b)>', lambda m: f"**{re.sub(r'<[^>]+>', '', m.group(1)).strip()}**", text, flags=re.DOTALL | re.IGNORECASE)
    text = re.sub(r'<(?:em|i)[^>]*>(.*?)</(?:em|i)>', lambda m: f"*{re.sub(r'<[^>]+>', '', m.group(1)).strip()}*", text, flags=re.DOTALL | re.IGNORECASE)

    # Convert paragraphs and breaks
    text = re.sub(r'<br\s*/?>', '\n', text, flags=re.IGNORECASE)
    text = re.sub(r'<p[^>]*>(.*?)</p>', lambda m: f"\n\n{m.group(1)}\n\n", text, flags=re.DOTALL | re.IGNORECASE)

    # Strip remaining HTML tags
    text = re.sub(r'<[^>]+>', ' ', text)

    # Decode HTML entities
    text = html.unescape(text)

    # Clean legacy 'rn' garbage artifacts
    # 1. Clean 'rn ' at beginning of lines into bullet points '- '
    text = re.sub(r'(?m)^[ \t]*rn[ \t]+', '- ', text)
    # 2. Clean isolated 'rn' on its own line
    text = re.sub(r'(?m)^[ \t]*rn[ \t]*$', '', text)
    # 3. Clean inline 'rn ' if preceded by newline or space
    text = re.sub(r'\n[ \t]*rn[ \t]*\n', '\n', text)

    # Normalize double blank lines
    lines = [line.rstrip() for line in text.split('\n')]
    clean_lines = []
    prev_blank = False
    for l in lines:
        is_blank = (len(l.strip()) == 0)
        if is_blank:
            if not prev_blank:
                clean_lines.append('')
            prev_blank = True
        else:
            clean_lines.append(l)
            prev_blank = False

    return '\n'.join(clean_lines).strip()

def parse_sql_dump(filepath):
    """Parse udothai_shop.sql extracting posts with proper SQL unescaping."""
    print(f"Reading SQL dump: {filepath}")
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        return []

    articles = []
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        in_posts = False
        content_lines = []
        for line in f:
            if 'INSERT INTO `posts`' in line:
                in_posts = True
                content_lines.append(line)
                if line.strip().endswith(';'):
                    in_posts = False
            elif in_posts:
                content_lines.append(line)
                if line.strip().endswith(';'):
                    in_posts = False

        full_posts_sql = "".join(content_lines)
        if not full_posts_sql:
            print("No posts found in SQL dump.")
            return []

        # Find all tuples in the INSERT statement
        values_start = full_posts_sql.find('VALUES')
        if values_start != -1:
            s = full_posts_sql[values_start + 6:].strip()
            if s.endswith(';'):
                s = s[:-1]
            
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
    fields = []
    curr = []
    in_str = False
    escape = False
    
    for c in raw_tuple:
        if escape:
            # Preserve escape appropriately
            if c == 'r':
                curr.append('\r')
            elif c == 'n':
                curr.append('\n')
            elif c == 't':
                curr.append('\t')
            elif c == "'":
                curr.append("'")
            elif c == '"':
                curr.append('"')
            elif c == '\\':
                curr.append('\\')
            else:
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
    raw_body = unwrap(fields[6])
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

    # Convert HTML to clean Markdown
    markdown_content = convert_html_to_markdown(raw_body)

    # Read time estimate
    word_count = len(markdown_content.split())
    read_time = max(1, round(word_count / 160))

    # Parse tags from meta_keywords
    tags = []
    if meta_keywords:
        raw_tags = re.split(r'[,;|]', meta_keywords)
        tags = [strip_emojis(t.strip()) for t in raw_tags if strip_emojis(t.strip())]

    # If excerpt is empty, synthesize from lead text
    if not excerpt and markdown_content:
        first_p = markdown_content.split('\n\n')[0]
        excerpt = (first_p[:160] + "...") if len(first_p) > 160 else first_p

    article_record = {
        "id": f"art-{post_id}",
        "slug": strip_emojis(slug),
        "title": strip_emojis(title).strip(),
        "category": category_name,
        "status": "published" if status == "PUBLISHED" else "draft",
        "excerpt": strip_emojis(excerpt).strip(),
        "cover_image": cover_image,
        "read_time_minutes": read_time,
        "author": "UDO Technical Team",
        "tags": tags,
        "recommended_products": [],
        "meta_title": strip_emojis(seo_title or title).strip(),
        "meta_description": strip_emojis(meta_desc or excerpt).strip(),
        "markdown": strip_emojis(markdown_content).strip(),
        "created_at": created_at,
        "updated_at": updated_at
    }

    return article_record

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    sql_file = os.path.join(project_root, 'udothai_shop.sql')

    articles = parse_sql_dump(sql_file)
    print(f"Extracted and converted {len(articles)} articles.")

    # Save to public_html/api/articles.json
    api_dir = os.path.join(project_root, 'public_html', 'api')
    os.makedirs(api_dir, exist_ok=True)
    json_path = os.path.join(api_dir, 'articles.json')

    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(articles, f, ensure_ascii=False, indent=2)
    print(f"Successfully saved clean Markdown articles to {json_path}")

    # Generate SQL file for MariaDB migration
    sql_output_path = os.path.join(project_root, 'sql', '06_articles_markdown.sql')
    with open(sql_output_path, 'w', encoding='utf-8') as f:
        f.write("-- MariaDB 10.6.13: Technical Articles Clean Markdown Migration\n")
        f.write("-- Strict GEMINI.md compliance: Zero frameworks, zero emojis\n\n")
        f.write("SET FOREIGN_KEY_CHECKS = 0;\n\n")

        for art in articles:
            post_id = art["id"]
            slug = art["slug"].replace("'", "''")
            title = art["title"].replace("'", "''")
            category = art["category"].replace("'", "''")
            status = art["status"].replace("'", "''")
            created_at = art["created_at"] or datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            updated_at = art["updated_at"] or datetime.now().strftime('%Y-%m-%d %H:%M:%S')

            doc_payload = json.dumps(art, ensure_ascii=False).replace("'", "''")

            f.write(f"INSERT INTO articles (id, slug, title, category, status, sort_priority, data, created_at, updated_at)\n")
            f.write(f"VALUES ('{post_id}', '{slug}', '{title}', '{category}', '{status}', 0, '{doc_payload}', '{created_at}', '{updated_at}')\n")
            f.write(f"ON DUPLICATE KEY UPDATE title = VALUES(title), category = VALUES(category), status = VALUES(status), data = VALUES(data), updated_at = VALUES(updated_at);\n\n")

        f.write("SET FOREIGN_KEY_CHECKS = 1;\n")
    print(f"Successfully generated MariaDB migration SQL at {sql_output_path}")

if __name__ == '__main__':
    main()
