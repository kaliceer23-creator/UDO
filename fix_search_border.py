import re

def update_search_border(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Old: class="flex-1 ml-5 mr-3 flex items-center h-[44px] border-b border-gray-300 focus-within:border-brand-red transition-colors"
    # New: class="flex-1 ml-5 mr-3 flex items-center h-[44px] border-b-[2px] border-gray-300 focus-within:border-brand-red transition-colors"
    
    content = content.replace(
        'border-b border-gray-300 focus-within:border-brand-red',
        'border-b-[2px] border-gray-300 focus-within:border-brand-red'
    )

    with open(filepath, 'w') as f:
        f.write(content)
    print(f"Updated search border in {filepath}")

update_search_border('/Users/aliceer/UDO/frontend/src/main.js')
update_search_border('/Users/aliceer/UDO/frontend/src/product.js')

