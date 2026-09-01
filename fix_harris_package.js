const fs = require('fs');
let js = fs.readFileSync('frontend/src/mock_database.js', 'utf8');
const jsonStr = js.replace('export const mockDatabase = ', '').replace('// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\n', '').trim().replace(/;$/, '');
let db = JSON.parse(jsonStr);

const idx = db.findIndex(p => p.id === 'harris-25gx-10-ox');
if (idx !== -1) {
  // Update package name to be very clear for wholesale
  db[idx].variants[0].package = "1 ตัว (1 ลังบรรจุ 12 ตัว)";
}

const newJs = `// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\nexport const mockDatabase = ${JSON.stringify(db, null, 2)};\n`;
fs.writeFileSync('frontend/src/mock_database.js', newJs, 'utf8');
console.log("Updated package name for Harris");
