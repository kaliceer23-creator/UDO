const fs = require('fs');
let html = fs.readFileSync('frontend/product.html', 'utf8');
html = html.replace(/<h3 id="rich-headline" class="text-\[24px\] font-semibold text-\[#252525\] mb-8">/, '<h3 id="rich-headline" class="text-[24px] font-semibold text-[#252525] mb-4">');
fs.writeFileSync('frontend/product.html', html, 'utf8');
