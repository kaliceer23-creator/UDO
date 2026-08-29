import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Fix Add to Cart Button (หยิบใส่ตะกร้า) - change back to green text, keep font-medium
content = content.replace(
    'text-[#252525] font-medium text-[16px] py-3.5 rounded transition-colors flex items-center justify-center">หยิบใส่ตะกร้า',
    'text-[#76b83f] font-medium text-[16px] py-3.5 rounded transition-colors flex items-center justify-center">หยิบใส่ตะกร้า'
)

# Fix Buy Now Button (ซื้อสินค้า) - change back to white text, keep font-medium
content = content.replace(
    'text-[#252525] font-medium text-[16px] py-3.5 rounded transition-colors shadow-sm flex items-center justify-center">ซื้อสินค้า',
    'text-white font-medium text-[16px] py-3.5 rounded transition-colors shadow-sm flex items-center justify-center">ซื้อสินค้า'
)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Reverted colors but kept font-medium.")
