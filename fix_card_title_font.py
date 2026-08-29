import re

def update_title_font(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Replace font size for product titles in cards
    old_class = '<h3 class="font-medium text-gray-800 text-[14px] md:text-[15px] leading-tight mb-2 line-clamp-2">'
    new_class = '<h3 class="font-medium text-gray-800 text-[15px] md:text-[16px] leading-tight mb-2 line-clamp-2">'
    
    if old_class in content:
        content = content.replace(old_class, new_class)
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated product title font size in {filepath}")
    else:
        print(f"Could not find the class in {filepath}")

update_title_font('/Users/aliceer/UDO/frontend/src/main.js')
update_title_font('/Users/aliceer/UDO/frontend/src/product.js')

