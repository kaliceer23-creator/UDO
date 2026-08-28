import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

start_idx = content.find('<nav class="w-full bg-brand-green')
end_idx = content.find('</nav>', start_idx)

if start_idx != -1 and end_idx != -1:
    green_html = content[start_idx:end_idx+6]
    
    # Change font-bold to font-medium (it was bold before)
    # Actually I will just replace 'font-bold' with 'font-medium' on the top level links.
    # The links look like: class="relative h-full flex items-center text-white hover:text-gray-100 font-bold text-[15px] xl:text-[16px] transition-colors group"
    green_html = green_html.replace('font-bold', 'font-medium')
    
    content = content[:start_idx] + green_html + content[end_idx+6:]
    with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
        f.write(content)
    print("Green banner fonts updated.")
else:
    print("Could not find nav element")
