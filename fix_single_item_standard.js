const fs = require('fs');

// 1. Update JS Logic
let js = fs.readFileSync('frontend/src/product_hydrate.js', 'utf8');

const oldPkgRender = `const renderPackageButtons = () => {
      const container = document.getElementById('package-buttons');
      const wrapper = document.getElementById('package-section-wrapper');
      
      // We can also rename the label dynamically if it's not wire
      const pkgLabelTop = document.querySelector('#package-section-wrapper span:first-child');
      if (pkgLabelTop && uniquePackages.length === 1 && uniquePackages[0].includes("ตัว")) {
         pkgLabelTop.innerText = "รูปแบบ (บรรจุ)";
      } else if (pkgLabelTop) {
         pkgLabelTop.innerText = "บรรจุ"; // fallback default
      }

      // If we only have 1 package option and it's "1 ตัว", we might want to hide it too for a cleaner UI, but let's just keep it or let user decide.
      // We will hide the package block ONLY if instructed, but for now we'll just rename it if it's pieces.`;

const newPkgRender = `const renderPackageButtons = () => {
      const container = document.getElementById('package-buttons');
      const wrapper = document.getElementById('package-section-wrapper');
      
      // Global Standard: If there is only ONE standard package option (like "1 ตัว" or "มาตรฐาน"), HIDE the entire package UI.
      if (uniquePackages.length === 1 && (uniquePackages[0] === "1 ตัว" || uniquePackages[0] === "มาตรฐาน")) {
         if (wrapper) wrapper.style.display = 'none';
      } else {
         if (wrapper) wrapper.style.display = 'block';
      }

      const pkgLabelTop = document.querySelector('#package-section-wrapper span:first-child');
      if (pkgLabelTop) pkgLabelTop.innerText = "บรรจุ";`;

js = js.replace(oldPkgRender, newPkgRender);
fs.writeFileSync('frontend/src/product_hydrate.js', js, 'utf8');

// 2. Update Mock Database
let dbStr = fs.readFileSync('frontend/src/mock_database.js', 'utf8');
const jsonStr = dbStr.replace('export const mockDatabase = ', '').replace('// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\n', '').trim().replace(/;$/, '');
let db = JSON.parse(jsonStr);

const idx = db.findIndex(p => p.id === 'harris-25gx-10-ox');
if (idx !== -1) {
  db[idx].variants[0].package = "1 ตัว";
  const hasPackInfo = db[idx].specsTable.find(s => s.key === "ข้อมูลการบรรจุ (ขายส่ง)");
  if (!hasPackInfo) {
    db[idx].specsTable.push({ "key": "ข้อมูลการบรรจุ (ขายส่ง)", "value": "บรรจุลังละ 12 ตัว" });
  }
}

const newDb = `// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter\nexport const mockDatabase = ${JSON.stringify(db, null, 2)};\n`;
fs.writeFileSync('frontend/src/mock_database.js', newDb, 'utf8');
console.log("Updated to Global E-commerce Standard for single items");
