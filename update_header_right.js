const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const oldSection = `        <!-- Right Side Actions -->
        <div class="shrink-0 flex items-center justify-end text-[16px] text-black/90 font-medium gap-5 lg:gap-6">
          
          <!-- Login -->
          <a href="#" class="hidden lg:flex items-center gap-2 hover:text-brand-red cursor-pointer transition-colors text-black/90">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            <span class="font-medium text-[16px]">เข้าสู่ระบบ</span>
          </a>

          <!-- Divider -->
          <div class="w-[1px] h-[24px] bg-gray-200 hidden lg:block"></div>

          <!-- Cart -->
          <a href="#" class="text-black/90 hover:text-brand-red transition-colors flex items-center relative pr-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-[26px] h-[26px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            <!-- Badge (Optional, you can remove if not needed, but standard for carts) -->
            <span class="absolute -top-1 -right-1 bg-brand-red text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-white leading-none">0</span>
          </a>

        </div>`;

const newSection = `        <!-- Right Side Actions -->
        <div class="shrink-0 flex items-center justify-end text-[16px] text-black/90 font-medium gap-6 lg:gap-8">
          
          <!-- Auth Links -->
          <div class="hidden lg:flex items-center gap-1.5 font-normal text-[15px] text-[#252525]">
            <a href="#" class="hover:text-brand-red transition-colors">เข้าสู่ระบบ</a>
            <span class="text-black mx-1">|</span>
            <a href="#" class="hover:text-brand-red transition-colors">ลงทะเบียน</a>
          </div>

          <!-- Icons Group (Heart + Cart) -->
          <div class="flex items-center gap-4">
            <!-- Heart Icon -->
            <a href="#" class="text-black/90 hover:text-brand-red transition-colors flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-[26px] h-[26px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </a>

            <!-- Cart (Unchanged SVG and Badge as requested) -->
            <a href="#" class="text-black/90 hover:text-brand-red transition-colors flex items-center relative pr-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-[26px] h-[26px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              <!-- Badge -->
              <span class="absolute -top-1 -right-1 bg-brand-red text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-white leading-none">0</span>
            </a>
          </div>

        </div>`;

if (content.includes(oldSection)) {
    content = content.replace(oldSection, newSection);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Header right section updated.");
} else {
    console.log("Could not find the old right section.");
}
