const fs = require('fs');
let js = fs.readFileSync('frontend/src/mock_database.js', 'utf8');

const jsonStr = js.replace('export const mockDatabase = ', '').replace('// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\n', '').trim().replace(/;$/, '');
let db = JSON.parse(jsonStr);

// Overwrite the 3rd product (Index 2)
db[2] = {
  "id": "hyundai-sm-308l",
  "name": "ลวดเชื่อมมิกสแตนเลส HYUNDAI SM-308L",
  "brand": "HYUNDAI",
  "sku": "SM-308L",
  // คลีนข้อความให้อ่านง่าย เป็นมืออาชีพ
  "description": "ลวดเชื่อมสแตนเลสซีโอทู (MIG) HYUNDAI SM-308L เหมาะกับงานสแตนเลสทั่วไป, อุตสาหกรรมยานยนต์, อุตสาหกรรมอาหาร, โรงงานน้ำตาล และงานอุตสาหกรรมเคมี ให้การอาร์คเรียบสม่ำเสมอ และมีสะเก็ดไฟน้อย",
  "created_at": "2026-08-22T08:30:00Z",
  "sold_count": 420,
  "collections": ["new_arrival"],
  "categories": [
    { "level": 1, "name": "เครื่องมือช่างและฮาร์ดแวร์", "url_slug": "hardware" },
    { "level": 2, "name": "เครื่องเชื่อมและอุปกรณ์", "url_slug": "welding-equipment" },
    { "level": 3, "name": "ลวดเชื่อม MIG/MAG", "url_slug": "mig-wire" }
  ],
  "filter_attributes": {
    "material": "สเตนเลส",
    "process": "ลวดเชื่อม MIG/MAG"
  },
  "tags": ["อาร์คเรียบ", "สะเก็ดไฟน้อย", "อุตสาหกรรมอาหาร"],
  "images": [
    "https://www.udo.co.th/storage/products/July2018/A7UZUz9WTdDu8z30KxvQ.jpg"
  ],
  "warranty": null,
  // ข้อมูลดิบไม่ได้ระบุขนาดลวด เลยใส่ขนาดมาตรฐานของลวดมิกเป็น 0.8, 0.9, 1.2 ไว้ให้เลือกก่อน
  "variants": [
    { "size": "0.8 mm", "price": 4850.00, "original_price": null, "stock": 10 },
    { "size": "0.9 mm", "price": 4850.00, "original_price": null, "stock": 25 },
    { "size": "1.2 mm", "price": 4850.00, "original_price": null, "stock": 15 }
  ],
  "packages": [
    { "name": "ม้วน", "weight": "12.5 กก.", "is_active": true }
  ],
  // สกัดข้อมูลจาก Description มาทำเป็นตารางสเปคให้อ่านง่าย
  "specsTable": [
    { "key": "ลักษณะการใช้งาน", "value": "งานสแตนเลสทั่วไป, อุตสาหกรรมยานยนต์, อุตสาหกรรมอาหาร, โรงงานน้ำตาล, เคมี" },
    { "key": "คุณสมบัติเด่น", "value": "อาร์คเรียบสม่ำเสมอ, สะเก็ดไฟน้อย" }
  ],
  "richContent": {
    // ปล่อย Null ให้ระบบโคลน Title และ Description มาแสดงอัตโนมัติ
    "headline": null,
    "subheadline": null,
    "description": null,
    "image1": "https://www.udo.co.th/storage/products/July2018/SM-308L%20copy.jpg",
    "image2": null,
    "image3": null
  }
};

const newJs = `// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\nexport const mockDatabase = ${JSON.stringify(db, null, 2)};\n`;
fs.writeFileSync('frontend/src/mock_database.js', newJs, 'utf8');
console.log("Updated HYUNDAI SM-308L successfully");
