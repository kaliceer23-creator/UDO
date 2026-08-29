import re

def update_search_btn(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    pattern = r'(<!-- Search Button.*?-->\s*<button class="[^"]*)h-\[38px\]'
    content = re.sub(pattern, r'\1h-[42px]', content)
    
    with open(filepath, 'w') as f:
        f.write(content)

update_search_btn('/Users/aliceer/UDO/frontend/src/main.js')
update_search_btn('/Users/aliceer/UDO/frontend/src/product.js')

print("Increased search button height slightly.")
