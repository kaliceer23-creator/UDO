import re

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

prod_cats = {}
for m in re.finditer(r"INSERT INTO `categoryofproduct` VALUES (.*?);", sql_text, re.DOTALL):
    chunk = m.group(1)
    for row in re.finditer(r"\(([0-9]+),\s*([0-9]+|NULL),\s*([0-9]+|NULL)", chunk):
        cid_str, pid_str = row.group(2), row.group(3)
        if cid_str != 'NULL' and pid_str != 'NULL':
            prod_cats.setdefault(int(pid_str), set()).add(int(cid_str))

bands = {}
for line in sql_text.split('\n'):
    if 'INSERT INTO `bands`' in line:
        for m in re.finditer(r"\(([0-9]+),\s*'([^']*)'", line):
            bands[int(m.group(1))] = m.group(2)

c339_descendants = get_desc(339)
pids_339 = [p for p, cset in prod_cats.items() if cset.intersection(c339_descendants)]

products = []
for line in sql_text.split('\n'):
    if not line.startswith("INSERT INTO `products`"):
        continue
    for pid in pids_339:
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
                
                # Check desc for voltage / amp hints
                desc_clean = desc or ""
                
                products.append({
                    "id": p_id,
                    "name": name,
                    "brand": bname,
                    "subcats": c_names,
                    "desc": desc_clean
                })
            pos += 1

print(f"Total extracted: {len(products)}")
for p in sorted(products, key=lambda x: x['id']):
    print(f"\n==========================================")
    print(f"ID {p['id']}: [{p['brand']}] {p['name']}")
    print(f"Subcats: {p['subcats']}")
    # Search for voltage in desc
    m_v = re.findall(r'(?:220\s*V|380\s*V|1\s*Phase|3\s*Phase|1\s*เฟส|3\s*เฟส|Single\s*Phase|Three\s*Phase)', p['desc'], re.I)
    # Search for amp in desc
    m_a = re.findall(r'(\d+)\s*(?:Amp|แอมป์|A\b)', p['desc'], re.I)
    if m_v:
        print(f"Voltage hints in desc: {set(m_v)}")
    if m_a:
        print(f"Amp hints in desc: {set(m_a[:5])}")
