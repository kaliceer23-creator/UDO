import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

start_idx = content.find('<nav class="w-full bg-brand-green')
end_idx = content.find('</nav>', start_idx)

if start_idx != -1 and end_idx != -1:
    print(content[start_idx:end_idx+6])
else:
    print("Not found")
