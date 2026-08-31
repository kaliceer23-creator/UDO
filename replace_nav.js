const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const startMarker = '      <!-- หมวดหมู่พิเศษ (โปรโมชั่น - ไม่มีกรอบขาวแล้ว) -->';
const endMarker = '    </div>\n  </nav>';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
    const newLinks = `      <!-- เมนูใหม่ตามคำสั่ง -->
      <a href="#" class="flex items-center gap-1.5 text-white hover:text-gray-200 font-medium transition-colors text-[13.5px] md:text-[14px]">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path fill-rule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248z" clip-rule="evenodd" />
        </svg>
        โปรโมชั่น
      </a>

      <a href="#" class="relative h-full flex items-center text-white hover:text-gray-100 font-medium text-[13.5px] md:text-[14px] transition-colors group">
        หน้าแรก
        <span class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-r-[7px] border-b-[7px] border-l-transparent border-r-transparent border-b-brand-red opacity-0 group-hover:opacity-100 transition-opacity"></span>
      </a>

      <a href="#" class="relative h-full flex items-center text-white hover:text-gray-100 font-medium text-[13.5px] md:text-[14px] transition-colors group">
        เกี่ยวกับเรา
        <span class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-r-[7px] border-b-[7px] border-l-transparent border-r-transparent border-b-brand-red opacity-0 group-hover:opacity-100 transition-opacity"></span>
      </a>

      <a href="#" class="relative h-full flex items-center text-white hover:text-gray-100 font-medium text-[13.5px] md:text-[14px] transition-colors group">
        บล็อก
        <span class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-r-[7px] border-b-[7px] border-l-transparent border-r-transparent border-b-brand-red opacity-0 group-hover:opacity-100 transition-opacity"></span>
      </a>

      <a href="#" class="relative h-full flex items-center text-white hover:text-gray-100 font-medium text-[13.5px] md:text-[14px] transition-colors group">
        ติดต่อเรา
        <span class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-r-[7px] border-b-[7px] border-l-transparent border-r-transparent border-b-brand-red opacity-0 group-hover:opacity-100 transition-opacity"></span>
      </a>

`;

    const newContent = content.slice(0, startIndex) + newLinks + content.slice(endIndex);
    fs.writeFileSync('frontend/src/main.js', newContent, 'utf8');
    console.log("Navbar links replaced successfully.");
} else {
    console.log("Could not find markers.");
}
