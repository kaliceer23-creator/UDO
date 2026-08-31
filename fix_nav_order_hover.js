const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const navStart = '      <!-- เมนูตรงกลาง (Center Aligned) -->';
const navEnd = '      <!-- บล็อกสมดุลฝั่งขวา';
const startIndex = content.indexOf(navStart);
const endIndex = content.indexOf(navEnd, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
    const newLinks = `      <!-- เมนูตรงกลาง (Center Aligned) -->
      <div class="hidden lg:flex flex-1 justify-center h-full items-center gap-8 lg:gap-10 xl:gap-12 whitespace-nowrap">
        
        <!-- มี V (Dropdown): เปลี่ยนตัวหนังสือเป็นสีแดง + เส้นใต้หนาสีแดงชิดขอบล่าง -->
        <div class="relative h-full flex items-center group cursor-pointer" tabindex="0">
          <!-- Text and Arrow -->
          <div class="flex items-center gap-1 text-white group-hover:text-brand-red font-medium text-[13.5px] md:text-[14px] transition-colors h-full px-1">
            กลุ่มลวดเชื่อม
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-white group-hover:text-brand-red transition-all duration-300 group-hover:-rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
          </div>
          
          <!-- Dropdown Box (8 Categories) -->
          <div class="hidden group-hover:block absolute top-[100%] left-1/2 -translate-x-1/2 w-[220px] bg-white rounded-b-lg shadow-[0_10px_40px_rgba(0,0,0,0.1)] py-2 z-[60]">
            <a href="#" class="block px-5 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-brand-red text-[14px] font-medium transition-colors">เชื่อมเหล็ก</a>
            <a href="#" class="block px-5 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-brand-red text-[14px] font-medium transition-colors">เชื่อมสเตนเลส</a>
            <a href="#" class="block px-5 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-brand-red text-[14px] font-medium transition-colors">เชื่อมอลูมิเนียม</a>
            <a href="#" class="block px-5 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-brand-red text-[14px] font-medium transition-colors">เชื่อมเหล็กหล่อ</a>
            <a href="#" class="block px-5 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-brand-red text-[14px] font-medium transition-colors">เชื่อมซีโอทู (MIG)</a>
            <a href="#" class="block px-5 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-brand-red text-[14px] font-medium transition-colors">เชื่อมอาร์กอน (TIG)</a>
            <a href="#" class="block px-5 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-brand-red text-[14px] font-medium transition-colors">เชื่อมพอกผิวแข็ง</a>
            <a href="#" class="block px-5 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-brand-red text-[14px] font-medium transition-colors">เชื่อมทังสเตน</a>
          </div>
          
          <!-- Thick Red Underline -->
          <span class="absolute bottom-0 left-0 w-full h-[3px] bg-brand-red opacity-0 group-hover:opacity-100 transition-opacity z-[61]"></span>
        </div>

        <!-- ไม่มี V: เปลี่ยนตัวหนังสือเป็นสีแดง ไม่มีเส้นใต้ -->
        <a href="#" class="h-full flex items-center gap-1.5 text-white hover:text-brand-red font-medium transition-colors text-[13.5px] md:text-[14px]">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248z" clip-rule="evenodd" />
          </svg>
          โปรโมชั่น
        </a>

        <a href="#" class="h-full flex items-center text-white hover:text-brand-red font-medium transition-colors text-[13.5px] md:text-[14px]">
          เกี่ยวกับเรา
        </a>

        <a href="#" class="h-full flex items-center text-white hover:text-brand-red font-medium transition-colors text-[13.5px] md:text-[14px]">
          บล็อก
        </a>

        <a href="#" class="h-full flex items-center text-white hover:text-brand-red font-medium transition-colors text-[13.5px] md:text-[14px]">
          ติดต่อเรา
        </a>

      </div>

`;
    
    let newContent = content.slice(0, startIndex) + newLinks + content.slice(endIndex);
    fs.writeFileSync('frontend/src/main.js', newContent, 'utf8');
    console.log("Navbar reordered and group hover fixed!");
} else {
    console.log("Markers not found");
}
