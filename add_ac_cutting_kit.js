const fs = require('fs');
let js = fs.readFileSync('frontend/src/mock_database.js', 'utf8');
const jsonStr = js.replace('export const mockDatabase = ', '').replace('// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\n', '').trim().replace(/;$/, '');
let db = JSON.parse(jsonStr);

// Overwrite the 20th product (Index 19)
db[19] = {
  "id": "gas-welding-cutting-heating-kit-6q-ac",
  "name": "ชุดเชื่อม-ตัด-เผา ขนาด 6 คิว แก๊สอะเซทีลีน",
  "brand": "OEM",
  "sku": "CUT-HEAT-6Q-AC",
  // เพิ่มการเว้นวรรคให้อ่านง่าย และอัปเกรดคำบรรยายให้ดูน่าซื้อมากขึ้น
  "description": "ชุดแก๊สสนามขนาด 6 คิว (แก๊สอะเซทีลีน - AC) ครบชุดพร้อมรถเข็นล้อเลื่อนแบบแข็งแรงทนทาน ออกแบบมาสำหรับงานหนัก (Heavy Duty) ที่ต้องการฟังก์ชันแบบ 3-in-1 ครอบคลุมทั้งงานเชื่อม งานตัด และงานเผาให้ความร้อนในชุดเดียว มาพร้อมท่อก๊าซขนาดใหญ่ที่รองรับการใช้งานได้อย่างต่อเนื่องยาวนาน เหมาะสำหรับไซต์งานอุตสาหกรรมและงานนอกสถานที่",
  "created_at": "2026-09-11T10:00:00Z",
  "sold_count": 42,
  "collections": ["popular"],
  "categories": [
    { "level": 1, "name": "เครื่องมือช่างและฮาร์ดแวร์", "url_slug": "hardware" },
    { "level": 2, "name": "อุปกรณ์แก๊สและงานตัด", "url_slug": "gas-cutting-equipment" },
    { "level": 3, "name": "ชุดตัดและเชื่อมแก๊ส", "url_slug": "gas-welding-cutting-kit" }
  ],
  "filter_attributes": {
    "gas_type": "แก๊สอะเซทีลีน (AC)",
    "equipment_type": "ชุดตัดสนาม (Portable Kit)"
  },
  "tags": ["ชุดเชื่อมตัดเผา", "6 คิว", "อะเซทีลีน", "พร้อมรถเข็น", "AC"],
  "images": [
    "https://www.udo.co.th/storage/products/August2023/FuR729EukTKDxLoUioGA.jpg"
  ],
  "warranty": null,
  "variants": [
    { "size": "มาตรฐาน", "package": "1 ชุด", "price": 19500.00, "original_price": null, "stock": 5 }
  ],
  "specsTable": [
    { "key": "ประเภทแก๊ส", "value": "อะเซทีลีน (AC)" },
    { "key": "ความจุท่อแก๊ส", "value": "6 คิว (ท่อขนาดใหญ่ ใช้งานต่อเนื่องได้ยาวนาน)" },
    { "key": "ฟังก์ชันการใช้งาน (3-in-1)", "value": "รองรับทั้งงานเชื่อม, ตัด, และเผาให้ความร้อน" },
    { "key": "รูปแบบการเคลื่อนย้าย", "value": "มาพร้อมรถเข็นล้อเลื่อน แข็งแรงทนทาน" },
    { "key": "ลักษณะงานที่รองรับ", "value": "งานหนัก (Heavy Duty) และงานนอกสถานที่" }
  ],
  "richContent": {
    "headline": null,
    "subheadline": null,
    "description": null,
    "image1": "https://www.udo.co.th/storage/products/May2024/web%E0%B8%8A%E0%B8%B8%E0%B8%94%E0%B9%80%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%A1%E0%B8%95%E0%B8%B1%E0%B8%94%E0%B9%80%E0%B8%9C%E0%B8%B2%E0%B8%AA%E0%B8%99%E0%B8%B2%E0%B8%A1-6-%E0%B8%84%E0%B8%B4%E0%B8%A7-AC.jpg",
    "image2": null,
    "image3": null
  }
};

const newJs = `// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\nexport const mockDatabase = ${JSON.stringify(db, null, 2)};\n`;
fs.writeFileSync('frontend/src/mock_database.js', newJs, 'utf8');
console.log("Updated AC Cutting Kit successfully");
