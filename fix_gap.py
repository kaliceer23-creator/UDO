import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Change gap-8 to gap-12 lg:gap-24
content = content.replace('gap-8', 'gap-12 lg:gap-24')

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Increased gap between columns successfully.")
