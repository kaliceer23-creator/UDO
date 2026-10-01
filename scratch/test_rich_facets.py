import sys, os, json
sys.path.insert(0, os.path.abspath('.'))

with open('frontend/src/welding_products.json') as f:
    prods = json.load(f)

print(f"Loaded {len(prods)} products")

sample = prods[0]
print("\nProduct 0 sample:")
print("Name:", sample['name'])
print("Variants count:", len(sample['variants']))
print("Specs map:", {s['key']: s['value'] for s in sample['specsTable']})

sizes = list(dict.fromkeys([v['size'] for v in sample['variants'] if v.get('size') and v['size'] != 'มาตรฐาน']))
packages = list(dict.fromkeys([v['package'] for v in sample['variants'] if v.get('package')]))
specs_map = {s['key']: s['value'] for s in sample['specsTable']}
standards = []
if 'การจำแนกประเภท' in specs_map:
    standards.append(specs_map['การจำแนกประเภท'])
if 'มาตรฐานรับรอง' in specs_map:
    for std in specs_map['มาตรฐานรับรอง'].split(','):
        s_clean = std.strip()
        if s_clean and s_clean not in standards:
            standards.append(s_clean)

positions = []
if 'ท่าเชื่อม' in specs_map:
    for pos in specs_map['ท่าเชื่อม'].split(','):
        p_clean = pos.strip()
        if p_clean and p_clean not in positions:
            positions.append(p_clean)

print("Sizes:", sizes)
print("Packages:", packages)
print("Standards:", standards)
print("Positions:", positions)
