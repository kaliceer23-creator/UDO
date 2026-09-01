const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

// 1. Replace the array to remove '...'
const oldArrayRegex = /const searchPlaceholders = \[\s*"อุปกรณ์เสริม",\s*"ตู้เชื่อม MIG \/ TIG\.\.\.",\s*"ลวดเชื่อมสเตนเลส\.\.\.",\s*"หน้ากากเชื่อมปรับแสงอัตโนมัติ\.\.\.",\s*"ชุดตัดแก๊ส \/ พลาสม่า\.\.\.",\s*"ใบตัดเหล็ก ใบเจียร\.\.\.",\s*"อะไหล่ปืนเชื่อมต่างๆ\.\.\.",\s*"ถุงมือหนังงานเชื่อม\.\.\."\s*\];/g;
const newArray = `const searchPlaceholders = [
  "อุปกรณ์เสริม",
  "ตู้เชื่อม MIG / TIG",
  "ลวดเชื่อมสเตนเลส",
  "หน้ากากเชื่อมปรับแสงอัตโนมัติ",
  "ชุดตัดแก๊ส / พลาสม่า",
  "ใบตัดเหล็ก ใบเจียร",
  "อะไหล่ปืนเชื่อมต่างๆ",
  "ถุงมือหนังงานเชื่อม"
];`;
content = content.replace(oldArrayRegex, newArray);

// 2. Replace the input logic
const oldLogicRegex = /\/\/ ซ่อน Placeholder ทันทีเมื่อผู้ใช้เริ่มพิมพ์ข้อความ\n\s*searchInput\.addEventListener\('input', \(\) => {\n\s*if \(searchInput\.value\.length > 0\) {\n\s*animatedPlaceholder\.style\.display = 'none';\n\s*} else {\n\s*animatedPlaceholder\.style\.display = 'block';\n\s*}\n\s*}\);/;
const newLogic = `// จัดการ Placeholder เมื่อคลิกค้นหา
  searchInput.addEventListener('focus', () => {
    animatedPlaceholder.style.opacity = '0';
    searchInput.setAttribute('placeholder', 'ถาม UDO AI');
  });

  searchInput.addEventListener('blur', () => {
    if (searchInput.value.trim().length === 0) {
      animatedPlaceholder.style.opacity = '1';
      searchInput.setAttribute('placeholder', '');
    }
  });

  searchInput.addEventListener('input', () => {
    if (searchInput.value.trim().length > 0) {
      animatedPlaceholder.style.opacity = '0';
    }
  });`;
content = content.replace(oldLogicRegex, newLogic);

fs.writeFileSync('frontend/src/main.js', content, 'utf8');
console.log("Updated search logic successfully.");
