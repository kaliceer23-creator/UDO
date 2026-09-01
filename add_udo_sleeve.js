const fs = require('fs');
let js = fs.readFileSync('frontend/src/mock_database.js', 'utf8');
const jsonStr = js.replace('export const mockDatabase = ', '').replace('// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\n', '').trim().replace(/;$/, '');
let db = JSON.parse(jsonStr);

// Overwrite the 18th product (Index 17)
db[17] = {
  "id": "udo-welding-sleeve-sl001",
  "name": "ปลอกแขนหนังงานเชื่อม UDO รุ่น SL-001",
  "brand": "UDO",
  "sku": "SL-001",
  // คลีนคำผิด (จาการ -> จากการ, มาตราฐาน -> มาตรฐาน, พรีเมี่ยม -> พรีเมียม) และเรียบเรียงประโยคให้สละสลวย
  "description": "ปลอกแขนหนังป้องกันสะเก็ดไฟและความร้อนจากการเชื่อม UDO รุ่น SL-001 ผลิตจากวัสดุหนังแท้คัดเกรดพรีเมียม หนังหนาพิเศษ ให้ความทนทานและกันความร้อนได้เป็นอย่างดี แต่ยังคงความนุ่ม สวมใส่สบายและคล่องตัว ดีไซน์ออกแบบให้มีเทปรัดหนามเตย (Velcro Tape) บริเวณต้นแขนและข้อมือ เพื่อความกระชับและป้องกันสะเก็ดไฟกระเด็นเข้าด้านใน มั่นใจในคุณภาพด้วยการรับรองมาตรฐานสากล EN11611",
  "created_at": "2026-09-09T10:00:00Z",
  "sold_count": 920,
  "collections": ["popular"],
  "categories": [
    { "level": 1, "name": "เครื่องมือช่างและฮาร์ดแวร์", "url_slug": "hardware" },
    { "level": 2, "name": "อุปกรณ์เซฟตี้ (PPE)", "url_slug": "safety-equipment" },
    { "level": 3, "name": "ชุดและอุปกรณ์ป้องกันงานเชื่อม", "url_slug": "welding-protective-clothing" }
  ],
  "filter_attributes": {
    "material": "หนังแท้เกรดพรีเมียม"
  },
  "tags": ["ปลอกแขนหนัง", "UDO", "SL-001", "กันสะเก็ดไฟ", "อุปกรณ์เซฟตี้"],
  "images": [
    "https://www.udo.co.th/storage/products/May2020/esjsw7VLBHGAWVqQs3Di.jpg"
  ],
  "warranty": null,
  "variants": [
    { "size": "ฟรีไซส์", "package": "1 คู่", "price": 720.00, "original_price": null, "stock": 150 }
  ],
  "specsTable": [
    { "key": "วัสดุหลัก", "value": "หนังแท้เกรดพรีเมียม (หนาพิเศษ แต่นุ่มกระชับ)" },
    { "key": "ระบบการยึดติด", "value": "เทปรัดหนามเตย (Velcro Tape) ที่ต้นแขนและข้อมือ" },
    { "key": "จุดเด่น", "value": "ป้องกันสะเก็ดไฟกระเด็นเข้าด้านในเสื้อผ้าได้ 100%" },
    { "key": "มาตรฐานการรับรอง", "value": "EN11611" }
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
console.log("Updated UDO Welding Sleeve successfully");
