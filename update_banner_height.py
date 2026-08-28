import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

target = '<div class="relative w-full h-[400px] md:h-[450px] lg:h-[550px] overflow-hidden">'
replacement = '<div class="relative w-full h-[60vh] md:h-[75vh] lg:h-[calc(100vh-160px)] overflow-hidden">'

if target in content:
    content = content.replace(target, replacement)
    with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
        f.write(content)
    print("Banner height updated.")
else:
    print("Could not find the target line.")
