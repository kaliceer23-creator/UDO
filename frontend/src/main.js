import './style.css'



// Script สำหรับทำ Fade Effect ให้กับช่องค้นหา
const searchPlaceholders = [
  "อุปกรณ์เสริม",
  "ตู้เชื่อม MIG / TIG",
  "ลวดเชื่อมสเตนเลส",
  "หน้ากากเชื่อมปรับแสงอัตโนมัติ",
  "ชุดตัดแก๊ส / พลาสม่า",
  "ใบตัดเหล็ก ใบเจียร",
  "อะไหล่ปืนเชื่อมต่างๆ",
  "ถุงมือหนังงานเชื่อม"
];

const searchInput = document.getElementById('searchInput');
const animatedPlaceholder = document.getElementById('animatedPlaceholder');

if (searchInput && animatedPlaceholder) {
  let wordIndex = 0;
  
  // Set initial word
  animatedPlaceholder.textContent = searchPlaceholders[0];

  // ตั้งเวลาสลับข้อความแบบทันที (ไม่เฟด) โดยค้างไว้ 4.5 วินาที
  setInterval(() => {
    wordIndex = (wordIndex + 1) % searchPlaceholders.length;
    animatedPlaceholder.textContent = searchPlaceholders[wordIndex];
  }, 4500);

  // จัดการ Placeholder เมื่อคลิกค้นหา
  searchInput.addEventListener('focus', () => {
    animatedPlaceholder.style.opacity = '0';
    searchInput.setAttribute('placeholder', 'ถาม UDO AI');
  });

  searchInput.addEventListener('blur', () => {
    if (searchInput.value.trim().length === 0) {
      animatedPlaceholder.style.opacity = '1';
      searchInput.setAttribute('placeholder', '');
    }
  });

  searchInput.addEventListener('input', () => {
    if (searchInput.value.trim().length > 0) {
      animatedPlaceholder.style.opacity = '0';
    }
  });
}


// --- Hero Slider Logic (Fade Transition) ---
const slider = document.getElementById('heroSlider');
if (slider) {
  const slides = slider.children;
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  const indicatorsContainer = document.getElementById('sliderIndicators');
  
  let currentSlide = 0;
  const totalSlides = slides.length;
  let slideInterval;

  // Create Indicators (จุดและขีด)
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    // ขีด (active) จะยาว, จุด (inactive) จะสั้น
    dot.className = 'h-1.5 rounded-full cursor-pointer transition-all duration-300 shadow-sm ' + 
                    (i === 0 ? 'w-5 bg-white' : 'w-1.5 bg-white/50 hover:bg-white');
    dot.dataset.index = i;
    dot.addEventListener('click', () => {
      currentSlide = i;
      updateSlider();
      resetInterval();
    });
    indicatorsContainer.appendChild(dot);
  }
  const indicators = indicatorsContainer.children;

  function updateSlider() {
    // 1. อัปเดตการแสดงผลของรูป (Fade In/Out)
    Array.from(slides).forEach((slide, index) => {
      if (index === currentSlide) {
        slide.classList.remove('opacity-0', 'z-0');
        slide.classList.add('opacity-100', 'z-10');
      } else {
        slide.classList.remove('opacity-100', 'z-10');
        slide.classList.add('opacity-0', 'z-0');
      }
    });

    // 2. อัปเดตสถานะของจุดและขีด (Indicators UI)
    Array.from(indicators).forEach((dot, index) => {
      if (index === currentSlide) {
        dot.className = 'h-1.5 rounded-full cursor-pointer transition-all duration-300 w-5 bg-white shadow-sm';
      } else {
        dot.className = 'h-1.5 rounded-full cursor-pointer transition-all duration-300 w-1.5 bg-white/50 hover:bg-white shadow-sm';
      }
    });
  }

  function nextSlideFn() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
  }

  function prevSlideFn() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
  }

  nextBtn.addEventListener('click', () => {
    nextSlideFn();
    resetInterval();
  });

  prevBtn.addEventListener('click', () => {
    prevSlideFn();
    resetInterval();
  });

  function startInterval() {
    // ค้างไว้นานๆ 10 วินาที เพื่อให้คนซึมซับภาพและข้อความ
    slideInterval = setInterval(nextSlideFn, 10000);
  }

  function resetInterval() {
    clearInterval(slideInterval);
    startInterval();
  }

  // Initialize
  startInterval();
}

// --- Cart Control Logic (Instacart Style) ---
document.querySelectorAll('.cart-control').forEach(control => {
  const btnAdd = control.querySelector('.btn-add');
  const expanded = control.querySelector('.control-expanded');
  const btnMinus = control.querySelector('.btn-minus');
  const btnPlus = control.querySelector('.btn-plus');
  const qtyText = control.querySelector('.qty-text');
  
  let qty = 0;
  
  // click + initial
  btnAdd.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent navigating to product detail
    e.stopPropagation();
    
    qty = 1;
    qtyText.textContent = qty;
    
    btnAdd.classList.add('hidden');
    expanded.classList.remove('hidden');
  });

  // click + (increment)
  btnPlus.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    qty++;
    qtyText.textContent = qty;
  });

  // click - (decrement/trash)
  btnMinus.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    qty--;
    if (qty <= 0) {
      qty = 0;
      expanded.classList.add('hidden');
      btnAdd.classList.remove('hidden');
    } else {
      qtyText.textContent = qty;
    }
  });
});

// --- Unit Toggle Logic ---
document.querySelectorAll('.unit-toggle').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Remove active state from siblings
    const parent = btn.parentElement;
    parent.querySelectorAll('.unit-toggle').forEach(sibling => {
      sibling.classList.remove('active', 'bg-white', 'shadow-sm', 'text-gray-900');
      sibling.classList.add('text-gray-900');
    });

    // Add active state to clicked button
    btn.classList.add('active', 'bg-white', 'shadow-sm', 'text-gray-900');
    btn.classList.remove('text-gray-900');

    // Update Price and Unit Display
    const cardContent = btn.closest('.flex-col'); // get the wrapper
    const priceDisplay = cardContent.querySelector('.price-display');
    const priceUnit = cardContent.querySelector('.price-unit');
    const cartControl = cardContent.querySelector('.cart-control');
    const expandedUnitText = cartControl.querySelector('.unit-text');

    const newPrice = btn.dataset.price;
    const newUnit = btn.dataset.unit;

    priceDisplay.textContent = '฿' + newPrice;
    priceUnit.textContent = '/' + newUnit;
    
    // Update cart control dataset and display
    cartControl.dataset.unit = newUnit;
    if (expandedUnitText) {
      expandedUnitText.textContent = newUnit;
    }
  });
});

// --- Brand Slider Auto-Scroll Logic ---
const brandSection = document.getElementById('brandSliderSection');
if (brandSection) {
  const track = brandSection.querySelector('.brand-track');
  const dotsContainer = brandSection.querySelector('.brand-dots');
  const btnPrev = brandSection.querySelector('.brand-prev');
  const btnNext = brandSection.querySelector('.brand-next');
  
  if (track) {
    let scrollInterval;
    let isHovered = false;

    const updateBrandUI = () => {
      // Calculate how many pages we have
      const itemWidth = track.firstElementChild ? track.firstElementChild.clientWidth + 16 : 0; // +16 for gap
      if (itemWidth === 0) return;
      
      // Calculate how many items are visible at once
      const visibleItems = Math.round(track.clientWidth / itemWidth) || 1;
      const totalItems = track.children.length;
      
      // Total pages = total slides minus the ones that fit in the last view
      const totalPages = totalItems - visibleItems + 1;
      
      let currentPage = Math.round(track.scrollLeft / itemWidth);
      if (currentPage >= totalPages) currentPage = totalPages - 1;
      if (currentPage < 0) currentPage = 0;

      // Update Dots
      if (dotsContainer) {
        if (dotsContainer.children.length !== totalPages && totalPages > 1) {
          dotsContainer.innerHTML = '';
          for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('div');
            dot.className = `w-2 h-2 rounded-full transition-colors duration-300 ${i === currentPage ? 'bg-gray-800' : 'bg-gray-300'}`;
            
            // Allow clicking dots to scroll
            dot.addEventListener('click', () => {
               track.scrollTo({ left: i * itemWidth, behavior: 'smooth' });
            });
            
            dotsContainer.appendChild(dot);
          }
        } else if (totalPages > 1) {
          Array.from(dotsContainer.children).forEach((dot, idx) => {
            dot.className = `w-2 h-2 rounded-full transition-colors duration-300 ${idx === currentPage ? 'bg-gray-800' : 'bg-gray-300'}`;
          });
        } else {
          dotsContainer.innerHTML = '';
        }
      }
    };

    const startAutoScroll = () => {
      stopAutoScroll();
      scrollInterval = setInterval(() => {
        if (!isHovered) {
          const itemWidth = track.firstElementChild ? track.firstElementChild.clientWidth + 16 : 0;
          if (itemWidth === 0) return;
          
          const maxScroll = track.scrollWidth - track.clientWidth;
          
          // If we are at the end, loop back to start
          if (track.scrollLeft >= maxScroll - 5) {
            track.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            // Scroll to next item
            track.scrollBy({ left: itemWidth, behavior: 'smooth' });
          }
        }
      }, 3000); // 3 seconds per scroll
    };

    const stopAutoScroll = () => {
      clearInterval(scrollInterval);
    };

    track.addEventListener('mouseenter', () => isHovered = true);
    track.addEventListener('mouseleave', () => isHovered = false);

    track.addEventListener('scroll', () => {
      requestAnimationFrame(updateBrandUI);
    });


    if (btnPrev && btnNext) {
      btnPrev.addEventListener('click', (e) => {
        e.preventDefault();
        const itemWidth = track.firstElementChild ? track.firstElementChild.clientWidth + 16 : 0;
        track.scrollBy({ left: -itemWidth, behavior: 'smooth' });
        // Reset auto scroll timer on manual click
        startAutoScroll();
      });

      btnNext.addEventListener('click', (e) => {
        e.preventDefault();
        const itemWidth = track.firstElementChild ? track.firstElementChild.clientWidth + 16 : 0;
        const maxScroll = track.scrollWidth - track.clientWidth;
        
        // Loop back manually if at end
        if (track.scrollLeft >= maxScroll - 5) {
          track.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          track.scrollBy({ left: itemWidth, behavior: 'smooth' });
        }
        
        // Reset auto scroll timer on manual click
        startAutoScroll();
      });
    }

    startAutoScroll();
    setTimeout(updateBrandUI, 100);
    window.addEventListener('resize', () => setTimeout(updateBrandUI, 100));
  }
}

const productSliders = document.querySelectorAll('.group\\/pslider');
productSliders.forEach(sliderWrapper => {
  const track = sliderWrapper.querySelector('.pslider-track');
  const btnPrev = sliderWrapper.querySelector('.pslider-prev');
  const btnNext = sliderWrapper.querySelector('.pslider-next');
  const dotsContainer = sliderWrapper.querySelector('.pslider-dots');
  
  if (!track || !btnPrev || !btnNext) return;

  const updateUI = () => {
    // Button visibility
    if (track.scrollLeft <= 0) {
      btnPrev.classList.add('opacity-0', 'pointer-events-none');
    } else {
      btnPrev.classList.remove('opacity-0', 'pointer-events-none');
    }

    if (Math.ceil(track.scrollLeft + track.clientWidth) >= track.scrollWidth) {
      btnNext.classList.add('opacity-0', 'pointer-events-none');
    } else {
      btnNext.classList.remove('opacity-0', 'pointer-events-none');
    }

    // Dots calculation
    if (dotsContainer) {
      // Calculate how many pages we have
      const totalPages = Math.ceil(track.scrollWidth / track.clientWidth);
      const currentPage = Math.round(track.scrollLeft / track.clientWidth);
      
      // Generate dots if not created yet or if screen size changed
      if (dotsContainer.children.length !== totalPages && totalPages > 1) {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalPages; i++) {
          const dot = document.createElement('div');
          dot.className = `w-2 h-2 rounded-full transition-colors duration-300 ${i === currentPage ? 'bg-gray-800' : 'bg-gray-300'}`;
          dotsContainer.appendChild(dot);
        }
      } else if (totalPages > 1) {
        // Update active dot
        Array.from(dotsContainer.children).forEach((dot, idx) => {
          dot.className = `w-2 h-2 rounded-full transition-colors duration-300 ${idx === currentPage ? 'bg-gray-800' : 'bg-gray-300'}`;
        });
      } else {
        dotsContainer.innerHTML = ''; // No dots needed if no scroll
      }
    }
  };

  btnPrev.addEventListener('click', (e) => {
    e.preventDefault();
    track.scrollBy({ left: -(track.clientWidth * 0.8), behavior: 'smooth' });
  });

  btnNext.addEventListener('click', (e) => {
    e.preventDefault();
    track.scrollBy({ left: track.clientWidth * 0.8, behavior: 'smooth' });
  });

  track.addEventListener('scroll', () => {
    // Throttle UI update for performance
    requestAnimationFrame(updateUI);
  });

  // Initial Check
  setTimeout(updateUI, 100);
  window.addEventListener('resize', () => {
    setTimeout(updateUI, 100);
  });
});






// --- Mega Menu Click Logic ---
// --- Mega Menu Click Logic ---

  const menuBtn = document.getElementById('category-menu-btn');
  const menuArrow = document.getElementById('category-menu-arrow');
  const megaMenu = document.getElementById('desktop-mega-menu');
  const overlay = document.getElementById('mega-menu-overlay');

  const closeMenu = () => {
    megaMenu.classList.add('hidden');
    megaMenu.classList.remove('flex');
    if (menuArrow) menuArrow.classList.remove('rotate-180');
    if (overlay) overlay.classList.add('hidden');
  };

  const openMenu = () => {
    megaMenu.classList.remove('hidden');
    megaMenu.classList.add('flex');
    if (menuArrow) menuArrow.classList.add('rotate-180');
    if (overlay) overlay.classList.remove('hidden');
  };

  if (menuBtn && megaMenu) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = megaMenu.classList.contains('hidden');
      if (isHidden) {
        openMenu();
      } else {
        closeMenu();
      }
    });

    if (overlay) {
      overlay.addEventListener('click', closeMenu);
    }

    document.addEventListener('click', (e) => {
      if (!menuBtn.contains(e.target) && !megaMenu.contains(e.target) && !megaMenu.classList.contains('hidden')) {
        closeMenu();
      }
    });
  }

  // --- Fluid Framer-like Mobile Dock AI Search Logic ---
  const dockAiBtn = document.getElementById('dock-ai-btn');
  const dockDefaultState = document.getElementById('dock-default-state');
  const dockInputState = document.getElementById('dock-input-state');
  const dockAiInput = document.getElementById('dock-ai-input');
  const dockCancelBtn = document.getElementById('dock-cancel-btn');
  const mobileBottomDock = document.getElementById('mobile-bottom-dock');
  const dockSendBtn = document.getElementById('dock-send-btn');
  const dockMicBtn = document.getElementById('dock-mic-btn');

  if (dockAiBtn && dockDefaultState && dockInputState && dockCancelBtn && mobileBottomDock) {
    
    // Shadow classes
    const defaultShadow = ['shadow-[0_8px_32px_rgba(0,0,0,0.12),0_1px_3px_rgba(0,0,0,0.05)]', 'hover:shadow-[0_12px_40px_rgba(225,36,39,0.25)]'];
    const activeRedShadow = ['shadow-[0_0px_40px_rgba(225,36,39,0.35)]', 'hover:shadow-[0_0px_50px_rgba(225,36,39,0.45)]', 'border-white/50'];
    const defaultBorder = ['border-white/50'];

    const openAiSearch = (e) => {
      if(e) e.preventDefault();
      
      mobileBottomDock.classList.remove('w-[350px]', 'md:w-[380px]', ...defaultShadow, ...defaultBorder);
      mobileBottomDock.classList.add('!max-w-[95vw]', 'md:!max-w-[600px]', '!w-[95vw]', 'md:!w-[600px]', ...activeRedShadow);
      
      dockDefaultState.classList.remove('opacity-100', 'translate-x-0');
      dockDefaultState.classList.add('opacity-0', '-translate-x-8', 'pointer-events-none');
      
      dockInputState.classList.remove('opacity-0', 'translate-x-12', 'pointer-events-none');
      dockInputState.classList.add('opacity-100', 'translate-x-0', 'pointer-events-auto');
      
      setTimeout(() => dockAiInput.focus(), 150);
    };

    const closeAiSearch = (e) => {
      if(e) e.preventDefault();
      
      mobileBottomDock.classList.remove('!max-w-[95vw]', 'md:!max-w-[600px]', '!w-[95vw]', 'md:!w-[600px]', ...activeRedShadow);
      mobileBottomDock.classList.add('w-[350px]', 'md:w-[380px]', ...defaultShadow, ...defaultBorder);
      
      dockInputState.classList.remove('opacity-100', 'translate-x-0', 'pointer-events-auto');
      dockInputState.classList.add('opacity-0', 'translate-x-12', 'pointer-events-none');
      
      dockDefaultState.classList.remove('opacity-0', '-translate-x-8', 'pointer-events-none');
      dockDefaultState.classList.add('opacity-100', 'translate-x-0');
      
      dockAiInput.value = ''; 
      
      if (dockSendBtn && dockMicBtn) {
        dockMicBtn.classList.remove('opacity-0', 'scale-75', 'pointer-events-none');
        dockMicBtn.classList.add('opacity-100', 'scale-100', 'pointer-events-auto');
        
        dockSendBtn.classList.add('opacity-0', 'scale-75', 'pointer-events-none');
        dockSendBtn.classList.remove('opacity-100', 'scale-100', 'pointer-events-auto');
      }
    };

    dockAiBtn.addEventListener('click', openAiSearch);
    dockCancelBtn.addEventListener('click', closeAiSearch);

    // Cross-fade Mic and Send button based on input
    if (dockAiInput && dockSendBtn && dockMicBtn) {
      dockAiInput.addEventListener('input', (e) => {
        if (e.target.value.trim().length > 0) {
          dockMicBtn.classList.remove('opacity-100', 'scale-100', 'pointer-events-auto');
          dockMicBtn.classList.add('opacity-0', 'scale-75', 'pointer-events-none');
          
          dockSendBtn.classList.remove('opacity-0', 'scale-75', 'pointer-events-none');
          dockSendBtn.classList.add('opacity-100', 'scale-100', 'pointer-events-auto');
        } else {
          dockMicBtn.classList.remove('opacity-0', 'scale-75', 'pointer-events-none');
          dockMicBtn.classList.add('opacity-100', 'scale-100', 'pointer-events-auto');
          
          dockSendBtn.classList.add('opacity-0', 'scale-75', 'pointer-events-none');
          dockSendBtn.classList.remove('opacity-100', 'scale-100', 'pointer-events-auto');
        }
      });
    }
  }




import { ProductCard } from './components/ProductCard.js';
import { sampleProducts } from './demo_data.js';

// ---- Data Injection: Product Cards ----
const similarGrid = document.getElementById('similar-products-grid');
if (similarGrid) {
  // จำลองการรับข้อมูล JSON มา 5 ชิ้น แล้วสร้างการ์ดใส่ Grid ทันที
  similarGrid.innerHTML = sampleProducts.map(product => ProductCard(product)).join('');
}
