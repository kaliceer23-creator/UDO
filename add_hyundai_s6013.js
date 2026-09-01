const fs = require('fs');
let js = fs.readFileSync('frontend/src/mock_database.js', 'utf8');
const jsonStr = js.replace('export const mockDatabase = ', '').replace('// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\n', '').trim().replace(/;$/, '');
let db = JSON.parse(jsonStr);

// Overwrite the 9th product (Index 8)
db[8] = {
  "id": "hyundai-s-6013-lf",
  "name": "ลวดเชื่อมไฟฟ้า HYUNDAI S-6013.LF",
  "brand": "HYUNDAI",
  "sku": "S-6013.LF",
  "description": "ลวดเชื่อมไฟฟ้า HYUNDAI S-6013.LF สูตรควันน้อย (Low Fume) เชื่อมนุ่ม แนวเชื่อมสวยงาม เคาะสแล็กออกง่าย ออกแบบมาเป็นพิเศษสำหรับการเชื่อมโครงสร้างเหล็กและเหล็กแผ่นบางๆ เหมาะสำหรับงานสร้างเรือ, รถไฟ และชิ้นส่วนยานยนต์ที่ทำด้วยเหล็กเหนียว",
  "created_at": "2026-08-31T10:00:00Z",
  "sold_count": 1250,
  "collections": ["popular"],
  "categories": [
    { "level": 1, "name": "เครื่องมือช่างและฮาร์ดแวร์", "url_slug": "hardware" },
    { "level": 2, "name": "เครื่องเชื่อมและอุปกรณ์", "url_slug": "welding-equipment" },
    { "level": 3, "name": "ลวดเชื่อมไฟฟ้า (SMAW)", "url_slug": "smaw-stick-electrode" }
  ],
  "filter_attributes": {
    "material": "เหล็กเหนียว",
    "process": "ลวดเชื่อมไฟฟ้า (SMAW)"
  },
  "tags": ["ลวดเชื่อมไฟฟ้า", "สูตรควันน้อย", "เชื่อมเหล็กบาง"],
  "images": [
    "https://www.udo.co.th/storage/products/July2018/cgekhk8eg2ZkqlUQy8Zy.jpg"
  ],
  "warranty": null,
  "variants": [
    { "size": "2.6 mm", "package": "1 ลัง (20 กก.)", "price": 1200.00, "original_price": null, "stock": 10 },
    { "size": "3.2 mm", "package": "1 ลัง (20 กก.)", "price": 1160.00, "original_price": null, "stock": 10 },
    { "size": "4.0 mm", "package": "1 ลัง (20 กก.)", "price": 1160.00, "original_price": null, "stock": 10 },
    { "size": "5.0 mm", "package": "1 ลัง (20 กก.)", "price": 970.00, "original_price": null, "stock": 0 }
  ],
  "specsTable": [
    { "key": "คุณสมบัติเด่น", "value": "สูตรควันน้อย (Low Fume), เชื่อมนุ่ม, เคาะสแล็กออกง่าย" },
    { "key": "ลักษณะการใช้งาน", "value": "เชื่อมโครงสร้างเหล็ก และเหล็กแผ่นบาง" },
    { "key": "อุตสาหกรรมที่รองรับ", "value": "งานสร้างเรือ, รถไฟ, ยานยนต์ (เหล็กเหนียว)" }
  ],
  "richContent": {
    "headline": null,
    "subheadline": null,
    "description": null,
    "image1": "https://www.udo.co.th/storage/products/July2018/S-6013%20copy.jpg",
    "image2": null,
    "image3": null
  }
};

const newJs = `// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\nexport const mockDatabase = ${JSON.stringify(db, null, 2)};\n`;
fs.writeFileSync('frontend/src/mock_database.js', newJs, 'utf8');
console.log("Updated HYUNDAI S-6013.LF successfully");
