const fs = require('fs');
let html = fs.readFileSync('frontend/product.html', 'utf8');

const originalBlock = `<div class="max-w-[1360px] mx-auto px-4 md:px-8 py-3 text-[14px] font-normal text-gray-700 flex items-center gap-4 overflow-x-auto whitespace-nowrap border-b border-black/10">`;
const newBlock = `<div id="product-breadcrumb-container" class="max-w-[1360px] mx-auto px-4 md:px-8 py-3 text-[14px] font-normal text-gray-700 flex items-center gap-4 overflow-x-auto whitespace-nowrap border-b border-black/10">`;

html = html.replace(originalBlock, newBlock);

fs.writeFileSync('frontend/product.html', html, 'utf8');
console.log("Injected ID into Breadcrumb Container");
