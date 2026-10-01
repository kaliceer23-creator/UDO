import json

with open('frontend/src/welding_products.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

print(f"Total catalog products: {len(products)}")

all_roots = [
    (12, "กลุ่มลวดเชื่อม", "welding_wire"),
    (312, "อุปกรณ์เชื่อมตัดเผาแก๊ส", "gas_equipment"),
    (344, "อะไหล่สิ้นเปลือง เครื่องตัดพลาสม่า เครื่องเชื่อม", "consumables"),
    (298, "ใบตัดใบเจียร", "abrasives"),
    (327, "ท่อบรรจุก๊าซ และวาล์ว", "gas_cylinders"),
    (339, "เครื่องเชื่อมและเครื่องตัดพลาสม่า", "machines"),
    (382, "วัสดุอุปกรณ์เคมีภัณฑ์สำหรับงานเชื่อม", "chemicals"),
    (398, "เครื่องมือช่าง", "tools")
]

for rid, rname, ctype in all_roots:
    slug = f"cat-{rid}"
    cat_prods = [p for p in products if any(c['url_slug'] == slug for c in p['categories'])]
    print(f"\n==========================================")
    print(f"Root {rid}: {rname} ({len(cat_prods)} products)")
    print(f"==========================================")
    
    # Check brands
    brands = set(p['brand'] for p in cat_prods)
    print(f"  Brands ({len(brands)}): {sorted(list(brands))[:8]}")

    # Check key facets
    if ctype == 'welding_wire':
        mats = set()
        for p in cat_prods:
            m = p.get('filter_attributes', {}).get('material', [])
            if isinstance(m, list): mats.update(m)
            elif m: mats.add(m)
        print(f"  Materials ({len(mats)}): {sorted(list(mats))[:6]}")
    elif ctype == 'machines':
        vols = set(p.get('filter_attributes', {}).get('voltage') for p in cat_prods if p.get('filter_attributes', {}).get('voltage'))
        amps = set(p.get('filter_attributes', {}).get('amperage') for p in cat_prods if p.get('filter_attributes', {}).get('amperage'))
        print(f"  Voltages: {sorted(list(vols))}")
        print(f"  Amperages ({len(amps)}): {sorted(list(amps))[:6]}")
    elif ctype == 'consumables':
        syss = set(p.get('filter_attributes', {}).get('torch_category') for p in cat_prods if p.get('filter_attributes', {}).get('torch_category'))
        parts = set(p.get('filter_attributes', {}).get('part_type') for p in cat_prods if p.get('filter_attributes', {}).get('part_type'))
        print(f"  Torch categories: {sorted(list(syss))}")
        print(f"  Part types ({len(parts)}): {sorted(list(parts))[:6]}")
    elif ctype == 'gas_equipment':
        gases = set(p.get('filter_attributes', {}).get('gas_type') for p in cat_prods if p.get('filter_attributes', {}).get('gas_type'))
        eqs = set(p.get('filter_attributes', {}).get('equipment_type') for p in cat_prods if p.get('filter_attributes', {}).get('equipment_type'))
        print(f"  Gas Types ({len(gases)}): {sorted(list(gases))}")
        print(f"  Equipment Types ({len(eqs)}): {sorted(list(eqs))[:6]}")
    elif ctype == 'abrasives':
        discs = set(p.get('filter_attributes', {}).get('disc_type') for p in cat_prods if p.get('filter_attributes', {}).get('disc_type'))
        dias = set(p.get('filter_attributes', {}).get('diameter') for p in cat_prods if p.get('filter_attributes', {}).get('diameter'))
        tmats = set(p.get('filter_attributes', {}).get('target_material') for p in cat_prods if p.get('filter_attributes', {}).get('target_material'))
        print(f"  Disc Types ({len(discs)}): {sorted(list(discs))}")
        print(f"  Diameters ({len(dias)}): {sorted(list(dias))}")
        print(f"  Target Materials: {sorted(list(tmats))}")
    elif ctype == 'gas_cylinders':
        gases = set(p.get('filter_attributes', {}).get('gas_type') for p in cat_prods if p.get('filter_attributes', {}).get('gas_type'))
        caps = set(p.get('filter_attributes', {}).get('capacity') for p in cat_prods if p.get('filter_attributes', {}).get('capacity'))
        items = set(p.get('filter_attributes', {}).get('item_type') for p in cat_prods if p.get('filter_attributes', {}).get('item_type'))
        print(f"  Gas Types: {sorted(list(gases))}")
        print(f"  Capacities ({len(caps)}): {sorted(list(caps))[:6]}")
        print(f"  Item Types ({len(items)}): {sorted(list(items))}")
    elif ctype == 'chemicals':
        ctypes = set(p.get('filter_attributes', {}).get('chemical_type') for p in cat_prods if p.get('filter_attributes', {}).get('chemical_type'))
        forms = set(p.get('filter_attributes', {}).get('form') for p in cat_prods if p.get('filter_attributes', {}).get('form'))
        print(f"  Chemical Types: {sorted(list(ctypes))}")
        print(f"  Packaging Forms: {sorted(list(forms))}")
    elif ctype == 'tools':
        ttypes = set(p.get('filter_attributes', {}).get('tool_type') for p in cat_prods if p.get('filter_attributes', {}).get('tool_type'))
        powers = set(p.get('filter_attributes', {}).get('power_system') for p in cat_prods if p.get('filter_attributes', {}).get('power_system'))
        print(f"  Tool Types: {sorted(list(ttypes))}")
        print(f"  Power Systems: {sorted(list(powers))}")
