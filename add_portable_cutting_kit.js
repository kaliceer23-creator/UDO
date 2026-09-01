const fs = require('fs');
let js = fs.readFileSync('frontend/src/mock_database.js', 'utf8');
const jsonStr = js.replace('export const mockDatabase = ', '').replace('// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\n', '').trim().replace(/;$/, '');
let db = JSON.parse(jsonStr);

// Overwrite the 16th product (Index 15)
db[15] = {
  "id": "gas-cutting-kit-6q",
  "name": "ชุดตัดสนามขนาด 6 คิว พร้อมรถเข็น",
  "brand": "OEM",
  "sku": "CUT-KIT-6Q",
  // เพิ่มคำอธิบายให้ดูเป็นมืออาชีพขึ้น (ต้นฉบับสั้นเกินไป)
  "description": "ชุดตัดแก๊สสนามขนาด 6 คิว (Portable Gas Cutting Kit) ครบชุด มาพร้อมรถเข็นเพื่อความสะดวกสบายในการเคลื่อนย้ายอุปกรณ์ไปตามจุดต่างๆ เหมาะอย่างยิ่งสำหรับงานตัดและงานเชื่อมในไซต์งานที่ต้องการความต่อเนื่องเป็นเวลานานๆ",
  "created_at": "2026-09-07T10:00:00Z",
  "sold_count": 85,
  "collections": ["popular"],
  "categories": [
    { "level": 1, "name": "เครื่องมือช่างและฮาร์ดแวร์", "url_slug": "hardware" },
    { "level": 2, "name": "อุปกรณ์แก๊สและงานตัด", "url_slug": "gas-cutting-equipment" },
    { "level": 3, "name": "ชุดตัดและเชื่อมแก๊ส", "url_slug": "gas-welding-cutting-kit" }
  ],
  "filter_attributes": {
    "equipment_type": "ชุดตัดสนาม (Portable Kit)"
  },
  "tags": ["ชุดตัดสนาม", "6 คิว", "พร้อมรถเข็น", "ชุดตัดแก๊ส"],
  "images": [
    "https://www.udo.co.th/storage/products/August2023/fusTz06hWBOz7NJ4oKW2.jpg"
  ],
  "warranty": null,
  "variants": [
    { "size": "มาตรฐาน", "package": "1 ชุด", "price": 14100.00, "original_price": null, "stock": 5 }
  ],
  "specsTable": [
    { "key": "ความจุท่อแก๊ส", "value": "6 คิว" },
    { "key": "รูปแบบการเคลื่อนย้าย", "value": "มาพร้อมรถเข็นล้อเลื่อน แข็งแรงทนทาน" },
    { "key": "ลักษณะการใช้งาน", "value": "สำหรับงานตัด/เชื่อมที่ต้องใช้งานต่อเนื่อง นอกสถานที่หรือในไซต์งานก่อสร้าง" }
  ],
  "richContent": {
    "headline": null,
    "subheadline": null,
    "description": null,
    "image1": "https://www.udo.co.th/storage/products/September2018/%206.jpg",
    "image2": null,
    "image3": null
  }
};

const newJs = `// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\nexport const mockDatabase = ${JSON.stringify(db, null, 2)};\n`;
fs.writeFileSync('frontend/src/mock_database.js', newJs, 'utf8');
console.log("Updated Gas Cutting Kit 6Q successfully");
