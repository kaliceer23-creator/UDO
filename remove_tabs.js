const fs = require('fs');
let html = fs.readFileSync('frontend/product.html', 'utf8');

// 1. Remove Sticky Tab Bar completely
const tabBarHtml = `      <!-- Sticky Tab Bar -->
      <div class="w-full bg-white mt-16">
        <div class="max-w-[1360px] mx-auto px-4 md:px-8 flex items-center gap-10 overflow-x-auto whitespace-nowrap">
          <a href="#" class="py-4 text-[#252525] text-[16px] font-normal">ภาพรวม</a>
          <a href="#" class="py-4 text-[#252525] text-[16px] font-normal">คุณสมบัติ</a>
          <a href="#" class="py-4 text-[#252525] text-[16px] font-normal">รายละเอียดสินค้า</a>
          <a href="#" class="py-4 text-[#252525] text-[16px] font-normal">ชื่อสินค้า</a>
        </div>
      </div>`;

html = html.replace(tabBarHtml, "");

// 2. Rename "คุณสมบัติสินค้า" to "รายละเอียดสินค้า"
html = html.replace(
  '<h2 class="text-[22px] font-bold text-[#252525] mb-6">คุณสมบัติสินค้า</h2>',
  '<h2 class="text-[22px] font-bold text-[#252525] mb-6">รายละเอียดสินค้า</h2>'
);

fs.writeFileSync('frontend/product.html', html, 'utf8');
console.log("Successfully removed tabs and renamed section");
