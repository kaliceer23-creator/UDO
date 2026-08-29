import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Change gap-20 (80px) to gap-32 (128px)
content = content.replace('gap-10 lg:gap-20', 'gap-12 lg:gap-32')

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Increased gap to 128px successfully.")
