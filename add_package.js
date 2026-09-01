const fs = require('fs');
let js = fs.readFileSync('frontend/src/mock_database.js', 'utf8');

const jsonStr = js.replace('export const mockDatabase = ', '').replace('// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\n', '').trim().replace(/;$/, '');
let db = JSON.parse(jsonStr);

// Find HYUNDAI SM-308L
const idx = db.findIndex(p => p.id === 'hyundai-sm-308l');
if (idx !== -1) {
  db[idx].packages = [
    { name: "ม้วน", weight: "12.5 กก.", is_active: true },
    { name: "ห่อ", weight: "1 กก.", is_active: false }
  ];
}

const newJs = `// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\nexport const mockDatabase = ${JSON.stringify(db, null, 2)};\n`;
fs.writeFileSync('frontend/src/mock_database.js', newJs, 'utf8');
console.log("Added ห่อ to HYUNDAI SM-308L packages.");
