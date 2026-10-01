import re

with open('udothai_shop.sql', 'r', encoding='utf-8', errors='ignore') as f:
    sql_text = f.read()

# Categories
cats = {}
for line in sql_text.split('\n'):
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

# Product categories
prod_cats = {}
for m in re.finditer(r"INSERT INTO `categoryofproduct` VALUES (.*?);", sql_text, re.DOTALL):
    chunk = m.group(1)
    for row in re.finditer(r"\(([0-9]+),\s*([0-9]+|NULL),\s*([0-9]+|NULL)", chunk):
        cid_str = row.group(2)
        pid_str = row.group(3)
        if cid_str != 'NULL' and pid_str != 'NULL':
            cid = int(cid_str)
            pid = int(pid_str)
            if pid not in prod_cats:
                prod_cats[pid] = set()
            prod_cats[pid].add(cid)

# Parse products line-by-line
products = {}
for line in sql_text.split('\n'):
    if line.startswith("INSERT INTO `products`"):
        for m in re.finditer(r"\(([0-9]+),\s*'((?:\\'|[^'])*)',\s*(?:'((?:\\'|[^'])*)'|NULL),\s*(?:'(.*?)'|NULL)", line):
            pid = int(m.group(1))
            pname = m.group(2).replace("\\'", "'")
            short_desc = (m.group(3) or "").replace("\\'", "'")
            desc = (m.group(4) or "").replace("\\'", "'")
            products[pid] = {'id': pid, 'name': pname, 'short_desc': short_desc, 'desc': desc}

# 327: Gas Cylinders & Valves
def extract_gas_cylinder_specs(name, cat_ids):
    name_upper = name.upper()
    cat_names = [cats.get(cid, {}).get('name', '') for cid in cat_ids]
    cat_str = " ".join(cat_names).upper()

    gas_type = "ก๊าซทั่วไป"
    if any(k in name_upper or k in cat_str for k in ["อาร์กอน", "ARGON", "AR"]): gas_type = "ก๊าซอาร์กอน (Ar)"
    elif any(k in name_upper or k in cat_str for k in ["ไนโตรเจน", "NITROGEN", "N2"]): gas_type = "ก๊าซไนโตรเจน (N2)"
    elif any(k in name_upper or k in cat_str for k in ["อ๊อกซิเย่น", "ออกซิเจน", "OXYGEN", "O2"]): gas_type = "ก๊าซอ๊อกซิเย่น (O2)"
    elif any(k in name_upper or k in cat_str for k in ["คาร์บอน", "CO2"]): gas_type = "ก๊าซคาร์บอนไดออกไซด์ (CO2)"
    elif any(k in name_upper or k in cat_str for k in ["ฮีเลียม", "HELIUM", "HE"]): gas_type = "ก๊าซฮีเลียม (He)"
    elif any(k in name_upper or k in cat_str for k in ["แก๊สกระป๋อง", "แก๊สก้อน"]): gas_type = "แก๊สกระป๋อง / แก๊สก้อน"

    cap = "มาตรฐาน"
    m_cap = re.search(r'(\d+(?:\.\d+)?)\s*(?:คิว|ลิตร|L|kg|กก)', name, re.I)
    if "0.5 คิว" in name or "3.4 ลิตร" in name or "4 ลิตร" in name: cap = "0.5 คิว (3.4-4L)"
    elif "1.5 คิว" in name or "10 ลิตร" in name: cap = "1.5 คิว (10L)"
    elif "2 คิว" in name or "13.4 ลิตร" in name: cap = "2 คิว (13.4L)"
    elif "6 คิว" in name or "40 ลิตร" in name: cap = "6 คิว (40L)"
    elif "7 คิว" in name or "47 ลิตร" in name: cap = "7 คิว (47L)"
    elif m_cap: cap = m_cap.group(0)

    item_type = "อุปกรณ์ท่อก๊าซ"
    if "ท่อบรรจุ" in name or "ท่อก๊าซ" in name: item_type = "ท่อบรรจุก๊าซ (Cylinder)"
    elif "วาล์ว" in name or "หัววาล์ว" in name: item_type = "หัววาล์วท่อก๊าซ (Valve)"
    elif "รถเข็น" in name: item_type = "รถเข็นท่อบรรจุก๊าซ (Trolley)"
    elif "แก๊สกระป๋อง" in name or "แก๊สก้อน" in name: item_type = "แก๊สกระป๋องและสารเคมีก๊าซ"

    return gas_type, cap, item_type

# 382: Chemicals
def extract_chemical_specs(name, cat_ids):
    name_upper = name.upper()
    cat_names = [cats.get(cid, {}).get('name', '') for cid in cat_ids]
    cat_str = " ".join(cat_names).upper()

    chem_type = "เคมีภัณฑ์งานเชื่อม"
    if any(k in name_upper or k in cat_str for k in ["N.D.T", "NDT", "ตรวจสอบ", "ตรวจเช็ค", "PENETRANT", "DEVELOPER", "REMOVER"]):
        chem_type = "น้ำยาตรวจเช็ครอยร้าวแนวเชื่อม (N.D.T.)"
    elif any(k in name_upper or k in cat_str for k in ["ป้องกันสะเก็ด", "SPATTE", "SPAZERO", "กันสะเก็ด"]):
        chem_type = "น้ำยาป้องกันสะเก็ดไฟเชื่อม (Anti-Spatter)"
    elif any(k in name_upper or k in cat_str for k in ["ทำความสะอาด", "ล้างแนวเชื่อม", "เคลือบผิว", "SUS CARE", "PICKLING"]):
        chem_type = "น้ำยาล้างแนวเชื่อมและเคลือบผิวสแตนเลส"
    elif any(k in name_upper or k in cat_str for k in ["ประสาน", "FLUX", "ฟลักซ์"]):
        chem_type = "น้ำยาประสาน / ฟลักซ์เชื่อม (Flux)"

    form = "สเปรย์กระป๋อง"
    if any(k in name_upper for k in ["แกลลอน", "ถัง", "ลิตร", "KG", "กก"]): form = "ถัง / แกลลอน (Liquid)"
    elif any(k in name_upper for k in ["เจล", "ตลับ", "PASTE", "ครีม"]): form = "เจล / ครีมทา (Paste)"

    brand = "UDO"
    for b in ["NABAKEM", "TASETO", "WHALESPRAY", "HARRIS"]:
        if b in name_upper:
            brand = b
            break

    return chem_type, form, brand

# 398: Tools
def extract_tool_specs(name, cat_ids):
    name_upper = name.upper()
    cat_names = [cats.get(cid, {}).get('name', '') for cid in cat_ids]
    cat_str = " ".join(cat_names).upper()

    tool_type = "เครื่องมือช่าง"
    if "สว่าน" in name: tool_type = "สว่านไร้สาย / สว่านกระแทก"
    elif "บล็อก" in name: tool_type = "บล็อกกระแทกไร้สาย (Impact Wrench)"
    elif "เจียร" in name: tool_type = "เครื่องเจียรไฟฟ้า (Angle Grinder)"
    elif "เลื่อย" in name: tool_type = "เลื่อยและเครื่องตัดไฟฟ้า"

    power_system = "ไฟฟ้า 220V"
    if "20V" in name_upper: power_system = "ไร้สาย 20V (Cordless)"
    elif "12V" in name_upper: power_system = "ไร้สาย 12V (Cordless)"

    brand = "EMTOP" if "EMTOP" in name_upper else "UDO"

    return tool_type, power_system, brand

print("=== TESTING ROOT 327: GAS CYLINDERS ===")
desc_cids_327 = get_descendants(327)
pids_327 = [pid for pid, cids in prod_cats.items() if cids.intersection(desc_cids_327)]
gtypes_327 = set()
caps_327 = set()
itypes_327 = set()
for pid in pids_327:
    gt, cp, it = extract_gas_cylinder_specs(products.get(pid, {}).get('name', ''), prod_cats[pid])
    gtypes_327.add(gt)
    caps_327.add(cp)
    itypes_327.add(it)
print(f"Products: {len(pids_327)}")
print(f"Gas Types ({len(gtypes_327)}): {sorted(list(gtypes_327))}")
print(f"Capacities ({len(caps_327)}): {sorted(list(caps_327))}")
print(f"Item Types ({len(itypes_327)}): {sorted(list(itypes_327))}")

print("\n=== TESTING ROOT 382: CHEMICALS ===")
desc_cids_382 = get_descendants(382)
pids_382 = [pid for pid, cids in prod_cats.items() if cids.intersection(desc_cids_382)]
chem_types = set()
chem_forms = set()
chem_brands = set()
for pid in pids_382:
    ct, cf, cb = extract_chemical_specs(products.get(pid, {}).get('name', ''), prod_cats[pid])
    chem_types.add(ct)
    chem_forms.add(cf)
    chem_brands.add(cb)
print(f"Products: {len(pids_382)}")
print(f"Chemical Types ({len(chem_types)}): {sorted(list(chem_types))}")
print(f"Forms ({len(chem_forms)}): {sorted(list(chem_forms))}")
print(f"Brands ({len(chem_brands)}): {sorted(list(chem_brands))}")

print("\n=== TESTING ROOT 398: TOOLS ===")
desc_cids_398 = get_descendants(398)
pids_398 = [pid for pid, cids in prod_cats.items() if cids.intersection(desc_cids_398)]
tool_types = set()
powers = set()
tool_brands = set()
for pid in pids_398:
    tt, ps, tb = extract_tool_specs(products.get(pid, {}).get('name', ''), prod_cats[pid])
    tool_types.add(tt)
    powers.add(ps)
    tool_brands.add(tb)
print(f"Products: {len(pids_398)}")
print(f"Tool Types ({len(tool_types)}): {sorted(list(tool_types))}")
print(f"Power Systems ({len(powers)}): {sorted(list(powers))}")
print(f"Brands ({len(tool_brands)}): {sorted(list(tool_brands))}")
