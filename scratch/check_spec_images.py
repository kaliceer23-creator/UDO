import re
import json

with open('frontend/src/welding_products.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

pids = {p['id']: p for p in products}

with open('udothai_shop.sql', 'r', encoding='utf-8', errors='ignore') as f:
    sql = f.read()

matches = re.finditer(r"\((\d+),\s*'([^']+)',\s*'([^']*)',\s*'(.*?)',\s*'\[", sql, re.DOTALL)

matched = []
for m in matches:
    pid = f"udo-{m.group(1)}"
    if pid in pids:
        desc = m.group(4).replace(r'\"', '"').replace(r"\'", "'")
        imgs = re.findall(r'<img[^>]+src=["\']([^"\'>]+)["\']', desc)
        real_imgs = [im for im in imgs if 'storage/' in im and 'fbcdn' not in im and 'emoji' not in im]
        if real_imgs:
            matched.append((pid, m.group(2), real_imgs))

print(f"Matched active products: {len(matched)}")
for p in matched[:15]:
    print(f"{p[0]}: {p[1]}")
    for im in p[2]:
        print(f"   -> {im}")
