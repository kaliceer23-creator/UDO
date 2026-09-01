const fs = require('fs');
let js = fs.readFileSync('frontend/src/product_hydrate.js', 'utf8');

js = js.replace(/const el_([a-zA-Z0-9-]+) = document.getElementById\('([a-zA-Z0-9-]+)'\);\n\s*if\([^)]+\) el_[a-zA-Z0-9-]+\.(innerText|src) = (geminiData\.[a-zA-Z]+);/g, 
  "const el_$1_safe = document.getElementById('$2');\n    if(el_$1_safe) el_$1_safe.$3 = $4;");

// specifically replace dashes with underscores for variable names
js = js.replace(/el_product-name/g, 'el_product_name');
js = js.replace(/el_product-brand/g, 'el_product_brand');
js = js.replace(/el_product-desc/g, 'el_product_desc');
js = js.replace(/el_breadcrumb-name/g, 'el_breadcrumb_name');
js = js.replace(/el_breadcrumb-category/g, 'el_breadcrumb_category');
js = js.replace(/el_product-image/g, 'el_product_image');

fs.writeFileSync('frontend/src/product_hydrate.js', js, 'utf8');
console.log("Fixed variable names");
