const fs = require('fs');
let js = fs.readFileSync('frontend/src/product_hydrate.js', 'utf8');

// Use regex to replace the entire hardcoded productData object with the import and URL search logic
const regex = /const productData = {[\s\S]*?};\n\n  setTimeout/m;
const replacement = `import { mockDatabase } from './mock_database.js';

export function hydrateProduct() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');
  const productData = mockDatabase.find(p => p.id === productId) || mockDatabase[0];

  setTimeout`;

// The original file starts with `export function hydrateProduct() {`
// Let's just rewrite the top part.
const newJs = js.replace(/export function hydrateProduct\(\) {\n  const productData = {[\s\S]*?};\n\n  setTimeout/m, replacement);

fs.writeFileSync('frontend/src/product_hydrate.js', newJs, 'utf8');
console.log("Updated product_hydrate.js to read from mockDatabase based on URL");
