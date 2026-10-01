import re
import json

for filepath in ['frontend/src/welding_products.json', 'frontend/src/pilot_products_5.json']:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            products = json.load(f)
        
        pids = {p['id']: p for p in products}

        with open('udothai_shop.sql', 'r', encoding='utf-8', errors='ignore') as f:
            sql = f.read()

        matches = re.finditer(r"\((\d+),\s*'([^']+)',\s*'([^']*)',\s*'(.*?)',\s*'\[", sql, re.DOTALL)

        updated_docs = 0
        for m in matches:
            pid = f"udo-{m.group(1)}"
            if pid in pids:
                desc = m.group(4).replace(r'\"', '"').replace(r"\'", "'")
                imgs = re.findall(r'<img[^>]+src=["\']([^"\'>]+)["\']', desc)
                real_imgs = [im.strip().replace(" ", "%20") for im in imgs if 'storage/' in im and 'fbcdn' not in im and 'emoji' not in im]
                
                p = pids[pid]
                rc = p.setdefault('richContent', {})
                if real_imgs:
                    rc['image1'] = real_imgs[0]
                    rc['image2'] = real_imgs[1] if len(real_imgs) > 1 else None
                    rc['image3'] = real_imgs[2] if len(real_imgs) > 2 else None
                    rc['isDocument'] = True
                    updated_docs += 1
                else:
                    if 'isDocument' not in rc:
                        rc['isDocument'] = False

        for p in products:
            rc = p.get('richContent') or {}
            if 'isDocument' not in rc:
                rc['isDocument'] = False

        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(products, f, ensure_ascii=False, indent=2)

        print(f"{filepath}: Successfully tagged {updated_docs} products with real document images.")
    except Exception as e:
        print(f"{filepath} error: {e}")
