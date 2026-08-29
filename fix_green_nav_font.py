import re

def update_nav(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Find the green nav block
    start_tag = '<!-- 2. แถบคาดสีเขียว (Main Categories Banner) -->'
    end_tag = '</nav>'
    
    if start_tag in content and end_tag in content:
        start_idx = content.find(start_tag)
        end_idx = content.find(end_tag, start_idx) + len(end_tag)
        
        nav_block = content[start_idx:end_idx]
        
        # Replace font-medium with font-semibold
        updated_nav = nav_block.replace('font-medium', 'font-semibold')
        
        content = content[:start_idx] + updated_nav + content[end_idx:]
        
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated green nav font weight in {filepath}")
    else:
        print(f"Could not find green nav in {filepath}")

update_nav('/Users/aliceer/UDO/frontend/src/main.js')
update_nav('/Users/aliceer/UDO/frontend/src/product.js')

