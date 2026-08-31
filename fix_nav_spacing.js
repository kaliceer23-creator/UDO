const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

// 1. Increase the gap
content = content.replace('gap-6 xl:gap-8 whitespace-nowrap', 'gap-8 lg:gap-10 xl:gap-12 whitespace-nowrap');

// 2. Remove the top border from the dropdown box to fix double line
content = content.replace('shadow-[0_10px_40px_rgba(0,0,0,0.1)] border-t-[3px] border-brand-red py-2 z-[60]', 'shadow-[0_10px_40px_rgba(0,0,0,0.1)] py-2 z-[60]');

fs.writeFileSync('frontend/src/main.js', content, 'utf8');
console.log("Fixed double line and increased spacing.");
