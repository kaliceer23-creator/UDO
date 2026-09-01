const fs = require('fs');

let js = fs.readFileSync('frontend/src/product.js', 'utf8');

// Remove it from the bottom
js = js.replace("import { hydrateProduct } from './product_hydrate.js';", "");

// Put it at the top, right after import './style.css'
js = js.replace("import './style.css'", "import './style.css';\nimport { hydrateProduct } from './product_hydrate.js';");

fs.writeFileSync('frontend/src/product.js', js, 'utf8');
console.log("Moved import to the top");
