import re
import json

with open('frontend/src/welding_products.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

abrasives = [p for p in products if p.get('filter_attributes', {}).get('category_type') == 'abrasives']

def refine_abrasives_specs(p):
    name = p['name']
    name_upper = name.upper()
    variants = p.get('variants', [])
    first_var_size = variants[0].get('size', '') if variants else ''

    # 1. Real Brand Correction (SUMO PID 2694 has NKK band_id in legacy DB)
    brand = p['brand']
    if 'SUMO' in name_upper:
        brand = 'SUMO'
    elif 'YAWATA' in name_upper:
        brand = 'YAWATA'
    elif 'NKK' in name_upper:
        brand = 'NKK'

    # 2. Disc Type (ประเภทใบ)
    # Check grinding first, then flap disc, then cutting disc
    disc_type = 'ใบตัด'
    if 'ล้อทราย' in name:
        disc_type = 'ล้อทรายมีแกน'
    elif 'จานทราย' in name:
        if 'หลังอ่อน' in name:
            disc_type = 'จานทรายซ้อนหลังอ่อน'
        elif 'หลังแข็ง' in name:
            disc_type = 'จานทรายซ้อนหลังแข็ง'
        else:
            disc_type = 'จานทรายซ้อน'
    elif any(k in name for k in ['แผ่นเจียรกระจก', 'เจียรกระจก', 'GC60', 'GC80', 'GC120']):
        disc_type = 'ใบเจียรกระจก / หิน'
    elif any(k in name for k in ['เจียรเหล็กบาง', 'เจียรแสตนเลส', 'เจียรบาง']) and any(k in name or k in first_var_size for k in ['2 mm', '2.2 mm', '3 mm', '2.0', 'X2', 'X3']):
        disc_type = 'ใบเจียรบาง (2 - 3 มม.)'
    elif any(k in name for k in ['เจียรเหล็กหนา', 'เจียรหนา', 'A24R', 'AWA24']) or any(k in name or k in first_var_size for k in ['4 mm', '6 mm', 'X4', 'X6']):
        disc_type = 'ใบเจียรหนา (4 - 6 มม.)'
    elif 'เจียร' in name:
        disc_type = 'ใบเจียร'
    elif 'ใบตัด' in name:
        disc_type = 'ใบตัด (Cutting Disc)'

    # 3. Diameter / Size (ขนาดใบ)
    # Never leave "มาตรฐาน"! Check name and variants
    dia = None
    # Check 4", 5", 6", 7", 9", 12", 14", 16"
    m_dia = re.search(r'(\d+(?:\.\d+)?)\s*(?:นิ้ว|\"|\'\')', name)
    if not m_dia:
        m_dia = re.search(r'(\d+(?:\.\d+)?)\s*(?:นิ้ว|\"|\'\')', first_var_size)

    if m_dia:
        d_val = float(m_dia.group(1))
        dia = f"{int(d_val) if d_val == int(d_val) else d_val} นิ้ว"
    elif '100' in name or '4 นิ้ว' in first_var_size or 'จานทราย' in name or 'GC' in name:
        # All NKK flap discs & GC discs in this shop are standard 4" (100mm)
        dia = "4 นิ้ว"
    elif 'ล้อทราย' in name:
        m_wh = re.search(r'(\d+x\d+)\s*mm', name, re.I)
        dia = f"แกน 6 มม. ({m_wh.group(1)} mm)" if m_wh else "แกน 6 มม."
    else:
        dia = "4 นิ้ว"

    # 4. Grit (เบอร์ความละเอียด)
    grit = None
    m_grit = re.search(r'(?:เบอร์|#|No\.)\s*(\d+)', name, re.I)
    if not m_grit:
        m_grit = re.search(r'(?:GC|AC|WA|AWA)(\d+)', name, re.I)
    if m_grit:
        grit = f"#{m_grit.group(1)}"

    # 5. Target Material (วัสดุที่ใช้งาน)
    # Can be multiple or clean tags
    materials = []
    if any(k in name for k in ['กระจก', 'GC']):
        materials = ['กระจก', 'หิน / กระเบื้อง']
    elif any(k in name for k in ['เหล็ก/สแตนเลส', 'เหล็กและสแตนเลส', 'AWA', 'FAST CUT']):
        materials = ['เหล็ก', 'สแตนเลส']
    elif any(k in name for k in ['สแตนเลส', 'แสตนเลส', 'WA']):
        materials = ['สแตนเลส']
    elif any(k in name for k in ['เหล็ก', 'A36', 'A30', 'A24', 'AC60']):
        materials = ['เหล็ก']
    elif 'จานทราย' in name or 'ล้อทราย' in name:
        materials = ['เหล็ก', 'สแตนเลส', 'งานขัดทั่วไป']
    else:
        materials = ['เหล็ก', 'สแตนเลส']

    return {
        "id": p['id'],
        "name": name,
        "brand": brand,
        "disc_type": disc_type,
        "diameter": dia,
        "grit": grit,
        "materials": materials
    }

refined = [refine_abrasives_specs(p) for p in abrasives]

print(f"Total refined abrasives: {len(refined)}")

# Breakdown of Brands
print("\n--- REFINED BRANDS ---")
brands = {}
for r in refined:
    brands[r['brand']] = brands.get(r['brand'], 0) + 1
for b, c in sorted(brands.items(), key=lambda x: -x[1]):
    print(f"  {b}: {c}")

# Breakdown of Disc Types
print("\n--- REFINED DISC TYPES ---")
dtypes = {}
for r in refined:
    dtypes[r['disc_type']] = dtypes.get(r['disc_type'], 0) + 1
for dt, c in sorted(dtypes.items(), key=lambda x: -x[1]):
    print(f"  {dt}: {c}")

# Breakdown of Diameters
print("\n--- REFINED DIAMETERS (NO 'มาตรฐาน'!) ---")
dias = {}
for r in refined:
    dias[r['diameter']] = dias.get(r['diameter'], 0) + 1
for d, c in sorted(dias.items(), key=lambda x: -x[1]):
    print(f"  {d}: {c}")

# Breakdown of Materials
print("\n--- REFINED MATERIALS ---")
mats = {}
for r in refined:
    for m in r['materials']:
        mats[m] = mats.get(m, 0) + 1
for m, c in sorted(mats.items(), key=lambda x: -x[1]):
    print(f"  {m}: {c}")

# Check any with diameter 'มาตรฐาน'
has_std = [r for r in refined if r['diameter'] == 'มาตรฐาน']
print(f"\nRemaining items with diameter 'มาตรฐาน': {len(has_std)}")
