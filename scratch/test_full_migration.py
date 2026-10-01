import re
import json
import html
import csv

SQL_PATH = 'udothai_shop.sql'
OUTPUT_PATH = 'scratch/test_products_778.json'

def load_database():
    with open(SQL_PATH, 'r', encoding='utf-8', errors='ignore') as f:
        return f.read()

def clean_html_text(text):
    if not text:
        return ""
    text = re.sub(r'</?(?:p|div|br|tr|td|th|h[1-6]|li|ul|ol)[^>]*>', ' ', text)
    text = re.sub(r'<[^>]+>', '', text)
    text = html.unescape(text)
    text = text.replace('\xa0', ' ').replace('&nbsp;', ' ').replace('&bull;', '•')
    text = text.replace('ต่า', 'ต่ำ').replace('สาหรับ', 'สำหรับ')
    text = re.sub(r'[ \t]+', ' ', text).strip()
    return text

def is_spam_text(text):
    if not text:
        return False
    lower = text.lower()
    return any(b in lower for b in ['http:', 'https:', '.com', 'bitcoin', 'dating', 'viagra', 'pills', 'casino', 'money', 'sex', 'porn', 'buy cheap', '@'])

def clean_engineering_table(tbl_html):
    tbl = tbl_html.replace('\\"', '"').replace('\\r\\n', '\n').replace('\\n', '\n')
    tbl = re.sub(r'<\s*table[^>]*>', '<table class="engineering-table w-full text-left border-collapse text-[13.5px]">', tbl)
    tbl = re.sub(r'\s+(?:class|style|border|width|cellspacing|cellpadding)="[^"]*"', '', tbl)
    tbl = tbl.replace('<table', '<table class="engineering-table w-full text-left border-collapse text-[13.5px]"', 1)
    tbl = tbl.replace('&plusmn;', '±').replace('&Oslash;', 'Ø').replace('&nbsp;', ' ')
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
  <div class="overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-sm">
    {tbl}
  </div>
</div>'''
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

def extract_machine_specs(name, cat_ids):
    # Process
    process = "เชื่อมไฟฟ้า (MMA)"
    if 340 in cat_ids: process = "เชื่อมไฟฟ้า (MMA)"
    elif 341 in cat_ids: process = "เชื่อมอาร์กอน (TIG)"
    elif 342 in cat_ids: process = "เชื่อมมิก (MIG/MAG)"
    elif 343 in cat_ids: process = "ตัดพลาสม่า (PLASMA)"
    else:
        if "TIG" in name.upper() or "อาร์กอน" in name: process = "เชื่อมอาร์กอน (TIG)"
        elif "MIG" in name.upper() or "มิก" in name or "CO2" in name.upper(): process = "เชื่อมมิก (MIG/MAG)"
        elif "PLASMA" in name.upper() or "CUT" in name.upper() or "ตัด" in name: process = "ตัดพลาสม่า (PLASMA)"
        else: process = "เชื่อมไฟฟ้า (MMA)"

    # Voltage
    if re.search(r'\b380\s*V\b|380V|3\s*เฟส|3\s*Phase', name, re.I):
        voltage = "3 เฟส 380V"
    elif re.search(r'\b220\s*V\b|220V|1\s*เฟส|1\s*Phase', name, re.I):
        voltage = "1 เฟส 220V"
    else:
        m_amp = re.search(r'(\d+)\s*(?:Amp|แอมป์|A\b)', name, re.I)
        if m_amp:
            amp_val = int(m_amp.group(1))
            voltage = "3 เฟส 380V" if amp_val >= 350 else "1 เฟส 220V"
        elif any(k in name for k in ["350", "400", "500", "150"]):
            voltage = "3 เฟส 380V"
        else:
            voltage = "1 เฟส 220V"

    # Amperage
    amperage = "200A"
    m_amp = re.search(r'(\d+)\s*(?:Amp|แอมป์)', name, re.I)
    if m_amp:
        amperage = f"{m_amp.group(1)}A"
    else:
        m_model = re.search(r'(?:STICK|FINEWEL|PONY|NICE|MIG|CUT|LGK|PLASMA|AUTO|HG|Power|HyPLA)[^\d]*(\d{2,4})', name, re.I)
        if m_model:
            num = int(m_model.group(1))
            if num in [40, 50, 55, 60, 70, 80, 100, 120, 140, 150, 160, 200, 250, 300, 350, 400, 500]:
                amperage = f"{num}A"
            elif num == 2160: amperage = "160A"
            elif num in [2200, 2200]: amperage = "200A"
            elif num == 2300: amperage = "300A"
            elif num == 40: amperage = "40A"
            elif num == 150: amperage = "150A"
            elif num == 350: amperage = "350A"
            elif num == 500: amperage = "500A"

    # Brand
    brand = "UDO"
    if "AUTOWEL" in name.upper(): brand = "AUTOWEL"
    elif "HYUNDAI" in name.upper(): brand = "HYUNDAI"
    elif "KENZO" in name.upper(): brand = "KENZO"

    specs = [
        {"key": "ประเภทเครื่อง", "value": process},
        {"key": "แรงดันไฟฟ้าเข้า", "value": voltage},
        {"key": "กระแสไฟเชื่อมสูงสุด", "value": amperage},
        {"key": "ระบบการทำงาน", "value": "Inverter IGBT เทคโนโลยีประหยัดพลังงาน"},
        {"key": "การรับประกัน", "value": "รับประกันตัวเครื่อง 1 ปี ตามเงื่อนไขผู้ผลิต"}
    ]

    return process, voltage, amperage, brand, specs

def extract_consumable_specs(name, cat_ids, cats_dict, get_desc_fn):
    # System / Torch Category
    system = "อะไหล่อื่นๆ"
    if 345 in cat_ids or any(c in cat_ids for c in get_desc_fn(345)):
        system = "อะไหล่อาร์กอน (TIG)"
    elif 353 in cat_ids or any(c in cat_ids for c in get_desc_fn(353)):
        system = "อะไหล่ซีโอทู (MIG)"
    elif 362 in cat_ids or any(c in cat_ids for c in get_desc_fn(362)):
        system = "อะไหล่พลาสม่า (PLASMA)"
    elif 389 in cat_ids or any(c in cat_ids for c in get_desc_fn(389)):
        system = "อุปกรณ์เซฟตี้"
    elif 380 in cat_ids or any(c in cat_ids for c in get_desc_fn(380)):
        system = "อุปกรณ์และอะไหล่อื่นๆ"

    # Part Type mapping from subcategories and product title
    part_type_map = {
        347: 'หางปลาจับลวด (Back Cap)',
        348: 'ถ้วยเซรามิค (Alumina Nozzle)',
        349: 'สลิปใน / จำปา (Collet)',
        350: 'สลิปนอก / แกนจับ (Collet Body)',
        351: 'ด้ามเชื่อม (Torch Body)',
        352: 'ชุดสายเชื่อม (TIG Torch)',
        355: 'คอนแท็คทิป (Contact Tip)',
        356: 'แก๊สดิสฟิวเซอร์ (Gas Diffuser)',
        357: 'หัวฉีด / นมหนู (Nozzle)',
        358: 'คอด้ามเชื่อม (Torch Neck)',
        359: 'แกนจับหัวทิป (Tip Holder)',
        360: 'อินซูเรเตอร์ (Insulator)',
        361: 'ชุดสายเชื่อม (MIG Torch)',
        364: 'ชิลด์คัพ (Shield Cup)',
        365: 'อีเล็คโทรด (Electrode)',
        366: 'หัวทิป / นมหนูตัด (Tip)',
        367: 'แก๊สดิสฟิวเซอร์ (Gas Diffuser)',
        368: 'ด้ามตัด (Torch Head)',
        369: 'ชุดสายตัด (Plasma Torch)',
        389: 'อุปกรณ์เซฟตี้ (Safety)',
        346: 'อะไหล่และอุปกรณ์เสริม (Accessories)',
        354: 'อะไหล่และอุปกรณ์เสริม (Accessories)',
        363: 'อะไหล่และอุปกรณ์เสริม (Accessories)',
        380: 'อุปกรณ์และอะไหล่อื่นๆ'
    }

    part_type = None
    for cid in cat_ids:
        if cid in part_type_map:
            part_type = part_type_map[cid]
            break

    if not part_type or part_type == 'อุปกรณ์และอะไหล่อื่นๆ':
        if any(k in name for k in ["ถ้วยเซรามิก", "ถ้วยเซรามิค", "ALUMINA NOZZLE", "น๊อตเซิล", "NOZZLE", "Nozzle", "ชิลด์คัพ", "SHIELD CUP", "หัวฉีด"]):
            part_type = "หัวฉีด / นมหนู (Nozzle)"
        elif any(k in name for k in ["คอนแท็คทิป", "คอนแทคทิพ", "CONTACT TIP", "หัวทิป", "TIP", "Tip"]):
            part_type = "คอนแท็คทิป (Contact Tip)"
        elif any(k in name for k in ["สลิปใน", "COLLET"]) and "BODY" not in name.upper():
            part_type = "สลิปใน / จำปา (Collet)"
        elif any(k in name for k in ["สลิปนอก", "COLLET BODY", "แกนจับหัวทิป", "TIP HOLDER"]):
            part_type = "สลิปนอก / แกนจับ (Collet Body)"
        elif any(k in name for k in ["แก๊สดิสฟิวเซอร์", "GAS DIFFUSER", "กระจายแก๊ส"]):
            part_type = "แก๊สดิสฟิวเซอร์ (Gas Diffuser)"
        elif any(k in name for k in ["อีเล็คโทรด", "ELECTRODE", "อิเล็กโทรด"]):
            part_type = "อีเล็คโทรด (Electrode)"
        elif any(k in name for k in ["BACK CAP", "หางปลาจับลวด", "ฝาครอบท้าย"]):
            part_type = "หางปลาจับลวด (Back Cap)"
        elif any(k in name for k in ["ด้ามเชื่อม", "ด้ามตัด", "TORCH BODY", "Torch Head", "คอด้ามเชื่อม"]):
            part_type = "ด้ามเชื่อม (Torch Body)"
        elif any(k in name for k in ["ปืนเชื่อม", "ปืนตัด", "พร้อมสาย"]):
            part_type = "ชุดสายเชื่อม / ตัดพร้อมสาย"
        elif any(k in name for k in ["อินซูเรเตอร์", "INSULATOR", "ฉนวน"]):
            part_type = "อินซูเรเตอร์ (Insulator)"
        elif any(k in name for k in ["แว่นตา", "ถุงมือ", "หน้ากาก", "เอี๊ยม", "ปลอกแขน", "รองเท้า"]):
            part_type = "อุปกรณ์เซฟตี้ (Safety)"
        else:
            part_type = "อะไหล่และอุปกรณ์เสริม (Accessories)"

    # Torch Series / Model
    series = []
    if re.search(r'\b(WP-?9|WP-?20|WP-?25)\b', name, re.I): series.append("WP-9 / WP-20 / WP-25")
    if re.search(r'\b(WP-?17|WP-?18|WP-?26)\b', name, re.I): series.append("WP-17 / WP-18 / WP-26")
    if re.search(r'\b(SINTIG\s*(?:17|20|26))\b', name, re.I): series.append("TRAFIMET SINTIG")
    if re.search(r'\b(MB-?15|MB-?15AK|15AK)\b', name, re.I): series.append("MB-15AK")
    if re.search(r'\b(MB-?24|MB-?24KD|24KD)\b', name, re.I): series.append("MB-24KD")
    if re.search(r'\b(MB-?36|MB-?36KD|36KD)\b', name, re.I): series.append("MB-36KD")
    if re.search(r'\b(MB-?501|MB-?501D)\b', name, re.I): series.append("MB-501D")
    if re.search(r'\b(PANASONIC|PANA)\b', name, re.I): series.append("Panasonic Type")
    if re.search(r'\b(OTC|DAIHEN)\b', name, re.I): series.append("OTC / Daihen Type")
    if re.search(r'\b(ERGOPLUS|CINA)\b', name, re.I): series.append("TRAFIMET ERGOPLUS")
    if re.search(r'\b(P-?80|P80)\b', name, re.I): series.append("P-80")
    if re.search(r'\b(PT-?31|PT31)\b', name, re.I): series.append("PT-31")
    if re.search(r'\b(SG-?51|SG51)\b', name, re.I): series.append("SG-51")
    if re.search(r'\b(AG-?60|AG60)\b', name, re.I): series.append("AG-60")
    if re.search(r'\b(A-?101|A101)\b', name, re.I): series.append("TRAFIMET A101")
    if re.search(r'\b(A-?141|A141)\b', name, re.I): series.append("TRAFIMET A141")
    if re.search(r'\b(ERGOCUT|AUTOCUT)\b', name, re.I): series.append("TRAFIMET ERGOCUT")

    if not series:
        if system == "อะไหล่อาร์กอน (TIG)": series.append("TIG ทั่วไป")
        elif system == "อะไหล่ซีโอทู (MIG)": series.append("MIG ทั่วไป")
        elif system == "อะไหล่พลาสม่า (PLASMA)": series.append("PLASMA ทั่วไป")
        elif system == "อุปกรณ์เซฟตี้": series.append("เซฟตี้")
        else: series.append("มาตรฐานทั่วไป")

    # Brand
    brand = "UDO"
    if "TRAFIMET" in name.upper(): brand = "TRAFIMET"
    elif "PANASONIC" in name.upper(): brand = "PANASONIC"
    elif "OTC" in name.upper(): brand = "OTC"
    elif "BINZEL" in name.upper(): brand = "ABICOR BINZEL"

    specs = [
        {"key": "ระบบงาน", "value": system},
        {"key": "ประเภทอะไหล่", "value": part_type},
        {"key": "รุ่นหัวเชื่อม / หัวตัดที่รองรับ", "value": ", ".join(series)},
        {"key": "แบรนด์ผู้ผลิต", "value": brand}
    ]

    return system, part_type, series, brand, specs

def run_test():
    print("Reading SQL database...")
    sql_text = load_database()

    # 1. Parse Brands
    bands = {}
    m_bands = re.search(r"INSERT INTO `bands` VALUES (.*?);", sql_text, re.DOTALL)
    if m_bands:
        for m in re.finditer(r"\(([0-9]+),\s*'([^']*)'", m_bands.group(1)):
            bands[int(m.group(1))] = m.group(2)

    # 2. Parse Units
    units = {}
    m_u = re.search(r"INSERT INTO `units` VALUES (.*?);", sql_text, re.DOTALL)
    if m_u:
        for m in re.finditer(r"\(([0-9]+),\s*'([^']*)'", m_u.group(1)):
            units[int(m.group(1))] = m.group(2)

    # 3. Parse Categories
    cats = {}
    for line in sql_text.split('\n'):
        if line.startswith("INSERT INTO `categories_product`"):
            for m in re.finditer(r"\(([0-9]+),\s*'([^']*)',\s*[^,]+,\s*[^,]+,\s*([0-9]+|NULL)", line):
                cid = int(m.group(1))
                cname = m.group(2)
                cparent = int(m.group(3)) if m.group(3) != 'NULL' else None
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

    target_root_cids = [12, 339, 344]
    all_target_cids = set()
    for rid in target_root_cids:
        all_target_cids.update(get_all_descendants(rid))

    prod_cats = {}
    for line in sql_text.split('\n'):
        if line.startswith("INSERT INTO `categoryofproduct`"):
            for m in re.finditer(r"\([0-9]+,\s*([0-9]+),\s*([0-9]+)", line):
                cid = int(m.group(1))
                pid = int(m.group(2))
                if pid not in prod_cats:
                    prod_cats[pid] = set()
                prod_cats[pid].add(cid)

    target_pids = set()
    for pid, cset in prod_cats.items():
        if cset.intersection(all_target_cids):
            target_pids.add(pid)

    print(f"Targeting {len(target_pids)} products across Categories 12, 339, 344...")

    # 4. Parse Variants (items)
    items = {}
    m_items = re.search(r"INSERT INTO `items` VALUES (.*?);", sql_text, re.DOTALL)
    if m_items:
        it_pattern = re.compile(r"\(([0-9]+),\s*([0-9]+),\s*'([^']*)',\s*([0-9\.]+),\s*([^,]+),\s*([0-9]+),\s*([0-9]+),\s*'[^']*',\s*'[^']*',\s*'([^']*)'")
        for m in it_pattern.finditer(m_items.group(1)):
            it_id, prod_id, size, price, discount, stock, unit_id, sku = m.groups()
            prod_id = int(prod_id)
            if prod_id not in items:
                items[prod_id] = []
            
            cleaned_size = re.sub(r"^ขนาด\s*", "", size).strip().rstrip(".")
            if not cleaned_size: cleaned_size = "มาตรฐาน"
            raw_unit = units.get(int(unit_id), "1 ห่อ")
            u_info = parse_unit_info(raw_unit)
            
            items[prod_id].append({
                "size": cleaned_size,
                "package": u_info["label"],
                "unit": u_info["unit"],
                "weight": u_info["weight"],
                "price": float(price),
                "original_price": float(discount) if discount != "NULL" and float(discount) > float(price) else None,
                "stock": int(stock),
                "sku": sku
            })

    products_out = []
    seen_pids = set()

    for line in sql_text.split('\n'):
        if not line.startswith("INSERT INTO `products`"):
            continue
        for pid in target_pids:
            pos = 0
            while True:
                pos = line.find(f"({pid},", pos)
                if pos == -1:
                    break
                end = line.find("),(", pos)
                entry = line[pos:end] if end != -1 else line[pos:line.find(");", pos)]

                m_id_name = re.match(r"\(([0-9]+),\s*'((?:\\'|[^'])*)',\s*(?:'((?:\\'|[^'])*)'|NULL),\s*(?:'(.*?)'|NULL),\s*(?:'([^']*)'|NULL),\s*(?:'([^']*)'|NULL),\s*(?:'([^']*)'|NULL),\s*(?:'([^']*)'|NULL)", entry, re.DOTALL)
                if m_id_name:
                    p_id, name, short_desc, desc, catalog, cr_at, up_at, thumb = m_id_name.groups()
                    desc = desc or ""
                    short_desc = short_desc or ""
                    p_id = int(p_id)
                    if p_id in seen_pids:
                        pos += 1
                        continue
                    seen_pids.add(p_id)

                    m_band = re.search(rf"\({pid},.*?,\s*([0-9]+|NULL),\s*'[^']*',\s*(?:'[^']*'|NULL),\s*[0-9]+", entry, re.DOTALL)
                    band_id = int(m_band.group(1)) if m_band and m_band.group(1) != "NULL" else None
                    brand_name = bands.get(band_id, "UDO") if band_id else "UDO"

                    # Images
                    img_urls = []
                    if thumb and thumb != "NULL":
                        img_urls.append(f"https://www.udo.co.th/storage/{thumb}")
                    m_imgs = re.search(r"(\[\\?\"products[^\]]+\])", entry)
                    if m_imgs:
                        try:
                            raw_json = m_imgs.group(1).replace('\\"', '"').replace('\\/', '/')
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
                    if not is_spam_text(desc):
                        for img_match in re.finditer(r'<img[^>]+src=\\?["\']([^"\'\\]+)', desc):
                            raw_src = img_match.group(1).strip().replace(" ", "%20")
                            if not raw_src.startswith("http"):
                                raw_src = f"https://www.udo.co.th/storage/{raw_src.lstrip('/')}"
                            rich_images.append(raw_src)

                        raw_tables = re.findall(r"(<table.*?</table>)", desc, re.DOTALL)
                        cleaned_tables = [clean_engineering_table(tbl) for tbl in raw_tables if clean_engineering_table(tbl)]
                    tables_html = "\n".join(cleaned_tables) if cleaned_tables else None

                    # Category-specific processing
                    prod_variants = items.get(p_id, [])

                    if root_cid == 339:
                        # Category 339: Machines
                        m_proc, m_volt, m_amp, m_brand, m_specs = extract_machine_specs(name, c_ids)
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
                        c_sys, c_part, c_sers, c_brand, c_specs = extract_consumable_specs(name, c_ids, cats, get_all_descendants)
                        if brand_name == "UDO" and c_brand != "UDO": brand_name = c_brand
                        commercial_specs = c_specs

                        clean_desc_plain = f"{name} ชิ้นส่วนอะไหล่สิ้นเปลืองคุณภาพสูงสำหรับงานเชื่อมและตัดโลหะ ออกแบบตามมาตรฐานอุตสาหกรรม ทนความร้อนสูง ช่วยยืดอายุการใช้งานของหัวเชื่อมและให้ประสิทธิภาพงานเชื่อมที่สม่ำเสมอ"
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

                    else:
                        # Category 12: Welding Wire
                        commercial_specs = extract_wire_specs(desc, name, brand_name, cat_tree)
                        specs_map = {s["key"]: s["value"] for s in commercial_specs}
                        raw_mat = specs_map.get("วัสดุที่เชื่อม", "เหล็ก")
                        material_attr = [m.strip() for m in raw_mat.split(",")] if "," in raw_mat else raw_mat
                        process_attr = specs_map.get("กระบวนการเชื่อม", "เชื่อมไฟฟ้า (MMA)")

                        clean_desc_plain = clean_html_text(short_desc if short_desc and not is_spam_text(short_desc) else desc[:200])
                        if is_spam_text(clean_desc_plain) or not clean_desc_plain:
                            clean_desc_plain = f"{name} ลวดเชื่อมคุณภาพสูง แบรนด์ {brand_name} ออกแบบสำหรับงานเชื่อมที่ต้องการความแข็งแรงสูง สเปกได้มาตรฐานสากล"
                        desc_html_formatted = clean_desc_plain
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

                    flags_obj = {
                        "is_in_stock": is_in_stock,
                        "is_best_seller": False,
                        "is_recommended": False,
                        "is_promotion": False
                    }
                    collections_list = ["popular", "just_for_you"]

                    r_img1 = rich_images[0] if len(rich_images) > 0 else (img_urls[0] if img_urls else None)
                    r_img2 = rich_images[1] if len(rich_images) > 1 else None
                    r_img3 = rich_images[2] if len(rich_images) > 2 else None

                    product_obj = {
                        "id": f"udo-{p_id}",
                        "name": name,
                        "brand": brand_name,
                        "sku": primary_sku,
                        "description": clean_desc_plain,
                        "descriptionHtml": desc_html_formatted,
                        "created_at": cr_at if cr_at and cr_at != "NULL" else "2026-08-15T10:30:00Z",
                        "sold_count": 500 + p_id,
                        "collections": collections_list,
                        "flags": flags_obj,
                        "categories": cat_tree,
                        "filter_attributes": filter_attributes_obj,
                        "tags": tags_list,
                        "images": formatted_images,
                        "warranty": None,
                        "variants": prod_variants,
                        "specsTable": commercial_specs,
                        "richContent": {
                            "headline": name,
                            "subheadline": f"ผลิตภัณฑ์คุณภาพสูง แบรนด์ {brand_name}",
                            "description": rich_desc_final,
                            "tablesHtml": tables_html,
                            "image1": r_img1,
                            "image2": r_img2,
                            "image3": r_img3
                        }
                    }
                    products_out.append(product_obj)
                pos += 1

    print(f"Total products converted: {len(products_out)}")
    with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
        json.dump(products_out, f, ensure_ascii=False, indent=2)
    print(f"Output saved to {OUTPUT_PATH}")

    # Check breakdown
    c12 = sum(1 for p in products_out if any(c['url_slug'] == 'cat-12' for c in p['categories']))
    c339 = sum(1 for p in products_out if any(c['url_slug'] == 'cat-339' for c in p['categories']))
    c344 = sum(1 for p in products_out if any(c['url_slug'] == 'cat-344' for c in p['categories']))
    print(f"Breakdown -> Category 12: {c12}, Category 339: {c339}, Category 344: {c344}")

if __name__ == '__main__':
    run_test()
