const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const oldUtilityBar = `  <!-- 0. แถบ Utility ด้านบนสุด (สไตล์ BaNANA) -->
  <div class="w-full bg-[#F5F5F5] hidden md:block relative z-[60]">
    <div class="max-w-[1360px] mx-auto px-4 md:px-8 lg:px-12 h-10 flex items-center justify-end text-[12px] text-black/90 font-medium gap-4">
      <a href="#" class="hover:text-brand-red transition-all">เกี่ยวกับเรา</a>
      <span class="text-gray-400 font-light">|</span>
      <a href="#" class="hover:text-brand-red transition-all">วิธีการสั่งซื้อ/ขอใบเสนอราคา</a>
      <span class="text-gray-400 font-light">|</span>
      <a href="#" class="hover:text-brand-red transition-all">FAQ</a>
      <span class="text-gray-400 font-light">|</span>
      <a href="#" class="hover:text-brand-red transition-all">ติดต่อเรา</a>
      <span class="text-gray-400 font-light">|</span>`;

const newUtilityBar = `  <!-- 0. แถบ Utility ด้านบนสุด (สไตล์ BaNANA) -->
  <div class="w-full bg-[#F5F5F5] hidden md:block relative z-[60]">
    <div class="max-w-[1360px] mx-auto px-4 md:px-8 lg:px-12 h-10 flex items-center justify-end text-[12px] text-black/90 font-medium gap-4">
      <a href="#" class="hover:text-brand-red transition-all">วิธีการสั่งซื้อ/ขอใบเสนอราคา</a>
      <span class="text-gray-400 font-light">|</span>
      <a href="#" class="hover:text-brand-red transition-all">FAQ</a>
      <span class="text-gray-400 font-light">|</span>`;

if (content.includes(oldUtilityBar)) {
    content = content.replace(oldUtilityBar, newUtilityBar);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Top nav links removed.");
} else {
    console.log("Could not find top nav block.");
}
