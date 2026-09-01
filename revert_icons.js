const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const regex = /<div id="dock-default-state" class="absolute inset-0 w-full h-full flex items-center justify-between px-7 md:px-9 transition-all duration-\[500ms\] ease-\[cubic-bezier\(0\.16,1,0\.3,1\)\] opacity-100 transform translate-x-0">[\s\S]*?(?=<!-- State 2: Expanded AI Input)/;

const newHTML = `<div id="dock-default-state" class="absolute inset-0 w-full h-full flex items-center justify-between px-7 md:px-9 transition-all duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] opacity-100 transform translate-x-0">
        <!-- Item 1: ถาม UDO AI -->
        <a href="#" id="dock-ai-btn" class="flex flex-col items-center justify-center group cursor-pointer h-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 md:w-[26px] md:h-[26px] group-hover:-translate-y-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke-width="1.4">
            <path stroke="#71C04C" stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            <path stroke="#E12427" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M19.128 6.554l-.45-1.554-.45 1.554a2.25 2.25 0 00-1.554 1.554l-1.554.45 1.554.45a2.25 2.25 0 001.554 1.554l.45 1.554.45-1.554a2.25 2.25 0 001.554-1.554l1.554-.45-1.554-.45a2.25 2.25 0 00-1.554-1.554z" />
          </svg>
          <span class="text-[13px] md:text-[14px] mt-1 font-semibold text-gray-800 group-hover:text-brand-red transition-colors whitespace-nowrap tracking-tight leading-normal">ถาม UDO AI</span>
        </a>

        <!-- Divider -->
        <div class="w-[1px] h-[28px] bg-gray-200"></div>

        <!-- Item 2: โทรเช็กสต็อก -->
        <a href="#" class="flex flex-col items-center justify-center group h-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 md:w-[26px] md:h-[26px] group-hover:-translate-y-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke-width="1.4">
            <path stroke="#71C04C" stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.25-3.95-6.847-6.847l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
          </svg>
          <span class="text-[13px] md:text-[14px] mt-1 font-semibold text-gray-800 group-hover:text-brand-red transition-colors whitespace-nowrap tracking-tight leading-normal">โทรเช็กสต็อก</span>
        </a>

        <!-- Divider -->
        <div class="w-[1px] h-[28px] bg-gray-200"></div>

        <!-- Item 3: ขอใบเสนอราคา -->
        <a href="#" class="flex flex-col items-center justify-center group h-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 md:w-[26px] md:h-[26px] group-hover:-translate-y-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke-width="1.4">
            <path stroke="#71C04C" stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            <path stroke="#E12427" stroke-linecap="round" stroke-linejoin="round" d="M15 11.25h.008v.008H15v-.008z" />
          </svg>
          <span class="text-[13px] md:text-[14px] mt-1 font-semibold text-gray-800 group-hover:text-brand-red transition-colors whitespace-nowrap tracking-tight leading-normal">ขอใบเสนอราคา</span>
        </a>
      </div>

      `;

if (content.match(regex)) {
    content = content.replace(regex, newHTML);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Reverted icons successfully.");
} else {
    console.log("Could not find HTML State 1 to replace.");
}
