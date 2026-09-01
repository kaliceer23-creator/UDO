const fs = require('fs');

let mainJs = fs.readFileSync('frontend/src/main.js', 'utf8');

const injectionCode = `
import { ProductCard } from './components/ProductCard.js';
import { sampleProducts } from './demo_data.js';

// ---- Data Injection: Product Cards ----
const similarGrid = document.getElementById('similar-products-grid');
if (similarGrid) {
  // จำลองการรับข้อมูล JSON มา 5 ชิ้น แล้วสร้างการ์ดใส่ Grid ทันที
  similarGrid.innerHTML = sampleProducts.map(product => ProductCard(product)).join('');
}
`;

mainJs = mainJs + '\n' + injectionCode;

fs.writeFileSync('frontend/src/main.js', mainJs, 'utf8');
console.log('Added product rendering logic to main.js');
