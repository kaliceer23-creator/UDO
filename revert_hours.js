const fs = require('fs');
const files = ['frontend/src/main.js', 'frontend/src/category.js', 'frontend/src/product.js'];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // 1. Clean Col 1 (remove hours)
  const col1Regex = /<!-- Col 1 -->\s*<div class="flex flex-col">\s*<!-- Logo -->\s*<a href="\/" class="shrink-0 mb-4 inline-block group">\s*<img src="\/images\/logos\/logo\.svg" alt="UDO Welding Products" class="h-\[42px\] md:h-\[52px\] w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-400" \/>\s*<\/a>\s*<div class="text-\[13px\] md:text-\[13\.5px\] text-gray-800 leading-\[1\.8\]">\s*<p class="mb-1"><span class="font-bold text-gray-900">เวลาทำการ UDO Call Center :<\/span><br>วันจันทร์ - วันอาทิตย์ 09\.00-18\.00 น\.<\/p>\s*<p class="mb-0"><span class="font-bold text-gray-900">เวลาจัดส่งสินค้า :<\/span><br>จันทร์ - เสาร์ 08:30 - 17:30 น\.<\/p>\s*<\/div>\s*<\/div>/g;
  
  const newCol1 = `<!-- Col 1 -->
        <div class="flex flex-col">
          <!-- Logo -->
          <a href="/" class="shrink-0 mb-4 inline-block group">
            <img src="/images/logos/logo.svg" alt="UDO Welding Products" class="h-[42px] md:h-[52px] w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-400" />
          </a>
        </div>`;
        
  // 2. Restore bottom block
  const bottomBlockRegex = /<!-- Company Info & Copyright -->\s*<div class="border-t border-gray-200 bg-white">\s*<div class="max-w-\[1360px\] mx-auto px-4 md:px-8 xl:px-16 py-6 md:py-8">\s*<div class="text-\[13px\] md:text-\[14px\] text-gray-600 leading-\[1\.8\]">\s*<p class="mb-0">Copyright © 2026 UDO จัดจำหน่ายสินค้าและบริการ โดย บริษัท ยู\.ดี\.โอ\. จำกัด \(สำนักงานใหญ่\) 61,63,65 ซอยพระราม 3 ซอย 54 แขวงช่องนนทรี เขตยานนาวา กรุงเทพฯ 10120<\/p>\s*<p class="mb-0">เบอร์โทร\. : 02-123-4567 | อีเมล : contact@udo\.co\.th | เลขทะเบียนพาณิชย์อิเล็กทรอนิกส์ : 0101234567890<\/p>\s*<\/div>\s*<\/div>\s*<\/div>/g;

  const newBottomBlock = `<!-- Company Info & Operating Hours -->
    <div class="border-t border-gray-200 bg-white">
      <div class="max-w-[1360px] mx-auto px-4 md:px-8 xl:px-16 py-8">
        <div class="text-[13px] md:text-[14px] text-gray-800 leading-[1.8]">
          <p class="mb-0"><span class="font-bold text-gray-900">เวลาทำการ UDO Call Center :</span> วันจันทร์ - วันอาทิตย์ 09.00-18.00 น.</p>
          <p class="mb-4"><span class="font-bold text-gray-900">เวลาจัดส่งสินค้า :</span> จันทร์ - เสาร์ 08:30 - 17:30 น.</p>
          
          <p class="mb-0 text-gray-600">Copyright © 2026 UDO จัดจำหน่ายสินค้าและบริการ โดย บริษัท ยู.ดี.โอ. จำกัด (สำนักงานใหญ่) 61,63,65 ซอยพระราม 3 ซอย 54 แขวงช่องนนทรี เขตยานนาวา กรุงเทพฯ 10120</p>
          <p class="mb-0 text-gray-600">เบอร์โทร. : 02-123-4567 | อีเมล : contact@udo.co.th | เลขทะเบียนพาณิชย์อิเล็กทรอนิกส์ : 0101234567890</p>
        </div>
      </div>
    </div>`;

  if (col1Regex.test(content) && bottomBlockRegex.test(content)) {
    content = content.replace(col1Regex, newCol1);
    content = content.replace(bottomBlockRegex, newBottomBlock);
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  } else {
    console.log(`Pattern not found in ${file}.`);
  }
});
