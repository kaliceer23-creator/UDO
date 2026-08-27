import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

# Replace any existing font-bold or font-[400] with just font-normal and exact text-[30px] on desktop
content = re.sub(
    r'font-\[400\] text-\[20px\] md:text-\[26px\] lg:text-\[30px\]',
    r'font-normal text-[22px] md:text-[26px] lg:text-[30px]',
    content
)

content = re.sub(
    r'font-bold text-\[18px\] md:text-\[22px\] lg:text-\[26px\]',
    r'font-normal text-[22px] md:text-[26px] lg:text-[30px]',
    content
)

with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
    f.write(content)

