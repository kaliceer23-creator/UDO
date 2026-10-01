import re

with open('udothai_shop.sql', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

# 1. Parse Cats
cats = {}
for line in text.split('\n'):
    if line.startswith("INSERT INTO `categories_product`"):
        for m_cat in re.finditer(r"\(([0-9]+),\s*'([^']*)',\s*[^,]+,\s*[^,]+,\s*([0-9]+|NULL)", line):
            cid = int(m_cat.group(1))
            cname = m_cat.group(2)
            cparent = int(m_cat.group(3)) if m_cat.group(3) != 'NULL' else None
            cats[cid] = {'id': cid, 'name': cname, 'parent_id': cparent}

def get_descendants(root_id):
    desc = {root_id}
    added = True
    while added:
        added = False
        for cid, c in cats.items():
            if c['parent_id'] in desc and cid not in desc:
                desc.add(cid)
                added = True
    return desc

# 2. Prod-Cat
prod_cats = {}
for line in text.split('\n'):
    if line.startswith("INSERT INTO `categoryofproduct`"):
        for m in re.finditer(r"\([0-9]+,\s*([0-9]+),\s*([0-9]+)", line):
            cid = int(m.group(1))
            pid = int(m.group(2))
            if pid not in prod_cats: prod_cats[pid] = set()
            prod_cats[pid].add(cid)

root_ids = [12, 298, 312, 327, 339, 344, 382, 398]

root_pids = {}
for rid in root_ids:
    c_set = get_descendants(rid)
    p_set = set()
    for pid, cids in prod_cats.items():
        if cids.intersection(c_set):
            p_set.add(pid)
    root_pids[rid] = p_set

# Parse products names
prods = {}
for line in text.split('\n'):
    if line.startswith("INSERT INTO `products`"):
        for m in re.finditer(r"\(([0-9]+),\s*'([^']*)',\s*'([^']*)',\s*'(.*?)'", line):
            pid = int(m.group(1))
            name = m.group(2)
            short_d = m.group(3)
            desc = m.group(4)[:300]
            prods[pid] = {'name': name, 'short_d': short_d, 'desc': desc}

print("=== PRODUCTS COUNT PER ROOT CATEGORY ===")
for rid in root_ids:
    rc_name = cats[rid]['name']
    p_count = len(root_pids[rid])
    print(f"\nRoot ID {rid}: {rc_name} -> {p_count} products")
    sample_pids = list(root_pids[rid])[:6]
    for spid in sample_pids:
        if spid in prods:
            print(f"  * PID {spid}: {prods[spid]['name']}")
