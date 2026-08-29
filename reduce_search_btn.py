import re

def update_search_btn(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Find the search button block
    # old: <button class="bg-[#76b83f] hover:bg-[#65a332] text-white w-[64px] h-[44px] rounded-[4px] ...
    
    # Let's just use regex to replace h-[44px] to h-[38px] specifically inside the search button.
    # The search button is inside <!-- Search Button (Brand Red instead of Yellow) -->
    
    pattern = r'(<!-- Search Button.*?-->\s*<button class="[^"]*)h-\[44px\]'
    content = re.sub(pattern, r'\1h-[38px]', content)

    # Let's also check if it's in product.js. Wait, product.js in d708469 might have hover:bg-[#76b83f]/70 because it's a different commit?
    # The regex `[^"]*` will match any class before h-[44px].
    
    with open(filepath, 'w') as f:
        f.write(content)

update_search_btn('/Users/aliceer/UDO/frontend/src/main.js')
update_search_btn('/Users/aliceer/UDO/frontend/src/product.js')

print("Reduced search button height.")
