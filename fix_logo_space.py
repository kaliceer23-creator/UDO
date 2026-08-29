import re

def update_logo_space(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Old: class="hover:opacity-80 transition-opacity ml-1"
    # New: class="hover:opacity-80 transition-opacity -ml-2"
    
    content = content.replace(
        'class="hover:opacity-80 transition-opacity ml-1"',
        'class="hover:opacity-80 transition-opacity -ml-1"'
    )

    with open(filepath, 'w') as f:
        f.write(content)
    print(f"Updated logo space in {filepath}")

update_logo_space('/Users/aliceer/UDO/frontend/src/main.js')
update_logo_space('/Users/aliceer/UDO/frontend/src/product.js')

