import re

def update_utility(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Old: <div class="w-full bg-[#F5F5F5] hidden md:block">
    # New: <div class="w-full bg-[#F5F5F5] hidden md:block relative z-[60]">
    
    # Check if we already have it
    if 'bg-[#F5F5F5] hidden md:block relative z-[60]' not in content:
        content = content.replace(
            '<div class="w-full bg-[#F5F5F5] hidden md:block">',
            '<div class="w-full bg-[#F5F5F5] hidden md:block relative z-[60]">'
        )
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated utility bar in {filepath}")
    else:
        print(f"Already updated in {filepath}")

update_utility('/Users/aliceer/UDO/frontend/src/main.js')
update_utility('/Users/aliceer/UDO/frontend/src/product.js')

