import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Change Left Column to 39%
content = content.replace('lg:w-[38%]', 'lg:w-[39%]')

# Change Right Column to 49%
content = content.replace('lg:w-[48%]', 'lg:w-[49%]')

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Tweaked flexbox successfully.")
