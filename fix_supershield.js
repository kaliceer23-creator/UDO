const fs = require('fs');
let js = fs.readFileSync('frontend/src/mock_database.js', 'utf8');
const jsonStr = js.replace('export const mockDatabase = ', '').replace('// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\n', '').trim().replace(/;$/, '');
let db = JSON.parse(jsonStr);

// Overwrite the 7th product (Index 6)
db[6] = {
  "id": "hyundai-supershield-11",
  "name": "ลวดเชื่อม Self-Shielded ฟลักซ์คอร์ไวร์ HYUNDAI SUPERSHIELD 11 (E71T-11)",
  "brand": "HYUNDAI",
  "sku": "SUPERSHIELD-11",
  // คลีนข้อความและแก้คำผิด ส่วยงาม->สวยงาม, ฟลักซ์คอลล์->ฟลักซ์คอร์
  "description": "ลวดเชื่อมฟลักซ์คอร์ไวร์ HYUNDAI SUPERSHIELD 11 (E71T-11) ชนิดไม่ต้องใช้แก๊สปกคลุม (Self-Shielded) สะดวกต่อการทำงาน ให้แนวเชื่อมที่สมบูรณ์สวยงามเทียบเท่าลวดฟลักซ์คอร์ทั่วไปที่ต้องใช้แก๊สปกคลุม เหมาะสำหรับงานเชื่อมเหล็กทั่วไป โครงสร้างอาคาร และสะพานทั่วไป",
  "created_at": "2026-08-29T10:00:00Z",
  "sold_count": 640,
  "collections": ["popular"],
  "categories": [
    { "level": 1, "name": "เครื่องมือช่างและฮาร์ดแวร์", "url_slug": "hardware" },
    { "level": 2, "name": "เครื่องเชื่อมและอุปกรณ์", "url_slug": "welding-equipment" },
    { "level": 3, "name": "ลวดเชื่อมฟลักซ์คอร์", "url_slug": "flux-cored-wire" }
  ],
  "filter_attributes": {
    "material": "เหล็ก",
    "process": "ลวดเชื่อมฟลักซ์คอร์ (FCAW)"
  },
  "tags": ["ฟลักซ์คอร์ไม่ใช้แก๊ส", "E71T-11", "งานโครงสร้าง"],
  "images": [
    "https://www.udo.co.th/storage/products/July2019/27HFJToerezVp382hqbG.jpg",
    "https://www.udo.co.th/storage/products/July2019/KpNKbKiF1MZoKh7WZVfl.jpg",
    "https://www.udo.co.th/storage/products/July2019/zvGa39H9j1McuUtllhFw.jpg"
  ],
  "warranty": null,
  // ข้อมูลดิบไม่ได้ระบุขนาด จึงใส่ขนาดมาตรฐานไปให้ก่อน
  "variants": [
    { "size": "0.8 mm", "package": "1 ม้วน (5 กก.)", "price": 990.00, "original_price": null, "stock": 20 },
    { "size": "0.9 mm", "package": "1 ม้วน (5 กก.)", "price": 990.00, "original_price": null, "stock": 50 },
    { "size": "1.2 mm", "package": "1 ม้วน (5 กก.)", "price": 990.00, "original_price": null, "stock": 35 }
  ],
  "specsTable": [
    { "key": "คุณสมบัติเด่น", "value": "ไม่ต้องใช้แก๊สปกคลุม (Self-Shielded)" },
    { "key": "การจำแนกประเภท", "value": "AWS A5.20 E71T-11" },
    { "key": "ลักษณะการใช้งาน", "value": "งานเชื่อมเหล็กทั่วไป, โครงสร้างอาคาร, สะพานทั่วไป" }
  ],
  "richContent": {
    "headline": null,
    "subheadline": null,
    "description": null,
    "image1": "https://www.udo.co.th/storage/products/April2019/Supershield11.jpg",
    "image2": null,
    "image3": null
  }
};

const newJs = `// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\nexport const mockDatabase = ${JSON.stringify(db, null, 2)};\n`;
fs.writeFileSync('frontend/src/mock_database.js', newJs, 'utf8');
console.log("Updated HYUNDAI SUPERSHIELD 11 successfully");
