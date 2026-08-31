const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const navStart = '<nav class="w-full bg-brand-green h-[38px] md:h-[44px] relative z-50 overflow-x-auto lg:overflow-visible no-scrollbar">';
const navEnd = '  </nav>';
const startIndex = content.indexOf(navStart);
const endIndex = content.indexOf(navEnd, startIndex) + navEnd.length;

if (startIndex !== -1 && endIndex !== -1) {
    const newNav = `<nav class="w-full bg-brand-green h-[38px] md:h-[44px] relative z-50 overflow-x-auto lg:overflow-visible no-scrollbar">
    <div class="max-w-[1360px] mx-auto px-4 md:px-8 lg:px-12 relative h-full flex items-center justify-between">
      
      <!-- ปุ่มเลือกตามหมวดหมู่ (ฝั่งซ้าย) -->
      <div id="category-menu-btn" class="h-full flex items-center gap-2 text-white font-semibold text-[13.5px] md:text-[14px] cursor-pointer hover:bg-white/15 px-3 md:px-4 -ml-3 md:-ml-4 rounded-md transition-all shrink-0 select-none group">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-[17px] h-[17px] text-white transition-transform duration-200 group-hover:scale-105" viewBox="0 0 24 24" fill="currentColor">
          <path fill-rule="evenodd" d="M3 6a3 3 0 013-3h2.25a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9.75 0a3 3 0 013-3H18a3 3 0 013 3v2.25a3 3 0 01-3 3h-2.25a3 3 0 01-3-3V6zM3 15.75a3 3 0 013-3h2.25a3 3 0 013 3V18a3 3 0 01-3 3H6a3 3 0 01-3-3v-2.25zm9.75 0a3 3 0 013-3H18a3 3 0 013 3V18a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-2.25z" clip-rule="evenodd" />
        </svg>
        <span>เลือกตามหมวดหมู่</span>
        <svg id="category-menu-arrow" xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-white/80 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>

      <!-- เมนูตรงกลาง (Center Aligned) -->
      <div class="hidden lg:flex flex-1 justify-center h-full items-center gap-6 xl:gap-8 whitespace-nowrap">
        
        <a href="#" class="flex items-center gap-1.5 text-white hover:text-gray-200 font-medium transition-colors text-[13.5px] md:text-[14px]">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248z" clip-rule="evenodd" />
          </svg>
          โปรโมชั่น
        </a>

        <!-- Dropdown: สินค้า -->
        <div class="relative h-full flex items-center group/dropdown" tabindex="0">
          <div class="flex items-center gap-1 text-white group-hover/dropdown:text-gray-100 font-medium text-[13.5px] md:text-[14px] transition-colors h-full cursor-pointer">
            สินค้า
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-white/80 transition-transform group-hover/dropdown:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
          </div>
          <!-- Dropdown Box (คล้ายกล่อง ทั้งหมด) -->
          <div class="hidden group-hover/dropdown:block group-focus-within/dropdown:block absolute top-[100%] left-1/2 -translate-x-1/2 w-48 bg-white rounded-b-lg shadow-xl border-t-2 border-brand-red py-2 z-[60]">
            <a href="#" class="block px-5 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-brand-red text-[14px] font-medium transition-colors">ตู้เชื่อม/พลาสม่า</a>
            <a href="#" class="block px-5 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-brand-red text-[14px] font-medium transition-colors">ใบตัด/ใบเจียร</a>
            <a href="#" class="block px-5 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-brand-red text-[14px] font-medium transition-colors">เครื่องมือช่าง</a>
          </div>
          <span class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-r-[7px] border-b-[7px] border-l-transparent border-r-transparent border-b-brand-red opacity-0 group-hover/dropdown:opacity-100 transition-opacity z-[61]"></span>
        </div>

        <!-- Dropdown: กลุ่มลวดเชื่อม -->
        <div class="relative h-full flex items-center group/dropdown" tabindex="0">
          <div class="flex items-center gap-1 text-white group-hover/dropdown:text-gray-100 font-medium text-[13.5px] md:text-[14px] transition-colors h-full cursor-pointer">
            กลุ่มลวดเชื่อม
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-white/80 transition-transform group-hover/dropdown:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
          </div>
          <!-- Dropdown Box -->
          <div class="hidden group-hover/dropdown:block group-focus-within/dropdown:block absolute top-[100%] left-1/2 -translate-x-1/2 w-56 bg-white rounded-b-lg shadow-xl border-t-2 border-brand-red py-2 z-[60]">
            <a href="#" class="block px-5 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-brand-red text-[14px] font-medium transition-colors">ลวดเชื่อมเหล็กเหนียว</a>
            <a href="#" class="block px-5 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-brand-red text-[14px] font-medium transition-colors">ลวดเชื่อมสเตนเลส</a>
            <a href="#" class="block px-5 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-brand-red text-[14px] font-medium transition-colors">ลวดเชื่อมอลูมิเนียม</a>
          </div>
          <span class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-r-[7px] border-b-[7px] border-l-transparent border-r-transparent border-b-brand-red opacity-0 group-hover/dropdown:opacity-100 transition-opacity z-[61]"></span>
        </div>

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

      </div>

      <!-- บล็อกสมดุลฝั่งขวา (Invisible Spacer) เพื่อให้เมนูกลางอยู่ตรงกลางจริงๆ -->
      <div class="hidden lg:block w-[140px] xl:w-[160px] shrink-0 pointer-events-none"></div>

    </div>
  </nav>`;
    
    let newContent = content.slice(0, startIndex) + newNav + content.slice(endIndex);
    fs.writeFileSync('frontend/src/main.js', newContent, 'utf8');
    console.log("Navbar centered and dropdowns added!");
} else {
    console.log("Markers not found");
}
