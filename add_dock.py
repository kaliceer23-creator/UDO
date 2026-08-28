import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

dock_html = """
      <!-- Floating Dock (Landy Home Style) -->
      <div class="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-30 bg-white rounded-full px-6 md:px-10 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-between gap-6 md:gap-14 border border-gray-100">
        
        <!-- Item 1: แบบบ้าน -->
        <a href="#" class="flex flex-col items-center gap-1 group w-14 md:w-16">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 md:w-6 md:h-6 text-[#E32626] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.592 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          <span class="text-[12px] md:text-[13px] font-bold text-gray-900 group-hover:text-[#E32626] transition-colors whitespace-nowrap tracking-tight">แบบบ้าน</span>
        </a>

        <!-- Item 2: ผลงาน -->
        <a href="#" class="flex flex-col items-center gap-1 group w-14 md:w-16">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 md:w-6 md:h-6 text-[#E32626] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
          </svg>
          <span class="text-[12px] md:text-[13px] font-bold text-gray-900 group-hover:text-[#E32626] transition-colors whitespace-nowrap tracking-tight">ผลงาน</span>
        </a>

        <!-- Item 3: E-Catalog -->
        <a href="#" class="flex flex-col items-center gap-1 group w-14 md:w-16">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 md:w-6 md:h-6 text-[#E32626] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
          <span class="text-[12px] md:text-[13px] font-bold text-gray-900 group-hover:text-[#E32626] transition-colors whitespace-nowrap tracking-tight">E-Catalog</span>
        </a>

        <!-- Item 4: โปรโมชัน -->
        <a href="#" class="flex flex-col items-center gap-1 group w-14 md:w-16">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 md:w-6 md:h-6 text-[#E32626] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38a2.25 2.25 0 01-3.12-1.155l-1.3-2.617m9.555 4.385A12.031 12.031 0 0019.5 9.75v-1.5c0-1.14-.94-2.18-2.16-2.29a3.00 3.00 0 00-3.34 2.29v5.25c0 1.14.94 2.18 2.16 2.29a3.00 3.00 0 003.34-2.29zm-9.555 4.385c.34-.143.666-.308.977-.492" />
          </svg>
          <span class="text-[12px] md:text-[13px] font-bold text-gray-900 group-hover:text-[#E32626] transition-colors whitespace-nowrap tracking-tight">โปรโมชัน</span>
        </a>

      </div>
"""

# Find the end of the hero section
hero_start = content.find('<!-- Hero Slider Section')
hero_end = content.find('</section>', hero_start)

if hero_start != -1 and hero_end != -1:
    content = content[:hero_end] + dock_html + "\n    </section>" + content[hero_end+10:]
    with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
        f.write(content)
    print("Dock added successfully.")
else:
    print("Could not find hero section.")
