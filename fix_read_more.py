import re

def add_read_more(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # 1. Update the wrapper
    old_wrapper = '<div class="w-full bg-white py-16">'
    new_wrapper = '<div class="w-full bg-white pt-16 pb-0 relative">'
    
    if old_wrapper in content:
        content = content.replace(old_wrapper, new_wrapper)
    
    # 2. Add ID and classes to the inner container
    old_inner = '<div class="max-w-[900px] mx-auto px-4 text-center">'
    new_inner = '<div id="rich-content-container" class="max-w-[900px] mx-auto px-4 text-center relative overflow-hidden transition-[max-height] duration-500 ease-in-out max-h-[500px]">'
    
    if old_inner in content:
        content = content.replace(old_inner, new_inner)

    # 3. Add the Fade and Button at the end of the Rich Content Section
    # Find the end of the inner container:
    # </div>
    # </div>
    # <!-- Related Products Section
    
    # We will look for:
    #         </div>
    #       </div>
    # 
    #       <!-- Related Products Section
    
    search_str = """        </div>
      </div>


    
      <!-- Related Products Section"""
      
    fade_html = """        </div>
        
        <!-- Fade & Read More -->
        <div id="rich-content-fade" class="absolute bottom-0 left-0 w-full h-[200px] bg-gradient-to-t from-white via-white/80 to-transparent flex items-end justify-center pb-0 pointer-events-none transition-all duration-300">
          <button id="btn-read-more" class="pointer-events-auto text-[#252525] font-semibold text-[15px] flex items-center gap-2 hover:text-brand-red transition-colors bg-white px-8 py-2.5 rounded-full shadow-[0_2px_15px_rgba(0,0,0,0.1)] border border-gray-100 translate-y-1/2 z-10">
            <span id="read-more-text">อ่านรายละเอียดเพิ่มเติม</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 transition-transform duration-300" id="read-more-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>
      </div>


    
      <!-- Related Products Section"""
      
    if search_str in content:
        content = content.replace(search_str, fade_html)
    else:
        print("Could not find the end of the rich content block.")

    # 4. Add JS logic
    js_code = """
// --- Read More Logic ---
setTimeout(() => {
  const container = document.getElementById('rich-content-container');
  const fade = document.getElementById('rich-content-fade');
  const btn = document.getElementById('btn-read-more');
  const icon = document.getElementById('read-more-icon');
  const text = document.getElementById('read-more-text');

  if (btn && container && fade) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const isExpanded = container.style.maxHeight !== '' && container.style.maxHeight !== '500px';
      
      if (isExpanded) {
        // Collapse
        container.style.maxHeight = '500px';
        fade.classList.remove('h-[80px]', 'from-transparent', 'via-transparent');
        fade.classList.add('h-[200px]', 'from-white', 'via-white/80');
        text.innerText = 'อ่านรายละเอียดเพิ่มเติม';
        icon.classList.remove('rotate-180');
      } else {
        // Expand
        container.style.maxHeight = container.scrollHeight + 'px';
        fade.classList.remove('h-[200px]', 'from-white', 'via-white/80');
        fade.classList.add('h-[80px]', 'from-transparent', 'via-transparent');
        text.innerText = 'ย่อรายละเอียด';
        icon.classList.add('rotate-180');
        
        // After transition, set to none so it responds to window resize
        setTimeout(() => {
          if(container.style.maxHeight !== '500px') {
             container.style.maxHeight = 'none';
          }
        }, 500);
      }
    });
  }
}, 100);
"""
    if "Read More Logic" not in content:
        content += js_code

    with open(filepath, 'w') as f:
        f.write(content)
    print("Added read more logic.")

add_read_more('/Users/aliceer/UDO/frontend/src/product.js')

