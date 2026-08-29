import re

files = [
    '/Users/aliceer/UDO/frontend/src/main.js',
    '/Users/aliceer/UDO/frontend/src/product.js',
    '/Users/aliceer/UDO/frontend/src/style.css'
]

# We want to change the primary red to #E12427
# And its hover (darker) state to #c41f22

for filepath in files:
    try:
        with open(filepath, 'r') as f:
            content = f.read()

        # Handle specific hover combinations first
        content = content.replace('hover:bg-[#c92020]', 'hover:bg-[#c41f22]')
        content = content.replace('hover:bg-[#9c2e2a]', 'hover:bg-[#c41f22]')

        # Then replace the base red colors
        content = content.replace('#E32626', '#E12427')
        content = content.replace('#c92020', '#E12427')
        content = content.replace('#b53832', '#E12427')
        
        # Also handle lowercase variants just in case
        content = content.replace('#e32626', '#E12427')

        with open(filepath, 'w') as f:
            f.write(content)
            
        print(f"Updated reds in {filepath}")
    except Exception as e:
        print(f"Skipped {filepath}: {e}")

