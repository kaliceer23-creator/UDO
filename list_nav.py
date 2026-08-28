import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

start = content.find('<nav class="w-full bg-brand-green')
end = content.find('</nav>', start)
nav_html = content[start:end+6]

pattern = r'<a href="#" class="relative h-full flex items-center text-white[^>]+>(.*?)<span'
matches = re.findall(pattern, nav_html, re.DOTALL)

for i, m in enumerate(matches):
    print(f"{i}: {m.strip()}")
