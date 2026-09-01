const fs = require('fs');
let js = fs.readFileSync('frontend/src/mock_database.js', 'utf8');
const jsonStr = js.replace('export const mockDatabase = ', '').replace('// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\n', '').trim().replace(/;$/, '');
let db = JSON.parse(jsonStr);

// Overwrite the 5th product (Index 4)
db[4] = {
  "id": "powerweld-coremax-71gs",
  "name": "ลวดเชื่อมฟลักซ์คอร์ไวร์ POWERWELD COREMAX-71GS",
  "brand": "POWERWELD",
  "sku": "COREMAX-71GS",
  // คลีนเนื้อหา แก้คำผิด ส่วยงาม->สวยงาม, ฟลักซ์คอลล์->ฟลักซ์คอร์ ตัดคำว่าม้วนละ 1 กก. ออกเพราะมีในตัวเลือกแล้ว
  "description": "ลวดเชื่อมฟลักซ์คอร์ไวร์ POWERWELD SELFSHIELD COREMAX-71GS ชนิดไม่ต้องใช้แก๊สปกคลุม (Self-Shielded) เหมาะสำหรับงานเชื่อมเหล็กทั่วไปและงาน DIY สะดวกต่อการทำงาน ให้แนวเชื่อมที่สมบูรณ์สวยงาม ปราศจากฟองอากาศ คุณภาพเทียบเท่าลวดฟลักซ์คอร์ทั่วไปที่ต้องใช้แก๊สปกคลุม",
  "created_at": "2026-08-27T10:00:00Z",
  "sold_count": 520,
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
  "tags": ["ไม่ต้องใช้แก๊ส", "ฟลักซ์คอร์", "งาน DIY"],
  "images": [
    "https://www.udo.co.th/storage/products/June2020/XxV421nVTISf7RoCDHeb.jpg"
  ],
  "warranty": null,
  // ใช้ระบบ Two-Tier ตามรูปภาพ
  "variants": [
    { "size": "0.8 mm", "package": "1 ม้วน (1 กก.)", "price": 180.00, "original_price": null, "stock": 50 },
    { "size": "1.0 mm", "package": "1 ม้วน (1 กก.)", "price": 180.00, "original_price": null, "stock": 600 }
  ],
  "specsTable": [
    { "key": "คุณสมบัติเด่น", "value": "ไม่ต้องใช้แก๊สปกคลุม (Self-Shielded), ปราศจากฟองอากาศ" },
    { "key": "ลักษณะการใช้งาน", "value": "งานเชื่อมเหล็กทั่วไป, งาน DIY ที่ต้องการความคล่องตัว" },
    { "key": "ความคุ้มค่า", "value": "ม้วนขนาด 1 กิโลกรัม พอดีกับการใช้งาน ไม่ต้องเหลือทิ้ง" }
  ],
  "richContent": {
    "headline": null,
    "subheadline": null,
    "description": null,
    "image1": "https://www.udo.co.th/storage/products/June2020/COREMAX-71GS%20%20DATA%20SHEET.png",
    "image2": null,
    "image3": null
  }
};

const newJs = `// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\nexport const mockDatabase = ${JSON.stringify(db, null, 2)};\n`;
fs.writeFileSync('frontend/src/mock_database.js', newJs, 'utf8');
console.log("Updated POWERWELD COREMAX-71GS successfully");
