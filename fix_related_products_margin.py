import re

def fix_related(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Old container start:
    # <div class="mt-16 mb-8 pt-8 border-t border-gray-200">
    # New container start:
    # <div class="max-w-[1250px] mx-auto px-4 md:px-8 xl:px-16 mt-16 mb-8">
    
    old_str = '<div class="mt-16 mb-8 pt-8 border-t border-gray-200">'
    new_str = '<div class="max-w-[1250px] mx-auto px-4 md:px-8 xl:px-16 mt-16 mb-8">'
    
    if old_str in content:
        content = content.replace(old_str, new_str)
        with open(filepath, 'w') as f:
            f.write(content)
        print("Fixed related products wrapper and removed border.")
    else:
        print("Could not find the target string.")

fix_related('/Users/aliceer/UDO/frontend/src/product.js')

