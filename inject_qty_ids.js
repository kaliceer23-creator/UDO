const fs = require('fs');
let html = fs.readFileSync('frontend/product.html', 'utf8');

// Replace Minus Button
html = html.replace(
  '<button class="flex items-center justify-center text-gray-300 hover:text-gray-400 transition-colors cursor-not-allowed">',
  '<button id="btn-qty-minus" onclick="window.decreaseQty()" class="flex items-center justify-center text-gray-300 transition-colors cursor-not-allowed">'
);

// Replace Number Box
html = html.replace(
  '<div class="w-[70px] h-[40px] flex items-center justify-center font-medium text-[16px] text-[#252525] bg-white border border-gray-300 rounded-[4px]">\n                  1\n                </div>',
  '<div id="product-qty" class="w-[70px] h-[40px] flex items-center justify-center font-medium text-[16px] text-[#252525] bg-white border border-gray-300 rounded-[4px]">\n                  1\n                </div>'
);

// Replace Plus Button
html = html.replace(
  '<button class="flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors">',
  '<button id="btn-qty-plus" onclick="window.increaseQty()" class="flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors">'
);

fs.writeFileSync('frontend/product.html', html, 'utf8');
console.log("Injected IDs and onclick to Quantity Selector");
