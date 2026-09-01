const fs = require('fs');
let js = fs.readFileSync('frontend/src/mock_database.js', 'utf8');

const jsonStr = js.replace('export const mockDatabase = ', '').replace('// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\n', '').trim().replace(/;$/, '');
let db = JSON.parse(jsonStr);

// Find and overwrite GOLD 330 (Index 1)
db[1] = {
  "id": "gold-330",
  // แก้ไขคำผิดจาก "สาระพัด" เป็น "สารพัด"
  "name": "ลวดเชื่อมไฟฟ้า GOLD 330 (สารพัดประโยชน์)", 
  "brand": "GOLD",
  "sku": "GOLD-330",
  // นำเนื้อหามาเรียบเรียงเป็นย่อหน้าเดียวที่อ่านง่ายและกระชับ
  "description": "ลวดเชื่อมไฟฟ้า GOLD 330 (สารพัดประโยชน์) ใช้งานได้หลากหลายประเภทชิ้นงาน สำหรับงานซ่อมบำรุงชิ้นงาน ALLOY อัลลอยสตีล, HI-ALLOY ไฮอัลลอยสตีล, TOOL STEEL ทูลส์สตีล, COLD WORKING STEEL, HIGH SPEED STEEL, สแตนเลสสตีล, แมงกานีส, โลหะต่างชนิด และอื่นๆ ลวดเชื่อมมีส่วนผสมของ โครเมียม, นิกเกิล, แมงกานีส ให้ค่าความแข็ง ประมาณ 24-28 HRC สามารถเชื่อมซ่อมแซมแม่พิมพ์, เชื่อมคมตัด, ข้อเหวี่ยงเกียร์, ชิ้นส่วนรถขุดตักได้เป็นอย่างดี",
  "created_at": "2026-08-20T10:00:00Z",
  "sold_count": 850,
  "collections": ["popular"],
  "categories": [
    { "level": 1, "name": "เครื่องมือช่างและฮาร์ดแวร์", "url_slug": "hardware" },
    { "level": 2, "name": "เครื่องเชื่อมและอุปกรณ์", "url_slug": "welding-equipment" },
    { "level": 3, "name": "ลวดเชื่อมซ่อมบำรุง", "url_slug": "maintenance-welding-wire" }
  ],
  "filter_attributes": {
    "material": "โลหะต่างชนิด",
    "process": "ธูปเชื่อม (MMA)"
  },
  // สร้าง Tags ดึงดูดสายตา
  "tags": ["ซ่อมบำรุง", "โลหะต่างชนิด", "สารพัดประโยชน์"],
  "images": [
    "https://www.udo.co.th/storage/products/November2019/5bNnSY3R9jZNo4KyS9Kx.jpg"
  ],
  "warranty": null,
  "variants": [
    { "size": "3.2 mm", "price": 1950.00, "original_price": null, "stock": 40 }
  ],
  "packages": [
    { "name": "ห่อ", "weight": "1 กก.", "is_active": true }
  ],
  // ตาราง SpecsTable ที่สกัดจากข้อความดิบ และจัดกลุ่มหัวข้อให้สอดคล้องกับ Master
  "specsTable": [
    // ใช้คำว่า "ส่วนผสมทางเคมี" ให้เหมือน GEMINI
    { "key": "ส่วนผสมทางเคมี", "value": "Cr (โครเมียม), Ni (นิกเกิล), Mn (แมงกานีส)" },
    // สร้างหมวดใหม่สำหรับสายซ่อมบำรุง แต่ใช้คำที่เป็นทางการ
    { "key": "ค่าความแข็ง (Hardness)", "value": "24-28 HRC" },
    { "key": "ลักษณะการใช้งาน", "value": "ซ่อมแซมแม่พิมพ์, เชื่อมคมตัด, ข้อเหวี่ยงเกียร์, ชิ้นส่วนรถขุดตัก" },
    { "key": "วัสดุที่รองรับ (Base Metals)", "value": "Alloy Steel, Hi-Alloy, Tool Steel, Cold Working Steel, High Speed Steel, Stainless Steel, Manganese, โลหะต่างชนิด" }
  ],
  "richContent": {
    // ปล่อย Null ให้ดึง Title/Desc ตัวเต็มมาเรียงอัตโนมัติ
    "headline": null,
    "subheadline": null,
    "description": null,
    "image1": "https://www.udo.co.th/storage/products/June2021/Gold-330.jpg",
    "image2": null,
    "image3": null
  }
};

const newJs = `// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\nexport const mockDatabase = ${JSON.stringify(db, null, 2)};\n`;
fs.writeFileSync('frontend/src/mock_database.js', newJs, 'utf8');
console.log("Updated GOLD 330 with purely cleansed real data");
