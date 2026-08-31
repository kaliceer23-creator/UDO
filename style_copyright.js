const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const oldCopy = `    <!-- Copyright Bar -->
    <div class="bg-black text-white w-full border-t border-gray-800">
      <div class="max-w-[1360px] mx-auto px-4 md:px-8 xl:px-16 py-4 flex flex-col xl:flex-row items-center justify-between text-[13px]">
        <div class="text-gray-300 mb-3 xl:mb-0 text-center xl:text-left">
          149 ถ. จันทน์ แขวงทุ่งวัดดอน เขตสาทร กรุงเทพมหานคร 10120 <span class="hidden md:inline mx-1">|</span><br class="block md:hidden"> Copyright &copy; 2019 UDO WELDING WIRE CENTER. All rights reserved.
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
    <div class="bg-black text-white w-full border-t border-gray-800">
      <div class="max-w-[1360px] mx-auto px-4 md:px-8 xl:px-16 py-4 flex flex-col md:flex-row items-center justify-between text-[13px] gap-2 md:gap-0">
        <div class="text-gray-300 text-center md:text-left">
          Copyright &copy; 2019 UDO WELDING WIRE CENTER. All rights reserved.
        </div>
        <div class="text-gray-300 text-center md:text-right">
          149 ถ. จันทน์ แขวงทุ่งวัดดอน เขตสาทร กรุงเทพมหานคร 10120
        </div>
      </div>
    </div>`;

if (content.includes(oldCopy)) {
    content = content.replace(oldCopy, newCopy);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Updated to split layout on black background.");
} else {
    console.log("Could not find the copyright block to replace.");
}
