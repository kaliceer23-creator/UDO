import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Replace font-semibold with text-[16px] font-normal for all tabs in the Sticky Tab Bar
content = content.replace(
    'class="py-4 text-[#252525] font-semibold"',
    'class="py-4 text-[#252525] text-[16px] font-normal"'
)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Updated tab bar font size and weight.")
