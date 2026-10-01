import re

with open("udothai_shop.sql", "r", encoding="utf-8", errors="ignore") as f:
    sql = f.read()

prod_cats = {}
for line in sql.split('\n'):
    if line.startswith("INSERT INTO `categoryofproduct`"):
        for m in re.finditer(r"\([0-9]+,\s*([0-9]+),\s*([0-9]+)", line):
            cid = int(m.group(1))
            pid = int(m.group(2))
            if pid not in prod_cats:
                prod_cats[pid] = set()
            prod_cats[pid].add(cid)

cats = {}
for line in sql.split('\n'):
    if line.startswith("INSERT INTO `categories_product`"):
        for m in re.finditer(r"\(([0-9]+),\s*'([^']*)',\s*[^,]+,\s*[^,]+,\s*([0-9]+|NULL)", line):
            cid = int(m.group(1))
            cname = m.group(2)
            cparent = int(m.group(3)) if m.group(3) != 'NULL' else None
            cats[cid] = {'id': cid, 'name': cname, 'parent_id': cparent}

def get_desc(rid):
    d = {rid}
    ad = True
    while ad:
        ad = False
        for cid, data in cats.items():
            if data['parent_id'] in d and cid not in d:
                d.add(cid)
                ad = True
    return d

all_target_cids = get_desc(12).union(get_desc(339)).union(get_desc(344))
target_pids = set()
for pid, cset in prod_cats.items():
    if cset.intersection(all_target_cids):
        target_pids.add(pid)

print(f"Total unique products across 12, 339, 344: {len(target_pids)}")
p_12 = sum(1 for pid, cset in prod_cats.items() if cset.intersection(get_desc(12)))
p_339 = sum(1 for pid, cset in prod_cats.items() if cset.intersection(get_desc(339)))
p_344 = sum(1 for pid, cset in prod_cats.items() if cset.intersection(get_desc(344)))
print(f"12: {p_12}, 339: {p_339}, 344: {p_344} (Sum: {p_12 + p_339 + p_344})")
