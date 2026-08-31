const fs = require('fs');
const files = ['frontend/src/main.js', 'frontend/src/category.js', 'frontend/src/product.js'];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Fix Col 1 if needed in category and product
  const logoAnchorClose = `          <a href="/" class="shrink-0 mb-4 inline-block group">
            <img src="/images/logos/logo.svg" alt="UDO Welding Products" class="h-[42px] md:h-[52px] w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-400" />
          </a>`;
  
  const hoursHtml = `
          <!-- Operating Hours -->
          <div class="mt-2 text-[13px] md:text-[14px] text-gray-800 leading-[1.8]">
            <p class="mb-0"><span class="font-bold text-gray-900">เวลาทำการ UDO Call Center :</span><br>วันจันทร์ - วันอาทิตย์ 09.00-18.00 น.</p>
            <p class="mb-0 mt-3"><span class="font-bold text-gray-900">เวลาจัดส่งสินค้า :</span><br>จันทร์ - เสาร์ 08:30 - 17:30 น.</p>
          </div>`;

  if (!content.includes('เวลาทำการ UDO Call Center :') || !content.includes('<!-- Operating Hours -->')) {
    // If not injected properly yet, inject it. We know main.js was done by tool, but category/product not yet.
    if (!content.includes('<!-- Operating Hours -->')) {
        content = content.replace(logoAnchorClose, logoAnchorClose + hoursHtml);
    }
  }

  // Strip ALL "<!-- Company Info & Operating Hours -->" blocks and anything trailing them before "<!-- Copyright Bar -->"
  const regex = /<!-- Company Info & Operating Hours -->[\s\S]*?(?=<!-- Copyright Bar -->)/g;
  content = content.replace(regex, '');

  // Add a single clean Address block before Copyright Bar
  const addressBlock = `<!-- Company Info -->
    <div class="border-t border-gray-200 bg-white">
      <div class="max-w-[1360px] mx-auto px-4 md:px-8 xl:px-16 py-8">
        <div class="text-[13px] md:text-[14px] text-gray-800 leading-[1.8]">
          <p class="mb-0 text-gray-600">Copyright © 2026 UDO จัดจำหน่ายสินค้าและบริการ โดย บริษัท ยู.ดี.โอ. จำกัด (สำนักงานใหญ่) 61,63,65 ซอยพระราม 3 ซอย 54 แขวงช่องนนทรี เขตยานนาวา กรุงเทพฯ 10120</p>
          <p class="mb-0 text-gray-600">เบอร์โทร. : 02-123-4567 | อีเมล : contact@udo.co.th | เลขทะเบียนพาณิชย์อิเล็กทรอนิกส์ : 0101234567890</p>
        </div>
      </div>
    </div>

    `;

  content = content.replace('<!-- Copyright Bar -->', addressBlock + '<!-- Copyright Bar -->');
  
  // also clean up any '|<!-- Company Info' garbage that might have leaked
  content = content.replace(/\|<!-- Company Info/g, '<!-- Company Info');

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated ${file}`);
});
