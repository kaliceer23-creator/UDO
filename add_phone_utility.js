const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const oldNav = `<div class="w-full bg-[#F5F5F5] hidden md:block relative z-[60]">
    <div class="max-w-[1360px] mx-auto px-4 md:px-8 lg:px-12 h-10 flex items-center justify-end text-[12px] text-black/90 font-medium gap-4">
      <a href="#" class="hover:text-brand-red transition-all">วิธีการสั่งซื้อ/ขอใบเสนอราคา</a>
      <span class="text-gray-400 font-light">|</span>
      <a href="#" class="hover:text-brand-red transition-all">FAQ</a>
      <span class="text-gray-400 font-light">|</span>
      
      <!-- ตัวเลือกภาษา (Language Switcher) -->
      <div class="flex items-center gap-1 cursor-pointer hover:text-brand-red group">
        <span class="font-medium text-black/90 group-hover:text-brand-red">TH</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-gray-500 group-hover:text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </div>
  </div>`;

const newNav = `<div class="w-full bg-[#F5F5F5] hidden md:block relative z-[60]">
    <div class="max-w-[1360px] mx-auto px-4 md:px-8 lg:px-12 h-10 flex items-center justify-between text-[12px] text-black/90 font-medium">
      
      <!-- Left side (Phone) -->
      <div class="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.273-3.973-6.869-6.87l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
        <span class="text-gray-600">ติดต่อสอบถาม:</span>
        <a href="tel:0628159999" class="hover:text-brand-red font-semibold transition-colors">062 815 9999</a>
      </div>

      <!-- Right side (Links) -->
      <div class="flex items-center gap-4">
        <a href="#" class="hover:text-brand-red transition-all">วิธีการสั่งซื้อ/ขอใบเสนอราคา</a>
        <span class="text-gray-400 font-light">|</span>
        <a href="#" class="hover:text-brand-red transition-all">FAQ</a>
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
  </div>`;

if (content.includes(oldNav)) {
    content = content.replace(oldNav, newNav);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Phone number added to the utility bar.");
} else {
    console.log("Could not find the utility bar block.");
}
