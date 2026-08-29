import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# We need to swap bg-[#F8F8F8] and bg-white INSIDE the table rows.
# Let's extract just the table block to avoid messing up the section background.
start = '<div class="w-full flex flex-col text-[14px] text-[#252525]">'
end = '</div>\n        </div>\n      </div>\n      <!-- End of Specs Section -->'

start_idx = content.find(start)
end_idx = content.find(end)

if start_idx != -1 and end_idx != -1:
    table_content = content[start_idx:end_idx]
    
    # Swap bg-[#F8F8F8] and bg-white
    # First replace bg-white with TEMP
    table_content = table_content.replace('bg-white', 'bg-TEMP')
    # Replace bg-[#F8F8F8] with bg-white
    table_content = table_content.replace('bg-[#F8F8F8]', 'bg-white')
    # Replace bg-TEMP with bg-[#F8F8F8]
    table_content = table_content.replace('bg-TEMP', 'bg-[#F8F8F8]')
    
    new_content = content[:start_idx] + table_content + content[end_idx:]
    with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
        f.write(new_content)
    print("Swapped zebra stripe colors.")
else:
    print("Could not find table boundaries.")

