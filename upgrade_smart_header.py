import re

def upgrade_logic(file_path):
    with open(file_path, 'r') as f:
        content = f.read()

    old_logic = """// Smart Header Logic: Hide green bar on scroll down, show on scroll up
const greenNav = document.querySelector('nav.bg-brand-green');
if (greenNav) {
  greenNav.style.transition = 'margin-top 0.3s ease-in-out';
  let lastScrollY = window.scrollY;
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // If scrolled down past 100px and scrolling down
    if (currentScrollY > 100 && currentScrollY > lastScrollY) {
      greenNav.style.marginTop = `-${greenNav.offsetHeight}px`;
    } else {
      greenNav.style.marginTop = '0px';
    }
    lastScrollY = currentScrollY;
  });
}"""

    new_logic = """// Smart Header Logic: Hide green bar on scroll down, show on scroll up
const greenNav = document.querySelector('nav.bg-brand-green');
if (greenNav) {
  // Use a premium easing curve (like iOS) and animate both margin and opacity for ultimate smoothness
  greenNav.style.transition = 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
  let lastScrollY = window.scrollY;
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Anti-stutter: require at least 5px scroll difference to trigger
    if (Math.abs(currentScrollY - lastScrollY) < 5) return;
    
    // If scrolled down past 100px and scrolling down
    if (currentScrollY > 100 && currentScrollY > lastScrollY) {
      greenNav.style.marginTop = `-${greenNav.offsetHeight}px`;
      greenNav.style.opacity = '0';
    } else {
      greenNav.style.marginTop = '0px';
      greenNav.style.opacity = '1';
    }
    lastScrollY = currentScrollY;
  });
}"""

    if old_logic in content:
        content = content.replace(old_logic, new_logic)
        with open(file_path, 'w') as f:
            f.write(content)
        print(f"Upgraded logic in {file_path}")
    else:
        print(f"Old logic not found in {file_path}")

upgrade_logic('/Users/aliceer/UDO/frontend/src/main.js')
upgrade_logic('/Users/aliceer/UDO/frontend/src/product.js')
