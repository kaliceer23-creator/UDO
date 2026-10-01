import re
import json

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

# Build tree and breadcrumb paths for each category
category_map = {}
for cid, data in cats.items():
    chain = []
    curr = cid
    visited = set()
    while curr is not None and curr in cats and curr not in visited:
        visited.add(curr)
        chain.append(cats[curr])
        curr = cats[curr]['parent_id']
    chain.reverse()
    
    slug = f"cat-{cid}"
    category_map[str(cid)] = {
        'id': cid,
        'name': data['name'],
        'parent_id': data['parent_id'],
        'slug': slug,
        'path': [{'id': c['id'], 'name': c['name'], 'slug': f"cat-{c['id']}"} for c in chain]
    }

print(f"Total categories indexed: {len(category_map)}")
# Show roots
roots = [c for c in category_map.values() if c['parent_id'] is None]
print("Roots:")
for r in roots:
    print(f"  [{r['id']}] {r['name']}")

with open('scratch/category_taxonomy.json', 'w', encoding='utf-8') as f:
    json.dump(category_map, f, ensure_ascii=False, indent=2)
