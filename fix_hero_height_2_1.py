import re

filepath = '/Users/aliceer/UDO/frontend/src/main.js'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the img tag class
old_class = 'class="w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[11/5] object-cover object-center block"'
new_class = 'class="w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[2/1] object-cover object-center block"'

content = content.replace(old_class, new_class)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Changed back to aspect-[2/1]")
