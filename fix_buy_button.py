import re

def update_buy_btn(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Original red button
    old_btn = 'class="bg-brand-red hover:bg-brand-red/90 text-white font-medium text-[16px] py-3.5 rounded transition-colors shadow-sm flex items-center justify-center">ซื้อสินค้า</button>'
    
    # New green button
    new_btn = 'class="bg-brand-green hover:bg-[#65a332] text-white font-medium text-[16px] py-3.5 rounded transition-colors shadow-sm flex items-center justify-center">ซื้อสินค้า</button>'
    
    if old_btn in content:
        content = content.replace(old_btn, new_btn)
        with open(filepath, 'w') as f:
            f.write(content)
        print("Updated Buy button to green.")
    else:
        print("Could not find the red buy button string.")

update_buy_btn('/Users/aliceer/UDO/frontend/src/product.js')

