const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const regex = /        <!-- Normal Items \(No border, plain text, rounded hover effect\) -->[\s\S]*?      <\/div>\n\n      <!-- Right Content Area \(Subcategories\) -->/;

const newItems = `        <!-- Normal Items (No border, plain text, rounded hover effect) -->
        <a href="#" class="flex items-center justify-between px-4 py-2.5 mb-1.5 text-[#252525] hover:bg-brand-green hover:text-white font-normal text-[16px] rounded-lg transition-colors group">
          กลุ่มลวดเชื่อม
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
        </a>
        <a href="#" class="flex items-center justify-between px-4 py-2.5 mb-1.5 text-[#252525] hover:bg-brand-green hover:text-white font-normal text-[16px] rounded-lg transition-colors group">
          เครื่องเชื่อมและเครื่องตัดพลาสม่า
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
        </a>
        <a href="#" class="flex items-center justify-between px-4 py-2.5 mb-1.5 text-[#252525] hover:bg-brand-green hover:text-white font-normal text-[16px] rounded-lg transition-colors group">
          อุปกรณ์เชื่อมตัดเผาแก๊ส
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
        </a>
        <a href="#" class="flex items-center justify-between px-4 py-2.5 mb-1.5 text-[#252525] hover:bg-brand-green hover:text-white font-normal text-[16px] rounded-lg transition-colors group">
          ท่อบรรจุก๊าซและวาล์ว
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
        </a>
        <a href="#" class="flex items-center justify-between px-4 py-2.5 mb-1.5 text-[#252525] hover:bg-brand-green hover:text-white font-normal text-[16px] rounded-lg transition-colors group">
          ใบตัดใบเจียร
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
        </a>
        <a href="#" class="flex items-center justify-between px-4 py-2.5 mb-1.5 text-[#252525] hover:bg-brand-green hover:text-white font-normal text-[16px] rounded-lg transition-colors group">
          อะไหล่สิ้นเปลือง เครื่องเชื่อม-พลาสม่า
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
        </a>
        <a href="#" class="flex items-center justify-between px-4 py-2.5 mb-1.5 text-[#252525] hover:bg-brand-green hover:text-white font-normal text-[16px] rounded-lg transition-colors group">
          วัสดุอุปกรณ์เคมีภัณฑ์สำหรับงานเชื่อม
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
        </a>
        <a href="#" class="flex items-center justify-between px-4 py-2.5 mb-1.5 text-[#252525] hover:bg-brand-green hover:text-white font-normal text-[16px] rounded-lg transition-colors group">
          เครื่องมือช่าง
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
        </a>
      </div>

      <!-- Right Content Area (Subcategories) -->`;

if (content.match(regex)) {
    content = content.replace(regex, newItems);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Updated Mega Menu sidebar categories.");
} else {
    console.log("Target block not found.");
}
