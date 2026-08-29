import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# 1. Revert gap back to something reasonable so it doesn't break grid math
content = content.replace('gap-12 lg:gap-[130px]', 'gap-10 lg:gap-16')

# 2. Fix coupons to not overflow
content = content.replace('sm:w-[320px]', 'sm:flex-1')

# 3. Change right column from span-7 to span-6 with a start offset (creates 1 empty column gap)
# Left is col-span-5. Right is col-span-6. Total 11. This naturally creates a 1 column gap (approx 100px) in a 12 col grid.
content = content.replace('<div class="lg:col-span-7">', '<div class="lg:col-span-6 lg:col-start-7">')

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Fixed layout overflow successfully.")
