with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

# Replace the classes that hide the buttons
# For brand-prev
old_prev = 'opacity-0 group-hover/brand:opacity-100 pointer-events-none group-hover/brand:pointer-events-auto'
content = content.replace(f'<button class="brand-prev absolute left-0 top-1/2 -translate-y-1/2 w-8 h-14 bg-black/25 hover:bg-black/35 text-white rounded-md z-20 transition-all flex items-center justify-center {old_prev}">', 
                          '<button class="brand-prev absolute left-0 top-1/2 -translate-y-1/2 w-8 h-14 bg-black/25 hover:bg-black/35 text-white rounded-md z-20 transition-all flex items-center justify-center">')

# For brand-next
content = content.replace(f'<button class="brand-next absolute right-0 top-1/2 -translate-y-1/2 w-8 h-14 bg-black/25 hover:bg-black/35 text-white rounded-md z-20 transition-all flex items-center justify-center {old_prev}">', 
                          '<button class="brand-next absolute right-0 top-1/2 -translate-y-1/2 w-8 h-14 bg-black/25 hover:bg-black/35 text-white rounded-md z-20 transition-all flex items-center justify-center">')

with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
    f.write(content)
print("Made brand buttons always visible.")
