import re

filepath = '/Users/aliceer/UDO/frontend/src/category.js'
with open(filepath, 'r') as f:
    content = f.read()

# Pattern to grab everything from <main> up to the Product Grid
pattern = r'(<main class="w-full bg-\[#FAFAFA\] pb-20 min-h-screen">).*?(<!-- 5\. Product Grid -->)'

new_layout = """\\1
  
  <!-- 1. Filter Bar & Sort By -->
  <div class="max-w-[1400px] mx-auto px-4 md:px-8 w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-10 mb-4">
    <!-- Left: 3 Filter Buttons -->
    <div class="flex flex-wrap items-center gap-3">
      
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

    <!-- Right: Sort By -->
    <div class="relative group/sort cursor-pointer z-50">
      <div class="flex items-center gap-2 text-[16px] text-[#252525] hover:text-brand-red transition-colors font-medium">
        เรียงตาม: <span class="font-normal text-gray-600">เกี่ยวข้อง</span> 
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 ml-0.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
      </div>
      <!-- Dropdown -->
      <div class="absolute right-0 top-full mt-2 w-[180px] bg-white border border-gray-200 shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-lg py-2 hidden group-hover/sort:block z-50 text-left">
        <a href="#" class="block px-4 py-2 text-[15px] text-[#252525] bg-gray-50 font-medium">เกี่ยวข้อง</a>
        <a href="#" class="block px-4 py-2 text-[15px] text-gray-600 hover:text-[#252525] hover:bg-gray-50">ราคา: ต่ำไปสูง</a>
        <a href="#" class="block px-4 py-2 text-[15px] text-gray-600 hover:text-[#252525] hover:bg-gray-50">ราคา: สูงไปต่ำ</a>
      </div>
    </div>
  </div>

  <!-- 2. Active Pills Row -->
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

  <!-- 3. Title and Count -->
  <div class="max-w-[1400px] mx-auto px-4 md:px-8 w-full mb-6">
    <h1 class="text-[24px] md:text-[28px] font-bold text-[#252525] leading-tight">ลวดเชื่อม (Top Sale)</h1>
    <p class="text-[14px] text-gray-500 mt-1">8 รายการ</p>
  </div>

  \\2"""

content = re.sub(pattern, new_layout, content, flags=re.DOTALL)

with open(filepath, 'w') as f:
    f.write(content)

print("Reordered layout successfully")
