const fs = require('fs');
let content = fs.readFileSync('frontend/src/home_hydrate.js', 'utf8');

// The block starts with "    // Add to Cart Interaction" and ends before "});"
// Let's use a regex to replace the specific block.
const blockRegex = /\/\/ Add to Cart Interaction[\s\S]*?(?=\}\);)/;

const newBlock = `// Add to Cart Interaction
    const addToCartBtn = e.target.closest('.di-cart') || e.target.closest('.btn-direct-add');
    if (addToCartBtn) {
        e.preventDefault();
        
        // Update Navbar Badge
        const badge = document.getElementById('cart-badge');
        if (badge) {
            let count = parseInt(badge.textContent || '0');
            badge.textContent = count + 1;
            badge.style.transform = 'scale(1.6)';
            badge.style.transition = 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            setTimeout(() => {
                badge.style.transform = 'scale(1)';
            }, 250);
        }
        
        // Change button briefly for feedback (Minimalist)
        const originalContent = addToCartBtn.innerHTML;
        const isDirect = addToCartBtn.classList.contains('btn-direct-add');
        
        if (isDirect) {
            addToCartBtn.innerHTML = 'เพิ่มสำเร็จ';
            addToCartBtn.classList.add('text-brand-green');
        } else {
            addToCartBtn.innerHTML = '✓';
        }
        
        setTimeout(() => {
            addToCartBtn.innerHTML = originalContent;
            if (isDirect) addToCartBtn.classList.remove('text-brand-green');
            
            // Close dynamic island if open
            const container = addToCartBtn.closest('.size-container');
            if (container) closeDynamicIsland(container);
        }, 800);
        
        return;
    }
`;

content = content.replace(blockRegex, newBlock);
fs.writeFileSync('frontend/src/home_hydrate.js', content, 'utf8');
console.log("Patched interaction");
