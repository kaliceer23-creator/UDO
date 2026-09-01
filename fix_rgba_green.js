const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');
content = content.replace(/rgba\(113,192,76,/g, 'rgba(104,161,55,');
fs.writeFileSync('frontend/src/main.js', content, 'utf8');
console.log("Updated rgba green values.");
