import re

def remove_border(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Old: <div class="w-full bg-white py-16 border-b border-gray-200">
    # New: <div class="w-full bg-white py-16">
    
    old_str = '<div class="w-full bg-white py-16 border-b border-gray-200">'
    new_str = '<div class="w-full bg-white py-16">'
    
    if old_str in content:
        content = content.replace(old_str, new_str)
        with open(filepath, 'w') as f:
            f.write(content)
        print("Removed the border from the Rich Content section.")
    else:
        print("Could not find the target string.")

remove_border('/Users/aliceer/UDO/frontend/src/product.js')

