import re

filepath = '/Users/aliceer/UDO/frontend/src/category.js'
with open(filepath, 'r') as f:
    content = f.read()

# Add accent-[#76B83F] to checkboxes
content = content.replace('type="checkbox" class="w-4 h-4 rounded border-gray-300 text-brand-green focus:ring-brand-green"', 'type="checkbox" class="w-4 h-4 rounded border-gray-300 accent-[#76B83F]"')

with open(filepath, 'w') as f:
    f.write(content)

print("Updated checkboxes")
