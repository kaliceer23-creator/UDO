const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const regex = /      <\/div>\n    <\/div>\n  <\/div>\n  <\/div>\n\n  <!-- 3. พื้นที่เนื้อหาหลัก \(Main Content\) -->/;

const trustBarHTML = `      </div>
    </div>

    <!-- Mega Menu Trust Bar (Bottom Footer of Dropdown) -->
    <div class="w-full bg-[#fcfcfc] border-t border-gray-100">
      <div class="max-w-[1360px] mx-auto px-4 md:px-8 lg:px-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 lg:divide-x divide-gray-200 py-5">
          
          <!-- 1. Expertise (Trust) -->
          <div class="flex items-center justify-center gap-3.5 px-4 py-2 lg:py-1">
            <svg class="w-10 h-10 text-gray-900 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
            <div class="flex flex-col justify-center">
              <div class="text-[15px] font-bold text-gray-900 leading-snug">สินค้าคุณภาพมาตรฐาน</div>
              <div class="text-[13px] text-gray-800 leading-snug">ทีมงานผู้เชี่ยวชาญให้คำปรึกษา</div>
            </div>
          </div>

          <!-- 2. Shipping -->
          <div class="flex items-center justify-center gap-3.5 px-4 py-2 lg:py-1">
            <svg class="w-10 h-10 text-gray-900 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 21a2 2 0 11-4 0 2 2 0 014 0zM20 21a2 2 0 11-4 0 2 2 0 014 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M4 19H2v-9a2 2 0 012-2h10a2 2 0 012 2v3m4 0h-4v6h4a2 2 0 002-2v-3l-2.5-3.5H16"/>
            </svg>
            <div class="flex flex-col justify-center">
              <div class="text-[15px] font-bold text-gray-900 leading-snug">จัดส่งทั่วประเทศ</div>
              <div class="text-[13px] text-gray-800 leading-snug">รวดเร็ว ทันใจ ปลอดภัย</div>
            </div>
          </div>

          <!-- 3. Contact (Phone) -->
          <div class="flex items-center justify-center gap-3.5 px-4 py-2 lg:py-1">
            <svg class="w-10 h-10 text-gray-900 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            <div class="flex flex-col justify-center">
              <div class="text-[15px] font-bold text-gray-900 leading-snug">062-815-9999</div>
              <div class="text-[13px] text-gray-800 leading-snug">บริการทุกวัน 09.00 - 18.00 น.</div>
            </div>
          </div>

          <!-- 4. Email -->
          <div class="flex items-center justify-center gap-3.5 px-4 py-2 lg:py-1">
            <svg class="w-10 h-10 text-gray-900 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <div class="flex flex-col justify-center">
              <div class="text-[15px] font-bold text-gray-900 leading-snug">ส่งอีเมล</div>
              <div class="text-[13px] text-gray-800 leading-snug">ถึงเรา</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
  </div>

  <!-- 3. พื้นที่เนื้อหาหลัก (Main Content) -->`;

if (content.match(regex)) {
    content = content.replace(regex, trustBarHTML);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Injected Mega Menu Trust Bar successfully.");
} else {
    console.log("Target string not found.");
}
