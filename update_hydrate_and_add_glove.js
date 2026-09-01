const fs = require('fs');

// 1. Update JS Logic to hide "ฟรีไซส์"
let js = fs.readFileSync('frontend/src/product_hydrate.js', 'utf8');
js = js.replace('uniqueSizes[0] === "มาตรฐาน" || uniqueSizes[0] === "" || uniqueSizes[0] === "N/A"', 'uniqueSizes[0] === "มาตรฐาน" || uniqueSizes[0] === "" || uniqueSizes[0] === "N/A" || uniqueSizes[0] === "ฟรีไซส์"');
fs.writeFileSync('frontend/src/product_hydrate.js', js, 'utf8');

// 2. Update Database
let dbStr = fs.readFileSync('frontend/src/mock_database.js', 'utf8');
const jsonStr = dbStr.replace('export const mockDatabase = ', '').replace('// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\n', '').trim().replace(/;$/, '');
let db = JSON.parse(jsonStr);

// Overwrite the 17th product (Index 16)
db[16] = {
  "id": "udo-welding-glove-gm002",
  "name": "ถุงมือเชื่อม UDO รุ่น GM-002",
  "brand": "UDO",
  "sku": "GM-002",
  // คลีนข้อความ แก้คำผิด แพ๊ค -> แพ็ค, ยึดอายุ -> ยืดอายุ, ลินนิน -> ลินิน
  "description": "ถุงมือเชื่อม UDO รุ่น GM-002 (ความยาว 13 นิ้ว) ผลิตจากหนังวัวคัดเกรดหนาพิเศษ ให้ความทนทานสูง ป้องกันความร้อน กันไฟ กันบาด และกันแรงกระแทกได้ดีเยี่ยม แต่ยังคงความนุ่มกระชับสวมใส่สบาย ตัดเย็บด้วยด้ายเคฟล่าร์ (Kevlar) และเสริมซับในด้วยผ้าลินินเพื่อยืดอายุการใช้งานให้ยาวนานขึ้น เหมาะสำหรับงานเชื่อมและงานช่างทุกประเภท ได้รับมาตรฐานสากล CE, EN12477 และ EN388",
  "created_at": "2026-09-08T10:00:00Z",
  "sold_count": 5420,
  "collections": ["popular"],
  "categories": [
    { "level": 1, "name": "เครื่องมือช่างและฮาร์ดแวร์", "url_slug": "hardware" },
    { "level": 2, "name": "อุปกรณ์เซฟตี้ (PPE)", "url_slug": "safety-equipment" },
    { "level": 3, "name": "ถุงมือเซฟตี้ (Safety Gloves)", "url_slug": "safety-gloves" }
  ],
  "filter_attributes": {
    "material": "หนังวัวแท้ (เย็บด้ายเคฟล่าร์)"
  },
  "tags": ["ถุงมือเชื่อม", "ถุงมือหนัง", "UDO", "กันความร้อน", "ด้ายเคฟล่าร์"],
  "images": [
    "https://www.udo.co.th/storage/products/November2019/D5yCFtYnTurGtieaD53j.jpg",
    "https://www.udo.co.th/storage/products/November2019/bmkIoE2WdbdTxexbbxNW.jpg",
    "https://www.udo.co.th/storage/products/November2019/KDgNAQnwamMfCTKgN2Y3.jpg",
    "https://www.udo.co.th/storage/products/November2019/mUQY7aD9FAhXM53VNOHu.jpg"
  ],
  "warranty": null,
  "variants": [
    { "size": "ฟรีไซส์", "package": "1 คู่", "price": 160.00, "original_price": null, "stock": 2000 },
    { "size": "ฟรีไซส์", "package": "1 โหล (12 คู่)", "price": 1730.00, "original_price": null, "stock": 500 }
  ],
  "specsTable": [
    { "key": "วัสดุหลัก", "value": "หนังวัวคัดเกรดหนาพิเศษ (เสริมซับในผ้าลินิน)" },
    { "key": "วัสดุการตัดเย็บ", "value": "ด้ายเคฟล่าร์ (Kevlar) ทนความร้อนและไม่ลามไฟ" },
    { "key": "ขนาดความยาว", "value": "13 นิ้ว (ฟรีไซส์)" },
    { "key": "มาตรฐานการรับรอง", "value": "CE, EN12477, EN388" },
    { "key": "การบรรจุ (สำหรับขายส่ง)", "value": "1 ลัง บรรจุ 72 คู่ (6 โหล)" }
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
console.log("Updated UDO Welding Glove successfully");
