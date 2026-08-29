import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Replace the Quantity div's margin from mb-8 to mb-12
content = content.replace(
    '<div class="flex items-center gap-6 mb-8">',
    '<div class="flex items-center gap-6 mb-12">'
)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Updated Quantity spacing to be perfectly centered.")
