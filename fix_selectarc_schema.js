const fs = require('fs');
let js = fs.readFileSync('frontend/src/mock_database.js', 'utf8');
const jsonStr = js.replace('export const mockDatabase = ', '').replace('// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\n', '').trim().replace(/;$/, '');
let db = JSON.parse(jsonStr);

const idx = db.findIndex(p => p.id === 'selectarc-zinal4');
if (idx !== -1) {
  db[idx].variants = [
    { size: "1.6 mm.", package: "1 กิโลกรัม", price: 4800.00, original_price: null, stock: 10 },
    { size: "1.6 mm.", package: "1 เส้น", price: 80.00, original_price: null, stock: 994 },
    { size: "1.6 mm.", package: "10 เส้น", price: 800.00, original_price: null, stock: 92 },
    { size: "2.0 mm.", package: "1 กิโลกรัม", price: 4800.00, original_price: null, stock: 10 },
    { size: "2.0 mm.", package: "1 เส้น", price: 120.00, original_price: null, stock: 998 },
    { size: "2.0 mm.", package: "10 เส้น", price: 1200.00, original_price: null, stock: 100 },
    { size: "2.5 mm.", package: "1 กิโลกรัม", price: 4900.00, original_price: null, stock: 10 },
    { size: "2.5 mm.", package: "1 เส้น", price: 140.00, original_price: null, stock: 982 },
    { size: "2.5 mm.", package: "10 เส้น", price: 1400.00, original_price: null, stock: 100 }
  ];
  db[idx].packages = []; // We will use the two-tier system, so root packages is ignored for this UI mode.
}

const newJs = `// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\nexport const mockDatabase = ${JSON.stringify(db, null, 2)};\n`;
fs.writeFileSync('frontend/src/mock_database.js', newJs, 'utf8');
console.log("Updated SELECTARC ZINAL4 schema for Two-Tier.");
