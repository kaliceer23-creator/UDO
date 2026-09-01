const fs = require('fs');
let js = fs.readFileSync('frontend/src/mock_database.js', 'utf8');
const jsonStr = js.replace('export const mockDatabase = ', '').replace('// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\n', '').trim().replace(/;$/, '');
let db = JSON.parse(jsonStr);

// Overwrite the 11th product (Index 10)
db[10] = {
  "id": "gemini-nicast-55",
  "name": "ลวดเชื่อมไฟฟ้าเหล็กหล่อ GEMINI NI-CAST 55 (ENiFe-CI)",
  "brand": "GEMINI",
  "sku": "NI-CAST-55",
  // คลีนข้อความ ลบประโยคซ้ำซ้อน ลบลิงก์มาร์กดาวน์ และแก้คำผิด (ต่า->ต่ำ, สาหรับ->สำหรับ, กราไฟท์->กราไฟต์)
  "description": "ลวดเชื่อมเจมินี่ Ni-Cast 55 เป็นลวดเชื่อมไฟฟ้าเหล็กหล่อคุณภาพสูงที่มีส่วนผสมของธาตุนิเกิล 55% (เกรด ENiFe-CI) ออกแบบมาเป็นพิเศษสำหรับงานเชื่อมเหล็กหล่อและเหล็กหล่อกราไฟต์กลม (Nodular Cast Iron) ที่ต้องการความแข็งแรงสูง จุดเด่นคือใช้กระแสไฟต่ำในการเชื่อม ทำให้ชิ้นงานไม่เกิดความร้อนสะสมมากเกินไป (Low Heat Input) และให้แนวเชื่อมที่สามารถกลึงแต่งขึ้นรูปได้ง่าย",
  "created_at": "2026-09-02T10:00:00Z",
  "sold_count": 550,
  "collections": ["popular"],
  "categories": [
    { "level": 1, "name": "เครื่องมือช่างและฮาร์ดแวร์", "url_slug": "hardware" },
    { "level": 2, "name": "เครื่องเชื่อมและอุปกรณ์", "url_slug": "welding-equipment" },
    { "level": 3, "name": "ลวดเชื่อมไฟฟ้า (SMAW)", "url_slug": "smaw-stick-electrode" }
  ],
  "filter_attributes": {
    "material": "เหล็กหล่อ",
    "process": "ลวดเชื่อมไฟฟ้า (SMAW)"
  },
  "tags": ["ลวดเชื่อมเหล็กหล่อ", "Ni-55", "กลึงแต่งได้"],
  "images": [
    "https://www.udo.co.th/storage/products/May2026/XlgH7XMehd33S6CTssRj.jpg"
  ],
  "warranty": null,
  "variants": [
    { "size": "2.6 mm", "package": "1 ห่อ (1 กก.)", "price": 1650.00, "original_price": null, "stock": 10 },
    { "size": "3.2 mm", "package": "1 ห่อ (1 กก.)", "price": 1550.00, "original_price": null, "stock": 10 },
    { "size": "4.0 mm", "package": "1 ห่อ (1 กก.)", "price": 2080.00, "original_price": null, "stock": 10 }
  ],
  // รวบรวมข้อมูลเชิงวิศวกรรมที่กระจัดกระจายมาจัดเรียงใหม่ให้เป็นระเบียบ
  "specsTable": [
    { "key": "การจำแนกประเภท", "value": "AWS/SFA 5.15 ENiFe-CI" },
    { "key": "การรับรองมาตรฐาน", "value": "มอก. 732-2531" },
    { "key": "ส่วนผสมทางเคมี (%)", "value": "C: 0.44, Si: 0.80, Mn: 0.73, Ni: 54.00" },
    { "key": "คุณสมบัติทางกล", "value": "Yield: 310 N/mm², Tensile: 450 N/mm², Elongation: 10%, Hardness: 190 HV30" },
    { "key": "กระแสไฟที่แนะนำ (A)", "value": "2.6mm(50-80), 3.2mm(80-110), 4.0mm(120-170) [AC/DC±]" },
    { "key": "ท่าเชื่อม", "value": "ท่าราบ, ท่าขนานนอน, ท่าเชื่อมขึ้น, ท่าเชื่อมเหนือศีรษะ" }
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
console.log("Updated GEMINI NI-CAST 55 successfully");
