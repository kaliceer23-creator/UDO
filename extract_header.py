import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

start_marker = '<div class="sticky top-0 z-[60] w-full shadow-sm">'
# Find the end of this div block. It probably ends right before "<!-- Hero Banner (Full Width) -->" or something similar.
end_marker = '<!-- Hero Banner'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker, start_idx)

if start_idx != -1 and end_idx != -1:
    header_html = content[start_idx:end_idx].strip()
    with open('/Users/aliceer/UDO/frontend/header_extract.txt', 'w') as f2:
        f2.write(header_html)
    print("Extracted header successfully.")
else:
    print("Markers not found.")
