const fs = require('fs');
const files = ['frontend/src/main.js', 'frontend/src/category.js', 'frontend/src/product.js'];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Extract the hours HTML (same as before but simplified)
  const hoursHtml = `
          <!-- Operating Hours -->
          <div class="mt-4 text-[13px] md:text-[14px] text-gray-800 leading-[1.8]">
            <p class="mb-0"><span class="font-bold text-gray-900">เวลาทำการ UDO Call Center :</span><br>วันจันทร์ - วันอาทิตย์ 09.00-18.00 น.</p>
            <p class="mb-0 mt-3"><span class="font-bold text-gray-900">เวลาจัดส่งสินค้า :</span><br>จันทร์ - เสาร์ 08:30 - 17:30 น.</p>
          </div>`;

  // Inject into Col 1 right after the closing </a> of the logo
  const logoAnchorClose = `          <a href="/" class="shrink-0 mb-4 inline-block group">
            <img src="/images/logos/logo.svg" alt="UDO Welding Products" class="h-[42px] md:h-[52px] w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-400" />
          </a>`;
  
  if (content.includes(logoAnchorClose) && !content.includes('เวลาทำการ UDO Call Center :')) {
     content = content.replace(logoAnchorClose, logoAnchorClose + hoursHtml);
  }

  // Remove the old block at the bottom
  const oldBlockRegex = /<!-- Company Info & Operating Hours -->[\s\S]*?<!-- Copyright Bar -->/;
  
  // Actually, wait, the user wants the operating hours moved. What about the address/contact info?
  // If we delete the old block, the address is lost. 
  // Let's replace ONLY the hours in the old block, or remove the old block entirely and just put the address back into the copyright bar?
  // "เอาเวลาทำการ เวลาจัดสส่งไปใว้ใต้โลโก้เหมือนเดิม" - "Move operating hours, delivery hours under the logo like before"
  // Let's keep the address in the bottom block.

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated ${file}`);
});
