const fs = require('fs');
const files = ['frontend/src/main.js', 'frontend/src/category.js', 'frontend/src/product.js'];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // 1. Change grid classes from lg:grid-cols-4 to lg:grid-cols-5
  // Also adjust gap to gap-8 lg:gap-10 just in case it gets too tight
  const gridRegex = /<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">/g;
  const newGrid = `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">`;
  
  // 2. Insert new Col 2 after Col 1
  const insertRegex = /<!-- Col 2 -->/g;
  const newColHTML = `<!-- Col 2: หมวดหมู่สินค้า -->
        <div class="flex flex-col gap-2.5">
          <h3 class="font-bold text-gray-900 text-[14px] mb-1">หมวดหมู่สินค้า</h3>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">ลวดเชื่อม</a>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">เครื่องเชื่อม</a>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">อุปกรณ์งานเชื่อม</a>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">อะไหล่ปืนเชื่อม</a>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">น้ำยาเคมีภัณฑ์</a>
          <a href="#" class="text-gray-700 hover:text-black text-[13.5px] transition-colors">อุปกรณ์เซฟตี้</a>
        </div>

        <!-- Col 3 (เดิม Col 2) -->`;

  if (gridRegex.test(content) && insertRegex.test(content)) {
    content = content.replace(gridRegex, newGrid);
    content = content.replace(insertRegex, newColHTML);
    // Also rename Col 3 to Col 4, Col 4 to Col 5 just to be neat
    content = content.replace(/<!-- Col 3 -->/g, '<!-- Col 4 (เดิม Col 3) -->');
    content = content.replace(/<!-- Col 4 -->/g, '<!-- Col 5 (เดิม Col 4) -->');
    
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  } else {
    console.log(`Pattern not found in ${file}.`);
  }
});
