const fs = require('fs');
let js = fs.readFileSync('frontend/src/mock_database.js', 'utf8');

const jsonStr = js.replace('export const mockDatabase = ', '').replace('// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\n', '').trim().replace(/;$/, '');
let db = JSON.parse(jsonStr);

// Find HYUNDAI SM-308L and update variants based on the image
const idx = db.findIndex(p => p.id === 'hyundai-sm-308l');
if (idx !== -1) {
  db[idx].variants = [
    { size: "0.8 mm", price: 5400.00, original_price: null, stock: 10 },
    { size: "0.9 mm", price: 5200.00, original_price: null, stock: 0 },
    { size: "1.2 mm", price: 4850.00, original_price: null, stock: 10 }
  ];
}

const newJs = `// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\nexport const mockDatabase = ${JSON.stringify(db, null, 2)};\n`;
fs.writeFileSync('frontend/src/mock_database.js', newJs, 'utf8');
console.log("Updated HYUNDAI SM-308L variants based on the image.");
