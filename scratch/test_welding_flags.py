import re, sys, os
sys.path.insert(0, os.path.abspath('.'))
with open('udothai_shop.sql', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

# Welding PIDs from udo_migration_engine.py
from udo_migration_engine import load_database
import json

with open('frontend/src/welding_products.json') as f:
    prods = json.load(f)

welding_pids = {int(p['id'].replace('udo-', '')) for p in prods}

def parse_flags_from_entry(entry):
    m = re.search(r",\s*([0-1])\s*,\s*([0-1])\s*,\s*(?:'[^']*'|NULL),\s*(?:'[^']*'|NULL),\s*(?:'[^']*'|NULL),\s*(\d+)", entry)
    if m:
        promo = int(m.group(1))
        rec = int(m.group(2))
        good_sales = int(m.group(3))
        return promo, rec, good_sales
    return 0, 0, 0

promo_c = 0
rec_c = 0
sales_c = 0

for line in text.split('\n'):
    if line.startswith("INSERT INTO `products`"):
        for pid in welding_pids:
            pos = line.find(f"({pid},")
            if pos != -1:
                end = line.find("),(", pos)
                entry = line[pos:end] if end != -1 else line[pos:line.find(");", pos)]
                pr, rc, gs = parse_flags_from_entry(entry)
                if pr: promo_c += 1
                if rc: rec_c += 1
                if gs: sales_c += 1

print(f"Welding products flags in DB:")
print(f"  Promotion: {promo_c}")
print(f"  Recommended: {rec_c}")
print(f"  Good Sales: {sales_c}")
