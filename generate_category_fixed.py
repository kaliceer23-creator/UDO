import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    main_content = f.read()

# The correct split strings
start_tag = '<main class="w-full bg-white pb-20">'
end_tag = '</main>'

if start_tag not in main_content or end_tag not in main_content:
    print("Could not find main tags in main.js")
    exit(1)

before_main = main_content.split(start_tag)[0]
after_main = main_content.split(end_tag)[1]

category_main = """<main class="w-full bg-white pb-20">
  
  <!-- Breadcrumbs -->
  <div class="max-w-[1250px] mx-auto px-4 md:px-8 lg:px-12 w-full mt-6 mb-2">
    <div class="text-[13px] text-gray-500 flex items-center gap-2">
      <a href="/" class="hover:text-brand-red transition-colors">หน้าแรก</a>
      <span>/</span>
      <a href="#" class="hover:text-brand-red transition-colors">หมวดหมู่สินค้า</a>
      <span>/</span>
      <span class="text-gray-800 font-medium">ลวดเชื่อม</span>
    </div>
    <h1 class="text-[24px] md:text-[28px] font-bold text-[#252525] mt-2 mb-2">ลวดเชื่อม (Welding Consumables)</h1>
  </div>

  <!-- Minimalist Filter Bar -->
  <div class="max-w-[1250px] mx-auto px-4 md:px-8 lg:px-12 w-full mt-2 mb-4">
    <div class="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-gray-100">
      
      <!-- Left: Filter Pills -->
      <div class="flex items-center gap-2 md:gap-3 flex-wrap">
        
        <!-- วัสดุที่เชื่อม Dropdown Pill -->
        <div class="relative group/filter">
          <button class="flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-300 text-[14px] text-gray-700 hover:border-brand-red hover:text-brand-red transition-colors bg-white shadow-sm">
            วัสดุที่เชื่อม <span class="text-gray-400 text-[10px]">▼</span>
          </button>
          
          <!-- Dropdown Menu -->
          <div class="absolute top-full left-0 mt-2 w-[220px] bg-white border border-gray-200 shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-lg py-2 hidden group-hover/filter:block z-40">
            <label class="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer">
              <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-brand-red focus:ring-brand-red">
              <span class="text-[14px] text-gray-700">เหล็ก (Steel)</span>
            </label>
            <label class="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer">
              <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-brand-red focus:ring-brand-red">
              <span class="text-[14px] text-gray-700">สแตนเลส (Stainless)</span>
            </label>
            <label class="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer">
              <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-brand-red focus:ring-brand-red">
              <span class="text-[14px] text-gray-700">อลูมิเนียม (Aluminum)</span>
            </label>
          </div>
        </div>

        <!-- กระบวนการเชื่อม Dropdown Pill -->
        <div class="relative group/filter">
          <button class="flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-300 text-[14px] text-gray-700 hover:border-brand-red hover:text-brand-red transition-colors bg-white shadow-sm">
            กระบวนการเชื่อม <span class="text-gray-400 text-[10px]">▼</span>
          </button>
          
          <!-- Dropdown Menu -->
          <div class="absolute top-full left-0 mt-2 w-[220px] bg-white border border-gray-200 shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-lg py-2 hidden group-hover/filter:block z-40">
            <label class="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer">
              <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-brand-red focus:ring-brand-red">
              <span class="text-[14px] text-gray-700">ธูปเชื่อม (MMA)</span>
            </label>
            <label class="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer">
              <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-brand-red focus:ring-brand-red">
              <span class="text-[14px] text-gray-700">ซีโอทู (MIG)</span>
            </label>
            <label class="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer">
              <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-brand-red focus:ring-brand-red">
              <span class="text-[14px] text-gray-700">อาร์กอน (TIG)</span>
            </label>
          </div>
        </div>

        <!-- ขนาดลวด Dropdown Pill -->
        <div class="relative group/filter">
          <button class="flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-red text-[14px] text-brand-red transition-colors bg-red-50 shadow-sm">
            ขนาดลวด (2) <span class="text-brand-red text-[10px]">▼</span>
          </button>
          
          <!-- Dropdown Menu -->
          <div class="absolute top-full left-0 mt-2 w-[180px] bg-white border border-gray-200 shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-lg py-2 hidden group-hover/filter:block z-40">
            <label class="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer">
              <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-brand-red focus:ring-brand-red" checked>
              <span class="text-[14px] text-gray-700">2.6 mm</span>
            </label>
            <label class="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer">
              <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-brand-red focus:ring-brand-red" checked>
              <span class="text-[14px] text-gray-700">3.2 mm</span>
            </label>
          </div>
        </div>

      </div>
      
      <!-- Right: Sort By -->
      <div class="relative group/filter ml-auto">
        <button class="flex items-center gap-2 px-4 py-1.5 rounded-full border border-transparent text-[14px] text-gray-600 hover:bg-gray-50 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
          </svg>
          จัดเรียง: แนะนำ <span class="text-gray-400 text-[10px]">▼</span>
        </button>
      </div>

    </div>
  </div>

  <!-- Active Filter Pills (Tags) -->
  <div class="max-w-[1250px] mx-auto px-4 md:px-8 lg:px-12 w-full mb-6">
    <div class="flex items-center gap-2 flex-wrap">
      <span class="text-[13px] text-gray-500 mr-2">4 Items</span>
      
      <!-- Clear All -->
      <button class="flex items-center justify-center w-7 h-7 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100 transition-colors" title="ล้างตัวกรองทั้งหมด">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Active Pill 1 -->
      <div class="flex items-center gap-1.5 bg-gray-200/80 px-3 py-1.5 rounded-full text-[13px] text-gray-700">
        2.6 mm
        <button class="hover:text-brand-red transition-colors text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <!-- Active Pill 2 -->
      <div class="flex items-center gap-1.5 bg-gray-200/80 px-3 py-1.5 rounded-full text-[13px] text-gray-700">
        3.2 mm
        <button class="hover:text-brand-red transition-colors text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

    </div>
  </div>

  <!-- Product Grid -->
  <div class="max-w-[1250px] mx-auto px-4 md:px-8 lg:px-12 w-full mb-16">
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5">
"""

# Extract the product card HTML from main.js to duplicate it 8 times
card_match = re.search(r'(<!-- Card 1 -->.*?</a>)', main_content, re.DOTALL)
if card_match:
    card_html = card_match.group(1)
    # Remove snap-start shrink-0 and w-[...] classes because we are in a grid now
    card_html = re.sub(r'snap-start shrink-0 w-\[[^\]]+\] md:w-\[[^\]]+\] lg:w-\[[^\]]+\]', 'w-full h-full', card_html)
    # Ensure aspect-square is there
    category_main += (card_html + '\n') * 8
else:
    category_main += "<!-- Add product cards here -->"

category_main += """
    </div>
    
    <!-- Load More Button -->
    <div class="flex justify-center mt-12">
      <button class="px-8 py-3 bg-white border border-gray-300 rounded-full text-[15px] font-medium text-[#252525] hover:border-brand-red hover:text-brand-red shadow-sm transition-all">
        ดูสินค้าเพิ่มเติม
      </button>
    </div>
  </div>

</main>
"""

new_content = before_main + category_main + after_main

# Let's write this directly to src/category.js
with open('/Users/aliceer/UDO/frontend/src/category.js', 'w') as f:
    f.write(new_content)

print("Generated category.js successfully")
