import re

def update_weight(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Find the mega menu block
    pattern = r'(<!-- Mega Menu Dropdown \(BaNANA Exact Style\) -->.*?</svg>\n          </div>)'
    match = re.search(pattern, content, flags=re.DOTALL)
    
    if match:
        mega_menu = match.group(1)
        # Replace font-bold with font-semibold specifically for the h3 tags
        mega_menu = re.sub(r'(<h3 class="[^"]*)font-bold([^"]*">)', r'\1font-semibold\2', mega_menu)
        
        content = content[:match.start()] + mega_menu + content[match.end():]
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated font weight in {filepath}")
    else:
        print(f"Could not find mega menu block in {filepath}")

update_weight('/Users/aliceer/UDO/frontend/src/main.js')
update_weight('/Users/aliceer/UDO/frontend/src/product.js')

