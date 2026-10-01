import json
from collections import Counter
import re

with open('frontend/src/welding_products.json', 'r', encoding='utf-8') as f:
    prods = json.load(f)

gas_prods = [p for p in prods if p.get('filter_attributes', {}).get('category_type') == 'gas_equipment' or any(c.get('url_slug') == 'cat-312' for c in p.get('categories', []))]

def extract_gas_equipment_refined(p):
    name = p['name']
    name_upper = name.upper()
    sku = p.get('sku', '').upper()
    cats = [c['name'] for c in p.get('categories', [])]
    cat_str = " ".join(cats).upper()
    subcat = cats[1] if len(cats) > 1 else ""

    # Clean name for gas detection by removing brand names that collide with gas symbols
    clean_name = re.sub(r'\bHARRIS\b', '', name_upper)

    # 1. Brand Detection
    if 'GASWORK' in name_upper or sku.startswith('GW'):
        brand = 'GASWORK'
    elif 'IOXYGEN' in name_upper or sku.startswith('IO'):
        brand = 'IOXYGEN'
    elif 'HARRIS' in name_upper or sku.startswith('HA') or sku.startswith('HR'):
        brand = 'HARRIS'
    elif 'CHAMP' in name_upper or sku.startswith('CH'):
        brand = 'CHAMP'
    elif 'WELDSTAR' in name_upper or sku.startswith('WS'):
        brand = 'WELDSTAR'
    elif 'MORRIS' in name_upper or sku.startswith('MR'):
        brand = 'MORRIS'
    elif 'GOLD' in name_upper or sku.startswith('GD'):
        brand = 'GOLD'
    elif 'KOIKE' in name_upper:
        brand = 'KOIKE'
    elif 'TANAKA' in name_upper:
        brand = 'TANAKA'
    elif 'YAMATO' in name_upper:
        brand = 'YAMATO'
    elif 'GENTEC' in name_upper:
        brand = 'GENTEC'
    elif 'NANKAI' in name_upper:
        brand = 'NANKAI'
    elif 'POWERWELD' in name_upper:
        brand = 'POWERWELD'
    else:
        brand = p.get('brand', 'UDO')

    # 2. Equipment Type (ประเภทอุปกรณ์)
    if any(k in name for k in ["ชุดเชื่อมสนาม", "ชุดตัดสนาม", "ชุดเชื่อม-ตัดสนาม"]) or "สนาม" in name or subcat == "ชุดเชื่อม-ตัดสนาม":
        eq_type = "ชุดเชื่อม-ตัดแก๊สสนาม (Portable Outfits)"
    elif any(k in name for k in ["กันไฟย้อน", "กันย้อน", "เช็ควาล์ว"]) or any(k in clean_name for k in ["FLASHBACK", "ARRESTOR", "CHECK VALVE", "CVT"]) or subcat == "วาล์วกันย้อน (Flashback Arrestor)":
        eq_type = "วาล์วกันไฟย้อนและเช็ควาล์ว (Flashback Arrestor)"
    elif any(k in name for k in ["เกจ์", "เรกูเลเตอร์", "โฟลมิเตอร์", "โฟลเกจ์"]) or any(k in clean_name for k in ["REGULATOR", "FLOWMETER", "HPI"]) or subcat == "เกจ์ปรับแรงดันแก๊ส":
        eq_type = "เกจ์ปรับแรงดันแก๊สและมาตรวัด (Regulator & Flowmeter)"
    elif any(k in name for k in ["ชุดตัดแก๊ส", "ด้ามตัดแก๊ส", "ชุดตัด"]) or any(k in clean_name for k in ["CUTTING TORCH", "TORCH CUTTING"]):
        eq_type = "ชุดตัดแก๊สและด้ามตัด (Cutting Torch)"
    elif any(k in name for k in ["ชุดเผา", "หัวเผา", "ท่อเผา", "นมหนูหัวเผา", "ก้านต่อหัวเผา", "มิกเซอร์หัวเผา"]) or any(k in clean_name for k in ["HEATING TORCH", "HEATING TIP", "BUTANE TORCH"]) or subcat == "เผาแก๊ส":
        eq_type = "ชุดเผาแก๊สและหัวเผา (Heating Torch & Tips)"
    elif any(k in name for k in ["นมหนูหัวตัด", "นมหนูตัดแก๊ส", "นมหนูตัดเซาะร่อง", "หัวตัดแก๊ส"]) or any(k in clean_name for k in ["CUTTING TIP", "6290"]):
        eq_type = "นมหนูตัดแก๊ส (Cutting Tips)"
    elif any(k in name for k in ["นมหนูหัวเชื่อม", "นมหนูเชื่อมแก๊ส"]):
        eq_type = "นมหนูเชื่อมแก๊ส (Welding Tips)"
    elif any(k in name for k in ["ชุดเชื่อมแก๊ส", "ด้ามเชื่อมแก๊ส", "ด้ามจับหัวเชื่อม", "ก้านต่อหัวเชื่อม", "มิกเซอร์หัวเชื่อม", "หัวเชื่อมแก๊ส", "ชุดเชื่อมจิวเวลรี่", "ชุดเชื่อม-ตัด"]) or any(k in clean_name for k in ["WELDING TORCH", "WELDING TUBE"]) or subcat in ["เชื่อมแก๊ส", "เชื่อม-ตัด-เผา"]:
        eq_type = "ชุดเชื่อมแก๊สและด้ามเชื่อม (Welding Torch & Accessories)"
    elif any(k in name for k in ["สายแก๊ส", "สายลม", "สายคู่", "TWIN HOSE"]):
        eq_type = "สายแก๊สและสายลมคู่ (Gas Hoses)"
    elif any(k in name for k in ["วงเวียน", "ลูกล้อ"]):
        eq_type = "วงเวียนและล้อนำตัดแก๊ส (Cutting Compass & Guides)"
    else:
        eq_type = "ข้อต่อและอุปกรณ์เสริมงานแก๊ส (Fittings & Accessories)"

    # 3. Gas Type (ชนิดก๊าซ)
    # Check dual / multi gas
    if any(k in clean_name for k in ["AC/LPG", "LPG/AC", "AC / LPG", "LPG / AC"]) or "2 ระบบ" in name:
        gas_type = "ใช้งานได้ทั้ง AC และ LPG (2 ระบบ)"
    elif ("AR" in clean_name and "CO2" in clean_name) or "ผสม" in name:
        gas_type = "ก๊าซผสม (Ar+CO2 Mix)"
    # Check specific gases
    elif any(k in clean_name for k in ["คาร์บอน", "CO2", "CARBON"]) or "CRF-220" in clean_name:
        gas_type = "คาร์บอนไดออกไซด์ (CO2)"
    elif any(k in clean_name for k in ["อะเซทิลีน", "อาซิทีลีน", "อะเซทีลีน", "ACETYLENE"]) or re.search(r'\bAC\b', clean_name) or sku.endswith('AC') or 'AC ' in name:
        gas_type = "อะเซทิลีน (AC)"
    elif any(k in clean_name for k in ["แอลพีจี", "โพเพน", "โพรเพน", "LPG", "PROPANE", "ปิคนิค"]) or "6290-NX" in clean_name or "2290-" in clean_name or "HE-505" in clean_name or "HT-507" in clean_name or sku.endswith('LP') or 'LPG' in clean_name:
        gas_type = "แอลพีจี / โพรเพน (LPG)"
    elif any(k in clean_name for k in ["ไนโตรเจน", "NITROGEN"]) or re.search(r'\bN2\b', clean_name) or sku.endswith('N2') or sku.endswith('N'):
        gas_type = "ไนโตรเจน (N2)"
    elif any(k in clean_name for k in ["ฮีเลียม", "HELIUM"]) or re.search(r'\bHE\b', clean_name) or 'ลูกโป่ง' in name:
        gas_type = "ฮีเลียม (He)"
    elif any(k in clean_name for k in ["ไฮโดรเจน", "HYDROGEN"]) or re.search(r'\bH2\b', clean_name):
        gas_type = "ไฮโดรเจน (H2)"
    elif any(k in clean_name for k in ["ไนตรัส", "NITROUS"]) or "N2O" in clean_name:
        gas_type = "ไนตรัสออกไซด์ (N2O)"
    elif any(k in clean_name for k in ["บิวเทน", "BUTANE", "แก๊สกระป๋อง"]):
        gas_type = "แก๊สกระป๋อง / บิวเทน (Butane)"
    elif any(k in clean_name for k in ["อ๊อกซิเย่น", "ออกซิเจน", "OXYGEN"]) or re.search(r'\bO2\b', clean_name) or re.search(r'\bOX\b', clean_name) or sku.endswith('OX') or sku.endswith('O2'):
        gas_type = "อ๊อกซิเย่น (O2)"
    elif "อาร์กอน" in name or "อาร์ก้อน" in name or re.search(r'\bARGON\b', clean_name) or re.search(r'\bAR\b', clean_name) or sku.endswith('AR'):
        gas_type = "อาร์กอน (Ar)"
    elif "ลม" in name and ("AIR" in clean_name or "เกจ์" in name):
        gas_type = "ก๊าซแอร์ / ลม (Compressed Air)"
    # Fallback to subcategory
    elif "อาร์กอน" in cat_str or re.search(r'\bARGON\b', cat_str):
        gas_type = "อาร์กอน (Ar)"
    elif "คาร์บอน" in cat_str or "CO2" in cat_str:
        gas_type = "คาร์บอนไดออกไซด์ (CO2)"
    elif "อะเซทิลีน" in cat_str or "ACETYLENE" in cat_str:
        gas_type = "อะเซทิลีน (AC)"
    elif "แอลพีจี" in cat_str or "LPG" in cat_str:
        gas_type = "แอลพีจี / โพรเพน (LPG)"
    elif "อ๊อกซิเย่น" in cat_str or "OXYGEN" in cat_str:
        gas_type = "อ๊อกซิเย่น (O2)"
    elif "แก๊ส" in name and ("ต่อเกจ์แก๊ส" in name or "ต่อด้ามแก๊ส" in name or "เกจ์แก๊ส" in name or "เกลียวแก๊ส" in name or "FGL" in sku or "FBAC" in sku or "HTL" in sku or "188L" in sku):
        gas_type = "แก๊สเชื้อเพลิง (Fuel Gas: AC/LPG)"
    elif "ลม" in name and ("ต่อเกจ์ลม" in name or "ต่อด้ามลม" in name or "เกจ์ลม" in name or "เกลียวลม" in name or "FGR" in sku or "FBOX" in sku or "HTR" in sku or "188R" in sku):
        gas_type = "อ๊อกซิเย่น (O2)"
    elif eq_type == "ชุดเชื่อม-ตัดแก๊สสนาม (Portable Outfits)":
        gas_type = "แก๊สอ๊อกซิเย่น + อะเซทิลีน (O2 + AC)"
    else:
        gas_type = "อุปกรณ์ใช้งานร่วมทั่วไป"

    return brand, eq_type, gas_type

b_counts = Counter()
eq_counts = Counter()
g_counts = Counter()

for p in gas_prods:
    b, eq, g = extract_gas_equipment_refined(p)
    b_counts[b] += 1
    eq_counts[eq] += 1
    g_counts[g] += 1

print("=== BRANDS (338 products) ===")
for k, v in b_counts.most_common():
    print(f"  {k}: {v}")

print("\n=== EQUIPMENT TYPES (338 products) ===")
for k, v in eq_counts.most_common():
    print(f"  {k}: {v}")

print("\n=== GAS TYPES (338 products) ===")
for k, v in g_counts.most_common():
    print(f"  {k}: {v}")
