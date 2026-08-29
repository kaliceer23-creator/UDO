import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Change Title color
content = content.replace('text-gray-800 leading-tight', 'text-[#252525] leading-tight')

# Change Secondary info block color to text-black/45 (which is rgba(0,0,0,0.45))
content = content.replace('text-[14px] text-gray-600 mb-6', 'text-[14px] text-black/45 mb-6')

# Remove text-gray-300 from the separator so it inherits text-black/45
content = content.replace('class="text-gray-300">|', 'class="text-black/45">|')

# Change Brand Link color to #252525 to match title
content = content.replace('class="text-gray-900 font-medium hover:underline"', 'class="text-[#252525] font-medium hover:underline"')

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Applied exact colors successfully.")
