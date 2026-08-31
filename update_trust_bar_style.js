const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const oldTrustBarRegex = /      <!-- Trust Bar \(Top Footer\) -->[\s\S]*?<\/div>\n      <\/div>\n\n      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-10">/;

const newTrustBar = `      <!-- Trust Bar (Top Footer) -->
      <div class="border-b border-gray-200 mb-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 lg:divide-x divide-gray-200">
          
          <!-- 1. Contact -->
          <div class="flex items-center justify-center gap-3.5 py-8 px-4">
            <svg class="w-10 h-10 text-gray-900 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            <div>
              <div class="text-[15px] font-bold text-gray-900">062-815-9999</div>
              <div class="text-[13px] text-gray-800 mt-0.5">บริการทุกวัน 09.00 - 18.00 น.</div>
            </div>
          </div>

          <!-- 2. Expertise -->
          <div class="flex items-center justify-center gap-3.5 py-8 px-4">
            <svg class="w-10 h-10 text-gray-900 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
            </svg>
            <div>
              <div class="text-[15px] font-bold text-gray-900">สินค้าคุณภาพมาตรฐาน</div>
              <div class="text-[13px] text-gray-800 mt-0.5">ทีมงานผู้เชี่ยวชาญให้คำปรึกษา</div>
            </div>
          </div>

          <!-- 3. Shipping -->
          <div class="flex items-center justify-center gap-3.5 py-8 px-4">
            <svg class="w-10 h-10 text-gray-900 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 21a2 2 0 11-4 0 2 2 0 014 0zM20 21a2 2 0 11-4 0 2 2 0 014 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M4 19H2v-9a2 2 0 012-2h10a2 2 0 012 2v3m4 0h-4v6h4a2 2 0 002-2v-3l-2.5-3.5H16"/>
            </svg>
            <div>
              <div class="text-[15px] font-bold text-gray-900">จัดส่งทั่วประเทศ</div>
              <div class="text-[13px] text-gray-800 mt-0.5">รวดเร็ว ทันใจ ปลอดภัย</div>
            </div>
          </div>

          <!-- 4. Email -->
          <div class="flex items-center justify-center gap-3.5 py-8 px-4">
            <svg class="w-10 h-10 text-gray-900 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <div>
              <div class="text-[15px] font-bold text-gray-900">อีเมลถึงเรา</div>
              <div class="text-[13px] text-gray-800 mt-0.5">udo@udo.co.th</div>
            </div>
          </div>

        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-10">`;

if (content.match(oldTrustBarRegex)) {
    content = content.replace(oldTrustBarRegex, newTrustBar);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Updated Trust Bar to precisely match the reference style.");
} else {
    console.log("Could not find the Trust Bar to replace.");
}
