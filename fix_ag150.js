const fs = require('fs');
let js = fs.readFileSync('frontend/src/mock_database.js', 'utf8');
const jsonStr = js.replace('export const mockDatabase = ', '').replace('// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\n', '').trim().replace(/;$/, '');
let db = JSON.parse(jsonStr);

// Overwrite the 6th product (Index 5)
db[5] = {
  "id": "selectarc-phosbraz-ag150",
  "name": "ลวดเชื่อมเงิน 15% SELECTARC PHOSBRAZ AG150",
  "brand": "SELECTARC",
  "sku": "PHOSBRAZ-AG150",
  // คลีนเนื้อหา เอาลิงก์ขยะออก แก้คำผิด อีเล็คโทรนิค->อิเล็กทรอนิกส์, ปั้ม->ปั๊ม, แคดเมี่ยม->แคดเมียม
  "description": "ลวดเชื่อมเงิน 15% SELECTARC PHOSBRAZ AG150 จากประเทศฝรั่งเศส แกนลวดปราศจากสารแคดเมียม (Cd Free) ปลอดภัยต่อผู้ใช้งาน สามารถเชื่อมได้โดยไม่ต้องใช้น้ำยาประสาน เหมาะสำหรับงานเชื่อมท่อทองแดงในหลากหลายอุตสาหกรรม เช่น อุตสาหกรรมอิเล็กทรอนิกส์, อุตสาหกรรมปั๊ม, อุตสาหกรรมเครื่องทำความเย็น และอื่นๆ",
  "created_at": "2026-08-28T10:00:00Z",
  "sold_count": 890,
  "collections": ["popular"],
  "categories": [
    { "level": 1, "name": "เครื่องมือช่างและฮาร์ดแวร์", "url_slug": "hardware" },
    { "level": 2, "name": "เครื่องเชื่อมและอุปกรณ์", "url_slug": "welding-equipment" },
    { "level": 3, "name": "ลวดเชื่อมเงิน", "url_slug": "silver-brazing-alloy" }
  ],
  "filter_attributes": {
    "material": "ลวดเชื่อมเงิน",
    "process": "เชื่อมแก๊ส"
  },
  "tags": ["ลวดเชื่อมเงิน 15%", "เชื่อมท่อทองแดง", "Cd Free (ไร้แคดเมียม)"],
  "images": [
    "https://www.udo.co.th/storage/products/April2019/zaYosM5Yl3YXAULJB8zq.jpg"
  ],
  "warranty": null,
  // ใช้ระบบ Two-Tier ตัดคำว่า "เส้นละ/กิโลกรัมละ" มาเป็นชื่อ Package
  "variants": [
    { "size": "1.5 x 500 mm", "package": "1 เส้น", "price": 290.00, "original_price": null, "stock": 2000 },
    { "size": "1.5 x 500 mm", "package": "1 กิโลกรัม", "price": 21000.00, "original_price": null, "stock": 10 },
    { "size": "2.0 x 500 mm", "package": "1 เส้น", "price": 350.00, "original_price": null, "stock": 300 },
    { "size": "2.0 x 500 mm", "package": "1 กิโลกรัม", "price": 21000.00, "original_price": null, "stock": 22 }
  ],
  "specsTable": [
    { "key": "คุณสมบัติเด่น", "value": "แกนลวดปราศจากสารแคดเมียม (Cd Free), เชื่อมได้โดยไม่ต้องใช้น้ำยาประสาน" },
    { "key": "ลักษณะการใช้งาน", "value": "งานเชื่อมท่อทองแดง" },
    { "key": "อุตสาหกรรมที่รองรับ", "value": "อุตสาหกรรมอิเล็กทรอนิกส์, ปั๊มน้ำ, เครื่องทำความเย็น" },
    { "key": "แหล่งกำเนิด", "value": "ประเทศฝรั่งเศส" }
  ],
  "richContent": {
    "headline": null,
    "subheadline": null,
    "description": null,
    "image1": "https://www.udo.co.th/storage/products/April2019/SAAG150.jpg",
    "image2": null,
    "image3": null
  }
};

const newJs = `// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\nexport const mockDatabase = ${JSON.stringify(db, null, 2)};\n`;
fs.writeFileSync('frontend/src/mock_database.js', newJs, 'utf8');
console.log("Updated SELECTARC AG150 successfully");
