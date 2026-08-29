import re

def remove_shadow(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Old: shadow-[0_20px_40px_rgba(0,0,0,0.15)]
    # We just replace it with an empty string or shadow-none
    if 'shadow-[0_20px_40px_rgba(0,0,0,0.15)]' in content:
        content = content.replace('shadow-[0_20px_40px_rgba(0,0,0,0.15)]', '')
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Removed shadow from {filepath}")
    else:
        print(f"Shadow not found in {filepath}")

remove_shadow('/Users/aliceer/UDO/frontend/src/main.js')
remove_shadow('/Users/aliceer/UDO/frontend/src/product.js')

