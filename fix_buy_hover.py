import re

def update_buy_hover(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # The button currently is:
    # class="bg-brand-green hover:bg-[#65a332] text-white font-medium text-[16px] py-3.5 rounded transition-colors shadow-sm flex items-center justify-center">ซื้อสินค้า</button>
    
    old_btn = 'class="bg-brand-green hover:bg-[#65a332] text-white font-medium text-[16px] py-3.5 rounded transition-colors shadow-sm flex items-center justify-center">ซื้อสินค้า</button>'
    new_btn = 'class="bg-brand-green hover:bg-[#76b83f]/70 text-white font-medium text-[16px] py-3.5 rounded transition-colors shadow-sm flex items-center justify-center">ซื้อสินค้า</button>'
    
    if old_btn in content:
        content = content.replace(old_btn, new_btn)
        with open(filepath, 'w') as f:
            f.write(content)
        print("Updated Buy button hover color.")
    else:
        print("Could not find the button string.")

update_buy_hover('/Users/aliceer/UDO/frontend/src/product.js')

