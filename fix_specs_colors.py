import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# 1. Tab Bar: remove background color (use bg-white so it's sticky but looks transparent on the white page)
content = content.replace(
    'class="w-full bg-[#f2f2f2] border-y border-gray-200 mt-16 sticky top-[64px] z-40"',
    'class="w-full bg-white border-y border-gray-200 mt-16 sticky top-[64px] z-40"'
)

# 2. Specs Section Background: change to #F8F8F8
content = content.replace(
    '<div class="w-full bg-[#e3e3e3] py-12">',
    '<div class="w-full bg-[#F8F8F8] py-12">'
)

# 3. Table Rows: alternate #F8F8F8 and #ffffff
# Originally: bg-[#d4d4d4] (dark) and bg-[#dedede] (light)
content = content.replace('bg-[#d4d4d4]', 'bg-[#F8F8F8]')
content = content.replace('bg-[#dedede]', 'bg-[#ffffff]')

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Fixed tab bar and specs table colors.")
