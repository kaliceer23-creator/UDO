import re

with open("udothai_shop.sql", "r", encoding="utf-8", errors="ignore") as f:
    sql = f.read()

prod_cats = {}
for line in sql.split('\n'):
    if line.startswith("INSERT INTO `categoryofproduct`"):
        for m in re.finditer(r"\([0-9]+,\s*([0-9]+),\s*([0-9]+)", line):
            cid = int(m.group(1))
            pid = int(m.group(2))
            if pid not in prod_cats:
                prod_cats[pid] = set()
            prod_cats[pid].add(cid)

cats = {}
for line in sql.split('\n'):
    if line.startswith("INSERT INTO `categories_product`"):
        for m in re.finditer(r"\(([0-9]+),\s*'([^']*)',\s*[^,]+,\s*[^,]+,\s*([0-9]+|NULL)", line):
            cid = int(m.group(1))
            cname = m.group(2)
            cparent = int(m.group(3)) if m.group(3) != 'NULL' else None
            cats[cid] = {'id': cid, 'name': cname, 'parent_id': cparent}

def get_desc(rid):
    d = {rid}
    ad = True
    while ad:
        ad = False
        for cid, data in cats.items():
            if data['parent_id'] in d and cid not in d:
                d.add(cid)
                ad = True
    return d

cids_339 = get_desc(339)

def extract_machine_specs(name, cat_ids):
    # Process
    process = None
    if 340 in cat_ids:
        process = "เชื่อมไฟฟ้า (MMA)"
    elif 341 in cat_ids:
        process = "เชื่อมอาร์กอน (TIG)"
    elif 342 in cat_ids:
        process = "เชื่อมมิก (MIG/MAG)"
    elif 343 in cat_ids:
        process = "ตัดพลาสม่า (PLASMA)"
    else:
        if "TIG" in name.upper() or "อาร์กอน" in name:
            process = "เชื่อมอาร์กอน (TIG)"
        elif "MIG" in name.upper() or "มิก" in name or "CO2" in name.upper():
            process = "เชื่อมมิก (MIG/MAG)"
        elif "PLASMA" in name.upper() or "CUT" in name.upper() or "ตัด" in name:
            process = "ตัดพลาสม่า (PLASMA)"
        else:
            process = "เชื่อมไฟฟ้า (MMA)"

    # Voltage
    voltage = None
    if re.search(r'\b380\s*V\b|380V|3\s*เฟส|3\s*Phase', name, re.I):
        voltage = "3 เฟส 380V"
    elif re.search(r'\b220\s*V\b|220V|1\s*เฟส|1\s*Phase', name, re.I):
        voltage = "1 เฟส 220V"
    else:
        # Default based on model/amperage
        m_amp = re.search(r'(\d+)\s*(?:Amp|แอมป์|A\b)', name, re.I)
        if m_amp:
            amp_val = int(m_amp.group(1))
            voltage = "3 เฟส 380V" if amp_val >= 350 else "1 เฟส 220V"
        elif any(k in name for k in ["350", "400", "500", "150"]):
            voltage = "3 เฟส 380V"
        else:
            voltage = "1 เฟส 220V"

    # Amperage
    amperage = None
    m_amp = re.search(r'(\d+)\s*(?:Amp|แอมป์)', name, re.I)
    if m_amp:
        amperage = f"{m_amp.group(1)}A"
    else:
        m_model_num = re.search(r'(?:STICK|FINEWEL|PONY|NICE|MIG|CUT|LGK|PLASMA|AUTO|HG)[^\d]*(\d{2,3})', name, re.I)
        if m_model_num:
            num = int(m_model_num.group(1))
            if num in [40, 50, 55, 60, 70, 80, 100, 120, 140, 150, 160, 200, 250, 300, 350, 400, 500]:
                amperage = f"{num}A"
            elif num == 2160:
                amperage = "160A"
            elif num in [2200, 2200]:
                amperage = "200A"
            elif num == 2300:
                amperage = "300A"

    # Brand
    brand = "UDO"
    if "AUTOWEL" in name.upper(): brand = "AUTOWEL"
    elif "HYUNDAI" in name.upper(): brand = "HYUNDAI"
    elif "KENZO" in name.upper(): brand = "KENZO"

    return process, voltage, amperage, brand

prods_339 = []
for line in sql.split('\n'):
    if line.startswith("INSERT INTO `products`"):
        for m in re.finditer(r"\(([0-9]+),\s*'((?:\\'|[^'])*)'", line):
            pid = int(m.group(1))
            pname = m.group(2).replace(r"\'", "'")
            cset = prod_cats.get(pid, set())
            if cset.intersection(cids_339):
                prods_339.append({'id': pid, 'name': pname, 'cats': cset})

print(f"Total Category 339 machines: {len(prods_339)}")
missing_amp = []
for p in prods_339:
    proc, volt, amp, br = extract_machine_specs(p['name'], p['cats'])
    if not amp:
        missing_amp.append(p)
    print(f"[{p['id']}] {br:8} | {proc:20} | {volt:12} | Amp: {str(amp):5} | {p['name']}")

print(f"\nMissing amperage count: {len(missing_amp)}")
