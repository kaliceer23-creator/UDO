import re

def fix_search_bg(file_path):
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Change bg-[#E12427] hover:bg-[#c41f22] to bg-[#76b83f] hover:bg-[#65a332]
    # Be careful to ONLY target the search button.
    # The search button has: w-[64px] h-[44px]
    
    content = content.replace(
        'bg-[#E12427] hover:bg-[#c41f22] text-white w-[64px] h-[44px]',
        'bg-[#76b83f] hover:bg-[#65a332] text-white w-[64px] h-[44px]'
    )
    
    with open(file_path, 'w') as f:
        f.write(content)

fix_search_bg('/Users/aliceer/UDO/frontend/src/main.js')
fix_search_bg('/Users/aliceer/UDO/frontend/src/product.js')

print("Updated search button color to green.")
