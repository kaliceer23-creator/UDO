const fs = require('fs');
let js = fs.readFileSync('frontend/src/mock_database.js', 'utf8');
const jsonStr = js.replace('export const mockDatabase = ', '').replace('// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\n', '').trim().replace(/;$/, '');
let db = JSON.parse(jsonStr);

// Overwrite the 14th product (Index 13)
db[13] = {
  "id": "plasma-torch-p80-7-5m",
  "name": "ชุดหัวตัดพลาสม่า P-80 พร้อมสายยาว 7.5 เมตร",
  "brand": "OEM", // ไม่ระบุแบรนด์
  "sku": "P80-7.5M",
  // คลีนข้อความ ลบคำโปรโมตขยะออก และแก้คำผิด สวิตซ์->สวิตช์, อีเล็คโทรด->อิเล็กโทรด
  "description": "ชุดหัวตัดพลาสม่า P-80 พร้อมสายความยาว 7.5 เมตร ด้ามจับดีไซน์ใหม่เน้นความกระชับมือ มาพร้อมระบบเซฟตี้สวิตช์ (Safety Switch) เพื่อป้องกันการกดทำงานโดยไม่ได้ตั้งใจ เหมาะสำหรับเครื่องตัดพลาสม่าที่มีกำลังตั้งแต่ 60-120 แอมป์ สามารถใช้งานร่วมกับหัวทิป (Tip) ขนาด 1.3-1.7 มม. ได้ตามความหนาของชิ้นงาน ให้รอยตัดที่คมและสวยงาม",
  "created_at": "2026-09-05T10:00:00Z",
  "sold_count": 310,
  "collections": ["promotion", "popular"],
  "categories": [
    { "level": 1, "name": "เครื่องมือช่างและฮาร์ดแวร์", "url_slug": "hardware" },
    { "level": 2, "name": "เครื่องเชื่อมและอุปกรณ์", "url_slug": "welding-equipment" },
    { "level": 3, "name": "อะไหล่และอุปกรณ์พลาสม่า", "url_slug": "plasma-accessories" }
  ],
  "filter_attributes": {
    "process": "ตัดพลาสม่า (Plasma Cutting)"
  },
  "tags": ["ชุดหัวตัดพลาสม่า", "P-80", "สาย 7.5 เมตร", "เซฟตี้สวิตช์"],
  "images": [
    "https://www.udo.co.th/storage/products/January2020/ErMwNm0QYHZWFEuZ22tV.jpg",
    "https://www.udo.co.th/storage/products/January2020/txSxEBnWE1Gaf5ds233Y.jpg",
    "https://www.udo.co.th/storage/products/January2020/gFsSZtw4eaqovQ4rNioo.jpg"
  ],
  "warranty": null,
  "variants": [
    // ใส่ original_price เข้าไปเพื่อกระตุ้นให้ระบบ UI ขึ้นป้าย "ลดราคา (Discount Badge)" อัตโนมัติ แทนการตะโกนว่า PROMOTION
    { "size": "มาตรฐาน", "package": "1 ชุด", "price": 2290.00, "original_price": 3190.00, "stock": 45 }
  ],
  "specsTable": [
    { "key": "ความยาวสาย", "value": "7.5 เมตร" },
    { "key": "รองรับกระแสไฟ", "value": "60 - 120 แอมป์" },
    { "key": "รองรับขนาดหัวทิป", "value": "1.3 - 1.7 มม." },
    { "key": "ระบบความปลอดภัย", "value": "มีเซฟตี้สวิตช์ (Safety Switch) ที่ด้ามจับ" },
    { "key": "อุปกรณ์ในชุดประกอบด้วย", "value": "1. ชุดหัวตัด P-80, 2. ลูกล้อตัด, 3. ประแจขันหัวทิปอิเล็กโทรด" }
  ],
  "richContent": {
    "headline": null,
    "subheadline": null,
    "description": null,
    "image1": null,
    "image2": null,
    "image3": null
  }
};

const newJs = `// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\nexport const mockDatabase = ${JSON.stringify(db, null, 2)};\n`;
fs.writeFileSync('frontend/src/mock_database.js', newJs, 'utf8');
console.log("Updated Plasma Torch P80 successfully");
