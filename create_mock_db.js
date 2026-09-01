const fs = require('fs');

const products = [];

// 1. GEMINI 308L (ของจริง)
products.push({
  id: "gem-308l",
  name: "ลวดเชื่อมสเตนเลสไฟฟ้า GEMINI 308L (E308L-16)",
  brand: "GEMINI",
  sku: "GEM-308L",
  categories: [
    { level: 1, name: "เครื่องมือช่างและฮาร์ดแวร์", url_slug: "hardware" },
    { level: 2, name: "เครื่องเชื่อมและอุปกรณ์", url_slug: "welding-equipment" },
    { level: 3, "name": "ลวดเชื่อมสเตนเลส", url_slug: "stainless-wire" }
  ],
  filter_attributes: { material: "สเตนเลส", process: "ธูปเชื่อม (MMA)" },
  tags: ["ทนการกัดกร่อน", "ออสเทนนิติก"],
  created_at: "2026-08-15T10:30:00Z",
  sold_count: 1250,
  collections: ["popular", "just_for_you"],
  images: ["https://www.udo.co.th/storage/products/May2026/FdE0amQIiBJB06u9rNCn.jpg"],
  warranty: null,
  variants: [
    { size: "2.0 mm", price: 370.00, original_price: null, stock: 10 },
    { size: "2.6 mm", price: 305.00, original_price: 350.00, stock: 100 },
    { size: "4.0 mm", price: 305.00, original_price: null, stock: 0 }
  ],
  packages: [
    { name: "ห่อ", weight: "1 กก.", is_active: true }
  ]
});

// 2. GOLD 330 (ของจริง)
products.push({
  id: "gold-330",
  name: "ลวดเชื่อมไฟฟ้า GOLD 330 (สารพัดประโยชน์)",
  brand: "GOLD",
  sku: "GOLD-330",
  categories: [
    { level: 1, name: "เครื่องมือช่างและฮาร์ดแวร์", url_slug: "hardware" },
    { level: 2, name: "เครื่องเชื่อมและอุปกรณ์", url_slug: "welding-equipment" },
    { level: 3, name: "ลวดเชื่อมซ่อมบำรุง", url_slug: "maintenance-welding-wire" }
  ],
  filter_attributes: { material: "โลหะต่างชนิด", process: "ธูปเชื่อม (MMA)" },
  tags: ["ซ่อมบำรุง", "อัลลอยสตีล"],
  created_at: "2026-08-20T10:00:00Z",
  sold_count: 850,
  collections: ["popular"],
  images: ["https://www.udo.co.th/storage/products/November2019/5bNnSY3R9jZNo4KyS9Kx.jpg"],
  warranty: null,
  variants: [
    { size: "3.2 mm", price: 1950.00, original_price: null, stock: 100 }
  ],
  packages: [
    { name: "ห่อ", weight: "1 กก.", is_active: true }
  ]
});

// Helper for random gen
const brands = ["KOBE", "YAWATA", "LINCOLN", "GEMINI", "HYUNDAI"];
const materials = ["เหล็กเหนียว", "เหล็กทนแรงดึงสูง", "สเตนเลส", "เหล็กหล่อ", "อลูมิเนียม"];
const processes = ["ธูปเชื่อม (MMA)", "ลวดเชื่อม TIG", "ลวดเชื่อม MIG", "ลวดฟลักซ์คอร์ (FCAW)"];
const sizesList = [["2.0 mm", "2.6 mm"], ["2.6 mm", "3.2 mm", "4.0 mm"], ["0.8 mm", "1.2 mm"], ["1.6 mm", "2.4 mm"]];

for(let i=3; i<=20; i++) {
  const brand = brands[Math.floor(Math.random() * brands.length)];
  const material = materials[Math.floor(Math.random() * materials.length)];
  const process = processes[Math.floor(Math.random() * processes.length)];
  const sizes = sizesList[Math.floor(Math.random() * sizesList.length)];
  
  const variants = sizes.map(s => {
     return {
       size: s,
       price: Math.floor(Math.random() * 500) + 150,
       original_price: Math.random() > 0.7 ? Math.floor(Math.random() * 600) + 200 : null,
       stock: Math.floor(Math.random() * 50)
     }
  });

  products.push({
    id: `dummy-prod-${i}`,
    name: `ลวดเชื่อม ${material} ${brand} รุ่น Pro-${i}`,
    brand: brand,
    sku: `${brand}-${i}00`,
    categories: [
      { level: 1, name: "เครื่องมือช่างและฮาร์ดแวร์", url_slug: "hardware" },
      { level: 2, name: "เครื่องเชื่อมและอุปกรณ์", url_slug: "welding-equipment" },
      { level: 3, name: `ลวดเชื่อม${material}`, url_slug: `wire-${i}` }
    ],
    filter_attributes: { material: material, process: process },
    tags: ["ทดสอบ", "Mockup"],
    created_at: `2026-08-0${(i%9)+1}T10:00:00Z`,
    sold_count: Math.floor(Math.random() * 1000),
    collections: i % 5 === 0 ? ["new_arrival"] : [],
    images: [`https://via.placeholder.com/600x600/f5f5f5/9ca3af?text=${brand}+${material}`],
    warranty: i % 4 === 0 ? "รับประกัน 1 ปี" : null,
    variants: variants,
    packages: [{ name: "ห่อ", weight: "1 กก.", is_active: true }]
  });
}

const jsContent = `// ข้อมูลจำลองสำหรับทดสอบระบบ Category และ Filter
export const mockDatabase = ${JSON.stringify(products, null, 2)};
`;

fs.writeFileSync('frontend/src/mock_database.js', jsContent, 'utf8');
console.log("mock_database.js created successfully with " + products.length + " products!");
