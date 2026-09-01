const fs = require('fs');
let js = fs.readFileSync('frontend/src/product_hydrate.js', 'utf8');

// Find the block starting with "const productData = {" and ending right before "setTimeout(() => {"
const regex = /const productData = \{[\s\S]*?\};\n\n  setTimeout/m;

const replacement = `import { mockDatabase } from './mock_database.js';

  // อ่าน id จาก URL
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');
  
  // ค้นหาสินค้าจาก mockDatabase
  const productData = mockDatabase.find(p => p.id === productId) || mockDatabase[1]; // default to GOLD 330 if not found

  setTimeout`;

js = js.replace(regex, replacement);

fs.writeFileSync('frontend/src/product_hydrate.js', js, 'utf8');
console.log("Fixed URL hydration");
