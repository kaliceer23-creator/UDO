const fs = require('fs');
let js = fs.readFileSync('frontend/src/mock_database.js', 'utf8');
const jsonStr = js.replace('export const mockDatabase = ', '').replace('// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\n', '').trim().replace(/;$/, '');
let db = JSON.parse(jsonStr);

// Overwrite the 10th product (Index 9)
db[9] = {
  "id": "powerweld-mc4043m",
  "name": "ลวดเชื่อมมิกอลูมิเนียม POWERWELD MC-4043M",
  "brand": "POWERWELD",
  "sku": "MC-4043M",
  // คลีนข้อความ ลบลิงก์ขยะและขนาดแพ็คเกจออกจากคำอธิบายหลัก
  "description": "ลวดเชื่อมมิกอลูมิเนียม (MIG) POWERWELD MC-4043M เหมาะอย่างยิ่งสำหรับการเชื่อมชิ้นงานอลูมิเนียมเกรด 3003, 3004, 5052, 6061 และ 6063 รวมถึงงานประกอบและซ่อมแซมชิ้นส่วนยานยนต์, เฟรมมอเตอร์ไซค์ และเฟรมจักรยาน",
  "created_at": "2026-09-01T10:00:00Z",
  "sold_count": 420,
  "collections": ["popular"],
  "categories": [
    { "level": 1, "name": "เครื่องมือช่างและฮาร์ดแวร์", "url_slug": "hardware" },
    { "level": 2, "name": "เครื่องเชื่อมและอุปกรณ์", "url_slug": "welding-equipment" },
    { "level": 3, "name": "ลวดเชื่อมมิก (MIG/MAG)", "url_slug": "mig-wire" }
  ],
  "filter_attributes": {
    "material": "อลูมิเนียม",
    "process": "ลวดเชื่อมมิก (MIG)"
  },
  "tags": ["ลวดเชื่อมอลูมิเนียม", "มิกอลูมิเนียม", "4043"],
  "images": [
    "https://www.udo.co.th/storage/products/June2020/wd0oB0OkmLe2yXoOJL3r.jpg",
    "https://www.udo.co.th/storage/products/June2020/PhLdBhw8UewmHd9lszQt.jpg"
  ],
  "warranty": null,
  "variants": [
    { "size": "0.8 mm", "package": "1 ม้วน (0.5 กก.)", "price": 520.00, "original_price": null, "stock": 100 }
  ],
  "specsTable": [
    { "key": "เกรดอลูมิเนียมที่รองรับ", "value": "3003, 3004, 5052, 6061, 6063" },
    { "key": "ลักษณะการใช้งาน", "value": "เชื่อมประกอบและซ่อมแซมชิ้นส่วนยานยนต์, เฟรมมอเตอร์ไซค์, เฟรมจักรยาน" }
  ],
  "richContent": {
    "headline": null,
    "subheadline": null,
    "description": null,
    "image1": "https://www.udo.co.th/storage/products/June2020/MC-4043R1.JPG",
    "image2": null,
    "image3": null
  }
};

const newJs = `// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\nexport const mockDatabase = ${JSON.stringify(db, null, 2)};\n`;
fs.writeFileSync('frontend/src/mock_database.js', newJs, 'utf8');
console.log("Updated POWERWELD MC-4043M successfully");
