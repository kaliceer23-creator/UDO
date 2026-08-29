import re

def update_search_position(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Old: class="hidden md:flex flex-1 max-w-[460px] lg:max-w-[520px] items-center mx-auto"
    # New: class="hidden md:flex flex-1 max-w-[460px] lg:max-w-[520px] items-center mr-auto ml-4 lg:ml-10"
    
    old_class = 'class="hidden md:flex flex-1 max-w-[460px] lg:max-w-[520px] items-center mx-auto"'
    new_class = 'class="hidden md:flex flex-1 max-w-[460px] lg:max-w-[520px] items-center mr-auto ml-4 lg:ml-10"'
    
    if old_class in content:
        content = content.replace(old_class, new_class)
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated search position in {filepath}")
    else:
        print(f"Could not find the search container class in {filepath}")

update_search_position('/Users/aliceer/UDO/frontend/src/main.js')
update_search_position('/Users/aliceer/UDO/frontend/src/product.js')

