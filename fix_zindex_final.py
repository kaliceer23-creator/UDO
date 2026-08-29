import re

def ensure_zindex(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Ensure utility bar is z-[60]
    if 'class="w-full bg-[#F5F5F5] hidden md:block relative z-[60]"' not in content:
        content = content.replace(
            '<div class="w-full bg-[#F5F5F5] hidden md:block">',
            '<div class="w-full bg-[#F5F5F5] hidden md:block relative z-[60]">'
        )
        
    # Ensure overlay is z-[40]
    content = content.replace('z-[50] cursor-pointer"', 'z-[40] cursor-pointer"')
    
    with open(filepath, 'w') as f:
        f.write(content)
    print(f"Ensured z-index in {filepath}")

ensure_zindex('/Users/aliceer/UDO/frontend/src/main.js')
ensure_zindex('/Users/aliceer/UDO/frontend/src/product.js')

