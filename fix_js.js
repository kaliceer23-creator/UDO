const fs = require('fs');
let content = fs.readFileSync('frontend/src/home_hydrate.js', 'utf8');

const newBlock = `// Animations & Interactions
document.addEventListener('click', (e) => {
    // Add to Cart Interaction
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

    const sizeDot = e.target.closest('.size-dot');
    if (sizeDot) {
        e.preventDefault();
        const container = sizeDot.closest('.size-container');
        const pid = container.dataset.pid;
        const size = sizeDot.dataset.size;
        openDynamicIsland(container, pid, size);
        return;
    }

    const closeBtn = e.target.closest('.di-close');
    if (closeBtn) {
        e.preventDefault();
        const container = closeBtn.closest('.size-container');
        closeDynamicIsland(container);
        return;
    }
    
    const pkgBtn = e.target.closest('.di-pkg');
    if (pkgBtn) {
        e.preventDefault();
        const island = pkgBtn.closest('.dynamic-island');
        island.querySelectorAll('.di-pkg').forEach(p => {
            p.classList.remove('bg-white', 'text-gray-900', 'font-bold');
            p.classList.add('bg-gray-800', 'text-gray-300', 'hover:bg-gray-700');
        });
        pkgBtn.classList.remove('bg-gray-800', 'text-gray-300', 'hover:bg-gray-700');
        pkgBtn.classList.add('bg-white', 'text-gray-900', 'font-bold');
    }
});

function openDynamicIsland`;

// Replace everything from '// Animations & Interactions' up to 'function openDynamicIsland'
const regex = /\/\/ Animations & Interactions[\s\S]*?function openDynamicIsland/g;
content = content.replace(regex, newBlock);

fs.writeFileSync('frontend/src/home_hydrate.js', content, 'utf8');
console.log("Syntax fixed");
