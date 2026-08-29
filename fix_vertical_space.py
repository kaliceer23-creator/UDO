import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Change pt-6 to pt-12 (24px to 48px)
content = content.replace(
    '<main class="bg-white min-h-screen pb-24 pt-6">',
    '<main class="bg-white min-h-screen pb-24 pt-10">'
)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Increased vertical space successfully.")
