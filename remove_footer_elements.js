const fs = require('fs');
const files = ['frontend/src/main.js', 'frontend/src/category.js', 'frontend/src/product.js'];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Create a regex to match from the <button>ค้นหาสาขาใกล้คุณ</button> to the end of the <div class="flex gap-2"> App/Play store </div>
  const regex = /<button class="flex items-center justify-center gap-2 border border-gray-400 text-gray-900 bg-white hover:bg-gray-50 rounded-md py-2 px-4 mb-6 w-fit text-\[14px\] font-semibold transition-colors shadow-sm">[\s\S]*?<\/button>[\s\S]*?<div class="flex gap-2">[\s\S]*?<!-- App Store Mock -->[\s\S]*?<!-- Play Store Mock -->[\s\S]*?<\/svg>[\s\S]*?<\/div>[\s\S]*?<\/div>[\s\S]*?<\/div>/;

  if (regex.test(content)) {
    content = content.replace(regex, '');
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  } else {
    console.log(`Pattern not found in ${file}`);
  }
});
