import re

with open('udothai_shop.sql', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

# 1. Products table schema
m = re.search(r'CREATE TABLE `products` \((.*?)\) ENGINE', text, re.DOTALL)
if m:
    print('=== PRODUCTS TABLE SCHEMA ===')
    for line in m.group(1).split('\n'):
        if line.strip():
            print(' ', line.strip())

# 2. Items table schema
m_items = re.search(r'CREATE TABLE `items` \((.*?)\) ENGINE', text, re.DOTALL)
if m_items:
    print('\n=== ITEMS TABLE SCHEMA ===')
    for line in m_items.group(1).split('\n'):
        if line.strip():
            print(' ', line.strip())

# 3. All table names
tables = re.findall(r'CREATE TABLE `([^`]+)`', text)
print('\n=== ALL TABLES IN DB ===')
print(', '.join(tables))

# 4. Check categories_product root categories (parent_id is NULL or 0)
cats = {}
for line in text.split('\n'):
    if line.startswith("INSERT INTO `categories_product`"):
        for m_cat in re.finditer(r"\(([0-9]+),\s*'([^']*)',\s*[^,]+,\s*[^,]+,\s*([0-9]+|NULL)", line):
            cid = int(m_cat.group(1))
            cname = m_cat.group(2)
            cparent = int(m_cat.group(3)) if m_cat.group(3) != 'NULL' else None
            cats[cid] = {'id': cid, 'name': cname, 'parent_id': cparent}

print(f'\n=== TOTAL CATEGORIES: {len(cats)} ===')
root_cats = [c for c in cats.values() if c['parent_id'] is None or c['parent_id'] == 0]
print(f'=== ROOT CATEGORIES ({len(root_cats)}): ===')
for rc in root_cats:
    children = [c for c in cats.values() if c['parent_id'] == rc['id']]
    print(f"- ID {rc['id']}: {rc['name']} (Subcategories: {len(children)})")
    for ch in children:
        sub_children = [c for c in cats.values() if c['parent_id'] == ch['id']]
        sub_str = f" ({len(sub_children)} sub)" if sub_children else ""
        print(f"    * ID {ch['id']}: {ch['name']}{sub_str}")

# 5. Check product timestamps (created_at, updated_at)
print('\n=== PRODUCT TIMESTAMPS AUDIT ===')
created_samples = []
for line in text.split('\n'):
    if line.startswith("INSERT INTO `products`"):
        # Match created_at field
        # entry format: (id, name, short_desc, desc, catalog, created_at, updated_at, ...)
        matches = re.finditer(r"\(([0-9]+),\s*'[^']*',\s*'[^']*',\s*'.*?',\s*(?:'[^']*'|NULL),\s*(?:'([^']*)'|NULL),\s*(?:'([^']*)'|NULL)", line)
        for m_p in matches:
            pid, cr, up = m_p.groups()
            created_samples.append((pid, cr, up))
            if len(created_samples) >= 10:
                break
        if len(created_samples) >= 10:
            break

print(f"Sample product timestamps (total sampled: {len(created_samples)}):")
for s in created_samples[:5]:
    print(f"  PID {s[0]}: created_at={s[1]}, updated_at={s[2]}")

# 6. Check if any 'featured', 'tag', 'status', 'discount' or special columns exist
print('\n=== TAGS / BADGES / FLAGS CHECK ===')
# Let's inspect all columns of products
cols = []
if m:
    for line in m.group(1).split('\n'):
        col_m = re.match(r'`([^`]+)`', line.strip())
        if col_m:
            cols.append(col_m.group(1))
print("Products columns:", cols)

item_cols = []
if m_items:
    for line in m_items.group(1).split('\n'):
        col_m = re.match(r'`([^`]+)`', line.strip())
        if col_m:
            item_cols.append(col_m.group(1))
print("Items columns:", item_cols)
