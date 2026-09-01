const fs = require('fs');
let html = fs.readFileSync('frontend/product.html', 'utf8');

// Remove aspect-[2/1] from all rich-img
html = html.replace(/aspect-\[2\/1\]/g, '');

fs.writeFileSync('frontend/product.html', html, 'utf8');
console.log("Removed aspect ratio constraint from rich content images");
