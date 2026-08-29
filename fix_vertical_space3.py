import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Change pt-16 to pt-12 (64px to 48px)
content = content.replace(
    '<main class="bg-white min-h-screen pb-24 pt-16">',
    '<main class="bg-white min-h-screen pb-24 pt-12">'
)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Adjusted vertical space to pt-12 successfully.")
