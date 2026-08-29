import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Change Left Column from 40% to 38%
content = content.replace('lg:w-[40%]', 'lg:w-[38%]')

# Change Right Column from 50% to 48%
content = content.replace('lg:w-[50%]', 'lg:w-[48%]')

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Tweaked flexbox successfully.")
