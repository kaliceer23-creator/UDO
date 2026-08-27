import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

# Replace Header
old_header = """        <!-- Header -->
        <div class="flex items-center justify-between mb-8 md:mb-10">
          <h2 class="text-[28px] md:text-[34px] font-bold tracking-tight">
            <span class="text-gray-900">เทคนิค</span><span class="text-[#E32626]">งานเชื่อม</span>
          </h2>
          <a href="#" class="text-[15px] font-semibold text-gray-800 hover:text-[#E32626] transition-colors flex items-center gap-1">
            ดูทั้งหมด
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>"""

new_header = """        <!-- Header -->
        <div class="flex items-center mb-5 md:mb-6">
          <div class="flex items-center gap-2">
            <h2 class="text-[22px] md:text-[26px] font-bold text-gray-900 tracking-tight">
              บทความ
            </h2>
          </div>
          <a href="#" class="ml-4 text-[rgba(0,0,0,0.45)] hover:text-gray-900 font-semibold flex items-center gap-1 transition-colors text-[16px]">
            ดูทั้งหมด
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>"""

content = content.replace(old_header, new_header)

# Replace image aspect ratio
content = content.replace(
    'aspect-[16/9] lg:aspect-[2/1]',
    'aspect-[4/3] md:aspect-[3/2]'
)

with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
    f.write(content)

