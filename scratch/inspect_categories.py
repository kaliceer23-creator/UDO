import re

with open('udothai_shop.sql', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

m = re.search(r'INSERT INTO `categories_product` VALUES (.*?);(?:\n|\r)', text, re.DOTALL)
if m:
    val_str = m.group(1)
    # Split into records safely
    # (id, 'name_category', 'created_at', 'updated_at', parent_id, ...)
    records = re.findall(r'\((\d+),\s*\'([^\']+)\',\s*\'[^\']*\',\s*\'[^\']*\',\s*(NULL|\d+)', val_str)
    print(f"Total categories parsed: {len(records)}")
    roots = [r for r in records if r[2] == 'NULL']
    print(f"\nRoot Categories ({len(roots)}):")
    for r in roots:
        c_id, name, p_id = r
        children = [c for c in records if c[2] == c_id]
        print(f" - [{c_id}] {name} (Direct children: {len(children)})")
        for ch in children:
            subchildren = [sc for sc in records if sc[2] == ch[0]]
            print(f"     -> [{ch[0]}] {ch[1]} (Subchildren: {len(subchildren)})")
