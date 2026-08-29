import re

def fix_border(file_path):
    with open(file_path, 'r') as f:
        content = f.read()

    # Replace border-gray-100 with border-black/5
    # Let's target the header tag specifically
    content = content.replace(
        'border-b border-gray-100 relative z-[55]',
        'border-b border-black/5 relative z-[55]'
    )

    with open(file_path, 'w') as f:
        f.write(content)

fix_border('/Users/aliceer/UDO/frontend/src/main.js')
fix_border('/Users/aliceer/UDO/frontend/src/product.js')

print("Softened header border to border-black/5")
