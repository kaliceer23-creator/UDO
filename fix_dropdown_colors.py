import re

def update_dropdown_colors(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Find the dropdown list block
    # It starts with: <div id="search-cat-dropdown"
    
    # 1. Update the "ทั้งหมด" background from bg-gray-100 to bg-red-50
    content = content.replace(
        '<div class="px-5 py-2.5 bg-gray-100 text-[#252525] text-[15px] cursor-pointer font-medium">ทั้งหมด</div>',
        '<div class="px-5 py-2.5 bg-red-50 text-brand-red text-[15px] cursor-pointer font-medium">ทั้งหมด</div>'
    )
    # The user didn't say the text should be red, but usually active items have brand colored text. Wait, the ref image shows black text.
    # Let me use black text.
    content = content.replace(
        '<div class="px-5 py-2.5 bg-red-50 text-brand-red text-[15px] cursor-pointer font-medium">ทั้งหมด</div>',
        '<div class="px-5 py-2.5 bg-red-50 text-[#252525] text-[15px] cursor-pointer font-medium">ทั้งหมด</div>'
    )
    
    # 2. Update hover:bg-gray-50 to hover:bg-gray-200 inside the dropdown
    # I'll just use regex to replace it inside the search-cat-dropdown block
    
    pattern = r'(<div id="search-cat-dropdown".*?</div>\n          </div>)'
    match = re.search(pattern, content, flags=re.DOTALL)
    
    if match:
        dropdown = match.group(1)
        dropdown = dropdown.replace('hover:bg-gray-50', 'hover:bg-gray-100')
        
        content = content[:match.start()] + dropdown + content[match.end():]
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated dropdown colors in {filepath}")
    else:
        print(f"Could not find dropdown block in {filepath}")

update_dropdown_colors('/Users/aliceer/UDO/frontend/src/main.js')
update_dropdown_colors('/Users/aliceer/UDO/frontend/src/product.js')

