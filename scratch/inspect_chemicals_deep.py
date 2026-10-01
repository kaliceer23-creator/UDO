import json
import re

with open('frontend/src/welding_products.json', 'r', encoding='utf-8') as f:
    prods = json.load(f)

chems = [p for p in prods if p.get('filter_attributes', {}).get('category_type') == 'chemicals' or any(c.get('url_slug') == 'cat-382' for c in p.get('categories', []))]

print(f"Total Chemical products: {len(chems)}")

for i, p in enumerate(chems, 1):
    fa = p.get('filter_attributes', {})
    variants = p.get('variants', [])
    v_info = ", ".join([f"{v.get('size')} ({v.get('package')}, {v.get('price')}B)" for v in variants])
    cats = [c['name'] for c in p.get('categories', [])]
    subcat = cats[1] if len(cats) > 1 else "หมวดหลัก"
    print(f"#{i:02d} [{p['id']}] [{p['brand']}] {p['name']}")
    print(f"     Subcat: {subcat}")
    print(f"     Variants: {v_info}")
    print(f"     Current Filter: {fa}")
    print()
