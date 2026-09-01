const fs = require('fs');

let html = fs.readFileSync('frontend/product.html', 'utf8');

// 1. Add ID to Brand
html = html.replace(
  '<a href="#" class="inline-block bg-[#333333] hover:bg-black text-white text-[12px] md:text-[13px] font-medium px-3 py-1 rounded-[3px] tracking-wide transition-colors uppercase">NINTENDO</a>',
  '<a href="#" id="product-brand" class="inline-block bg-[#333333] hover:bg-black text-white text-[12px] md:text-[13px] font-medium px-3 py-1 rounded-[3px] tracking-wide transition-colors uppercase">NINTENDO</a>'
);

// 2. Add ID to SKU
html = html.replace(
  '<span class="text-[13px] text-gray-400 hidden sm:inline-block">SKU: 4902370553451</span>',
  '<span id="product-sku" class="text-[13px] text-gray-400 hidden sm:inline-block">SKU: 4902370553451</span>'
);

// 3. Add ID to Title
html = html.replace(
  '<h1 class="text-[20px] md:text-[24px] font-semibold text-[#252525] leading-[1.3] mb-6">เครื่องเล่นเกม Nintendo Switch 2 + Mario Kart World Bundle</h1>',
  '<h1 id="product-name" class="text-[20px] md:text-[24px] font-semibold text-[#252525] leading-[1.3] mb-6">เครื่องเล่นเกม Nintendo Switch 2 + Mario Kart World Bundle</h1>'
);

// 4. Add ID to Price
html = html.replace(
  '<div class="text-[30px] md:text-[34px] font-medium text-[#E12427] leading-none">฿18,412</div>',
  '<div id="product-price" class="text-[30px] md:text-[34px] font-medium text-[#E12427] leading-none">฿18,412</div>'
);

// 5. Add ID to Unit
html = html.replace(
  '<span class="text-black/45 text-[15px] font-medium">/ห่อ</span>',
  '<span id="product-unit" class="text-black/45 text-[15px] font-medium">/ห่อ</span>'
);

// 6. Add ID to Description
html = html.replace(
  '<p class="text-[16px] text-[#252525] mb-6 leading-[1.6]">\n              <span class="font-semibold">เครื่องเล่นเกม Nintendo Switch 2</span> พลิกโฉมประสบการณ์การเล่นเกม ที่ UDO ด้วยการอัปเกรดครั้งใหญ่ทั้งในด้านประสิทธิภาพ และหน้าจอใหญ่ขึ้น สีสันสดใส เล่นเกมได้อย่างลื่นไหล พร้อม Joy-Con รุ่นใหม่ที่ติดแน่นกับตัวเครื่องด้วยแรงแม่เหล็ก สนุกไปกับเกมใหม่ ๆ ที่เล่นได้เฉพาะบน Nintendo Switch 2\n            </p>',
  '<p id="product-desc" class="text-[16px] text-[#252525] mb-6 leading-[1.6]">เครื่องเล่นเกม Nintendo Switch 2...</p>'
);

// 7. Add ID to Main Image
html = html.replace(
  '<img src="/images/bg-welding.jpeg" alt="Product" class="w-full h-full object-contain">',
  '<img id="product-image" src="/images/bg-welding.jpeg" alt="Product" class="w-full h-full object-contain">'
);

// 8. Add ID to Breadcrumb (Product Name)
html = html.replace(
  '<span class="text-[#252525]">เครื่องเล่นเกม Nintendo Switch 2</span>',
  '<span id="breadcrumb-name" class="text-[#252525]">เครื่องเล่นเกม Nintendo Switch 2</span>'
);

// 9. Add ID to Breadcrumb (Category)
html = html.replace(
  '<a href="#" class="hover:text-[#8ac353]">เกม & สตรีมมิ่งและอุปกรณ์เสริม</a>',
  '<a href="#" id="breadcrumb-category" class="hover:text-[#8ac353]">เกม & สตรีมมิ่งและอุปกรณ์เสริม</a>'
);

fs.writeFileSync('frontend/product.html', html, 'utf8');
console.log("Successfully added IDs to product.html");
