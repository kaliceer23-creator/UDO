import re

def update_category(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # The block to replace:
    # <!-- "ทั้งหมด" dropdown -->
    # <div class="flex items-center gap-1.5 text-[16px] text-black/90 font-normal cursor-pointer hover:text-brand-red whitespace-nowrap pl-2">
    #   <span>ทั้งหมด</span>
    #   <svg ...>
    #     <path ... />
    #   </svg>
    # </div>
    
    pattern = r'<!-- "ทั้งหมด" dropdown -->.*?</div>'
    
    new_html = """<!-- "ทั้งหมด" Category Dropdown -->
          <div class="relative flex-shrink-0" id="search-cat-wrapper">
            <!-- Trigger Button -->
            <div id="search-cat-btn" class="flex items-center gap-1.5 text-[16px] text-black/90 font-normal cursor-pointer hover:text-brand-red whitespace-nowrap pl-2 pr-2 h-[44px] border-b-[2px] border-transparent transition-all duration-200">
              <span id="search-cat-text">ทั้งหมด</span>
              <svg id="search-cat-icon" xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-gray-400 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
            
            <!-- Dropdown List -->
            <div id="search-cat-dropdown" class="hidden absolute top-[calc(100%+1px)] left-0 w-[260px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] rounded-b-md border border-t-0 border-gray-100 py-2 z-[70] max-h-[400px] overflow-y-auto custom-scrollbar">
              <div class="px-5 py-2.5 bg-gray-100 text-[#252525] text-[15px] cursor-pointer font-medium">ทั้งหมด</div>
              <div class="px-5 py-2.5 hover:bg-gray-50 text-[#252525] text-[15px] cursor-pointer transition-colors flex items-center gap-2">🔥 โปรโมชั่นพิเศษ</div>
              <div class="px-5 py-2.5 hover:bg-gray-50 text-[#252525] text-[15px] cursor-pointer transition-colors">ตู้เชื่อม/พลาสม่า</div>
              <div class="px-5 py-2.5 hover:bg-gray-50 text-[#252525] text-[15px] cursor-pointer transition-colors">กลุ่มลวดเชื่อม</div>
              <div class="px-5 py-2.5 hover:bg-gray-50 text-[#252525] text-[15px] cursor-pointer transition-colors">อุปกรณ์เชื่อม</div>
              <div class="px-5 py-2.5 hover:bg-gray-50 text-[#252525] text-[15px] cursor-pointer transition-colors">อะไหล่/วัสดุสิ้นเปลือง</div>
              <div class="px-5 py-2.5 hover:bg-gray-50 text-[#252525] text-[15px] cursor-pointer transition-colors">อุปกรณ์นิรภัยส่วนบุคคล (PPE)</div>
              <div class="px-5 py-2.5 hover:bg-gray-50 text-[#252525] text-[15px] cursor-pointer transition-colors">น้ำยาเคมี/ตรวจสอบรอยร้าว</div>
            </div>
          </div>"""

    # Do a DOTALL replace
    # We want to replace precisely the "ทั้งหมด" dropdown div block.
    # We can match `<!-- "ทั้งหมด" dropdown -->\s*<div.*?</div>` wait, the svg is nested inside. So we need a better regex.
    # Regex for a div with 2 levels of nesting is hard.
    
    # Let's just find the exact string start and end.
    start_str = '<!-- "ทั้งหมด" dropdown -->'
    end_str = '</svg>\n          </div>\n          \n          <!-- Search Input Container'
    
    if start_str in content and end_str in content:
        start_idx = content.find(start_str)
        end_idx = content.find(end_str)
        
        # Replace
        content = content[:start_idx] + new_html + '\n          \n          <!-- Search Input Container' + content[end_idx + len(end_str):]
        
        # Append JS if not already present
        js_code = """
// --- Category Dropdown Logic ---
setTimeout(() => {
  const catBtn = document.getElementById('search-cat-btn');
  const catDropdown = document.getElementById('search-cat-dropdown');
  const catIcon = document.getElementById('search-cat-icon');

  if (catBtn && catDropdown) {
    catBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = catDropdown.classList.contains('hidden');
      
      if (isHidden) {
        catDropdown.classList.remove('hidden');
        catBtn.classList.add('border-brand-red');
        catBtn.classList.remove('border-transparent');
        catIcon.classList.add('rotate-180');
      } else {
        catDropdown.classList.add('hidden');
        catBtn.classList.remove('border-brand-red');
        catBtn.classList.add('border-transparent');
        catIcon.classList.remove('rotate-180');
      }
    });

    document.addEventListener('click', (e) => {
      if (!catBtn.contains(e.target) && !catDropdown.contains(e.target) && !catDropdown.classList.contains('hidden')) {
        catDropdown.classList.add('hidden');
        catBtn.classList.remove('border-brand-red');
        catBtn.classList.add('border-transparent');
        catIcon.classList.remove('rotate-180');
      }
    });
  }
}, 100);
"""
        if "Category Dropdown Logic" not in content:
            content += js_code

        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated category dropdown in {filepath}")
    else:
        print(f"Could not find the target string in {filepath}")

update_category('/Users/aliceer/UDO/frontend/src/main.js')
update_category('/Users/aliceer/UDO/frontend/src/product.js')

