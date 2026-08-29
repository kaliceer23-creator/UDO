import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

content = content.replace('max-w-[1300px]', 'max-w-[1250px]')

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Fixed container width to 1250px successfully.")
