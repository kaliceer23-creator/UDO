const fs = require('fs');
const content = fs.readFileSync('frontend/src/main.js', 'utf8');
console.log(content.includes('ช้อปสินค้าอุปกรณ์งานเชื่อมครบวงจร'));
