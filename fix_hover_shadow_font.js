const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

// 1. Update Green shadow to Red shadow everywhere (HTML and JS)
const oldShadowRegex = /hover:shadow-\[0_12px_40px_rgba\(138,195,83,0\.2\)\]/g;
content = content.replace(oldShadowRegex, 'hover:shadow-[0_12px_40px_rgba(225,36,39,0.25)]');

// 2. Update font sizes in dock-default-state
const oldFontRegex = /text-\[13px\] md:text-\[14px\]/g;
content = content.replace(oldFontRegex, 'text-[15px] md:text-[16px]');

fs.writeFileSync('frontend/src/main.js', content, 'utf8');
console.log("Updated shadow color and font size successfully.");
