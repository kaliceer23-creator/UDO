const fs = require('fs');
let js = fs.readFileSync('frontend/src/mock_database.js', 'utf8');
const jsonStr = js.replace('export const mockDatabase = ', '').replace('// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\n', '').trim().replace(/;$/, '');
let db = JSON.parse(jsonStr);

// Overwrite the 19th product (Index 18)
db[18] = {
  "id": "champ-high-pressure-n2-203-50m",
  "name": "เกจ์ปรับแรงดันไฮเพรสเชอร์ก๊าซไนโตรเจน CHAMP 203-50M-N2",
  "brand": "CHAMP",
  "sku": "203-50M-N2",
  // คลีนข้อความ พิมพ์ผิด (ได้ดันสูงสุด) และเสริมคำศัพท์ทางช่างให้ดูมืออาชีพ
  "description": "เกจ์ปรับแรงดันสูงก๊าซไนโตรเจน (High Pressure Nitrogen Regulator) CHAMP รุ่น 203-50M-N2 นำเข้าจากประเทศไต้หวัน ตัวเรือนผลิตจากทองเหลืองขึ้นรูป (Forged Brass) แข็งแรงทนทาน มาพร้อมระบบกรองสิ่งสกปรก เหมาะอย่างยิ่งสำหรับงานที่ต้องการไล่ความชื้นในระบบ หรือตรวจเช็ครอยรั่วในระบบ (Pressure Test) สามารถปรับเร่งแรงดันขาออกได้สูงสุดถึง 50 บาร์ (725 PSI)",
  "created_at": "2026-09-10T10:00:00Z",
  "sold_count": 142,
  "collections": ["popular"],
  "categories": [
    { "level": 1, "name": "เครื่องมือช่างและฮาร์ดแวร์", "url_slug": "hardware" },
    { "level": 2, "name": "อุปกรณ์แก๊สและงานตัด", "url_slug": "gas-cutting-equipment" },
    { "level": 3, "name": "เกจ์ปรับแรงดันก๊าซ (Regulator)", "url_slug": "gas-regulator" }
  ],
  "filter_attributes": {
    "gas_type": "ก๊าซไนโตรเจน (N2)",
    "material": "ทองเหลืองขึ้นรูป"
  },
  "tags": ["เกจ์ไนโตรเจน", "CHAMP", "High Pressure", "ไล่ระบบ", "เกจ์ปรับแรงดันสูง"],
  "images": [
    "https://www.udo.co.th/storage/products/February2022/qclI5lXylqQ4cXPA0EXh.jpg",
    "https://www.udo.co.th/storage/products/April2019/aUjbxZJRG6n8ewtA3aCA.jpg",
    "https://www.udo.co.th/storage/products/April2019/dMGLJjJP6dKZUUQLEQk3.jpg",
    "https://www.udo.co.th/storage/products/February2022/B617ycI6Y7tFzRkabooa.jpg"
  ],
  "warranty": null,
  "variants": [
    { "size": "มาตรฐาน", "package": "1 ตัว", "price": 2700.00, "original_price": null, "stock": 30 }
  ],
  "specsTable": [
    { "key": "ประเภทแก๊ส", "value": "ก๊าซไนโตรเจน (N2)" },
    { "key": "แรงดันขาออกสูงสุด", "value": "50 บาร์ (725 PSI)" },
    { "key": "วัสดุตัวเรือน", "value": "ทองเหลืองขึ้นรูป (Forged Brass)" },
    { "key": "แหล่งผลิต", "value": "ประเทศไต้หวัน (Made in Taiwan)" },
    { "key": "การใช้งานหลัก", "value": "งานไล่ความชื้นและตรวจสอบระบบ (Pressure Test)" },
    { "key": "ข้อมูลการบรรจุ (สำหรับขายส่ง)", "value": "1 ลัง บรรจุ 6 ตัว" }
  ],
  "richContent": {
    "headline": null,
    "subheadline": null,
    "description": null,
    "image1": "https://www.udo.co.th/storage/products/June2020/CHR2031.jpg",
    "image2": null,
    "image3": null
  }
};

const newJs = `// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\nexport const mockDatabase = ${JSON.stringify(db, null, 2)};\n`;
fs.writeFileSync('frontend/src/mock_database.js', newJs, 'utf8');
console.log("Updated CHAMP Nitrogen Regulator successfully");
