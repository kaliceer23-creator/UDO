import re

with open('udothai_shop.sql', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

for line in text.split('\n'):
    if line.startswith("INSERT INTO `products`"):
        # Look for 903
        pos = line.find("(903,")
        if pos != -1:
            end = line.find("),(", pos)
            entry = line[pos:end] if end != -1 else line[pos:line.find(");", pos)]
            print("FOUND REAL PRODUCT 903:")
            print(entry[:400])
            print("...")
            print(entry[-300:])
            break
