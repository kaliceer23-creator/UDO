import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

new_utility = """  <!-- 0. แถบ Utility ด้านบนสุด (สไตล์ BaNANA) -->
  <div class="w-full bg-[#F5F5F5] hidden md:block">
    <div class="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12 h-9 flex items-center justify-end text-[13px] text-black/90 font-medium gap-4">
      <a href="#" class="hover:text-brand-red transition-all">เกี่ยวกับเรา</a>
      <span class="text-gray-400 font-light">|</span>
      <a href="#" class="hover:text-brand-red transition-all">วิธีการสั่งซื้อ/ขอใบเสนอราคา</a>
      <span class="text-gray-400 font-light">|</span>
      <a href="#" class="hover:text-brand-red transition-all">FAQ</a>
      <span class="text-gray-400 font-light">|</span>
      <a href="#" class="hover:text-brand-red transition-all">ติดต่อเรา</a>
      <span class="text-gray-400 font-light">|</span>
      
      <!-- ตัวเลือกภาษา (Language Switcher) -->
      <div class="flex items-center gap-1 cursor-pointer hover:text-brand-red group">
        <span class="font-medium text-black/90 group-hover:text-brand-red">TH</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-gray-500 group-hover:text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </div>
  </div>
"""

start_idx = content.find('  <!-- 0. แถบ Utility')
end_idx = content.find('  <!-- Sticky Wrapper')

if start_idx != -1 and end_idx != -1:
    content = content[:start_idx] + new_utility + "\n" + content[end_idx:]
    with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
        f.write(content)
    print("Utility bar updated.")
else:
    print("Could not find boundaries")
