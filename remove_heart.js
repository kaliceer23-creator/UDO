const fs = require('fs');
let content = fs.readFileSync('frontend/src/home_hydrate.js', 'utf8');

// 1. Remove HTML
const htmlRegex = /[ \t]*<!-- Wishlist Heart -->[\s\S]*?<\/button>\n/g;
content = content.replace(htmlRegex, '');

// 2. Remove JS Logic
const jsRegex = /[ \t]*const wishlistBtn = e\.target\.closest\('\.btn-wishlist'\);[\s\S]*?return;\n    }\n/g;
content = content.replace(jsRegex, '');

fs.writeFileSync('frontend/src/home_hydrate.js', content, 'utf8');
console.log("Heart removed");
