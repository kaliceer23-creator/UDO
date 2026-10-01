import json
from collections import Counter
import re

with open('frontend/src/welding_products.json', 'r', encoding='utf-8') as f:
    prods = json.load(f)

consumables = [p for p in prods if p.get('filter_attributes', {}).get('category_type') == 'consumables' or any(c.get('url_slug') == 'cat-344' for c in p.get('categories', []))]

def extract_consumable_specs_refined(p):
    name = p['name']
    name_upper = name.upper()
    sku = p.get('sku', '').upper()
    cats = [c['name'] for c in p.get('categories', [])]
    cat_str = ' '.join(cats).upper()
    subcat = cats[1] if len(cats) > 1 else ''
    subsubcat = cats[2] if len(cats) > 2 else ''
    orig_brand = p.get('brand', 'UDO')

    # 1. Authentic Brand Detection
    if sku.startswith('OPT') or 'OPTECH' in name_upper:
        brand = 'OPTECH'
    elif 'AMERICAN' in name_upper:
        brand = 'AMERICAN'
    elif 'TRAFIMET' in name_upper:
        brand = 'TRAFIMET'
    elif 'PANASONIC' in name_upper:
        brand = 'PANASONIC'
    elif 'KENZO' in name_upper or sku.startswith('KZ') or sku.startswith('MIC'):
        brand = 'KENZO'
    elif 'HYUNDAI' in name_upper or sku.startswith('HD'):
        brand = 'HYUNDAI'
    elif 'OTC' in name_upper or sku.startswith('MIOT'):
        brand = 'OTC'
    elif 'CHAMP' in name_upper or sku.startswith('CH') or sku.startswith('KP') or sku.startswith('PM') or sku.startswith('TP'):
        brand = 'CHAMP'
    elif orig_brand == 'UDO':
        if sku.startswith('UDOG') or sku.startswith('UDOS') or 'GW-001' in sku or 'หน้ากากเชื่อม' in name:
            brand = 'UDO'
        elif sku.startswith('PM') or sku.startswith('TP'):
            brand = 'CHAMP'
        elif sku.startswith('MI'):
            brand = 'TRAFIMET'
        else:
            brand = 'UDO'
    else:
        brand = orig_brand

    # 2. Welding & Cutting System (ระบบงาน)
    if 'PLASMA' in cat_str or 'พลาสม่า' in name or any(k in sku for k in ['PMP', 'PM', 'P80', 'PT31', 'SG51', 'A141', 'A101', 'A81', 'S45', 'S75', 'S65', 'CB50']):
        system = 'อะไหล่หัวตัดพลาสม่า (PLASMA)'
    elif 'MIG' in cat_str or 'ซีโอทู' in name or any(k in name_upper for k in ['MIG', 'CO2', 'FEEDER', 'โรลเลอร์']) or sku.startswith('MI') or sku.startswith('KZ'):
        system = 'อะไหล่หัวเชื่อมซีโอทู (MIG/MAG)'
    elif 'TIG' in cat_str or 'อาร์กอน' in name or any(k in name_upper for k in ['TIG', 'WP-17', 'WP-18', 'WP-26', 'WP-9', 'WP-20', 'COLLET', 'ALUMINA']) or sku.startswith('TP'):
        system = 'อะไหล่หัวเชื่อมอาร์กอน (TIG)'
    elif 'เซฟตี้' in cat_str or any(k in name for k in ['หน้ากาก', 'ถุงมือ', 'ปลอกแขน', 'เลนส์ป้องกัน', 'กระจกดำ', 'กระจกใส']):
        system = 'อุปกรณ์เซฟตี้งานเชื่อม (Safety & PPE)'
    else:
        system = 'อุปกรณ์เชื่อมไฟฟ้าและข้อต่อตู้ (MMA & Dinse)'

    # 3. Part Type (ประเภทอะไหล่และอุปกรณ์)
    # 3.1 Safety & PPE
    if any(k in name for k in ['ถุงมือหนัง', 'ถุงมือเชื่อมอาร์กอน', 'ถุงมือเชื่อม']):
        part_type = 'ถุงมือหนังงานเชื่อม (Welding Gloves)'
    elif 'ปลอกแขน' in name:
        part_type = 'ปลอกแขนหนังกันสะเก็ด (Welding Sleeves)'
    elif 'หน้ากากเชื่อมออโต้' in name or 'หน้ากากเชื่อม ออโต้' in name:
        part_type = 'หน้ากากเชื่อมอัตโนมัติ (Auto-Darkening Helmet)'
    elif name in ['หน้ากากเชื่อมแบบมือถือ', 'หน้ากากเชื่อมแบบสวมหัว'] or ('หน้ากากเชื่อม' in name and not any(k in name for k in ['เลนส์', 'สวมหัวหน้ากาก', 'แถบ'])):
        part_type = 'หน้ากากเชื่อมมาตรฐาน (Welding Mask)'
    elif any(k in name for k in ['เลนส์ป้องกัน', 'ชุดอะไหล่สวมหัว', 'ชุดอะไหล่เปลี่ยนแถบกันเหงื่อ', 'สวมหัวหน้ากาก', 'กระจกดำ', 'กระจกใส']):
        part_type = 'อะไหล่หน้ากากเชื่อม (Helmet Spares & Lens)'
        
    # 3.2 MMA & Workshop Spares
    elif 'คีมจับสายดิน' in name:
        part_type = 'คีมจับสายดิน (Earth Ground Clamp)'
    elif any(k in name for k in ['คีมเชื่อม', 'คีมจับลวดเชื่อม']):
        part_type = 'คีมจับลวดเชื่อม (Electrode Holder)'
    elif 'สายเชื่อมไฟฟ้า' in name or 'OTWC' in sku:
        part_type = 'สายเชื่อมไฟฟ้า (Welding Cable)'
    elif 'กระบอกอบลวด' in name:
        part_type = 'กระบอกอบลวดเชื่อม (Welding Rod Quiver)'
    elif 'หัวเก๊าจ์' in name:
        part_type = 'หัวเก๊าจ์คาร์บอน (Carbon Gouging Torch)'
    elif any(k in name for k in ['ปลั๊กสายสัญญาณ', 'เต้ารับสายสัญญาณ', 'สายสัญญาณคอนโทรล']):
        part_type = 'ปลั๊กและเต้ารับคอนโทรล (Control Plugs & Sockets)'
    elif any(k in name for k in ['ข้อต่อสายเชื่อม', 'ข้อต่อหน้าตู้', 'ข้อต่อตู้เชื่อม', 'อแด๊ปเตอร์แปลงข้อต่อยูโร']) or any(k in sku for k in ['TRAK', 'OTTS', 'OTMS', 'OTTCC', 'OTSK']):
        part_type = 'ข้อต่อสายเชื่อมและหน้าตู้ (Cable Plugs & Sockets)'
    elif 'หางปลาสายเชื่อม' in name:
        part_type = 'หางปลาและข้อต่อสาย (Cable Lugs & Fittings)'

    # 3.3 Plasma Cutting Parts
    elif any(k in name for k in ['ปืนตัดพลาสม่า', 'ชุดหัวตัดพลาสม่าพร้อมสาย']) or ('ชุดหัวตัดพลาสม่า' in name and any(k in name for k in ['เมตร', 'ยาว'])) or subsubcat == 'ปืนตัดพลาสม่าพร้อมสาย (Plasma Torch)':
        part_type = 'ชุดสายตัดพลาสม่า (Complete Plasma Torch)'
    elif any(k in name for k in ['ด้ามหัวตัดพลาสม่า', 'ด้ามตัดพลาสม่า']) or ('TORCH PLASMA' in name_upper and 'พร้อมสาย' not in name) or ('AUTOCUT' in name_upper and 'TORCH' in name_upper) or subsubcat == 'ด้ามตัด (Torch Head)':
        part_type = 'ด้ามหัวตัดพลาสม่า (Plasma Torch Head & Body)'
    elif any(k in name for k in ['หัวทิป', 'ทิปตัด']) or any(k in name_upper for k in ['TIP', 'NOZZLE/TIP']) or subsubcat == 'หัวทิป (Tip)':
        part_type = 'หัวทิป / นมหนูตัดพลาสม่า (Plasma Tip)'
    elif any(k in name for k in ['อีเล็คโทรด', 'อิเล็คโทรด']) or any(k in name_upper for k in ['ELECTRODE', 'ELETRODE']) or subsubcat == 'อีเล็คโทรด (Electrode)':
        part_type = 'อีเล็คโทรดพลาสม่า (Plasma Electrode)'
    elif any(k in name for k in ['ชิลด์คัพ', 'SHIELD CUP', 'CONTACT SHIELD', 'RETAINING CAP']) or subsubcat == 'ชิลด์คัพ (Shield Cup)':
        part_type = 'ชิลด์คัพและฝาครอบ (Plasma Shield & Retaining Cap)'
    elif any(k in name for k in ['ดิสฟิวเซอร์พลาสม่า', 'GAS DIFFUSER PLASMA', 'DIFFUSER PLASMA', 'SWIRL RING']) or (subsubcat == 'แก๊สดิสฟิวเซอร์ (Gas Diffuser)' and 'PLASMA' in cat_str):
        part_type = 'สเวิร์ลริง / ดิสฟิวเซอร์พลาสม่า (Plasma Swirl Ring & Diffuser)'
    elif any(k in name for k in ['ลูกล้อ', 'วงเวียน', 'STAND OFF GUIDE', 'GUIDE CARRIAGE']):
        part_type = 'ขาตั้งและล้อนำตัดพลาสม่า (Plasma Cutting Guides & Wheels)'
    elif 'AIR TUBE' in name_upper or 'ท่อลม' in name:
        part_type = 'ท่อลมและอุปกรณ์หัวตัดพลาสม่า (Plasma Air Tubes & Spares)'
    elif any(k in name_upper for k in ['SAFETY TRIGGER', 'HANDLE (TP0055)', 'TORCH HANDLE PLASMA', 'COMPLETE HANDLE SET', 'SWITCH TRIGGER']):
        part_type = 'ด้ามจับและสวิตซ์ปืนตัด (Plasma Handle & Switch)'

    # 3.4 MIG / CO2 Parts
    elif any(k in name for k in ['ปืนเชื่อมซีโอทูพร้อมสาย', 'ปืนเชื่อมมิกพร้อมสาย']) or ('ปืนเชื่อม CO2' in name and any(k in name for k in ['รุ่น', 'ท้าย', 'TRAFIMET'])) or subsubcat == 'ปืนเชื่อมซีโอทูพร้อมสาย (MIG Torch)':
        part_type = 'ชุดสายเชื่อมซีโอทู (Complete MIG Torch)'
    elif 'คอนแท็คทิป' in name or 'CONTACT TIP' in name_upper or subsubcat == 'คอนแท็คทิป (Contact Tip)':
        part_type = 'คอนแท็คทิป (MIG Contact Tip)'
    elif (any(k in name for k in ['น๊อตเซิล', 'NOZZLE']) and 'ALUMINA' not in name_upper) or subsubcat == 'น๊อตเซิล (Nozzle)':
        part_type = 'หัวฉีดแก๊ส / น๊อตเซิล (MIG Gas Nozzle)'
    elif 'แกนจับหัวทิป' in name or 'TIP HOLDER' in name_upper or subsubcat == 'แกนจับหัวทิป (Tip Holder)':
        part_type = 'แกนจับหัวทิป (MIG Tip Holder)'
    elif any(k in name for k in ['แก๊สดิสฟิวเซอร์', 'GAS DIFFUSER']) or subsubcat == 'แก๊สดิสฟิวเซอร์ (Gas Diffuser)':
        part_type = 'แก๊สดิสฟิวเซอร์ (MIG Gas Diffuser)'
    elif any(k in name for k in ['คอด้ามเชื่อม', 'TORCH HEAD', 'SWAN NECK']) or subsubcat == 'คอด้ามเชื่อม (Torch Head)':
        part_type = 'คอด้ามเชื่อม (MIG Swan Neck)'
    elif any(k in name for k in ['ด้ามจับปืนเชื่อมมิก', 'HANDLE']) and ('MIG' in cat_str or 'MI' in sku):
        part_type = 'ด้ามจับปืนเชื่อม (MIG Torch Handle)'
    elif any(k in name for k in ['โรลเลอร์ขับลวด', 'FEEDER']):
        part_type = 'โรลเลอร์ขับลวดเชื่อม (Wire Feeder Rollers)'
    elif any(k in name for k in ['ไลน์เนอร์', 'LINER']):
        part_type = 'ไลน์เนอร์นำลวดเชื่อม (Wire Conduit Liner)'
    elif any(k in name for k in ['SWITCH MIG', 'TRIGGER SWITCH', 'สวิตซ์']) and ('MIG' in cat_str or 'MI' in sku):
        part_type = 'สวิตซ์ปืนเชื่อม (Torch Trigger Switch)'
    elif any(k in name for k in ['EURO ADAPTER', 'ADAPTER HOUSING', 'CINA BACK BOX', 'ปลั๊กปืนเชื่อมมิก', 'ADAPTER SCREW', 'SPRING CABLE SUPPORT', 'JOINT WITH SPRING', 'TORCH CABLE SUPPORT', 'TORCH ADAPTER SET']):
        part_type = 'ข้อต่อท้ายปืนและอแดปเตอร์ (MIG Euro Adapter & Plugs)'
    elif 'ฝาถังลวด' in name:
        part_type = 'ฝาครอบถังลวดเชื่อม (Drum Pack Cover)'

    # 3.5 TIG / Argon Parts
    elif any(k in name for k in ['ปืนเชื่อมอาร์กอนพร้อมสาย', 'ชุดสายเชื่อมอาร์กอน']) or subsubcat == 'ปืนเชื่อมอาร์กอนพร้อมสาย (TIG Torch)':
        part_type = 'ชุดสายเชื่อมอาร์กอน (Complete TIG Torch)'
    elif any(k in name for k in ['ด้ามเชื่อมอาร์กอน', 'ด้ามเชื่อม WP', 'WP-17', 'WP-18', 'WP-26', 'WP-9']) or subsubcat == 'ด้ามเชื่อม (Torch)':
        part_type = 'ด้ามเชื่อมอาร์กอน (TIG Torch Head & Body)'
    elif any(k in name for k in ['ถ้วยเซรามิก', 'ถ้วยเซรามิค', 'ALUMINA NOZZLE', 'CERAMIC']) or subsubcat == 'ถ้วยเซรามิค (Alumina Nozzle)':
        part_type = 'ถ้วยเซรามิค (TIG Alumina Nozzle)'
    elif (any(k in name for k in ['สลิปใน', 'COLLET']) and 'BODY' not in name_upper) or subsubcat == 'สลิปใน (Collet)':
        part_type = 'สลิปใน / จำปาจับทังสเตน (TIG Collet)'
    elif any(k in name for k in ['สลิปนอก', 'COLLET BODY', 'GAS LENS']) or subsubcat == 'สลิปนอก (Collet Body)':
        part_type = 'สลิปนอก / แกนจับสลิป (TIG Collet Body & Gas Lens)'
    elif any(k in name for k in ['หางปลาจับลวด', 'BACK CAP']) or subsubcat == 'หางปลาจับลวด (Back Cap)':
        part_type = 'หางปลาจับลวด / แคปท้าย (TIG Back Cap)'
    elif 'อินซูเรเตอร์' in name or 'INSULATOR' in name_upper or subsubcat == 'อินซูเรเตอร์ (Insulator)':
        part_type = 'อินซูเรเตอร์ / ฉนวนหัวเชื่อม (Insulator)'
    elif any(k in name for k in ['สวิตซ์คอนโทรลด้ามเชื่อมอาร์กอน', 'ข้อต่อสายเชื่อมสายแก๊สด้ามเชื่อม WP-26']):
        part_type = 'สวิตซ์และข้อต่อด้ามเชื่อม (TIG Switch & Connectors)'
    else:
        part_type = 'อะไหล่และอุปกรณ์เสริมทั่วไป'

    # 4. Torch Series / Model Compatibility
    series = set()
    # Plasma Series
    if 'P-80' in name_upper or 'P80' in name_upper or 'P80' in sku: series.add('Plasma P-80')
    if 'PT-31' in name_upper or 'PT31' in name_upper or 'PT31' in sku: series.add('Plasma PT-31')
    if 'SG-51' in name_upper or 'SG51' in name_upper or 'SG51' in sku: series.add('Plasma SG-51')
    if 'S45' in name_upper or 'S-45' in name_upper or 'S45' in sku: series.add('Trafimet Ergocut S45')
    if 'S65' in name_upper or 'S-65' in name_upper or 'S65' in sku: series.add('Trafimet Ergocut S65')
    if 'S75' in name_upper or 'S-75' in name_upper or 'S75' in sku: series.add('Trafimet Ergocut S75')
    if 'S105' in name_upper or 'S-105' in name_upper or 'S105' in sku: series.add('Trafimet Ergocut S105')
    if 'A81' in name_upper or 'A-81' in name_upper or 'A81' in sku: series.add('Trafimet Ergocut A81')
    if 'A101' in name_upper or 'A-101' in name_upper or 'A101' in sku: series.add('Trafimet Ergocut A101')
    if 'A141' in name_upper or 'A-141' in name_upper or 'A141' in sku or 'P141' in name_upper or 'P141' in sku: series.add('Trafimet Ergocut A141/P141')
    if 'CB50' in name_upper or 'CB-50' in name_upper or 'CB70' in name_upper or 'CB-70' in name_upper or 'CB50' in sku: series.add('Trafimet Ergocut CB50/CB70')
    if 'PCH-51' in name_upper or 'PCH-52' in name_upper or 'PCH-25' in name_upper or 'PCH' in sku: series.add('Thermal Dynamics PCH Series')
    if 'HYPERTHERM' in name_upper or any(k in sku for k in ['120930', '120929', '120928', '220047', '220065', '220048']): series.add('Hypertherm Powermax Series')
    if 'ME-50' in name_upper or 'ME50' in sku: series.add('Plasma ME-50')
        
    # MIG Series
    if 'ERGOPLUS 15' in name_upper or 'MB-15' in name_upper or 'MB15' in name_upper or 'EG15' in sku: series.add('Binzel MB-15 / Ergoplus 15')
    if 'ERGOPLUS 24' in name_upper or 'MB-24' in name_upper or 'MB24' in name_upper or 'EG24' in sku: series.add('Binzel MB-24 / Ergoplus 24')
    if 'ERGOPLUS 25' in name_upper or 'MB-25' in name_upper or 'MB25' in name_upper or 'EG25' in sku: series.add('Binzel MB-25 / Ergoplus 25')
    if 'ERGOPLUS 36' in name_upper or 'MB-36' in name_upper or 'MB36' in name_upper or 'EG36' in sku: series.add('Binzel MB-36 / Ergoplus 36')
    if 'PANA 180' in name_upper or 'PANA 200' in name_upper or 'PANASONIC 200' in name_upper or 'PANA 180/200' in name_upper or 'MIPN20' in sku or 'CINA-200' in name_upper: series.add('Panasonic 200A (Pana 200)')
    if 'PANA 350' in name_upper or 'PANASONIC 350' in name_upper or 'MIPN35' in sku or 'CINA-350' in name_upper: series.add('Panasonic 350A (Pana 350)')
    if 'PANA 500' in name_upper or 'PANASONIC 500' in name_upper or 'MIPN50' in sku or 'CINA-500' in name_upper: series.add('Panasonic 500A (Pana 500)')
    if 'OTC' in name_upper or sku.startswith('MIOT') or 'DAIHEN' in name_upper: series.add('OTC / Daihen Type')
    if 'MILLER' in name_upper or 'CINA-200 ท้าย MILLER' in name or 'CINA-350 35SQMM ท้าย MILLER' in name: series.add('Miller Type')
        
    # TIG Series
    if any(k in name_upper for k in ['WP-17', 'WP17', 'WP-18', 'WP18', 'WP-26', 'WP26']): series.add('TIG WP-17 / WP-18 / WP-26')
    if any(k in name_upper for k in ['WP-9', 'WP9', 'WP-20', 'WP20']): series.add('TIG WP-9 / WP-20')
        
    # Safety Models
    if 'S777A' in name_upper: series.add('Optech S777A')
    if 'S998E' in name_upper: series.add('Optech S998E')
    if 'SUN7' in name_upper or 'SUN 7' in name_upper: series.add('Optech SUN7')
    if 'SUN9F' in name_upper or 'SUN 9' in name_upper: series.add('Optech SUN9F')
    if sku.startswith('UDOG') or sku.startswith('UDOS'): series.add('UDO Leather Series')
        
    # MMA Dinse Sizes
    if '10-25' in name: series.add('Euro Dinse 10-25 mm²')
    if '35-50' in name or '35-70' in name or '35/50' in name: series.add('Euro Dinse 35-50 / 35-70 mm²')
    if '70 MM' in name_upper or '70-95' in name: series.add('Euro Dinse 70-95 mm²')
    if 'K-4' in name: series.add('Carbon Gouging K-4 / K-4000')

    if not series:
        if system == 'อะไหล่หัวตัดพลาสม่า (PLASMA)': series.add('Plasma ทั่วไป')
        elif system == 'อะไหล่หัวเชื่อมซีโอทู (MIG/MAG)': series.add('MIG ทั่วไป')
        elif system == 'อะไหล่หัวเชื่อมอาร์กอน (TIG)': series.add('TIG ทั่วไป')
        elif system == 'อุปกรณ์เซฟตี้งานเชื่อม (Safety & PPE)': series.add('เซฟตี้ทั่วไป')
        else: series.add('อุปกรณ์เชื่อมทั่วไป')

    series_sorted = sorted(list(series))

    specs = [
        {"key": "ระบบงาน", "value": system},
        {"key": "ประเภทอะไหล่", "value": part_type},
        {"key": "รุ่นหัวเชื่อม / หัวตัดที่รองรับ", "value": ", ".join(series_sorted)},
        {"key": "แบรนด์ผู้ผลิต", "value": brand}
    ]

    return system, part_type, series_sorted, brand, specs

b_counts = Counter()
sys_counts = Counter()
pt_counts = Counter()
s_counts = Counter()

for p in consumables:
    sys, pt, s_list, b, sp = extract_consumable_specs_refined(p)
    b_counts[b] += 1
    sys_counts[sys] += 1
    pt_counts[pt] += 1
    for s in s_list:
        s_counts[s] += 1

print('=== 1. BRANDS (326 products) ===')
for k, v in b_counts.most_common():
    print(f'  {k}: {v}')

print('\n=== 2. SYSTEMS (326 products) ===')
for k, v in sys_counts.most_common():
    print(f'  {k}: {v}')

print('\n=== 3. PART TYPES (326 products) ===')
for k, v in pt_counts.most_common():
    print(f'  {k}: {v}')

print('\n=== 4. TOP TORCH SERIES (326 products) ===')
for k, v in s_counts.most_common(20):
    print(f'  {k}: {v}')
