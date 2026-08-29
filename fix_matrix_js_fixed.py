import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Find where JS logic starts
js_start = '// --- Interactive Logic ---'
js_idx = content.find(js_start)

if js_idx != -1:
    content = content[:js_idx] # Keep everything before JS
    with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
        f.write(content)

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
// Select the span that shows the active size label next to the word "ขนาด"
const sizeLabelWrapper = document.querySelector('span.text-\\[16px\\].font-bold.text-\\[\\#252525\\]');

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
    
    btn.classList.remove(...activeClasses, ...inactiveClasses, ...disabledClasses, 'bg-white', 'border-gray-200', 'text-gray-400');
    
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
    const numPrice = parseInt(price.replace(/,/g, ''));
    originalPriceDisplay.textContent = '฿' + Math.round(numPrice * 1.3).toLocaleString();
  }
  
  // Update Label
  if (sizeLabelWrapper && sizeLabelWrapper.textContent.includes('mm')) {
    sizeLabelWrapper.textContent = currentSize + ' mm';
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

// Initial call
updateUI();
"""

with open('/Users/aliceer/UDO/frontend/src/product.js', 'a') as f:
    f.write(new_js)

print("Injected Matrix JS logic successfully.")
