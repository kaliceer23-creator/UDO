import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

# Replace bold 26px with semibold 28px
content = re.sub(
    r'font-bold text-\[18px\] md:text-\[22px\] lg:text-\[26px\]',
    r'font-semibold text-[20px] md:text-[24px] lg:text-[28px]',
    content
)

with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
    f.write(content)

