import re

with open('udo_migration_engine.py', 'r', encoding='utf-8') as f:
    content = f.read()

# Locate from 'for line in sql_text.split' to end
split_marker = "    for line in sql_text.split('\\n'):"
idx = content.find(split_marker)
if idx == -1:
    raise Exception("Split marker not found")

head = content[:idx]

body = '''    for line in sql_text.split('\\n'):
        if not line.startswith("INSERT INTO `products`"):
            continue
            
        for pid in target_pids:
            pos = 0
            while True:
                pos = line.find(f"({pid},", pos)
                if pos == -1:
                    break
                end = line.find("),(", pos)
                entry = line[pos:end] if end != -1 else line[pos:line.find(");", pos)]
                
                m_id_name = re.match(r"\\(([0-9]+),\\s*'([^']*)',\\s*'([^']*)',\\s*'(.*?)',\\s*(?:'([^']*)'|NULL),\\s*(?:'([^']*)'|NULL),\\s*(?:'([^']*)'|NULL),\\s*'([^']*)'", entry, re.DOTALL)
                if m_id_name:
                    p_id, name, short_desc, desc, catalog, cr_at, up_at, thumb = m_id_name.groups()
                    p_id = int(p_id)

                    # Skip spam/malicious products
                    if any(bad in name.lower() for bad in ['http:', 'https:', '.com', 'money', 'bitcoin', 'dating', 'seo']):
                        pos += 1
                        continue
                    if p_id in seen_pids:
                        pos += 1
                        continue
                    seen_pids.add(p_id)
                
                    m_band = re.search(rf"\\({pid},.*?,\\s*([0-9]+|NULL),\\s*'[^']*',\\s*(?:'[^']*'|NULL),\\s*[0-9]+", entry, re.DOTALL)
                    band_id = int(m_band.group(1)) if m_band and m_band.group(1) != "NULL" else None
                    brand_name = bands.get(band_id, "UDO") if band_id else "UDO"
                    
                    # Multi-Size Images extraction
                    img_urls = []
                    if thumb and thumb != "NULL":
                        img_urls.append(f"https://www.udo.co.th/storage/{thumb}")
                        
                    m_imgs = re.search(r"(\\[\\\\?\"products[^\\]]+\\])", entry)
                    if m_imgs:
                        try:
                            raw_json = m_imgs.group(1).replace('\\\\"', '"').replace('\\\\/', '/')
                            extra_imgs = json.loads(raw_json)
                            for extra in extra_imgs:
                                full_url = f"https://www.udo.co.th/storage/{extra}"
                                if full_url not in img_urls:
                                    img_urls.append(full_url)
                        except Exception:
                            pass

                    formatted_images = [
                        {
                            "thumb": u,
                            "card": u,
                            "large": u,
                            "original": u
                        }
                        for u in img_urls
                    ]

                    # Rich images (e.g. Infographic banners like S-2209 .jpg)
                    rich_images = []
                    for img_match in re.finditer(r'<img[^>]+src=\\\\?["\\\']([^"\\\'\\\\\\/][^"\\\'\\\\]*)', desc):
                        raw_src = img_match.group(1).strip().replace(" ", "%20")
                        if not raw_src.startswith("http"):
                            raw_src = f"https://www.udo.co.th/storage/{raw_src.lstrip('/')}"
                        rich_images.append(raw_src)

                    # Extract Engineering Tables
                    raw_tables = re.findall(r"(<table.*?</table>)", desc, re.DOTALL)
                    cleaned_tables = []
                    for tbl in raw_tables:
                        cleaned_tbl = clean_engineering_table(tbl)
                        if cleaned_tbl:
                            cleaned_tables.append(cleaned_tbl)
                    
                    tables_html = "\\n".join(cleaned_tables) if cleaned_tables else None

                    # Category Hierarchy Mapping from Database
                    c_ids = list(prod_cats.get(p_id, []))
                    deepest_cid = None
                    max_depth = -1
                    for cid in c_ids:
                        depth = 0
                        curr = cid
                        while curr and curr in cats:
                            depth += 1
                            curr = cats[curr]['parent_id']
                        if depth > max_depth:
                            max_depth = depth
                            deepest_cid = cid

                    cat_tree = []
                    if deepest_cid and deepest_cid in cats:
                        chain = []
                        curr = deepest_cid
                        visited = set()
                        while curr and curr in cats and curr not in visited:
                            visited.add(curr)
                            chain.append(cats[curr])
                            curr = cats[curr]['parent_id']
                        chain.reverse()
                        for idx, c_obj in enumerate(chain):
                            cat_tree.append({
                                "level": idx + 1,
                                "name": c_obj['name'],
                                "url_slug": f"cat-{c_obj['id']}"
                            })
                    else:
                        cat_tree = [
                            {"level": 1, "name": "กลุ่มลวดเชื่อม", "url_slug": "welding"},
                            {"level": 2, "name": "ลวดเชื่อมทั่วไป", "url_slug": "welding-wire"}
                        ]

                    # Commercial Specs for PDP buy box (Verbatim from Categories and exact DB text)
                    commercial_specs = extract_hybrid_specs(desc, name, brand_name, cat_tree)

                    # Clean Intro Description Paragraphs (Excluding garbage)
                    clean_paragraphs = []
                    for p_match in re.finditer(r'<p[^>]*>(.*?)</p>', desc, re.DOTALL):
                        p_text = clean_html_text(p_match.group(1))
                        # Skip junk text
                        if not p_text or p_text.startswith("***") or "สั่งซื้อสินค้า" in p_text:
                            continue
                        if any(kw in p_text for kw in ["คุณสมบัติของแนวเชื่อม", "กระแสไฟฟ้า", "รับรองโดย", "การจำแนกประเภท", "ท่าเชื่อม", "ส่วนผสมทางเคมี", "กระแสไฟ"]):
                            continue
                        # Skip redundant title/heading-only paragraphs (e.g. "ลวดเชื่อม เจมินี่ 308L ลวดเชื่อม สำหรับเหล็กสแตนเลส")
                        if len(p_text) < 80 and not any(verb in p_text for verb in ["เป็น", "คือ", "มี", "ใช้สำหรับ", "สามารถ", "ออกแบบ", "เหมาะสำหรับ"]):
                            continue
                        if len(p_text) > 30:
                            clean_paragraphs.append(p_text)

                    clean_desc_plain = clean_html_text(short_desc if short_desc else desc[:200])
                    desc_html_formatted = format_description_html(short_desc if short_desc else desc[:200], brand_name)

                    rich_desc_final = "\\n\\n".join(clean_paragraphs) if clean_paragraphs else clean_desc_plain
                    if not rich_desc_final:
                        rich_desc_final = clean_desc_plain

                    prod_variants = items.get(p_id, [])
                    primary_sku = prod_variants[0]["sku"] if prod_variants else f"UDO-{p_id}"

                    # Filter attributes from verbatim categories
                    specs_map = {s["key"]: s["value"] for s in commercial_specs}
                    material_attr = specs_map.get("วัสดุที่เชื่อม", "เหล็ก")
                    process_attr = specs_map.get("กระบวนการเชื่อม", "เชื่อมไฟฟ้า (MMA)")

                    r_img1 = rich_images[0] if len(rich_images) > 0 else (img_urls[0] if img_urls else None)
                    r_img2 = rich_images[1] if len(rich_images) > 1 else None
                    r_img3 = rich_images[2] if len(rich_images) > 2 else None

                    # Evaluate Audit & Flagging based on 3-Traffic Light Standard
                    audit_meta = evaluate_welding_audit(
                        prod_variants, cleaned_tables, commercial_specs, formatted_images, rich_images
                    )

                    audit_stats[audit_meta["status"]] += 1
                    flag = audit_meta["flag"]
                    audit_flags[flag] = audit_flags.get(flag, 0) + 1

                    prices = [v["price"] for v in prod_variants if v.get("price")]
                    min_price = min(prices) if prices else 0.0
                    max_price = max(prices) if prices else 0.0

                    category_path = " > ".join([c["name"] for c in cat_tree])

                    audit_rows.append({
                        "product_id": f"udo-{p_id}",
                        "legacy_id": p_id,
                        "name": name,
                        "brand": brand_name,
                        "audit_status": audit_meta["status"],
                        "audit_flag": audit_meta["flag"],
                        "reason_th": audit_meta["reason_th"],
                        "variants_count": len(prod_variants),
                        "min_price": min_price,
                        "max_price": max_price,
                        "specs_count": len(commercial_specs),
                        "tables_count": len(cleaned_tables),
                        "images_count": len(formatted_images),
                        "rich_images_count": len(rich_images),
                        "category_path": category_path
                    })

                    product_obj = {
                        "id": f"udo-{p_id}",
                        "name": name,
                        "brand": brand_name,
                        "sku": primary_sku,
                        "description": clean_desc_plain,
                        "descriptionHtml": desc_html_formatted,
                        "created_at": cr_at if cr_at and cr_at != "NULL" else "2026-08-15T10:30:00Z",
                        "sold_count": 500 + p_id,
                        "collections": ["popular", "just_for_you"],
                        "categories": cat_tree,
                        "filter_attributes": {
                            "material": material_attr,
                            "process": process_attr
                        },
                        "tags": [material_attr, process_attr, brand_name],
                        "images": formatted_images,
                        "warranty": None,
                        "variants": prod_variants,
                        "specsTable": commercial_specs,
                        "richContent": {
                            "headline": name,
                            "subheadline": f"ผลิตภัณฑ์งานเชื่อมคุณภาพสูง แบรนด์ {brand_name}",
                            "description": rich_desc_final,
                            "tablesHtml": tables_html,
                            "image1": r_img1,
                            "image2": r_img2,
                            "image3": r_img3
                        },
                        "_audit": audit_meta
                    }
                    products_out.append(product_obj)
                pos += 1

    # Write JSON output to primary destination
    with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
        json.dump(products_out, f, ensure_ascii=False, indent=2)
    print(f"Successfully wrote {len(products_out)} products to {OUTPUT_PATH}")

    # Dual-write to pilot_products_5.json for seamless compatibility
    pilot_path = 'frontend/src/pilot_products_5.json'
    with open(pilot_path, 'w', encoding='utf-8') as f:
        json.dump(products_out, f, ensure_ascii=False, indent=2)
    print(f"Successfully dual-wrote {len(products_out)} products to {pilot_path}")

    # Write CSV audit report with utf-8-sig (Excel friendly)
    fieldnames = [
        "product_id", "legacy_id", "name", "brand", "audit_status",
        "audit_flag", "reason_th", "variants_count", "min_price",
        "max_price", "specs_count", "tables_count", "images_count",
        "rich_images_count", "category_path"
    ]
    with open(CSV_PATH, 'w', newline='', encoding='utf-8-sig') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(audit_rows)
    print(f"Successfully generated CSV audit report: {CSV_PATH}")

    print("\\n--- MIGRATION AUDIT SUMMARY ---")
    print(f"Total welding products processed: {len(products_out)}")
    print("Audit status breakdown:")
    for st, cnt in audit_stats.items():
        pct = (cnt * 100.0 / len(products_out)) if products_out else 0
        print(f"  {st}: {cnt} ({pct:.1f}%)")
    print("\\nAudit flags breakdown:")
    for fl, cnt in audit_flags.items():
        print(f"  {fl}: {cnt}")

if __name__ == '__main__':
    run_migration()
'''

with open('udo_migration_engine.py', 'w', encoding='utf-8') as f:
    f.write(head + body)

print("Successfully updated udo_migration_engine.py")
