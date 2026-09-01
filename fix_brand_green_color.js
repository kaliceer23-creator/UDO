const fs = require('fs');

// 1. Update style.css
let cssContent = fs.readFileSync('frontend/src/style.css', 'utf8');
cssContent = cssContent.replace('--color-brand-green: #71C04C;', '--color-brand-green: rgb(104, 161, 55);');
fs.writeFileSync('frontend/src/style.css', cssContent, 'utf8');

// 2. Update main.js
let jsContent = fs.readFileSync('frontend/src/main.js', 'utf8');
// Replace both upper and lower case just in case
jsContent = jsContent.replace(/#71C04C/g, '#68A137');
jsContent = jsContent.replace(/#71c04c/g, '#68A137');
fs.writeFileSync('frontend/src/main.js', jsContent, 'utf8');

console.log("Updated brand-green color to rgb(104, 161, 55) / #68A137");
