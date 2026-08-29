import re

def update_dock(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    old_class = 'fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-white rounded-full px-4 md:px-5 py-1 md:py-2 shadow-[0_20px_40px_rgba(0,0,0,0.08)] flex items-center gap-1 md:gap-2 hover:shadow-[0_20px_40px_rgba(138,195,83,0.2)] transition-shadow duration-500 border border-gray-200/50'
    new_class = 'fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-white/95 backdrop-blur-md rounded-full px-4 md:px-5 py-1 md:py-2 shadow-[0_8px_32px_rgba(0,0,0,0.12)] flex items-center gap-1 md:gap-2 hover:shadow-[0_12px_40px_rgba(138,195,83,0.25)] transition-all duration-500 border border-gray-200'
    
    if old_class in content:
        content = content.replace(old_class, new_class)
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated dock in {filepath}")
    else:
        print(f"Could not find the dock class in {filepath}")

update_dock('/Users/aliceer/UDO/frontend/src/main.js')
update_dock('/Users/aliceer/UDO/frontend/src/product.js')

