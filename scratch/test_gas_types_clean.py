import json
from collections import Counter
import re

with open('frontend/src/welding_products.json', 'r', encoding='utf-8') as f:
    prods = json.load(f)

gas_prods = [p for p in prods if p.get('filter_attributes', {}).get('category_type') == 'gas_equipment' or any(c.get('url_slug') == 'cat-312' for c in p.get('categories', []))]

def extract_gas_type_clean(name, cat_ids, cats_dict, cat_names):
    name_upper = name.upper()
    cat_str = " ".join(cat_names).upper()

    # Clean name by removing brand names like HARRIS, CARBON, etc. to prevent false positives
    clean_name = re.sub(r'\bHARRIS\b', '', name_upper)

    # 1. Dual gas / AC/LPG check
    if any(k in clean_name for k in ["AC/LPG", "LPG/AC", "AC / LPG", "LPG / AC"]):
        return "ใช้งานได้ทั้ง AC และ LPG (2 ระบบ)"

    # 2. Mixed gas check (Ar + CO2)
    if ("AR" in clean_name and "CO2" in clean_name) or "ผสม" in name:
        return "ก๊าซผสม (Ar+CO2 Mix)"

    # 3. Specific gases
    # CO2 check (must be before O2 because CO2 ends in O2)
    if any(k in clean_name for k in ["คาร์บอน", "CO2", "CARBON"]):
        return "คาร์บอนไดออกไซด์ (CO2)"

    # Acetylene check
    if any(k in clean_name for k in ["อะเซทิลีน", "อาซิทีลีน", "อะเซทีลีน", "ACETYLENE"]) or re.search(r'\bAC\b', clean_name):
        return "อะเซทิลีน (AC)"

    # LPG / Propane check
    if any(k in clean_name for k in ["แอลพีจี", "โพเพน", "โพรเพน", "LPG", "PROPANE"]):
        return "แอลพีจี / โพรเพน (LPG)"

    # Nitrogen check
    if any(k in clean_name for k in ["ไนโตรเจน", "NITROGEN"]) or re.search(r'\bN2\b', clean_name):
        return "ไนโตรเจน (N2)"

    # Helium check
    if any(k in clean_name for k in ["ฮีเลียม", "HELIUM"]) or re.search(r'\bHE\b', clean_name):
        return "ฮีเลียม (He)"

    # Oxygen check
    if any(k in clean_name for k in ["อ๊อกซิเย่น", "ออกซิเจน", "OXYGEN"]) or re.search(r'\bO2\b', clean_name) or re.search(r'\bOX\b', clean_name):
        return "อ๊อกซิเย่น (O2)"

    # Argon check (strictly word boundary or Thai name)
    if "อาร์กอน" in name or "อาร์ก้อน" in name or re.search(r'\bARGON\b', clean_name) or re.search(r'\bAR\b', clean_name):
        return "อาร์กอน (Ar)"

    # If category name gives a hint
    if "อาร์กอน" in cat_str or re.search(r'\bARGON\b', cat_str):
        return "อาร์กอน (Ar)"
    if "คาร์บอน" in cat_str or "CO2" in cat_str:
        return "คาร์บอนไดออกไซด์ (CO2)"
    if "อะเซทิลีน" in cat_str or "ACETYLENE" in cat_str:
        return "อะเซทิลีน (AC)"
    if "แอลพีจี" in cat_str or "LPG" in cat_str:
        return "แอลพีจี / โพรเพน (LPG)"
    if "อ๊อกซิเย่น" in cat_str or "OXYGEN" in cat_str:
        return "อ๊อกซิเย่น (O2)"

    return "อุปกรณ์ใช้งานร่วมทั่วไป"

gas_counts = Counter()
for p in gas_prods:
    cats = [c['name'] for c in p.get('categories', [])]
    gt = extract_gas_type_clean(p['name'], [], {}, cats)
    gas_counts[gt] += 1

print("=== CLEAN GAS TYPES (338 products) ===")
for gt, c in gas_counts.most_common():
    print(f"  {gt}: {c}")
