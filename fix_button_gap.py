import re

filepath = '/Users/aliceer/UDO/frontend/src/category.js'
with open(filepath, 'r') as f:
    content = f.read()

# The container for the filter buttons
old_div = '<div class="flex flex-wrap items-center gap-3">'
new_div = '<div class="flex flex-wrap items-center gap-4 md:gap-5">'

content = content.replace(old_div, new_div, 1) # Only replace the first one (which is the filter bar)

with open(filepath, 'w') as f:
    f.write(content)

print("Increased gap between filter buttons")
