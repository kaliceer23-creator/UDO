import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# 1. Breadcrumb active item
content = content.replace('text-gray-900 font-medium">เครื่องเล่นเกม', 'text-[#252525] font-medium">เครื่องเล่นเกม')

# 2. Section Headings (Coupons, Free Gifts, etc)
content = content.replace('text-gray-900 mb-3', 'text-[#252525] mb-3')
content = content.replace('text-gray-900 mb-1', 'text-[#252525] mb-1')
content = content.replace('text-gray-900 text-[15px]', 'text-[#252525] text-[15px]')

# 3. Breadcrumb separators
content = content.replace('text-gray-400">&gt;', 'text-black/45">&gt;')

# 4. Old price (Strikethrough)
content = content.replace('text-gray-500 line-through', 'text-black/45 line-through')

# 5. Fine print (e.g., Free gifts disclaimer)
content = content.replace('text-[12px] text-gray-500 mb-3', 'text-[12px] text-black/45 mb-3')

# 6. Warranty text
content = content.replace('text-gray-700 mb-6', 'text-[#252525] mb-6')

# 7. Subtext inside coupons
content = content.replace('text-[11px] text-gray-500', 'text-[11px] text-black/45')
content = content.replace('text-[11px] text-gray-600', 'text-[11px] text-[#252525]') # Or keep it gray. Let's use #252525

# 8. Must Have Item title
content = content.replace('text-[14px] text-gray-800', 'text-[14px] text-[#252525]')

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Applied design system colors to all text on PDP successfully.")
