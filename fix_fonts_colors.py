import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Fix Title font weight and color to match product cards
content = content.replace(
    'font-semibold text-gray-900 leading-tight mb-2">เครื่องเล่นเกม',
    'font-medium text-gray-800 leading-tight mb-2">เครื่องเล่นเกม'
)

# Fix Brand/SKU from text-gray-600 to match any specific gray if needed, but text-gray-600 is fine.
# Fix Price color to EXACTLY #E12427
# Let's just find the price line and replace it
content = re.sub(
    r'text-\[#[0-9a-fA-F]+\] leading-none">฿18,412',
    r'text-[#E12427] leading-none">฿18,412',
    content
)

# Fix any other stray #9c2e2a or #b53832 or #c92020 in product.js (except the hover ones which should be #c41f22)
# Wait, let's just make sure the red border and ribbon are #E12427
content = content.replace('border-[#c92020]', 'border-[#E12427]')
content = content.replace('border-[#9c2e2a]', 'border-[#E12427]')
content = content.replace('border-[#b53832]', 'border-[#E12427]')

content = content.replace('bg-[#c92020]', 'bg-[#E12427]')
content = content.replace('bg-[#9c2e2a]', 'bg-[#E12427]')
content = content.replace('bg-[#b53832]', 'bg-[#E12427]')

content = content.replace('text-[#c92020]', 'text-[#E12427]')
content = content.replace('text-[#9c2e2a]', 'text-[#E12427]')
content = content.replace('text-[#b53832]', 'text-[#E12427]')

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Fixed fonts and colors.")
