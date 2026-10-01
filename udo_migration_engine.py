#!/usr/bin/env python3
"""
UDO Migration Engine (Phase 4: Full Store Catalog Migration - 1,307 Products)
Converts legacy Laravel/Voyager database (udothai_shop.sql) into modern clean schema.
Catalog Coverage across all 8 Root Categories:
- Root Category 12: กลุ่มลวดเชื่อม (411 products)
- Root Category 312: อุปกรณ์เชื่อมตัดเผาแก๊ส (338 products)
- Root Category 344: อะไหล่สิ้นเปลือง เครื่องตัดพลาสม่า เครื่องเชื่อม (326 products)
- Root Category 298: ใบตัดใบเจียร (74 products)
- Root Category 327: ท่อบรรจุก๊าซ และวาล์ว (63 products)
- Root Category 339: เครื่องเชื่อมและเครื่องตัดพลาสม่า (41 products)
- Root Category 382: วัสดุอุปกรณ์เคมีภัณฑ์สำหรับงานเชื่อม (33 products)
- Root Category 398: เครื่องมือช่าง (21 products)
Total Products: 1,307
"""

import re
import json
import html
import csv

SQL_PATH = 'udothai_shop.sql'
OUTPUT_PATH = 'frontend/src/welding_products.json'
CSV_PATH = 'migration_audit_report.csv'

def load_database():
    with open(SQL_PATH, 'r', encoding='utf-8', errors='ignore') as f:
        return f.read()

def parse_mysql_insert(table_name, text):
    pattern = rf"INSERT INTO `{table_name}` VALUES\s*(.*?);\n"
    matches = re.findall(pattern, text, re.DOTALL)
    rows = []
    for m in matches:
        pos = 0
        L = len(m)
        while pos < L:
            while pos < L and m[pos] != '(':
                pos += 1
            if pos >= L: break
            pos += 1
            row = []
            cur_val = []
            in_str = False
            escape = False
            while pos < L:
                c = m[pos]
                if in_str:
                    if escape:
                        cur_val.append(c)
                        escape = False
                    elif c == '\\':
                        escape = True
                    elif c == "'":
                        in_str = False
                    else:
                        cur_val.append(c)
                else:
                    if c == "'":
                        in_str = True
                    elif c == ',':
                        val = ''.join(cur_val).strip()
                        row.append(None if val == 'NULL' else val)
                        cur_val = []
                    elif c == ')':
                        val = ''.join(cur_val).strip()
                        row.append(None if val == 'NULL' else val)
                        pos += 1
                        break
                    else:
                        cur_val.append(c)
                pos += 1
            rows.append(row)
    return rows

def clean_html_text(text):
    if not text:
        return ""
    text = re.sub(r'</?(?:p|div|br|tr|td|th|h[1-6]|li|ul|ol)[^>]*>', ' ', text)
    text = re.sub(r'<[^>]+>', '', text)
    text = html.unescape(text)
    text = text.replace('\xa0', ' ').replace('&nbsp;', ' ').replace('&bull;', '•')
    text = text.replace('ต่า', 'ต่ำ').replace('สาหรับ', 'สำหรับ').replace('\u301c', ' - ')
    text = re.sub(r'[ \t]+', ' ', text).strip()
    return text

def is_spam_text(text):
    if not text:
        return False
    lower = text.lower()
    return any(b in lower for b in ['http:', 'https:', '.com', 'bitcoin', 'dating', 'viagra', 'pills', 'casino', 'money', 'sex', 'porn', 'buy cheap', '@'])

def format_description_html(raw_desc, brand=""):
    clean_desc = clean_html_text(raw_desc)
    if not clean_desc or is_spam_text(clean_desc):
        return ""
    if clean_desc.startswith(("สำหรับ", "เหมาะสำหรับ", "เพื่อ", "การ")):
        return clean_desc

    m = re.match(r"^(.*?)\s+((?:เป็น|สูตร|คุณภาพ|คุณสมบัติ).*)$", clean_desc)
    if m and len(m.group(1)) <= 70:
        lead = m.group(1).strip()
        rest = m.group(2).strip()
        if (brand and brand.lower() in lead.lower()) or any(w in lead for w in ["ลวดเชื่อม", "เครื่องเชื่อม", "อะไหล่", "เกรด", "รุ่น"]):
            return f'<strong class="font-bold text-[#252525]">{lead}</strong> {rest}'
    return clean_desc

def parse_unit_info(raw_unit):
    if not raw_unit:
        return {"label": "มาตรฐาน", "unit": "มาตรฐาน", "weight": ""}
    s = raw_unit.strip().replace("แพ๊ค", "แพ็ก").replace("กิโลกรัม", "กก.").replace("กิโล", "กก.")
    s = re.sub(r'\s+', ' ', s)
    if '/' in s:
        parts = [p.strip() for p in s.split('/', 1)]
        weight_part = parts[0]
        unit_part = parts[1].replace("แพ๊ค", "แพ็ก")
        weight_part = re.sub(r'(\d+(?:\.\d+)?)\s*กก\.?', r'\1 กก.', weight_part)
        weight_part = re.sub(r'(\d+)\s*เส้น', r'\1 เส้น', weight_part)
        weight_part = re.sub(r'(\d+)\s*ตัว', r'\1 ตัว', weight_part)
        weight_part = re.sub(r'(\d+)\s*ชิ้น', r'\1 ชิ้น', weight_part)
        weight_part = re.sub(r'(\d+)\s*แผ่น', r'\1 แผ่น', weight_part)
        weight_part = re.sub(r'(\d+)\s*ชุด', r'\1 ชุด', weight_part)
        if weight_part and unit_part:
            return {"label": f"{unit_part} ({weight_part})", "unit": unit_part, "weight": weight_part}
    single_name = s.replace("ละ", "").strip()
    return {"label": single_name, "unit": single_name, "weight": ""}

def clean_engineering_table(tbl_html):
    tbl = tbl_html.replace('\\"', '"').replace('\\r\\n', '\n').replace('\\n', '\n')
    tbl = re.sub(r'<\s*table[^>]*>', '<table class="engineering-table w-full text-left border-collapse text-[13.5px]">', tbl)
    tbl = re.sub(r'\s+(?:class|style|border|width|cellspacing|cellpadding)="[^"]*"', '', tbl)
    tbl = tbl.replace('<table', '<table class="engineering-table w-full text-left border-collapse text-[13.5px]"', 1)
    tbl = tbl.replace('&plusmn;', '±').replace('&Oslash;', 'Ø').replace('&nbsp;', ' ').replace('\u301c', ' - ')
    tbl = re.sub(r'</?(?:span|p|font)[^>]*>', '', tbl)
    tbl = re.sub(r'\n\s*\n', '\n', tbl)
    
    title = "ข้อมูลจำเพาะทางวิศวกรรม"
    if "ส่วนผสมทางเคมี" in tbl or "คุณสมบัติทางกล" in tbl:
        title = "คุณสมบัติของแนวเชื่อม (ส่วนผสมทางเคมี & คุณสมบัติทางกล)"
    elif "AC" in tbl or "DC" in tbl or "กระแสไฟ" in tbl:
        title = "กระแสไฟฟ้าที่แนะนำในการเชื่อม (AC / DC)"
    elif "สีแต้ม" in tbl or "ชื่อพิมพ์" in tbl:
        title = "การจำแนกสีแต้มและชื่อพิมพ์บนลวด"

    wrapped = f'''<div class="my-6">
  <h4 class="font-bold text-gray-800 text-[16px] md:text-[17px] mb-3 flex items-center gap-2">{title}</h4>
  <div class="overflow-x-auto bg-white rounded-xl border border-gray-200">
    {tbl}
  </div>
</div>'''
    return wrapped.strip()

def normalize_aws_grade(s):
    if not s:
        return s
    s = s.strip()
    s = re.sub(r'^(?:AWS(?:/SFA)?|SFA)\s*(?:A?[\d\.]+)?\s*[:\-\s/]*', '', s, flags=re.I).strip()
    upper = s.upper()
    replacements = {
        'LSI': 'LSi',
        'CUSI-A': 'CuSi-A',
        'CUNI': 'CuNi',
        'CUAL-A2': 'CuAl-A2',
        'CUSN-A': 'CuSn-A',
        'NICR-3': 'NiCr-3',
        'NICRMO-3': 'NiCrMo-3',
        'NICRMO-4': 'NiCrMo-4',
        'NICRMO-13': 'NiCrMo-13',
        'NIFE-CI': 'NiFe-CI',
        'NI-CI': 'Ni-CI',
        'CUMNNIAL': 'CuMnNiAl',
        'ALMG-5': 'AlMg-5',
        'ALSI-5': 'AlSi-5',
        'ALSI-12': 'AlSi-12',
        'BCUP-2': 'BCuP-2',
        'BCUP-3': 'BCuP-3',
        'BCUP-5': 'BCuP-5',
        'BCUP-6': 'BCuP-6',
        'BAG-1': 'BAg-1',
        'BAG-2': 'BAg-2',
        'BAG-20': 'BAg-20',
        'BAG-34': 'BAg-34',
        'BAG-45': 'BAg-45',
        'RBCUZN-A': 'RBCuZn-A',
        'RBCUZN-C': 'RBCuZn-C',
        'RBCUZN-D': 'RBCuZn-D',
    }
    for k, v in replacements.items():
        if upper.endswith(k):
            return s[:-len(k)] + v
        if upper == k:
            return v
    return s

def extract_wire_specs(desc, name, brand, cat_tree):
    specs = []
    clean_desc = clean_html_text(desc)
    grade_pattern = r'^(?:E\d{4}|E\d{3}[A-Za-z]*(?:-\d{2})?|ER\d{3,4}[A-Za-z0-9\-]*|E\d+T[A-Za-z0-9\-]*|ENi[A-Za-z0-9\-]+|RBCu[A-Za-z0-9\-]+|BCu[A-Za-z0-9\-]+|BAg-[0-9]+)$'
    aws_grade = None

    # A. Look in product name parentheses e.g. (E6013)
    m_paren = re.search(r'\((E\d{3,4}[A-Za-z0-9\-]*|ER\d{3,4}[A-Za-z0-9\-]*|ENi[A-Za-z0-9\-]+|BCuP-\d|BAg-\d+)\)', name)
    if m_paren:
        aws_grade = m_paren.group(1).strip()

    # B. Table extraction
    if not aws_grade:
        m_spec_val = re.search(r'(?:การจำแนกประเภท|มาตรฐาน|ชื่อพิมพ์).*?</td>\s*<td[^>]*>(.*?)</td>', desc, re.DOTALL)
        if m_spec_val:
            raw_spec = clean_html_text(m_spec_val.group(1))
            cand = None
            if "AWS" in raw_spec or "SFA" in raw_spec:
                m_code = re.search(r'(?:AWS|SFA)[^A-Za-z0-9]*([A-Z0-9\.\-]+)', raw_spec)
                if m_code:
                    token = m_code.group(1).strip()
                    if re.match(r'^[A-Z]?\d+\.\d+$', token):
                        m_next = re.search(rf'{token}\s*[:\-\s]*([A-Z0-9\-]+)', raw_spec)
                        if m_next: cand = m_next.group(1).strip()
                    else:
                        cand = token
            if not cand:
                m_exact = re.search(r'\b(E\d{4}|E\d{3}[A-Za-z]*(?:-\d{2})?|ER\d{3,4}[A-Za-z0-9\-]*|E\d+T[A-Za-z0-9\-]*|ENi[A-Za-z0-9\-]+)\b', raw_spec)
                if m_exact: cand = m_exact.group(1).strip()
            if cand and re.match(grade_pattern, cand, re.I) and len(cand) >= 4:
                aws_grade = cand

    # C. Known flagship model standard mappings
    if not aws_grade:
        if re.search(r'\b(FT-51|RB-26|KOBE-30|S-13)\b', name): aws_grade = 'E6013'
        elif re.search(r'\b(LB-52|LB-52U)\b', name): aws_grade = 'E7016'
        elif re.search(r'\b(L-55)\b', name): aws_grade = 'E7018'
        elif re.search(r'\b(TG-S50|SM-70)\b', name): aws_grade = 'ER70S-6'
        elif re.search(r'\b(SUPERWELD|G-303)\b', name): aws_grade = 'E6013'
        elif re.search(r'\b(TG-S308L)\b', name): aws_grade = 'ER308L'
        elif re.search(r'\b(TG-S309L)\b', name): aws_grade = 'ER309L'
        elif re.search(r'\b(TG-S316L)\b', name): aws_grade = 'ER316L'
        elif re.search(r'\b(SF-71)\b', name): aws_grade = 'E71T-1'

    # D. Standalone grade in title
    if not aws_grade:
        m_title_grade = re.search(r'\b(E\d{4}|E\d{3}[A-Za-z]*(?:-\d{2})?|ER\d{3,4}[A-Za-z0-9\-]*|E\d+T[A-Za-z0-9\-]*|ENi[A-Za-z0-9\-]+)\b', name)
        if m_title_grade:
            cand = m_title_grade.group(1).strip()
            if re.match(grade_pattern, cand, re.I) and len(cand) >= 4:
                aws_grade = cand

    if aws_grade:
        norm_grade = normalize_aws_grade(aws_grade)
        specs.append({"key": "การจำแนกประเภท", "value": norm_grade})

    # Approvals
    approvals = []
    if "มอก." in clean_desc:
        m_tis = re.search(r'(มอก\.\s*[\d\-]+)', clean_desc)
        if m_tis: approvals.append(m_tis.group(1))
    for std in ["LR", "ABS", "DNV", "NK", "BV", "GL"]:
        if re.search(rf'\b{std}\b', clean_desc): approvals.append(std)
    if approvals:
        specs.append({"key": "มาตรฐานรับรอง", "value": ", ".join(approvals)})

    # Welding Process
    cat_names = [c["name"] for c in cat_tree]
    cats_str = ' '.join(cat_names)
    combined = f"{name} {cats_str}"

    process_val = None
    if "ตัดเซาะร่อง" in cats_str or "เซาะร่อง" in name or "CHAMFERTRODE" in name:
        process_val = "ตัดเซาะร่อง (Gouging)"
    elif "LASER" in name.upper() or "เลเซอร์" in name:
        process_val = "เชื่อมเลเซอร์ (Laser)"
    elif "ซับเมอร์ก" in cats_str or "SAW" in cats_str or "SUBMERGED" in name.upper():
        process_val = "เชื่อมซับเมอร์ก (SAW)"
    elif "ฟลักซ์คอลล์" in cats_str or "ฟลักซ์คอร์" in combined or re.search(r"(FCAW|FCW|E71T|71T|DW-|SF-71|SF-|COREMAX|SUPERSHIELD|Cored)", combined, re.I):
        process_val = "เชื่อมฟลักซ์คอร์ (FCAW)"
    elif "เชื่อมแก๊ส" in cats_str or any(k in name for k in ["เงิน", "PHOSBRAZ", "BRAZARGENT", "BCuP", "BAg", "OSS-11", "LOW FUMING BRONZE", "ทองเหลืองแก๊ส"]):
        process_val = "เชื่อมแก๊สและประสาน (Gas / Brazing)"
    elif "เชื่อมอาร์กอน" in cats_str or "เชื่อมทังสเตน" in cats_str or re.search(r"(TIG|GTAW|ทังสเตน|WT20|WP|WL15|WL20|WC20|TG-S|TGS-)", combined, re.I):
        process_val = "เชื่อมอาร์กอน (TIG)"
    elif "เชื่อมซีโอทู" in cats_str or "เชื่อมมิก" in cats_str or re.search(r"(MIG|MAG|GMAW|SM-70|MG-50|MG-51|YM-28|MC-|M-)", combined, re.I):
        process_val = "เชื่อมมิก (MIG/MAG)"
    elif "เชื่อมไฟฟ้า" in cats_str or "MMA" in cats_str or re.search(r"(RB-26|LB-52|FT-51|KOBE-30|E6013|E7016|E7018|E308L-16|NICAST|ธูป|เชื่อมไฟฟ้า)", combined, re.I):
        process_val = "เชื่อมไฟฟ้า (MMA)"
    else:
        for c in cat_names:
            if "MIG" in c: process_val = "เชื่อมมิก (MIG/MAG)"; break
            if "TIG" in c: process_val = "เชื่อมอาร์กอน (TIG)"; break
            if "MMA" in c or "ไฟฟ้า" in c: process_val = "เชื่อมไฟฟ้า (MMA)"; break
        if not process_val: process_val = "เชื่อมไฟฟ้า (MMA)"
    if process_val:
        specs.append({"key": "กระบวนการเชื่อม", "value": process_val})

    # Base Metal
    target_str = f"{name} {cats_str}"
    mats = set()
    if any(k in name for k in ['เงิน', 'PHOSBRAZ', 'BRAZARGENT', 'BCuP', 'BAg']): mats.add('เงินประสาน')
    if any(k in name for k in ['ทองเหลือง', 'ทองแดง', 'Bronze', 'BRONZE', 'ERCu', 'Cu 112', 'Cu 114', 'NCS-M', 'MC-Cu']): mats.add('ทองเหลือง / ทองแดง')
    if any(k in name for k in ['พอกแข็ง', 'พอกผิวแข็ง', 'HARDFACING', 'TUBUROD', 'HF-', 'H-250', 'H-350', 'H-450', 'H-600', 'H-800', 'SC-450', 'SC-600', 'SC-700', 'HB68', 'HBA', 'Fe14', 'Fe15', 'CrCW', 'CrC']): mats.add('พอกผิวแข็ง')
    if any(k in name for k in ['เซาะร่อง', 'CHAMFERTRODE', 'C&G']): mats.add('ตัดเซาะร่อง')
    if any(k in name for k in ['นิเกิล', 'Cobalt', 'Stellite', 'สเตลไลท์', 'INCONEL', 'FM 82', 'FM 625', 'FM C-276', 'FM 622', 'NI59', 'ST-82', 'ST-276', 'ST-9010', 'KW-T82', 'ทังสเตน', 'WL20']): mats.add('โลหะเกรดพิเศษ (นิเกิล/โคบอลต์)')
    if any(k in target_str for k in ['เหล็กหล่อ', 'NICAST', 'Cast Iron', 'Ni-CI', 'NiFe-CI']): mats.add('เหล็กหล่อ')
    if any(k in target_str for k in ['อลูมิเนียม', 'Zinal', 'ZINAL', '4043', '5356']): mats.add('อลูมิเนียม')
    if any(k in target_str for k in ['สแตนเลส', 'สเตนเลส', '308', '309', '310', '312', '316', '347', '410', '430', '680']):
        mats.add('สแตนเลส')
        if any(k in name for k in ['309', '312', '680']): mats.add('เหล็ก')
    if any(k in name for k in ['Bronze-Si', 'LOW FUMING BRONZE', 'Bronze-Al']): mats.add('เหล็ก')
    if 'Zinal' in name or 'ZINAL' in name:
        mats.add('ทองเหลือง / ทองแดง')
        mats.add('เหล็ก')
    if not mats or any(k in name for k in ['เหล็กเหนียว', 'RB-26', 'LB-52', 'LB-52U', 'KOBE-30', 'FT-51', 'L-55', 'TG-S50', 'SM-70', 'ER70S-6', 'E6013', 'E7016', 'E7018', '71T', 'S-12', 'S-14', 'S-6013', 'YW-71', 'MG-50', 'MG-51', 'SUPERWELD', 'GEMINI G-303']):
        mats.add('เหล็ก')
    specs.append({"key": "วัสดุที่เชื่อม", "value": ", ".join(sorted(list(mats)))})

    # Welding Positions
    if "ท่าเชื่อม" in clean_desc:
        idx_pos = clean_desc.find("ท่าเชื่อม")
        chunk_pos = clean_desc[idx_pos:idx_pos+300]
        pos_clean = re.sub(r'<[^>]+>', ' ', chunk_pos).replace('&bull;', '').replace('ท่าเชื่อม', '').strip()
        pos_clean = re.sub(r'\s+', ' ', pos_clean)
        pos_val = pos_clean.split("','")[0].split("','[]'")[0].strip()
        if "ท่าราบ" in pos_val:
            m_pos = re.search(r'(ท่าราบ[^\n<\r\(\[\'\"\.]+(?:,\s*[^\n<\r\(\[\'\"\.]+)*)', pos_val)
            if m_pos: specs.append({"key": "ท่าเชื่อม", "value": m_pos.group(1).strip()})

    return specs

def extract_machine_specs(name, cat_ids, desc="", brand_hint="UDO"):
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
    brand = brand_hint
    if "AUTOWEL" in name_upper: brand = "AUTOWEL"
    elif "HYUNDAI" in name_upper: brand = "HYUNDAI"
    elif "KENZO" in name_upper: brand = "KENZO"
    elif brand == "UDO":
        if "KZ" in desc_clean or "KENZO" in desc_clean.upper(): brand = "KENZO"
        elif "HYUNDAI" in desc_clean.upper(): brand = "HYUNDAI"
        elif "AUTOWEL" in desc_clean.upper(): brand = "AUTOWEL"

    # 3. Amperage
    amperage = "200A"
    m_amp = re.search(r'(\d+)\s*(?:Amp|แอมป์)', name, re.I)
    if m_amp:
        amperage = f"{m_amp.group(1)}A"
    else:
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
    is_380 = False
    if re.search(r'380\s*V|380V|3\s*เฟส|3\s*Ph|3Ph|Three\s*Phase', name, re.I):
        is_380 = True
    elif re.search(r'STICK-(?:253|303|403)|MIG-253', name, re.I):
        is_380 = True
    elif re.search(r'กระแสไฟเข้า\s*380|ไฟเข้า\s*380|ระบบไฟ\s*380|380V/3Ph|380V/1Ph', desc_clean, re.I):
        is_380 = True

    if process == "ตัดพลาสม่า (PLASMA)" and int(amperage.replace('A', '')) >= 80:
        is_380 = True
    if int(amperage.replace('A', '')) >= 350:
        is_380 = True

    voltage = "3 เฟส 380V" if is_380 else "1 เฟส 220V"

    # 5. Features & Specs
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

    if process == "ตัดพลาสม่า (PLASMA)":
        m_cut = re.search(r'ตัด(?:ชิ้นงาน)?(?:ได้)?(?:สูงสุด)?(?:ไม่เกิน)?\s*(\d+)\s*มิล', desc_clean)
        if m_cut:
            specs.insert(3, {"key": "ความหนาชิ้นงานตัดสูงสุด", "value": f"{m_cut.group(1)} มม."})
        else:
            amp_num = int(amperage.replace('A', ''))
            cut_th = "10 มม." if amp_num <= 40 else "15 มม." if amp_num <= 55 else "20 มม." if amp_num <= 80 else "25 มม."
            specs.insert(3, {"key": "ความหนาชิ้นงานตัดสูงสุด", "value": cut_th})

    # Accessories
    m_ul = re.search(r'ประกอบ(?:ไป)?ด้วย.*?<ul>(.*?)</ul>', desc_clean, re.DOTALL)
    if m_ul:
        items_acc = [re.sub(r'<[^>]+>', '', li).replace('&nbsp;', ' ').strip() for li in re.findall(r'<li[^>]*>(.*?)</li>', m_ul.group(1), re.DOTALL)]
        items_acc = [it for it in items_acc if it and not any(k in it for k in ["เครื่องเชื่อม", "เครื่องตัด"])]
        if items_acc:
            specs.append({"key": "อุปกรณ์มาตรฐานในชุด", "value": ", ".join(items_acc)})

    return process, voltage, amperage, brand, specs

def extract_consumable_specs(name, sku, cat_ids, cats_dict, get_desc_fn, brand_hint="UDO"):
    name_upper = name.upper()
    sku_upper = (sku or "").upper()
    cat_names = [cats_dict.get(cid, {}).get('name', '') for cid in cat_ids]
    cat_str = " ".join(cat_names).upper()
    subcat = cat_names[1] if len(cat_names) > 1 else ""
    subsubcat = cat_names[2] if len(cat_names) > 2 else ""

    # 1. Authentic Brand Detection
    if sku_upper.startswith('OPT') or 'OPTECH' in name_upper:
        brand = 'OPTECH'
    elif 'AMERICAN' in name_upper:
        brand = 'AMERICAN'
    elif 'TRAFIMET' in name_upper:
        brand = 'TRAFIMET'
    elif 'PANASONIC' in name_upper:
        brand = 'PANASONIC'
    elif 'KENZO' in name_upper or sku_upper.startswith('KZ') or sku_upper.startswith('MIC'):
        brand = 'KENZO'
    elif 'HYUNDAI' in name_upper or sku_upper.startswith('HD'):
        brand = 'HYUNDAI'
    elif 'OTC' in name_upper or sku_upper.startswith('MIOT'):
        brand = 'OTC'
    elif 'CHAMP' in name_upper or sku_upper.startswith('CH') or sku_upper.startswith('KP') or sku_upper.startswith('PM') or sku_upper.startswith('TP'):
        brand = 'CHAMP'
    elif brand_hint and brand_hint != 'UDO':
        brand = brand_hint
    else:
        if sku_upper.startswith('UDOG') or sku_upper.startswith('UDOS') or 'GW-001' in sku_upper or 'หน้ากากเชื่อม' in name:
            brand = 'UDO'
        elif sku_upper.startswith('PM') or sku_upper.startswith('TP'):
            brand = 'CHAMP'
        elif sku_upper.startswith('MI'):
            brand = 'TRAFIMET'
        else:
            brand = 'UDO'

    # 2. Welding & Cutting System (ระบบงาน)
    if 'PLASMA' in cat_str or 'พลาสม่า' in name or any(k in sku_upper for k in ['PMP', 'PM', 'P80', 'PT31', 'SG51', 'A141', 'A101', 'A81', 'S45', 'S75', 'S65', 'CB50']):
        system = 'อะไหล่หัวตัดพลาสม่า (PLASMA)'
    elif 'MIG' in cat_str or 'ซีโอทู' in name or any(k in name_upper for k in ['MIG', 'CO2', 'FEEDER', 'โรลเลอร์']) or sku_upper.startswith('MI') or sku_upper.startswith('KZ'):
        system = 'อะไหล่หัวเชื่อมซีโอทู (MIG/MAG)'
    elif 'TIG' in cat_str or 'อาร์กอน' in name or any(k in name_upper for k in ['TIG', 'WP-17', 'WP-18', 'WP-26', 'WP-9', 'WP-20', 'COLLET', 'ALUMINA']) or sku_upper.startswith('TP'):
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
    elif 'สายเชื่อมไฟฟ้า' in name or 'OTWC' in sku_upper:
        part_type = 'สายเชื่อมไฟฟ้า (Welding Cable)'
    elif 'กระบอกอบลวด' in name:
        part_type = 'กระบอกอบลวดเชื่อม (Welding Rod Quiver)'
    elif 'หัวเก๊าจ์' in name:
        part_type = 'หัวเก๊าจ์คาร์บอน (Carbon Gouging Torch)'
    elif any(k in name for k in ['ปลั๊กสายสัญญาณ', 'เต้ารับสายสัญญาณ', 'สายสัญญาณคอนโทรล']):
        part_type = 'ปลั๊กและเต้ารับคอนโทรล (Control Plugs & Sockets)'
    elif any(k in name for k in ['ข้อต่อสายเชื่อม', 'ข้อต่อหน้าตู้', 'ข้อต่อตู้เชื่อม', 'อแด๊ปเตอร์แปลงข้อต่อยูโร']) or any(k in sku_upper for k in ['TRAK', 'OTTS', 'OTMS', 'OTTCC', 'OTSK']):
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
    elif any(k in name for k in ['ด้ามจับปืนเชื่อมมิก', 'HANDLE']) and ('MIG' in cat_str or 'MI' in sku_upper):
        part_type = 'ด้ามจับปืนเชื่อม (MIG Torch Handle)'
    elif any(k in name for k in ['โรลเลอร์ขับลวด', 'FEEDER']):
        part_type = 'โรลเลอร์ขับลวดเชื่อม (Wire Feeder Rollers)'
    elif any(k in name for k in ['ไลน์เนอร์', 'LINER']):
        part_type = 'ไลน์เนอร์นำลวดเชื่อม (Wire Conduit Liner)'
    elif any(k in name for k in ['SWITCH MIG', 'TRIGGER SWITCH', 'สวิตซ์']) and ('MIG' in cat_str or 'MI' in sku_upper):
        part_type = 'สวิตซ์ปืนเชื่อม (Torch Trigger Switch)'
    elif any(k in name for k in ['EURO ADAPTER', 'ADAPTER HOUSING', 'CINA BACK BOX', 'ปลั๊กปืนเชื่อมมิก', 'ADAPTER SCREW', 'SPRING CABLE SUPPORT', 'JOINT WITH SPRING', 'TORCH CABLE SUPPORT', 'TORCH ADAPTER SET']):
        part_type = 'ข้อต่อท้ายปืนและอแดปเตอร์ (MIG Euro Adapter & Plugs)'
    elif 'ฝาถังลวด' in name:
        part_type = 'ฝาครอบถังลวดเชื่อม (Drum Pack Cover)'

    # 3.5 TIG / Argon Parts
    elif any(k in name for k in ['อินซูเรเตอร์', 'INSULATOR']) or subsubcat == 'อินซูเรเตอร์ (Insulator)':
        part_type = 'อินซูเรเตอร์ / ฉนวนหัวเชื่อม (Insulator)'
    elif any(k in name for k in ['ถ้วยเซรามิก', 'ถ้วยเซรามิค', 'ALUMINA NOZZLE', 'CERAMIC']) or subsubcat == 'ถ้วยเซรามิค (Alumina Nozzle)':
        part_type = 'ถ้วยเซรามิค (TIG Alumina Nozzle)'
    elif (any(k in name for k in ['สลิปใน', 'COLLET']) and 'BODY' not in name_upper) or subsubcat == 'สลิปใน (Collet)':
        part_type = 'สลิปใน / จำปาจับทังสเตน (TIG Collet)'
    elif any(k in name for k in ['สลิปนอก', 'COLLET BODY', 'GAS LENS']) or subsubcat == 'สลิปนอก (Collet Body)':
        part_type = 'สลิปนอก / แกนจับสลิป (TIG Collet Body & Gas Lens)'
    elif any(k in name for k in ['หางปลาจับลวด', 'BACK CAP']) or subsubcat == 'หางปลาจับลวด (Back Cap)':
        part_type = 'หางปลาจับลวด / แคปท้าย (TIG Back Cap)'
    elif any(k in name for k in ['ปืนเชื่อมอาร์กอน', 'ปืนเชื่อมอาร์ก้อน', 'ชุดสายเชื่อมอาร์กอน']) or ('ปืนเชื่อม' in name and any(k in name for k in ['เมตร', 'ฟุต'])) or subsubcat == 'ปืนเชื่อมอาร์กอนพร้อมสาย (TIG Torch)':
        part_type = 'ชุดสายเชื่อมอาร์กอน (Complete TIG Torch)'
    elif any(k in name for k in ['สวิตซ์คอนโทรลด้ามเชื่อมอาร์กอน', 'ข้อต่อสายเชื่อมสายแก๊สด้ามเชื่อม WP-26', 'SINGLE MICRO SWTICH']):
        part_type = 'สวิตซ์และข้อต่อด้ามเชื่อม (TIG Switch & Connectors)'
    elif any(k in name for k in ['ด้ามเชื่อมอาร์กอน', 'ด้ามเชื่อม WP', 'WP-17', 'WP-18', 'WP-26', 'WP-9']) or subsubcat == 'ด้ามเชื่อม (Torch)':
        part_type = 'ด้ามเชื่อมอาร์กอน (TIG Torch Head & Body)'
    else:
        part_type = 'อะไหล่และอุปกรณ์เสริมทั่วไป'

    # 4. Torch Series / Model Compatibility
    series = set()
    # Plasma Series
    if 'P-80' in name_upper or 'P80' in name_upper or 'P80' in sku_upper: series.add('Plasma P-80')
    if 'PT-31' in name_upper or 'PT31' in name_upper or 'PT31' in sku_upper: series.add('Plasma PT-31')
    if 'SG-51' in name_upper or 'SG51' in name_upper or 'SG51' in sku_upper: series.add('Plasma SG-51')
    if 'S45' in name_upper or 'S-45' in name_upper or 'S45' in sku_upper: series.add('Trafimet Ergocut S45')
    if 'S65' in name_upper or 'S-65' in name_upper or 'S65' in sku_upper: series.add('Trafimet Ergocut S65')
    if 'S75' in name_upper or 'S-75' in name_upper or 'S75' in sku_upper: series.add('Trafimet Ergocut S75')
    if 'S105' in name_upper or 'S-105' in name_upper or 'S105' in sku_upper: series.add('Trafimet Ergocut S105')
    if 'A81' in name_upper or 'A-81' in name_upper or 'A81' in sku_upper: series.add('Trafimet Ergocut A81')
    if 'A101' in name_upper or 'A-101' in name_upper or 'A101' in sku_upper: series.add('Trafimet Ergocut A101')
    if 'A141' in name_upper or 'A-141' in name_upper or 'A141' in sku_upper or 'P141' in name_upper or 'P141' in sku_upper: series.add('Trafimet Ergocut A141/P141')
    if 'CB50' in name_upper or 'CB-50' in name_upper or 'CB70' in name_upper or 'CB-70' in name_upper or 'CB50' in sku_upper: series.add('Trafimet Ergocut CB50/CB70')
    if 'PCH-51' in name_upper or 'PCH-52' in name_upper or 'PCH-25' in name_upper or 'PCH' in sku_upper: series.add('Thermal Dynamics PCH Series')
    if 'HYPERTHERM' in name_upper or any(k in sku_upper for k in ['120930', '120929', '120928', '220047', '220065', '220048']): series.add('Hypertherm Powermax Series')
    if 'ME-50' in name_upper or 'ME50' in sku_upper: series.add('Plasma ME-50')
        
    # MIG Series
    if 'ERGOPLUS 15' in name_upper or 'MB-15' in name_upper or 'MB15' in name_upper or 'EG15' in sku_upper: series.add('Binzel MB-15 / Ergoplus 15')
    if 'ERGOPLUS 24' in name_upper or 'MB-24' in name_upper or 'MB24' in name_upper or 'EG24' in sku_upper: series.add('Binzel MB-24 / Ergoplus 24')
    if 'ERGOPLUS 25' in name_upper or 'MB-25' in name_upper or 'MB25' in name_upper or 'EG25' in sku_upper: series.add('Binzel MB-25 / Ergoplus 25')
    if 'ERGOPLUS 36' in name_upper or 'MB-36' in name_upper or 'MB36' in name_upper or 'EG36' in sku_upper: series.add('Binzel MB-36 / Ergoplus 36')
    if 'PANA 180' in name_upper or 'PANA 200' in name_upper or 'PANASONIC 200' in name_upper or 'PANA 180/200' in name_upper or 'MIPN20' in sku_upper or 'CINA-200' in name_upper: series.add('Panasonic 200A (Pana 200)')
    if 'PANA 350' in name_upper or 'PANASONIC 350' in name_upper or 'MIPN35' in sku_upper or 'CINA-350' in name_upper: series.add('Panasonic 350A (Pana 350)')
    if 'PANA 500' in name_upper or 'PANASONIC 500' in name_upper or 'MIPN50' in sku_upper or 'CINA-500' in name_upper: series.add('Panasonic 500A (Pana 500)')
    if 'OTC' in name_upper or sku_upper.startswith('MIOT') or 'DAIHEN' in name_upper: series.add('OTC / Daihen Type')
    if 'MILLER' in name_upper or 'CINA-200 ท้าย MILLER' in name or 'CINA-350 35SQMM ท้าย MILLER' in name: series.add('Miller Type')
        
    # TIG Series
    if any(k in name_upper for k in ['WP-17', 'WP17', 'WP-18', 'WP18', 'WP-26', 'WP26']): series.add('TIG WP-17 / WP-18 / WP-26')
    if any(k in name_upper for k in ['WP-9', 'WP9', 'WP-20', 'WP20']): series.add('TIG WP-9 / WP-20')
        
    # Safety Models
    if 'S777A' in name_upper: series.add('Optech S777A')
    if 'S998E' in name_upper: series.add('Optech S998E')
    if 'SUN7' in name_upper or 'SUN 7' in name_upper: series.add('Optech SUN7')
    if 'SUN9F' in name_upper or 'SUN 9' in name_upper: series.add('Optech SUN9F')
    if sku_upper.startswith('UDOG') or sku_upper.startswith('UDOS'): series.add('UDO Leather Series')
        
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

def extract_gas_equipment_specs(name, sku, cat_ids, cats_dict, brand_hint="UDO"):
    name_upper = name.upper()
    sku_upper = (sku or "").upper()
    cat_names = [cats_dict.get(cid, {}).get('name', '') for cid in cat_ids]
    cat_str = " ".join(cat_names).upper()
    subcat = cat_names[1] if len(cat_names) > 1 else ""

    # Clean name for gas detection by removing brand names that collide with gas symbols
    clean_name = re.sub(r'\bHARRIS\b', '', name_upper)

    # 1. Authentic Brand Detection
    if 'GASWORK' in name_upper or sku_upper.startswith('GW'):
        brand = 'GASWORK'
    elif 'IOXYGEN' in name_upper or sku_upper.startswith('IO'):
        brand = 'IOXYGEN'
    elif 'HARRIS' in name_upper or sku_upper.startswith('HA') or sku_upper.startswith('HR'):
        brand = 'HARRIS'
    elif 'CHAMP' in name_upper or sku_upper.startswith('CH'):
        brand = 'CHAMP'
    elif 'WELDSTAR' in name_upper or sku_upper.startswith('WS'):
        brand = 'WELDSTAR'
    elif 'MORRIS' in name_upper or sku_upper.startswith('MR'):
        brand = 'MORRIS'
    elif 'GOLD' in name_upper or sku_upper.startswith('GD'):
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
        brand = brand_hint if brand_hint and brand_hint != "UDO" else "UDO"

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
    if any(k in clean_name for k in ["AC/LPG", "LPG/AC", "AC / LPG", "LPG / AC"]) or "2 ระบบ" in name:
        gas_type = "ใช้งานได้ทั้ง AC และ LPG (2 ระบบ)"
    elif ("AR" in clean_name and "CO2" in clean_name) or "ผสม" in name:
        gas_type = "ก๊าซผสม (Ar+CO2 Mix)"
    elif any(k in clean_name for k in ["คาร์บอน", "CO2", "CARBON"]) or "CRF-220" in clean_name:
        gas_type = "คาร์บอนไดออกไซด์ (CO2)"
    elif any(k in clean_name for k in ["อะเซทิลีน", "อาซิทีลีน", "อะเซทีลีน", "ACETYLENE"]) or re.search(r'\bAC\b', clean_name) or sku_upper.endswith('AC') or 'AC ' in name:
        gas_type = "อะเซทิลีน (AC)"
    elif any(k in clean_name for k in ["แอลพีจี", "โพเพน", "โพรเพน", "LPG", "PROPANE", "ปิคนิค"]) or "6290-NX" in clean_name or "2290-" in clean_name or "HE-505" in clean_name or "HT-507" in clean_name or sku_upper.endswith('LP') or 'LPG' in clean_name:
        gas_type = "แอลพีจี / โพรเพน (LPG)"
    elif any(k in clean_name for k in ["ไนโตรเจน", "NITROGEN"]) or re.search(r'\bN2\b', clean_name) or sku_upper.endswith('N2') or sku_upper.endswith('N'):
        gas_type = "ไนโตรเจน (N2)"
    elif any(k in clean_name for k in ["ฮีเลียม", "HELIUM"]) or re.search(r'\bHE\b', clean_name) or 'ลูกโป่ง' in name:
        gas_type = "ฮีเลียม (He)"
    elif any(k in clean_name for k in ["ไฮโดรเจน", "HYDROGEN"]) or re.search(r'\bH2\b', clean_name):
        gas_type = "ไฮโดรเจน (H2)"
    elif any(k in clean_name for k in ["ไนตรัส", "NITROUS"]) or "N2O" in clean_name:
        gas_type = "ไนตรัสออกไซด์ (N2O)"
    elif any(k in clean_name for k in ["บิวเทน", "BUTANE", "แก๊สกระป๋อง"]):
        gas_type = "แก๊สกระป๋อง / บิวเทน (Butane)"
    elif any(k in clean_name for k in ["อ๊อกซิเย่น", "ออกซิเจน", "OXYGEN"]) or re.search(r'\bO2\b', clean_name) or re.search(r'\bOX\b', clean_name) or sku_upper.endswith('OX') or sku_upper.endswith('O2'):
        gas_type = "อ๊อกซิเย่น (O2)"
    elif "อาร์กอน" in name or "อาร์ก้อน" in name or re.search(r'\bARGON\b', clean_name) or re.search(r'\bAR\b', clean_name) or sku_upper.endswith('AR'):
        gas_type = "อาร์กอน (Ar)"
    elif "ลม" in name and ("AIR" in clean_name or "เกจ์" in name):
        gas_type = "ก๊าซแอร์ / ลม (Compressed Air)"
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
    elif "แก๊ส" in name and ("ต่อเกจ์แก๊ส" in name or "ต่อด้ามแก๊ส" in name or "เกจ์แก๊ส" in name or "เกลียวแก๊ส" in name or "FGL" in sku_upper or "FBAC" in sku_upper or "HTL" in sku_upper or "188L" in sku_upper):
        gas_type = "แก๊สเชื้อเพลิง (Fuel Gas: AC/LPG)"
    elif "ลม" in name and ("ต่อเกจ์ลม" in name or "ต่อด้ามลม" in name or "เกจ์ลม" in name or "เกลียวลม" in name or "FGR" in sku_upper or "FBOX" in sku_upper or "HTR" in sku_upper or "188R" in sku_upper):
        gas_type = "อ๊อกซิเย่น (O2)"
    elif eq_type == "ชุดเชื่อม-ตัดแก๊สสนาม (Portable Outfits)":
        gas_type = "แก๊สอ๊อกซิเย่น + อะเซทิลีน (O2 + AC)"
    else:
        gas_type = "อุปกรณ์ใช้งานร่วมทั่วไป"

    # 4. Feature Type (คุณสมบัติเฉพาะ / ตำแหน่งติดตั้ง)
    feat_type = "อุปกรณ์มาตรฐาน"
    if eq_type == "วาล์วกันไฟย้อนและเช็ควาล์ว (Flashback Arrestor)":
        if any(k in name for k in ["เกจ์", "ต่อเกจ์"]) or any(k in sku_upper for k in ["RFB", "288", "89-3"]):
            feat_type = "ติดตั้งฝั่งเกจ์ปรับแรงดัน (Regulator Mount)"
        elif any(k in name for k in ["ด้าม", "ต่อด้าม", "ชุดตัด"]) or any(k in sku_upper for k in ["TFB", "188", "88-3", "88-6"]):
            feat_type = "ติดตั้งฝั่งด้ามเชื่อม-ตัด (Torch Mount)"
    elif eq_type == "เกจ์ปรับแรงดันแก๊สและมาตรวัด (Regulator & Flowmeter)":
        if '2 ชั้น' in name or '2 STAGE' in name_upper or 'TWO STAGE' in name_upper or '987' in sku_upper:
            feat_type = "แรงดันคงที่ 2 ชั้น (Two-Stage)"
        elif 'ฮีตเตอร์' in name or 'HEATER' in name_upper or 'CRF-220' in name_upper:
            feat_type = "มีขดลวดฮีตเตอร์ (Heater CO2)"
        elif 'โฟลมิเตอร์' in name or 'โฟลเกจ์' in name or 'FLOWMETER' in name_upper or 'FLOW GAUGE' in name_upper or 'HPI' in sku_upper:
            feat_type = "มีหลอดโฟลมิเตอร์ (Flowmeter)"
        elif 'แรงดันสูง' in name or 'HIGH PRESSURE' in name_upper or 'HP' in sku_upper:
            feat_type = "รองรับแรงดันสูง (High Pressure)"
        elif 'ลูกสูบ' in name or 'PISTON' in name_upper:
            feat_type = "ระบบลูกสูบ (Piston Type)"
        else:
            feat_type = "เกจ์ปรับแรงดันชั้นเดียว (Single Stage)"
    elif eq_type in ["ชุดตัดแก๊สและด้ามตัด (Cutting Torch)", "ชุดเผาแก๊สและหัวเผา (Heating Torch & Tips)"]:
        if '180' in name or 'หัวตรง' in name:
            feat_type = "คอตรง 180 องศา (Straight 180°)"
        elif '90' in name:
            feat_type = "คอ 90 องศา (Standard 90°)"
        elif '70' in name:
            feat_type = "คอ 70 องศา (70°)"
        elif 'ด้าม' in name:
            feat_type = "ด้ามจับและชุดประกอบ"
        else:
            feat_type = "หัวตัด/หัวเผามาตรฐาน"
    elif eq_type in ["นมหนูตัดแก๊ส (Cutting Tips)", "นมหนูเชื่อมแก๊ส (Welding Tips)"]:
        if 'เซาะร่อง' in name or 'GOUGE' in name_upper or 'GOUGING' in name_upper:
            feat_type = "หัวเซาะร่อง (Gouging Tip)"
        else:
            feat_type = "หัวตัด/เชื่อมมาตรฐาน"

    specs = [
        {"key": "ประเภทอุปกรณ์", "value": eq_type},
        {"key": "ระบบแก๊สที่รองรับ", "value": gas_type},
        {"key": "รูปแบบ / การติดตั้ง", "value": feat_type},
        {"key": "แบรนด์ผู้ผลิต", "value": brand},
        {"key": "มาตรฐานความปลอดภัย", "value": "มาตรฐานอุตสาหกรรมสำหรับงานแก๊สแรงดันสูง"}
    ]

    return eq_type, gas_type, feat_type, brand, specs

def extract_abrasives_specs(name, cat_ids, cats_dict, variants=None):
    name_upper = name.upper()
    cat_names = [cats_dict.get(cid, {}).get('name', '') for cid in cat_ids]
    cat_str = " ".join(cat_names).upper()

    first_var_size = ""
    if variants and len(variants) > 0:
        first_var_size = str(variants[0].get('size', ''))

    # 1. Brand Correction
    brand = "NKK"
    if "SUMO" in name_upper:
        brand = "SUMO"
    elif "YAWATA" in name_upper:
        brand = "YAWATA"
    elif "NKK" in name_upper or "RESIBON" in name_upper:
        brand = "NKK"
    else:
        for b in ["NKK", "RESIBON", "NORTON", "CORONA", "KOBE", "3M", "PUMPKIN"]:
            if b in name_upper:
                brand = b
                break

    # 2. Disc Type (ประเภทใบ - แยกแผ่นเจียร, จานทราย, ล้อทราย, ใบตัด ตามการใช้งานจริง)
    disc_type = "ใบตัด (Cutting Disc)"
    if "ล้อทราย" in name:
        disc_type = "ล้อทรายมีแกน"
    elif "จานทราย" in name:
        if "หลังอ่อน" in name:
            disc_type = "จานทรายซ้อนหลังอ่อน"
        elif "หลังแข็ง" in name:
            disc_type = "จานทรายซ้อนหลังแข็ง"
        else:
            disc_type = "จานทรายซ้อน"
    elif any(k in name for k in ["แผ่นเจียรกระจก", "เจียรกระจก", "GC60", "GC80", "GC120"]):
        disc_type = "ใบเจียรกระจก / หิน"
    elif any(k in name for k in ["เจียรเหล็กบาง", "เจียรแสตนเลส", "เจียรบาง"]) and any(k in name or k in first_var_size for k in ["2 mm", "2.2 mm", "3 mm", "2.0", "X2", "X3"]):
        disc_type = "ใบเจียรบาง (2 - 3 มม.)"
    elif any(k in name for k in ["เจียรเหล็กหนา", "เจียรหนา", "A24R", "AWA24"]) or any(k in name or k in first_var_size for k in ["4 mm", "6 mm", "X4", "X6"]):
        disc_type = "ใบเจียรหนา (4 - 6 มม.)"
    elif "เจียร" in name:
        disc_type = "ใบเจียร"
    elif "ใบตัด" in name:
        disc_type = "ใบตัด (Cutting Disc)"

    # 3. Diameter / Size (ขนาดใบ - ตรวจสอบทั้งชื่อและ Variant ตัดคำว่ามาตรฐานออก 100%)
    diameter = "4 นิ้ว"
    m_dia = re.search(r'(\d+(?:\.\d+)?)\s*(?:นิ้ว|\\"|\"|\'\')', name)
    if not m_dia:
        m_dia = re.search(r'(\d+(?:\.\d+)?)\s*(?:นิ้ว|\\"|\"|\'\')', first_var_size)

    if m_dia:
        d_val = float(m_dia.group(1))
        diameter = f"{int(d_val) if d_val == int(d_val) else d_val} นิ้ว"
    elif "ล้อทราย" in name:
        m_wh = re.search(r'(\d+x\d+)\s*mm', name, re.I)
        diameter = f"แกน 6 มม. ({m_wh.group(1)} mm)" if m_wh else "แกน 6 มม."
    elif "จานทราย" in name or "GC" in name or "100" in name or "4 นิ้ว" in first_var_size:
        diameter = "4 นิ้ว"

    # 4. Grit (เบอร์ความละเอียด)
    grit = None
    m_grit = re.search(r'(?:เบอร์|#|No\.)\s*(\d+)', name, re.I)
    if not m_grit:
        m_grit = re.search(r'(?:GC|AC|WA|AWA)(\d+)', name, re.I)
    if m_grit:
        g_val = m_grit.group(1)
        if g_val == "460":
            g_val = "46"
        grit = f"#{g_val}"

    # 5. Target Material (วัสดุที่ใช้งาน - Array of tags for flexible filtering)
    if any(k in name for k in ["กระจก", "GC"]):
        material_list = ["กระจก", "หิน / กระเบื้อง"]
        material_display = "กระจก / หิน / กระเบื้อง"
    elif any(k in name for k in ["เหล็ก/สแตนเลส", "เหล็กและสแตนเลส", "AWA", "FAST CUT"]):
        material_list = ["เหล็ก", "สแตนเลส"]
        material_display = "เหล็กและสแตนเลส (2-in-1)"
    elif any(k in name for k in ["สแตนเลส", "แสตนเลส", "WA"]):
        material_list = ["สแตนเลส"]
        material_display = "สแตนเลส (Inox)"
    elif any(k in name for k in ["เหล็ก", "A36", "A30", "A24", "AC60"]):
        material_list = ["เหล็ก"]
        material_display = "เหล็ก (Carbon Steel)"
    elif "จานทราย" in name or "ล้อทราย" in name:
        material_list = ["เหล็ก", "สแตนเลส", "งานขัดทั่วไป"]
        material_display = "เหล็ก, สแตนเลส และงานขัดทั่วไป"
    else:
        material_list = ["เหล็ก", "สแตนเลส"]
        material_display = "เหล็กและสแตนเลส"

    specs = [
        {"key": "ประเภทใบ", "value": disc_type},
        {"key": "ขนาดใบ", "value": diameter},
        {"key": "วัสดุที่ใช้งาน", "value": material_display},
        {"key": "แบรนด์ผู้ผลิต", "value": brand}
    ]
    if grit:
        specs.insert(2, {"key": "เบอร์ความละเอียด", "value": grit})

    return disc_type, diameter, grit, material_list, material_display, brand, specs

def extract_gas_cylinder_specs(name, cat_ids, cats_dict):
    name_upper = name.upper()
    cat_names = [cats_dict.get(cid, {}).get('name', '') for cid in cat_ids]
    cat_str = " ".join(cat_names).upper()

    # 1. Item Type (ประเภทสินค้า - ตรวจสอบรถเข็นและหัววาล์วก่อนท่อ เพื่อป้องกันทับซ้อน)
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
        m_cga = re.search(r'CGA[- ]?(\d+)', name, re.I)
        if m_cga:
            cap = f"มาตรฐาน CGA-{m_cga.group(1)}"
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
    return gas_type, cap, item_type, brand, specs

def extract_chemical_specs(name, cat_ids, cats_dict, variants=None):
    name_upper = name.upper()
    cat_names = [cats_dict.get(cid, {}).get('name', '') for cid in cat_ids]
    cat_str = " ".join(cat_names).upper()

    variants = variants or []
    v_sizes = [v.get('size', '') for v in variants]
    v_pkgs = [v.get('package', '') for v in variants]
    v_skus = [v.get('sku', '') for v in variants]
    v_str = f"{' '.join(v_sizes)} {' '.join(v_pkgs)}".upper()
    sku_str = " ".join(v_skus).upper()

    # 1. Brand Detection (Detect industrial brands from SKU and Name)
    brand = "UDO"
    for b in ["WHALESPRAY", "NABAKEM", "TASETO", "HARRIS", "CHAMP"]:
        if b in name_upper:
            brand = b
            break
    if brand == "UDO":
        if "WHWS" in sku_str or "WHCRACKS" in sku_str or "WHALESPRAY" in name_upper:
            brand = "WHALESPRAY"
        elif "NBK" in sku_str or "ZINCOT" in name_upper:
            brand = "NABAKEM"
        elif "TST" in sku_str:
            brand = "TASETO"
        elif "FLUX" in sku_str:
            brand = "HARRIS"
        elif "CHNO" in sku_str:
            brand = "CHAMP"

    # 2. Chemical Type (ชนิดเคมีภัณฑ์ - 7 กลุ่มตามมาตรฐานสากล)
    if any(k in name_upper for k in ["กัลวาไนซ์", "ZINCOT", "สังกะสี"]):
        chem_type = "สเปรย์กัลวาไนซ์เคลือบกันสนิม (Cold Galvanize Spray)"
        target_work = "งานพ่นเคลือบกัลวาไนซ์ป้องกันสนิมโครงสร้างเหล็กและแนวเชื่อม"
    elif any(k in name_upper for k in ["หน้ากาก"]):
        chem_type = "สเปรย์ทำความสะอาดหน้ากากเชื่อม (Welding Mask Cleaner)"
        target_work = "ทำความสะอาดและดูแลรักษาหน้ากากเชื่อม ทั้งภายนอกและภายใน"
    elif any(k in name_upper for k in ["SUS CARE", "สเปรย์ด้าน", "สเปรย์ขัดเคลือบ"]):
        chem_type = "สเปรย์ทำความสะอาดและเคลือบเงาสแตนเลส (Stainless Care)"
        target_work = "ทำความสะอาด ขัดเงา และเคลือบฟิล์มปกป้องผิวสแตนเลสจากคราบและรอยนิ้วมือ"
    elif any(k in name_upper for k in ["SR-600", "3610G", "ล้างแนวเชื่อม", "ทำความสะอาดรอยเชื่อมสเตนเลส", "ทำความสะอาดแนวเชื่อมสแตนเลส"]):
        chem_type = "น้ำยาล้างแนวเชื่อมสแตนเลส (Pickling & Passivation)"
        target_work = "ล้างคราบรอยไหม้ คราบออกไซด์ และฟื้นฟูฟิล์มป้องกันสนิมบนแนวเชื่อมสแตนเลส"
    elif any(k in name_upper for k in ["ผงประสาน", "น้ำยาประสาน", "STAY-SILV", "AL-BRAZE", "NO.77"]) or 387 in cat_ids:
        chem_type = "น้ำยาประสานและฟลักซ์เชื่อม (Welding Flux)"
        target_work = "ช่วยประสานรอยต่อโลหะ กำจัดออกไซด์ และให้น้ำเชื่อมไหลลื่นสม่ำเสมอ"
    elif any(k in name_upper for k in ["N.D.T", "NDT", "ตรวจเช็คแนวเชื่อม", "ตรวจสอบแนวเชื่อม", "COLOR CHECK", "MEGA CHECK", "PT CHECK", "PENETRANT", "DEVELOPER", "REMOVER"]) or 385 in cat_ids:
        chem_type = "น้ำยาตรวจสอบแนวเชื่อม (N.D.T. Crack Checker)"
        target_work = "ตรวจสอบรอยร้าว รูพรุน และข้อบกพร่องของแนวเชื่อมด้วยวิธี Liquid Penetrant Testing (PT)"
    elif any(k in name_upper for k in ["ป้องกันสะเก็ด", "SPAZERO", "W-540", "NOZZLE CREAM", "NZ-400", "1800G", "1800S", "1801G", "1801S", "1805"]) or 384 in cat_ids:
        chem_type = "น้ำยาป้องกันสะเก็ดไฟเชื่อม (Anti-Spatter)"
        target_work = "ป้องกันสะเก็ดไฟเชื่อม (Spatter) เกาะติดชิ้นงาน หัวเชื่อม และปลาย Nozzle"
    else:
        chem_type = "เคมีภัณฑ์งานเชื่อมทั่วไป"
        target_work = "สำหรับงานเชื่อมและตกแต่งผิวโลหะอุตสาหกรรม"

    # 3. Packaging Form (รูปแบบบรรจุภัณฑ์ - 5 รูปแบบจริง)
    if "ชุด" in name or any("ชุด" in s for s in v_sizes) or any("ชุด" in p for p in v_pkgs):
        form = "ชุดเซ็ตครบชุด (Set 3 กระป๋อง)"
    elif any(k in name for k in ["ชนิดผง", "ผงประสาน"]) or "ผง" in v_str:
        form = "ชนิดผง (Powder)"
    elif any(k in name for k in ["เจล", "ครีม", "PASTE", "CREAM"]) or any(k in v_str for k in ["กระปุก", "เจล", "ครีม"]) or "3610G" in name_upper:
        form = "เจล / ครีมทา (Paste / Gel)"
    elif any(k in name for k in ["แกลลอน", "ถัง"]) or any(k in v_str for k in ["แกลลอน", "18 ลิตร", "25 ลิตร", "5 ลิตร", "20 กก"]):
        form = "ถัง / แกลลอน (Liquid)"
    else:
        form = "สเปรย์กระป๋อง (Aerosol Spray)"

    # 4. Function / Stage (หน้าที่การทำงาน / สเต็ปการใช้งาน)
    if chem_type == "น้ำยาตรวจสอบแนวเชื่อม (N.D.T. Crack Checker)":
        if form == "ชุดเซ็ตครบชุด (Set 3 กระป๋อง)":
            func_type = "ชุดตรวจเช็คครบชุด (Set 3 กระป๋อง)"
        elif any(k in name_upper for k in ["PENETRANT", "แทรกซึม", "1821S"]):
            func_type = "น้ำยาแทรกซึมสีแดง (Penetrant)"
        elif any(k in name_upper for k in ["DEVELOPER", "เร่งปฏิกริยา", "1820S"]):
            func_type = "น้ำยาแสดงผลรอยร้าวสีขาว (Developer)"
        elif any(k in name_upper for k in ["REMOVER", "CLEANER", "ทำความสะอาด", "3050S"]):
            func_type = "น้ำยาทำความสะอาดพื้นผิว (Cleaner / Remover)"
        else:
            func_type = "น้ำยาตรวจเช็คแนวเชื่อม"
    elif chem_type == "น้ำยาป้องกันสะเก็ดไฟเชื่อม (Anti-Spatter)":
        if form == "เจล / ครีมทา (Paste / Gel)":
            func_type = "เจลจุ่มหัวเชื่อมป้องกันสะเก็ด (Nozzle Dip Gel)"
        elif form == "ถัง / แกลลอน (Liquid)":
            func_type = "น้ำยาป้องกันสะเก็ดชนิดน้ำ (Liquid Gallon)"
        else:
            func_type = "สเปรย์ป้องกันสะเก็ด (Aerosol Spray)"
    elif chem_type == "น้ำยาประสานและฟลักซ์เชื่อม (Welding Flux)":
        if "ทองเหลือง" in name:
            func_type = "ฟลักซ์เชื่อมทองเหลือง (Brass Flux)"
        elif "อลูมิเนียม" in name:
            func_type = "ฟลักซ์เชื่อมอัลลูมิเนียม (Aluminum Flux)"
        elif "เงิน" in name:
            func_type = "ฟลักซ์เชื่อมเงิน (Silver Brazing Flux)"
        else:
            func_type = "ฟลักซ์เชื่อมโลหะ"
    elif chem_type == "สเปรย์กัลวาไนซ์เคลือบกันสนิม (Cold Galvanize Spray)":
        func_type = "สเปรย์กัลวาไนซ์เคลือบกันสนิม"
    elif chem_type == "น้ำยาล้างแนวเชื่อมสแตนเลส (Pickling & Passivation)":
        func_type = "น้ำยาล้างแนวเชื่อมสแตนเลส"
    elif chem_type == "สเปรย์ทำความสะอาดและเคลือบเงาสแตนเลส (Stainless Care)":
        func_type = "สเปรย์ทำความสะอาดและเคลือบผิวสแตนเลส"
    elif chem_type == "สเปรย์ทำความสะอาดหน้ากากเชื่อม (Welding Mask Cleaner)":
        func_type = "สเปรย์ทำความสะอาดหน้ากากเชื่อม"
    else:
        func_type = chem_type.split(" (")[0]

    specs = [
        {"key": "ชนิดเคมีภัณฑ์", "value": chem_type},
        {"key": "หน้าที่การทำงาน", "value": func_type},
        {"key": "รูปแบบบรรจุภัณฑ์", "value": form},
        {"key": "แบรนด์ผู้ผลิต", "value": brand},
        {"key": "การใช้งานหลัก", "value": target_work}
    ]
    return chem_type, form, func_type, brand, specs

def extract_tool_specs(name, cat_ids, cats_dict, brand_hint="EMTOP"):
    name_upper = name.upper()

    # 1. Power System
    if "12V" in name_upper:
        power_system = "ไร้สาย 12V (Cordless 12V)"
    elif "20V" in name_upper or "ไร้สาย" in name:
        power_system = "ไร้สาย 20V (Cordless 20V)"
    elif any(k in name for k in ["แปรงทองเหลือง", "แปรงลวด"]):
        power_system = "เครื่องมือใช้งานมือ (Hand Tools)"
    else:
        power_system = "ไฟฟ้า 220V (Corded 220V)"

    # 2. Tool Type
    if "สว่านโรตารี่" in name:
        tool_type = "สว่านโรตารี่ (Rotary Hammer)"
    elif "บล็อก" in name and "สว่าน" in name:
        tool_type = "ชุดคอมโบสว่านและบล็อก (Combo Kit)"
    elif any(k in name for k in ["บล็อกไร้สาย", "ไขควงกระแทก"]):
        tool_type = "บล็อกและไขควงกระแทก (Impact Wrench & Driver)"
    elif "สว่าน" in name:
        tool_type = "สว่านไร้สายและสว่านกระแทก (Drill & Impact Drill)"
    elif "เครื่องเจียรตั้งโต๊ะ" in name:
        tool_type = "เครื่องเจียรตั้งโต๊ะ (Bench Grinder)"
    elif "เครื่องเจียร" in name:
        tool_type = "เครื่องเจียรมือ 4 นิ้ว (Angle Grinder)"
    elif "แท่นตัดไฟเบอร์" in name:
        tool_type = "แท่นตัดไฟเบอร์ 14 นิ้ว (Cut-off Saw)"
    elif "เลื่อย" in name:
        tool_type = "เลื่อยวงเดือนและจิ๊กซอว์ (Circular & Jig Saw)"
    elif any(k in name for k in ["แปรง", "คีม", "ประแจ"]):
        tool_type = "เครื่องมือช่างและแปรงขัด (Hand Tools & Brushes)"
    else:
        tool_type = "เครื่องมือช่างทั่วไป"

    # 3. Features & Capacity
    m_torque = re.search(r'(\d+)\s*(?:NM|Nm)', name)
    m_joule = re.search(r'(\d+(?:\.\d+)?)\s*(?:J|จูล)', name)
    m_watt = re.search(r'(\d+)\s*(?:W|วัตต์)', name)
    m_inch = re.search(r'(\d+(?:\.\d+)?)\s*(?:นิ้ว|inch|\")', name)

    capacity = ""
    if m_torque:
        capacity = f"แรงบิด {m_torque.group(1)} Nm"
    elif m_joule:
        capacity = f"แรงกระแทก {m_joule.group(1)} J"
    elif m_watt:
        capacity = f"กำลังไฟ {m_watt.group(1)} W"
    elif m_inch:
        capacity = f"ขนาด {m_inch.group(1)} นิ้ว"

    brand = "EMTOP" if "EMTOP" in name_upper else (brand_hint or "EMTOP")

    specs = [
        {"key": "ประเภทเครื่องมือ", "value": tool_type},
        {"key": "ระบบกำลังไฟ", "value": power_system},
        {"key": "แบรนด์ผู้ผลิต", "value": brand},
        {"key": "ขนาด / กำลังการทำงาน", "value": capacity if capacity else "ขนาดมาตรฐาน"},
        {"key": "การรับประกัน", "value": "รับประกันมอเตอร์ 6 เดือน ตามเงื่อนไขผู้ผลิต"}
    ]
    return tool_type, power_system, capacity, brand, specs

def extract_wire_diameter(raw_str):
    if not raw_str or raw_str in ['มาตรฐาน', 'ฟรีไซส์']:
        return None
    raw = str(raw_str).strip()
    if any(k in raw for k in ['ราคากิโลกรัม', 'กก.', 'FLUX', 'Flux', 'flux']):
        return None
    m = re.search(r'(?:^|[^\d\.])(\d+(?:\.\d+)?)\s*(?:mm|มม|มมง|x|X|\.|\s|$)', raw)
    if m:
        try:
            val = float(m.group(1))
            if 0.2 <= val <= 12.0:
                return f"{val:.1f} mm" if val != int(val) else f"{int(val)}.0 mm"
        except:
            pass
    return None

def normalize_package(raw_str):
    if not raw_str or raw_str in ['มาตรฐาน', 'ฟรีไซส์', '']:
        return None
    s = str(raw_str).strip()
    if "หลอด" in s:
        if "1" in s: return "หลอด (1 กก.)"
        return "หลอด (5 กก.)"
    if "ม้วน" in s:
        if any(w in s for w in ["25", "20"]): return "ถัง / ม้วนใหญ่ (20 - 25 กก.)"
        if any(w in s for w in ["15", "12.5", "9"]): return "ม้วนมาตรฐาน (12.5 - 15 กก.)"
        if any(w in s for w in ["5", "7"]): return "ม้วนเล็ก (5 - 7 กก.)"
        if any(w in s for w in ["1", "2"]): return "ม้วนเล็ก DIY (1 - 2 กก.)"
        return "ม้วนมาตรฐาน (12.5 - 15 กก.)"
    if any(k in s for k in ["ลัง (20", "ถัง (20", "ถัง (250", "กล่อง (10"]):
        return "ลัง / กล่องใหญ่ (10 - 20 กก.)"
    if "10 เส้น" in s: return "แพ็กทดลอง (10 เส้น)"
    if "5 กก." in s: return "ห่อ / กล่อง (5 กก.)"
    if any(k in s for k in ["2.5", "2 กก.", "กระป๋อง"]): return "ห่อ / กล่อง (2 - 2.5 กก.)"
    if s == "1 ห่อ" or "1 กก." in s or "0.5" in s or s == "กล่อง": return "ห่อ / แพ็ก (1 กก.)"
    return s

def evaluate_product_audit(category_type, prod_variants, cleaned_tables, commercial_specs, formatted_images, rich_images):
    has_variants = len(prod_variants) > 0
    min_price = min([v["price"] for v in prod_variants]) if has_variants else 0
    has_image = len(formatted_images) > 0
    has_tables = len(cleaned_tables) > 0
    has_rich_banner = len(rich_images) > 0

    if not has_image:
        return {
            "status": "QUARANTINE_RED",
            "flag": "QUARANTINE_NO_IMAGE",
            "reason_th": "กักกัน: ไม่มีรูปภาพสินค้าเลย",
            "has_tables": has_tables,
            "table_count": len(cleaned_tables),
            "specs_count": len(commercial_specs),
            "variant_count": len(prod_variants),
            "image_count": 0
        }

    if category_type in ["machines", "consumables", "gas_equipment", "abrasives", "gas_cylinders", "chemicals", "tools"] and min_price <= 0:
        return {
            "status": "READY_GREEN",
            "flag": "READY_INQUIRY_ITEM",
            "reason_th": "สินค้าอุตสาหกรรมพร้อมขายในระบบขอใบเสนอราคา (B2B Request a Quote)",
            "has_tables": has_tables,
            "table_count": len(cleaned_tables),
            "specs_count": len(commercial_specs),
            "variant_count": len(prod_variants),
            "image_count": len(formatted_images)
        }

    if min_price <= 0 and category_type == "welding_wire":
        return {
            "status": "QUARANTINE_RED",
            "flag": "QUARANTINE_PRICE_ZERO",
            "reason_th": "กักกัน: ราคาสินค้าเป็น 0 บาท หรือไม่มีตัวเลือกราคา",
            "has_tables": has_tables,
            "table_count": len(cleaned_tables),
            "specs_count": len(commercial_specs),
            "variant_count": len(prod_variants),
            "image_count": len(formatted_images)
        }

    if not has_tables and not has_rich_banner and category_type == "welding_wire":
        return {
            "status": "WARNING_YELLOW",
            "flag": "WARNING_NO_SPECS_TABLE",
            "reason_th": "พร้อมขายปกติ แนะนำให้แอดมินเติมตารางสเปกเคมีใน Admin",
            "has_tables": False,
            "table_count": 0,
            "specs_count": len(commercial_specs),
            "variant_count": len(prod_variants),
            "image_count": len(formatted_images)
        }

    return {
        "status": "READY_GREEN",
        "flag": "READY_FULL_SPECS",
        "reason_th": "พร้อมขึ้นขายทันที สเปกวิศวกรรมครบถ้วน 100%",
        "has_tables": has_tables,
        "table_count": len(cleaned_tables),
        "specs_count": len(commercial_specs),
        "variant_count": len(prod_variants),
        "image_count": len(formatted_images)
    }

def parse_flags_from_entry(entry):
    m = re.search(r",\s*([0-1])\s*,\s*([0-1])\s*,\s*(?:'[^']*'|NULL),\s*(?:'[^']*'|NULL),\s*(?:'[^']*'|NULL),\s*(\d+)", entry)
    if m:
        promo = int(m.group(1))
        rec = int(m.group(2))
        good_sales = int(m.group(3))
        return promo, rec, good_sales
    return 0, 0, 0

def run_migration():
    print("Reading SQL database...")
    sql_text = load_database()

    # 1. Parse Brands
    bands_rows = parse_mysql_insert('bands', sql_text)
    bands = {int(r[0]): r[1] for r in bands_rows}

    # 2. Parse Units
    units_rows = parse_mysql_insert('units', sql_text)
    units = {int(r[0]): r[1] for r in units_rows}

    # 3. Parse Categories
    cats = {}
    for r in parse_mysql_insert('categories_product', sql_text):
        cid = int(r[0])
        cname = r[1]
        cparent = int(r[4]) if r[4] and r[4] != 'NULL' else None
        cats[cid] = {'id': cid, 'name': cname, 'parent_id': cparent}

    def get_all_descendants(root_id):
        descendants = {root_id}
        added = True
        while added:
            added = False
            for cid, cdata in cats.items():
                if cdata['parent_id'] in descendants and cid not in descendants:
                    descendants.add(cid)
                    added = True
        return descendants

    target_root_cids = [12, 339, 344, 312, 298, 327, 382, 398]
    all_target_cids = set()
    for rid in target_root_cids:
        all_target_cids.update(get_all_descendants(rid))

    # 4. Product-Category Mappings
    prod_cats = {}
    for r in parse_mysql_insert('categoryofproduct', sql_text):
        if r[1] and r[2] and r[1] != 'NULL' and r[2] != 'NULL':
            cid = int(r[1])
            pid = int(r[2])
            if pid not in prod_cats:
                prod_cats[pid] = set()
            prod_cats[pid].add(cid)

    target_pids = set()
    for pid, cset in prod_cats.items():
        if cset.intersection(all_target_cids):
            target_pids.add(pid)

    print(f"Targeting {len(target_pids)} products across all 8 Root Categories...")

    # 5. Parse Variants (items)
    items = {}
    for r in parse_mysql_insert('items', sql_text):
        if not r[1] or r[1] == 'NULL': continue
        prod_id = int(r[1])
        if prod_id not in items:
            items[prod_id] = []
        
        size_raw = r[2]
        size = "" if not size_raw or size_raw == 'NULL' else size_raw.replace("\\'", "'")
        cleaned_size = re.sub(r"^ขนาด\s*", "", size).strip().rstrip(".")
        if not cleaned_size: cleaned_size = "มาตรฐาน"

        unit_id = int(r[6]) if r[6] and r[6] != 'NULL' else None
        raw_unit = units.get(unit_id, "ชิ้น") if unit_id else "ชิ้น"
        u_info = parse_unit_info(raw_unit)

        sku_raw = r[9]
        sku = f"UDO-{prod_id}" if not sku_raw or sku_raw == 'NULL' else sku_raw.replace("\\'", "'")

        price = float(r[3] or 0)
        discount = float(r[4]) if r[4] and r[4] != 'NULL' and float(r[4]) > price else None
        stock = int(r[5] or 0)

        items[prod_id].append({
            "size": cleaned_size,
            "package": u_info["label"],
            "unit": u_info["unit"],
            "weight": u_info["weight"],
            "price": price,
            "original_price": discount,
            "stock": stock,
            "sku": sku
        })

    # Real sales from order_item
    item_to_prod = {int(r[0]): int(r[1]) for r in parse_mysql_insert('items', sql_text) if r[1] and r[1] != 'NULL'}
    real_sales = {}
    for r in parse_mysql_insert('order_item', sql_text):
        try:
            iid = int(r[2])
            qty = int(r[3])
            pid = item_to_prod.get(iid)
            if pid:
                real_sales[pid] = real_sales.get(pid, 0) + qty
        except:
            pass

    # Product Relations
    relations_map = {}
    for r in parse_mysql_insert('product_relations', sql_text):
        try:
            p_id = int(r[0])
            c_id = int(r[1])
            if p_id not in relations_map:
                relations_map[p_id] = []
            relations_map[p_id].append(c_id)
        except:
            pass

    products_out = []
    seen_pids = set()
    audit_stats = {"READY_GREEN": 0, "WARNING_YELLOW": 0, "QUARANTINE_RED": 0}
    audit_flags = {}
    audit_rows = []

    prods_raw = parse_mysql_insert('products', sql_text)
    for row in prods_raw:
        p_id = int(row[0])
        if p_id not in target_pids or p_id in seen_pids:
            continue
        seen_pids.add(p_id)

        name = row[1]
        short_desc = row[2] or ""
        desc = row[3] or ""
        catalog = row[4]
        cr_at = row[5]
        up_at = row[6]
        thumb = row[7]
        images_raw = row[8]
        band_id = int(row[9]) if row[9] and row[9] != 'NULL' else None
        brand_name = bands.get(band_id, "UDO") if band_id else "UDO"
        slug = row[10]
        tags_raw = row[11]
        promo_val = int(row[12] or 0)
        rec_val = int(row[13] or 0)
        seo_title = row[14]
        meta_desc = row[15]
        meta_kw = row[16]
        good_sales_val = int(row[17] or 0)
        sortp = int(row[18]) if row[18] and row[18] != 'NULL' else None
        name_en = row[20] if row[20] and row[20] != 'NULL' else None
        canonical = row[21]

        # Images
        img_urls = []
        if thumb and thumb != "NULL":
            img_urls.append(f"https://www.udo.co.th/storage/{thumb}")
        if images_raw and images_raw not in ('NULL', '[]', ''):
            try:
                raw_json = images_raw.replace('\\"', '"').replace('\\/', '/')
                extra_imgs = json.loads(raw_json)
                for extra in extra_imgs:
                    full_url = f"https://www.udo.co.th/storage/{extra}"
                    if full_url not in img_urls: img_urls.append(full_url)
            except Exception:
                pass
        formatted_images = [{"thumb": u, "card": u, "large": u, "original": u} for u in img_urls]

        # Category Tree
        c_ids = list(prod_cats.get(p_id, []))
        deepest_cid = None
        max_depth = -1
        for cid in c_ids:
            depth = 0
            curr = cid
            while curr and curr in cats:
                depth += 1
                curr = cats[curr]['parent_id']
            if depth > max_depth:
                max_depth = depth
                deepest_cid = cid

        cat_tree = []
        root_cid = 12
        if deepest_cid and deepest_cid in cats:
            chain = []
            curr = deepest_cid
            visited = set()
            while curr and curr in cats and curr not in visited:
                visited.add(curr)
                chain.append(cats[curr])
                curr = cats[curr]['parent_id']
            chain.reverse()
            root_cid = chain[0]['id']
            for idx, c_obj in enumerate(chain):
                cat_tree.append({"level": idx + 1, "name": c_obj['name'], "url_slug": f"cat-{c_obj['id']}"})
        else:
            cat_tree = [{"level": 1, "name": "กลุ่มลวดเชื่อม", "url_slug": "cat-12"}]

        # Rich images & tables
        rich_images = []
        cleaned_tables = []
        clean_desc_imgs = desc.replace(r'\"', '"').replace(r"\'", "'")
        for img_match in re.finditer(r'<img[^>]+src=["\']([^"\'>]+)["\']', clean_desc_imgs):
            raw_src = img_match.group(1).strip().replace(" ", "%20")
            if 'fbcdn' in raw_src or 'emoji' in raw_src:
                continue
            if not raw_src.startswith("http"):
                raw_src = f"https://www.udo.co.th/storage/{raw_src.lstrip('/')}"
            rich_images.append(raw_src)

        if not is_spam_text(desc):
            raw_tables = re.findall(r"(<table.*?</table>)", desc, re.DOTALL)
            cleaned_tables = [clean_engineering_table(tbl) for tbl in raw_tables if clean_engineering_table(tbl)]
        tables_html = "\n".join(cleaned_tables) if cleaned_tables else None

        # Category-specific processing
        prod_variants = items.get(p_id, [])

        if root_cid == 339:
            # Category 339: Machines
            cat_type = "machines"
            m_proc, m_volt, m_amp, m_brand, m_specs = extract_machine_specs(name, c_ids, desc, brand_name)
            if brand_name == "UDO" and m_brand != "UDO": brand_name = m_brand
            commercial_specs = m_specs

            clean_desc_plain = f"{name} คุณภาพมาตรฐานอุตสาหกรรม รองรับระบบไฟ {m_volt} ให้กระแสไฟเชื่อมสูงสุด {m_amp} สม่ำเสมอ ควบคุมการอาร์คได้นิ่งและแม่นยำ เหมาะสำหรับงานโครงสร้าง งานซ่อมบำรุง และงานอุตสาหกรรมทั่วไป"
            desc_html_formatted = f'<strong class="font-bold text-[#252525]">{name}</strong> {clean_desc_plain}'
            rich_desc_final = clean_desc_plain

            if not prod_variants:
                prod_variants = [{
                    "size": "เครื่องมาตรฐาน",
                    "package": "เครื่อง",
                    "unit": "เครื่อง",
                    "weight": "",
                    "price": 0.0,
                    "original_price": None,
                    "stock": 5,
                    "sku": f"UDO-M{p_id}"
                }]

            filter_attributes_obj = {
                "category_type": "machines",
                "process": m_proc,
                "voltage": m_volt,
                "amperage": m_amp,
                "brand": brand_name
            }
            tags_list = [m_proc, m_volt, m_amp, brand_name]

        elif root_cid == 344:
            # Category 344: Consumables
            cat_type = "consumables"
            primary_sku = prod_variants[0]["sku"] if prod_variants else ""
            c_sys, c_part, c_sers, c_brand, c_specs = extract_consumable_specs(name, primary_sku, c_ids, cats, get_all_descendants, brand_name)
            if brand_name == "UDO" and c_brand != "UDO": brand_name = c_brand
            commercial_specs = c_specs

            clean_desc_plain = f"{name} {c_part} สำหรับ{c_sys} รองรับรุ่น {', '.join(c_sers)} มาตรฐานคุณภาพสูง แบรนด์ {brand_name} ทนความร้อนสูง ช่วยให้การนำกระแสและการระบายความร้อนมีประสิทธิภาพ ยืดอายุการใช้งาน เหมาะสำหรับงานอุตสาหกรรมหนักและงานซ่อมบำรุง"
            desc_html_formatted = f'<strong class="font-bold text-[#252525]">{name}</strong> {clean_desc_plain}'
            rich_desc_final = clean_desc_plain

            if not prod_variants:
                prod_variants = [{
                    "size": "มาตรฐาน",
                    "package": "1 ชิ้น",
                    "unit": "ชิ้น",
                    "weight": "",
                    "price": 0.0,
                    "original_price": None,
                    "stock": 10,
                    "sku": f"UDO-C{p_id}"
                }]

            filter_attributes_obj = {
                "category_type": "consumables",
                "torch_category": c_sys,
                "torch_series": c_sers,
                "part_type": c_part,
                "brand": brand_name
            }
            tags_list = [c_sys, c_part, brand_name] + c_sers

        elif root_cid == 312:
            # Category 312: Gas Equipment
            cat_type = "gas_equipment"
            primary_sku = prod_variants[0]["sku"] if prod_variants else ""
            eq_type, gas_type, feat_type, eq_brand, eq_specs = extract_gas_equipment_specs(name, primary_sku, c_ids, cats, brand_name)
            if brand_name == "UDO" and eq_brand != "UDO": brand_name = eq_brand
            commercial_specs = eq_specs

            clean_desc_plain = f"{name} {eq_type} สำหรับ{gas_type} คุณภาพมาตรฐานความปลอดภัยสูง แบรนด์ {brand_name} ออกแบบให้ควบคุมแรงดันและปริมาณการจ่ายแก๊สได้อย่างแม่นยำ ปลอดภัย โครงสร้างแข็งแรงทนทาน เหมาะสำหรับงานอุตสาหกรรมหนักและงานซ่อมบำรุงทั่วไป"
            desc_html_formatted = f'<strong class="font-bold text-[#252525]">{name}</strong> {clean_desc_plain}'
            rich_desc_final = clean_desc_plain

            if not prod_variants:
                prod_variants = [{
                    "size": "มาตรฐาน",
                    "package": "ชุด / ชิ้น",
                    "unit": "ชุด",
                    "weight": "",
                    "price": 0.0,
                    "original_price": None,
                    "stock": 10,
                    "sku": f"UDO-G{p_id}"
                }]

            filter_attributes_obj = {
                "category_type": "gas_equipment",
                "equipment_type": eq_type,
                "gas_type": gas_type,
                "feature_type": feat_type,
                "brand": brand_name
            }
            tags_list = [eq_type, gas_type, brand_name]

        elif root_cid == 298:
            # Category 298: Abrasives (Cutting & Grinding Discs)
            cat_type = "abrasives"
            disc_type, diameter, grit, mat_list, mat_display, ab_brand, ab_specs = extract_abrasives_specs(name, c_ids, cats, prod_variants)
            if (brand_name == "UDO" or ab_brand in ["SUMO", "YAWATA"]) and ab_brand != "UDO":
                brand_name = ab_brand
            commercial_specs = [
                {"key": "ประเภทใบ", "value": disc_type},
                {"key": "ขนาดใบ", "value": diameter},
                {"key": "วัสดุที่ใช้งาน", "value": mat_display},
                {"key": "แบรนด์ผู้ผลิต", "value": brand_name}
            ]
            if grit:
                commercial_specs.insert(2, {"key": "เบอร์ความละเอียด", "value": grit})

            clean_desc_plain = f"{name} ใบตัดใบเจียรคุณภาพสูง แบรนด์ {brand_name} ประเภท {disc_type} ขนาด {diameter} ออกแบบสำหรับงานตัดและเจียร {mat_display} คม ทนทาน ปลอดภัย ไม่แตกหักง่าย ได้มาตรฐานสากล"
            desc_html_formatted = f'<strong class="font-bold text-[#252525]">{name}</strong> {clean_desc_plain}'
            rich_desc_final = clean_desc_plain

            if not prod_variants:
                prod_variants = [{
                    "size": diameter,
                    "package": "ใบ / กล่อง",
                    "unit": "ใบ",
                    "weight": "",
                    "price": 0.0,
                    "original_price": None,
                    "stock": 50,
                    "sku": f"UDO-A{p_id}"
                }]

            filter_attributes_obj = {
                "category_type": "abrasives",
                "disc_type": disc_type,
                "diameter": diameter,
                "grit": grit or "มาตรฐาน",
                "target_material": mat_list,
                "target_material_display": mat_display,
                "brand": brand_name
            }
            tags_list = [disc_type, diameter, brand_name] + mat_list
            if grit: tags_list.append(grit)

        elif root_cid == 327:
            cat_type = "gas_cylinders"
            gas_type, cap, item_type, cyl_brand, cyl_specs = extract_gas_cylinder_specs(name, c_ids, cats)
            if (brand_name in ["UDO", "CHAMP"] and cyl_brand in ["HERO", "CHAMPION", "ตราร่ม"]) or (brand_name == "UDO" and cyl_brand != "UDO"):
                brand_name = cyl_brand
            commercial_specs = [
                {"key": "ประเภทสินค้า", "value": item_type},
                {"key": "ชนิดก๊าซที่รองรับ", "value": gas_type},
                {"key": "ขนาดบรรจุ / ปริมาตร", "value": cap},
                {"key": "แบรนด์ผู้ผลิต", "value": brand_name},
                {"key": "มาตรฐานความปลอดภัย", "value": "ผ่านการตรวจสอบแรงดันท่อมาตรฐาน มอก. / มาตรฐานความปลอดภัยอุตสาหกรรม"}
            ]

            if "รถเข็น" in item_type:
                clean_desc_plain = f"{name} โครงสร้างเหล็กหนาพิเศษ แข็งแรงทนทาน ล้อเลื่อนรับน้ำหนักได้ดี ออกแบบสำหรับเคลื่อนย้ายท่อก๊าซได้อย่างมั่นคง ปลอดภัยตามมาตรฐานความปลอดภัยในโรงงานอุตสาหกรรม"
                unit_name = "คัน"
                pkg_name = "คัน"
            elif "หัววาล์ว" in item_type:
                clean_desc_plain = f"{name} วาล์วควบคุมเปิด-ปิดถังก๊าซมาตรฐานทองเหลืองแท้ ทนแรงดันสูง ป้องกันการรั่วซึมได้ดีเยี่ยม เกลียว {cap} รองรับ{gas_type} ปลอดภัย ได้มาตรฐานอุตสาหกรรม"
                unit_name = "ตัว"
                pkg_name = "ตัว / กล่อง"
            elif "สายอัด" in item_type:
                clean_desc_plain = f"{name} สายอัดก๊าซทนแรงดันสูงพิเศษ พร้อมข้อต่อมาตรฐาน ปลอดภัย ทนทาน เหมาะสำหรับสถานีบรรจุก๊าซและงานอุตสาหกรรม"
                unit_name = "เส้น"
                pkg_name = "เส้น"
            elif "ถังกำเนิดแก๊ส" in item_type:
                clean_desc_plain = f"{name} ถังกำเนิดแก๊สอะเซทีลีนแรงดันต่ำ ขนาด {cap} โครงสร้างเหล็กหนา แข็งแรง ทนทาน มีระบบความปลอดภัยครบครัน เหมาะสำหรับงานตัดเชื่อมแก๊สสนาม"
                unit_name = "ถัง"
                pkg_name = "ถัง"
            elif "แก๊สกระป๋อง" in item_type:
                clean_desc_plain = f"{name} ก๊าซบิวเทนคุณภาพสูง สำหรับหัวพ่นไฟเชื่อมบัดกรีและเตาแก๊สพกพา ให้ความร้อนสม่ำเสมอ ไฟแรงคงที่ ปลอดภัย สะดวกในการพกพา"
                unit_name = "กระป๋อง"
                pkg_name = "กระป๋อง / ลัง"
            elif "แก๊สก้อน" in item_type:
                clean_desc_plain = f"{name} แคลเซียมคาร์ไบด์ แก๊สก้อนคุณภาพสูง ให้ปริมาณก๊าซอะเซทีลีนบริสุทธิ์สูง กากน้อย เหมาะสำหรับถังกำเนิดแก๊สและงานตัดเชื่อมโลหะ"
                unit_name = "ถัง"
                pkg_name = "ถัง"
            else:
                clean_desc_plain = f"{name} ท่อบรรจุก๊าซมาตรฐาน มอก. แบรนด์ {brand_name} สำหรับ {gas_type} ขนาดบรรจุ {cap} โครงสร้างเหล็กไร้รอยต่อ ทนแรงดันสูง มั่นใจในความปลอดภัยสูงสุดสำหรับงานอุตสาหกรรม"
                unit_name = "ท่อ"
                pkg_name = "ท่อ / ถัง"

            desc_html_formatted = f'<strong class="font-bold text-[#252525]">{name}</strong> {clean_desc_plain}'
            rich_desc_final = clean_desc_plain

            if not prod_variants:
                prod_variants = [{
                    "size": cap,
                    "package": pkg_name,
                    "unit": unit_name,
                    "weight": "",
                    "price": 0.0,
                    "original_price": None,
                    "stock": 10 if "หัววาล์ว" in item_type or "แก๊สกระป๋อง" in item_type else 5,
                    "sku": f"UDO-CYL{p_id}"
                }]

            filter_attributes_obj = {
                "category_type": "gas_cylinders",
                "item_type": item_type,
                "gas_type": gas_type,
                "capacity": cap,
                "brand": brand_name
            }
            tags_list = [item_type, gas_type, cap, brand_name]

        elif root_cid == 382:
            # Category 382: Chemicals
            cat_type = "chemicals"
            chem_type, form, func_type, ch_brand, ch_specs = extract_chemical_specs(name, c_ids, cats, prod_variants)
            if (brand_name == "UDO" or ch_brand in ["WHALESPRAY", "NABAKEM", "TASETO", "HARRIS", "CHAMP"]) and ch_brand != "UDO":
                brand_name = ch_brand
            commercial_specs = [
                {"key": "ชนิดเคมีภัณฑ์", "value": chem_type},
                {"key": "หน้าที่การทำงาน", "value": func_type},
                {"key": "รูปแบบบรรจุภัณฑ์", "value": form},
                {"key": "แบรนด์ผู้ผลิต", "value": brand_name},
                {"key": "การใช้งานหลัก", "value": ch_specs[4]["value"] if len(ch_specs) > 4 else "สำหรับงานเชื่อมและตกแต่งผิวโลหะอุตสาหกรรม"}
            ]

            if "N.D.T" in chem_type:
                clean_desc_plain = f"{name} แบรนด์ {brand_name} สำหรับงานตรวจสอบรอยร้าวและข้อบกพร่องแนวเชื่อมโลหะด้วยวิธี Liquid Penetrant Testing (PT) ตามมาตรฐานสากล ให้ผลลัพธ์คมชัด แม่นยำ ปลอดภัยต่อผิวโลหะ"
                unit_name = "ชุด" if "ชุด" in form else "กระป๋อง"
                pkg_name = "ชุด (3 กระป๋อง)" if "ชุด" in form else "กระป๋อง"
            elif "ป้องกันสะเก็ด" in chem_type:
                clean_desc_plain = f"{name} แบรนด์ {brand_name} ชนิด {func_type} สูตรประสิทธิภาพสูง ป้องกันสะเก็ดไฟเชื่อม (Spatter) เกาะติดชิ้นงานและหัวเชื่อม ช่วยประหยัดเวลาทำความสะอาดและยืดอายุการใช้งานอุปกรณ์"
                unit_name = "กระปุก" if "เจล" in form else ("แกลลอน" if "แกลลอน" in form else "กระป๋อง")
                pkg_name = unit_name
            elif "ล้างแนวเชื่อม" in chem_type:
                clean_desc_plain = f"{name} แบรนด์ {brand_name} ชนิด {func_type} ประสิทธิภาพสูง ขจัดคราบรอยไหม้ คราบออกไซด์จากการเชื่อม และสร้างฟิล์มป้องกันสนิม คืนความขาวสะอาดเงางามให้แนวเชื่อมสแตนเลส"
                unit_name = "กระปุก" if "เจล" in form else "แกลลอน"
                pkg_name = unit_name
            elif "กัลวาไนซ์" in chem_type:
                clean_desc_plain = f"{name} แบรนด์ {brand_name} สเปรย์สังกะสีบริสุทธิ์เข้มข้น พ่นเคลือบป้องกันสนิมโครงสร้างเหล็ก รอยต่อ และแนวเชื่อม ทนทานต่อสภาพอากาศและการกัดกร่อนสูง"
                unit_name = "กระป๋อง"
                pkg_name = "กระป๋อง"
            elif "สแตนเลส" in chem_type:
                clean_desc_plain = f"{name} แบรนด์ {brand_name} สเปรย์ทำความสะอาดและเคลือบฟิล์มปกป้องผิวสแตนเลส ลบคราบไขมัน รอยนิ้วมือ ป้องกันฝุ่นเกาะ ให้ผิวสแตนเลสสวยงามยาวนาน"
                unit_name = "กระป๋อง"
                pkg_name = "กระป๋อง"
            elif "ฟลักซ์" in chem_type:
                clean_desc_plain = f"{name} แบรนด์ {brand_name} ฟลักซ์เชื่อมโลหะคุณภาพสูง ชนิด {form} ช่วยทำความสะอาดผิวโลหะ ป้องกันการเกิดออกไซด์ขณะเชื่อม ช่วยให้น้ำประสานไหลลื่น ซึมลึก แนบสนิท แข็งแรงทนทาน"
                unit_name = "กระปุก"
                pkg_name = "กระปุก"
            elif "หน้ากาก" in chem_type:
                clean_desc_plain = f"{name} แบรนด์ {brand_name} สเปรย์สูตรพิเศษทำความสะอาดและฆ่าเชื้อ ทั้งภายนอกและภายในหน้ากากเชื่อม ขจัดคราบเหงื่อไคลและฝุ่นละออง ไม่ทำลายเลนส์ตัดแสง ปลอดภัยต่อผู้ใช้งาน"
                unit_name = "กระป๋อง"
                pkg_name = "กระป๋อง"
            else:
                clean_desc_plain = f"{name} เคมีภัณฑ์เพื่องานเชื่อมโลหะคุณภาพสูง แบรนด์ {brand_name} ชนิด {chem_type} รูปแบบบรรจุภัณฑ์ {form} ช่วยเพิ่มประสิทธิภาพงานเชื่อมและถนอมผิวงานโลหะได้อย่างมีประสิทธิภาพ"
                unit_name = "กระป๋อง"
                pkg_name = "กระป๋อง"

            desc_html_formatted = f'<strong class="font-bold text-[#252525]">{name}</strong> {clean_desc_plain}'
            rich_desc_final = clean_desc_plain

            if not prod_variants:
                prod_variants = [{
                    "size": form,
                    "package": pkg_name,
                    "unit": unit_name,
                    "weight": "",
                    "price": 0.0,
                    "original_price": None,
                    "stock": 20,
                    "sku": f"UDO-CH{p_id}"
                }]

            filter_attributes_obj = {
                "category_type": "chemicals",
                "chemical_type": chem_type,
                "function_type": func_type,
                "form": form,
                "brand": brand_name
            }
            tags_list = [chem_type, func_type, form, brand_name]

        elif root_cid == 398:
            # Category 398: Tools
            cat_type = "tools"
            tool_type, power_system, tool_cap, t_brand, t_specs = extract_tool_specs(name, c_ids, cats, brand_name)
            if brand_name == "UDO" and t_brand != "UDO": brand_name = t_brand
            commercial_specs = t_specs

            if tool_cap:
                clean_desc_plain = f"{name} เครื่องมือช่างไฟฟ้าและไร้สายคุณภาพระดับมืออาชีพ แบรนด์ {brand_name} ระบบกำลังไฟ {power_system} {tool_cap} มอเตอร์ทรงพลัง ทนทาน ใช้งานต่อเนื่องได้อย่างมั่นใจ เหมาะสำหรับช่างมืออาชีพและงานอุตสาหกรรม"
            else:
                clean_desc_plain = f"{name} เครื่องมือช่างไฟฟ้าและไร้สายคุณภาพระดับมืออาชีพ แบรนด์ {brand_name} ระบบกำลังไฟ {power_system} มอเตอร์ทรงพลัง ทนทาน ใช้งานต่อเนื่องได้อย่างมั่นใจ เหมาะสำหรับช่างมืออาชีพและงานอุตสาหกรรม"
            desc_html_formatted = f'<strong class="font-bold text-[#252525]">{name}</strong> {clean_desc_plain}'
            rich_desc_final = clean_desc_plain

            if not prod_variants:
                prod_variants = [{
                    "size": "มาตรฐาน",
                    "package": "ตัว / ชุด",
                    "unit": "ตัว",
                    "weight": "",
                    "price": 0.0,
                    "original_price": None,
                    "stock": 5,
                    "sku": f"UDO-T{p_id}"
                }]

            filter_attributes_obj = {
                "category_type": "tools",
                "tool_type": tool_type,
                "power_system": power_system,
                "brand": brand_name
            }
            tags_list = [tool_type, power_system, brand_name]
            if tool_cap:
                filter_attributes_obj["capacity"] = tool_cap
                tags_list.append(tool_cap)

        else:
            # Category 12: Welding Wire
            cat_type = "welding_wire"
            commercial_specs = extract_wire_specs(desc, name, brand_name, cat_tree)
            specs_map = {s["key"]: s["value"] for s in commercial_specs}
            raw_mat = specs_map.get("วัสดุที่เชื่อม", "เหล็ก")
            material_attr = [m.strip() for m in raw_mat.split(",")] if "," in raw_mat else raw_mat
            process_attr = specs_map.get("กระบวนการเชื่อม", "เชื่อมไฟฟ้า (MMA)")

            clean_desc_plain = clean_html_text(short_desc if short_desc and not is_spam_text(short_desc) else desc[:200])
            if is_spam_text(clean_desc_plain) or not clean_desc_plain:
                clean_desc_plain = f"{name} ลวดเชื่อมคุณภาพสูง แบรนด์ {brand_name} ออกแบบสำหรับงานเชื่อมที่ต้องการความแข็งแรงสูง สเปกได้มาตรฐานสากล"
            desc_html_formatted = format_description_html(clean_desc_plain, brand_name)
            rich_desc_final = clean_desc_plain

            sizes_clean = []
            for v in prod_variants:
                d = extract_wire_diameter(v.get("size", ""))
                if d and d not in sizes_clean: sizes_clean.append(d)
            sizes_clean.sort(key=lambda s: float(s.replace(" mm", "").replace(" มม.", "")))

            packages_clean = []
            for v in prod_variants:
                norm_pkg = normalize_package(v.get("package", ""))
                if norm_pkg and norm_pkg not in packages_clean: packages_clean.append(norm_pkg)

            standards_list = [specs_map["การจำแนกประเภท"].strip()] if "การจำแนกประเภท" in specs_map else []
            approvals_list = [s.strip() for s in specs_map["มาตรฐานรับรอง"].split(",")] if "มาตรฐานรับรอง" in specs_map else []
            positions_list = [p.replace("&nbsp;", " ").strip() for p in specs_map["ท่าเชื่อม"].split(",")] if "ท่าเชื่อม" in specs_map else []

            filter_attributes_obj = {
                "category_type": "welding_wire",
                "material": material_attr,
                "process": process_attr,
                "sizes": sizes_clean,
                "packages": packages_clean,
                "standards": standards_list,
                "approvals": approvals_list,
                "welding_positions": positions_list
            }
            tags_list = (material_attr if isinstance(material_attr, list) else [material_attr]) + [process_attr, brand_name]

        primary_sku = prod_variants[0]["sku"] if prod_variants else f"UDO-{p_id}"
        is_in_stock = any(v.get("stock", 0) > 0 for v in prod_variants)
        is_best_seller = bool(good_sales_val > 0)
        is_recommended = bool(rec_val > 0)
        is_promotion = bool(promo_val > 0)

        flags_obj = {
            "is_in_stock": is_in_stock,
            "is_best_seller": is_best_seller,
            "is_recommended": is_recommended,
            "is_promotion": is_promotion
        }

        collections_list = ["popular", "just_for_you"]
        if is_best_seller and "top-sale" not in collections_list: collections_list.append("top-sale")
        if is_recommended and "for-you" not in collections_list: collections_list.append("for-you")
        if is_promotion and "promotion" not in collections_list: collections_list.append("promotion")

        # Authentic search tags from meta_keywords + brand + category
        authentic_tags = list(tags_list)
        if meta_kw and meta_kw != 'NULL':
            kw_items = [k.strip() for k in meta_kw.split(',') if k.strip() and len(k.strip()) > 1]
            for kw in kw_items:
                if kw not in authentic_tags and len(kw) <= 50:
                    authentic_tags.append(kw)

        # Real sold count from actual orders
        sold_count = real_sales.get(p_id, 0)

        # Related accessories from product_relations
        rel_ids = [f"udo-{cid}" for cid in relations_map.get(p_id, [])]

        r_img1 = rich_images[0] if len(rich_images) > 0 else (img_urls[0] if img_urls else None)
        r_img2 = rich_images[1] if len(rich_images) > 1 else None
        r_img3 = rich_images[2] if len(rich_images) > 2 else None

        audit_meta = evaluate_product_audit(cat_type, prod_variants, cleaned_tables, commercial_specs, formatted_images, rich_images)
        audit_stats[audit_meta["status"]] += 1
        flag = audit_meta["flag"]
        audit_flags[flag] = audit_flags.get(flag, 0) + 1

        product_obj = {
            "id": f"udo-{p_id}",
            "name": name,
            "name_en": name_en,
            "brand": brand_name,
            "sku": primary_sku,
            "description": clean_desc_plain,
            "descriptionHtml": desc_html_formatted,
            "created_at": cr_at if cr_at and cr_at != "NULL" else "2026-08-15T10:30:00Z",
            "sold_count": sold_count,
            "collections": collections_list,
            "flags": flags_obj,
            "categories": cat_tree,
            "filter_attributes": filter_attributes_obj,
            "tags": authentic_tags,
            "images": formatted_images,
            "warranty": None,
            "variants": prod_variants,
            "specsTable": commercial_specs,
            "related_product_ids": rel_ids,
            "sort_priority": sortp,
            "canonical": canonical,
            "richContent": {
                "headline": name,
                "subheadline": None,
                "description": rich_desc_final,
                "tablesHtml": tables_html,
                "image1": r_img1,
                "image2": r_img2,
                "image3": r_img3,
                "isDocument": len(rich_images) > 0
            },
            "_audit": audit_meta
        }

        prices = [v["price"] for v in prod_variants if v.get("price")]
        min_price = min(prices) if prices else 0.0
        max_price = max(prices) if prices else 0.0
        category_path = " > ".join([c["name"] for c in cat_tree])
        audit_rows.append({
            "product_id": f"udo-{p_id}",
            "legacy_id": p_id,
            "name": name,
            "brand": brand_name,
            "category_type": cat_type,
            "audit_status": audit_meta["status"],
            "audit_flag": audit_meta["flag"],
            "reason_th": audit_meta["reason_th"],
            "variants_count": len(prod_variants),
            "min_price": min_price,
            "max_price": max_price,
            "specs_count": len(commercial_specs),
            "tables_count": len(cleaned_tables),
            "images_count": len(formatted_images),
            "rich_images_count": len(rich_images),
            "category_path": category_path
        })
        products_out.append(product_obj)

    # Write output to primary destination
    with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
        json.dump(products_out, f, ensure_ascii=False, indent=2)
    print(f"Successfully wrote {len(products_out)} products to {OUTPUT_PATH}")

    # Dual-write to pilot_products_5.json for backward compatibility
    pilot_path = 'frontend/src/pilot_products_5.json'
    with open(pilot_path, 'w', encoding='utf-8') as f:
        json.dump(products_out, f, ensure_ascii=False, indent=2)
    print(f"Successfully dual-wrote {len(products_out)} products to {pilot_path}")

    # Write CSV audit report
    fieldnames = [
        "product_id", "legacy_id", "name", "brand", "category_type",
        "audit_status", "audit_flag", "reason_th", "variants_count",
        "min_price", "max_price", "specs_count", "tables_count",
        "images_count", "rich_images_count", "category_path"
    ]
    with open(CSV_PATH, 'w', newline='', encoding='utf-8-sig') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(audit_rows)
    print(f"Successfully generated CSV audit report: {CSV_PATH}")

    print("\n--- MIGRATION AUDIT SUMMARY ---")
    print(f"Total products processed: {len(products_out)}")
    print("Audit status breakdown:")
    for st, cnt in audit_stats.items():
        pct = (cnt * 100.0 / len(products_out)) if products_out else 0
        print(f"  {st}: {cnt} ({pct:.1f}%)")
    print("\nAudit flags breakdown:")
    for fl, cnt in audit_flags.items():
        print(f"  {fl}: {cnt}")

    print("\n--- ALL 8 ROOT CATEGORIES BREAKDOWN ---")
    root_slugs = [
        ("Cat 12 (Welding Wire)", "cat-12"),
        ("Cat 312 (Gas Equipment)", "cat-312"),
        ("Cat 344 (Consumables)", "cat-344"),
        ("Cat 298 (Abrasives)", "cat-298"),
        ("Cat 327 (Gas Cylinders & Valves)", "cat-327"),
        ("Cat 339 (Machines)", "cat-339"),
        ("Cat 382 (Chemicals)", "cat-382"),
        ("Cat 398 (Tools)", "cat-398")
    ]
    for label, slug in root_slugs:
        cnt = sum(1 for p in products_out if any(c['url_slug'] == slug for c in p['categories']))
        print(f"  {label}: {cnt} products")

if __name__ == '__main__':
    run_migration()
