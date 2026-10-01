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

# Parse products line-by-line
products = {}
for line in sql_text.split('\n'):
    if line.startswith("INSERT INTO `products`"):
        # Match all (pid, 'name', ...
        for m in re.finditer(r"\(([0-9]+),\s*'((?:\\'|[^'])*)',\s*(?:'((?:\\'|[^'])*)'|NULL),\s*(?:'(.*?)'|NULL)", line):
            pid = int(m.group(1))
            pname = m.group(2).replace("\\'", "'")
            short_desc = (m.group(3) or "").replace("\\'", "'")
            desc = (m.group(4) or "").replace("\\'", "'")
            products[pid] = {'id': pid, 'name': pname, 'short_desc': short_desc, 'desc': desc}

targets = [312, 298, 327, 382, 398]
for rid in targets:
    desc_cids = get_descendants(rid)
    pids = [pid for pid, cids in prod_cats.items() if cids.intersection(desc_cids)]
    print(f"\n=======================================================")
    print(f"ROOT {rid}: {cats.get(rid, {}).get('name')} ({len(pids)} products)")
    print(f"=======================================================")
    
    # Sample product names
    print("Sample Products:")
    for pid in pids[:10]:
        p = products.get(pid, {})
        print(f"  - [PID {pid}] {p.get('name')}")
