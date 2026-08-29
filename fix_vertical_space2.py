import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Change pt-10 to pt-16 (40px to 64px)
content = content.replace(
    '<main class="bg-white min-h-screen pb-24 pt-10">',
    '<main class="bg-white min-h-screen pb-24 pt-16">'
)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Increased vertical space more successfully.")
