const fs = require('fs');
const content = fs.readFileSync('frontend/src/product_hydrate.js', 'utf8');

// Find the boundaries of the code we want to replace
const startMarker = "// State";
const endMarker = "const specsContainer = document.getElementById('product-specs-container');";

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error("Markers not found");
  process.exit(1);
}

const replacement = `// State & Initialization
    const isTwoTier = productData.variants.some(v => v.package !== undefined);
    
    let uniqueSizes = [];
    let uniquePackages = [];
    
    if (isTwoTier) {
      uniqueSizes = [...new Set(productData.variants.map(v => v.size))];
      uniquePackages = [...new Set(productData.variants.map(v => v.package))];
    } else {
      uniqueSizes = productData.variants.map(v => v.size);
      uniquePackages = productData.packages.map(p => p.name);
    }

    let selectedSizeName = uniqueSizes[0];
    let selectedPackageName = isTwoTier 
        ? productData.variants.find(v => v.size === selectedSizeName).package 
        : uniquePackages[0];

    const priceEl = document.getElementById('product-price');
    const unitEl = document.getElementById('product-unit');
    const skuEl = document.getElementById('product-sku');
    const sizeLabel = document.getElementById('selected-size-label');
    const pkgLabel = document.getElementById('selected-package-label');
    const origPriceEl = document.getElementById('product-original-price');
    const discountBadgeEl = document.getElementById('product-discount-badge');

    const updateDisplay = () => {
      let currentVariant;
      let currentPackageObj;

      if (isTwoTier) {
        currentVariant = productData.variants.find(v => v.size === selectedSizeName && v.package === selectedPackageName) || productData.variants[0];
        currentPackageObj = { name: currentVariant.package, weight: currentVariant.package };
      } else {
        currentVariant = productData.variants.find(v => v.size === selectedSizeName) || productData.variants[0];
        currentPackageObj = productData.packages.find(p => p.name === selectedPackageName) || productData.packages[0];
      }

      if(priceEl) priceEl.innerText = \`฿\${currentVariant.price.toFixed(2)}\`;
      if(unitEl) unitEl.innerText = isTwoTier ? \`/\${currentPackageObj.name}\` : \`/\${currentPackageObj.weight}\`;
      if(skuEl) skuEl.innerText = \`SKU: \${productData.sku}-\${currentVariant.size.replace(' mm', '').replace('.', '')}\`;
      if(sizeLabel) sizeLabel.innerText = currentVariant.size;
      if(pkgLabel) pkgLabel.innerText = isTwoTier ? currentPackageObj.name : \`\${currentPackageObj.name} (\${currentPackageObj.weight})\`;
      
      if (currentVariant.original_price && currentVariant.original_price > currentVariant.price) {
        const discountPct = Math.round(((currentVariant.original_price - currentVariant.price) / currentVariant.original_price) * 100);
        if(origPriceEl) { origPriceEl.style.display = 'block'; origPriceEl.innerText = \`฿\${currentVariant.original_price.toFixed(2)}\`; }
        if(discountBadgeEl) { discountBadgeEl.style.display = 'flex'; discountBadgeEl.innerText = \`-\${discountPct}%\`; }
      } else {
        if(origPriceEl) origPriceEl.style.display = 'none';
        if(discountBadgeEl) discountBadgeEl.style.display = 'none';
      }

      renderSizeButtons();
      renderPackageButtons();
    };

    const renderSizeButtons = () => {
      const container = document.getElementById('size-buttons');
      if(!container) return;
      container.innerHTML = uniqueSizes.map(sizeStr => {
        const isSelected = sizeStr === selectedSizeName;
        
        let isOutOfStock = false;
        if (isTwoTier) {
          const variantsOfSize = productData.variants.filter(v => v.size === sizeStr);
          isOutOfStock = variantsOfSize.every(v => v.stock <= 0);
        } else {
          const v = productData.variants.find(v => v.size === sizeStr);
          isOutOfStock = v && v.stock <= 0;
        }

        if (isOutOfStock) return \`<button class="px-4 py-1 rounded-[4px] bg-gray-50 border border-gray-200 text-gray-400 font-medium text-[14px] cursor-not-allowed line-through decoration-gray-300 transition-colors">\${sizeStr} (หมด)</button>\`;
        if (isSelected) return \`<button class="px-4 py-1 rounded-[4px] bg-[#333333] border border-[#333333] text-white font-medium text-[14px] shadow-sm transition-colors cursor-default">\${sizeStr}</button>\`;
        return \`<button onclick="window.selectSize('\${sizeStr}')" class="px-4 py-1 rounded-[4px] bg-white border border-gray-300 text-[#252525] font-medium text-[14px] hover:border-[#333333] transition-colors">\${sizeStr}</button>\`;
      }).join('');
    };

    const renderPackageButtons = () => {
      const container = document.getElementById('package-buttons');
      if(!container) return;
      container.innerHTML = uniquePackages.map(pkgStr => {
        if (isTwoTier) {
          // Rule 1: Hide completely if not in DB
          const matchingVariant = productData.variants.find(v => v.size === selectedSizeName && v.package === pkgStr);
          if (!matchingVariant) return '';

          // Rule 2: Gray out if stock <= 0
          const isOutOfStock = matchingVariant.stock <= 0;
          const isSelected = pkgStr === selectedPackageName;

          if (isOutOfStock) return \`<button class="px-4 py-1 rounded-[4px] bg-gray-50 border border-gray-200 text-gray-400 font-medium text-[14px] cursor-not-allowed line-through decoration-gray-300 transition-colors">\${pkgStr} (หมด)</button>\`;
          if (isSelected) return \`<button class="px-4 py-1 rounded-[4px] bg-[#333333] border border-[#333333] text-white font-medium text-[14px] shadow-sm transition-colors cursor-default">\${pkgStr}</button>\`;
          return \`<button onclick="window.selectPackage('\${pkgStr}')" class="px-4 py-1 rounded-[4px] bg-white border border-gray-300 text-[#252525] font-medium text-[14px] hover:border-[#333333] transition-colors">\${pkgStr}</button>\`;
        } else {
          // Fallback old logic
          const p = productData.packages.find(p => p.name === pkgStr) || {name: pkgStr, weight: ""};
          const isSelected = p.name === selectedPackageName;
          if (isSelected) return \`<button class="px-4 py-1 rounded-[4px] bg-[#333333] border border-[#333333] text-white font-medium text-[14px] shadow-sm transition-colors cursor-default">\${p.name} (\${p.weight})</button>\`;
          return \`<button onclick="window.selectPackage('\${p.name}')" class="px-4 py-1 rounded-[4px] bg-white border border-gray-300 text-[#252525] font-medium text-[14px] hover:border-[#333333] transition-colors">\${p.name} (\${p.weight})</button>\`;
        }
      }).join('');
    };

    window.selectSize = (sizeStr) => { 
      selectedSizeName = sizeStr; 
      if (isTwoTier) {
        const validVariant = productData.variants.find(v => v.size === selectedSizeName && v.package === selectedPackageName);
        if (!validVariant) {
          const firstAvailable = productData.variants.find(v => v.size === selectedSizeName);
          if (firstAvailable) selectedPackageName = firstAvailable.package;
        }
      }
      updateDisplay(); 
    };
    window.selectPackage = (pkgStr) => { 
      selectedPackageName = pkgStr; 
      updateDisplay(); 
    };

    `;

const newContent = content.substring(0, startIndex) + replacement + content.substring(endIndex);
fs.writeFileSync('frontend/src/product_hydrate.js', newContent, 'utf8');
console.log("Rewrote hydration logic successfully!");
