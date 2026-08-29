import re

def update_search(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    pattern = r'(<!-- Search Input Container \(Bottom Border\) -->\s*<div class="flex-1 ml-5 mr-3 flex items-center h-\[44px\].*?<!-- Search Button.*?</button>)'
    
    new_block = """<!-- Search Container (Outline Style) -->
          <div class="flex-1 ml-5 flex items-center h-[44px] border border-gray-300 rounded-[6px] focus-within:border-brand-red transition-colors bg-transparent overflow-hidden">
            <input 
              type="text" 
              placeholder="ค้นหาสินค้าที่ต้องการที่นี่....."
              class="w-full bg-transparent text-[15px] text-[#252525] font-normal outline-none placeholder-gray-400 h-full px-4"
            />
            
            <!-- Search Button (Brand Red) -->
            <button class="bg-brand-red hover:bg-brand-red/90 text-white w-[60px] h-full flex items-center justify-center transition-colors shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-[20px] h-[20px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
          </div>"""

    content = re.sub(pattern, new_block, content, flags=re.DOTALL)

    with open(filepath, 'w') as f:
        f.write(content)

update_search('/Users/aliceer/UDO/frontend/src/main.js')
update_search('/Users/aliceer/UDO/frontend/src/product.js')

print("Updated search bar to outline style.")
