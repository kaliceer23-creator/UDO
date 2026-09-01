const fs = require('fs');
let js = fs.readFileSync('frontend/src/product_hydrate.js', 'utf8');

// 1. Import mockDatabase
js = js.replace(
  `export function hydrateProduct() {\n  const productData = {`,
  `import { mockDatabase } from './mock_database.js';\n\nexport function hydrateProduct() {\n  // อ่าน id จาก URL เช่น ?id=gem-308l\n  const params = new URLSearchParams(window.location.search);\n  const productId = params.get('id');\n  \n  // ค้นหาสินค้าจาก mockDatabase ถ้าไม่เจอให้ใช้ตัวแรกเป็นค่าเริ่มต้น\n  const productData = mockDatabase.find(p => p.id === productId) || mockDatabase[0];\n\n  const temp = {`
);

// We need to carefully remove the hardcoded productData object and replace it with the dynamic finding logic.
// The hardcoded object starts at `const productData = {` and ends right before `setTimeout(() => {`.
// Let's use Regex.
