import re

def update_aspect(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Replace aspect-[4/5] with aspect-square
    if 'aspect-[4/5]' in content:
        content = content.replace('aspect-[4/5]', 'aspect-square')
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated image aspect ratio to 1:1 in {filepath}")
    else:
        print(f"No aspect-[4/5] found in {filepath}")

update_aspect('/Users/aliceer/UDO/frontend/src/main.js')
update_aspect('/Users/aliceer/UDO/frontend/src/product.js')

