const fs = require('fs');
let js = fs.readFileSync('frontend/src/mock_database.js', 'utf8');

const jsonStr = js.replace('export const mockDatabase = ', '').replace('// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\n', '').trim().replace(/;$/, '');
let db = JSON.parse(jsonStr);

db[0] = {
  "id": "gem-308l",
  "name": "ลวดเชื่อมสแตนเลสไฟฟ้า GEMINI 308L (E308L-16)",
  "brand": "GEMINI",
  "sku": "GEM-308L",
  "description": "ลวดเชื่อมสเตนเลส เจมินี่ Gemini 308L (E308L-16) เป็นสแตนเลสกลุ่มออสเทนนิติก สารพอกหุ้มประเภทไทเทเนีย มีธาตุคาร์บอนผสมในปริมาณต่ำ ใช้สำหรับงานเชื่อมสเตนเลสทั่วไป",
  "categories": [
    { "level": 1, "name": "เครื่องมือช่างและฮาร์ดแวร์", "url_slug": "hardware" },
    { "level": 2, "name": "เครื่องเชื่อมและอุปกรณ์", "url_slug": "welding-equipment" },
    { "level": 3, "name": "ลวดเชื่อมสเตนเลส", "url_slug": "stainless-wire" }
  ],
  "filter_attributes": {
    "material": "สเตนเลส",
    "process": "ธูปเชื่อม (MMA)"
  },
  "tags": ["ออสเทนนิติก", "ทนการกัดกร่อน"],
  "created_at": "2026-08-15T10:30:00Z",
  "sold_count": 1250,
  "collections": ["popular", "just_for_you"],
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
  "specsTable": [
    { "key": "ส่วนผสมทางเคมี (%)", "value": "C: 0.01, Mn: 0.70, Si: 0.60, Ni: 10.00, Cr: 19.30" },
    { "key": "คุณสมบัติทางกล", "value": "Yield stress: 520 N/mm², Tensile strength: 590 N/mm², Elongation: 40 %" },
    { "key": "กระแสไฟฟ้าที่ใช้เชื่อม", "value": "AC หรือ DC±" },
    { "key": "กระแสไฟ (A) ตามขนาดลวด (มม.)", "value": "Ø2.0: 30-50 | Ø2.6: 50-75 | Ø3.2: 75-110 | Ø4.0: 110-150 | Ø5.0: 140-190" },
    { "key": "สีแต้ม", "value": "ปลายลวด: เหลือง, ข้างลวด: ฟ้า" },
    { "key": "ชื่อพิมพ์", "value": "AWS E308L-16" },
    { "key": "รับรองโดย", "value": "LR, มอก. 730-2530" },
    { "key": "การจำแนกประเภท", "value": "AWS/SFA5.4 E308L-16" },
    { "key": "ท่าเชื่อม", "value": "ท่าราบ, ท่าขนานนอน, ท่าเชื่อมขึ้นและท่าเชื่อมเหนือศีรษะ" }
  ],
  "richContent": {
    "headline": "ลวดเชื่อมเจมินี่ 308L สำหรับเหล็กสแตนเลส",
    "subheadline": null,
    "description": "ลวดเชื่อมเจมินี่ 308L เป็นลวดเชื่อมสเตนเลสออสเทนนิติก สารพอกหุ้มประเภทไทเทเนีย มีธาตุคาร์บอนผสมในปริมาณต่ำ ใช้สำหรับงานเชื่อมสเตนเลสทั่วไป สามารถเชื่อมเหล็กที่มีส่วนผสมของธาตุโครเมียม-นิเกิล แนวเชื่อมทนต่อการกัดกร่อนได้ดี ในสภาวะอากาศปกติ และทนต่อการกัดกร่อนของกรดอ่อนๆได้ เหมาะกับงานเชื่อมสเตนเลส AISI 302, 304, 304 L และ 304 LN\n\n***สั่งซื้อสินค้าจำนวน ติดต่อสอบถามเพิ่มเติมค่ะ***",
    "image1": "https://www.udo.co.th/storage/products/May2026/FdE0amQIiBJB06u9rNCn.jpg", 
    "image2": null,
    "image3": null
  }
};

const newJs = `// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\nexport const mockDatabase = ${JSON.stringify(db, null, 2)};\n`;
fs.writeFileSync('frontend/src/mock_database.js', newJs, 'utf8');
console.log("Updated GEMINI 308L with full raw data.");
