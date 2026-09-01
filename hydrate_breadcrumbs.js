const fs = require('fs');
let js = fs.readFileSync('frontend/src/product_hydrate.js', 'utf8');

// 1. Update JSON Data
js = js.replace(
  `"category": "ลวดเชื่อมสเตนเลส",`,
  `"// 1. ระบบ Category แบบโครงสร้างต้นไม้ (Breadcrumbs)": "",
    "categories": [
      { "level": 1, "name": "เครื่องมือช่างและฮาร์ดแวร์", "url_slug": "hardware" },
      { "level": 2, "name": "เครื่องเชื่อมและอุปกรณ์", "url_slug": "welding-equipment" },
      { "level": 3, "name": "ลวดเชื่อม", "url_slug": "welding-wire" }
    ],

    "// 2. ข้อมูลสำหรับให้ระบบ Category ค้นหาและกรอง (Filter)": "",`
);

js = js.replace(
  `"process": "ธูปเชื่อม (MMA)"\n    },`,
  `"process": "ธูปเชื่อม (MMA)"\n    },
    
    "// 3. ระบบสถิติสำหรับดึงโชว์หน้าแรก (Dynamic Sorting & Collections)": "",
    "created_at": "2026-08-15T10:30:00Z",
    "sold_count": 1250,
    "collections": ["popular", "just_for_you"],`
);

// 2. Remove old hardcoded breadcrumb update logic
js = js.replace(
  `const el_breadcrumb_name = document.getElementById('breadcrumb-name');
    if(el_breadcrumb_name) el_breadcrumb_name.innerText = geminiData.name;
    const el_breadcrumb_category = document.getElementById('breadcrumb-category');
    if(el_breadcrumb_category) el_breadcrumb_category.innerText = geminiData.category;`,
  `// Old breadcrumb logic removed`
);

// 3. Add dynamic breadcrumb rendering logic
const breadcrumbLogic = `
    // --- Dynamic Breadcrumbs Rendering ---
    const breadcrumbContainer = document.getElementById('product-breadcrumb-container');
    if(breadcrumbContainer && geminiData.categories) {
      let breadcrumbHTML = \`<a href="/" class="hover:text-[#8ac353]">หน้าหลัก</a>\`;
      
      // วนลูปสร้างลิงก์ตามลำดับชั้น Category
      geminiData.categories.forEach(cat => {
        breadcrumbHTML += \`
          <span class="text-gray-400">&gt;</span>
          <a href="/category.html?cat=\${cat.url_slug}" class="hover:text-[#8ac353]">\${cat.name}</a>
        \`;
      });
      
      // ใส่ชื่อสินค้าตัวปัจจุบันเป็นจุดสิ้นสุด (คลิกไม่ได้เพราะอยู่หน้านี้แล้ว)
      breadcrumbHTML += \`
        <span class="text-gray-400">&gt;</span>
        <span class="text-[#252525]">\${geminiData.name}</span>
      \`;
      
      breadcrumbContainer.innerHTML = breadcrumbHTML;
    }
`;

// Insert it somewhere appropriate, e.g. before "const el_product_image = document.getElementById('product-image');"
js = js.replace(
  `const el_product_image = document.getElementById('product-image');`,
  breadcrumbLogic + `\n    const el_product_image = document.getElementById('product-image');`
);

fs.writeFileSync('frontend/src/product_hydrate.js', js, 'utf8');
console.log("Updated Breadcrumb logic and Master Schema in DB");
