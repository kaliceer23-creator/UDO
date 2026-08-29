import re

def update_search_border(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Old: border-b-[2px] border-gray-300 focus-within:border-brand-red
    # New: border-b border-gray-300 focus-within:border-b-[2px] focus-within:border-brand-red
    
    content = content.replace(
        'border-b-[2px] border-gray-300 focus-within:border-brand-red',
        'border-b border-gray-300 focus-within:border-b-[2px] focus-within:border-brand-red'
    )

    with open(filepath, 'w') as f:
        f.write(content)
    print(f"Updated search border in {filepath}")

update_search_border('/Users/aliceer/UDO/frontend/src/main.js')
update_search_border('/Users/aliceer/UDO/frontend/src/product.js')

