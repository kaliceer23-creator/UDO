const fs = require('fs');
let content = fs.readFileSync('frontend/src/home_hydrate.js', 'utf8');

const injection = `
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
        
        // Change button briefly for feedback
        const originalContent = addToCartBtn.innerHTML;
        addToCartBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>';
        addToCartBtn.classList.add('bg-[#5EBB1E]'); // Success green
        
        setTimeout(() => {
            addToCartBtn.innerHTML = originalContent;
            addToCartBtn.classList.remove('bg-[#5EBB1E]');
            // Close dynamic island if open
            const container = addToCartBtn.closest('.size-container');
            if (container) closeDynamicIsland(container);
        }, 800);
        
        return;
    }
`;

content = content.replace("document.addEventListener('click', (e) => {", "document.addEventListener('click', (e) => {" + injection);

fs.writeFileSync('frontend/src/home_hydrate.js', content, 'utf8');
console.log("Patched JS");
