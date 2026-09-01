const fs = require('fs');
let html = fs.readFileSync('frontend/product.html', 'utf8');

// 1. Remove max-h-[500px] and overflow-hidden from rich-content-container
html = html.replace(/max-h-\[500px\]/g, '');
html = html.replace(/overflow-hidden transition-\[max-height\] duration-500 ease-in-out/g, '');

// 2. Hide the fade and button
// Replace <div id="rich-content-fade" class="absolute... 
// with <div id="rich-content-fade" class="hidden absolute...
html = html.replace(/<div id="rich-content-fade" class="absolute/g, '<div id="rich-content-fade" class="hidden absolute');

fs.writeFileSync('frontend/product.html', html, 'utf8');
console.log("Removed height restriction and hid the Read More button");
