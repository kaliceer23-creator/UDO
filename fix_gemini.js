const fs = require('fs');

// Read the current mock database
let js = fs.readFileSync('frontend/src/mock_database.js', 'utf8');

// Extract the array using eval or similar, but since it's ES module, we can strip the export part, parse JSON, modify, and rewrite.
const jsonStr = js.replace('export const mockDatabase = ', '').replace('// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\n', '').trim().replace(/;$/, '');
let db = JSON.parse(jsonStr);

// Overwrite the first product (GEMINI 308L) with the EXACT master schema prototype
db[0] = {
  "id": "gem-308l", // Keep this ID so the URL doesn't break
  "name": "ลวดเชื่อมสเตนเลสไฟฟ้า GEMINI 308L (E308L-16)",
  "brand": "GEMINI",
  "sku": "GEM-308L",
  "description": "ลวดเชื่อมเจมินี่ 308L เป็นลวดเชื่อมสเตนเลสออสเทนนิติก สารพอกหุ้มประเภทไทเทเนีย มีธาตุคาร์บอนผสมในปริมาณต่ำ ใช้สำหรับงานเชื่อมสเตนเลสทั่วไป สแตนเลสสตีล แสตนเลสเกรด 304 และ 304L สามารถเชื่อมเหล็กที่มีส่วนผสมของธาตุโครเมียม-นิเกิล แนวเชื่อมทนต่อการกัดกร่อนได้ดีเยี่ยม",
  "categories": [
    { "level": 1, "name": "เครื่องมือช่างและฮาร์ดแวร์", "url_slug": "hardware" },
    { "level": 2, "name": "เครื่องเชื่อมและอุปกรณ์", "url_slug": "welding-equipment" },
    { "level": 3, "name": "ลวดเชื่อมสเตนเลส", "url_slug": "stainless-wire" }
  ],
  "filter_attributes": {
    "material": "สเตนเลส",
    "process": "ธูปเชื่อม (MMA)"
  },
  "tags": ["ทนการกัดกร่อน", "ออสเทนนิติก"],
  "created_at": "2026-08-15T10:30:00Z",
  "sold_count": 1250,
  "collections": ["popular", "just_for_you"],
  "images": [
    "https://www.udo.co.th/storage/products/May2026/FdE0amQIiBJB06u9rNCn.jpg"
  ],
  "warranty": null,
  "variants": [
    { "size": "2.0 mm", "price": 370.00, "original_price": null, "stock": 10 },
    { "size": "2.6 mm", "price": 305.00, "original_price": 350.00, "stock": 100 },
    { "size": "4.0 mm", "price": 305.00, "original_price": null, "stock": 0 }
  ],
  "packages": [
    { "name": "ห่อ", "weight": "1 กก.", "is_active": true },
    { "name": "ลัง", "weight": "10 กก.", "is_active": false }
  ],
  "specsTable": [
    { "key": "ส่วนผสมทางเคมี", "value": "C: 0.01%, Mn: 0.70%, Si: 0.60%, Ni: 10.0%, Cr: 19.3%" },
    { "key": "คุณสมบัติทางกล", "value": "Yield stress: 520 N/mm², Tensile strength: 590 N/mm², Elongation: 40%" },
    { "key": "กระแสไฟฟ้าที่ใช้เชื่อม", "value": "AC หรือ DC±" },
    { "key": "มาตรฐานรับรอง", "value": "LR, มอก. 730-2530" },
    { "key": "ท่าเชื่อม", "value": "ท่าราบ, ท่าขนานนอน, ท่าเชื่อมขึ้น, ท่าเชื่อมเหนือศีรษะ" }
  ],
  "richContent": {
    "headline": "ลวดเชื่อมสเตนเลสไฟฟ้า GEMINI 308L คุณภาพมาตรฐานสากล",
    "subheadline": "แนวเชื่อมสวยงาม ทนต่อการกัดกร่อนได้อย่างดีเยี่ยม",
    "description": "เมื่อเป็นงานเชื่อมสเตนเลส GEMINI 308L คือคำตอบสุดท้าย สามารถเชื่อมเหล็กที่มีส่วนผสมของธาตุโครเมียม-นิเกิล แนวเชื่อมสวยงาม สแล็กร่อนออกง่าย ทนต่อการกัดกร่อนได้อย่างดีเยี่ยมตามมาตรฐานอุตสาหกรรม",
    "image1": "https://via.placeholder.com/1200x600/e5e7eb/6b7280?text=Mockup+Banner+1",
    "image2": "https://via.placeholder.com/1200x600/e5e7eb/6b7280?text=Mockup+Banner+2",
    "image3": "https://via.placeholder.com/1200x600/e5e7eb/6b7280?text=Mockup+Banner+3"
  }
};

const newJs = `// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\nexport const mockDatabase = ${JSON.stringify(db, null, 2)};\n`;
fs.writeFileSync('frontend/src/mock_database.js', newJs, 'utf8');
console.log("Restored GEMINI 308L to EXACT Master Prototype");
