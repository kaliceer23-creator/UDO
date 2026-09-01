const fs = require('fs');
let js = fs.readFileSync('frontend/src/product_hydrate.js', 'utf8');

// 1. Update geminiData (Remove "image", add "images" array)
js = js.replace(
  /"image": "https:\/\/via\.placeholder\.com\/600x600\/f5f5f5\/9ca3af\?text=GEMINI\+308L",/,
  `"images": [
      "https://www.udo.co.th/storage/products/May2026/FdE0amQIiBJB06u9rNCn.jpg"
    ],`
);

// 2. Update Main Image hydration
js = js.replace(
  /if\(el_product_image\) el_product_image\.src = geminiData\.image;/,
  `if(el_product_image) el_product_image.src = geminiData.images[0];
    
    // --- Thumbnail Gallery Logic ---
    const el_thumbnails = document.getElementById('product-thumbnails-container');
    if(el_thumbnails) {
      if(geminiData.images.length <= 1) {
        // มีรูปเดียว ซ่อนกล่องรูปเล็ก
        el_thumbnails.style.display = 'none';
      } else {
        // มีหลายรูป โชว์และสร้างรูปเล็ก
        el_thumbnails.style.display = 'grid';
        el_thumbnails.innerHTML = geminiData.images.map((imgUrl, index) => {
          const borderClass = index === 0 ? "border-2 border-[#71C04C]" : "opacity-70 hover:opacity-100";
          return \`<div class="aspect-square bg-white rounded-lg overflow-hidden cursor-pointer \${borderClass}" onclick="document.getElementById('product-image').src='\${imgUrl}'">
            <img src="\${imgUrl}" class="w-full h-full object-cover rounded">
          </div>\`;
        }).join('');
      }
    }`
);

fs.writeFileSync('frontend/src/product_hydrate.js', js, 'utf8');
console.log("Updated hydration for array images and thumbnails");
