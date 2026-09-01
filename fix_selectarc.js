const fs = require('fs');
let js = fs.readFileSync('frontend/src/mock_database.js', 'utf8');

const jsonStr = js.replace('export const mockDatabase = ', '').replace('// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\n', '').trim().replace(/;$/, '');
let db = JSON.parse(jsonStr);

// Overwrite the 4th product (Index 3)
db[3] = {
  "id": "selectarc-zinal4",
  "name": "ลวดเชื่อมอลูมิเนียมแก๊สไส้ฟลักซ์ SELECTARC ZINAL4 TBW",
  "brand": "SELECTARC",
  "sku": "ZINAL4-TBW",
  // คลีนข้อความ และแก้ "สาระพัด" เป็น "สารพัด"
  "description": "ลวดเชื่อมอลูมิเนียมแก๊สอุณหภูมิต่ำ แบบฟลักซ์ในตัวสารพัดประโยชน์ Selectarc Zinal 4 TBW จากฝรั่งเศส มีให้เลือก 3 ขนาด 1.6, 2.0 และ 2.5 มม. ความยาวเส้นลวดยาว 50 ซม.",
  "created_at": "2026-08-26T10:00:00Z",
  "sold_count": 3150,
  "collections": ["popular"],
  "categories": [
    { "level": 1, "name": "เครื่องมือช่างและฮาร์ดแวร์", "url_slug": "hardware" },
    { "level": 2, "name": "เครื่องเชื่อมและอุปกรณ์", "url_slug": "welding-equipment" },
    { "level": 3, "name": "ลวดเชื่อมแก๊ส", "url_slug": "gas-welding-wire" }
  ],
  "filter_attributes": {
    "material": "อลูมิเนียม",
    "process": "เชื่อมแก๊ส"
  },
  "tags": ["อลูมิเนียมแก๊ส", "ฟลักซ์ในตัว", "อุณหภูมิต่ำ"],
  "images": [
    "https://www.udo.co.th/storage/products/August2019/PUGLoDG58KhJ4uwlLo9L.jpg",
    "https://www.udo.co.th/storage/products/August2019/xOYBubHmIIck1GZlhnPE.jpg",
    "https://www.udo.co.th/storage/products/August2019/j9K78w49MM4JhPHxwur9.jpg",
    "https://www.udo.co.th/storage/products/August2019/O03gRY1SzF2Uewvk9CQY.jpg",
    "https://www.udo.co.th/storage/products/August2019/fCN9ZmU4dlpPgN0FA29N.jpg"
  ],
  "warranty": null,
  // รวมปริมาณแพ็คเข้ากับขนาดเลย เพื่อให้ Dropdown แสดงผลได้เหมือนภาพจากเว็บเก่า
  "variants": [
    { "size": "1.6 mm. x 500 mm. แพ็คละ 1 กิโลกรัม", "price": 4800.00, "original_price": null, "stock": 10 },
    { "size": "1.6 mm. x 500 mm. แพ็คละ 1 เส้น", "price": 80.00, "original_price": null, "stock": 994 },
    { "size": "1.6 mm. x 500 mm. แพ็คละ 10 เส้น", "price": 800.00, "original_price": null, "stock": 92 },
    { "size": "2.0 mm. x 500 mm. แพ็คละ 1 กิโลกรัม", "price": 4800.00, "original_price": null, "stock": 10 },
    { "size": "2.0 mm. x 500 mm. แพ็คละ 1 เส้น", "price": 120.00, "original_price": null, "stock": 998 },
    { "size": "2.0 mm. x 500 mm. แพ็คละ 10 เส้น", "price": 1200.00, "original_price": null, "stock": 100 },
    { "size": "2.5 mm. x 500 mm. แพ็คละ 1 กิโลกรัม", "price": 4900.00, "original_price": null, "stock": 10 },
    { "size": "2.5 mm. x 500 mm. แพ็คละ 1 เส้น", "price": 140.00, "original_price": null, "stock": 982 },
    { "size": "2.5 mm. x 500 mm. แพ็คละ 10 เส้น", "price": 1400.00, "original_price": null, "stock": 100 }
  ],
  "packages": [
    { "name": "แพ็ค", "weight": "ตามตัวเลือกด้านล่าง", "is_active": true }
  ],
  "specsTable": [
    { "key": "คุณสมบัติเด่น", "value": "ฟลักซ์ในตัว (ไม่ต้องใช้น้ำยาประสานเพิ่ม)" },
    { "key": "ประเภทการเชื่อม", "value": "เชื่อมแก๊สอุณหภูมิต่ำ" },
    { "key": "ความยาวเส้นลวด", "value": "50 เซนติเมตร (500 mm)" },
    { "key": "แหล่งกำเนิด", "value": "ประเทศฝรั่งเศส" }
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
console.log("Updated SELECTARC ZINAL4 successfully");
