const fs = require('fs');
const files = ['frontend/src/main.js', 'frontend/src/category.js', 'frontend/src/product.js'];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  const target = `    <!-- Copyright Bar -->`;
  
  const newBlock = `    <!-- Company Info & Operating Hours -->
    <div class="border-t border-gray-200 bg-white">
      <div class="max-w-[1360px] mx-auto px-4 md:px-8 xl:px-16 py-8">
        <div class="text-[13px] md:text-[14px] text-gray-800 leading-[1.8]">
          <p class="mb-0"><span class="font-bold text-gray-900">เวลาทำการ UDO Call Center :</span> วันจันทร์ - วันอาทิตย์ 09.00-18.00 น.</p>
          <p class="mb-4"><span class="font-bold text-gray-900">เวลาจัดส่งสินค้า :</span> จันทร์ - เสาร์ 08:30 - 17:30 น.</p>
          
          <p class="mb-0 text-gray-600">Copyright © 2026 UDO จัดจำหน่ายสินค้าและบริการ โดย บริษัท ยู.ดี.โอ. จำกัด (สำนักงานใหญ่) 61,63,65 ซอยพระราม 3 ซอย 54 แขวงช่องนนทรี เขตยานนาวา กรุงเทพฯ 10120</p>
          <p class="mb-0 text-gray-600">เบอร์โทร. : 02-123-4567 | อีเมล : contact@udo.co.th | เลขทะเบียนพาณิชย์อิเล็กทรอนิกส์ : 0101234567890</p>
        </div>
      </div>
    </div>

    <!-- Copyright Bar -->`;
    
  if (content.includes(target) && !content.includes('เวลาทำการ UDO Call Center')) {
    content = content.replace(target, newBlock);
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
