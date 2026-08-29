import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# 1. Main image border: remove thick red border, add standard gray border
content = content.replace(
    '<div class="bg-white rounded-[24px] border-[6px] border-[#E12427] relative overflow-hidden flex flex-col shadow-sm">',
    '<div class="bg-white rounded-[24px] border border-gray-200 relative overflow-hidden flex flex-col shadow-sm">'
)

# 2. Remove Best Seller Ribbon
# We need to remove from <!-- Best Seller Ribbon --> down to </div> before <!-- Thumbnails -->
ribbon_pattern = r'<!-- Best Seller Ribbon -->.*?</div>\s*</div>\s*<!-- Thumbnails -->'
content = re.sub(ribbon_pattern, '</div>\n\n            <!-- Thumbnails -->', content, flags=re.DOTALL)

# 3. Selected thumbnail: change yellow to green
content = content.replace(
    'border-2 border-yellow-400 rounded-lg',
    'border-2 border-[#76b83f] rounded-lg'
)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Updated image borders and removed ribbon.")
