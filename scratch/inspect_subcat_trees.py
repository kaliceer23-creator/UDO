import re

with open('udothai_shop.sql', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

# Check subcategories for 312, 327, 344, 382
cats = {}
for line in text.split('\n'):
    if line.startswith("INSERT INTO `categories_product`"):
        for m_cat in re.finditer(r"\(([0-9]+),\s*'([^']*)',\s*[^,]+,\s*[^,]+,\s*([0-9]+|NULL)", line):
            cid = int(m_cat.group(1))
            cname = m_cat.group(2)
            cparent = int(m_cat.group(3)) if m_cat.group(3) != 'NULL' else None
            cats[cid] = {'id': cid, 'name': cname, 'parent_id': cparent}

def print_tree(cid, indent=0):
    cname = cats[cid]['name']
    print("  " * indent + f"- [{cid}] {cname}")
    for child_id, c in cats.items():
        if c['parent_id'] == cid:
            print_tree(child_id, indent + 1)

for rid in [312, 327, 344, 382]:
    print(f"\n=== TREE FOR ROOT {rid}: {cats[rid]['name']} ===")
    print_tree(rid)
