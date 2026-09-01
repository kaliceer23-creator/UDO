const fs = require('fs');
let html = fs.readFileSync('frontend/product.html', 'utf8');

html = html.replace(
  '<div class="grid grid-cols-5 gap-2 mt-4">',
  '<div id="product-thumbnails-container" class="grid grid-cols-5 gap-2 mt-4">'
);

fs.writeFileSync('frontend/product.html', html, 'utf8');
console.log("Injected thumbnail container ID");
