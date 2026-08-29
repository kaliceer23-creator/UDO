import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# 1. Update Price HTML to have IDs
content = content.replace(
    '<span class="text-[34px] font-medium text-[#E12427] leading-none">฿320</span>',
    '<span id="price-display" class="text-[34px] font-medium text-[#E12427] leading-none">฿320</span>'
)
content = content.replace(
    '<span class="text-[16px] text-gray-500 line-through mb-1">฿450</span>',
    '<span id="original-price-display" class="text-[16px] text-gray-500 line-through mb-1">฿450</span>'
)

# 2. Update Packaging Buttons to have IDs and data attributes
content = content.replace(
    '<button class="px-4 py-1.5 rounded-[4px] bg-[#76b83f] border border-[#76b83f] text-white font-medium text-[14px] shadow-sm transition-colors">ห่อ</button>',
    '<button id="btn-unit-pack" data-price="320" data-original="450" class="unit-btn px-4 py-1.5 rounded-[4px] bg-[#76b83f] border border-[#76b83f] text-white font-medium text-[14px] shadow-sm transition-colors">ห่อ</button>'
)
content = content.replace(
    '<button class="px-4 py-1.5 rounded-[4px] bg-white border border-gray-300 text-[#252525] font-medium text-[14px] hover:border-[#76b83f] transition-colors">ลัง (4 ห่อ)</button>',
    '<button id="btn-unit-box" data-price="1,200" data-original="1,750" class="unit-btn px-4 py-1.5 rounded-[4px] bg-white border border-gray-300 text-[#252525] font-medium text-[14px] hover:border-[#76b83f] transition-colors">ลัง (4 ห่อ)</button>'
)

# 3. Update Quantity to have IDs
# Minus Button
content = content.replace(
    '<button class="flex items-center justify-center text-gray-300 hover:text-gray-400 transition-colors cursor-not-allowed">',
    '<button id="btn-qty-minus" class="flex items-center justify-center text-gray-300 transition-colors cursor-not-allowed">'
)
# Number Box
content = content.replace(
    '<div class="w-[70px] h-[40px] flex items-center justify-center font-medium text-[16px] text-[#252525] bg-white border border-gray-300 rounded-[4px]">',
    '<div id="qty-display" class="w-[70px] h-[40px] flex items-center justify-center font-medium text-[16px] text-[#252525] bg-white border border-gray-300 rounded-[4px]">'
)
# Plus Button
content = content.replace(
    '<button class="flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors">',
    '<button id="btn-qty-plus" class="flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors">'
)

# 4. Inject JavaScript Logic at the very end (before closing backtick if any, but since Vite injects HTML, we append logic inside the JS file after the DOM injection)
# The JS structure ends with: document.querySelector('#app').innerHTML = `...`;
# So we can just append standard JS logic.

js_logic = """
// --- Interactive Logic ---
const btnUnitPack = document.getElementById('btn-unit-pack');
const btnUnitBox = document.getElementById('btn-unit-box');
const priceDisplay = document.getElementById('price-display');
const originalPriceDisplay = document.getElementById('original-price-display');

const btnQtyMinus = document.getElementById('btn-qty-minus');
const btnQtyPlus = document.getElementById('btn-qty-plus');
const qtyDisplay = document.getElementById('qty-display');

let currentQty = 1;

// Classes for states
const activeClasses = ['bg-[#76b83f]', 'border-[#76b83f]', 'text-white', 'shadow-sm'];
const inactiveClasses = ['bg-white', 'border-gray-300', 'text-[#252525]', 'hover:border-[#76b83f]'];

function switchUnit(activeBtn, inactiveBtn) {
  // Add active classes to activeBtn, remove inactive classes
  activeBtn.classList.remove(...inactiveClasses);
  activeBtn.classList.add(...activeClasses);
  
  // Add inactive classes to inactiveBtn, remove active classes
  inactiveBtn.classList.remove(...activeClasses);
  inactiveBtn.classList.add(...inactiveClasses);
  
  // Update price
  priceDisplay.textContent = '฿' + activeBtn.getAttribute('data-price');
  originalPriceDisplay.textContent = '฿' + activeBtn.getAttribute('data-original');
}

btnUnitPack.addEventListener('click', () => switchUnit(btnUnitPack, btnUnitBox));
btnUnitBox.addEventListener('click', () => switchUnit(btnUnitBox, btnUnitPack));

// Quantity Logic
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
    f.write(js_logic)

print("Injected JavaScript for buttons.")
