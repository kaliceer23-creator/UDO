const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

// 1. Remove the contact box from Col 1
const contactBoxRegex = /<!-- Contact & Hours Box -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
// Wait, regex might be tricky if it matches too much. Let's do string replacement.
const col1Start = `        <!-- Col 1 -->
        <div class="lg:col-span-2 flex flex-col">
          <a href="/" class="block mb-4">
            <img src="/images/logo.png" alt="UDO Welding Wire Center" class="h-10 md:h-12 w-auto object-contain" />
          </a>
          <p class="text-gray-900 text-[13.5px] leading-relaxed mb-4">
            ผู้จัดจำหน่ายลวดเชื่อมและอุปกรณ์งานเชื่อม สำหรับโรงงานอุตสาหกรรมและช่างเชื่อมทั่วไป
          </p>
          <ul class="space-y-2 mb-6">
            <li class="flex items-center gap-2">
              <div class="w-4 h-4 rounded-full bg-brand-green/20 flex items-center justify-center shrink-0">
                <svg class="w-2.5 h-2.5 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <span class="text-gray-900 text-[13.5px]">ประสบการณ์มากกว่า 20 ปี</span>
            </li>
            <li class="flex items-center gap-2">
              <div class="w-4 h-4 rounded-full bg-brand-green/20 flex items-center justify-center shrink-0">
                <svg class="w-2.5 h-2.5 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <span class="text-gray-900 text-[13.5px]">จำหน่ายทั่วประเทศ</span>
            </li>
            <li class="flex items-center gap-2">
              <div class="w-4 h-4 rounded-full bg-brand-green/20 flex items-center justify-center shrink-0">
                <svg class="w-2.5 h-2.5 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <span class="text-gray-900 text-[13.5px]">จัดส่งรวดเร็ว</span>
            </li>
          </ul>

          <!-- Contact & Hours Box -->
          <div class="bg-gray-50 rounded-xl p-4 border border-gray-100 w-fit hover:border-gray-200 hover:shadow-sm transition-all">
            <!-- Phone Number -->
            <a href="tel:0628159999" class="flex items-center gap-2.5 group mb-3">
              <div class="w-8 h-8 rounded-full bg-brand-green/10 flex items-center justify-center group-hover:bg-brand-green transition-colors">
                <svg class="w-4 h-4 text-brand-green group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
              </div>
              <div>
                <div class="text-[11px] text-gray-900 font-medium uppercase tracking-wider mb-0.5">สายด่วนฝ่ายขาย</div>
                <div class="text-[15px] md:text-[15.5px] font-bold text-gray-900 group-hover:text-brand-green transition-colors">062-815-9999</div>
              </div>
            </a>
            
            <div class="h-px w-full bg-gray-200 mb-3"></div>

            <!-- Operating Hours -->
            <div class="text-[13px] md:text-[13.5px] text-gray-900">
              <span class="font-bold text-gray-900 flex items-center gap-1.5 mb-1">
                <svg class="w-4 h-4 text-brand-red shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                เวลาทำการ
              </span>
              ทุกวัน : 09.00 - 18.00 น.
            </div>
          </div>
        </div>`;

const newCol1 = `        <!-- Col 1 -->
        <div class="lg:col-span-2 flex flex-col">
          <a href="/" class="block mb-4">
            <img src="/images/logo.png" alt="UDO Welding Wire Center" class="h-10 md:h-12 w-auto object-contain" />
          </a>
          <p class="text-gray-900 text-[13.5px] leading-relaxed mb-4">
            ผู้จัดจำหน่ายลวดเชื่อมและอุปกรณ์งานเชื่อม สำหรับโรงงานอุตสาหกรรมและช่างเชื่อมทั่วไป
          </p>
          <ul class="space-y-2 mb-6">
            <li class="flex items-center gap-2">
              <div class="w-4 h-4 rounded-full bg-brand-green/20 flex items-center justify-center shrink-0">
                <svg class="w-2.5 h-2.5 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <span class="text-gray-900 text-[13.5px]">ประสบการณ์มากกว่า 20 ปี</span>
            </li>
            <li class="flex items-center gap-2">
              <div class="w-4 h-4 rounded-full bg-brand-green/20 flex items-center justify-center shrink-0">
                <svg class="w-2.5 h-2.5 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <span class="text-gray-900 text-[13.5px]">จำหน่ายทั่วประเทศ</span>
            </li>
            <li class="flex items-center gap-2">
              <div class="w-4 h-4 rounded-full bg-brand-green/20 flex items-center justify-center shrink-0">
                <svg class="w-2.5 h-2.5 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <span class="text-gray-900 text-[13.5px]">จัดส่งรวดเร็ว</span>
            </li>
          </ul>
        </div>`;

// 2. Add the Trust Bar before the grid
const gridStart = `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">`;
const trustBar = `      <!-- Trust Bar (Top Footer) -->
      <div class="border-b border-gray-200 pb-10 mb-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-gray-200">
          
          <!-- 1. Contact -->
          <div class="flex items-center gap-4 lg:px-8 first:lg:pl-0">
            <svg class="w-11 h-11 text-gray-800 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            <div class="flex flex-col">
              <span class="text-[17px] font-bold text-gray-900 mb-0.5">062-815-9999</span>
              <span class="text-[13px] text-gray-500">บริการทุกวัน 09.00 - 18.00 น.</span>
            </div>
          </div>

          <!-- 2. Expertise -->
          <div class="flex items-center gap-4 lg:px-8">
            <svg class="w-11 h-11 text-gray-800 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
            </svg>
            <div class="flex flex-col">
              <span class="text-[17px] font-bold text-gray-900 mb-0.5">สินค้าคุณภาพมาตรฐาน</span>
              <span class="text-[13px] text-gray-500">ทีมงานผู้เชี่ยวชาญให้คำปรึกษา</span>
            </div>
          </div>

          <!-- 3. Shipping -->
          <div class="flex items-center gap-4 lg:px-8">
            <svg class="w-11 h-11 text-gray-800 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 21a2 2 0 11-4 0 2 2 0 014 0zM20 21a2 2 0 11-4 0 2 2 0 014 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M4 19H2v-9a2 2 0 012-2h10a2 2 0 012 2v3m4 0h-4v6h4a2 2 0 002-2v-3l-2.5-3.5H16"/>
            </svg>
            <div class="flex flex-col">
              <span class="text-[17px] font-bold text-gray-900 mb-0.5">จัดส่งทั่วประเทศ</span>
              <span class="text-[13px] text-gray-500">รวดเร็ว ทันใจ ปลอดภัย</span>
            </div>
          </div>

          <!-- 4. Email -->
          <div class="flex items-center gap-4 lg:px-8">
            <svg class="w-11 h-11 text-gray-800 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <div class="flex flex-col">
              <span class="text-[17px] font-bold text-gray-900 mb-0.5">อีเมลถึงเรา</span>
              <span class="text-[13px] text-gray-500">ฝากข้อความได้ตลอด 24 ชม.</span>
            </div>
          </div>

        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">`;

if (content.includes(oldCol1) && content.includes(gridStart)) {
    content = content.replace(oldCol1, newCol1);
    content = content.replace(gridStart, trustBar);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Trust bar added successfully.");
} else {
    console.log("Could not find the target blocks to replace.");
}
