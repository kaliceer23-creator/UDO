import re

def fix_weight(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Replace font-bold with font-semibold for this specific heading
    old_str = '<h2 class="text-[20px] md:text-[22px] font-bold text-[#252525] mb-8">ตัวเลือกอื่นที่คุณอาจชอบ</h2>'
    new_str = '<h2 class="text-[20px] md:text-[22px] font-semibold text-[#252525] mb-8">ตัวเลือกอื่นที่คุณอาจชอบ</h2>'
    
    if old_str in content:
        content = content.replace(old_str, new_str)
        with open(filepath, 'w') as f:
            f.write(content)
        print("Fixed title weight.")
    else:
        print("Could not find the title string.")

fix_weight('/Users/aliceer/UDO/frontend/src/product.js')

