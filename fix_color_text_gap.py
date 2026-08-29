import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Replace gap-2 with gap-4
content = content.replace(
    '<div class="flex items-baseline gap-2 mb-5">',
    '<div class="flex items-baseline gap-4 mb-5">'
)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Updated color text gap.")
