import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Change text-[14px] to text-[16px] for the specs table container
content = content.replace(
    '<div class="w-full flex flex-col text-[14px] text-[#252525]">',
    '<div class="w-full flex flex-col text-[16px] text-[#252525]">'
)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Updated specs table font size to 16px.")
