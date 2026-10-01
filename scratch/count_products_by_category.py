import re

with open('udo_migration_engine.py', 'r', encoding='utf-8') as f:
    engine_code = f.read()

# Let's inspect total products in udothai_shop.sql
with open('udothai_shop.sql', 'r', encoding='utf-8', errors='ignore') as f:
    sql_text = f.read()

cats = {}
for line in sql_text.split('\n'):
    if line.startswith("INSERT INTO `categories_product`"):
        for m in re.finditer(r"\(([0-9]+),\s*'([^']*)',\s*[^,]+,\s*[^,]+,\s*([0-9]+|NULL)", line):
            cid = int(m.group(1))
            cname = m.group(2)
            cparent = int(m.group(3)) if m.group(3) != 'NULL' else None
            cats[cid] = {'id': cid, 'name': cname, 'parent_id': cparent}

def get_root_id(cid):
    visited = set()
    curr = cid
    while curr in cats and cats[curr]['parent_id'] is not None:
        if curr in visited: break
        visited.add(curr)
        curr = cats[curr]['parent_id']
    return curr

prod_cats = {}
for line in sql_text.split('\n'):
    if line.startswith("INSERT INTO `categoryofproduct`"):
        for m in re.finditer(r"\([0-9]+,\s*([0-9]+),\s*([0-9]+)", line):
            cid = int(m.group(1))
            pid = int(m.group(2))
            if pid not in prod_cats:
                prod_cats[pid] = set()
            prod_cats[pid].add(cid)

root_counts = {}
for pid, cids in prod_cats.items():
    roots = set(get_root_id(cid) for cid in cids)
    for r in roots:
        root_counts[r] = root_counts.get(r, 0) + 1

print(f"Total products mapped: {len(prod_cats)}")
print("\nProducts count by Root Category:")
for rid, count in sorted(root_counts.items(), key=lambda x: x[1], reverse=True):
    rname = cats.get(rid, {}).get('name', f'Unknown-{rid}')
    print(f" - [{rid}] {rname}: {count} products")
