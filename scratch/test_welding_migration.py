import sys, os
sys.path.insert(0, os.path.abspath('.'))
from udo_migration_engine import load_database, clean_engineering_table, extract_hybrid_specs, evaluate_welding_audit, clean_html_text, format_description_html, parse_unit_info
import re, json, csv

sql_text = load_database()

# 1. Parse Brands
bands = {}
m_bands = re.search(r"INSERT INTO `bands` VALUES (.*?);", sql_text, re.DOTALL)
if m_bands:
    for m in re.finditer(r"\(([0-9]+),\s*'([^']*)'", m_bands.group(1)):
        bands[int(m.group(1))] = m.group(2)

# 2. Parse Units
units = {}
m_u = re.search(r"INSERT INTO `units` VALUES (.*?);", sql_text, re.DOTALL)
if m_u:
    for m in re.finditer(r"\(([0-9]+),\s*'([^']*)'", m_u.group(1)):
        units[int(m.group(1))] = m.group(2)

# 3. Parse Categories
cats = {}
for line in sql_text.split('\n'):
    if line.startswith("INSERT INTO `categories_product`"):
        for m in re.finditer(r"\(([0-9]+),\s*'([^']*)',\s*[^,]+,\s*[^,]+,\s*([0-9]+|NULL)", line):
            cid = int(m.group(1))
            cname = m.group(2)
            cparent = int(m.group(3)) if m.group(3) != 'NULL' else None
            cats[cid] = {'id': cid, 'name': cname, 'parent_id': cparent}

def get_all_descendants(root_id):
    descendants = {root_id}
    added = True
    while added:
        added = False
        for cid, cdata in cats.items():
            if cdata['parent_id'] in descendants and cid not in descendants:
                descendants.add(cid)
                added = True
    return descendants

welding_cids = get_all_descendants(12)

# 4. Parse Product-Category mappings
prod_cats = {}
for line in sql_text.split('\n'):
    if line.startswith("INSERT INTO `categoryofproduct`"):
        for m in re.finditer(r"\([0-9]+,\s*([0-9]+),\s*([0-9]+)", line):
            cid = int(m.group(1))
            pid = int(m.group(2))
            if pid not in prod_cats:
                prod_cats[pid] = set()
            prod_cats[pid].add(cid)

welding_pids = set()
for pid, cset in prod_cats.items():
    if cset.intersection(welding_cids):
        welding_pids.add(pid)

# 5. Parse Variants (items)
items = {}
m_items = re.search(r"INSERT INTO `items` VALUES (.*?);", sql_text, re.DOTALL)
if m_items:
    it_pattern = re.compile(r"\(([0-9]+),\s*([0-9]+),\s*'([^']*)',\s*([0-9\.]+),\s*([^,]+),\s*([0-9]+),\s*([0-9]+),\s*'[^']*',\s*'[^']*',\s*'([^']*)'")
    for m in it_pattern.finditer(m_items.group(1)):
        it_id, prod_id, size, price, discount, stock, unit_id, sku = m.groups()
        prod_id = int(prod_id)
        if prod_id not in items:
            items[prod_id] = []
        cleaned_size = re.sub(r"^ขนาด\s*", "", size).strip().rstrip(".")
        if not cleaned_size: cleaned_size = "มาตรฐาน"
        raw_unit = units.get(int(unit_id), "1 ห่อ")
        u_info = parse_unit_info(raw_unit)
        items[prod_id].append({
            "size": cleaned_size,
            "package": u_info["label"],
            "unit": u_info["unit"],
            "weight": u_info["weight"],
            "price": float(price),
            "original_price": float(discount) if discount != "NULL" and float(discount) > float(price) else None,
            "stock": int(stock),
            "sku": sku
        })

print(f"Loaded {len(welding_pids)} target welding products")

# Test parse products
audit_stats = {"READY_GREEN": 0, "WARNING_YELLOW": 0, "QUARANTINE_RED": 0}
audit_flags = {}

products_out = []
seen_pids = set()

for line in sql_text.split('\n'):
    if not line.startswith("INSERT INTO `products`"):
        continue
    for pid in welding_pids:
        pos = 0
        while True:
            pos = line.find(f"({pid},", pos)
            if pos == -1:
                break
            end = line.find("),(", pos)
            entry = line[pos:end] if end != -1 else line[pos:line.find(");", pos)]
            
            m_id_name = re.match(r"\(([0-9]+),\s*'([^']*)',\s*'([^']*)',\s*'(.*?)',\s*(?:'([^']*)'|NULL),\s*(?:'([^']*)'|NULL),\s*(?:'([^']*)'|NULL),\s*'([^']*)'", entry, re.DOTALL)
            if m_id_name:
                p_id, name, short_desc, desc, catalog, cr_at, up_at, thumb = m_id_name.groups()
                p_id = int(p_id)
                # Verify this is a real product, not spam comments
                if any(bad in name.lower() for bad in ['http:', 'https:', '.com', 'money', 'bitcoin', 'dating', 'seo']):
                    pos += 1
                    continue
                if p_id in seen_pids:
                    pos += 1
                    continue
                seen_pids.add(p_id)
                
                m_band = re.search(rf"\({pid},.*?,\s*([0-9]+|NULL),\s*'[^']*',\s*(?:'[^']*'|NULL),\s*[0-9]+", entry, re.DOTALL)
                band_id = int(m_band.group(1)) if m_band and m_band.group(1) != "NULL" else None
                brand_name = bands.get(band_id, "UDO") if band_id else "UDO"

                # Images
                img_urls = []
                if thumb and thumb != "NULL":
                    img_urls.append(f"https://www.udo.co.th/storage/{thumb}")
                m_imgs = re.search(r"(\[\\?\"products[^\]]+\])", entry)
                if m_imgs:
                    try:
                        raw_json = m_imgs.group(1).replace('\\"', '"').replace('\\/', '/')
                        extra_imgs = json.loads(raw_json)
                        for extra in extra_imgs:
                            full_url = f"https://www.udo.co.th/storage/{extra}"
                            if full_url not in img_urls: img_urls.append(full_url)
                    except Exception:
                        pass
                formatted_images = [{"thumb": u, "card": u, "large": u, "original": u} for u in img_urls]

                # Rich images
                rich_images = []
                for img_match in re.finditer(r'<img[^>]+src=\\?["\']([^"\'\\]+)', desc):
                    raw_src = img_match.group(1).strip().replace(" ", "%20")
                    if not raw_src.startswith("http"):
                        raw_src = f"https://www.udo.co.th/storage/{raw_src.lstrip('/')}"
                    rich_images.append(raw_src)

                # Tables
                raw_tables = re.findall(r"(<table.*?</table>)", desc, re.DOTALL)
                cleaned_tables = [clean_engineering_table(tbl) for tbl in raw_tables if clean_engineering_table(tbl)]
                tables_html = "\n".join(cleaned_tables) if cleaned_tables else None

                # Cat tree
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
                        cat_tree.append({"level": idx + 1, "name": c_obj['name'], "url_slug": f"cat-{c_obj['id']}"})
                else:
                    cat_tree = [{"level": 1, "name": "กลุ่มลวดเชื่อม", "url_slug": "welding"}]

                commercial_specs = extract_hybrid_specs(desc, name, brand_name, cat_tree)

                # Paragraphs
                clean_paragraphs = []
                for p_match in re.finditer(r'<p[^>]*>(.*?)</p>', desc, re.DOTALL):
                    p_text = clean_html_text(p_match.group(1))
                    if not p_text or p_text.startswith("***") or "สั่งซื้อสินค้า" in p_text:
                        continue
                    if any(kw in p_text for kw in ["คุณสมบัติของแนวเชื่อม", "กระแสไฟฟ้า", "รับรองโดย", "การจำแนกประเภท", "ท่าเชื่อม", "ส่วนผสมทางเคมี", "กระแสไฟ"]):
                        continue
                    if len(p_text) < 80 and not any(verb in p_text for verb in ["เป็น", "คือ", "มี", "ใช้สำหรับ", "สามารถ", "ออกแบบ", "เหมาะสำหรับ"]):
                        continue
                    if len(p_text) > 30:
                        clean_paragraphs.append(p_text)

                clean_desc_plain = clean_html_text(short_desc if short_desc else desc[:200])
                desc_html_formatted = format_description_html(short_desc if short_desc else desc[:200], brand_name)

                rich_desc_final = "\n\n".join(clean_paragraphs) if clean_paragraphs else clean_desc_plain
                if not rich_desc_final:
                    rich_desc_final = clean_desc_plain

                prod_variants = items.get(p_id, [])
                primary_sku = prod_variants[0]["sku"] if prod_variants else f"UDO-{p_id}"

                specs_map = {s["key"]: s["value"] for s in commercial_specs}
                material_attr = specs_map.get("วัสดุที่เชื่อม", "เหล็ก")
                process_attr = specs_map.get("กระบวนการเชื่อม", "เชื่อมไฟฟ้า (MMA)")

                r_img1 = rich_images[0] if len(rich_images) > 0 else (img_urls[0] if img_urls else None)
                r_img2 = rich_images[1] if len(rich_images) > 1 else None
                r_img3 = rich_images[2] if len(rich_images) > 2 else None

                audit_meta = evaluate_welding_audit(prod_variants, cleaned_tables, commercial_specs, formatted_images, rich_images)

                audit_stats[audit_meta["status"]] += 1
                flag = audit_meta["flag"]
                audit_flags[flag] = audit_flags.get(flag, 0) + 1

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
                    "filter_attributes": {"material": material_attr, "process": process_attr},
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

print(f"\nPROCESSED PRODUCTS: {len(products_out)}")
print(f"AUDIT STATS:")
for st, cnt in audit_stats.items():
    print(f"  {st}: {cnt} ({cnt*100/len(products_out):.1f}%)")
print(f"FLAGS DETAIL:")
for fl, cnt in audit_flags.items():
    print(f"  {fl}: {cnt}")
