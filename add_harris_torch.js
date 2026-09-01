const fs = require('fs');
let js = fs.readFileSync('frontend/src/mock_database.js', 'utf8');
const jsonStr = js.replace('export const mockDatabase = ', '').replace('// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\n', '').trim().replace(/;$/, '');
let db = JSON.parse(jsonStr);

// Overwrite the 15th product (Index 14)
db[14] = {
  "id": "harris-62-5f-lpg",
  "name": "ชุดตัดแก๊ส HARRIS 62-5F (LPG)",
  "brand": "HARRIS",
  "sku": "62-5F-LPG",
  // คลีนคำโปรโมตขยะ และจัดรูปประโยคใหม่
  "description": "ชุดตัดแก๊ส HARRIS 62-5F สำหรับแก๊สแอลพีจี (LPG) เหมาะสำหรับงานอุตสาหกรรมและงานตัดทั่วไป มาพร้อมระบบมิกเซอร์แบบหัวฉีด (Injector Mixer) ที่ช่วยควบคุมระดับความร้อนให้คงที่ตลอดการตัดชิ้นงาน สามารถปรับเปลวไฟได้อย่างแม่นยำและรวดเร็ว รองรับการตัดชิ้นงานได้หนาสูงสุดถึง 300 มม. สินค้ารับประกันของแท้ 100%",
  "created_at": "2026-09-06T10:00:00Z",
  "sold_count": 480,
  "collections": ["promotion", "popular"],
  "categories": [
    { "level": 1, "name": "เครื่องมือช่างและฮาร์ดแวร์", "url_slug": "hardware" },
    { "level": 2, "name": "อุปกรณ์แก๊สและงานตัด", "url_slug": "gas-cutting-equipment" },
    { "level": 3, "name": "ชุดตัดแก๊ส (Cutting Torch)", "url_slug": "cutting-torch" }
  ],
  "filter_attributes": {
    "gas_type": "แก๊ส LPG (แอลพีจี)"
  },
  "tags": ["ชุดตัดแก๊ส", "HARRIS", "62-5F", "LPG", "ของแท้"],
  "images": [
    "https://www.udo.co.th/storage/products/September2018/UedAxC0cHKyPB0PbOEAl.jpg"
  ],
  "warranty": "รับประกันของแท้ 100%",
  "variants": [
    { "size": "มาตรฐาน", "package": "1 ชุด", "price": 5300.00, "original_price": 6250.00, "stock": 25 }
  ],
  "specsTable": [
    { "key": "ประเภทแก๊ส", "value": "แอลพีจี (LPG)" },
    { "key": "ระบบมิกเซอร์ (Mixer)", "value": "แบบหัวฉีด (Injector Mixer) ช่วยคุมความร้อนคงที่" },
    { "key": "ประสิทธิภาพการตัด", "value": "ตัดชิ้นงานหนาได้สูงสุด 300 มม." },
    { "key": "การใช้งาน", "value": "งานอุตสาหกรรมและงานตัดเหล็กทั่วไป" }
  ],
  "richContent": {
    "headline": null,
    "subheadline": null,
    "description": null,
    "image1": "https://www.udo.co.th/storage/products/January2020/CUTTING-TORCH-HARRIS_22.jpg",
    "image2": "https://www.udo.co.th/storage/products/September2018/%20HARRIS%2062-5F.jpg",
    "image3": null
  }
};

const newJs = `// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\nexport const mockDatabase = ${JSON.stringify(db, null, 2)};\n`;
fs.writeFileSync('frontend/src/mock_database.js', newJs, 'utf8');
console.log("Updated HARRIS 62-5F successfully");
