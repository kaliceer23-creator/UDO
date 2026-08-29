import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Change the grid container to flexbox
content = content.replace(
    '<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-32">',
    '<div class="flex flex-col lg:flex-row justify-between gap-10">'
)

# Change Left Column from lg:col-span-5 to lg:w-[42%]
content = content.replace(
    '<div class="lg:col-span-5">',
    '<div class="w-full lg:w-[40%]">'
)

# Change Right Column from lg:col-span-7 to lg:w-[50%]
content = content.replace(
    '<div class="lg:col-span-7">',
    '<div class="w-full lg:w-[50%]">'
)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Converted to flexbox successfully.")
