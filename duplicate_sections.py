import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

# Find the start and end of Section 2
start_marker = "<!-- Section 2: ขายดีประจำเดือน -->"
end_marker = "<!-- Section 3: Shop by Category -->"

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx == -1 or end_idx == -1:
    print("Could not find markers")
    exit(1)

section_2_content = content[start_idx:end_idx]

# Replace title in duplicated sections
section_new_arrivals = section_2_content.replace(
    '<!-- Section 2: ขายดีประจำเดือน -->', 
    '<!-- Section 2: สินค้าเข้าใหม่ -->'
).replace(
    'ขายดีประจำเดือน',
    'สินค้าเข้าใหม่'
)

section_curated = section_2_content.replace(
    '<!-- Section 2: ขายดีประจำเดือน -->', 
    '<!-- Section 4: คัดมาเพื่อคุณ -->'
).replace(
    'ขายดีประจำเดือน',
    'คัดมาเพื่อคุณ'
)

# Rename the original Section 2 to Section 3
section_best_sellers = section_2_content.replace(
    '<!-- Section 2: ขายดีประจำเดือน -->', 
    '<!-- Section 3: ขายดีประจำเดือน -->'
)

# Replace the old Section 2 with all 3 sections
new_content = content[:start_idx] + section_new_arrivals + section_best_sellers + section_curated + content[end_idx:]

with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
    f.write(new_content)

print("Duplication complete.")
