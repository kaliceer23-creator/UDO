import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Fix Image 2 bottom margin
content = content.replace(
    '<!-- Image 2 -->\n          <div class="w-full rounded-xl overflow-hidden mb-12',
    '<!-- Image 2 -->\n          <div class="w-full rounded-xl overflow-hidden mb-8'
)

# Fix Feature Text Block bottom margin
content = content.replace(
    '<!-- Feature Text Block -->\n          <div class="mb-12">',
    '<!-- Feature Text Block -->\n          <div class="mb-8">'
)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Reduced top/bottom space for feature text.")
