const fs = require('fs');
let js = fs.readFileSync('frontend/src/product_hydrate.js', 'utf8');

const qtyLogic = `
    // --- Logic จัดการจำนวน (Quantity) ---
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

    window.increaseQty = () => {
      currentQty++;
      updateQtyDisplay();
    };

    window.decreaseQty = () => {
      if(currentQty > 1) {
        currentQty--;
        updateQtyDisplay();
      }
    };
    // เรียกแสดงผลครั้งแรก
    updateQtyDisplay();
`;

// Insert the qtyLogic just before `// ทำให้ HTML โทรหา JS ได้`
js = js.replace('// ทำให้ HTML โทรหา JS ได้', qtyLogic + '\n    // ทำให้ HTML โทรหา JS ได้');

fs.writeFileSync('frontend/src/product_hydrate.js', js, 'utf8');
console.log("Added Quantity Logic");
