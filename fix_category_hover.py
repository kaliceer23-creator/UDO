import re

def update_category_to_hover(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # 1. Update the wrapper to have `group`
    content = content.replace('<div class="relative flex-shrink-0" id="search-cat-wrapper">', '<div class="relative flex-shrink-0 group" id="search-cat-wrapper">')

    # 2. Update the button to remove hover:text-brand-red, and add group-hover:border-brand-red
    old_btn = 'id="search-cat-btn" class="flex items-center gap-1.5 text-[16px] text-black/90 font-normal cursor-pointer hover:text-brand-red whitespace-nowrap pl-2 pr-2 h-[44px] border-b-[2px] border-transparent transition-all duration-200"'
    new_btn = 'id="search-cat-btn" class="flex items-center gap-1.5 text-[16px] text-[#252525] font-normal cursor-pointer whitespace-nowrap pl-2 pr-2 h-[44px] border-b-[2px] border-transparent group-hover:border-brand-red transition-all duration-200"'
    content = content.replace(old_btn, new_btn)

    # 3. Update the icon to add group-hover:rotate-180
    old_icon = 'id="search-cat-icon" xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-gray-400 transition-transform duration-200" fill="none"'
    new_icon = 'id="search-cat-icon" xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-gray-400 transition-transform duration-200 group-hover:rotate-180" fill="none"'
    content = content.replace(old_icon, new_icon)

    # 4. Update the dropdown to add group-hover:block
    old_dropdown = 'id="search-cat-dropdown" class="hidden absolute top-[calc(100%+1px)] left-0 w-[260px]'
    new_dropdown = 'id="search-cat-dropdown" class="hidden group-hover:block absolute top-[calc(100%+1px)] left-0 w-[260px]'
    content = content.replace(old_dropdown, new_dropdown)

    # 5. Remove the JS logic
    js_pattern = r'// --- Category Dropdown Logic ---.*?},\ 100\);'
    content = re.sub(js_pattern, '', content, flags=re.DOTALL)

    with open(filepath, 'w') as f:
        f.write(content)
    print(f"Updated category dropdown to hover in {filepath}")

update_category_to_hover('/Users/aliceer/UDO/frontend/src/main.js')
update_category_to_hover('/Users/aliceer/UDO/frontend/src/product.js')

