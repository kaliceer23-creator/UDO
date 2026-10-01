import re

with open('udothai_shop.sql', 'r', encoding='utf-8', errors='ignore') as f:
    sql_text = f.read()

# Categories
cats = {}
for line in sql_text.split('\n'):
    if line.startswith("INSERT INTO `categories_product`"):
        for m in re.finditer(r"\(([0-9]+),\s*'([^']*)',\s*[^,]+,\s*[^,]+,\s*([0-9]+|NULL)", line):
            cid = int(m.group(1))
            cname = m.group(2)
            cparent = int(m.group(3)) if m.group(3) != 'NULL' else None
            cats[cid] = {'id': cid, 'name': cname, 'parent_id': cparent}

def get_descendants(root_id):
    desc = {root_id}
    added = True
    while added:
        added = False
        for cid, data in cats.items():
            if data['parent_id'] in desc and cid not in desc:
                desc.add(cid)
                added = True
    return desc

# Product categories
prod_cats = {}
for m in re.finditer(r"INSERT INTO `categoryofproduct` VALUES (.*?);", sql_text, re.DOTALL):
    chunk = m.group(1)
    for row in re.finditer(r"\(([0-9]+),\s*([0-9]+|NULL),\s*([0-9]+|NULL)", chunk):
        cid_str = row.group(2)
        pid_str = row.group(3)
        if cid_str != 'NULL' and pid_str != 'NULL':
            cid = int(cid_str)
            pid = int(pid_str)
            if pid not in prod_cats:
                prod_cats[pid] = set()
            prod_cats[pid].add(cid)

all_roots = [12, 339, 344, 312, 298, 327, 382, 398]
all_target_cids = set()
for r in all_roots:
    all_target_cids.update(get_descendants(r))

target_pids = set()
for pid, cset in prod_cats.items():
    if cset.intersection(all_target_cids):
        target_pids.add(pid)

print(f"Target products total: {len(target_pids)}")

root_counts = {}
for pid in target_pids:
    c_ids = list(prod_cats.get(pid, []))
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

    root_cid = 12
    if deepest_cid and deepest_cid in cats:
        chain = []
        curr = deepest_cid
        visited = set()
        while curr and curr in cats and curr not in visited:
            visited.add(curr)
            chain.append(cats[curr])
            curr = cats[curr]['parent_id']
        chain.reverse()
        root_cid = chain[0]['id']
    root_counts[root_cid] = root_counts.get(root_cid, 0) + 1

for r in all_roots:
    print(f"Root {r} ({cats.get(r,{}).get('name')}): {root_counts.get(r, 0)} products")
print(f"Sum across all roots: {sum(root_counts.values())}")
