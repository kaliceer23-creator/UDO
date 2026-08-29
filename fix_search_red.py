import re

def update_search_color(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Find the button and replace bg-[#76b83f] and its hover
    pattern = r'class="bg-\[#76b83f\] hover:[^ ]+'
    content = re.sub(pattern, 'class="bg-brand-red hover:bg-brand-red/90', content)
    
    with open(filepath, 'w') as f:
        f.write(content)

update_search_color('/Users/aliceer/UDO/frontend/src/main.js')
update_search_color('/Users/aliceer/UDO/frontend/src/product.js')

print("Changed search button to red.")
