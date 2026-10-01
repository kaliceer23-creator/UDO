import re
from udo_migration_engine import extract_abrasives_specs

with open('udothai_shop.sql', 'r', encoding='utf-8', errors='ignore') as f:
    sql_text = f.read()

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

prod_variants = {}
for m in re.finditer(r"INSERT INTO `items` VALUES (.*?);", sql_text, re.DOTALL):
    chunk = m.group(1)
    for row in re.finditer(r"\(([0-9]+),\s*'([^']*)',\s*([0-9]+),\s*'([^']*)',\s*'([^']*)'", chunk):
        item_id, item_code, prod_id, size, package = row.groups()
        prod_variants.setdefault(int(prod_id), []).append({'size': size, 'package': package})

c298_descendants = get_desc(298)
pids_298 = [p for p, cset in prod_cats.items() if cset.intersection(c298_descendants)]

disc_types = {}
diameters = {}
mats = {}
brands = {}
grits = {}

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
            m = re.match(r"\(([0-9]+),\s*'((?:\\'|[^'])*)'", entry)
            if m:
                p_id, name = int(m.group(1)), m.group(2)
                c_ids = list(prod_cats.get(pid, []))
                vars_list = prod_variants.get(pid, [])
                dt, dia, grit, mat_l, mat_d, b, sp = extract_abrasives_specs(name, c_ids, cats, vars_list)
                disc_types[dt] = disc_types.get(dt, 0) + 1
                diameters[dia] = diameters.get(dia, 0) + 1
                for m_item in mat_l:
                    mats[m_item] = mats.get(m_item, 0) + 1
                brands[b] = brands.get(b, 0) + 1
                if grit:
                    grits[grit] = grits.get(grit, 0) + 1
            pos += 1

print('--- RESULTS WITH IMPROVED EXTRACTOR ---')
print('Total Products:', len(pids_298))
print('Disc Types:', sorted(disc_types.items(), key=lambda x: -x[1]))
print('Diameters:', sorted(diameters.items(), key=lambda x: -x[1]))
print('Materials:', sorted(mats.items(), key=lambda x: -x[1]))
print('Brands:', sorted(brands.items(), key=lambda x: -x[1]))
print('Grits:', sorted(grits.items(), key=lambda x: -x[1]))
