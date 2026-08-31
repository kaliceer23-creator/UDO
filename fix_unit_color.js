const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

// Replace unit toggles (inactive)
content = content.replace(/text-gray-500 hover:text-gray-900/g, 'text-gray-900');

// Replace price unit span
content = content.replace(/text-gray-500 text-\[12px\] font-medium price-unit/g, 'text-gray-900 text-[12px] font-medium price-unit');

// Replace unit text span (quantity)
content = content.replace(/text-\[11px\] text-gray-500 font-medium unit-text/g, 'text-[11px] text-gray-900 font-medium unit-text');

// Replace JS logic for toggles
content = content.replace(/sibling\.classList\.add\('text-gray-500'\);/g, "sibling.classList.add('text-gray-900');");
content = content.replace(/btn\.classList\.remove\('text-gray-500'\);/g, "btn.classList.remove('text-gray-900');");

fs.writeFileSync('frontend/src/main.js', content, 'utf8');
console.log("Updated colors in main.js");
