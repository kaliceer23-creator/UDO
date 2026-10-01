import re
import json

def run():
    with open('udothai_shop.sql', 'r', encoding='utf-8', errors='ignore') as f:
        sql = f.read()

    # Parse categories
    cats = {}
    for line in sql.split('\n'):
        if line.startswith("INSERT INTO `categories_product`"):
            for m in re.finditer(r"\(([0-9]+),\s*'([^']*)',\s*[^,]+,\s*[^,]+,\s*([0-9]+|NULL)", line):
                cid = int(m.group(1))
                cname = m.group(2)
                cparent = int(m.group(3)) if m.group(3) != 'NULL' else None
                cats[cid] = {'id': cid, 'name': cname, 'parent_id': cparent}

    def get_descendants(root_id):
        desc = {root_id}
        added = True
        while added:
            added = False
            for cid, data in cats.items():
                if data['parent_id'] in desc and cid not in desc:
                    desc.add(cid)
                    added = True
        return desc

    cids_339 = get_descendants(339)
    cids_344 = get_descendants(344)

    # Category of product
    prod_cats = {}
    for line in sql.split('\n'):
        if line.startswith("INSERT INTO `categoryofproduct`"):
            for m in re.finditer(r"\([0-9]+,\s*([0-9]+),\s*([0-9]+)", line):
                cid = int(m.group(1))
                pid = int(m.group(2))
                if pid not in prod_cats:
                    prod_cats[pid] = set()
                prod_cats[pid].add(cid)

    # Brands
    bands = {}
    m_b = re.search(r"INSERT INTO `bands` VALUES (.*?);", sql, re.DOTALL)
    if m_b:
        for m in re.finditer(r"\(([0-9]+),\s*'([^']*)'", m_b.group(1)):
            bands[int(m.group(1))] = m.group(2)

    # Units
    units = {}
    m_u = re.search(r"INSERT INTO `units` VALUES (.*?);", sql, re.DOTALL)
    if m_u:
        for m in re.finditer(r"\(([0-9]+),\s*'([^']*)'", m_u.group(1)):
            units[int(m.group(1))] = m.group(2)

    # Items
    items = {}
    m_items = re.search(r"INSERT INTO `items` VALUES (.*?);", sql, re.DOTALL)
    if m_items:
        it_pattern = re.compile(r"\(([0-9]+),\s*([0-9]+),\s*'([^']*)',\s*([0-9\.]+),\s*([^,]+),\s*([0-9]+),\s*([0-9]+),\s*'[^']*',\s*'[^']*',\s*'([^']*)'")
        for m in it_pattern.finditer(m_items.group(1)):
            it_id, prod_id, size, price, discount, stock, unit_id, sku = m.groups()
            prod_id = int(prod_id)
            if prod_id not in items:
                items[prod_id] = []
            items[prod_id].append({
                'size': size,
                'price': float(price),
                'stock': int(stock),
                'unit': units.get(int(unit_id), ''),
                'sku': sku
            })

    # Products
    prods_339 = []
    prods_344 = []
    for line in sql.split('\n'):
        if line.startswith("INSERT INTO `products`"):
            for m in re.finditer(r"\(([0-9]+),\s*'((?:\\'|[^'])*)'", line):
                pid = int(m.group(1))
                pname = m.group(2).replace(r"\'", "'")
                cset = prod_cats.get(pid, set())
                if cset.intersection(cids_339):
                    prods_339.append({'id': pid, 'name': pname})
                elif cset.intersection(cids_344):
                    prods_344.append({'id': pid, 'name': pname})

    print(f"Products in 339: {len(prods_339)}")
    print(f"Products in 344: {len(prods_344)}")

    print("\n--- SAMPLE CATEGORY 339 (MACHINES) ---")
    for p in prods_339[:6]:
        vlist = items.get(p['id'], [])
        print(f"[{p['id']}] {p['name']} (Variants: {len(vlist)})")
        for v in vlist[:3]:
            print(f"   Size: '{v['size']}', Price: {v['price']}, Stock: {v['stock']}, Unit: '{v['unit']}', SKU: '{v['sku']}'")

    print("\n--- SAMPLE CATEGORY 344 (CONSUMABLES) ---")
    for p in prods_344[:8]:
        vlist = items.get(p['id'], [])
        print(f"[{p['id']}] {p['name']} (Variants: {len(vlist)})")
        for v in vlist[:4]:
            print(f"   Size: '{v['size']}', Price: {v['price']}, Stock: {v['stock']}, Unit: '{v['unit']}', SKU: '{v['sku']}'")

if __name__ == '__main__':
    run()
