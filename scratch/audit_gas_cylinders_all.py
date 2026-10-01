import re
from scratch.inspect_gas_cylinders_deep import products_raw

print("Total products in Root 327:", len(products_raw))

for p in sorted(products_raw.values(), key=lambda x: x['id']):
    print(f"ID {p['id']}: [{p['brand']}] {p['name']} | Subcats: {p['categories']}")
