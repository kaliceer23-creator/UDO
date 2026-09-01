const fs = require('fs');
let js = fs.readFileSync('frontend/src/category.js', 'utf8');

// 1. Add import statement at the top (after import './style.css')
js = js.replace(
  `import './style.css'`,
  `import './style.css'\nimport { mockDatabase } from './mock_database.js'`
);

// 2. Identify the Grid container
// Current HTML:
//   <!-- 5. Product Grid -->
//   <div class="max-w-[1400px] mx-auto px-4 md:px-8 w-full mb-16">
//     <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
// <!-- Card 1 -->

// We need to inject an ID into the grid container, e.g., id="category-product-grid", and empty it.
const gridRegex = /<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">[\s\S]*?<!-- 6\. Footer -->/m;
const gridReplacement = `<div id="category-product-grid" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      <!-- JS will inject cards here -->
    </div>
  </div>
  
  <!-- 6. Footer -->`;
js = js.replace(gridRegex, gridReplacement);

// 3. Add the logic to render the cards at the end of the file
const renderLogic = `

// --- Dynamic Category Rendering ---
const renderCategoryGrid = () => {
  const grid = document.getElementById('category-product-grid');
  if (!grid) return;

  grid.innerHTML = mockDatabase.map(product => {
    // ใช้ราคาแรกจาก variants
    const defaultVariant = product.variants[0];
    const defaultPrice = defaultVariant.price;
    const defaultPackage = product.packages[0].name;
    const defaultImage = product.images[0];
    const tagsText = product.tags ? product.tags.join(' | ') : '';
    
    return \`
      <a href="product.html?id=\${product.id}" class="w-full h-full flex flex-col bg-white rounded-xl p-4 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow border border-gray-100 group">
        <div class="relative w-full aspect-square bg-gray-50 rounded-lg mb-4 overflow-hidden flex justify-center items-center">
           <img src="\${defaultImage}" alt="\${product.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='https://via.placeholder.com/400x500/F9FAFB/9CA3AF?text=No+Image'"/>
        </div>
        <h3 class="font-semibold text-gray-800 text-[15px] md:text-[17px] leading-tight mb-2 line-clamp-2">
          \${product.name}
        </h3>
        <p class="text-[14px] text-gray-500 line-clamp-3 mb-3 leading-[1.6]">
          \${tagsText}
        </p>
        <div class="mt-auto flex flex-col">
          <div class="flex items-center justify-between mt-2">
            <div class="flex items-baseline gap-1">
              <span class="text-[#E12427] font-bold text-[18px]">฿\${defaultPrice.toFixed(2)}</span>
              <span class="text-gray-500 text-[12px] font-medium">/\${defaultPackage}</span>
            </div>
            <div class="cart-control flex justify-end">
              <button class="btn-add w-8 h-8 md:w-9 md:h-9 bg-brand-green hover:bg-[#8eb543] text-white flex items-center justify-center rounded-lg shadow-sm transition-transform hover:scale-105 shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </a>
    \`;
  }).join('');
};

// Render when DOM is ready
setTimeout(renderCategoryGrid, 100);
`;

js += renderLogic;

fs.writeFileSync('frontend/src/category.js', js, 'utf8');
console.log("Updated category.js with dynamic card rendering");
