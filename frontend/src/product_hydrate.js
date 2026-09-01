import { mockDatabase } from './mock_database.js';

export function hydrateProduct() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');
  const productData = mockDatabase.find(p => p.id === productId) || mockDatabase[0];

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
      let breadcrumbHTML = `<a href="/" class="hover:text-[#8ac353]">หน้าหลัก</a>`;
      productData.categories.forEach(cat => {
        breadcrumbHTML += `<span class="text-gray-400">&gt;</span><a href="/category.html?cat=${cat.url_slug}" class="hover:text-[#8ac353]">${cat.name}</a>`;
      });
      breadcrumbHTML += `<span class="text-gray-400">&gt;</span><span class="text-[#252525]">${productData.name}</span>`;
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
          return `<div class="aspect-square bg-white rounded-lg overflow-hidden cursor-pointer ${borderClass}" onclick="document.getElementById('product-image').src='${imgUrl}'"><img src="${imgUrl}" class="w-full h-full object-cover rounded"></div>`;
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

    // State & Initialization
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

      if(priceEl) priceEl.innerText = `฿${currentVariant.price.toFixed(2)}`;
      if(unitEl) unitEl.innerText = isTwoTier ? `/${currentPackageObj.name}` : `/${currentPackageObj.weight}`;
      if(skuEl) skuEl.innerText = `SKU: ${productData.sku}-${currentVariant.size.replace(' mm', '').replace('.', '')}`;
      if(sizeLabel) sizeLabel.innerText = currentVariant.size;
      if(pkgLabel) pkgLabel.innerText = isTwoTier ? currentPackageObj.name : `${currentPackageObj.name} (${currentPackageObj.weight})`;
      
      if (currentVariant.original_price && currentVariant.original_price > currentVariant.price) {
        const discountPct = Math.round(((currentVariant.original_price - currentVariant.price) / currentVariant.original_price) * 100);
        if(origPriceEl) { origPriceEl.style.display = 'block'; origPriceEl.innerText = `฿${currentVariant.original_price.toFixed(2)}`; }
        if(discountBadgeEl) { discountBadgeEl.style.display = 'flex'; discountBadgeEl.innerText = `-${discountPct}%`; }
      } else {
        if(origPriceEl) origPriceEl.style.display = 'none';
        if(discountBadgeEl) discountBadgeEl.style.display = 'none';
      }

      renderSizeButtons();
      renderPackageButtons();
    };

    const renderSizeButtons = () => {
      const container = document.getElementById('size-buttons');
      const wrapper = document.getElementById('size-section-wrapper');
      
      // Auto-hide size section if it's not a wire or only has a generic "มาตรฐาน" size
      if (uniqueSizes.length === 1 && (uniqueSizes[0] === "มาตรฐาน" || uniqueSizes[0] === "" || uniqueSizes[0] === "N/A" || uniqueSizes[0] === "ฟรีไซส์")) {
         if (wrapper) wrapper.style.display = 'none';
      } else {
         if (wrapper) wrapper.style.display = 'block';
      }

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

        if (isOutOfStock) return `<button class="px-4 py-1 rounded-[4px] bg-gray-50 border border-gray-200 text-gray-400 font-medium text-[14px] cursor-not-allowed line-through decoration-gray-300 transition-colors">${sizeStr} (หมด)</button>`;
        if (isSelected) return `<button class="px-4 py-1 rounded-[4px] bg-[#333333] border border-[#333333] text-white font-medium text-[14px] shadow-sm transition-colors cursor-default">${sizeStr}</button>`;
        return `<button onclick="window.selectSize('${sizeStr}')" class="px-4 py-1 rounded-[4px] bg-white border border-gray-300 text-[#252525] font-medium text-[14px] hover:border-[#333333] transition-colors">${sizeStr}</button>`;
      }).join('');
    };

    const renderPackageButtons = () => {
      const container = document.getElementById('package-buttons');
      const wrapper = document.getElementById('package-section-wrapper');
      
      // Global Standard: If there is only ONE standard package option (like "1 ตัว" or "มาตรฐาน"), HIDE the entire package UI.
      if (uniquePackages.length === 1 && (uniquePackages[0] === "1 ตัว" || uniquePackages[0] === "มาตรฐาน")) {
         if (wrapper) wrapper.style.display = 'none';
      } else {
         if (wrapper) wrapper.style.display = 'block';
      }

      const pkgLabelTop = document.querySelector('#package-section-wrapper span:first-child');
      if (pkgLabelTop) pkgLabelTop.innerText = "บรรจุ";

      if(!container) return;
      container.innerHTML = uniquePackages.map(pkgStr => {
        if (isTwoTier) {
          // Rule 1: Hide completely if not in DB
          const matchingVariant = productData.variants.find(v => v.size === selectedSizeName && v.package === pkgStr);
          if (!matchingVariant) return '';

          // Rule 2: Gray out if stock <= 0
          const isOutOfStock = matchingVariant.stock <= 0;
          const isSelected = pkgStr === selectedPackageName;

          if (isOutOfStock) return `<button class="px-4 py-1 rounded-[4px] bg-gray-50 border border-gray-200 text-gray-400 font-medium text-[14px] cursor-not-allowed line-through decoration-gray-300 transition-colors">${pkgStr} (หมด)</button>`;
          if (isSelected) return `<button class="px-4 py-1 rounded-[4px] bg-[#333333] border border-[#333333] text-white font-medium text-[14px] shadow-sm transition-colors cursor-default">${pkgStr}</button>`;
          return `<button onclick="window.selectPackage('${pkgStr}')" class="px-4 py-1 rounded-[4px] bg-white border border-gray-300 text-[#252525] font-medium text-[14px] hover:border-[#333333] transition-colors">${pkgStr}</button>`;
        } else {
          // Fallback old logic
          const p = productData.packages.find(p => p.name === pkgStr) || {name: pkgStr, weight: ""};
          const isSelected = p.name === selectedPackageName;
          if (isSelected) return `<button class="px-4 py-1 rounded-[4px] bg-[#333333] border border-[#333333] text-white font-medium text-[14px] shadow-sm transition-colors cursor-default">${p.name} (${p.weight})</button>`;
          return `<button onclick="window.selectPackage('${p.name}')" class="px-4 py-1 rounded-[4px] bg-white border border-gray-300 text-[#252525] font-medium text-[14px] hover:border-[#333333] transition-colors">${p.name} (${p.weight})</button>`;
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

    const specsContainer = document.getElementById('product-specs-container');
    if(specsContainer && productData.specsTable) {
      specsContainer.innerHTML = productData.specsTable.map((row, index) => {
        const roundedClass = index === 0 ? "rounded-t-sm" : index === productData.specsTable.length - 1 ? "rounded-b-sm" : "";
        const bgClass = index % 2 === 0 ? "bg-white" : "bg-[#F8F8F8]";
        return `<div class="flex ${bgClass} py-2 px-6 ${roundedClass}"><div class="w-[40%] md:w-[30%]">${row.key}</div><div class="w-[60%] md:w-[70%]">${row.value}</div></div>`;
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


    // Rich Content Hide/Show Logic (Hiding Parent Wrappers to avoid empty borders)
    const toggleNode = (id, hasData, callback) => {
      const el = document.getElementById(id);
      if(!el) return;
      // ถ้าเป็น img ให้ซ่อน div ที่ครอบมันอยู่ (parentElement) ถ้าเป็น text ซ่อนตัวเอง หรือตัวครอบ
      const targetHide = (el.tagName === 'IMG') ? el.parentElement : el;
      if(hasData) {
        callback(el);
        targetHide.style.display = '';
      } else {
        targetHide.style.display = 'none';
      }
    };

    // Fallback Logic: ถ้าไม่มีข้อมูลโฆษณาเฉพาะ ให้เอาชื่อและรายละเอียดหลักมาวนซ้ำ
    const finalHeadline = productData.richContent.headline || productData.name;
    const finalDesc = productData.richContent.description || productData.description;

    toggleNode('rich-headline', finalHeadline, (el) => el.innerText = finalHeadline);
    toggleNode('rich-img-1', productData.richContent.image1, (el) => el.src = productData.richContent.image1);
    toggleNode('rich-img-2', productData.richContent.image2, (el) => el.src = productData.richContent.image2);
    
    // สำหรับ text block ที่อยู่รวมกันใน div เดียว (subheadline + desc)
    const textBlockParent = document.getElementById('rich-subheadline')?.parentElement;
    if (textBlockParent) {
       if (productData.richContent.subheadline || finalDesc) {
           textBlockParent.style.display = '';
           const elSub = document.getElementById('rich-subheadline');
           if(elSub) {
             if(productData.richContent.subheadline) { elSub.innerText = productData.richContent.subheadline; elSub.style.display = ''; }
             else { elSub.style.display = 'none'; }
           }
           const elDesc = document.getElementById('rich-desc');
           if(elDesc) {
             if(finalDesc) { elDesc.innerText = finalDesc; elDesc.style.display = ''; }
             else { elDesc.style.display = 'none'; }
           }
       } else {
           textBlockParent.style.display = 'none';
       }
    }

    toggleNode('rich-img-3', productData.richContent.image3, (el) => el.src = productData.richContent.image3);


    updateDisplay();

    // Hide read-more button entirely if content is short
    setTimeout(() => {
      const richContainer = document.getElementById('rich-content-container');
      const richFade = document.getElementById('rich-content-fade');
      if (richContainer && richFade) {
        if (richContainer.scrollHeight <= 500) {
          richFade.style.display = 'none';
          richContainer.style.maxHeight = 'none';
        } else {
          richFade.style.display = 'flex';
          richContainer.style.maxHeight = '500px';
        }
      }
    }, 300); // give images a bit of time to render height

  }, 100);
}
