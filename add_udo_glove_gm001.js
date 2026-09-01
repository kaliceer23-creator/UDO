const fs = require('fs');
let js = fs.readFileSync('frontend/src/mock_database.js', 'utf8');
const jsonStr = js.replace('export const mockDatabase = ', '').replace('// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\n', '').trim().replace(/;$/, '');
let db = JSON.parse(jsonStr);

// Add the 21st product (Index 20)
db[20] = {
  "id": "udo-welding-glove-gm001",
  "name": "ถุงมือเชื่อม UDO รุ่น GM-001",
  "brand": "UDO",
  "sku": "GM-001",
  // คลีนข้อความ แก้คำผิด ยึดอายุ->ยืดอายุ, ลินนิน->ลินิน, เชื่อมอทั่วไป->เชื่อมทั่วไป
  "description": "ถุงมือเชื่อม UDO รุ่น GM-001 (ความยาว 13 นิ้ว) ผลิตจากหนังวัวเกรดพิเศษคัดมาอย่างดี ให้ความนุ่มกระชับมือ สวมใส่สบาย เหมาะสำหรับงานเชื่อมและงานช่างทั่วไป ด้านในเสริมซับในด้วยผ้าลินินเพื่อเพิ่มความทนทานและยืดอายุการใช้งาน ตัดเย็บด้วยด้ายเคฟล่าร์ (Kevlar) ป้องกันความร้อน กันแรงกระแทก กันไฟ และกันการบาดได้เป็นอย่างดี ผ่านการรับรองมาตรฐานสากล CE, EN12477 และ EN388",
  "created_at": "2026-09-12T10:00:00Z",
  "sold_count": 8200,
  "collections": ["popular"],
  "categories": [
    { "level": 1, "name": "เครื่องมือช่างและฮาร์ดแวร์", "url_slug": "hardware" },
    { "level": 2, "name": "อุปกรณ์เซฟตี้ (PPE)", "url_slug": "safety-equipment" },
    { "level": 3, "name": "ถุงมือเซฟตี้ (Safety Gloves)", "url_slug": "safety-gloves" }
  ],
  "filter_attributes": {
    "material": "หนังวัวแท้ (เย็บด้ายเคฟล่าร์)"
  },
  "tags": ["ถุงมือเชื่อม", "ถุงมือหนัง", "UDO", "GM-001", "ด้ายเคฟล่าร์"],
  "images": [
    "https://www.udo.co.th/storage/products/November2019/0qlhExVjxNN4OcP3ZAyZ.jpg",
    "https://www.udo.co.th/storage/products/November2019/jiBiAvd8MhcAks6DJSds.jpg",
    "https://www.udo.co.th/storage/products/November2019/JKytur6COIuLLMRn58AZ.jpg"
  ],
  "warranty": null,
  "variants": [
    { "size": "ฟรีไซส์", "package": "1 คู่", "price": 120.00, "original_price": null, "stock": 14998 },
    { "size": "ฟรีไซส์", "package": "1 โหล (12 คู่)", "price": 1300.00, "original_price": null, "stock": 1200 }
  ],
  "specsTable": [
    { "key": "วัสดุหลัก", "value": "หนังวัวเกรดพิเศษ (เสริมซับในผ้าลินิน)" },
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
console.log("Updated UDO GM-001 successfully");
