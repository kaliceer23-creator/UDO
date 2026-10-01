import sys, os
sys.path.insert(0, os.path.abspath('.'))
from udo_migration_engine import load_database
import re

sql_text = load_database()

cats = {}
for line in sql_text.split('\n'):
    if line.startswith("INSERT INTO `categories_product`"):
        for m in re.finditer(r"\(([0-9]+),\s*'([^']*)',\s*[^,]+,\s*[^,]+,\s*([0-9]+|NULL)", line):
            cid = int(m.group(1))
            cname = m.group(2)
            cparent = int(m.group(3)) if m.group(3) != 'NULL' else None
            cats[cid] = {'id': cid, 'name': cname, 'parent_id': cparent}

print("Category 12:", cats.get(12))

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
print(f"Total categories in welding tree: {len(welding_cids)}")
for cid in sorted(welding_cids):
    c = cats[cid]
    p = c.get('parent_id')
    pname = cats[p]['name'] if p and p in cats else 'ROOT'
    print(f"  ID {cid:3d}: {c.get('name')} (Parent: {p} - {pname})")

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

print(f"\nTotal unique products mapped to welding categories: {len(welding_pids)}")
