import re

with open('udothai_shop.sql', 'r', encoding='utf-8', errors='ignore') as f:
    sql_text = f.read()

# Load cats
cats = {}
for line in sql_text.split('\n'):
    if line.startswith("INSERT INTO `categories_product`"):
        for m in re.finditer(r"\(([0-9]+),\s*'([^']*)',\s*[^,]+,\s*[^,]+,\s*([0-9]+|NULL)", line):
            cats[int(m.group(1))] = {'id': int(m.group(1)), 'name': m.group(2), 'parent_id': int(m.group(3)) if m.group(3) != 'NULL' else None}

# Items
items_pids = set()
m_items = re.search(r"INSERT INTO `items` VALUES (.*?);", sql_text, re.DOTALL)
if m_items:
    for m in re.finditer(r"\(([0-9]+),\s*([0-9]+),", m_items.group(1)):
        items_pids.add(int(m.group(2)))

# Prod cats
prod_cats = {}
for m in re.finditer(r"INSERT INTO `categoryofproduct` VALUES (.*?);", sql_text, re.DOTALL):
    chunk = m.group(1)
    for row in re.finditer(r"\(([0-9]+),\s*([0-9]+|NULL),\s*([0-9]+|NULL)", chunk):
        cid_str, pid_str = row.group(2), row.group(3)
        if cid_str != 'NULL' and pid_str != 'NULL':
            cid, pid = int(cid_str), int(pid_str)
            prod_cats.setdefault(pid, set()).add(cid)

all_roots = [12, 339, 344, 312, 298, 327, 382, 398]
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

for r in all_roots:
    desc = get_desc(r)
    pids = [p for p, cset in prod_cats.items() if cset.intersection(desc)]
    has_items = [p for p in pids if p in items_pids]
    print(f"Root {r} ({cats.get(r,{}).get('name')}): total {len(pids)}, with items in DB: {len(has_items)}, without items: {len(pids) - len(has_items)}")
