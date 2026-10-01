import json
from collections import Counter
import re

with open('frontend/src/welding_products.json', 'r', encoding='utf-8') as f:
    prods = json.load(f)

gas_prods = [p for p in prods if p.get('filter_attributes', {}).get('category_type') == 'gas_equipment' or any(c.get('url_slug') == 'cat-312' for c in p.get('categories', []))]

# 1. Investigate the 106 "UDO" branded products
print("=== SAMPLE OF 'UDO' BRANDED PRODUCTS (first 30) ===")
udo_prods = [p for p in gas_prods if p.get('brand') == 'UDO']
print(f"Total 'UDO' branded items: {len(udo_prods)}")
for p in udo_prods[:30]:
    cats = [c['name'] for c in p.get('categories', [])]
    sub = cats[1] if len(cats) > 1 else "-"
    print(f"ID: {p['id']} | Subcat: {sub} | SKU: {p.get('sku')} | Name: {p['name']}")

# Check SKUs and name keywords in udo_prods
print("\n=== Brand hints in 'UDO' products ===")
udo_hints = Counter()
for p in udo_prods:
    n = p['name'].upper()
    s = p.get('sku', '').upper()
    found = False
    for b in ["CHAMP", "HARRIS", "KOIKE", "TANAKA", "YAMATO", "WELDSTAR", "MORRIS", "GENTEC", "SUMO", "NANKAI", "POWERWELD", "VICTOR", "HERO", "ASADA"]:
        if b in n or b in s:
            udo_hints[b] += 1
            found = True
    if not found:
        udo_hints["NO_HINT"] += 1

print(udo_hints)
