const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const oldCol4 = `        <!-- Col 4 (เดิม Col 3) -->
        <div class="flex flex-col gap-2.5">
          <h3 class="font-bold text-gray-900 text-[14px] mb-1">บริการ</h3>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">ขั้นตอนการสั่งซื้อบน UDO.co.th แบบง่ายๆ</a>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">ใช้จ่ายผ่านช่องทางต่างๆ</a>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">การจัดส่งสินค้า</a>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">บริการหน้าโรงงาน</a>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">นโยบายการรับประกันและการเคลม</a>
        </div>`;

const newCol4 = `        <!-- Col 4 (เดิม Col 3) -->
        <div class="flex flex-col gap-2.5">
          <h3 class="font-bold text-gray-900 text-[14px] mb-1">บริการ</h3>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">ขั้นตอนการสั่งซื้อบน UDO.co.th แบบง่ายๆ</a>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">การจัดส่งสินค้า</a>
        </div>`;

if (content.includes(oldCol4)) {
    content = content.replace(oldCol4, newCol4);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Removed the requested links from Col 4.");
} else {
    console.log("Could not find the Services column block.");
}
