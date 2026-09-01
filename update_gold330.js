const fs = require('fs');

let js = `export function hydrateProduct() {
  const productData = {
    "id": "gold-330",
    "name": "ลวดเชื่อมไฟฟ้า GOLD 330 (สารพัดประโยชน์)",
    "brand": "GOLD",
    "sku": "GOLD-330",
    
    "categories": [
      { "level": 1, "name": "เครื่องมือช่างและฮาร์ดแวร์", "url_slug": "hardware" },
      { "level": 2, "name": "เครื่องเชื่อมและอุปกรณ์", "url_slug": "welding-equipment" },
      { "level": 3, "name": "ลวดเชื่อมซ่อมบำรุง", "url_slug": "maintenance-welding-wire" }
    ],

    "filter_attributes": {
      "material": "โลหะต่างชนิด (Alloy/Tool Steel)",
      "process": "ธูปเชื่อม (MMA)"
    },
    
    "created_at": "2026-08-20T10:00:00Z",
    "sold_count": 850,
    "collections": ["popular"],
    
    "description": "ลวดเชื่อมไฟฟ้า GOLD 330 ใช้งานได้หลากหลายประเภทชิ้นงาน สำหรับงานซ่อมบำรุงชิ้นงาน ALLOY อัลลอยสตีล, HI-ALLOY ไฮอัลลอยสตีล, TOOL STEEL ทูลส์สตีล, COLD WORKING STEEL, HIGH SPEED STEEL, สแตนเลสสตีล, แมงกานีส, โลหะต่างชนิด และอื่นๆ สามารถเชื่อม ซ่อมแซมแม่พิมพ์, เชื่อมคมตัด, ข้อเหวี่ยงเกียร์, ชิ้นส่วนรถขุดตัก",
    
    "images": [
      "https://www.udo.co.th/storage/products/November2019/5bNnSY3R9jZNo4KyS9Kx.jpg"
    ],
    
    "warranty": null,
    
    "variants": [
      { "size": "3.2 mm", "price": 1950.00, "original_price": null, "stock": 100 }
    ],

    "packages": [
      { "name": "ห่อ", "weight": "1 กก.", "is_active": true }
    ],

    "specsTable": [
      { "key": "การใช้งานหลัก", "value": "ซ่อมแซมแม่พิมพ์, เชื่อมคมตัด, ข้อเหวี่ยงเกียร์, ชิ้นส่วนรถขุดตัก" },
      { "key": "วัสดุที่รองรับ", "value": "Alloy Steel, Hi-Alloy, Tool Steel, Cold Working Steel, High Speed Steel, Stainless Steel, Manganese, โลหะต่างชนิด" },
      { "key": "ส่วนผสมทางเคมีหลัก", "value": "โครเมียม (Cr), นิกเกิล (Ni), แมงกานีส (Mn)" },
      { "key": "ค่าความแข็ง (Hardness)", "value": "ประมาณ 24-28 HRC" }
    ],

    "richContent": {
      "headline": null,
      "subheadline": null,
      "description": null,
      "image1": "https://www.udo.co.th/storage/products/June2021/Gold-330.jpg",
      "image2": null,
      "image3": null
    }
  };

  setTimeout(() => {
    // 1. Text Info
    const el_product_name = document.getElementById('product-name');
    if(el_product_name) el_product_name.innerText = productData.name;
    const el_product_brand = document.getElementById('product-brand');
    if(el_product_brand) el_product_brand.innerText = productData.brand;
    const el_product_desc = document.getElementById('product-desc');
    if(el_product_desc) el_product_desc.innerText = productData.description;
    
    // --- Dynamic Breadcrumbs Rendering ---
    const breadcrumbContainer = document.getElementById('product-breadcrumb-container');
    if(breadcrumbContainer && productData.categories) {
      let breadcrumbHTML = \`<a href="/" class="hover:text-[#8ac353]">หน้าหลัก</a>\`;
      productData.categories.forEach(cat => {
        breadcrumbHTML += \`<span class="text-gray-400">&gt;</span><a href="/category.html?cat=\${cat.url_slug}" class="hover:text-[#8ac353]">\${cat.name}</a>\`;
      });
      breadcrumbHTML += \`<span class="text-gray-400">&gt;</span><span class="text-[#252525]">\${productData.name}</span>\`;
      breadcrumbContainer.innerHTML = breadcrumbHTML;
    }

    // Image
    const el_product_image = document.getElementById('product-image');
    if(el_product_image && productData.images.length > 0) el_product_image.src = productData.images[0];
    
    const el_thumbnails = document.getElementById('product-thumbnails-container');
    if(el_thumbnails) {
      if(productData.images.length <= 1) {
        el_thumbnails.style.display = 'none';
      } else {
        el_thumbnails.style.display = 'grid';
        el_thumbnails.innerHTML = productData.images.map((imgUrl, index) => {
          const borderClass = index === 0 ? "border-2 border-[#71C04C]" : "opacity-70 hover:opacity-100";
          return \`<div class="aspect-square bg-white rounded-lg overflow-hidden cursor-pointer \${borderClass}" onclick="document.getElementById('product-image').src='\${imgUrl}'"><img src="\${imgUrl}" class="w-full h-full object-cover rounded"></div>\`;
        }).join('');
      }
    }

    // Warranty
    const warrantyEl = document.getElementById('product-warranty');
    if(warrantyEl) {
      if(productData.warranty) {
        warrantyEl.style.display = 'flex';
      } else {
        warrantyEl.style.display = 'none';
      }
    }

    // State
    let selectedSize = productData.variants[0];
    let selectedPackage = productData.packages[0];

    const priceEl = document.getElementById('product-price');
    const unitEl = document.getElementById('product-unit');
    const skuEl = document.getElementById('product-sku');
    const sizeLabel = document.getElementById('selected-size-label');
    const pkgLabel = document.getElementById('selected-package-label');
    const origPriceEl = document.getElementById('product-original-price');
    const discountBadgeEl = document.getElementById('product-discount-badge');

    const updateDisplay = () => {
      if(priceEl) priceEl.innerText = \`฿\${selectedSize.price.toFixed(2)}\`;
      if(unitEl) unitEl.innerText = \`/\${selectedPackage.name}\`;
      if(skuEl) skuEl.innerText = \`SKU: \${productData.sku}-\${selectedSize.size.replace(' mm', '')}\`;
      if(sizeLabel) sizeLabel.innerText = selectedSize.size;
      if(pkgLabel) pkgLabel.innerText = \`\${selectedPackage.name} (\${selectedPackage.weight})\`;
      
      if (selectedSize.original_price && selectedSize.original_price > selectedSize.price) {
        if(origPriceEl) { origPriceEl.style.display = 'block'; origPriceEl.innerText = \`฿\${selectedSize.original_price.toFixed(2)}\`; }
        if(discountBadgeEl) discountBadgeEl.style.display = 'flex';
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
      container.innerHTML = productData.variants.map(v => {
        const isSelected = v.size === selectedSize.size;
        const isOutOfStock = v.stock <= 0;
        if (isOutOfStock) return \`<button class="px-4 py-1 rounded-[4px] bg-gray-50 border border-gray-200 text-gray-400 font-medium text-[14px] cursor-not-allowed line-through decoration-gray-300 transition-colors">\${v.size} (หมด)</button>\`;
        if (isSelected) return \`<button class="px-4 py-1 rounded-[4px] bg-[#333333] border border-[#333333] text-white font-medium text-[14px] shadow-sm transition-colors cursor-default">\${v.size}</button>\`;
        return \`<button onclick="window.selectSize('\${v.size}')" class="px-4 py-1 rounded-[4px] bg-white border border-gray-300 text-[#252525] font-medium text-[14px] hover:border-[#333333] transition-colors">\${v.size}</button>\`;
      }).join('');
    };

    const renderPackageButtons = () => {
      const container = document.getElementById('package-buttons');
      if(!container) return;
      container.innerHTML = productData.packages.map(p => {
        const isSelected = p.name === selectedPackage.name;
        if (isSelected) return \`<button class="px-4 py-1 rounded-[4px] bg-[#333333] border border-[#333333] text-white font-medium text-[14px] shadow-sm transition-colors cursor-default">\${p.name} (\${p.weight})</button>\`;
        return \`<button onclick="window.selectPackage('\${p.name}')" class="px-4 py-1 rounded-[4px] bg-white border border-gray-300 text-[#252525] font-medium text-[14px] hover:border-[#333333] transition-colors">\${p.name} (\${p.weight})</button>\`;
      }).join('');
    };

    const specsContainer = document.getElementById('product-specs-container');
    if(specsContainer && productData.specsTable) {
      specsContainer.innerHTML = productData.specsTable.map((row, index) => {
        const roundedClass = index === 0 ? "rounded-t-sm" : index === productData.specsTable.length - 1 ? "rounded-b-sm" : "";
        const bgClass = index % 2 === 0 ? "bg-white" : "bg-[#F8F8F8]";
        return \`<div class="flex \${bgClass} py-2 px-6 \${roundedClass}"><div class="w-[40%] md:w-[30%]">\${row.key}</div><div class="w-[60%] md:w-[70%]">\${row.value}</div></div>\`;
      }).join('');
    }

    // Qty
    let currentQty = 1;
    const qtyEl = document.getElementById('product-qty');
    const btnMinus = document.getElementById('btn-qty-minus');
    const btnPlus = document.getElementById('btn-qty-plus');

    const updateQtyDisplay = () => {
      if(qtyEl) qtyEl.innerText = currentQty;
      if(btnMinus) {
        if(currentQty <= 1) {
          btnMinus.className = "flex items-center justify-center text-gray-300 transition-colors cursor-not-allowed";
        } else {
          btnMinus.className = "flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors cursor-pointer";
        }
      }
    };
    window.increaseQty = () => { currentQty++; updateQtyDisplay(); };
    window.decreaseQty = () => { if(currentQty > 1) { currentQty--; updateQtyDisplay(); } };
    updateQtyDisplay();

    // Selectors
    window.selectSize = (sizeStr) => { selectedSize = productData.variants.find(v => v.size === sizeStr); updateDisplay(); };
    window.selectPackage = (pkgStr) => { selectedPackage = productData.packages.find(p => p.name === pkgStr); updateDisplay(); };

    // Rich Content Hide/Show Logic
    const el_rich_headline = document.getElementById('rich-headline');
    if(el_rich_headline) {
      if(productData.richContent.headline) { el_rich_headline.innerText = productData.richContent.headline; el_rich_headline.style.display = 'block'; }
      else { el_rich_headline.style.display = 'none'; }
    }
    const el_rich_img1 = document.getElementById('rich-img-1');
    if(el_rich_img1) {
      if(productData.richContent.image1) { el_rich_img1.src = productData.richContent.image1; el_rich_img1.style.display = 'block'; }
      else { el_rich_img1.style.display = 'none'; }
    }
    const el_rich_img2 = document.getElementById('rich-img-2');
    if(el_rich_img2) {
      if(productData.richContent.image2) { el_rich_img2.src = productData.richContent.image2; el_rich_img2.style.display = 'block'; }
      else { el_rich_img2.style.display = 'none'; }
    }
    const el_rich_subheadline = document.getElementById('rich-subheadline');
    if(el_rich_subheadline) {
      if(productData.richContent.subheadline) { el_rich_subheadline.innerText = productData.richContent.subheadline; el_rich_subheadline.style.display = 'block'; }
      else { el_rich_subheadline.style.display = 'none'; }
    }
    const el_rich_desc = document.getElementById('rich-desc');
    if(el_rich_desc) {
      if(productData.richContent.description) { el_rich_desc.innerText = productData.richContent.description; el_rich_desc.style.display = 'block'; }
      else { el_rich_desc.style.display = 'none'; }
    }
    const el_rich_img3 = document.getElementById('rich-img-3');
    if(el_rich_img3) {
      if(productData.richContent.image3) { el_rich_img3.src = productData.richContent.image3; el_rich_img3.style.display = 'block'; }
      else { el_rich_img3.style.display = 'none'; }
    }

    updateDisplay();

  }, 100);
}
`;

fs.writeFileSync('frontend/src/product_hydrate.js', js, 'utf8');
console.log("Updated product_hydrate.js with GOLD 330 data");
