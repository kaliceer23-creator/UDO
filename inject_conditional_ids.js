const fs = require('fs');
let html = fs.readFileSync('frontend/product.html', 'utf8');

// 1. Add ID to Original Price
html = html.replace(
  '<div class="text-[18px] text-black/45 line-through mb-1">฿18,000</div>',
  '<div id="product-original-price" class="text-[18px] text-black/45 line-through mb-1">฿18,000</div>'
);

// 2. Add ID to Discount Badge
html = html.replace(
  '<div class="text-[#E12427] text-[13px] font-medium border border-[#E12427] rounded px-2 py-0.5 mb-1 flex items-center gap-1">',
  '<div id="product-discount-badge" class="text-[#E12427] text-[13px] font-medium border border-[#E12427] rounded px-2 py-0.5 mb-1 flex items-center gap-1">'
);

// 3. Add ID to Warranty block
html = html.replace(
  '<div class="flex items-center gap-2 mb-6 text-[13px] text-black/60">',
  '<div id="product-warranty" class="flex items-center gap-2 mb-6 text-[13px] text-black/60">'
);

fs.writeFileSync('frontend/product.html', html, 'utf8');
console.log("Injected IDs for conditional rendering");
