import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Capacity wrapper
content = content.replace(
    '<!-- Capacity / บรรจุ -->\n            <div class="mb-6">',
    '<!-- Capacity / บรรจุ -->\n            <div class="mb-10">'
)

# Capacity title spacing
content = content.replace(
    '<span class="block text-[16px] text-[#252525] mb-3">บรรจุ</span>',
    '<span class="block text-[16px] text-[#252525] mb-4">บรรจุ</span>'
)

# Color wrapper spacing (from mb-10 to mb-12)
content = content.replace(
    '<!-- Color Selection (Mockup) -->\n            <div class="mb-10">',
    '<!-- Color Selection (Mockup) -->\n            <div class="mb-12">'
)

# Color title spacing
content = content.replace(
    '<div class="flex items-baseline gap-2 mb-4">',
    '<div class="flex items-baseline gap-2 mb-5">'
)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Updated spacing.")
