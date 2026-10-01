import re
import json
from collections import Counter

with open('frontend/src/welding_products.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

# Comprehensive AWS Pattern
AWS_PATTERNS = [
    # Explicit AWS label followed by grade
    # e.g. AWS A5.4 E308L-16, AWS A5.1 : E6013, AWS/SFA 5.4 E308L-16, AWS E308L-16
    r'(?:AWS|SFA)\s*(?:/?SFA)?\s*(?:A?[\d\.]+)?\s*[:\-\s/]*\s*([E|B][R|Ni|Cu|Ag]?\d{2,4}[A-Za-z0-9\-]*)',
    # Standalone standard grades in parenthesis: (E6013), (ER70S-6), (E308L-16)
    r'\(([E|B][R|Ni|Cu|Ag]?\d{2,4}[A-Za-z0-9\-]*)\)',
    # Standalone standard grades in text / title
    r'\b(E\d{4,5}(?:-[A-Za-z0-9]+)?)\b', # E6013, E7016, E7018
    r'\b(E\d{3}[A-Za-z]*(?:-\d{2})?)\b', # E308L-16, E309-16, E316L-16
    r'\b(ER\d{3,4}[A-Za-z0-9\-]*)\b',    # ER70S-6, ER308L, ER308LSi, ER4043, ER5356
    r'\b(E\d+T[A-Za-z0-9\-]*)\b',        # E71T-1, E308LT1-1
    r'\b(ENi(?:Fe)?-CI)\b',              # ENi-CI, ENiFe-CI
    r'\b(ERNi[A-Za-z0-9\-]+)\b',         # ERNiCr-3, ERNiCrMo-3
    r'\b(B(?:CuP|Ag)-\d+)\b',            # BCuP-2, BAg-7
]

def clean_aws_grade(raw):
    if not raw: return None
    s = raw.strip()
    # Strip AWS / SFA prefix
    s = re.sub(r'^(?:AWS(?:/SFA)?|SFA)\s*(?:A?[\d\.]+)?\s*[:\-\s/]*', '', s, flags=re.IGNORECASE).strip()
    s = re.sub(r'^[A-Z]+\s*[:/]\s*', '', s).strip()
    # Remove trailing dots, dashes
    s = s.rstrip('.-').strip()
    
    # Must look like a real welding grade
    if re.match(r'^(?:E|ER|ENi|BCuP|BAg)\b', s, re.IGNORECASE) and len(s) >= 4:
        # Standardize capitalization
        # e.g. e308l-16 -> E308L-16, er70s-6 -> ER70S-6
        return s.upper()
    return None

results = []
cleaned_counts = Counter()

for p in products:
    name = p['name']
    desc = p.get('description', '') + ' ' + p.get('descriptionHtml', '')
    
    found_grade = None
    
    # 1. Search in title parentheses e.g. (E308L-16)
    m_paren = re.search(r'\(([A-Za-z0-9\.\-]+)\)', name)
    if m_paren:
        grade = clean_aws_grade(m_paren.group(1))
        if grade:
            found_grade = grade

    # 2. Search in desc for AWS ... pattern
    if not found_grade:
        m_explicit = re.search(r'(?:AWS|SFA)\s*(?:/?SFA)?\s*(?:A?[\d\.]+)?\s*[:\-\s/]*\s*([A-Za-z0-9\.\-]+)', desc, re.IGNORECASE)
        if m_explicit:
            cand = m_explicit.group(1).strip()
            # If cand is just A5.4, look right after it
            if re.match(r'^A?[\d\.]+$', cand):
                m_after = re.search(rf'{re.escape(cand)}\s*[:\-\s]*([A-Za-z0-9\-]+)', desc)
                if m_after:
                    cand = m_after.group(1).strip()
            grade = clean_aws_grade(cand)
            if grade:
                found_grade = grade

    # 3. Search for known grade pattern in name
    if not found_grade:
        for pat in AWS_PATTERNS[2:]:
            m = re.search(pat, name)
            if m:
                grade = clean_aws_grade(m.group(1))
                if grade:
                    found_grade = grade
                    break

    # 4. Search in description
    if not found_grade:
        for pat in AWS_PATTERNS[2:]:
            m = re.search(pat, desc)
            if m:
                grade = clean_aws_grade(m.group(1))
                if grade:
                    found_grade = grade
                    break

    if found_grade:
        cleaned_counts[found_grade] += 1
        results.append((p['id'], name, found_grade))
    else:
        results.append((p['id'], name, None))

print(f"Total products analyzed: {len(products)}")
print(f"Products with clean AWS classification: {len([r for r in results if r[2]])} ({len([r for r in results if r[2]])/len(products)*100:.1f}%)")
print(f"Distinct clean AWS grades: {len(cleaned_counts)}")
print("\nTop 20 Clean AWS Standards:")
for grade, count in cleaned_counts.most_common(20):
    print(f"  - {grade}: {count} products")
