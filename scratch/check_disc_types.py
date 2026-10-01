import json

with open('frontend/src/welding_products.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

abrasives = [p for p in products if p.get('filter_attributes', {}).get('category_type') == 'abrasives']
print(f"Total abrasives in welding_products.json: {len(abrasives)}")

disc_types = {}
for p in abrasives:
    dt = p['filter_attributes'].get('disc_type')
    disc_types.setdefault(dt, []).append(p['name'])

for dt, items in disc_types.items():
    print(f"\nType '{dt}' ({len(items)} items):")
    for item in items[:5]:
        print(f"  - {item}")
