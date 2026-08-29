import re

def update_opacity(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Old: class="hidden fixed inset-0 bg-black/50 z-[50] cursor-pointer"
    # New: class="hidden fixed inset-0 bg-black/30 z-[50] cursor-pointer"
    
    if 'bg-black/50' in content:
        content = content.replace('bg-black/50 z-[50]', 'bg-black/30 z-[50]')
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated overlay opacity in {filepath}")
    else:
        print(f"Could not find bg-black/50 in {filepath}")

update_opacity('/Users/aliceer/UDO/frontend/src/main.js')
update_opacity('/Users/aliceer/UDO/frontend/src/product.js')

