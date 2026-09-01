const fs = require('fs');
let js = fs.readFileSync('frontend/src/mock_database.js', 'utf8');
const jsonStr = js.replace('export const mockDatabase = ', '').replace('// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\n', '').trim().replace(/;$/, '');
let db = JSON.parse(jsonStr);

// Overwrite the 22nd product (Index 21)
db[21] = {
  "id": "champ-low-fuming-bronze-fc",
  "name": "ลวดเชื่อมแก๊สทองเหลืองหุ้มฟลักซ์ CHAMP LOW FUMING BRONZE FC",
  "brand": "CHAMP",
  "sku": "LOW-FUMING-BRONZE-FC",
  // คลีนคำผิดรุนแรง (แสตนเลส -> สเตนเลส, หลวมเหลว -> หลอมละลาย, เซลเซียล -> เซลเซียส) และเรียบเรียงใหม่
  "description": "ลวดเชื่อมแก๊สทองเหลืองหุ้มฟลักซ์ CHAMP LOW FUMING BRONZE FC (มาตรฐาน AWS A5.8 RBCuZn-C) สำหรับงานเชื่อมซ่อมบำรุงด้วยกระบวนการแก๊ส (Oxy-Fuel) ตัวฟลักซ์หุ้มมีประสิทธิภาพดีเยี่ยมช่วยลดการเกิดควันขณะเชื่อม สามารถเชื่อมซ่อมสร้างชิ้นงานได้หลากหลาย เช่น ทองเหลือง, เหล็ก, เหล็กหล่อ, ทองแดง และสเตนเลส ให้แนวเชื่อมที่สมบูรณ์ปราศจากฟองอากาศ สีแนวเชื่อมสวยงามกลมกลืนกับวัสดุทองเหลือง และสามารถกลึงแต่งรูปร่างได้ง่าย",
  "created_at": "2026-09-13T10:00:00Z",
  "sold_count": 310,
  "collections": ["popular"],
  "categories": [
    { "level": 1, "name": "เครื่องมือช่างและฮาร์ดแวร์", "url_slug": "hardware" },
    { "level": 2, "name": "เครื่องเชื่อมและอุปกรณ์", "url_slug": "welding-equipment" },
    { "level": 3, "name": "ลวดเชื่อมแก๊ส", "url_slug": "gas-welding-wire" }
  ],
  "filter_attributes": {
    "material": "ทองเหลืองหุ้มฟลักซ์",
    "process": "ลวดเชื่อมแก๊ส (Oxy-Fuel)"
  },
  "tags": ["ลวดเชื่อมทองเหลือง", "หุ้มฟลักซ์", "CHAMP", "RBCuZn-C", "Low Fuming"],
  "images": [
    "https://www.udo.co.th/storage/products/August2020/uHiNab1AxoixODNydFCx.jpg",
    "https://www.udo.co.th/storage/products/August2020/qelgkkXn31mOz8MiPnDd.jpg",
    "https://www.udo.co.th/storage/products/August2020/ZfuPpzTDG2vwGDGMT12o.jpg"
  ],
  "warranty": null,
  "variants": [
    { "size": "2.5 x 1000 mm", "package": "1 แพ็ค (1 กก.)", "price": 680.00, "original_price": null, "stock": 500 },
    { "size": "2.5 x 1000 mm", "package": "1 หลอด (5 กก.)", "price": 3250.00, "original_price": null, "stock": 100 },
    { "size": "3.2 x 1000 mm", "package": "1 แพ็ค (1 กก.)", "price": 680.00, "original_price": null, "stock": 497 },
    { "size": "3.2 x 1000 mm", "package": "1 หลอด (5 กก.)", "price": 3250.00, "original_price": null, "stock": 100 }
  ],
  // ย้ายข้อมูลวิศวกรรมทั้งหมดลงมาที่ตารางสเปคให้อ่านง่าย
  "specsTable": [
    { "key": "มาตรฐานการรับรอง", "value": "AWS A5.8 RBCuZn-C" },
    { "key": "ค่าความแข็ง (Hardness)", "value": "96 HB (Brinell)" },
    { "key": "ค่าแรงดึง (Tensile Strength)", "value": "71,000 ปอนด์" },
    { "key": "จุดหลอมละลาย", "value": "888 °C (อุณหภูมิใช้งาน 871 - 938 °C)" },
    { "key": "คำแนะนำก่อนเชื่อม", "value": "ควรทำความสะอาดคราบสนิม น้ำมัน จาระบี และบากร่องหากชิ้นงานหนา" },
    { "key": "คำแนะนำหลังเชื่อม", "value": "ควรทำความสะอาดคราบฟลักซ์ด้วยแปรงและน้ำร้อน" }
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
console.log("Updated CHAMP Low Fuming Bronze FC successfully");
