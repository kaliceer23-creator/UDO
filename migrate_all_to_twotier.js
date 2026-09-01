const fs = require('fs');
let js = fs.readFileSync('frontend/src/mock_database.js', 'utf8');

const jsonStr = js.replace('export const mockDatabase = ', '').replace('// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\n', '').trim().replace(/;$/, '');
let db = JSON.parse(jsonStr);

// Product 0: GEMINI 308L
if (db[0] && db[0].id === 'gem-308l') {
  db[0].variants = db[0].variants.map(v => ({ ...v, package: "1 ห่อ (1 กก.)" }));
  db[0].packages = []; // clear old packages
}

// Product 1: GOLD 330
if (db[1] && db[1].id === 'gold-330') {
  db[1].variants = db[1].variants.map(v => ({ ...v, package: "1 ห่อ (1 กก.)" }));
  db[1].packages = [];
}

// Product 2: HYUNDAI SM-308L
if (db[2] && db[2].id === 'hyundai-sm-308l') {
  // We remove the stock 0 logic to normal if needed, or keep it.
  // We'll set the package explicitly.
  db[2].variants = db[2].variants.map(v => ({ ...v, package: "1 ม้วน (12.5 กก.)" }));
  // Test the disabled state rule: Let's make 0.9 mm out of stock for Hyundai
  const v09 = db[2].variants.find(v => v.size === "0.9 mm");
  if(v09) v09.stock = 0;
  
  db[2].packages = []; // This removes the redundant 'ห่อ' and 'ม้วน'
}

const newJs = `// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\nexport const mockDatabase = ${JSON.stringify(db, null, 2)};\n`;
fs.writeFileSync('frontend/src/mock_database.js', newJs, 'utf8');
console.log("Migrated all products to the modern Two-Tier system.");
