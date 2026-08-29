import re

def update_spacing(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # We want to replace `pb-5 mb-5` with `pb-7 mb-7` in the mega menu block.
    # The mega menu starts with: <!-- Mega Menu Dropdown (BaNANA Exact Style) -->
    # Let's extract it, replace, and inject back.
    pattern = r'(<!-- Mega Menu Dropdown \(BaNANA Exact Style\) -->.*?</svg>\n          </div>)'
    match = re.search(pattern, content, flags=re.DOTALL)
    
    if match:
        mega_menu = match.group(1)
        mega_menu = mega_menu.replace('pb-5 mb-5', 'pb-7 mb-7')
        
        content = content[:match.start()] + mega_menu + content[match.end():]
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated spacing in {filepath}")
    else:
        # Fallback if the regex fails for some reason, just replace globally (safe enough)
        content = content.replace('pb-5 mb-5', 'pb-7 mb-7')
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Global replaced spacing in {filepath}")

update_spacing('/Users/aliceer/UDO/frontend/src/main.js')
update_spacing('/Users/aliceer/UDO/frontend/src/product.js')

