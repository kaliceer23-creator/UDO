import re

filepath = '/Users/aliceer/UDO/frontend/src/main.js'
with open(filepath, 'r') as f:
    content = f.read()

# Make "ดูทั้งหมด" link to /category.html
old_link = '<a href="#" class="ml-4 text-[rgba(0,0,0,0.45)] hover:text-gray-900 font-semibold flex items-center gap-1 transition-colors text-[16px]">'
new_link = '<a href="/category.html" class="ml-4 text-[rgba(0,0,0,0.45)] hover:text-gray-900 font-semibold flex items-center gap-1 transition-colors text-[16px]">'

content = content.replace(old_link, new_link)

with open(filepath, 'w') as f:
    f.write(content)

print("Updated links to category.html")
