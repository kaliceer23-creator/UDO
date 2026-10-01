import json
import re
from collections import Counter

with open('frontend/src/welding_products.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

def extract_clean_aws(name, desc_html):
    # Valid welding standard grade pattern
    # E.g.: E6013, E7016, E7018, ER70S-6, E308L-16, ER308L, ENi-CI, ENiFe-CI, ERNiCr-3, E71T-1, BCuP-2, RBCuZn-C, etc.
    grade_pattern = r'^(?:E|ER|ENi|ECo|ERCo|BCu|RBCu|BAg|R)[\w\-]+$'
    
    # 1. First priority: Title parentheses e.g. "YAWATA FT-51 (E6013)" -> "E6013"
    for m in re.finditer(r'\(([A-Za-z0-9\.\-]+)\)', name):
        cand = m.group(1).strip()
        # Clean prefix if any
        cand = re.sub(r'^(?:AWS(?:/SFA)?|SFA)\s*(?:A?[\d\.]+)?\s*[:\-\s/]*', '', cand, flags=re.I).strip()
        if re.match(grade_pattern, cand, re.I) and len(cand) >= 4:
            return cand.upper()

    # 2. Second priority: AWS / SFA in text followed by Grade
    # E.g. "AWS A5.4 : E308L-16", "AWS A5.1 E6013", "AWS/SFA5.4 E310-16", "AWS E308L-16"
    m_aws_full = re.search(r'(?:AWS|SFA)\s*(?:/?SFA)?\s*(?:A?[\d\.]+)?\s*[:\-\s/]*\s*([E|B|R][A-Za-z0-9\-]{3,15})', desc_html, re.I)
    if m_aws_full:
        cand = m_aws_full.group(1).strip()
        if re.match(grade_pattern, cand, re.I) and len(cand) >= 4:
            return cand.upper()

    # 3. Third priority: Brand / Model specific known standard mappings
    if re.search(r'\b(FT-51|RB-26|KOBE-30|S-13)\b', name):
        return 'E6013'
    if re.search(r'\b(LB-52)\b', name):
        return 'E7016'
    if re.search(r'\b(LB-52U)\b', name):
        return 'E7016'
    if re.search(r'\b(L-55)\b', name):
        return 'E7018'
    if re.search(r'\b(TG-S50|SM-70)\b', name):
        return 'ER70S-6'
    if re.search(r'\b(SUPERWELD)\b', name):
        return 'E6013'
    if re.search(r'\b(G-303)\b', name):
        return 'E6013'
    if re.search(r'\b(TG-S308L)\b', name):
        return 'ER308L'
    if re.search(r'\b(TG-S309L)\b', name):
        return 'ER309L'
    if re.search(r'\b(TG-S316L)\b', name):
        return 'ER316L'
    if re.search(r'\b(SF-71)\b', name):
        return 'E71T-1'

    # 4. Standalone grade in title
    m_title_grade = re.search(r'\b(E\d{4}|E\d{3}[A-Za-z]*(?:-\d{2})?|ER\d{3,4}[A-Za-z0-9\-]*|E\d+T[A-Za-z0-9\-]*|ENi[A-Za-z0-9\-]+)\b', name)
    if m_title_grade:
        cand = m_title_grade.group(1).strip()
        if re.match(grade_pattern, cand, re.I) and len(cand) >= 4:
            return cand.upper()

    return None

results = []
counter = Counter()

for p in products:
    name = p['name']
    desc = p.get('description', '') + ' ' + p.get('descriptionHtml', '')
    grade = extract_clean_aws(name, desc)
    if grade:
        counter[grade] += 1
        results.append((p['id'], name, grade))
    else:
        results.append((p['id'], name, None))

matched = [r for r in results if r[2]]
print(f"Products with clean AWS Standard: {len(matched)} / {len(products)} ({len(matched)/len(products)*100:.1f}%)")
print(f"Distinct clean AWS Standards: {len(counter)}")
print("\nTop 30 Clean AWS Standards:")
for grade, count in counter.most_common(30):
    print(f"  - {grade}: {count} products")
