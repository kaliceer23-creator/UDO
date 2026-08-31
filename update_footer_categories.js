const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const oldCol2 = `        <!-- Col 2: หมวดหมู่สินค้า -->
        <div class="flex flex-col gap-2.5">
          <h3 class="font-bold text-gray-900 text-[14px] mb-1">หมวดหมู่สินค้า</h3>
          <a href="#" class="text-gray-900 hover:text-brand-red text-[13.5px] transition-colors">ลวดเชื่อมเหล็ก</a>
          <a href="#" class="text-gray-900 hover:text-brand-red text-[13.5px] transition-colors">ลวดเชื่อมสแตนเลส</a>
          <a href="#" class="text-gray-900 hover:text-brand-red text-[13.5px] transition-colors">ลวดเชื่อมอลูมิเนียม</a>
          <a href="#" class="text-gray-900 hover:text-brand-red text-[13.5px] transition-colors">ลวดเชื่อมทองเหลือง / ทองแดง</a>
          <a href="#" class="text-gray-900 hover:text-brand-red text-[13.5px] transition-colors">ลวดเชื่อมเก๊าจ์</a>
          <a href="#" class="text-gray-900 hover:text-brand-red text-[13.5px] transition-colors">ลวดเชื่อมพอกผิวแข็ง</a>
          <a href="#" class="text-gray-900 hover:text-brand-red text-[13.5px] transition-colors">ลวดเชื่อมเหล็กหล่อ</a>
          <a href="#" class="text-gray-900 hover:text-brand-red text-[13.5px] transition-colors">ลวดเชื่อมโลหะผสมพิเศษ</a>
        </div>`;

const newCol2 = `        <!-- Col 2: หมวดหมู่สินค้า -->
        <div class="flex flex-col gap-2.5">
          <h3 class="font-bold text-gray-900 text-[14px] mb-1">หมวดหมู่สินค้า</h3>
          <a href="#" class="text-gray-900 hover:text-brand-red text-[13.5px] transition-colors">กลุ่มลวดเชื่อม</a>
          <a href="#" class="text-gray-900 hover:text-brand-red text-[13.5px] transition-colors">เครื่องเชื่อมและเครื่องตัดพลาสม่า</a>
          <a href="#" class="text-gray-900 hover:text-brand-red text-[13.5px] transition-colors">อุปกรณ์เชื่อมตัดเผาแก๊ส</a>
          <a href="#" class="text-gray-900 hover:text-brand-red text-[13.5px] transition-colors">ท่อบรรจุก๊าซและวาล์ว</a>
          <a href="#" class="text-gray-900 hover:text-brand-red text-[13.5px] transition-colors">ใบตัดใบเจียร</a>
          <a href="#" class="text-gray-900 hover:text-brand-red text-[13.5px] transition-colors">อะไหล่สิ้นเปลือง เครื่องเชื่อม-พลาสม่า</a>
          <a href="#" class="text-gray-900 hover:text-brand-red text-[13.5px] transition-colors">วัสดุอุปกรณ์เคมีภัณฑ์สำหรับงานเชื่อม</a>
          <a href="#" class="text-gray-900 hover:text-brand-red text-[13.5px] transition-colors">เครื่องมือช่าง</a>
        </div>`;

if (content.includes(oldCol2)) {
    content = content.replace(oldCol2, newCol2);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Updated footer categories successfully.");
} else {
    console.log("Could not find the old Col 2.");
}
