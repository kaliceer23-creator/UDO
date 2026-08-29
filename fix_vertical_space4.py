import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Change pt-12 to pt-11 (48px to 44px)
content = content.replace(
    '<main class="bg-white min-h-screen pb-24 pt-12">',
    '<main class="bg-white min-h-screen pb-24 pt-[44px]">'
)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Adjusted vertical space to 44px successfully.")
