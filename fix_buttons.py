import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Fix Add to Cart Button (หยิบใส่ตะกร้า)
content = content.replace(
    'text-[#76b83f] font-bold text-[16px] py-3.5 rounded transition-colors flex items-center justify-center">หยิบใส่ตะกร้า',
    'text-[#252525] font-medium text-[16px] py-3.5 rounded transition-colors flex items-center justify-center">หยิบใส่ตะกร้า'
)

# Fix Buy Now Button (ซื้อสินค้า)
content = content.replace(
    'text-white font-bold text-[16px] py-3.5 rounded transition-colors shadow-sm flex items-center justify-center">ซื้อสินค้า',
    'text-[#252525] font-medium text-[16px] py-3.5 rounded transition-colors shadow-sm flex items-center justify-center">ซื้อสินค้า'
)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Updated buttons font to black and weight 500.")
