const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

// 1. Replace the 8 Dropdown items
const oldDropdown = `<a href="#" class="block px-5 py-2.5 text-gray-800 hover:bg-gray-100 text-[14px] font-medium transition-colors">เชื่อมเหล็ก</a>
            <a href="#" class="block px-5 py-2.5 text-gray-800 hover:bg-gray-100 text-[14px] font-medium transition-colors">เชื่อมสเตนเลส</a>
            <a href="#" class="block px-5 py-2.5 text-gray-800 hover:bg-gray-100 text-[14px] font-medium transition-colors">เชื่อมอลูมิเนียม</a>
            <a href="#" class="block px-5 py-2.5 text-gray-800 hover:bg-gray-100 text-[14px] font-medium transition-colors">เชื่อมเหล็กหล่อ</a>
            <a href="#" class="block px-5 py-2.5 text-gray-800 hover:bg-gray-100 text-[14px] font-medium transition-colors">เชื่อมซีโอทู (MIG)</a>
            <a href="#" class="block px-5 py-2.5 text-gray-800 hover:bg-gray-100 text-[14px] font-medium transition-colors">เชื่อมอาร์กอน (TIG)</a>
            <a href="#" class="block px-5 py-2.5 text-gray-800 hover:bg-gray-100 text-[14px] font-medium transition-colors">เชื่อมพอกผิวแข็ง</a>
            <a href="#" class="block px-5 py-2.5 text-gray-800 hover:bg-gray-100 text-[14px] font-medium transition-colors">เชื่อมทังสเตน</a>`;

const newDropdown = `<a href="#" class="block px-5 py-2.5 text-gray-800 hover:bg-gray-100 text-[14px] font-medium transition-colors">เชื่อมเหล็ก</a>
            <a href="#" class="block px-5 py-2.5 text-gray-800 hover:bg-gray-100 text-[14px] font-medium transition-colors">เชื่อมสแตนเลส</a>
            <a href="#" class="block px-5 py-2.5 text-gray-800 hover:bg-gray-100 text-[14px] font-medium transition-colors">เชื่อมอลูมิเนียม</a>
            <a href="#" class="block px-5 py-2.5 text-gray-800 hover:bg-gray-100 text-[14px] font-medium transition-colors">เชื่อมเหล็กหล่อ</a>
            <a href="#" class="block px-5 py-2.5 text-gray-800 hover:bg-gray-100 text-[14px] font-medium transition-colors">เชื่อมทองเหลือง-ทองแดง</a>
            <a href="#" class="block px-5 py-2.5 text-gray-800 hover:bg-gray-100 text-[14px] font-medium transition-colors">เชื่อมพอกผิวแข็ง</a>
            <a href="#" class="block px-5 py-2.5 text-gray-800 hover:bg-gray-100 text-[14px] font-medium transition-colors">เชื่อมตัดเซาะร่อง</a>
            <a href="#" class="block px-5 py-2.5 text-gray-800 hover:bg-gray-100 text-[14px] font-medium transition-colors">เชื่อมวัสดุเกรดพิเศษ</a>`;

content = content.replace(oldDropdown, newDropdown);

// 2. Replace the Cards section entirely
const oldCards = `             <!-- Card 1 -->
             <a href="#" class="bg-white rounded-[16px] p-4 md:p-5 hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-400 group relative overflow-hidden aspect-square flex flex-col justify-between">
                <h3 class="text-gray-900 group-hover:text-brand-green transition-colors duration-300 font-semibold text-[18px] md:text-[22px] lg:text-[24px] leading-tight relative z-10 mt-1 ml-1 lg:mt-2 lg:ml-2">เชื่อมเหล็ก</h3>
                <div class="absolute bottom-0 right-0 w-[65%] h-[65%] flex items-end justify-end p-2">
                  <img src="https://via.placeholder.com/150/FFFFFF/9CA3AF?text=Steel" class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 origin-bottom-right" alt="เชื่อมเหล็ก">
                </div>
             </a>

             <!-- Card 2 -->
             <a href="#" class="bg-white rounded-[16px] p-4 md:p-5 hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-400 group relative overflow-hidden aspect-square flex flex-col justify-between">
                <h3 class="text-gray-900 group-hover:text-brand-green transition-colors duration-300 font-semibold text-[18px] md:text-[22px] lg:text-[24px] leading-tight relative z-10 mt-1 ml-1 lg:mt-2 lg:ml-2">เชื่อมสเตนเลส</h3>
                <div class="absolute bottom-0 right-0 w-[65%] h-[65%] flex items-end justify-end p-2">
                  <img src="https://via.placeholder.com/150/FFFFFF/9CA3AF?text=Stainless" class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 origin-bottom-right" alt="เชื่อมสเตนเลส">
                </div>
             </a>

             <!-- Card 3 -->
             <a href="#" class="bg-white rounded-[16px] p-4 md:p-5 hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-400 group relative overflow-hidden aspect-square flex flex-col justify-between">
                <h3 class="text-gray-900 group-hover:text-brand-green transition-colors duration-300 font-semibold text-[18px] md:text-[22px] lg:text-[24px] leading-tight relative z-10 mt-1 ml-1 lg:mt-2 lg:ml-2">เชื่อมอลูมิเนียม</h3>
                <div class="absolute bottom-0 right-0 w-[65%] h-[65%] flex items-end justify-end p-2">
                  <img src="https://via.placeholder.com/150/FFFFFF/9CA3AF?text=Aluminum" class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 origin-bottom-right" alt="เชื่อมอลูมิเนียม">
                </div>
             </a>

             <!-- Card 4 -->
             <a href="#" class="bg-white rounded-[16px] p-4 md:p-5 hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-400 group relative overflow-hidden aspect-square flex flex-col justify-between">
                <h3 class="text-gray-900 group-hover:text-brand-green transition-colors duration-300 font-semibold text-[18px] md:text-[22px] lg:text-[24px] leading-tight relative z-10 mt-1 ml-1 lg:mt-2 lg:ml-2 w-[70%]">เชื่อมเหล็กหล่อ</h3>
                <div class="absolute bottom-0 right-0 w-[65%] h-[65%] flex items-end justify-end p-2">
                  <img src="https://via.placeholder.com/150/FFFFFF/9CA3AF?text=CastIron" class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 origin-bottom-right" alt="เชื่อมเหล็กหล่อ">
                </div>
             </a>

             <!-- Card 5 -->
             <a href="#" class="bg-white rounded-[16px] p-4 md:p-5 hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-400 group relative overflow-hidden aspect-square flex flex-col justify-between">
                <h3 class="text-gray-900 group-hover:text-brand-green transition-colors duration-300 font-semibold text-[18px] md:text-[22px] lg:text-[24px] leading-tight relative z-10 mt-1 ml-1 lg:mt-2 lg:ml-2 w-[70%]">เชื่อมซีโอทู (MIG)</h3>
                <div class="absolute bottom-0 right-0 w-[65%] h-[65%] flex items-end justify-end p-2">
                  <img src="https://via.placeholder.com/150/FFFFFF/9CA3AF?text=MIG" class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 origin-bottom-right" alt="เชื่อมซีโอทู (MIG)">
                </div>
             </a>

             <!-- Card 6 -->
             <a href="#" class="bg-white rounded-[16px] p-4 md:p-5 hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-400 group relative overflow-hidden aspect-square flex flex-col justify-between">
                <h3 class="text-gray-900 group-hover:text-brand-green transition-colors duration-300 font-semibold text-[18px] md:text-[22px] lg:text-[24px] leading-tight relative z-10 mt-1 ml-1 lg:mt-2 lg:ml-2 w-[80%]">เชื่อมอาร์กอน (TIG)</h3>
                <div class="absolute bottom-0 right-0 w-[65%] h-[65%] flex items-end justify-end p-2">
                  <img src="https://via.placeholder.com/150/FFFFFF/9CA3AF?text=TIG" class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 origin-bottom-right" alt="เชื่อมอาร์กอน (TIG)">
                </div>
             </a>

             <!-- Card 7 -->
             <a href="#" class="bg-white rounded-[16px] p-4 md:p-5 hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-400 group relative overflow-hidden aspect-square flex flex-col justify-between">
                <h3 class="text-gray-900 group-hover:text-brand-green transition-colors duration-300 font-semibold text-[18px] md:text-[22px] lg:text-[24px] leading-tight relative z-10 mt-1 ml-1 lg:mt-2 lg:ml-2 w-[70%]">เชื่อมพอกผิวแข็ง</h3>
                <div class="absolute bottom-0 right-0 w-[65%] h-[65%] flex items-end justify-end p-2">
                  <img src="https://via.placeholder.com/150/FFFFFF/9CA3AF?text=Hardfacing" class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 origin-bottom-right" alt="เชื่อมพอกผิวแข็ง">
                </div>
             </a>

             <!-- Card 8 -->
             <a href="#" class="bg-white rounded-[16px] p-4 md:p-5 hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-400 group relative overflow-hidden aspect-square flex flex-col justify-between">
                <h3 class="text-gray-900 group-hover:text-brand-green transition-colors duration-300 font-semibold text-[18px] md:text-[22px] lg:text-[24px] leading-tight relative z-10 mt-1 ml-1 lg:mt-2 lg:ml-2 w-[70%]">เชื่อมทังสเตน</h3>
                <div class="absolute bottom-0 right-0 w-[65%] h-[65%] flex items-end justify-end p-2">
                  <img src="https://via.placeholder.com/150/FFFFFF/9CA3AF?text=Tungsten" class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 origin-bottom-right" alt="เชื่อมทังสเตน">
                </div>
             </a>`;

const newCards = `             <!-- Card 1 -->
             <a href="#" class="bg-white rounded-[16px] p-4 md:p-5 hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-400 group relative overflow-hidden aspect-square flex flex-col justify-between">
                <h3 class="text-gray-900 group-hover:text-brand-green transition-colors duration-300 font-semibold text-[18px] md:text-[22px] lg:text-[24px] leading-tight relative z-10 mt-1 ml-1 lg:mt-2 lg:ml-2">เชื่อมเหล็ก</h3>
                <div class="absolute bottom-0 right-0 w-[75%] h-[75%] flex items-end justify-end p-2">
                  <img src="/images/popular-categories/steel.png" class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 origin-bottom-right" alt="เชื่อมเหล็ก">
                </div>
             </a>

             <!-- Card 2 -->
             <a href="#" class="bg-white rounded-[16px] p-4 md:p-5 hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-400 group relative overflow-hidden aspect-square flex flex-col justify-between">
                <h3 class="text-gray-900 group-hover:text-brand-green transition-colors duration-300 font-semibold text-[18px] md:text-[22px] lg:text-[24px] leading-tight relative z-10 mt-1 ml-1 lg:mt-2 lg:ml-2 w-[80%]">เชื่อมสแตนเลส</h3>
                <div class="absolute bottom-0 right-0 w-[75%] h-[75%] flex items-end justify-end p-2">
                  <img src="/images/popular-categories/stainless.png" class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 origin-bottom-right" alt="เชื่อมสแตนเลส">
                </div>
             </a>

             <!-- Card 3 -->
             <a href="#" class="bg-white rounded-[16px] p-4 md:p-5 hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-400 group relative overflow-hidden aspect-square flex flex-col justify-between">
                <h3 class="text-gray-900 group-hover:text-brand-green transition-colors duration-300 font-semibold text-[18px] md:text-[22px] lg:text-[24px] leading-tight relative z-10 mt-1 ml-1 lg:mt-2 lg:ml-2 w-[80%]">เชื่อมอลูมิเนียม</h3>
                <div class="absolute bottom-0 right-0 w-[75%] h-[75%] flex items-end justify-end p-2">
                  <img src="/images/popular-categories/aluminum.png" class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 origin-bottom-right" alt="เชื่อมอลูมิเนียม">
                </div>
             </a>

             <!-- Card 4 -->
             <a href="#" class="bg-white rounded-[16px] p-4 md:p-5 hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-400 group relative overflow-hidden aspect-square flex flex-col justify-between">
                <h3 class="text-gray-900 group-hover:text-brand-green transition-colors duration-300 font-semibold text-[18px] md:text-[22px] lg:text-[24px] leading-tight relative z-10 mt-1 ml-1 lg:mt-2 lg:ml-2 w-[80%]">เชื่อมเหล็กหล่อ</h3>
                <div class="absolute bottom-0 right-0 w-[75%] h-[75%] flex items-end justify-end p-2">
                  <img src="/images/popular-categories/cast-iron.png" class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 origin-bottom-right" alt="เชื่อมเหล็กหล่อ">
                </div>
             </a>

             <!-- Card 5 -->
             <a href="#" class="bg-white rounded-[16px] p-4 md:p-5 hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-400 group relative overflow-hidden aspect-square flex flex-col justify-between">
                <h3 class="text-gray-900 group-hover:text-brand-green transition-colors duration-300 font-semibold text-[18px] md:text-[22px] lg:text-[24px] leading-tight relative z-10 mt-1 ml-1 lg:mt-2 lg:ml-2 w-[90%]">เชื่อมทองเหลือง<br>ทองแดง</h3>
                <div class="absolute bottom-0 right-0 w-[75%] h-[75%] flex items-end justify-end p-2">
                  <img src="/images/popular-categories/brass-copper.png" class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 origin-bottom-right" alt="เชื่อมทองเหลือง-ทองแดง">
                </div>
             </a>

             <!-- Card 6 -->
             <a href="#" class="bg-white rounded-[16px] p-4 md:p-5 hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-400 group relative overflow-hidden aspect-square flex flex-col justify-between">
                <h3 class="text-gray-900 group-hover:text-brand-green transition-colors duration-300 font-semibold text-[18px] md:text-[22px] lg:text-[24px] leading-tight relative z-10 mt-1 ml-1 lg:mt-2 lg:ml-2 w-[80%]">เชื่อมพอกผิวแข็ง</h3>
                <div class="absolute bottom-0 right-0 w-[75%] h-[75%] flex items-end justify-end p-2">
                  <img src="/images/popular-categories/hardfacing.png" class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 origin-bottom-right" alt="เชื่อมพอกผิวแข็ง">
                </div>
             </a>

             <!-- Card 7 -->
             <a href="#" class="bg-white rounded-[16px] p-4 md:p-5 hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-400 group relative overflow-hidden aspect-square flex flex-col justify-between">
                <h3 class="text-gray-900 group-hover:text-brand-green transition-colors duration-300 font-semibold text-[18px] md:text-[22px] lg:text-[24px] leading-tight relative z-10 mt-1 ml-1 lg:mt-2 lg:ml-2 w-[85%]">เชื่อมตัดเซาะร่อง</h3>
                <div class="absolute bottom-0 right-0 w-[75%] h-[75%] flex items-end justify-end p-2">
                  <img src="/images/popular-categories/gouging.png" class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 origin-bottom-right" alt="เชื่อมตัดเซาะร่อง">
                </div>
             </a>

             <!-- Card 8 -->
             <a href="#" class="bg-white rounded-[16px] p-4 md:p-5 hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-400 group relative overflow-hidden aspect-square flex flex-col justify-between">
                <h3 class="text-gray-900 group-hover:text-brand-green transition-colors duration-300 font-semibold text-[18px] md:text-[22px] lg:text-[24px] leading-tight relative z-10 mt-1 ml-1 lg:mt-2 lg:ml-2 w-[90%]">เชื่อมวัสดุเกรดพิเศษ</h3>
                <div class="absolute bottom-0 right-0 w-[75%] h-[75%] flex items-end justify-end p-2">
                  <img src="/images/popular-categories/special-alloys.png" class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 origin-bottom-right" alt="เชื่อมวัสดุเกรดพิเศษ">
                </div>
             </a>`;

content = content.replace(oldCards, newCards);

fs.writeFileSync('frontend/src/main.js', content, 'utf8');
console.log("Categories and Images updated.");
