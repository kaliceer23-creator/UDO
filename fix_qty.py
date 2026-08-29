import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Find the Quantity block
start_marker = '<!-- Quantity -->'
# Find the next comment which is likely <!-- Action Buttons -->
end_marker = '<!-- Action Buttons -->'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx != -1 and end_idx != -1:
    new_qty_html = """<!-- Quantity -->
          <div class="mb-10 flex items-center gap-8">
            <span class="text-[16px] font-medium text-[#252525]">จำนวน</span>
            <div class="flex items-center gap-4">
              <!-- Minus Button (Disabled state look) -->
              <button class="flex items-center justify-center text-gray-300 hover:text-gray-400 transition-colors cursor-not-allowed">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4" /></svg>
              </button>
              
              <!-- Number Box -->
              <div class="w-[70px] h-[44px] flex items-center justify-center font-medium text-[16px] text-[#252525] bg-white border border-gray-300 rounded-[4px] shadow-sm">
                1
              </div>
              
              <!-- Plus Button -->
              <button class="flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" /></svg>
              </button>
            </div>
          </div>

          """
    new_content = content[:start_idx] + new_qty_html + content[end_idx:]
    with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
        f.write(new_content)
    print("Updated Quantity Selector.")
else:
    print("Could not find Quantity block.")
