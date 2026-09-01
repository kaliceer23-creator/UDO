const fs = require('fs');
let js = fs.readFileSync('frontend/src/mock_database.js', 'utf8');

const jsonStr = js.replace('export const mockDatabase = ', '').replace('// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\n', '').trim().replace(/;$/, '');
let db = JSON.parse(jsonStr);

// Find SELECTARC ZINAL4
const idx = db.findIndex(p => p.id === 'selectarc-zinal4');
if (idx !== -1) {
  // รวม Text เก่าและใหม่เข้าด้วยกัน และแก้คำผิดเช่น เหล็กกังวาลไนซ์ -> เหล็กกัลวาไนซ์, อลูมเนียม -> อลูมิเนียม
  // ตัดข้อความขยะ ***โปรโมชั่นจัดส่งฟรี*** และ ***แพ็คละ...*** ออกเพราะมีในตัวเลือกด้านบนแล้ว
  db[idx].description = "ลวดเชื่อมอลูมิเนียมแก๊สไส้ฟลักซ์อุณหภูมิต่ำ (จุดหลอมเหลวต่ำ) Selectarc Zinal 4 TBW จากประเทศฝรั่งเศส เป็นลวดเชื่อมสารพัดประโยชน์ที่สามารถเชื่อมได้ทุกกระบวนการเชื่อมแก๊ส รวมถึงหัวพ่นแก๊สกระป๋อง จุดเด่นคือสามารถเชื่อมประสานชิ้นงานโลหะต่างชนิดกันได้อย่างดีเยี่ยม เช่น อลูมิเนียมเชื่อมกับทองแดง, ทองเหลือง, สเตนเลส, เหล็ก, เหล็กหล่อ, เหล็กกัลวาไนซ์ และโลหะอื่นๆ อีกมากมาย";
  
  // อัปเดตตารางสเปค เพื่อเน้นจุดเด่นเรื่องการเชื่อมโลหะต่างชนิด (Selling Point สำคัญ)
  db[idx].specsTable = [
    { "key": "คุณสมบัติเด่น", "value": "ฟลักซ์ในตัว (ไม่ต้องใช้น้ำยาประสานเพิ่ม), จุดหลอมเหลวต่ำ" },
    { "key": "วัสดุที่รองรับ (Base Metals)", "value": "อลูมิเนียมเชื่อมประสานกับ ทองแดง, ทองเหลือง, สเตนเลส, เหล็ก, เหล็กหล่อ, เหล็กกัลวาไนซ์" },
    { "key": "กระบวนการเชื่อม", "value": "รองรับทุกกระบวนการเชื่อมแก๊ส รวมถึงหัวพ่นแก๊สกระป๋อง" },
    { "key": "แหล่งกำเนิด", "value": "ประเทศฝรั่งเศส" }
  ];

  // เพิ่มรูป Rich Content
  db[idx].richContent.image1 = "https://www.udo.co.th/storage/products/August2019/IMG_6735.JPG";
}

const newJs = `// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\nexport const mockDatabase = ${JSON.stringify(db, null, 2)};\n`;
fs.writeFileSync('frontend/src/mock_database.js', newJs, 'utf8');
console.log("Updated SELECTARC ZINAL4 with extra text and rich image.");
