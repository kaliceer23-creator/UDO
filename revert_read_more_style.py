import re

def revert_read_more_style(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    new_btn = '<button id="btn-read-more" class="pointer-events-auto text-[#252525] font-semibold text-[15px] flex items-center gap-1 hover:text-brand-red transition-colors translate-y-1/2 z-10">'
    old_btn = '<button id="btn-read-more" class="pointer-events-auto text-[#252525] font-semibold text-[15px] flex items-center gap-2 hover:text-brand-red transition-colors bg-white px-8 py-2.5 rounded-full shadow-[0_2px_15px_rgba(0,0,0,0.1)] border border-gray-100 translate-y-1/2 z-10">'
    
    if new_btn in content:
        content = content.replace(new_btn, old_btn)
        with open(filepath, 'w') as f:
            f.write(content)
        print("Reverted read more button style.")
    else:
        print("Could not find the button string.")

revert_read_more_style('/Users/aliceer/UDO/frontend/src/product.js')

