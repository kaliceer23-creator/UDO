import re

def fix_shadow(file_path):
    with open(file_path, 'r') as f:
        content = f.read()

    # Find the sticky wrapper and remove shadow-sm
    content = content.replace(
        '<div class="sticky top-0 z-[60] w-full shadow-sm">',
        '<div class="sticky top-0 z-[60] w-full">'
    )

    with open(file_path, 'w') as f:
        f.write(content)

fix_shadow('/Users/aliceer/UDO/frontend/src/main.js')
fix_shadow('/Users/aliceer/UDO/frontend/src/product.js')

print("Removed shadow-sm from sticky header wrapper.")
