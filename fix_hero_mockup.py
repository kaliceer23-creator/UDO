import re

filepath = '/Users/aliceer/UDO/frontend/src/main.js'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace img tags in the Hero Banner
old_img = 'w-full h-auto block object-contain'
new_img = 'w-full aspect-[4/3] md:aspect-[21/9] lg:aspect-[3/1] object-cover object-center block'

content = content.replace(old_img, new_img)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Changed Hero banner images to use fixed aspect ratio and object-cover for mockup")
