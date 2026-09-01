const fs = require('fs');
let js = fs.readFileSync('frontend/src/product_hydrate.js', 'utf8');

js = js.replace(
  `"category": "ลวดเชื่อมสเตนเลส",`,
  `"category": "ลวดเชื่อมสเตนเลส",
    
    // ข้อมูลสำหรับให้ระบบ Category ค้นหาและกรอง (Filter)
    "filter_attributes": {
      "material": "สเตนเลส",
      "process": "ธูปเชื่อม (MMA)"
    },`
);

fs.writeFileSync('frontend/src/product_hydrate.js', js, 'utf8');
console.log("Added filter_attributes to geminiData");
