import re

filepath = '/Users/aliceer/UDO/frontend/src/category.js'
with open(filepath, 'r') as f:
    content = f.read()

# Pattern to replace the entire 3 Filter Buttons section
pattern = r'(<!-- Left: 3 Filter Buttons -->).*?(<!-- Right: Sort By -->)'

new_filters = """<!-- Left: 3 Filter Buttons -->
    <div class="flex flex-wrap items-center gap-3">
      
      <!-- วัสดุที่เชื่อม Dropdown Pill (Inactive) -->
      <div class="relative group/filter">
        <button class="flex items-center gap-2 px-5 py-2 rounded-full border border-[#252525] text-[16px] font-medium text-[#252525] hover:border-brand-red transition-colors bg-transparent">
          วัสดุที่เชื่อม <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
        </button>
        <!-- Dropdown Menu -->
        <div class="absolute top-full left-0 mt-2 w-[240px] bg-white border border-gray-200 shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-lg hidden group-hover/filter:block z-40 overflow-hidden flex flex-col">
          <div class="py-2 max-h-[250px] overflow-y-auto">
            <label class="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer">
              <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-brand-green focus:ring-brand-green">
              <span class="text-[15px] text-[#252525]">เหล็ก (Steel)</span>
            </label>
            <label class="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer">
              <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-brand-green focus:ring-brand-green">
              <span class="text-[15px] text-[#252525]">สแตนเลส (Stainless)</span>
            </label>
          </div>
          <!-- Dropdown Footer -->
          <div class="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50/50">
            <button class="text-[14px] text-gray-500 hover:text-black underline transition-colors">ล้าง</button>
            <button class="px-5 py-1.5 bg-brand-green hover:bg-[#68a335] text-white text-[14px] font-medium rounded-md shadow-sm transition-colors">นำไปใช้</button>
          </div>
        </div>
      </div>
      
      <!-- กระบวนการเชื่อม Dropdown Pill (Inactive) -->
      <div class="relative group/filter">
        <button class="flex items-center gap-2 px-5 py-2 rounded-full border border-[#252525] text-[16px] font-medium text-[#252525] hover:border-brand-red transition-colors bg-transparent">
          กระบวนการเชื่อม <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
        </button>
        <!-- Dropdown Menu -->
        <div class="absolute top-full left-0 mt-2 w-[240px] bg-white border border-gray-200 shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-lg hidden group-hover/filter:block z-40 overflow-hidden flex flex-col">
          <div class="py-2 max-h-[250px] overflow-y-auto">
            <label class="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer">
              <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-brand-green focus:ring-brand-green">
              <span class="text-[15px] text-[#252525]">ธูปเชื่อม (MMA)</span>
            </label>
            <label class="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer">
              <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-brand-green focus:ring-brand-green">
              <span class="text-[15px] text-[#252525]">ซีโอทู (MIG)</span>
            </label>
          </div>
          <!-- Dropdown Footer -->
          <div class="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50/50">
            <button class="text-[14px] text-gray-500 hover:text-black underline transition-colors">ล้าง</button>
            <button class="px-5 py-1.5 bg-brand-green hover:bg-[#68a335] text-white text-[14px] font-medium rounded-md shadow-sm transition-colors">นำไปใช้</button>
          </div>
        </div>
      </div>

      <!-- ขนาดลวด Dropdown Pill (ACTIVE) -->
      <div class="relative group/filter">
        <!-- Notice the Active Classes: Green background, green border, green text -->
        <button class="flex items-center gap-2 px-5 py-2 rounded-full border border-brand-green text-[16px] font-semibold text-brand-green bg-[rgba(118,184,63,0.08)] hover:bg-[rgba(118,184,63,0.12)] transition-colors">
          ขนาดลวด (2) <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" /></svg>
        </button>
        <!-- Dropdown Menu -->
        <div class="absolute top-full left-0 mt-2 w-[240px] bg-white border border-gray-200 shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-lg hidden group-hover/filter:block z-40 overflow-hidden flex flex-col">
          <div class="py-2 max-h-[250px] overflow-y-auto">
            <label class="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer">
              <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-brand-green focus:ring-brand-green" checked>
              <span class="text-[15px] text-[#252525]">2.6 mm</span>
            </label>
            <label class="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer">
              <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-brand-green focus:ring-brand-green" checked>
              <span class="text-[15px] text-[#252525]">3.2 mm</span>
            </label>
          </div>
          <!-- Dropdown Footer -->
          <div class="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50/50">
            <button class="text-[14px] text-gray-500 hover:text-black underline transition-colors">ล้าง</button>
            <button class="px-5 py-1.5 bg-brand-green hover:bg-[#68a335] text-white text-[14px] font-medium rounded-md shadow-sm transition-colors">นำไปใช้</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Right: Sort By -->"""

content = re.sub(pattern, new_filters, content, flags=re.DOTALL)

with open(filepath, 'w') as f:
    f.write(content)

print("Updated Dropdowns and Active State")
