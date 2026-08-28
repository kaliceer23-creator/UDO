with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

# Replace "ขั้นตอนการใช้งาน" with "วัสดุอุปกรณ์เคมีภัณฑ์สำหรับงานเชื่อม"
content = content.replace('ขั้นตอน<br>การใช้งาน', 'วัสดุอุปกรณ์เคมีภัณฑ์<br>สำหรับงานเชื่อม')

# Ensure "อะไหล่สิ้นเปลือง" matches the long version if they want it exact.
content = content.replace('อะไหล่สิ้นเปลือง</h3>', 'อะไหล่สิ้นเปลือง<br><span class="text-[16px] md:text-[20px] font-medium block mt-1">เครื่องตัดพลาสม่า เครื่องเชื่อม</span></h3>')

with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
    f.write(content)
print("Text fixed.")
