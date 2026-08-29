import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Left Button: bg-[#76b83f]/10 text-[#76b83f] -> hover:bg-[#76b83f]/70 hover:text-white
content = content.replace(
    'hover:bg-[#76b83f]/40 text-[#76b83f]',
    'hover:bg-[#76b83f]/70 hover:text-white text-[#76b83f]'
)

# Right Button: bg-[#76b83f] text-white -> hover:bg-[#76b83f]/70 (remove hover:opacity-85)
content = content.replace(
    'bg-[#76b83f] hover:opacity-85 text-white',
    'bg-[#76b83f] hover:bg-[#76b83f]/70 text-white'
)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Adjusted to meet in the middle color.")
