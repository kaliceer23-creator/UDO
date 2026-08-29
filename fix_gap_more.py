import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Change lg:gap-24 to lg:gap-[120px]
content = content.replace('gap-12 lg:gap-24', 'gap-12 lg:gap-[130px]')

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Increased gap even more successfully.")
