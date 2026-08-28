import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

# 2. Update JS
js_start = content.find('// --- Brand Slider Auto-Scroll Logic ---')
js_end = content.find('const productSliders = document.querySelectorAll', js_start)

js_section = content[js_start:js_end]

# Add btnPrev and btnNext selection
js_section = js_section.replace(
    "const dotsContainer = brandSection.querySelector('.brand-dots');",
    "const dotsContainer = brandSection.querySelector('.brand-dots');\n  const btnPrev = brandSection.querySelector('.brand-prev');\n  const btnNext = brandSection.querySelector('.brand-next');"
)

# Add event listeners near the bottom of the section
listeners = """
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

    startAutoScroll();"""

js_section = js_section.replace("    startAutoScroll();", listeners)

content = content[:js_start] + js_section + content[js_end:]

with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
    f.write(content)
print("Updated JS with button logic.")
