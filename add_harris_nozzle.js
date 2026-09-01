const fs = require('fs');
let js = fs.readFileSync('frontend/src/mock_database.js', 'utf8');
const jsonStr = js.replace('export const mockDatabase = ', '').replace('// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\n', '').trim().replace(/;$/, '');
let db = JSON.parse(jsonStr);

const sizes_240 = ["6290-000NX", "6290-00NX", "6290-0NX", "6290-1NX", "6290-2NX", "6290-3NX", "6290-4NX"];
const sizes_250 = ["6290-5NX", "6290-6NX"];

let variants = [];

sizes_240.forEach(size => {
  variants.push({ size, package: "1 ตัว", price: 240.00, stock: 500 });
  variants.push({ size, package: "แพ็ค 50 ตัว (ราคาส่ง)", price: 11500.00, stock: 10 }); // 230 * 50
  variants.push({ size, package: "แพ็ค 100 ตัว (ราคาส่ง)", price: 22000.00, stock: 50 }); // 220 * 100
});

sizes_250.forEach(size => {
  variants.push({ size, package: "1 ตัว", price: 250.00, stock: 100 });
  variants.push({ size, package: "แพ็ค 50 ตัว (ราคาส่ง)", price: 11500.00, stock: 10 });
  variants.push({ size, package: "แพ็ค 100 ตัว (ราคาส่ง)", price: 22000.00, stock: 50 });
});

// Overwrite the 13th product (Index 12)
db[12] = {
  "id": "harris-6290-nx",
  "name": "นมหนูหัวตัดแก๊ส HARRIS 6290-NX",
  "brand": "HARRIS",
  "sku": "6290-NX",
  "description": "นมหนูหัวตัดแก๊ส HARRIS 6290-NX เป็นหัวตัดสองชั้นสำหรับแก๊สแอลพีจี (LPG) นมหนูตัดของ HARRIS ถือว่าเป็นต้นแบบมาตรฐานสำหรับหัวตัดแก๊สยี่ห้ออื่นๆ ทั่วโลก ให้งานตัดที่เรียบคม แข็งแรงทนทาน เหมาะสำหรับงานตัดเหล็กทั่วไป มีให้เลือกหลากหลายเบอร์ตามความหนาของชิ้นงานที่ต้องการตัด สินค้ารับประกันของแท้ 100%",
  "created_at": "2026-09-04T10:00:00Z",
  "sold_count": 8700,
  "collections": ["popular"],
  "categories": [
    { "level": 1, "name": "เครื่องมือช่างและฮาร์ดแวร์", "url_slug": "hardware" },
    { "level": 2, "name": "อุปกรณ์แก๊สและงานตัด", "url_slug": "gas-cutting-equipment" },
    { "level": 3, "name": "หัวตัดแก๊ส / นมหนู (Cutting Nozzle)", "url_slug": "cutting-nozzle" }
  ],
  "filter_attributes": {
    "material": "ทองเหลือง",
    "gas_type": "แก๊ส LPG"
  },
  "tags": ["นมหนูหัวตัด", "HARRIS", "6290-NX", "LPG"],
  "images": [
    "https://www.udo.co.th/storage/products/September2018/8YgtmQVzdnjWQfhe8a1J.jpg"
  ],
  "warranty": "รับประกันของแท้ 100%",
  "variants": variants,
  "specsTable": [
    { "key": "ประเภทแก๊ส", "value": "แอลพีจี (LPG)" },
    { "key": "ลักษณะหัวตัด", "value": "แบบ 2 ชั้น (Two-Piece)" },
    { "key": "ลักษณะการใช้งาน", "value": "งานตัดเหล็กทั่วไป" },
    { "key": "คุณสมบัติเด่น", "value": "ตัดเรียบคม, แข็งแรงทนทาน, ต้นแบบมาตรฐานหัวตัดแก๊ส" },
    { "key": "ข้อมูลขายส่ง", "value": "มีเรทราคาส่งสำหรับ 50 ตัว และ 100 ตัวขึ้นไป (สามารถกดเลือกซื้อแบบแพ็คได้เลย)" }
  ],
  "richContent": {
    "headline": null,
    "subheadline": null,
    "description": null,
    "image1": "https://www.udo.co.th/storage/products/January2020/HR6290NX.jpg",
    "image2": null,
    "image3": null
  }
};

const newJs = `// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\nexport const mockDatabase = ${JSON.stringify(db, null, 2)};\n`;
fs.writeFileSync('frontend/src/mock_database.js', newJs, 'utf8');
console.log("Updated HARRIS 6290-NX successfully");
