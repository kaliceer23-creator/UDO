import re

def update_fonts(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Extract the mega menu block
    pattern = r'(<!-- Mega Menu Dropdown \(BaNANA Exact Style\) -->.*?</div>\s*</div>\s*<!-- Logo)'
    match = re.search(pattern, content, flags=re.DOTALL)
    
    if match:
        mega_menu = match.group(1)
        # Replace font sizes
        mega_menu = mega_menu.replace('text-[14px]', 'text-[16px]')
        mega_menu = mega_menu.replace('text-[13.5px]', 'text-[16px]')
        
        content = content[:match.start()] + mega_menu + content[match.end():]
        
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated font sizes in {filepath}")
    else:
        print(f"Could not find mega menu block in {filepath}")

update_fonts('/Users/aliceer/UDO/frontend/src/main.js')
update_fonts('/Users/aliceer/UDO/frontend/src/product.js')

