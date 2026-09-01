const fs = require('fs');

// 1. Clean index.html
let indexHtml = fs.readFileSync('frontend/index.html', 'utf8');
indexHtml = indexHtml.replace(/<load src="\.\/src\/components\/similar-products\.html" \/>\n\s*/g, '');
fs.writeFileSync('frontend/index.html', indexHtml, 'utf8');

// 2. Clean main.js
let mainJs = fs.readFileSync('frontend/src/main.js', 'utf8');

const injectionStart = "import { ProductCard } from './components/ProductCard.js';";
const startIndex = mainJs.indexOf(injectionStart);

if (startIndex !== -1) {
    mainJs = mainJs.substring(0, startIndex).trim() + '\n';
    fs.writeFileSync('frontend/src/main.js', mainJs, 'utf8');
}

console.log("Successfully removed demo code from index.html and main.js");
