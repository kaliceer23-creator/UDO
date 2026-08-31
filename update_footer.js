const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const oldGrid = `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">`;
const newGrid = `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-10">`;
content = content.replace(oldGrid, newGrid);

const oldCol1 = `        <!-- Col 1 -->
        <div class="flex flex-col">
          <!-- Logo -->
          <a href="/" class="shrink-0 mb-4 inline-block hover:opacity-80 transition-opacity w-fit">
            <img src="/images/logos/logo.svg" alt="UDO Welding Products" class="h-[42px] md:h-[52px] w-auto object-contain object-left" />
          </a>
          <!-- Operating Hours -->
          <div class="mt-2 text-[13px] md:text-[14px] text-gray-800 leading-[1.8]">
            <p class="mb-2"><span class="font-bold text-gray-900">เวลาทำการ UDO Call Center :</span> วันจันทร์ - วันอาทิตย์ 09.00-18.00 น.</p>
            <p class="mb-0"><span class="font-bold text-gray-900">เวลาจัดส่งสินค้า :</span> จันทร์ - เสาร์ 08:30 - 17:30 น.</p>
          </div>
        </div>`;

const newCol1 = `        <!-- Col 1 -->
        <div class="flex flex-col lg:col-span-2 pr-0 lg:pr-8">
          <!-- Logo -->
          <a href="/" class="shrink-0 mb-4 inline-block hover:opacity-80 transition-opacity w-fit">
            <img src="/images/logos/logo.svg" alt="UDO Welding Products" class="h-[42px] md:h-[52px] w-auto object-contain object-left" />
          </a>
          
          <!-- Brand Description -->
          <p class="text-gray-600 text-[13.5px] md:text-[14.5px] leading-relaxed mb-4">
            ผู้จัดจำหน่ายลวดเชื่อมและอุปกรณ์งานเชื่อม สำหรับโรงงานอุตสาหกรรมและช่างเชื่อมทั่วไป
          </p>

          <!-- Bullet Points -->
          <ul class="flex flex-col gap-2 mb-6 text-[13.5px] md:text-[14.5px] text-gray-700 font-medium">
            <li class="flex items-center gap-2">
              <svg class="w-4 h-4 text-brand-green shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
              ประสบการณ์มากกว่า 20 ปี
            </li>
            <li class="flex items-center gap-2">
              <svg class="w-4 h-4 text-brand-green shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
              จำหน่ายทั่วประเทศ
            </li>
            <li class="flex items-center gap-2">
              <svg class="w-4 h-4 text-brand-green shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
              จัดส่งรวดเร็ว
            </li>
          </ul>

          <!-- Operating Hours -->
          <div class="text-[13px] md:text-[14px] text-gray-800 leading-[1.8] bg-gray-50 rounded-xl p-4 border border-gray-100 w-fit">
            <p class="mb-0">
              <span class="font-bold text-gray-900 flex items-center gap-1.5 mb-1">
                <svg class="w-4 h-4 text-brand-red shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                เวลาทำการฝ่ายบริการลูกค้า
              </span>
              ทุกวัน : 09.00 - 18.00 น.
            </p>
          </div>
        </div>`;

if (content.includes(oldCol1)) {
    content = content.replace(oldCol1, newCol1);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Footer updated successfully.");
} else {
    console.log("Could not find Col 1 in footer.");
}
