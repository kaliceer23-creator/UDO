import re
import json

with open('udothai_shop.sql', 'r', errors='ignore') as f:
    sql_text = f.read()

bands = {}
m_bands = re.search(r"INSERT INTO `bands` VALUES (.*?);", sql_text, re.DOTALL)
if m_bands:
    for m in re.finditer(r"\(([0-9]+),\s*'([^']*)'", m_bands.group(1)):
        bands[int(m.group(1))] = m.group(2)

units = {}
m_u = re.search(r"INSERT INTO `units` VALUES (.*?);", sql_text, re.DOTALL)
if m_u:
    for m in re.finditer(r"\(([0-9]+),\s*'([^']*)'", m_u.group(1)):
        units[int(m.group(1))] = m.group(2)

cats = {}
for line in sql_text.split('\n'):
    if line.startswith("INSERT INTO `categories_product`"):
        for m in re.finditer(r"\(([0-9]+),\s*'([^']*)',\s*[^,]+,\s*[^,]+,\s*([0-9]+|NULL)", line):
            cid = int(m.group(1))
            cname = m.group(2)
            cparent = int(m.group(3)) if m.group(3) != 'NULL' else None
            cats[cid] = {'id': cid, 'name': cname, 'parent_id': cparent}

prod_cats = {}
for line in sql_text.split('\n'):
    if line.startswith("INSERT INTO `categoryofproduct`"):
        for m in re.finditer(r"\([0-9]+,\s*([0-9]+),\s*([0-9]+)", line):
            cid = int(m.group(1))
            pid = int(m.group(2))
            if pid not in prod_cats:
                prod_cats[pid] = []
            if cid not in prod_cats[pid]:
                prod_cats[pid].append(cid)

items = {}
m_items = re.search(r"INSERT INTO `items` VALUES (.*?);", sql_text, re.DOTALL)
if m_items:
    it_pattern = re.compile(r"\(([0-9]+),\s*([0-9]+),\s*'([^']*)',\s*([0-9\.]+),\s*([^,]+),\s*([0-9]+),\s*([0-9]+),\s*'[^']*',\s*'[^']*',\s*'([^']*)'")
    for m in it_pattern.finditer(m_items.group(1)):
        it_id, prod_id, size, price, discount, stock, unit_id, sku = m.groups()
        prod_id = int(prod_id)
        if prod_id not in items:
            items[prod_id] = []
        
        cleaned_size = re.sub(r"^ขนาด\s*", "", size).strip()
        cleaned_size = re.sub(r"\.+$", "", cleaned_size)
        if not cleaned_size:
            cleaned_size = "มาตรฐาน"
            
        unit_name = units.get(int(unit_id), "1 ห่อ").strip()
        unit_name = unit_name.replace("กิโล", "กก.").replace("แพ๊ค", "แพ็ก")
        
        items[prod_id].append({
            "size": cleaned_size,
            "package": unit_name,
            "price": float(price),
            "original_price": float(discount) if discount != "NULL" and float(discount) > float(price) else None,
            "stock": int(stock),
            "sku": sku
        })

target_pids = [897, 913, 905, 924, 902]
products_out = []

def extract_specs_from_html(html_str):
    specs = []
    if "<table" in html_str:
        if "ส่วนผสมทางเคมี" in html_str:
            c_val = []
            for elem in ["C", "Mn", "Si", "Ni", "Cr", "Mo", "N"]:
                m = re.search(rf">{elem}<.*?<td[^>]*>(?:<p[^>]*>)?(?:<span[^>]*>)?\s*([0-9\.]+)", html_str, re.DOTALL)
                if m:
                    c_val.append(f"{elem}: {m.group(1)}%")
            if c_val:
                specs.append({"key": "ส่วนผสมทางเคมี", "value": ", ".join(c_val)})
        
        if "คุณสมบัติทางกล" in html_str:
            mech_val = []
            m_yield = re.search(r"Yield\s*stress.*?<td[^>]*>(?:<p[^>]*>)?(?:<span[^>]*>)?\s*([^<]+)", html_str, re.DOTALL | re.IGNORECASE)
            if m_yield:
                mech_val.append(f"Yield stress: {m_yield.group(1).strip()}")
            m_tensile = re.search(r"Tensile\s*strength.*?<td[^>]*>(?:<p[^>]*>)?(?:<span[^>]*>)?\s*([^<]+)", html_str, re.DOTALL | re.IGNORECASE)
            if m_tensile:
                mech_val.append(f"Tensile strength: {m_tensile.group(1).strip()}")
            m_elong = re.search(r"Elongation.*?<td[^>]*>(?:<p[^>]*>)?(?:<span[^>]*>)?\s*([^<]+)", html_str, re.DOTALL | re.IGNORECASE)
            if m_elong:
                mech_val.append(f"Elongation: {m_elong.group(1).strip()}")
            if mech_val:
                specs.append({"key": "คุณสมบัติทางกล", "value": ", ".join(mech_val)})
                
        m_curr = re.search(r"กระแสไฟฟ้า.*?<td[^>]*>(?:<p[^>]*>)?(?:<span[^>]*>)?\s*([^<]+)", html_str, re.DOTALL)
        if m_curr:
            specs.append({"key": "กระแสไฟฟ้าที่ใช้เชื่อม", "value": m_curr.group(1).strip()})
            
    return specs if specs else None

def clean_html_text(html_str):
    text = re.sub(r"<[^>]+>", " ", html_str)
    text = text.replace("&nbsp;", " ").replace("&amp;", "&").replace("&quot;", "\"").replace("&#39;", "'")
    text = re.sub(r"\s+", " ", text).strip()
    return text

for line in sql_text.split('\n'):
    if line.startswith("INSERT INTO `products`"):
        for pid in target_pids:
            pos = line.find(f"({pid},")
            if pos == -1:
                continue
            end = line.find("),(", pos)
            entry = line[pos:end] if end != -1 else line[pos:line.find(");", pos)]
            
            m_id_name = re.match(r"\(([0-9]+),\s*'([^']*)',\s*'([^']*)',\s*'(.*?)',\s*(?:'([^']*)'|NULL),\s*(?:'([^']*)'|NULL),\s*(?:'([^']*)'|NULL),\s*'([^']*)'", entry, re.DOTALL)
            if not m_id_name:
                continue
            
            p_id, name, short_desc, desc, catalog, cr_at, up_at, thumb = m_id_name.groups()
            
            m_band = re.search(rf"\({pid},.*?,\s*([0-9]+|NULL),\s*'[^']*',\s*(?:'[^']*'|NULL),\s*[0-9]+", entry, re.DOTALL)
            band_id = int(m_band.group(1)) if m_band and m_band.group(1) != "NULL" else None
            brand_name = bands.get(band_id, "UDO") if band_id else "UDO"
            
            # Extract gallery images
            img_list = []
            if thumb and thumb != "NULL":
                img_list.append(f"https://www.udo.co.th/storage/{thumb}")
                
            m_imgs = re.search(r"(\[\\?\"products[^\]]+\])", entry)
            if m_imgs:
                try:
                    raw_json = m_imgs.group(1).replace('\\"', '"').replace('\\/', '/')
                    extra_imgs = json.loads(raw_json)
                    for extra in extra_imgs:
                        full_extra_url = f"https://www.udo.co.th/storage/{extra}"
                        if full_extra_url not in img_list:
                            img_list.append(full_extra_url)
                except Exception as err:
                    pass
                
            # Extract embedded rich images inside description HTML
            # e.g. <img src="https://www.udo.co.th/storage/products/August2018/S-2209 .jpg" ... />
            rich_images = []
            for img_match in re.finditer(r'<img[^>]+src=\\?["\']([^"\'\\]+)', desc):
                raw_src = img_match.group(1).strip()
                # encode spaces properly for valid web URL
                cleaned_url = raw_src.replace(" ", "%20")
                if not cleaned_url.startswith("http"):
                    cleaned_url = f"https://www.udo.co.th/storage/{cleaned_url.lstrip('/')}"
                rich_images.append(cleaned_url)
                
            prod_variants = items.get(int(p_id), [])
            primary_sku = prod_variants[0]["sku"] if prod_variants else f"UDO-{p_id}"
            
            material = "สเตนเลส" if "สเตนเลส" in name or "308" in name or "309" in name or "310" in name or "316" in name or "2209" in name else "เหล็ก"
            if "เหล็กหล่อ" in name:
                material = "เหล็กหล่อ"
            if "เซาะร่อง" in name:
                material = "เหล็กคาร์บอน / พิเศษ"
                
            process = "ธูปเชื่อม (MMA)"
            if "ทิก" in name or "TIG" in name or "S-310T" in name or "ST-310" in name:
                process = "ลวดเชื่อมทิก (TIG)"
            elif "มิก" in name or "MIG" in name:
                process = "ลวดเชื่อมมิก (MIG)"
            elif "เซาะร่อง" in name:
                process = "เซาะร่อง / ตัดด้วยไฟฟ้า"
                
            specs = extract_specs_from_html(desc)
            
            # REAL Breadcrumbs
            c_ids = prod_cats.get(int(p_id), [])
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

            # Extract rich description text
            clean_paragraphs = []
            for p_match in re.finditer(r'<p[^>]*>(.*?)</p>', desc, re.DOTALL):
                p_text = clean_html_text(p_match.group(1))
                if p_text and not p_text.startswith("***") and len(p_text) > 10:
                    clean_paragraphs.append(p_text)
            
            rich_desc_final = "\n\n".join(clean_paragraphs) if clean_paragraphs else clean_html_text(desc)[:350]

            r_img1 = rich_images[0] if len(rich_images) > 0 else (img_list[0] if img_list else "/images/bg-welding.jpeg")
            r_img2 = rich_images[1] if len(rich_images) > 1 else None
            r_img3 = rich_images[2] if len(rich_images) > 2 else None
            
            formatted_images = [
                {
                    "thumb": img_url,
                    "card": img_url,
                    "large": img_url,
                    "original": img_url
                }
                for img_url in img_list
            ]

            product_obj = {
                "id": f"udo-{p_id}",
                "name": name,
                "brand": brand_name,
                "sku": primary_sku,
                "description": short_desc if short_desc else clean_html_text(desc)[:200],
                "created_at": cr_at if cr_at and cr_at != "NULL" else "2026-08-15T10:30:00Z",
                "sold_count": 500 + int(p_id),
                "collections": ["popular", "just_for_you"],
                "categories": cat_tree,
                "filter_attributes": {
                    "material": material,
                    "process": process
                },
                "tags": [material, process, brand_name],
                "images": formatted_images,
                "warranty": None,
                "variants": prod_variants,
                "specsTable": specs,
                "richContent": {
                    "headline": name,
                    "subheadline": f"ผลิตภัณฑ์งานเชื่อมคุณภาพสูง แบรนด์ {brand_name}",
                    "description": rich_desc_final,
                    "image1": r_img1,
                    "image2": r_img2,
                    "image3": r_img3
                }
            }
            products_out.append(product_obj)

with open('/Users/aliceer/UDO/frontend/src/pilot_products_5.json', 'w', encoding='utf-8') as f:
    json.dump(products_out, f, ensure_ascii=False, indent=2)

print("Updated pilot_products_5.json successfully:")
for p in products_out:
    print(f"Product {p['id']}: {p['name']}")
    print(f"  Rich Image 1: {p['richContent']['image1']}")
