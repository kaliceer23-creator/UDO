import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

# Revert back to the original bold and smaller text styling
content = re.sub(
    r'font-normal text-\[22px\] md:text-\[26px\] lg:text-\[30px\]',
    r'font-bold text-[18px] md:text-[22px] lg:text-[26px]',
    content
)

with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
    f.write(content)

