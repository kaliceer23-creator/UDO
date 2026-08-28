with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

dock_start = content.find('<!-- Fixed Bottom Dock (UDO Custom) -->')
if dock_start != -1:
    print(f"Found dock at character {dock_start}")
    
    # print context around it
    print(content[dock_start-200:dock_start+200])
else:
    print("Dock not found")
