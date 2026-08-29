import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Add to Cart: hover darker -> hover:bg-[#76b83f]/30
content = content.replace(
    'hover:bg-[#76b83f]/20 text-[#76b83f]',
    'hover:bg-[#76b83f]/30 text-[#76b83f]'
)

# Buy Now: hover lighter -> hover:bg-[#8ac25c]
content = content.replace(
    'hover:bg-[#65a332] text-white',
    'hover:bg-[#8ac25c] text-white'
)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Updated hover states.")
