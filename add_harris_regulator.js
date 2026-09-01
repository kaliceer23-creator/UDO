const fs = require('fs');
let js = fs.readFileSync('frontend/src/mock_database.js', 'utf8');
const jsonStr = js.replace('export const mockDatabase = ', '').replace('// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\n', '').trim().replace(/;$/, '');
let db = JSON.parse(jsonStr);

// Overwrite the 12th product (Index 11)
db[11] = {
  "id": "harris-25gx-10-ox",
  "name": "เกจ์ปรับแรงดันก๊าซออกซิเจน HARRIS รุ่น 25GX-10-OX",
  "brand": "HARRIS",
  "sku": "25GX-10-OX",
  // คลีนข้อความ อ๊อกซิเย่น -> ออกซิเจน ลบ @@@ ทิ้ง และปรับสำนวนให้สละสลวย
  "description": "เกจ์ปรับแรงดันก๊าซออกซิเจน (หรือเกจ์ลม) HARRIS รุ่น 25GX-10-OX เหมาะสำหรับงานหนัก (Heavy Duty) สามารถปรับเร่งแรงดันขาออกได้สูงสุด 10 บาร์ และปรับอัตราการไหลของแก๊สได้อย่างละเอียดแม่นยำ เป็นเกจ์ที่ออกแบบมาสำหรับผู้ใช้งานที่ต้องการประสิทธิภาพการทำงานสูงสุดในความคุ้มค่า สินค้าทุกชิ้นผ่านการทดสอบคุณภาพ 100% จากโรงงาน",
  "created_at": "2026-09-03T10:00:00Z",
  "sold_count": 215,
  "collections": ["popular"],
  "categories": [
    { "level": 1, "name": "เครื่องมือช่างและฮาร์ดแวร์", "url_slug": "hardware" },
    { "level": 2, "name": "อุปกรณ์แก๊สและงานตัด", "url_slug": "gas-cutting-equipment" },
    { "level": 3, "name": "เกจ์ปรับแรงดันก๊าซ (Regulator)", "url_slug": "gas-regulator" }
  ],
  "filter_attributes": {
    "material": "ทองเหลืองขึ้นรูป",
    "gas_type": "ออกซิเจน (Oxygen)"
  },
  "tags": ["เกจ์ปรับแรงดัน", "HARRIS", "ออกซิเจน", "งานหนัก"],
  "images": [
    "https://www.udo.co.th/storage/products/August2019/mYCLnYld7mvuFnI8tyzR.jpg",
    "https://www.udo.co.th/storage/products/August2019/AMmeWJnjvTYywfQkwfr8.jpg",
    "https://www.udo.co.th/storage/products/August2019/9zQL5RULkv09lD1ESUMq.jpg",
    "https://www.udo.co.th/storage/products/August2019/GZzG2XEHY7QdELy6QhRT.jpg"
  ],
  "warranty": "1 ปี", // สมมติการรับประกันให้ดูพรีเมียม
  "variants": [
    { "size": "มาตรฐาน", "package": "1 ตัว", "price": 3340.00, "original_price": null, "stock": 50 }
  ],
  // ดึงคุณสมบัติหลักมาทำเป็น Specs Table ให้อ่านง่าย
  "specsTable": [
    { "key": "แรงดันขาเข้าสูงสุด", "value": "230 บาร์" },
    { "key": "แรงดันขาออกสูงสุด", "value": "10 บาร์ (เพียงพอต่อการตัดชิ้นงานหนาถึง 400 มม.)" },
    { "key": "วัสดุตัวเกจ์", "value": "ทองเหลืองขึ้นรูป (Forged Brass)" },
    { "key": "ขนาดไดอะเฟรม", "value": "70 มม. (ช่วยเพิ่มประสิทธิภาพความคงที่ของแรงดัน)" },
    { "key": "ระบบความปลอดภัย", "value": "มีฟิลเตอร์ป้องกันสิ่งสกปรกเข้าด้านในระบบ" }
  ],
  "richContent": {
    "headline": null,
    "subheadline": null,
    "description": null,
    "image1": "https://www.udo.co.th/storage/products/November2020/HRR25GX15.jpg",
    "image2": null,
    "image3": null
  }
};

const newJs = `// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\nexport const mockDatabase = ${JSON.stringify(db, null, 2)};\n`;
fs.writeFileSync('frontend/src/mock_database.js', newJs, 'utf8');
console.log("Updated HARRIS 25GX-10-OX successfully");
