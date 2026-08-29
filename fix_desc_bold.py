import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Replace font-bold with font-semibold for the inline span
content = content.replace(
    '<span class="font-bold">เครื่องเล่นเกม Nintendo Switch 2</span>',
    '<span class="font-semibold">เครื่องเล่นเกม Nintendo Switch 2</span>'
)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Updated inline text weight.")
