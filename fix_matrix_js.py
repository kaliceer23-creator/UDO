import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# 1. Update HTML buttons to have classes and data attributes
# Size buttons
size_block_old = """<div class="flex flex-wrap items-center gap-3">
                <button class="px-4 py-1.5 rounded-[4px] bg-white border border-gray-300 text-[#252525] font-medium text-[14px] hover:border-[#76b83f] transition-colors">2.0 mm</button>
                <button class="px-4 py-1.5 rounded-[4px] bg-[#76b83f] border border-[#76b83f] text-white font-medium text-[14px] shadow-sm transition-colors">2.6 mm</button>
                <button class="px-4 py-1.5 rounded-[4px] bg-white border border-gray-300 text-[#252525] font-medium text-[14px] hover:border-[#76b83f] transition-colors">3.2 mm</button>
                <button class="px-4 py-1.5 rounded-[4px] bg-white border border-gray-300 text-[#252525] font-medium text-[14px] hover:border-[#76b83f] transition-colors">4.0 mm</button>
              </div>"""

size_block_new = """<div class="flex flex-wrap items-center gap-3">
                <button data-size="2.0" class="size-btn px-4 py-1.5 rounded-[4px] bg-white border border-gray-300 text-[#252525] font-medium text-[14px] hover:border-[#76b83f] transition-colors">2.0 mm</button>
                <button data-size="2.6" class="size-btn px-4 py-1.5 rounded-[4px] bg-[#76b83f] border border-[#76b83f] text-white font-medium text-[14px] shadow-sm transition-colors">2.6 mm</button>
                <button data-size="3.2" class="size-btn px-4 py-1.5 rounded-[4px] bg-white border border-gray-300 text-[#252525] font-medium text-[14px] hover:border-[#76b83f] transition-colors">3.2 mm</button>
                <button data-size="4.0" class="size-btn px-4 py-1.5 rounded-[4px] bg-white border border-gray-300 text-[#252525] font-medium text-[14px] hover:border-[#76b83f] transition-colors">4.0 mm</button>
              </div>"""
content = content.replace(size_block_old, size_block_new)

# Packaging buttons
pkg_block_old = """<div class="flex flex-wrap items-center gap-3">
                <button id="btn-unit-pack" data-price="330" data-original="450" class="unit-btn px-4 py-1.5 rounded-[4px] bg-[#76b83f] border border-[#76b83f] text-white font-medium text-[14px] shadow-sm transition-colors">ห่อละ 1 กก.</button>
                <button id="btn-unit-box" data-price="1,600" data-original="2,200" class="unit-btn px-4 py-1.5 rounded-[4px] bg-white border border-gray-300 text-[#252525] font-medium text-[14px] hover:border-[#76b83f] transition-colors">ห่อละ 5 กก.</button>
              </div>"""

pkg_block_new = """<div class="flex flex-wrap items-center gap-3">
                <button data-pkg="1" class="pkg-btn px-4 py-1.5 rounded-[4px] bg-[#76b83f] border border-[#76b83f] text-white font-medium text-[14px] shadow-sm transition-colors">ห่อละ 1 กก.</button>
                <button data-pkg="5" class="pkg-btn px-4 py-1.5 rounded-[4px] bg-white border border-gray-300 text-[#252525] font-medium text-[14px] hover:border-[#76b83f] transition-colors">ห่อละ 5 กก.</button>
              </div>"""
content = content.replace(pkg_block_old, pkg_block_new)


# 2. Replace the old JS logic with new Matrix Logic
# Find where JS logic starts
js_start = '// --- Interactive Logic ---'
js_idx = content.find(js_start)

if js_idx != -1:
    content = content[:js_idx] # Keep everything before JS

new_js = """// --- Interactive Logic ---
const priceDisplay = document.getElementById('price-display');
const originalPriceDisplay = document.getElementById('original-price-display');

// Pricing Matrix from the real product data
const productData = {
  '2.0': { '1': null, '5': '1,960' },
  '2.6': { '1': '330', '5': '1,600' },
  '3.2': { '1': '325', '5': '1,575' },
  '4.0': { '1': null, '5': '1,620' }
};

let currentSize = '2.6';
let currentPkg = '1';

const sizeBtns = document.querySelectorAll('.size-btn');
const pkgBtns = document.querySelectorAll('.pkg-btn');
const sizeLabel = document.querySelector('span.font-bold.text-\\[\\#252525\\]'); // To update the text "2.6 mm"

const activeClasses = ['bg-[#76b83f]', 'border-[#76b83f]', 'text-white', 'shadow-sm'];
const inactiveClasses = ['bg-white', 'border-gray-300', 'text-[#252525]', 'hover:border-[#76b83f]'];
const disabledClasses = ['opacity-40', 'cursor-not-allowed', 'hover:border-gray-300'];

function updateUI() {
  // Update Size Buttons
  sizeBtns.forEach(btn => {
    const size = btn.getAttribute('data-size');
    btn.classList.remove(...activeClasses, ...inactiveClasses);
    if (size === currentSize) {
      btn.classList.add(...activeClasses);
    } else {
      btn.classList.add(...inactiveClasses);
    }
  });

  // Update Packaging Buttons
  pkgBtns.forEach(btn => {
    const pkg = btn.getAttribute('data-pkg');
    const priceExists = productData[currentSize][pkg] !== null;
    
    btn.classList.remove(...activeClasses, ...inactiveClasses, ...disabledClasses);
    
    if (!priceExists) {
      // Disabled state
      btn.classList.add('bg-white', 'border-gray-200', 'text-gray-400', 'opacity-40', 'cursor-not-allowed');
      // If the currently selected package becomes invalid, switch to a valid one
      if (pkg === currentPkg) {
        currentPkg = pkg === '1' ? '5' : '1';
        setTimeout(updateUI, 0); // Re-trigger update
      }
    } else if (pkg === currentPkg) {
      btn.classList.add(...activeClasses);
    } else {
      btn.classList.add(...inactiveClasses);
    }
  });

  // Update Price
  const price = productData[currentSize][currentPkg];
  if (price) {
    priceDisplay.textContent = '฿' + price;
    // Mock original price as roughly 30% higher for UI purposes
    const numPrice = parseInt(price.replace(/,/g, ''));
    originalPriceDisplay.textContent = '฿' + Math.round(numPrice * 1.3).toLocaleString();
  }
  
  // Update Label
  if (sizeLabel) {
    sizeLabel.textContent = currentSize + ' mm';
  }
}

sizeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    currentSize = btn.getAttribute('data-size');
    updateUI();
  });
});

pkgBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const pkg = btn.getAttribute('data-pkg');
    // Only allow click if it's a valid combination
    if (productData[currentSize][pkg] !== null) {
      currentPkg = pkg;
      updateUI();
    }
  });
});

// Quantity Logic
const btnQtyMinus = document.getElementById('btn-qty-minus');
const btnQtyPlus = document.getElementById('btn-qty-plus');
const qtyDisplay = document.getElementById('qty-display');
let currentQty = 1;

function updateQtyUI() {
  qtyDisplay.textContent = currentQty;
  if (currentQty <= 1) {
    btnQtyMinus.classList.add('text-gray-300', 'cursor-not-allowed');
    btnQtyMinus.classList.remove('text-gray-600', 'hover:text-gray-900');
  } else {
    btnQtyMinus.classList.remove('text-gray-300', 'cursor-not-allowed');
    btnQtyMinus.classList.add('text-gray-600', 'hover:text-gray-900');
  }
}

btnQtyMinus.addEventListener('click', () => {
  if (currentQty > 1) {
    currentQty--;
    updateQtyUI();
  }
});

btnQtyPlus.addEventListener('click', () => {
  currentQty++;
  updateQtyUI();
});
"""

    with open('/Users/aliceer/UDO/frontend/src/product.js', 'a') as f:
        f.write(new_js)
    print("Injected Matrix JS logic.")
else:
    print("Could not find JS logic start.")
