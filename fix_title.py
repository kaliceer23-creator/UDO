with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

content = content.replace(
    '<h1 class="text-[20px] md:text-[24px] font-semibold text-[#252525] leading-tight mb-2">เครื่องเล่นเกม Nintendo Switch 2 + Mario Kart World Bundle</h1>',
    '<h1 class="text-[20px] md:text-[24px] font-semibold text-[#252525] leading-tight mb-2">ลวดเชื่อม (Welding Wire) คุณภาพสูง</h1>'
)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)
print("Fixed Title.")
