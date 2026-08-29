import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Locate the Social Links block
start_marker = '<!-- Social Links -->'
end_marker = '            </div>\n\n          </div>\n        </div>\n      </div>'

start_idx = content.find(start_marker)
# Find the specific </div> that ends the social links
end_idx = content.find('            </div>', start_idx) + len('            </div>')

if start_idx != -1 and end_idx != -1:
    new_social_html = """<!-- Social Links -->
            <div class="flex items-center justify-between text-[16px] font-semibold text-[#252525] border-t border-gray-200 pt-6">
              <button class="flex items-center gap-2 hover:text-[#E12427] transition-colors group">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400 group-hover:text-[#E12427] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                เพิ่มเป็นรายการโปรด
              </button>
              <button class="flex items-center gap-2 hover:text-[#76b83f] transition-colors group">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400 group-hover:text-[#76b83f] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                แชร์
              </button>
            </div>"""
    
    new_content = content[:start_idx] + new_social_html + content[end_idx:]
    with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
        f.write(new_content)
    print("Updated social links successfully.")
else:
    print("Could not find social links block.")
