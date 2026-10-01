import re
import json

with open('udothai_shop.sql', 'r', encoding='utf-8', errors='ignore') as f:
    sql_text = f.read()

# Categories
cats = {}
for line in sql_text.split('\n'):
    if line.startswith("INSERT INTO `categories_product`"):
        for m in re.finditer(r"\(([0-9]+),\s*'([^']*)',\s*[^,]+,\s*[^,]+,\s*([0-9]+|NULL)", line):
            cats[int(m.group(1))] = {'id': int(m.group(1)), 'name': m.group(2), 'parent_id': int(m.group(3)) if m.group(3) != 'NULL' else None}

# Brands
bands = {}
for line in sql_text.split('\n'):
    if line.startswith("INSERT INTO `bands`"):
        for m in re.finditer(r"\(([0-9]+),\s*'([^']*)'", line):
            bands[int(m.group(1))] = m.group(2)

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
        cid_str = row.group(2)
        pid_str = row.group(3)
        if cid_str != 'NULL' and pid_str != 'NULL':
            cid, pid = int(cid_str), int(pid_str)
            prod_cats.setdefault(pid, set()).add(cid)

c298_descendants = get_desc(298)
pids_298 = [p for p, cset in prod_cats.items() if cset.intersection(c298_descendants)]

print(f"Total products in Root 298: {len(pids_298)}")

# Load products from sql
products_raw = {}
for line in sql_text.split('\n'):
    if not line.startswith("INSERT INTO `products`"):
        continue
    for pid in pids_298:
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
                products_raw[p_id] = {
                    "id": p_id,
                    "name": name,
                    "band_id": band_id,
                    "brand": bname,
                    "cats": [cats.get(c, {}).get('name') for c in prod_cats.get(p_id, [])]
                }
            pos += 1

print("\n--- Brand Distribution in Root 298 ---")
brand_counts = {}
for p in products_raw.values():
    brand_counts[p['brand']] = brand_counts.get(p['brand'], 0) + 1
for b, c in sorted(brand_counts.items(), key=lambda x: -x[1]):
    print(f"  Brand {b}: {c} products")

print("\n--- Subcategory Distribution in Root 298 ---")
cat_counts = {}
for p in products_raw.values():
    for c in p['cats']:
        cat_counts[c] = cat_counts.get(c, 0) + 1
for c, cnt in sorted(cat_counts.items(), key=lambda x: -x[1]):
    print(f"  Subcat '{c}': {cnt} products")

print("\n--- All 74 Product Names in Root 298 ---")
for p in sorted(products_raw.values(), key=lambda x: x['id']):
    print(f"ID {p['id']}: [{p['brand']}] {p['name']} | Subcats: {p['cats']}")
