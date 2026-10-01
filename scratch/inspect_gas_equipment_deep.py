import json
from collections import Counter
import re

with open('frontend/src/welding_products.json', 'r', encoding='utf-8') as f:
    prods = json.load(f)

gas_prods = [p for p in prods if p.get('filter_attributes', {}).get('category_type') == 'gas_equipment' or any(c.get('url_slug') == 'cat-312' for c in p.get('categories', []))]

print(f"Total Gas Equipment products found: {len(gas_prods)}")

# Check subcategories
subcats = Counter()
for p in gas_prods:
    cats = [c['name'] for c in p.get('categories', [])]
    if len(cats) > 1:
        subcats[cats[1]] += 1
    else:
        subcats["(No subcategory)"] += 1

print("\n=== Subcategories in DB ===")
for sc, count in subcats.most_common():
    print(f"  {sc}: {count}")

# Check current brands
brands = Counter(p.get('brand') for p in gas_prods)
print("\n=== Current Brands ===")
for b, count in brands.most_common():
    print(f"  {b}: {count}")

# Check current gas types
gas_types = Counter(p.get('filter_attributes', {}).get('gas_type') for p in gas_prods)
print("\n=== Current Gas Types ===")
for gt, count in gas_types.most_common():
    print(f"  {gt}: {count}")

# Check current equipment types
eq_types = Counter(p.get('filter_attributes', {}).get('equipment_type') for p in gas_prods)
print("\n=== Current Equipment Types ===")
for eq, count in eq_types.most_common():
    print(f"  {eq}: {count}")
