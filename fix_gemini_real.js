const fs = require('fs');
let js = fs.readFileSync('frontend/src/mock_database.js', 'utf8');

const jsonStr = js.replace('export const mockDatabase = ', '').replace('// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\n', '').trim().replace(/;$/, '');
let db = JSON.parse(jsonStr);

// 1. Processed Real Data for GEMINI 308L
db[0] = {
  "id": "gem-308l",
  "name": "ลวดเชื่อมสแตนเลสไฟฟ้า GEMINI 308L (E308L-16)",
  "brand": "GEMINI",
  "sku": "GEM-308L",
  // นำข้อมูลทั้ง 2 ส่วนมารวมกัน ตัดข้อความขยะออก และแก้คำผิด (ต่า -> ต่ำ, สาหรับ -> สำหรับ) โดยไม่แต่งเติมข้อความใหม่
  "description": "ลวดเชื่อมสเตนเลส เจมินี่ Gemini 308L (E308L-16) เป็นสแตนเลสกลุ่มออสเทนนิติก สารพอกหุ้มประเภทไทเทเนีย มีธาตุคาร์บอนผสมในปริมาณต่ำ ใช้สำหรับงานเชื่อมสเตนเลสทั่วไป สามารถเชื่อมเหล็กที่มีส่วนผสมของธาตุโครเมียม-นิเกิล แนวเชื่อมทนต่อการกัดกร่อนได้ดี ในสภาวะอากาศปกติ และทนต่อการกัดกร่อนของกรดอ่อนๆได้ เหมาะกับงานเชื่อมสเตนเลส AISI 302, 304, 304 L และ 304 LN",
  "created_at": "2026-08-15T10:30:00Z",
  "sold_count": 1250,
  "collections": ["popular", "just_for_you"],
  "categories": [
    { "level": 1, "name": "เครื่องมือช่างและฮาร์ดแวร์", "url_slug": "hardware" },
    { "level": 2, "name": "เครื่องเชื่อมและอุปกรณ์", "url_slug": "welding-equipment" },
    { "level": 3, "name": "ลวดเชื่อมสเตนเลส", "url_slug": "stainless-wire" }
  ],
  "filter_attributes": {
    "material": "สเตนเลส",
    "process": "ธูปเชื่อม (MMA)"
  },
  // ดึง Tags จากคีย์เวิร์ดจริงในเนื้อหา
  "tags": ["ออสเทนนิติก", "ทนการกัดกร่อน", "สเตนเลส 304"],
  "images": [
    "https://www.udo.co.th/storage/products/May2026/FdE0amQIiBJB06u9rNCn.jpg"
  ],
  "warranty": null,
  "variants": [
    { "size": "2.0 mm", "price": 370.00, "original_price": null, "stock": 10 },
    { "size": "2.6 mm", "price": 305.00, "original_price": null, "stock": 100 },
    { "size": "3.2 mm", "price": 305.00, "original_price": null, "stock": 50 },
    { "size": "4.0 mm", "price": 305.00, "original_price": null, "stock": 10 }
  ],
  "packages": [
    { "name": "ห่อ", "weight": "1 กก.", "is_active": true }
  ],
  // จัดเรียง SpecsTable ตามมาตรฐานที่คุยกันไว้เป๊ะๆ ข้อมูลดึงจาก Raw Data 100%
  "specsTable": [
    { "key": "ส่วนผสมทางเคมี (%)", "value": "C: 0.01, Mn: 0.70, Si: 0.60, Ni: 10.00, Cr: 19.30" },
    { "key": "คุณสมบัติทางกล", "value": "Yield stress: 520 N/mm², Tensile strength: 590 N/mm², Elongation: 40%" },
    { "key": "กระแสไฟฟ้าที่ใช้เชื่อม", "value": "AC หรือ DC±" },
    { "key": "กระแสไฟ (Ø 2.0 x 300 mm)", "value": "30-50 A" },
    { "key": "กระแสไฟ (Ø 2.6 x 300 mm)", "value": "50-75 A" },
    { "key": "กระแสไฟ (Ø 3.2 x 350 mm)", "value": "75-110 A" },
    { "key": "กระแสไฟ (Ø 4.0 x 350 mm)", "value": "110-150 A" },
    { "key": "กระแสไฟ (Ø 5.0 x 350 mm)", "value": "140-190 A" },
    { "key": "สีแต้มปลายลวด", "value": "เหลือง" },
    { "key": "สีแต้มข้างลวด", "value": "ฟ้า" },
    { "key": "ชื่อพิมพ์", "value": "AWS E308L-16" },
    { "key": "รับรองโดย", "value": "LR, มอก. 730-2530" },
    { "key": "การจำแนกประเภท", "value": "AWS/SFA5.4 E308L-16" },
    { "key": "ท่าเชื่อม", "value": "ท่าราบ, ท่าขนานนอน, ท่าเชื่อมขึ้นและท่าเชื่อมเหนือศีรษะ" }
  ],
  "richContent": {
    // ปล่อยให้เป็น null เพื่อให้ JS วนเอา Name และ Description จากด้านบนมาแสดงแบบอัตโนมัติตามที่เราตกลงกันไว้
    "headline": null,
    "subheadline": null,
    "description": null,
    "image1": "https://www.udo.co.th/storage/products/May2026/FdE0amQIiBJB06u9rNCn.jpg",
    "image2": null,
    "image3": null
  }
};

const newJs = `// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\nexport const mockDatabase = ${JSON.stringify(db, null, 2)};\n`;
fs.writeFileSync('frontend/src/mock_database.js', newJs, 'utf8');
console.log("Updated GEMINI 308L with purely cleansed real data");
