const fs = require('fs');

// 1. Update style.css
let cssContent = fs.readFileSync('frontend/src/style.css', 'utf8');
cssContent = cssContent.replace(/--color-brand-green:\s*rgb\(104,\s*161,\s*55\);/, '--color-brand-green: #5EBB1E;');
fs.writeFileSync('frontend/src/style.css', cssContent, 'utf8');

// 2. Update main.js
let jsContent = fs.readFileSync('frontend/src/main.js', 'utf8');
jsContent = jsContent.replace(/#68A137/gi, '#5EBB1E');
jsContent = jsContent.replace(/rgba\(104,161,55,/g, 'rgba(94,187,30,');
fs.writeFileSync('frontend/src/main.js', jsContent, 'utf8');

console.log("Updated brand green to #5EBB1E");
