import re

def fix_header_z_index(file_path):
    with open(file_path, 'r') as f:
        content = f.read()
    
    # We want to add relative z-[55] to the main header so it sits above the green nav (z-50)
    # Search for: <header class="w-full bg-white border-b border-gray-100">
    # Replace with: <header class="w-full bg-white border-b border-gray-100 relative z-[55]">
    content = content.replace(
        '<header class="w-full bg-white border-b border-gray-100">',
        '<header class="w-full bg-white border-b border-gray-100 relative z-[55] bg-white">' # Added bg-white again just to be safe, but it's there
    )
    # Clean it up in case I duplicated bg-white
    content = content.replace('bg-white bg-white', 'bg-white')
    
    with open(file_path, 'w') as f:
        f.write(content)

fix_header_z_index('/Users/aliceer/UDO/frontend/src/main.js')
fix_header_z_index('/Users/aliceer/UDO/frontend/src/product.js')

print("Fixed z-index overlap.")
