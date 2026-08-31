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

category_main = """<main class="w-full bg-[#FAFAFA] pb-20 min-h-screen">
  
  <!-- 1. Centered Breadcrumbs -->
  <div class="w-full flex justify-center items-center gap-4 text-[13px] text-gray-600 pt-10 mb-10">
    <a href="/" class="hover:text-black">หน้าแรก</a>
    <span class="text-gray-400">|</span>
    <a href="#" class="hover:text-black">หมวดหมู่สินค้า</a>
    <span class="text-gray-400">|</span>
    <span class="font-medium text-black">ลวดเชื่อม</span>
  </div>

  <!-- 2. Filter Bar -->
  <div class="max-w-[1400px] mx-auto px-4 md:px-8 w-full flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
    <!-- Left: 3 Filter Buttons -->
    <div class="flex flex-wrap items-center gap-3">
      <!-- วัสดุที่เชื่อม Dropdown Pill -->
      <div class="relative group/filter">
        <button class="flex items-center gap-2 px-5 py-2 rounded-full border border-gray-400 text-[13px] font-medium text-black hover:border-black transition-colors bg-transparent">
          วัสดุที่เชื่อม <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
        </button>
        <!-- Dropdown Menu -->
        <div class="absolute top-full left-0 mt-2 w-[220px] bg-white border border-gray-200 shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-lg py-2 hidden group-hover/filter:block z-40">
          <label class="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer">
            <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-black focus:ring-black">
            <span class="text-[13px] text-black">เหล็ก (Steel)</span>
          </label>
          <label class="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer">
            <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-black focus:ring-black">
            <span class="text-[13px] text-black">สแตนเลส (Stainless)</span>
          </label>
        </div>
      </div>
      
      <!-- กระบวนการเชื่อม Dropdown Pill -->
      <div class="relative group/filter">
        <button class="flex items-center gap-2 px-5 py-2 rounded-full border border-gray-400 text-[13px] font-medium text-black hover:border-black transition-colors bg-transparent">
          กระบวนการเชื่อม <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
        </button>
        <!-- Dropdown Menu -->
        <div class="absolute top-full left-0 mt-2 w-[220px] bg-white border border-gray-200 shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-lg py-2 hidden group-hover/filter:block z-40">
          <label class="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer">
            <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-black focus:ring-black">
            <span class="text-[13px] text-black">ธูปเชื่อม (MMA)</span>
          </label>
          <label class="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer">
            <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-black focus:ring-black">
            <span class="text-[13px] text-black">ซีโอทู (MIG)</span>
          </label>
        </div>
      </div>

      <!-- ขนาดลวด Dropdown Pill -->
      <div class="relative group/filter">
        <button class="flex items-center gap-2 px-5 py-2 rounded-full border border-gray-400 text-[13px] font-medium text-black hover:border-black transition-colors bg-transparent">
          ขนาดลวด (2) <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
        </button>
        <!-- Dropdown Menu -->
        <div class="absolute top-full left-0 mt-2 w-[180px] bg-white border border-gray-200 shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-lg py-2 hidden group-hover/filter:block z-40">
          <label class="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer">
            <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-black focus:ring-black" checked>
            <span class="text-[13px] text-black">2.6 mm</span>
          </label>
          <label class="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer">
            <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-black focus:ring-black" checked>
            <span class="text-[13px] text-black">3.2 mm</span>
          </label>
        </div>
      </div>
    </div>

    <!-- Right: Sort By -->
    <div class="relative group/filter">
      <button class="flex items-center gap-2 px-5 py-2 rounded-full border border-gray-400 text-[13px] font-medium text-black hover:border-black transition-colors bg-transparent">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
        Sort by: Recommended <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
      </button>
      <!-- Dropdown Menu -->
      <div class="absolute top-full right-0 mt-2 w-[220px] bg-white border border-gray-200 shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-lg py-2 hidden group-hover/filter:block z-40 text-left">
        <a href="#" class="block px-4 py-2 text-[13px] text-black hover:bg-gray-50">Recommended</a>
        <a href="#" class="block px-4 py-2 text-[13px] text-black hover:bg-gray-50">Price: Low to High</a>
        <a href="#" class="block px-4 py-2 text-[13px] text-black hover:bg-gray-50">Price: High to Low</a>
      </div>
    </div>
  </div>

  <!-- 3. Active Pills Row -->
  <div class="max-w-[1400px] mx-auto px-4 md:px-8 w-full flex items-center gap-3 flex-wrap mb-10">
    <!-- Clear All (X Circle) -->
    <button class="flex items-center justify-center w-8 h-8 rounded-full border border-gray-400 text-black hover:bg-gray-100 transition-colors shrink-0" title="Clear All">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
    </button>
    <!-- Active Pill 1 -->
    <div class="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D1D5DB] text-[13px] font-medium text-black">
      เหล็ก <button class="hover:text-gray-600 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
    </div>
    <!-- Active Pill 2 -->
    <div class="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D1D5DB] text-[13px] font-medium text-black">
      2.6 mm <button class="hover:text-gray-600 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
    </div>
  </div>

  <!-- 4. Items count -->
  <div class="w-full flex justify-center text-[12px] md:text-[13px] text-gray-500 mb-8 font-medium">
    8 Items
  </div>

  <!-- 5. Product Grid -->
  <div class="max-w-[1400px] mx-auto px-4 md:px-8 w-full mb-16">
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
"""

# Extract the product card HTML from main.js to duplicate it 8 times
card_match = re.search(r'(<!-- Card 1 -->.*?</a>)', main_content, re.DOTALL)
if card_match:
    card_html = card_match.group(1)
    # Remove snap-start shrink-0 and w-[...] classes because we are in a grid now
    card_html = re.sub(r'snap-start shrink-0 w-\[[^\]]+\] md:w-\[[^\]]+\] lg:w-\[[^\]]+\]', 'w-full h-full', card_html)
    category_main += (card_html + '\n') * 8
else:
    category_main += "<!-- Add product cards here -->"

category_main += """
    </div>
    
    <!-- Load More Button -->
    <div class="flex justify-center mt-12">
      <button class="px-8 py-3 bg-white border border-black rounded-full text-[14px] font-medium text-black hover:bg-black hover:text-white transition-all">
        LOAD MORE
      </button>
    </div>
  </div>

</main>
"""

new_content = before_main + category_main + after_main

# Let's write this directly to src/category.js
with open('/Users/aliceer/UDO/frontend/src/category.js', 'w') as f:
    f.write(new_content)

print("Generated category.js EXACTLY like reference")
