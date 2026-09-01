const fs = require('fs');
let html = fs.readFileSync('frontend/product.html', 'utf8');

const originalBlock = `<div class="bg-white rounded-[24px] relative overflow-hidden flex flex-col shadow-sm">
              <div class="relative w-full aspect-square flex items-center justify-center p-8 bg-[#f5f5f5] group">`;

const newBlock = `<div class="relative overflow-hidden flex flex-col">
              <div class="relative w-full aspect-square flex items-center justify-center group">`;

html = html.replace(originalBlock, newBlock);

fs.writeFileSync('frontend/product.html', html, 'utf8');
console.log("Removed main image frame/border classes");
