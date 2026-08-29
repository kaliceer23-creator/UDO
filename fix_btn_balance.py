import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Add to Cart: hover:bg-[#76b83f]/30 -> hover:bg-[#76b83f]/40
content = content.replace(
    'hover:bg-[#76b83f]/30 text-[#76b83f]',
    'hover:bg-[#76b83f]/40 text-[#76b83f]'
)

# Buy Now: hover:bg-[#8ac25c] -> hover:opacity-85 (remove the hover:bg class and add hover:opacity)
content = content.replace(
    'bg-[#76b83f] hover:bg-[#8ac25c] text-white',
    'bg-[#76b83f] hover:opacity-85 text-white'
)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Balanced hover states.")
