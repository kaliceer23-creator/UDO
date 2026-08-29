import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Replace font-medium back with font-semibold
old_span = '<span class="font-medium">เครื่องเล่นเกม Nintendo Switch 2</span>'
new_span = '<span class="font-semibold">เครื่องเล่นเกม Nintendo Switch 2</span>'

content = content.replace(old_span, new_span)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Reverted text weight back to font-semibold.")
