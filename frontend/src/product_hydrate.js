import { mockDatabase, fetchLiveDatabase } from './mock_database.js';
import { generateCardHTML, formatPrice } from './home_hydrate.js';
import { renderProductBreadcrumbs } from './category_taxonomy.js';

export async function hydrateProduct(productOverride = null) {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');

  let productData = productOverride;
  if (!productData && productId) {
    try {
      const res = await fetch(`/api/products.php?id=${encodeURIComponent(productId)}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.product) {
          productData = json.product;
        }
      }
    } catch (e) {
      // Fallback to in-memory cache
    }

    if (!productData) {
      productData = mockDatabase.find(p => p.id === productId);
    }
    if (!productData) {
      await fetchLiveDatabase();
      productData = mockDatabase.find(p => p.id === productId);
    }
  }

  if (!productData) {
    productData = mockDatabase[0];
  }
  if (!productData) return;

  setTimeout(() => {
    // 1. Text Info
    const el_product_name = document.getElementById('product-name');
    if(el_product_name) el_product_name.innerText = productData.name;
    const el_product_brand = document.getElementById('product-brand');
    if(el_product_brand) el_product_brand.innerText = productData.brand;
    const el_product_desc = document.getElementById('product-desc');
    if(el_product_desc) {
      if (productData.descriptionHtml) {
        el_product_desc.innerHTML = productData.descriptionHtml;
      } else {
        el_product_desc.innerText = productData.description;
      }
    }
    
    // --- Dynamic Breadcrumbs Rendering ---
    const breadcrumbContainer = document.getElementById('product-breadcrumb-container');
    if (breadcrumbContainer) {
      breadcrumbContainer.innerHTML = renderProductBreadcrumbs(productData);
    }

    // Image Normalization (supports both legacy flat strings and modern multi-size objects)
    const normalizedImages = (productData.images || []).map(img => {
      if (typeof img === 'string') {
        return { thumb: img, card: img, large: img, original: img };
      }
      return {
        thumb: img.thumb || img.card || img.large || img.original || '',
        card: img.card || img.large || img.original || img.thumb || '',
        large: img.large || img.original || img.card || img.thumb || '',
        original: img.original || img.large || img.card || img.thumb || ''
      };
    });

    window.productImagesList = normalizedImages;
    window.selectedImageIndex = 0;

    const el_product_image = document.getElementById('product-image');
    if (el_product_image && normalizedImages.length > 0) {
      el_product_image.src = normalizedImages[0].large;
    }
    
    const el_thumbnails = document.getElementById('product-thumbnails-container');
    const el_thumb_wrapper = document.getElementById('product-thumbnails-wrapper');
    const el_main_prev = document.getElementById('btn-main-prev');
    const el_main_next = document.getElementById('btn-main-next');

    if (normalizedImages.length <= 1) {
      if (el_thumb_wrapper) el_thumb_wrapper.style.display = 'none';
      if (el_main_prev) el_main_prev.style.display = 'none';
      if (el_main_next) el_main_next.style.display = 'none';
    } else {
      if (el_thumb_wrapper) el_thumb_wrapper.style.display = 'flex';
      if (el_main_prev) el_main_prev.style.display = 'flex';
      if (el_main_next) el_main_next.style.display = 'flex';
      
      if (el_thumbnails) {
        el_thumbnails.innerHTML = normalizedImages.map((imgObj, index) => {
          const borderClass = index === 0 
            ? "border border-black" 
            : "border border-transparent opacity-80 hover:opacity-100";
          return `<div class="w-[70px] h-[86px] sm:w-[76px] sm:h-[92px] bg-white rounded-[2px] overflow-hidden cursor-pointer ${borderClass} flex items-center justify-center p-1 shrink-0 transition-all select-none" onclick="window.selectThumbnail(${index})" data-index="${index}"><img src="${imgObj.thumb}" class="w-full h-full object-contain pointer-events-none" alt="thumbnail ${index + 1}"></div>`;
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

    // Tag ใหม่ (New Badge - Exactly matching Product Card)
    const badgeEl = document.getElementById('product-badge-new');
    if (badgeEl) {
      const isNew = Boolean(
        productData.flags?.is_new || 
        productData.is_new || 
        productData.badge === 'ใหม่' || 
        (productData.created_at && new Date(productData.created_at) >= new Date('2026-04-01'))
      );
      if (isNew) {
        badgeEl.style.display = 'flex';
        badgeEl.innerHTML = `<span class="inline-block transform scale-y-[1.05] origin-center">${productData.badge || 'ใหม่'}</span>`;
      } else {
        badgeEl.style.display = 'none';
      }
    }

    // State & Initialization
    const variantsList = productData.variants && productData.variants.length > 0 ? productData.variants : [];
    const fallbackVariant = { price: 0, size: "มาตรฐาน", package: "มาตรฐาน", stock: 0 };
    const isTwoTier = variantsList.some(v => v.package !== undefined);
    
    let uniqueSizes = [];
    let uniquePackages = [];
    
    if (isTwoTier) {
      uniqueSizes = [...new Set(variantsList.map(v => v.size))];
      uniquePackages = [...new Set(variantsList.map(v => v.package))];
    } else {
      uniqueSizes = variantsList.map(v => v.size);
      uniquePackages = (productData.packages || []).map(p => p.name);
    }

    if (uniqueSizes.length === 0) uniqueSizes = ["มาตรฐาน"];
    if (uniquePackages.length === 0) uniquePackages = ["มาตรฐาน"];

    const urlSizeParam = params.get('size');
    let selectedSizeName = uniqueSizes[0];
    if (urlSizeParam) {
      const matchSize = uniqueSizes.find(s => {
        if (!s) return false;
        return parseFloat(s) === parseFloat(urlSizeParam) || s.toLowerCase() === urlSizeParam.toLowerCase();
      });
      if (matchSize) selectedSizeName = matchSize;
    }
    let selectedPackageName = isTwoTier 
        ? (variantsList.find(v => v.size === selectedSizeName)?.package || uniquePackages[0])
        : uniquePackages[0];

    const priceEl = document.getElementById('product-price');
    const unitEl = document.getElementById('product-unit');
    const skuEl = document.getElementById('product-sku');
    const sizeLabel = document.getElementById('selected-size-label');
    const pkgLabel = document.getElementById('selected-package-label');
    const origPriceEl = document.getElementById('product-original-price');
    const discountBadgeEl = document.getElementById('product-discount-badge');
    const savingsEl = document.getElementById('product-savings');
    const badgesRow = document.getElementById('product-badges-row');

    const updateDisplay = () => {
      let currentVariant;
      let currentPackageObj;

      if (isTwoTier) {
        currentVariant = variantsList.find(v => v.size === selectedSizeName && v.package === selectedPackageName) || variantsList[0] || fallbackVariant;
        currentPackageObj = { name: currentVariant.package || "มาตรฐาน", weight: currentVariant.package || "" };
      } else {
        currentVariant = variantsList.find(v => v.size === selectedSizeName) || variantsList[0] || fallbackVariant;
        currentPackageObj = (productData.packages || []).find(p => p.name === selectedPackageName) || { name: "มาตรฐาน", weight: "" };
      }

      if(priceEl) {
        priceEl.innerText = (currentVariant.price && currentVariant.price > 0) ? `฿${formatPrice(currentVariant.price)}` : 'ติดต่อสอบถาม';
      }
      if(unitEl) {
        if (currentVariant.price && currentVariant.price > 0) {
          unitEl.innerText = isTwoTier ? `/${currentPackageObj.name}` : (currentPackageObj.weight ? `/${currentPackageObj.weight}` : `/${currentPackageObj.name}`);
          unitEl.style.display = '';
        } else {
          unitEl.style.display = 'none';
        }
      }
      if(skuEl) {
        const sizeSuffix = (currentVariant.size && currentVariant.size !== "มาตรฐาน") 
          ? `-${currentVariant.size.replace(' mm', '').replace('.', '')}` 
          : '';
        skuEl.innerText = `รหัสสินค้า ${productData.sku || ''}${sizeSuffix}`;
      }
      if(sizeLabel) sizeLabel.innerText = currentVariant.size;
      if(pkgLabel) pkgLabel.innerText = isTwoTier ? currentPackageObj.name : `${currentPackageObj.name} (${currentPackageObj.weight})`;
      
      if (currentVariant.original_price && currentVariant.original_price > currentVariant.price) {
        const savings = currentVariant.original_price - currentVariant.price;
        const discountPct = Math.round(((currentVariant.original_price - currentVariant.price) / currentVariant.original_price) * 100);
        if(origPriceEl) { 
          origPriceEl.style.display = ''; 
          origPriceEl.innerText = `฿${formatPrice(currentVariant.original_price)}`; 
        }
        if(discountBadgeEl) { 
          discountBadgeEl.style.display = 'flex'; 
          discountBadgeEl.innerHTML = `<span class="inline-block transform scale-y-[1.08] origin-center font-semibold">-${discountPct}%</span>`; 
        }
        if(savingsEl) {
          savingsEl.style.display = '';
          savingsEl.innerText = `Save ฿${formatPrice(savings)}`;
        }
      } else {
        if(origPriceEl) origPriceEl.style.display = 'none';
        if(discountBadgeEl) discountBadgeEl.style.display = 'none';
        if(savingsEl) savingsEl.style.display = 'none';
      }

      if (badgesRow) {
        const hasDiscount = discountBadgeEl && discountBadgeEl.style.display !== 'none';
        const hasNew = badgeEl && badgeEl.style.display !== 'none';
        badgesRow.style.display = (hasDiscount || hasNew) ? 'flex' : 'none';
      }

      renderSizeButtons();
      renderPackageButtons();

      const btnMainAction = document.getElementById('btn-main-action');
      if (btnMainAction) {
        const variantInfo = (selectedSizeName && selectedSizeName !== 'มาตรฐาน') ? ` (ขนาด ${selectedSizeName})` : '';
        const lineMsg = `สนใจสั่งซื้อ/สอบถามสินค้า: ${productData.name}${variantInfo} รหัสสินค้า: ${productData.sku || ''}`;
        btnMainAction.href = `https://line.me/R/oaMessage/@udothai/?${encodeURIComponent(lineMsg)}`;
      }
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

        if (isOutOfStock) {
          return `<button type="button" disabled class="relative min-w-[56px] sm:min-w-[62px] h-[40px] sm:h-[42px] px-3.5 rounded-[2px] bg-[#FAFAFA] border border-gray-200 text-gray-300 font-normal text-[14px] sm:text-[15px] flex items-center justify-center cursor-not-allowed select-none overflow-hidden" title="สินค้าหมด"><svg class="absolute inset-0 w-full h-full text-gray-300 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100"><line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" stroke-width="1.2" /></svg><span class="relative z-10">${sizeStr}</span></button>`;
        }
        if (isSelected) {
          return `<button type="button" class="min-w-[56px] sm:min-w-[62px] h-[40px] sm:h-[42px] px-3.5 rounded-[2px] bg-black border border-black text-white font-normal text-[14px] sm:text-[15px] flex items-center justify-center cursor-default select-none">${sizeStr}</button>`;
        }
        return `<button type="button" onclick="window.selectSize('${sizeStr}')" class="min-w-[56px] sm:min-w-[62px] h-[40px] sm:h-[42px] px-3.5 rounded-[2px] bg-white border border-gray-300 hover:border-black text-[#333] font-normal text-[14px] sm:text-[15px] flex items-center justify-center cursor-pointer transition-colors select-none">${sizeStr}</button>`;
      }).join('');
    };

    const renderPackageButtons = () => {
      const container = document.getElementById('package-buttons');
      const wrapper = document.getElementById('package-section-wrapper');
      
      // Global Standard: If there is only ONE generic package option (like "ตัว", "ชิ้น", "ชุด", "มาตรฐาน"), HIDE the package UI.
      const genericSingleUnits = ["1 ตัว", "ตัว", "1 ชิ้น", "ชิ้น", "ชุด", "มาตรฐาน", "อัน", "คัน", "แผ่น"];
      if (uniquePackages.length === 1 && genericSingleUnits.includes(uniquePackages[0])) {
         if (wrapper) wrapper.style.display = 'none';
      } else {
         if (wrapper) wrapper.style.display = 'block';
      }

      const pkgLabelTop = document.querySelector('#package-section-wrapper span:first-child');
      if (pkgLabelTop) pkgLabelTop.innerText = "บรรจุ:";

      if(!container) return;
      container.innerHTML = uniquePackages.map(pkgStr => {
        if (isTwoTier) {
          // Rule 1: Hide completely if not in DB
          const matchingVariant = productData.variants.find(v => v.size === selectedSizeName && v.package === pkgStr);
          if (!matchingVariant) return '';

          // Rule 2: Gray out if stock <= 0
          const isOutOfStock = matchingVariant.stock <= 0;
          const isSelected = pkgStr === selectedPackageName;

          if (isOutOfStock) {
            return `<button type="button" disabled class="relative min-w-[56px] sm:min-w-[62px] h-[40px] sm:h-[42px] px-3.5 rounded-[2px] bg-[#FAFAFA] border border-gray-200 text-gray-300 font-normal text-[14px] sm:text-[15px] flex items-center justify-center cursor-not-allowed select-none overflow-hidden" title="สินค้าหมด"><svg class="absolute inset-0 w-full h-full text-gray-300 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100"><line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" stroke-width="1.2" /></svg><span class="relative z-10">${pkgStr}</span></button>`;
          }
          if (isSelected) {
            return `<button type="button" class="min-w-[56px] sm:min-w-[62px] h-[40px] sm:h-[42px] px-3.5 rounded-[2px] bg-black border border-black text-white font-normal text-[14px] sm:text-[15px] flex items-center justify-center cursor-default select-none">${pkgStr}</button>`;
          }
          return `<button type="button" onclick="window.selectPackage('${pkgStr}')" class="min-w-[56px] sm:min-w-[62px] h-[40px] sm:h-[42px] px-3.5 rounded-[2px] bg-white border border-gray-300 hover:border-black text-[#333] font-normal text-[14px] sm:text-[15px] flex items-center justify-center cursor-pointer transition-colors select-none">${pkgStr}</button>`;
        } else {
          // Fallback old logic
          const p = productData.packages.find(p => p.name === pkgStr) || {name: pkgStr, weight: ""};
          const isSelected = p.name === selectedPackageName;
          const labelText = p.weight ? `${p.name} (${p.weight})` : p.name;
          if (isSelected) {
            return `<button type="button" class="min-w-[56px] sm:min-w-[62px] h-[40px] sm:h-[42px] px-3.5 rounded-[2px] bg-black border border-black text-white font-normal text-[14px] sm:text-[15px] flex items-center justify-center cursor-default select-none">${labelText}</button>`;
          }
          return `<button type="button" onclick="window.selectPackage('${p.name}')" class="min-w-[56px] sm:min-w-[62px] h-[40px] sm:h-[42px] px-3.5 rounded-[2px] bg-white border border-gray-300 hover:border-black text-[#333] font-normal text-[14px] sm:text-[15px] flex items-center justify-center cursor-pointer transition-colors select-none">${labelText}</button>`;
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
    if (specsContainer) {
      const specs = (productData.specsTable && productData.specsTable.length > 0)
        ? productData.specsTable
        : [
            { key: "แบรนด์", value: productData.brand || "UDO" },
            { key: "รหัสสินค้า", value: productData.sku || productData.id },
            { key: "หมวดหมู่", value: (productData.categories && productData.categories[0]?.name) || "ทั่วไป" },
            { key: "สถานะสต็อก", value: (productData.availability === 'in_stock' || productData.flags?.is_in_stock) ? "มีสินค้าพร้อมส่ง" : "ติดต่อสอบถาม" }
          ];
      specsContainer.innerHTML = specs.map((row, index) => {
        const roundedClass = index === 0 ? "rounded-t-sm" : index === specs.length - 1 ? "rounded-b-sm" : "";
        const bgClass = index % 2 === 0 ? "bg-white" : "bg-[#F5F5F5]";
        return `<div class="flex ${bgClass} py-2 px-6 ${roundedClass}"><div class="w-[40%] md:w-[30%]">${row.key}</div><div class="w-[60%] md:w-[70%]">${row.value}</div></div>`;
      }).join('');
    }

    // Qty
    // Favorite / Wishlist Toggle (Changes ONLY the heart icon, frame remains unchanged)
    window.toggleFavorite = () => {
      const heartBtn = document.getElementById('btn-product-heart');
      if (!heartBtn) return;
      const svg = heartBtn.querySelector('svg');
      const isFilled = heartBtn.getAttribute('data-favorited') === 'true';
      if (isFilled) {
        heartBtn.setAttribute('data-favorited', 'false');
        if (svg) {
          svg.setAttribute('fill', 'none');
          svg.setAttribute('stroke', 'currentColor');
          svg.classList.remove('text-[#E7151A]');
          svg.classList.add('text-[#252525]');
        }
      } else {
        heartBtn.setAttribute('data-favorited', 'true');
        if (svg) {
          svg.setAttribute('fill', '#E7151A');
          svg.setAttribute('stroke', '#E7151A');
          svg.classList.remove('text-[#252525]');
          svg.classList.add('text-[#E7151A]');
        }
      }
    };

    window.selectThumbnail = (index) => {
      if (!window.productImagesList || window.productImagesList.length === 0) return;
      if (index < 0) index = window.productImagesList.length - 1;
      if (index >= window.productImagesList.length) index = 0;

      window.selectedImageIndex = index;
      const mainImg = document.getElementById('product-image');
      if (mainImg && window.productImagesList[index]) {
        mainImg.src = window.productImagesList[index].large;
      }
      const container = document.getElementById('product-thumbnails-container');
      if (container) {
        const thumbs = container.querySelectorAll('[data-index]');
        thumbs.forEach((thumb, i) => {
          if (i === index) {
            thumb.className = "w-[70px] h-[86px] sm:w-[76px] sm:h-[92px] bg-white rounded-[2px] overflow-hidden cursor-pointer border border-black flex items-center justify-center p-1 shrink-0 transition-all select-none";
            thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
          } else {
            thumb.className = "w-[70px] h-[86px] sm:w-[76px] sm:h-[92px] bg-white rounded-[2px] overflow-hidden cursor-pointer border border-transparent flex items-center justify-center p-1 shrink-0 transition-all select-none opacity-80 hover:opacity-100";
          }
        });
      }
    };

    window.navigateImage = (direction) => {
      const current = window.selectedImageIndex || 0;
      window.selectThumbnail(current + direction);
    };

    window.scrollThumbnails = (direction) => {
      const container = document.getElementById('product-thumbnails-container');
      if (container) {
        container.scrollBy({
          top: direction * 106,
          left: direction * 106,
          behavior: 'smooth'
        });
      }
    };

    // Image Fullscreen Lightbox Modal (Loads high-resolution 'original' image)
    const mainImgEl = document.getElementById('product-image');
    if (mainImgEl) {
      mainImgEl.style.cursor = 'zoom-in';
      mainImgEl.title = 'คลิกเพื่อดูรูปขนาดใหญ่';
      mainImgEl.onclick = () => {
        let modal = document.getElementById('image-lightbox-modal');
        const currentIdx = window.selectedImageIndex || 0;
        const currentOriginal = (window.productImagesList && window.productImagesList[currentIdx])
          ? window.productImagesList[currentIdx].original
          : mainImgEl.src;

        if (!modal) {
          modal = document.createElement('div');
          modal.id = 'image-lightbox-modal';
          modal.className = 'fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out';
          modal.innerHTML = `
            <button id="close-lightbox" class="absolute top-6 right-6 text-white/80 hover:text-white p-2 z-10 cursor-pointer">
              <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img id="lightbox-img" src="${currentOriginal}" class="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl">
          `;
          modal.onclick = (e) => {
            if (e.target.id === 'image-lightbox-modal' || e.target.closest('#close-lightbox')) {
              modal.style.display = 'none';
            }
          };
          document.body.appendChild(modal);
        } else {
          const lbImg = document.getElementById('lightbox-img');
          if (lbImg) lbImg.src = currentOriginal;
          modal.style.display = 'flex';
        }
      };
    }


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

    const isDoc = productData.richContent?.isDocument === true;
    const imgWrapperWidthClass = 'max-w-[1040px]';
    const storyBlocksContainer = document.getElementById('rich-story-blocks-container');

    const hasModularBlocks = Array.isArray(productData.richContent?.blocks) && 
      productData.richContent.blocks.some(b => b && (b.headline || b.subheadline || b.paragraph || b.image));

    if (hasModularBlocks && storyBlocksContainer) {
      // Hide legacy elements
      toggleNode('rich-headline', false, () => {});
      const textBlockParent = document.getElementById('rich-subheadline')?.parentElement;
      if (textBlockParent) textBlockParent.style.display = 'none';
      toggleNode('rich-img-1', false, () => {});
      toggleNode('rich-img-2', false, () => {});
      toggleNode('rich-img-3', false, () => {});

      // Render modular story blocks (Apple / Nintendo style)
      const validBlocks = productData.richContent.blocks.filter(b => b && (b.headline || b.subheadline || b.paragraph || b.image));
      storyBlocksContainer.innerHTML = validBlocks.map((b, i) => {
        const hasText = Boolean(b.headline || b.subheadline || b.paragraph);
        const hasImg = Boolean(b.image);

        return `
          <div class="story-block mb-12 sm:mb-16">
            ${hasText ? `
              <div class="w-full ${imgWrapperWidthClass} mx-auto text-center px-4 sm:px-0 mb-8">
                ${b.headline ? `
                  <h3 class="text-[24px] sm:text-[26px] font-semibold text-[#252525] mb-6 sm:mb-8">
                    ${b.headline.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
                  </h3>
                ` : ''}
                ${b.subheadline ? `
                  <h4 class="text-[19px] sm:text-[20px] font-semibold text-[#252525] mb-2 sm:mb-2.5">
                    ${b.subheadline.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
                  </h4>
                ` : ''}
                ${b.paragraph ? `
                  <p class="text-[16px] text-[#252525] leading-relaxed whitespace-pre-line w-full mx-auto">
                    ${b.paragraph.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
                  </p>
                ` : ''}
              </div>
            ` : ''}

            ${hasImg ? `
              <div class="w-full ${imgWrapperWidthClass} mx-auto px-2 sm:px-0 flex justify-center mb-8">
                <img 
                  src="${b.image.replace(/"/g, '&quot;')}" 
                  alt="Showcase detail ${i + 1}" 
                  class="max-w-full h-auto object-contain rounded-xl mx-auto"
                  loading="lazy"
                >
              </div>
            ` : ''}
          </div>
        `;
      }).join('');

      storyBlocksContainer.classList.remove('hidden');
      storyBlocksContainer.style.display = 'block';
    } else {
      if (storyBlocksContainer) {
        storyBlocksContainer.classList.add('hidden');
        storyBlocksContainer.style.display = 'none';
      }

      // Fallback Logic: ถ้าไม่มีข้อมูลเฉพาะ ให้เอาชื่อและรายละเอียดหลักมาวนซ้ำ
      const finalHeadline = productData.richContent?.headline || productData.name || '';
      const finalDesc = productData.richContent?.description || productData.description || '';

      toggleNode('rich-headline', finalHeadline, (el) => el.innerText = finalHeadline);

      const setRichImg = (id, src) => {
        toggleNode(id, src, (el) => {
          el.src = src;
          const parent = el.parentElement;
          if (parent) {
            parent.classList.remove('max-w-[800px]', 'max-w-[760px]', 'max-w-[1040px]');
            parent.classList.add(imgWrapperWidthClass);
          }
        });
      };

      setRichImg('rich-img-1', productData.richContent?.image1);
      setRichImg('rich-img-2', productData.richContent?.image2);
      
      // สำหรับ text block ที่อยู่รวมกันใน div เดียว (subheadline + desc)
      const rawSubheadline = productData.richContent?.subheadline;
      const isGenericSubheadline = !rawSubheadline || rawSubheadline.startsWith('ผลิตภัณฑ์คุณภาพสูง แบรนด์') || rawSubheadline.startsWith('แบรนด์ ');
      const validSubheadline = isGenericSubheadline ? null : rawSubheadline;

      const textBlockParent = document.getElementById('rich-subheadline')?.parentElement;
      if (textBlockParent) {
         if (validSubheadline || finalDesc) {
             textBlockParent.style.display = '';
             const elSub = document.getElementById('rich-subheadline');
             if(elSub) {
               if(validSubheadline) { 
                 elSub.innerText = validSubheadline; 
                 elSub.classList.remove('hidden');
                 elSub.style.display = ''; 
               } else { 
                 elSub.classList.add('hidden');
                 elSub.style.display = 'none'; 
               }
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

      setRichImg('rich-img-3', productData.richContent?.image3);
    }

    // Engineering Tables Rendering (Chemical %, Mechanical Properties, Current Range)
    const engTablesContainer = document.getElementById('rich-engineering-tables');
    if (engTablesContainer) {
      if (productData.richContent && productData.richContent.tablesHtml) {
        engTablesContainer.innerHTML = productData.richContent.tablesHtml.replaceAll('shadow-sm', '');
        engTablesContainer.style.display = 'block';
      } else {
        engTablesContainer.innerHTML = '';
        engTablesContainer.style.display = 'none';
      }
    }


    updateDisplay();

    // Hide read-more button entirely if content is short
    if (typeof window !== 'undefined' && window.checkRichContentOverflow) {
      setTimeout(window.checkRichContentOverflow, 150);
    }
    // --- Similar Products Matching (Alternative Products in Same Subcategory) ---
    const relatedTrack = document.getElementById('related-products-track');
    const viewAllLink = document.getElementById('related-view-all');
    if (relatedTrack && productData) {
      const currentCats = productData.categories || [];
      const deepCategory = currentCats.length > 0 ? currentCats[currentCats.length - 1] : null;
      const rootCategory = currentCats.length > 0 ? currentCats[0] : null;

      if (viewAllLink && deepCategory) {
        viewAllLink.href = `/category.html?cat=${deepCategory.url_slug}`;
      } else if (viewAllLink && rootCategory) {
        viewAllLink.href = `/category.html?cat=${rootCategory.url_slug}`;
      }

      let related = [];

      // Priority 1: Match by deepest subcategory (Same leaf type)
      if (deepCategory) {
        related = mockDatabase.filter(p => 
          p.id !== productData.id && 
          p.categories && 
          p.categories.some(c => c.url_slug === deepCategory.url_slug || c.name === deepCategory.name)
        );
      }

      // Priority 2: Backfill from root category if fewer than 10
      if (related.length < 10 && rootCategory) {
        const rootRelated = mockDatabase.filter(p => 
          p.id !== productData.id && 
          !related.some(r => r.id === p.id) &&
          p.categories && 
          p.categories.some(c => c.url_slug === rootCategory.url_slug || c.name === rootCategory.name)
        );
        related = [...related, ...rootRelated];
      }

      // Priority 3: Fallback from database if still under 10
      if (related.length < 10) {
        const extras = mockDatabase.filter(p => 
          p.id !== productData.id && 
          !related.some(r => r.id === p.id)
        );
        related = [...related, ...extras];
      }

      // Take 12 items for smooth carousel
      related = related.slice(0, 12);
      relatedTrack.innerHTML = related.map(p => generateCardHTML(p, false)).join('');

      // Wire up slider navigation buttons
      const sliderWrapper = relatedTrack.closest('.group\\/pslider');
      if (sliderWrapper) {
        const btnPrev = sliderWrapper.querySelector('.pslider-prev');
        const btnNext = sliderWrapper.querySelector('.pslider-next');
        if (btnPrev && btnNext) {
          const updateUI = () => {
            if (relatedTrack.scrollLeft <= 0) {
              btnPrev.classList.add('opacity-0', 'pointer-events-none');
            } else {
              btnPrev.classList.remove('opacity-0', 'pointer-events-none');
            }
            if (Math.ceil(relatedTrack.scrollLeft + relatedTrack.clientWidth) >= relatedTrack.scrollWidth - 5) {
              btnNext.classList.add('opacity-0', 'pointer-events-none');
            } else {
              btnNext.classList.remove('opacity-0', 'pointer-events-none');
            }
          };

          btnPrev.onclick = (e) => {
            e.preventDefault();
            relatedTrack.scrollBy({ left: -(relatedTrack.clientWidth * 0.8), behavior: 'smooth' });
          };
          btnNext.onclick = (e) => {
            e.preventDefault();
            relatedTrack.scrollBy({ left: relatedTrack.clientWidth * 0.8, behavior: 'smooth' });
          };
          relatedTrack.onscroll = () => requestAnimationFrame(updateUI);
          setTimeout(updateUI, 150);
        }
      }
    }

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

// Re-hydrate dynamically if live catalog updates arrive
if (typeof window !== 'undefined') {
  window.addEventListener('udo:catalog_updated', (e) => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    const freshDb = e.detail?.products || mockDatabase;
    const freshProduct = productId ? freshDb.find(p => p.id === productId) : freshDb[0];
    if (freshProduct) {
      hydrateProduct(freshProduct);
    }
  });
}

