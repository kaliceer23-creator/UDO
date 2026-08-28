with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

start = content.find('<!-- 1. แถบสีขาวด้านบน (Main Header) -->')
end = content.find('<!-- 2. แถบคาดสีเขียว (Main Categories Banner) -->')
print(content[start:end])
