const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const oldCopy = `    <!-- Copyright Bar -->
    <div class="bg-black text-white w-full border-t border-gray-800">
      <div class="max-w-[1360px] mx-auto px-4 md:px-8 xl:px-16 py-4 flex flex-col md:flex-row items-center justify-between text-[13px]">
        <div class="text-gray-300 mb-3 md:mb-0">
          © Copyright 2026 UDO Public Company Limited All Rights Reserved.
        </div>
        <div class="flex items-center gap-3 text-gray-300">
          <a href="#" class="hover:text-white transition-colors">ข้อกำหนดการใช้</a>
          <span class="text-gray-600">|</span>
          <a href="#" class="hover:text-white transition-colors">นโยบายความเป็นส่วนตัว</a>
          <span class="text-gray-600">|</span>
          <a href="#" class="hover:text-white transition-colors">การจัดการ Cookies</a>
        </div>
      </div>
    </div>`;

const newCopy = `    <!-- Copyright Bar -->
    <div class="bg-[#E12427] text-white w-full">
      <div class="max-w-[1360px] mx-auto px-4 md:px-8 xl:px-16 py-4 md:py-5 flex flex-col items-center justify-center text-[13px] md:text-[14px] text-center gap-1.5">
        <div class="font-medium text-white/95 tracking-wide">
          149 ถ. จันทน์ แขวงทุ่งวัดดอน เขตสาทร กรุงเทพมหานคร 10120
        </div>
        <div class="font-medium text-white/90 uppercase tracking-wider text-[12px] md:text-[13px]">
          Copyright &copy; 2019 UDO WELDING WIRE CENTER. All rights reserved.
        </div>
      </div>
    </div>`;

if (content.includes(oldCopy)) {
    content = content.replace(oldCopy, newCopy);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Copyright bar updated.");
} else {
    console.log("Could not find the copyright block.");
}
