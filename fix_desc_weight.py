import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Replace font-semibold with font-medium specifically for the Nintendo Switch span
old_span = '<span class="font-semibold">เครื่องเล่นเกม Nintendo Switch 2</span>'
new_span = '<span class="font-medium">เครื่องเล่นเกม Nintendo Switch 2</span>'

content = content.replace(old_span, new_span)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Updated text weight to 500 (font-medium).")
