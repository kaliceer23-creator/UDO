const fs = require('fs');
let js = fs.readFileSync('frontend/src/mock_database.js', 'utf8');
const jsonStr = js.replace('export const mockDatabase = ', '').replace('// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\n', '').trim().replace(/;$/, '');
let db = JSON.parse(jsonStr);

// Overwrite the 8th product (Index 7)
db[7] = {
  "id": "powerweld-mc308lsim",
  "name": "ลวดเชื่อมมิกสเตนเลส POWERWELD MC-308LSiM",
  "brand": "POWERWELD",
  "sku": "MC-308LSiM",
  // คลีนข้อความ ลบลิงก์มาร์กดาวน์ ลบข้อความซ้ำซ้อนเรื่องบรรจุภัณฑ์ และปรับการสะกด สแตนเลส -> สเตนเลส (คำที่ถูกต้องตามราชบัณฑิตยสถานและหลักวิศวกรรม)
  "description": "ลวดเชื่อมมิกสเตนเลส (MIG) POWERWELD MC-308LSiM สำหรับงานซ่อมบำรุงและงานสเตนเลสทั่วไป รวมถึงอุตสาหกรรมยานยนต์, อาหาร, โรงงานน้ำตาล และเคมีภัณฑ์ จุดเด่นของลวดรุ่นนี้คือให้การอาร์กที่เรียบสม่ำเสมอ น้ำบ่อหลอมไหลลื่น สะเก็ดไฟกระเด็นน้อย (Low Spatter) และให้เกล็ดแนวเชื่อมที่เรียบเนียน เหมาะอย่างยิ่งสำหรับชิ้นงานที่ต้องการความสวยงามของผิวรอยเชื่อมเป็นพิเศษ",
  "created_at": "2026-08-30T10:00:00Z",
  "sold_count": 310,
  "collections": ["popular"],
  "categories": [
    { "level": 1, "name": "เครื่องมือช่างและฮาร์ดแวร์", "url_slug": "hardware" },
    { "level": 2, "name": "เครื่องเชื่อมและอุปกรณ์", "url_slug": "welding-equipment" },
    { "level": 3, "name": "ลวดเชื่อมมิก (MIG/MAG)", "url_slug": "mig-wire" }
  ],
  "filter_attributes": {
    "material": "สเตนเลส",
    "process": "ลวดเชื่อมมิก (MIG)"
  },
  "tags": ["ลวดเชื่อมมิกสเตนเลส", "อาร์กเรียบ", "สะเก็ดไฟน้อย"],
  "images": [
    "https://www.udo.co.th/storage/products/April2019/mypNR9kQqfopJUiT3KIi.jpg",
    "https://www.udo.co.th/storage/products/April2019/eeHiPAOktCf3ulCNHo4e.jpg"
  ],
  "warranty": null,
  "variants": [
    { "size": "0.8 mm", "package": "1 ม้วน (5 กก.)", "price": 2200.00, "original_price": null, "stock": 50 }
  ],
  "specsTable": [
    { "key": "คุณสมบัติเด่น", "value": "อาร์กเรียบสม่ำเสมอ, น้ำหลอมไหลลื่น, สะเก็ดไฟน้อย (Low Spatter)" },
    { "key": "ลักษณะแนวเชื่อม", "value": "เกล็ดแนวเชื่อมเรียบเนียนสวยงาม เหมาะกับชิ้นงานโชว์ผิว" },
    { "key": "อุตสาหกรรมที่รองรับ", "value": "ยานยนต์, อาหาร, โรงงานน้ำตาล, เคมี และงานสเตนเลสทั่วไป" }
  ],
  "richContent": {
    "headline": null,
    "subheadline": null,
    "description": null,
    "image1": "https://www.udo.co.th/storage/products/April2019/MC308LSiM.jpg",
    "image2": null,
    "image3": null
  }
};

const newJs = `// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\nexport const mockDatabase = ${JSON.stringify(db, null, 2)};\n`;
fs.writeFileSync('frontend/src/mock_database.js', newJs, 'utf8');
console.log("Updated POWERWELD MC-308LSiM successfully");
