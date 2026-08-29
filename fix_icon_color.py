import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Change text-gray-400 to text-black for the icons
content = content.replace(
    'class="w-5 h-5 text-gray-400 group-hover:text-[#E12427]',
    'class="w-5 h-5 text-black group-hover:text-[#E12427]'
)

content = content.replace(
    'class="w-5 h-5 text-gray-400 group-hover:text-[#76b83f]',
    'class="w-5 h-5 text-black group-hover:text-[#76b83f]'
)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Updated icon colors to black.")
