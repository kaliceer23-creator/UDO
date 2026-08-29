import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

content = content.replace('bg-[#252525]', 'bg-[#333333]', 1)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)
