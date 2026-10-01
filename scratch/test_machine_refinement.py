import re

with open('udothai_shop.sql', 'r', encoding='utf-8', errors='ignore') as f:
    sql_text = f.read()

cats = {}
for line in sql_text.split('\n'):
    if 'INSERT INTO `categories_product`' in line:
        for m in re.finditer(r"\(([0-9]+),\s*'([^']*)',\s*[^,]+,\s*[^,]+,\s*([0-9]+|NULL)", line):
            cats[int(m.group(1))] = {'id': int(m.group(1)), 'name': m.group(2), 'parent_id': int(m.group(3)) if m.group(3) != 'NULL' else None}

def get_desc(rid):
    d = {rid}
    added = True
    while added:
        added = False
        for cid, data in cats.items():
            if data['parent_id'] in d and cid not in d:
                d.add(cid)
                added = True
    return d

prod_cats = {}
for m in re.finditer(r"INSERT INTO `categoryofproduct` VALUES (.*?);", sql_text, re.DOTALL):
    chunk = m.group(1)
    for row in re.finditer(r"\(([0-9]+),\s*([0-9]+|NULL),\s*([0-9]+|NULL)", chunk):
        cid_str, pid_str = row.group(2), row.group(3)
        if cid_str != 'NULL' and pid_str != 'NULL':
            prod_cats.setdefault(int(pid_str), set()).add(int(cid_str))

bands = {}
for line in sql_text.split('\n'):
    if 'INSERT INTO `bands`' in line:
        for m in re.finditer(r"\(([0-9]+),\s*'([^']*)'", line):
            bands[int(m.group(1))] = m.group(2)

c339_descendants = get_desc(339)
pids_339 = [p for p, cset in prod_cats.items() if cset.intersection(c339_descendants)]

def refine_machine_specs(name, cat_ids, band_id, desc=""):
    name_upper = name.upper()
    desc_clean = desc or ""
    
    # 1. Process
    if 340 in cat_ids:
        process = "เชื่อมไฟฟ้า (MMA)"
    elif 341 in cat_ids:
        process = "เชื่อมอาร์กอน (TIG)"
    elif 342 in cat_ids:
        process = "เชื่อมมิก (MIG/MAG)"
    elif 343 in cat_ids:
        process = "ตัดพลาสม่า (PLASMA)"
    else:
        if any(k in name_upper or k in name for k in ["TIG", "อาร์กอน", "อาร์ก้อน"]):
            process = "เชื่อมอาร์กอน (TIG)"
        elif any(k in name_upper or k in name for k in ["MIG", "มิก", "CO2", "ซีโอทู"]):
            process = "เชื่อมมิก (MIG/MAG)"
        elif any(k in name_upper or k in name for k in ["PLASMA", "CUT", "LGK", "พลาสม่า", "ตัด"]):
            process = "ตัดพลาสม่า (PLASMA)"
        else:
            process = "เชื่อมไฟฟ้า (MMA)"

    # 2. Brand
    brand = bands.get(band_id, "UDO") if band_id else "UDO"
    if "AUTOWEL" in name_upper: brand = "AUTOWEL"
    elif "HYUNDAI" in name_upper: brand = "HYUNDAI"
    elif "KENZO" in name_upper: brand = "KENZO"
    elif brand == "UDO":
        if "KZ" in desc_clean or "KENZO" in desc_clean.upper(): brand = "KENZO"
        elif "HYUNDAI" in desc_clean.upper(): brand = "HYUNDAI"
        elif "AUTOWEL" in desc_clean.upper(): brand = "AUTOWEL"

    # 3. Amperage
    amperage = "200A"
    # Check explicit amp in name first (e.g. 200 Amp, 350 แอมป์)
    m_amp = re.search(r'(\d+)\s*(?:Amp|แอมป์)', name, re.I)
    if m_amp:
        amperage = f"{m_amp.group(1)}A"
    else:
        # Check model number pattern or specific known models
        if "FINE ARC II 350" in name_upper:
            amperage = "350A"
        elif "2160" in name:
            amperage = "160A"
        elif "2200" in name:
            amperage = "200A"
        elif "2300" in name:
            amperage = "300A"
        elif "HyPLA040" in name or "CUT-40" in name or "LGK-40" in name:
            amperage = "40A"
        elif "HyPLA150" in name:
            amperage = "150A"
        elif "500S" in name or "500i" in name:
            amperage = "500A"
        elif "350i" in name or "350" in name:
            amperage = "350A"
        elif "250i" in name or "250" in name:
            amperage = "250A"
        else:
            m_a_desc = re.search(r'(\d+)\s*(?:Amp|แอมป์)', desc_clean, re.I)
            if m_a_desc:
                amperage = f"{m_a_desc.group(1)}A"

    # 4. Voltage
    # Check if 380V or 3 Phase
    is_380 = False
    if re.search(r'380\s*V|380V|3\s*เฟส|3\s*Ph|3Ph|Three\s*Phase', name, re.I):
        is_380 = True
    elif re.search(r'STICK-(?:253|303|403)|MIG-253', name, re.I):
        is_380 = True
    elif re.search(r'380\s*V|380V|3\s*เฟส|3\s*Ph|3Ph|Three\s*Phase', desc_clean, re.I):
        # Double check if desc mentions 380V as input
        if re.search(r'กระแสไฟเข้า\s*380|ไฟเข้า\s*380|ระบบไฟ\s*380|380V/3Ph|380V/1Ph', desc_clean, re.I):
            is_380 = True
        elif int(amperage.replace('A', '')) >= 350:
            is_380 = True

    # Industrial Plasma cutters >= 80A are 380V
    if process == "ตัดพลาสม่า (PLASMA)" and int(amperage.replace('A', '')) >= 80:
        is_380 = True

    # Heavy industrial welders >= 350A are 380V
    if int(amperage.replace('A', '')) >= 350:
        is_380 = True

    voltage = "3 เฟส 380V" if is_380 else "1 เฟส 220V"

    # 5. Special Features & Specs Table
    feature = "Inverter IGBT เทคโนโลยีประหยัดพลังงาน"
    if "AC/DC" in name_upper:
        feature = "Inverter AC/DC รองรับงานเชื่อมอาร์กอนอลูมิเนียมและโลหะทุกชนิด"
    elif "ไม่ใช้แก๊ส" in name:
        feature = "ระบบมิก 3-in-1 (MIG ใช้แก๊ส, MIG ไม่ใช้แก๊ส Flux Core, MMA ไฟฟ้า)"
    elif "Pilot Arc" in desc_clean:
        feature = "Inverter ระบบ Pilot Arc ตัดงานต่อเนื่องโดยไม่ต้องแตะชิ้นงาน"

    specs = [
        {"key": "ประเภทเครื่อง", "value": process},
        {"key": "แรงดันไฟฟ้าเข้า", "value": voltage},
        {"key": "กระแสไฟสูงสุด", "value": amperage},
        {"key": "ระบบการทำงาน", "value": feature},
        {"key": "แบรนด์ผู้ผลิต", "value": brand},
        {"key": "การรับประกัน", "value": "รับประกันตัวเครื่อง 1 ปี ตามเงื่อนไขผู้ผลิต"}
    ]

    # Max cutting thickness for plasma
    if process == "ตัดพลาสม่า (PLASMA)":
        m_cut = re.search(r'ตัด(?:ชิ้นงาน)?(?:ได้)?(?:สูงสุด)?(?:ไม่เกิน)?\s*(\d+)\s*มิล', desc_clean)
        if m_cut:
            specs.insert(3, {"key": "ความหนาชิ้นงานตัดสูงสุด", "value": f"{m_cut.group(1)} มม."})
        else:
            amp_num = int(amperage.replace('A', ''))
            cut_th = "10 มม." if amp_num <= 40 else "15 มม." if amp_num <= 55 else "20 มม." if amp_num <= 80 else "25 มม."
            specs.insert(3, {"key": "ความหนาชิ้นงานตัดสูงสุด", "value": cut_th})

    return process, voltage, amperage, brand, specs

# Run on all 41 machines
all_results = []
for line in sql_text.split('\n'):
    if not line.startswith("INSERT INTO `products`"):
        continue
    for pid in pids_339:
        pos = 0
        while True:
            pos = line.find(f"({pid},", pos)
            if pos == -1: break
            end = line.find("),(", pos)
            entry = line[pos:end] if end != -1 else line[pos:line.find(");", pos)]
            m_id_name = re.match(r"\(([0-9]+),\s*'((?:\\'|[^'])*)',\s*(?:'((?:\\'|[^'])*)'|NULL),\s*(?:'(.*?)'|NULL)", entry, re.DOTALL)
            if m_id_name:
                p_id, name, short_desc, desc = m_id_name.groups()
                p_id = int(p_id)
                m_band = re.search(rf"\({pid},.*?,\s*([0-9]+|NULL),\s*'[^']*',\s*(?:'[^']*'|NULL),\s*[0-9]+", entry, re.DOTALL)
                band_id = int(m_band.group(1)) if m_band and m_band.group(1) != "NULL" else None
                c_ids = list(prod_cats.get(p_id, []))
                proc, volt, amp, brand, specs = refine_machine_specs(name, c_ids, band_id, desc)
                all_results.append({
                    "id": p_id,
                    "name": name,
                    "brand": brand,
                    "proc": proc,
                    "volt": volt,
                    "amp": amp,
                    "specs": specs
                })
            pos += 1

print("--- REFINED MACHINE EXTRACTION SUMMARY ---")
print(f"Total Machines: {len(all_results)}")

from collections import Counter
print("Brands:", dict(Counter(r['brand'] for r in all_results)))
print("Processes:", dict(Counter(r['proc'] for r in all_results)))
print("Voltages:", dict(Counter(r['volt'] for r in all_results)))
print("Amperages:", sorted(dict(Counter(r['amp'] for r in all_results)).items(), key=lambda x: int(x[0].replace('A',''))))

print("\n--- ALL 41 REFINED MACHINES ---")
for r in sorted(all_results, key=lambda x: x['id']):
    print(f"ID {r['id']}: [{r['brand']}] {r['name']}")
    print(f"   Proc: {r['proc']} | Volt: {r['volt']} | Amp: {r['amp']}")
