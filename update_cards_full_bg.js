const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const oldCardsRegex = /<!-- Card 1 -->[\s\S]*?<!-- Card 8 -->[\s\S]*?<\/a>/g;

const newCards = `<!-- Card 1 -->
             <a href="#" class="rounded-[16px] md:rounded-[20px] hover:shadow-[0_10px_40px_rgba(0,0,0,0.15)] hover:-translate-y-1.5 transition-all duration-400 group relative overflow-hidden aspect-square block">
                <img src="/images/popular-categories/steel.png" class="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700" alt="เชื่อมเหล็ก">
                <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-transparent pointer-events-none"></div>
                <h3 class="text-white font-semibold text-[18px] md:text-[20px] lg:text-[22px] leading-tight absolute top-4 left-4 md:top-5 md:left-5 z-10">เชื่อมเหล็ก</h3>
             </a>

             <!-- Card 2 -->
             <a href="#" class="rounded-[16px] md:rounded-[20px] hover:shadow-[0_10px_40px_rgba(0,0,0,0.15)] hover:-translate-y-1.5 transition-all duration-400 group relative overflow-hidden aspect-square block">
                <img src="/images/popular-categories/stainless.png" class="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700" alt="เชื่อมสแตนเลส">
                <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-transparent pointer-events-none"></div>
                <h3 class="text-white font-semibold text-[18px] md:text-[20px] lg:text-[22px] leading-tight absolute top-4 left-4 md:top-5 md:left-5 z-10">เชื่อมสแตนเลส</h3>
             </a>

             <!-- Card 3 -->
             <a href="#" class="rounded-[16px] md:rounded-[20px] hover:shadow-[0_10px_40px_rgba(0,0,0,0.15)] hover:-translate-y-1.5 transition-all duration-400 group relative overflow-hidden aspect-square block">
                <img src="/images/popular-categories/aluminum.png" class="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700" alt="เชื่อมอลูมิเนียม">
                <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-transparent pointer-events-none"></div>
                <h3 class="text-white font-semibold text-[18px] md:text-[20px] lg:text-[22px] leading-tight absolute top-4 left-4 md:top-5 md:left-5 z-10">เชื่อมอลูมิเนียม</h3>
             </a>

             <!-- Card 4 -->
             <a href="#" class="rounded-[16px] md:rounded-[20px] hover:shadow-[0_10px_40px_rgba(0,0,0,0.15)] hover:-translate-y-1.5 transition-all duration-400 group relative overflow-hidden aspect-square block">
                <img src="/images/popular-categories/cast-iron.png" class="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700" alt="เชื่อมเหล็กหล่อ">
                <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-transparent pointer-events-none"></div>
                <h3 class="text-white font-semibold text-[18px] md:text-[20px] lg:text-[22px] leading-tight absolute top-4 left-4 md:top-5 md:left-5 z-10">เชื่อมเหล็กหล่อ</h3>
             </a>

             <!-- Card 5 -->
             <a href="#" class="rounded-[16px] md:rounded-[20px] hover:shadow-[0_10px_40px_rgba(0,0,0,0.15)] hover:-translate-y-1.5 transition-all duration-400 group relative overflow-hidden aspect-square block">
                <img src="/images/popular-categories/brass-copper.png" class="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700" alt="เชื่อมทองเหลือง-ทองแดง">
                <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-transparent pointer-events-none"></div>
                <h3 class="text-white font-semibold text-[18px] md:text-[20px] lg:text-[22px] leading-tight absolute top-4 left-4 md:top-5 md:left-5 z-10 pr-4">เชื่อมทองเหลือง<br>ทองแดง</h3>
             </a>

             <!-- Card 6 -->
             <a href="#" class="rounded-[16px] md:rounded-[20px] hover:shadow-[0_10px_40px_rgba(0,0,0,0.15)] hover:-translate-y-1.5 transition-all duration-400 group relative overflow-hidden aspect-square block">
                <img src="/images/popular-categories/hardfacing.png" class="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700" alt="เชื่อมพอกผิวแข็ง">
                <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-transparent pointer-events-none"></div>
                <h3 class="text-white font-semibold text-[18px] md:text-[20px] lg:text-[22px] leading-tight absolute top-4 left-4 md:top-5 md:left-5 z-10">เชื่อมพอกผิวแข็ง</h3>
             </a>

             <!-- Card 7 -->
             <a href="#" class="rounded-[16px] md:rounded-[20px] hover:shadow-[0_10px_40px_rgba(0,0,0,0.15)] hover:-translate-y-1.5 transition-all duration-400 group relative overflow-hidden aspect-square block">
                <img src="/images/popular-categories/gouging.png" class="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700" alt="เชื่อมตัดเซาะร่อง">
                <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-transparent pointer-events-none"></div>
                <h3 class="text-white font-semibold text-[18px] md:text-[20px] lg:text-[22px] leading-tight absolute top-4 left-4 md:top-5 md:left-5 z-10">เชื่อมตัดเซาะร่อง</h3>
             </a>

             <!-- Card 8 -->
             <a href="#" class="rounded-[16px] md:rounded-[20px] hover:shadow-[0_10px_40px_rgba(0,0,0,0.15)] hover:-translate-y-1.5 transition-all duration-400 group relative overflow-hidden aspect-square block">
                <img src="/images/popular-categories/special-alloys.png" class="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700" alt="เชื่อมวัสดุเกรดพิเศษ">
                <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-transparent pointer-events-none"></div>
                <h3 class="text-white font-semibold text-[18px] md:text-[20px] lg:text-[22px] leading-tight absolute top-4 left-4 md:top-5 md:left-5 z-10">เชื่อมวัสดุเกรดพิเศษ</h3>
             </a>`;

content = content.replace(oldCardsRegex, newCards);
fs.writeFileSync('frontend/src/main.js', content, 'utf8');
console.log("Cards updated to full background image style.");
