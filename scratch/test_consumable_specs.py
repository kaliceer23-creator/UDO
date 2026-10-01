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

cids_344 = get_desc(344)

prods_344 = []
for line in sql.split('\n'):
    if line.startswith("INSERT INTO `products`"):
        for m in re.finditer(r"\(([0-9]+),\s*'((?:\\'|[^'])*)'", line):
            pid = int(m.group(1))
            pname = m.group(2).replace(r"\'", "'")
            cset = prod_cats.get(pid, set())
            if cset.intersection(cids_344):
                prods_344.append({'id': pid, 'name': pname, 'cats': cset})

def extract_consumable_specs(name, cat_ids):
    # 1. System / Torch Category
    system = "อะไหล่อื่นๆ"
    c_names = [cats[c]['name'] for c in cat_ids if c in cats]
    all_c_str = ' '.join(c_names)

    if 345 in cat_ids or any(c in cat_ids for c in get_desc(345)):
        system = "อะไหล่อาร์กอน (TIG)"
    elif 353 in cat_ids or any(c in cat_ids for c in get_desc(353)):
        system = "อะไหล่ซีโอทู (MIG)"
    elif 362 in cat_ids or any(c in cat_ids for c in get_desc(362)):
        system = "อะไหล่พลาสม่า (PLASMA)"
    elif 389 in cat_ids or any(c in cat_ids for c in get_desc(389)):
        system = "อุปกรณ์เซฟตี้"
    elif 380 in cat_ids or any(c in cat_ids for c in get_desc(380)):
        system = "อุปกรณ์และอะไหล่อื่นๆ"

    # 2. Part Type
    part_type = "อะไหล่ทั่วไป"
    if any(k in name for k in ["ถ้วยเซรามิก", "ถ้วยเซรามิค", "ALUMINA NOZZLE", "น๊อตเซิล", "NOZZLE", "Nozzle", "ชิลด์คัพ", "SHIELD CUP", "Shield Cup", "หัวฉีด"]):
        part_type = "หัวฉีด / ถ้วยเซรามิก (Nozzle)"
    elif any(k in name for k in ["คอนแท็คทิป", "คอนแทคทิพ", "CONTACT TIP", "Contact Tip", "หัวทิป", "TIP", "Tip"]):
        part_type = "คอนแทคทิพ / หัวตัด (Contact Tip)"
    elif any(k in name for k in ["สลิปใน", "COLLET", "Collet"]) and "BODY" not in name.upper():
        part_type = "สลิปใน / จำปา (Collet)"
    elif any(k in name for k in ["สลิปนอก", "COLLET BODY", "Collet Body", "แกนจับหัวทิป", "TIP HOLDER"]):
        part_type = "สลิปนอก / แกนจับ (Collet Body)"
    elif any(k in name for k in ["แก๊สดิสฟิวเซอร์", "GAS DIFFUSER", "Gas Diffuser", "กระจายแก๊ส"]):
        part_type = "ตัวกระจายแก๊ส (Gas Diffuser)"
    elif any(k in name for k in ["อีเล็คโทรด", "ELECTRODE", "Electrode", "อิเล็กโทรด"]):
        part_type = "อิเล็กโทรด (Electrode)"
    elif any(k in name for k in ["BACK CAP", "Back Cap", "หางปลาจับลวด", "ฝาครอบท้าย"]):
        part_type = "หางปลาจับลวด (Back Cap)"
    elif any(k in name for k in ["ด้ามเชื่อม", "ด้ามตัด", "TORCH BODY", "Torch Head", "คอด้ามเชื่อม"]):
        part_type = "ด้ามเชื่อม / ด้ามตัด (Torch Head)"
    elif any(k in name for k in ["ปืนเชื่อม", "ปืนตัด", "พร้อมสาย"]):
        part_type = "ชุดปืนเชื่อม / ตัดพร้อมสาย"
    elif any(k in name for k in ["อินซูเรเตอร์", "INSULATOR", "ฉนวน"]):
        part_type = "ฉนวนกันความร้อน (Insulator)"
    elif any(k in name for k in ["แว่นตา", "ถุงมือ", "หน้ากาก", "เอี๊ยม", "ปลอกแขน", "รองเท้า"]):
        part_type = "อุปกรณ์เซฟตี้ (Safety)"

    # 3. Torch Series / Model
    series = []
    # TIG
    if re.search(r'\b(WP-?9|WP-?20|WP-?25)\b', name, re.I):
        series.append("WP-9 / WP-20 / WP-25")
    if re.search(r'\b(WP-?17|WP-?18|WP-?26)\b', name, re.I):
        series.append("WP-17 / WP-18 / WP-26")
    if re.search(r'\b(SINTIG\s*(?:17|20|26))\b', name, re.I):
        series.append("TRAFIMET SINTIG")

    # MIG
    if re.search(r'\b(MB-?15|MB-?15AK|15AK)\b', name, re.I):
        series.append("MB-15AK")
    if re.search(r'\b(MB-?24|MB-?24KD|24KD)\b', name, re.I):
        series.append("MB-24KD")
    if re.search(r'\b(MB-?36|MB-?36KD|36KD)\b', name, re.I):
        series.append("MB-36KD")
    if re.search(r'\b(MB-?501|MB-?501D)\b', name, re.I):
        series.append("MB-501D")
    if re.search(r'\b(PANASONIC|PANA)\b', name, re.I):
        series.append("Panasonic Type")
    if re.search(r'\b(OTC|DAIHEN)\b', name, re.I):
        series.append("OTC / Daihen Type")
    if re.search(r'\b(ERGOPLUS|CINA)\b', name, re.I):
        series.append("TRAFIMET ERGOPLUS")

    # PLASMA
    if re.search(r'\b(P-?80|P80)\b', name, re.I):
        series.append("P-80")
    if re.search(r'\b(PT-?31|PT31)\b', name, re.I):
        series.append("PT-31")
    if re.search(r'\b(SG-?51|SG51)\b', name, re.I):
        series.append("SG-51")
    if re.search(r'\b(AG-?60|AG60)\b', name, re.I):
        series.append("AG-60")
    if re.search(r'\b(A-?101|A101)\b', name, re.I):
        series.append("TRAFIMET A101")
    if re.search(r'\b(A-?141|A141)\b', name, re.I):
        series.append("TRAFIMET A141")
    if re.search(r'\b(ERGOCUT|AUTOCUT)\b', name, re.I):
        series.append("TRAFIMET ERGOCUT")

    if not series:
        if system == "อะไหล่อาร์กอน (TIG)":
            series.append("TIG ทั่วไป")
        elif system == "อะไหล่ซีโอทู (MIG)":
            series.append("MIG ทั่วไป")
        elif system == "อะไหล่พลาสม่า (PLASMA)":
            series.append("PLASMA ทั่วไป")
        elif system == "อุปกรณ์เซฟตี้":
            series.append("เซฟตี้")
        else:
            series.append("มาตรฐานทั่วไป")

    # 4. Brand
    brand = "UDO"
    if "TRAFIMET" in name.upper(): brand = "TRAFIMET"
    elif "PANASONIC" in name.upper(): brand = "PANASONIC"
    elif "OTC" in name.upper(): brand = "OTC"
    elif "BINZEL" in name.upper(): brand = "ABICOR BINZEL"
    elif "KOIKE" in name.upper(): brand = "KOIKE"
    elif "TANAKA" in name.upper(): brand = "TANAKA"
    elif "YAMATO" in name.upper(): brand = "YAMATO"
    elif "HARRIS" in name.upper(): brand = "HARRIS"

    return system, part_type, series, brand

print(f"Total Category 344 products: {len(prods_344)}")
part_counts = {}
series_counts = {}
system_counts = {}
brand_counts = {}

for p in prods_344:
    sys, pt, sers, br = extract_consumable_specs(p['name'], p['cats'])
    system_counts[sys] = system_counts.get(sys, 0) + 1
    part_counts[pt] = part_counts.get(pt, 0) + 1
    brand_counts[br] = brand_counts.get(br, 0) + 1
    for s in sers:
        series_counts[s] = series_counts.get(s, 0) + 1

print("\n--- SYSTEM COUNTS ---")
for k, v in sorted(system_counts.items(), key=lambda x: x[1], reverse=True):
    print(f"  {k}: {v}")

print("\n--- PART TYPE COUNTS ---")
for k, v in sorted(part_counts.items(), key=lambda x: x[1], reverse=True):
    print(f"  {k}: {v}")

print("\n--- TOP TORCH SERIES COUNTS ---")
for k, v in sorted(series_counts.items(), key=lambda x: x[1], reverse=True):
    print(f"  {k}: {v}")

print("\n--- BRAND COUNTS ---")
for k, v in sorted(brand_counts.items(), key=lambda x: x[1], reverse=True):
    print(f"  {k}: {v}")
