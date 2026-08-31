const fs = require('fs');
const files = ['frontend/src/main.js', 'frontend/src/category.js', 'frontend/src/product.js'];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Extract the hours part
  const hoursHtml = `          <div class="mt-2 text-[13px] md:text-[13.5px] text-gray-800 leading-[1.8]">
            <p class="mb-0"><span class="font-bold text-gray-900">เวลาทำการ UDO Call Center :</span><br>วันจันทร์ - วันอาทิตย์ 09.00-18.00 น.</p>
            <p class="mb-0 mt-2"><span class="font-bold text-gray-900">เวลาจัดส่งสินค้า :</span><br>จันทร์ - เสาร์ 08:30 - 17:30 น.</p>
          </div>
`;

  // Inject into Col 1
  const col1Target = `<p class="text-[13.5px] text-gray-900 font-semibold mb-5">ช้อปสินค้าอุปกรณ์งานเชื่อมครบวงจร ตลอด 24 ชั่วโมง</p>`;
  content = content.replace(col1Target, col1Target + '\n' + hoursHtml);

  // Remove from the bottom block
  const oldHoursHtml = `          <p class="mb-0"><span class="font-bold text-gray-900">เวลาทำการ UDO Call Center :</span> วันจันทร์ - วันอาทิตย์ 09.00-18.00 น.</p>
          <p class="mb-4"><span class="font-bold text-gray-900">เวลาจัดส่งสินค้า :</span> จันทร์ - เสาร์ 08:30 - 17:30 น.</p>
          
`;
  content = content.replace(oldHoursHtml, '');

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated ${file}`);
});
