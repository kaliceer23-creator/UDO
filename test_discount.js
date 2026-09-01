const fs = require('fs');
let js = fs.readFileSync('frontend/src/mock_database.js', 'utf8');

const jsonStr = js.replace('export const mockDatabase = ', '').replace('// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\n', '').trim().replace(/;$/, '');
let db = JSON.parse(jsonStr);

// Find GEMINI 308L
const gemini = db.find(p => p.id === 'gem-308l');
if (gemini) {
  // Set original_price to be higher than price to trigger the Discount UI
  gemini.variants[0].original_price = 450.00; // 2.0 mm (Price: 370)
  gemini.variants[1].original_price = 390.00; // 2.6 mm (Price: 305)
  gemini.variants[2].original_price = 390.00; // 3.2 mm (Price: 305)
}

const newJs = `// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\nexport const mockDatabase = ${JSON.stringify(db, null, 2)};\n`;
fs.writeFileSync('frontend/src/mock_database.js', newJs, 'utf8');
console.log("Discount logic applied to GEMINI 308L");
