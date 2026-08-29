import re

def fix_read_more_font(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Search for the button class and replace text-[15px] with text-[16px]
    old_btn = '<button id="btn-read-more" class="pointer-events-auto text-[#252525] font-semibold text-[15px] flex items-center gap-2 hover:text-brand-red transition-colors bg-white px-8 py-2.5 rounded-full shadow-[0_2px_15px_rgba(0,0,0,0.1)] border border-gray-100 translate-y-1/2 z-10">'
    new_btn = '<button id="btn-read-more" class="pointer-events-auto text-[#252525] font-semibold text-[16px] flex items-center gap-2 hover:text-brand-red transition-colors bg-white px-8 py-2.5 rounded-full shadow-[0_2px_15px_rgba(0,0,0,0.1)] border border-gray-100 translate-y-1/2 z-10">'
    
    if old_btn in content:
        content = content.replace(old_btn, new_btn)
        with open(filepath, 'w') as f:
            f.write(content)
        print("Updated read more font size.")
    else:
        print("Could not find the button string.")

fix_read_more_font('/Users/aliceer/UDO/frontend/src/product.js')

