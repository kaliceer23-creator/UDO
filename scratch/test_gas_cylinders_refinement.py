import re
from scratch.inspect_gas_cylinders_deep import products_raw, cats

def refine_gas_cylinder_specs(name, cat_ids, band_id, desc=""):
    name_upper = name.upper()
    cat_names = [cats.get(cid, {}).get('name', '') for cid in cat_ids]
    cat_str = " ".join(cat_names).upper()

    # 1. Item Type (ประเภทสินค้า - ต้องเช็ครถเข็นและหัววาล์วก่อนท่อ เพื่อป้องกันทับซ้อน)
    if "รถเข็น" in name or "หูหิ้ว" in name or 338 in cat_ids:
        item_type = "รถเข็นท่อบรรจุก๊าซ (Trolley)"
    elif "หัววาล์ว" in name or "วาล์ว" in name or 337 in cat_ids:
        item_type = "หัววาล์วท่อก๊าซ (Valve)"
    elif "สายอัด" in name or 388 in cat_ids:
        item_type = "สายอัดก๊าซและอุปกรณ์เสริม"
    elif "ถังกำเนิดแก๊ส" in name or 334 in cat_ids:
        item_type = "ถังกำเนิดแก๊ส (Carbide Generator)"
    elif "แก๊สกระป๋อง" in name or 335 in cat_ids:
        item_type = "แก๊สกระป๋อง"
    elif "แก๊สก้อน" in name or 336 in cat_ids:
        item_type = "แก๊สก้อน (Carbide)"
    elif "ท่อบรรจุ" in name or "ท่อก๊าซ" in name or any(cid in cat_ids for cid in [328, 329, 330, 331, 332, 333]):
        item_type = "ท่อบรรจุก๊าซ (Cylinder)"
    else:
        item_type = "อุปกรณ์ท่อก๊าซ"

    # 2. Gas Type (ชนิดก๊าซ - ตรวจสอบ CO2 และ AC ก่อน O2/AR เพื่อป้องกัน substring match)
    gas_type = "อุปกรณ์ทั่วไป"
    if any(k in name_upper or k in cat_str for k in ["คาร์บอน", "CO2"]):
        gas_type = "ก๊าซคาร์บอนไดออกไซด์ (CO2)"
    elif any(k in name_upper or k in cat_str for k in ["อะเซทีลีน", "AC"]):
        gas_type = "ก๊าซอะเซทีลีน (AC)"
    elif any(k in name_upper or k in cat_str for k in ["อาร์กอน", "ARGON"]) or (re.search(r'\bAR\b', name_upper) or re.search(r'\bAR\b', cat_str)):
        gas_type = "ก๊าซอาร์กอน (Ar)"
    elif any(k in name_upper or k in cat_str for k in ["ไนโตรเจน", "NITROGEN"]) or (re.search(r'\bN2\b', name_upper) or re.search(r'\bN2\b', cat_str)):
        gas_type = "ก๊าซไนโตรเจน (N2)"
    elif any(k in name_upper or k in cat_str for k in ["อ๊อกซิเย่น", "ออกซิเจน", "OXYGEN"]) or (re.search(r'\bO2\b', name_upper) or re.search(r'\bO2\b', cat_str)):
        gas_type = "ก๊าซอ๊อกซิเย่น (O2)"
    elif any(k in name_upper or k in cat_str for k in ["ฮีเลียม", "HELIUM"]) or (re.search(r'\bHE\b', name_upper) or re.search(r'\bHE\b', cat_str)):
        gas_type = "ก๊าซฮีเลียม (He)"
    elif any(k in name_upper or k in cat_str for k in ["แก๊สกระป๋อง"]):
        gas_type = "แก๊สกระป๋อง"
    elif any(k in name_upper or k in cat_str for k in ["แก๊สก้อน", "ถังกำเนิดแก๊ส"]):
        gas_type = "แก๊สก้อน / แคลเซียมคาร์ไบด์"

    # 3. Capacity / Volume (ขนาดบรรจุ / ปริมาตร)
    cap = None
    if "6 คิว" in name or "40 ลิตร" in name:
        cap = "6 คิว (40L)"
    elif "2 คิว" in name or "13.4 ลิตร" in name:
        cap = "2 คิว (13.4L)"
    elif "1.5 คิว" in name or "10 ลิตร" in name:
        cap = "1.5 คิว (10L)"
    elif "0.5 คิว" in name or "3.4 ลิตร" in name or re.search(r'\b4\s*ลิตร', name):
        if "ผอม" in name:
            cap = "0.5 คิว (3.4L ทรงผอม)"
        elif "อ้วน" in name:
            cap = "0.5 คิว (4L ทรงอ้วน)"
        else:
            cap = "0.5 คิว (3.4-4L)"
    elif "5 กก" in name or "5กก" in name:
        cap = "5 กก."
    elif "3 กก" in name or "3กก" in name:
        cap = "3 กก."
    else:
        # Check standard thread for valves & hoses
        m_cga = re.search(r'(CGA[- ]?\d+)', name, re.I)
        if m_cga:
            cap = f"มาตรฐาน {m_cga.group(1).upper()}"
        else:
            cap = "ขนาดมาตรฐาน"

    # 4. Brand
    brand = "CHAMP"
    if "HERO" in name_upper: brand = "HERO"
    elif "CHAMPION" in name_upper: brand = "CHAMPION"
    elif "ตราร่ม" in name: brand = "ตราร่ม"

    specs = [
        {"key": "ประเภทสินค้า", "value": item_type},
        {"key": "ชนิดก๊าซที่รองรับ", "value": gas_type},
        {"key": "ขนาดบรรจุ / ปริมาตร", "value": cap},
        {"key": "แบรนด์ผู้ผลิต", "value": brand},
        {"key": "มาตรฐานความปลอดภัย", "value": "ผ่านการตรวจสอบแรงดันท่อมาตรฐาน มอก. / มาตรฐานความปลอดภัยอุตสาหกรรม"}
    ]

    return item_type, gas_type, cap, brand, specs

# Run on all 63 products
results = []
for p in sorted(products_raw.values(), key=lambda x: x['id']):
    it, gt, cp, br, sp = refine_gas_cylinder_specs(p['name'], p['cat_ids'], p.get('band_id'), p['desc'])
    results.append({
        "id": p['id'],
        "name": p['name'],
        "brand": br,
        "item_type": it,
        "gas_type": gt,
        "capacity": cp
    })

print("=== REFINED RESULTS FOR 63 GAS PRODUCTS ===")
from collections import Counter
print("Brands:", dict(Counter(r['brand'] for r in results)))
print("\nItem Types:", dict(Counter(r['item_type'] for r in results)))
print("\nGas Types:", dict(Counter(r['gas_type'] for r in results)))
print("\nCapacities:", dict(Counter(r['capacity'] for r in results)))

print("\n--- SAMPLE BY ITEM TYPE ---")
for itype in ["ท่อบรรจุก๊าซ (Cylinder)", "รถเข็นท่อบรรจุก๊าซ (Trolley)", "หัววาล์วท่อก๊าซ (Valve)", "ถังกำเนิดแก๊ส (Carbide Generator)", "แก๊สกระป๋อง", "สายอัดก๊าซและอุปกรณ์เสริม"]:
    print(f"\n--- {itype} ---")
    for r in [x for x in results if x['item_type'] == itype]:
        print(f"ID {r['id']}: [{r['brand']}] {r['name']} -> Gas: {r['gas_type']} | Cap: {r['capacity']}")
