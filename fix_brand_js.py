import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

# Replace the brand JS section
js_start = content.find('// --- Brand Slider Auto-Scroll Logic ---')
js_end = content.find('const productSliders = document.querySelectorAll', js_start)

new_js = """// --- Brand Slider Auto-Scroll Logic ---
const brandSection = document.getElementById('brandSliderSection');
if (brandSection) {
  const track = brandSection.querySelector('.brand-track');
  const dotsContainer = brandSection.querySelector('.brand-dots');
  
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

    startAutoScroll();
    setTimeout(updateBrandUI, 100);
    window.addEventListener('resize', () => setTimeout(updateBrandUI, 100));
  }
}

"""

content = content[:js_start] + new_js + content[js_end:]
with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
    f.write(content)
print("Brand JS updated.")
