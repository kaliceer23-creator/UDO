const fs = require('fs');
let content = fs.readFileSync('frontend/src/home_hydrate.js', 'utf8');

const logic = `
    const wishlistBtn = e.target.closest('.btn-wishlist');
    if (wishlistBtn) {
        e.preventDefault();
        const icon = wishlistBtn.querySelector('svg');
        if (wishlistBtn.classList.contains('text-[#E12427]')) {
            // Un-heart
            wishlistBtn.classList.remove('text-[#E12427]');
            wishlistBtn.classList.add('text-gray-300');
            icon.setAttribute('fill', 'none');
        } else {
            // Heart
            wishlistBtn.classList.remove('text-gray-300');
            wishlistBtn.classList.add('text-[#E12427]');
            icon.setAttribute('fill', 'currentColor');
            // Little bounce
            icon.style.transform = 'scale(1.3)';
            icon.style.transition = 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            setTimeout(() => icon.style.transform = 'scale(1)', 200);
        }
        return;
    }

    const sizeDot`;

content = content.replace("    const sizeDot", logic);
fs.writeFileSync('frontend/src/home_hydrate.js', content, 'utf8');
console.log("Heart logic added");
