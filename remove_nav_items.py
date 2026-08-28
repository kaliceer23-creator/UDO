import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

def remove_item(text, item_name):
    pattern = r'[ \t]*<a href="#" class="relative h-full flex items-center text-white[^>]+>\s*' + re.escape(item_name) + r'\s*<span[^>]+></span>\s*</a>\s*'
    return re.sub(pattern, '\n      ', text)

# Let's remove 3 items to make it much more spacious
content = remove_item(content, 'ท่อบรรจุก๊าซและวาล์ว')
content = remove_item(content, 'เคมีภัณฑ์งานเชื่อม')

with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
    f.write(content)
print("Removed some items.")
