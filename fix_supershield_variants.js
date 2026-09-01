const fs = require('fs');
let js = fs.readFileSync('frontend/src/mock_database.js', 'utf8');
const jsonStr = js.replace('export const mockDatabase = ', '').replace('// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\n', '').trim().replace(/;$/, '');
let db = JSON.parse(jsonStr);

const idx = db.findIndex(p => p.id === 'hyundai-supershield-11');
if (idx !== -1) {
  db[idx].variants = [
    { size: "0.8 mm", package: "1 ม้วน (5 กก.)", price: 1290.00, original_price: null, stock: 46 },
    { size: "1.0 mm", package: "1 ม้วน (5 กก.)", price: 990.00, original_price: null, stock: 100 }
  ];
}

const newJs = `// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\nexport const mockDatabase = ${JSON.stringify(db, null, 2)};\n`;
fs.writeFileSync('frontend/src/mock_database.js', newJs, 'utf8');
console.log("Updated HYUNDAI SUPERSHIELD 11 variants successfully");
