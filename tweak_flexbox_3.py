import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Change Left Column to 40%
content = content.replace('lg:w-[39%]', 'lg:w-[40%]')

# Change Right Column to 49%
content = content.replace('lg:w-[49%]', 'lg:w-[49%]') # Stays 49

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Tweaked flexbox successfully.")
