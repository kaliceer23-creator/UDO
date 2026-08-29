import re

def update_hover(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Find the hamburger menu btn div and change the hover color
    old_btn = '<div id="desktop-menu-btn" class="cursor-pointer text-black/90 hover:text-brand-red transition-colors flex items-center justify-center p-2 -ml-2">'
    new_btn = '<div id="desktop-menu-btn" class="cursor-pointer text-black/90 hover:text-brand-green transition-colors flex items-center justify-center p-2 -ml-2">'
    
    if old_btn in content:
        content = content.replace(old_btn, new_btn)
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated hamburger hover in {filepath}")
    else:
        print(f"Could not find the hamburger hover string in {filepath}")

update_hover('/Users/aliceer/UDO/frontend/src/main.js')
update_hover('/Users/aliceer/UDO/frontend/src/product.js')

