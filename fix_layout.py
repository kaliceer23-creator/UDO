import re

filepath = '/Users/aliceer/UDO/frontend/src/category.js'
with open(filepath, 'r') as f:
    content = f.read()

# I will replace from "<!-- 1. Category Title" up to "<!-- 5. Product Grid -->"
pattern = r'<!-- 1\. Category Title & View Controls -->.*?<!-- 5\. Product Grid -->'
new_layout = """<!-- 1. Category Title & View Controls -->
  <div class="max-w-[1400px] mx-auto px-4 md:px-8 w-full flex items-end justify-between pt-10 mb-6">
    <!-- Left: Title and Count -->
    <div>
      <h1 class="text-[24px] md:text-[28px] font-bold text-[#252525] leading-tight">ลวดเชื่อม (Top Sale)</h1>
      <p class="text-[14px] text-gray-500 mt-1">8 รายการ</p>
    </div>

    <!-- Right: View Toggles & Sort By -->
    <div class="hidden md:flex items-center gap-4">
      <!-- Grid/List Toggles -->
      <div class="flex items-center gap-1">
        <!-- Grid Active -->
        <button class="w-10 h-10 bg-[#252525] text-white rounded-[4px] flex items-center justify-center transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
        </button>
        <!-- List Inactive -->
        <button class="w-10 h-10 text-gray-400 hover:text-[#252525] rounded-[4px] flex items-center justify-center transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </div>

      <!-- Divider -->
      <div class="h-6 w-px bg-gray-300 mx-1"></div>

      <!-- Sort By -->
      <div class="relative group/sort cursor-pointer z-50">
        <div class="flex items-center gap-2 text-[15px] text-[#252525] hover:text-brand-red transition-colors">
          เรียงตาม: <span class="font-medium">เกี่ยวข้อง</span> 
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 ml-0.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
        </div>
        <!-- Dropdown -->
        <div class="absolute right-0 top-full mt-2 w-[180px] bg-white border border-gray-200 shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-lg py-2 hidden group-hover/sort:block z-50 text-left">
          <a href="#" class="block px-4 py-2 text-[14px] text-[#252525] bg-gray-50 font-medium">เกี่ยวข้อง</a>
          <a href="#" class="block px-4 py-2 text-[14px] text-gray-600 hover:text-[#252525] hover:bg-gray-50">ราคา: ต่ำไปสูง</a>
          <a href="#" class="block px-4 py-2 text-[14px] text-gray-600 hover:text-[#252525] hover:bg-gray-50">ราคา: สูงไปต่ำ</a>
        </div>
      </div>
    </div>
  </div>

  <!-- 2. Filter Bar -->
  <div class="max-w-[1400px] mx-auto px-4 md:px-8 w-full flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
    <!-- Left: 3 Filter Buttons -->
    <div class="flex flex-wrap items-center gap-3 w-full">
      
      <!-- วัสดุที่เชื่อม Dropdown Pill -->
      <div class="relative group/filter">
        <button class="flex items-center gap-2 px-5 py-2 rounded-full border border-[#252525] text-[16px] font-medium text-[#252525] hover:border-brand-red transition-colors bg-transparent">
          วัสดุที่เชื่อม <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
        </button>
        <!-- Dropdown Menu -->
        <div class="absolute top-full left-0 mt-2 w-[220px] bg-white border border-gray-200 shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-lg py-2 hidden group-hover/filter:block z-40">
          <label class="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer">
            <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-black focus:ring-black">
            <span class="text-[15px] text-[#252525]">เหล็ก (Steel)</span>
          </label>
          <label class="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer">
            <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-black focus:ring-black">
            <span class="text-[15px] text-[#252525]">สแตนเลส (Stainless)</span>
          </label>
        </div>
      </div>
      
      <!-- กระบวนการเชื่อม Dropdown Pill -->
      <div class="relative group/filter">
        <button class="flex items-center gap-2 px-5 py-2 rounded-full border border-[#252525] text-[16px] font-medium text-[#252525] hover:border-brand-red transition-colors bg-transparent">
          กระบวนการเชื่อม <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
        </button>
        <!-- Dropdown Menu -->
        <div class="absolute top-full left-0 mt-2 w-[220px] bg-white border border-gray-200 shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-lg py-2 hidden group-hover/filter:block z-40">
          <label class="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer">
            <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-black focus:ring-black">
            <span class="text-[15px] text-[#252525]">ธูปเชื่อม (MMA)</span>
          </label>
          <label class="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer">
            <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-black focus:ring-black">
            <span class="text-[15px] text-[#252525]">ซีโอทู (MIG)</span>
          </label>
        </div>
      </div>

      <!-- ขนาดลวด Dropdown Pill -->
      <div class="relative group/filter">
        <button class="flex items-center gap-2 px-5 py-2 rounded-full border border-[#252525] text-[16px] font-medium text-[#252525] hover:border-brand-red transition-colors bg-transparent">
          ขนาดลวด (2) <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
        </button>
        <!-- Dropdown Menu -->
        <div class="absolute top-full left-0 mt-2 w-[180px] bg-white border border-gray-200 shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-lg py-2 hidden group-hover/filter:block z-40">
          <label class="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer">
            <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-black focus:ring-black" checked>
            <span class="text-[15px] text-[#252525]">2.6 mm</span>
          </label>
          <label class="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer">
            <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-black focus:ring-black" checked>
            <span class="text-[15px] text-[#252525]">3.2 mm</span>
          </label>
        </div>
      </div>
    </div>
  </div>

  <!-- 3. Active Pills Row -->
  <div class="max-w-[1400px] mx-auto px-4 md:px-8 w-full flex items-center gap-3 flex-wrap mb-10">
    <!-- Clear All (X Circle) -->
    <button class="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 text-[#252525] hover:border-[#333333] hover:bg-gray-100 transition-colors shrink-0" title="Clear All">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
    </button>
    <!-- Active Pill 1 -->
    <div class="flex items-center gap-2 bg-[#EDEDED] border border-gray-200 px-3 py-1 rounded-full text-[14px] font-medium text-[#252525]">
      เหล็ก <button class="text-[#252525] hover:text-red-500 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
    </div>
    <!-- Active Pill 2 -->
    <div class="flex items-center gap-2 bg-[#EDEDED] border border-gray-200 px-3 py-1 rounded-full text-[14px] font-medium text-[#252525]">
      2.6 mm <button class="text-[#252525] hover:text-red-500 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
    </div>
  </div>

  <!-- 5. Product Grid -->"""

content = re.sub(pattern, new_layout, content, flags=re.DOTALL)

with open(filepath, 'w') as f:
    f.write(content)

print("Fixed Layout completely")
