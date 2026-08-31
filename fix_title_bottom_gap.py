import re

filepath = '/Users/aliceer/UDO/frontend/src/category.js'
with open(filepath, 'r') as f:
    content = f.read()

# Replace mb-6 with mb-10 in the Title and Count wrapper
old_div = '<!-- 3. Title and Count -->\n  <div class="max-w-[1400px] mx-auto px-4 md:px-8 w-full mb-6">'
new_div = '<!-- 3. Title and Count -->\n  <div class="max-w-[1400px] mx-auto px-4 md:px-8 w-full mb-10">'

content = content.replace(old_div, new_div)

with open(filepath, 'w') as f:
    f.write(content)

print("Increased bottom margin of title wrapper")
