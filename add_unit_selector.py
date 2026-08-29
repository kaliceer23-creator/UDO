import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# 1. Update Pricing Block
old_price = '<div class="text-[30px] md:text-[34px] font-medium text-[#E12427] leading-none">฿18,412</div>'
new_price = '''<div class="flex items-baseline gap-1.5">
                <div class="text-[30px] md:text-[34px] font-medium text-[#E12427] leading-none">฿18,412</div>
                <span class="text-black/45 text-[15px] font-medium">/ห่อ</span>
              </div>'''
content = content.replace(old_price, new_price)


# 2. Insert Unit Selector before Quantity Selector
unit_selector_html = '''<!-- Unit Selector -->
            <div class="mb-6 flex items-start gap-6">
              <span class="text-[15px] font-medium text-[#252525] mt-2 w-[45px]">บรรจุ</span>
              <div class="flex flex-wrap items-center gap-3">
                <button class="px-5 py-2 rounded border-2 border-[#76b83f] text-[#76b83f] font-medium text-[14px] bg-[#76b83f]/5 transition-colors relative overflow-hidden">
                  ห่อ
                  <!-- small checkmark icon in corner like Shopee (optional, let's keep it simple or add a tiny triangle) -->
                  <div class="absolute right-0 bottom-0 w-4 h-4 bg-[#76b83f] rounded-tl flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                </button>
                <button class="px-5 py-2 rounded border border-gray-300 text-gray-600 hover:border-[#76b83f] hover:text-[#76b83f] font-medium text-[14px] bg-white transition-colors">
                  ลัง (4 ห่อ)
                </button>
              </div>
            </div>

            <!-- Quantity Selector -->'''

content = content.replace('<!-- Quantity Selector -->', unit_selector_html)

# Let's also align the Quantity label to match the "บรรจุ" label (w-[45px] and no mt-2 since it's centered)
# Currently: <span class="text-[15px] font-medium text-[#252525]">จำนวน</span>
# Change to: <span class="text-[15px] font-medium text-[#252525] w-[45px]">จำนวน</span>
content = content.replace(
    '<span class="text-[15px] font-medium text-[#252525]">จำนวน</span>',
    '<span class="text-[15px] font-medium text-[#252525] w-[45px]">จำนวน</span>'
)


with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Added unit selection UI successfully.")
