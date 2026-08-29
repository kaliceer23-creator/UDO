import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Remove the empty column offset by changing span-6 and col-start-7 back to span-7
content = content.replace('<div class="lg:col-span-6 lg:col-start-7">', '<div class="lg:col-span-7">')

# Change gap to gap-20 (80px) which is a healthy medium
content = content.replace('gap-10 lg:gap-16', 'gap-10 lg:gap-20')

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Reduced gap successfully.")
