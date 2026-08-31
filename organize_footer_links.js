const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const oldCol3_4 = `        <!-- Col 3 (เดิม Col 2) -->
        <div class="flex flex-col gap-2.5">
          <h3 class="font-bold text-gray-900 text-[14px] mb-1">เกี่ยวกับ UDO</h3>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">ติดต่อเรา</a>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">เกี่ยวกับ UDO.co.th</a>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">สมัครสมาชิก UDO PLUS</a>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">ข้อกำหนดและเงื่อนไข</a>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">ร่วมงานกับเรา</a>
        </div>

        <!-- Col 4 (เดิม Col 3) -->
        <div class="flex flex-col gap-2.5">
          <h3 class="font-bold text-gray-900 text-[14px] mb-1">บริการ</h3>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">ขั้นตอนการสั่งซื้อบน UDO.co.th แบบง่ายๆ</a>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">การจัดส่งสินค้า</a>
        </div>`;

const newCol3_4 = `        <!-- Col 3 -->
        <div class="flex flex-col gap-2.5">
          <h3 class="font-bold text-gray-900 text-[14px] mb-1">เกี่ยวกับ UDO</h3>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">เกี่ยวกับเรา</a>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">ติดต่อเรา</a>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">ข้อตกลงและเงื่อนไข</a>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">นโยบายความเป็นส่วนตัว</a>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">นโยบายคุกกี้</a>
        </div>

        <!-- Col 4 -->
        <div class="flex flex-col gap-2.5">
          <h3 class="font-bold text-gray-900 text-[14px] mb-1">บริการลูกค้า</h3>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">ขั้นตอนการสั่งซื้อบน UDO.co.th แบบง่ายๆ</a>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">ขอใบเสนอราคา</a>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">การจัดส่งสินค้า</a>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">คำถามที่พบบ่อย</a>
        </div>`;

if (content.includes(oldCol3_4)) {
    content = content.replace(oldCol3_4, newCol3_4);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Organized Col 3 and Col 4 perfectly.");
} else {
    console.log("Could not find the target blocks.");
}
