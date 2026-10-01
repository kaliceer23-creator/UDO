import json
import re

with open('frontend/src/welding_products.json', 'r', encoding='utf-8') as f:
    prods = json.load(f)

chems = [p for p in prods if p.get('filter_attributes', {}).get('category_type') == 'chemicals' or any(c.get('url_slug') == 'cat-382' for c in p.get('categories', []))]

def refine_chemical(p):
    name = p['name']
    name_upper = name.upper()
    sku = p.get('sku', '')
    sku_upper = sku.upper()
    variants = p.get('variants', [])
    v_sizes = [v.get('size', '') for v in variants]
    v_str = " ".join(v_sizes).upper()

    # 1. Brand Detection
    brand = p['brand']
    if brand == "UDO" or not brand:
        if "WHWS" in sku_upper or "WHCRACKS" in sku_upper or "WHALESPRAY" in name_upper:
            brand = "WHALESPRAY"
        elif "NABAKEM" in name_upper or "NBK" in sku_upper:
            brand = "NABAKEM"
        elif "TASETO" in name_upper or "TST" in sku_upper:
            brand = "TASETO"
        elif "HARRIS" in name_upper or "FLUX" in sku_upper:
            brand = "HARRIS"
        elif "CHAMP" in name_upper or "CHNO" in sku_upper:
            brand = "CHAMP"

    # 2. Chemical Type (ประเภทเคมีภัณฑ์)
    if any(k in name_upper for k in ["กัลวาไนซ์", "ZINCOT", "สังกะสี"]):
        chem_type = "สเปรย์กัลวาไนซ์เคลือบกันสนิม (Cold Galvanize Spray)"
        target_work = "งานพ่นเคลือบกัลวาไนซ์ป้องกันสนิมโครงสร้างเหล็กและแนวเชื่อม"
    elif any(k in name_upper for k in ["หน้ากาก"]):
        chem_type = "สเปรย์ทำความสะอาดหน้ากากเชื่อม (Welding Mask Cleaner)"
        target_work = "ทำความสะอาดและดูแลรักษาหน้ากากเชื่อม ทั้งภายนอกและภายใน"
    elif any(k in name_upper for k in ["SUS CARE", "สเปรย์ด้าน", "สเปรย์ขัดเคลือบ"]):
        chem_type = "สเปรย์ทำความสะอาดและเคลือบผิวสแตนเลส (Stainless Care)"
        target_work = "ทำความสะอาด ขัดเงา และเคลือบฟิล์มปกป้องผิวสแตนเลสจากคราบและรอยนิ้วมือ"
    elif any(k in name_upper for k in ["SR-600", "3610G", "ล้างแนวเชื่อม", "ทำความสะอาดรอยเชื่อมสเตนเลส", "ทำความสะอาดแนวเชื่อมสแตนเลส"]):
        chem_type = "น้ำยาล้างแนวเชื่อมสแตนเลส (Pickling & Passivation)"
        target_work = "ล้างคราบรอยไหม้ คราบออกไซด์ และฟื้นฟูฟิล์มป้องกันสนิมบนแนวเชื่อมสแตนเลส"
    elif any(k in name_upper for k in ["ผงประสาน", "น้ำยาประสาน", "STAY-SILV", "AL-BRAZE", "NO.77"]):
        chem_type = "น้ำยาประสานและฟลักซ์เชื่อม (Welding Flux)"
        target_work = "ช่วยประสานรอยต่อโลหะ กำจัดออกไซด์ และให้น้ำเชื่อมไหลลื่นสม่ำเสมอ"
    elif any(k in name_upper for k in ["N.D.T", "NDT", "ตรวจเช็คแนวเชื่อม", "ตรวจสอบแนวเชื่อม", "COLOR CHECK", "MEGA CHECK", "PT CHECK", "PENETRANT", "DEVELOPER", "REMOVER"]):
        chem_type = "น้ำยาตรวจสอบแนวเชื่อม (N.D.T. Crack Checker)"
        target_work = "ตรวจสอบรอยร้าว รูพรุน และข้อบกพร่องของแนวเชื่อมด้วยวิธี Liquid Penetrant Testing (PT)"
    elif any(k in name_upper for k in ["ป้องกันสะเก็ด", "SPAZERO", "W-540", "NOZZLE CREAM", "NZ-400", "1800G", "1800S", "1801G", "1801S", "1805"]):
        chem_type = "น้ำยาป้องกันสะเก็ดไฟเชื่อม (Anti-Spatter)"
        target_work = "ป้องกันสะเก็ดไฟเชื่อม (Spatter) เกาะติดชิ้นงาน หัวเชื่อม และปลาย Nozzle"
    else:
        chem_type = "เคมีภัณฑ์งานเชื่อมทั่วไป"
        target_work = "สำหรับงานเชื่อมและตกแต่งผิวโลหะอุตสาหกรรม"

    # 3. Packaging Form (รูปแบบบรรจุภัณฑ์)
    if "ชุด" in name or any("ชุด" in s for s in v_sizes):
        form = "ชุดเซ็ตครบชุด (Set 3 กระป๋อง)"
    elif any(k in name for k in ["ชนิดผง", "ผงประสาน"]) or "ผง" in v_str:
        form = "ชนิดผง (Powder)"
    elif any(k in name for k in ["เจล", "ครีม", "PASTE", "CREAM"]) or any(k in v_str for k in ["กระปุก"]):
        form = "เจล / ครีมทา (Paste / Gel)"
    elif any(k in name for k in ["แกลลอน", "ถัง"]) or any(k in v_str for k in ["แกลลอน", "ลิตร", "20 กก", "25 ลิตร", "18 ลิตร", "5 ลิตร"]):
        form = "ถัง / แกลลอน (Liquid)"
    else:
        form = "สเปรย์กระป๋อง (Aerosol Spray)"

    # 4. Function / Stage (ฟังก์ชันการทำงานเฉพาะทาง)
    if chem_type == "น้ำยาตรวจสอบแนวเชื่อม (N.D.T. Crack Checker)":
        if form == "ชุดเซ็ตครบชุด (Set 3 กระป๋อง)":
            ndt_func = "ชุดตรวจเช็คครบชุด (Set 3 กระป๋อง)"
        elif any(k in name_upper for k in ["PENETRANT", "แทรกซึม", "1821S"]):
            ndt_func = "น้ำยาแทรกซึมสีแดง (Penetrant)"
        elif any(k in name_upper for k in ["DEVELOPER", "เร่งปฏิกริยา", "1820S"]):
            ndt_func = "น้ำยาแสดงผลรอยร้าวสีขาว (Developer)"
        elif any(k in name_upper for k in ["REMOVER", "CLEANER", "ทำความสะอาด", "3050S"]):
            ndt_func = "น้ำยาทำความสะอาดพื้นผิว (Cleaner / Remover)"
        else:
            ndt_func = "น้ำยาตรวจเช็คแนวเชื่อม"
    elif chem_type == "น้ำยาป้องกันสะเก็ดไฟเชื่อม (Anti-Spatter)":
        if form == "เจล / ครีมทา (Paste / Gel)":
            ndt_func = "เจลจุ่มหัวเชื่อมป้องกันสะเก็ด (Nozzle Dip Gel)"
        elif form == "ถัง / แกลลอน (Liquid)":
            ndt_func = "น้ำยาป้องกันสะเก็ดชนิดน้ำ (Liquid Gallon)"
        else:
            ndt_func = "สเปรย์ป้องกันสะเก็ด (Aerosol Spray)"
    elif chem_type == "น้ำยาประสานและฟลักซ์เชื่อม (Welding Flux)":
        if "ทองเหลือง" in name:
            ndt_func = "ฟลักซ์เชื่อมทองเหลือง (Brass Flux)"
        elif "อลูมิเนียม" in name:
            ndt_func = "ฟลักซ์เชื่อมอัลลูมิเนียม (Aluminum Flux)"
        elif "เงิน" in name:
            ndt_func = "ฟลักซ์เชื่อมเงิน (Silver Brazing Flux)"
        else:
            ndt_func = "ฟลักซ์เชื่อมโลหะ"
    else:
        ndt_func = chem_type.split(' (')[0]

    return brand, chem_type, form, ndt_func, target_work

print(f"{'No.':<3} | {'Brand':<10} | {'Form':<28} | {'Function':<35} | {'Product Name'}")
print("-" * 115)
for i, p in enumerate(chems, 1):
    brand, ctype, form, func, tw = refine_chemical(p)
    print(f"{i:02d}  | {brand:<10} | {form:<28} | {func:<35} | {p['name']}")
