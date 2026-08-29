import re

def update_search(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    pattern = r'<!-- Search Container \(Outline Style\) -->.*?</div>'
    
    old_block = """<!-- Search Input Container (Bottom Border) -->
          <div class="flex-1 ml-5 mr-3 flex items-center h-[44px] border-b border-gray-300 focus-within:border-brand-red transition-colors">
            <input 
              type="text" 
              placeholder="ค้นหาสินค้าที่ต้องการที่นี่....."
              class="w-full bg-transparent text-[16px] text-black/90 font-normal outline-none placeholder-black/90 h-full px-1"
            />
          </div>
          
          <!-- Search Button (Brand Red instead of Yellow) -->
          <button class="bg-brand-red hover:bg-brand-red/90 text-white w-[64px] h-[42px] rounded-[4px] flex items-center justify-center transition-colors shrink-0 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>"""

    content = re.sub(pattern, old_block, content, flags=re.DOTALL)

    with open(filepath, 'w') as f:
        f.write(content)

update_search('/Users/aliceer/UDO/frontend/src/main.js')
update_search('/Users/aliceer/UDO/frontend/src/product.js')

print("Reverted search bar to bottom border style.")
