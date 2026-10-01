import re
import json
from collections import Counter

with open('udothai_shop.sql', 'r', encoding='utf-8', errors='ignore') as f:
    sql_text = f.read()

# Categories
cats = {}
for line in sql_text.split('\n'):
    if 'INSERT INTO `categories_product`' in line:
        for m in re.finditer(r"\(([0-9]+),\s*'([^']*)',\s*[^,]+,\s*[^,]+,\s*([0-9]+|NULL)", line):
            cats[int(m.group(1))] = {'id': int(m.group(1)), 'name': m.group(2), 'parent_id': int(m.group(3)) if m.group(3) != 'NULL' else None}

def get_desc(rid):
    d = {rid}
    added = True
    while added:
        added = False
        for cid, data in cats.items():
            if data['parent_id'] in d and cid not in d:
                d.add(cid)
                added = True
    return d

# Category of product
prod_cats = {}
for m in re.finditer(r"INSERT INTO `categoryofproduct` VALUES (.*?);", sql_text, re.DOTALL):
    chunk = m.group(1)
    for row in re.finditer(r"\(([0-9]+),\s*([0-9]+|NULL),\s*([0-9]+|NULL)", chunk):
        cid_str, pid_str = row.group(2), row.group(3)
        if cid_str != 'NULL' and pid_str != 'NULL':
            prod_cats.setdefault(int(pid_str), set()).add(int(cid_str))

# Brands
bands = {}
for line in sql_text.split('\n'):
    if 'INSERT INTO `bands`' in line:
        for m in re.finditer(r"\(([0-9]+),\s*'([^']*)'", line):
            bands[int(m.group(1))] = m.group(2)

# Items / Variants
prod_variants = {}
for m in re.finditer(r"INSERT INTO `items` VALUES (.*?);", sql_text, re.DOTALL):
    chunk = m.group(1)
    for row in re.finditer(r"\(([0-9]+),\s*'([^']*)',\s*([0-9]+),\s*'([^']*)',\s*'([^']*)'", chunk):
        item_id, item_code, prod_id, size, package = row.groups()
        prod_variants.setdefault(int(prod_id), []).append({'item_code': item_code, 'size': size, 'package': package})

c327_descendants = get_desc(327)
pids_327 = [p for p, cset in prod_cats.items() if cset.intersection(c339_descendants := c327_descendants)]

print(f"Total products in Root 327: {len(pids_327)}")

products_raw = {}
for line in sql_text.split('\n'):
    if not line.startswith("INSERT INTO `products`"):
        continue
    for pid in pids_327:
        pos = 0
        while True:
            pos = line.find(f"({pid},", pos)
            if pos == -1: break
            end = line.find("),(", pos)
            entry = line[pos:end] if end != -1 else line[pos:line.find(");", pos)]
            
            m_id_name = re.match(r"\(([0-9]+),\s*'((?:\\'|[^'])*)',\s*(?:'((?:\\'|[^'])*)'|NULL),\s*(?:'(.*?)'|NULL)", entry, re.DOTALL)
            if m_id_name:
                p_id, name, short_desc, desc = m_id_name.groups()
                p_id = int(p_id)
                m_band = re.search(rf"\({pid},.*?,\s*([0-9]+|NULL),\s*'[^']*',\s*(?:'[^']*'|NULL),\s*[0-9]+", entry, re.DOTALL)
                band_id = int(m_band.group(1)) if m_band and m_band.group(1) != "NULL" else None
                bname = bands.get(band_id, "UDO") if band_id else "UDO"
                c_names = [cats.get(c, {}).get('name', '') for c in prod_cats.get(p_id, [])]
                vars_list = prod_variants.get(p_id, [])
                products_raw[p_id] = {
                    "id": p_id,
                    "name": name,
                    "brand": bname,
                    "categories": c_names,
                    "cat_ids": list(prod_cats.get(p_id, [])),
                    "variants": vars_list,
                    "short_desc": short_desc,
                    "desc": desc or ""
                }
            pos += 1

print("\n--- Subcategories in Root 327 ---")
for cid in sorted(c327_descendants):
    c = cats.get(cid, {})
    cnt = sum(1 for p in products_raw.values() if cid in p['cat_ids'])
    print(f"  CID {cid}: {c.get('name')} (Parent: {c.get('parent_id')}) -> {cnt} products")

print("\n--- Brand Distribution in Root 327 ---")
b_counts = Counter(p['brand'] for p in products_raw.values())
for b, c in sorted(b_counts.items(), key=lambda x: -x[1]):
    print(f"  Brand {b}: {c} products")

print("\n--- All Products in Root 327 ---")
for p in sorted(products_raw.values(), key=lambda x: x['id']):
    print(f"ID {p['id']}: [{p['brand']}] {p['name']}")
    print(f"   Subcats: {p['categories']}")
    if p['variants']:
        print(f"   Variants: {p['variants']}")
