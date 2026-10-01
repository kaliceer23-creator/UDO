import json

with open('frontend/src/welding_products.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

print(f"Total products in JSON: {len(products)}")

sample_categories = ['gas_equipment', 'abrasives', 'gas_cylinders', 'chemicals', 'tools']
for ctype in sample_categories:
    matched = [p for p in products if p.get('filter_attributes', {}).get('category_type') == ctype]
    print(f"\n--- Category Type: {ctype} ({len(matched)} products) ---")
    if matched:
        p = matched[0]
        print(f"ID: {p['id']}, Name: {p['name']}, Brand: {p['brand']}")
        print(f"Filter Attributes: {json.dumps(p['filter_attributes'], ensure_ascii=False)}")
        print(f"Variants count: {len(p['variants'])}, First variant: {p['variants'][0]}")
        print(f"Categories: {[c['name'] for c in p['categories']]}")
