const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const gridStart = `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">`;
const trustBar = `      <!-- Trust Bar (Top Footer) -->
      <div class="border-b border-gray-200 pb-10 mb-10">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-gray-200">
          
          <!-- 1. Contact -->
          <div class="flex items-center gap-4 lg:px-8 first:lg:pl-0">
            <svg class="w-11 h-11 text-gray-900 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            <div class="flex flex-col">
              <span class="text-[16px] font-bold text-gray-900 mb-0.5">062-815-9999</span>
              <span class="text-[13px] text-gray-500">บริการทุกวัน 09.00 - 18.00 น.</span>
            </div>
          </div>

          <!-- 2. Expertise -->
          <div class="flex items-center gap-4 lg:px-8">
            <svg class="w-11 h-11 text-gray-900 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
            </svg>
            <div class="flex flex-col">
              <span class="text-[16px] font-bold text-gray-900 mb-0.5">สินค้าคุณภาพมาตรฐาน</span>
              <span class="text-[13px] text-gray-500">ทีมงานผู้เชี่ยวชาญให้คำปรึกษา</span>
            </div>
          </div>

          <!-- 3. Shipping -->
          <div class="flex items-center gap-4 lg:px-8">
            <svg class="w-11 h-11 text-gray-900 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 21a2 2 0 11-4 0 2 2 0 014 0zM20 21a2 2 0 11-4 0 2 2 0 014 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M4 19H2v-9a2 2 0 012-2h10a2 2 0 012 2v3m4 0h-4v6h4a2 2 0 002-2v-3l-2.5-3.5H16"/>
            </svg>
            <div class="flex flex-col">
              <span class="text-[16px] font-bold text-gray-900 mb-0.5">จัดส่งทั่วประเทศ</span>
              <span class="text-[13px] text-gray-500">รวดเร็ว ทันใจ ปลอดภัย</span>
            </div>
          </div>

          <!-- 4. Email -->
          <div class="flex items-center gap-4 lg:px-8">
            <svg class="w-11 h-11 text-gray-900 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <div class="flex flex-col">
              <span class="text-[16px] font-bold text-gray-900 mb-0.5">อีเมลถึงเรา</span>
              <span class="text-[13px] text-gray-500">udo@udo.co.th</span>
            </div>
          </div>

        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">`;

if (content.includes(gridStart)) {
    content = content.replace(gridStart, trustBar);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Trust bar inserted successfully.");
} else {
    console.log("Could not find gridStart.");
}
