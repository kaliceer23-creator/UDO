import re

def insert_script(file_path):
    with open(file_path, 'r') as f:
        content = f.read()
    
    script_code = """
// Smart Header Logic: Hide green bar on scroll down, show on scroll up
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
}
"""
    # Append the script logic at the end of the file
    # We should ensure we don't append it multiple times if run again
    if 'Smart Header Logic' not in content:
        with open(file_path, 'a') as f:
            f.write('\n' + script_code)

insert_script('/Users/aliceer/UDO/frontend/src/main.js')
insert_script('/Users/aliceer/UDO/frontend/src/product.js')

print("Smart header logic added to both files.")
