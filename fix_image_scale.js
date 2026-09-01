const fs = require('fs');
let html = fs.readFileSync('frontend/product.html', 'utf8');

const originalBlock = '<div class="relative w-full aspect-square flex items-center justify-center group">';
const newBlock = '<div class="relative w-full aspect-square flex items-center justify-center p-6 md:p-10 group">';

html = html.replace(originalBlock, newBlock);

fs.writeFileSync('frontend/product.html', html, 'utf8');
console.log("Added padding to zoom out the image");
