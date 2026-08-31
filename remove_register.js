const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const oldBlock = `<a href="#" class="hover:text-brand-red transition-colors ml-1">
              เข้าสู่ระบบ
            </a>
            <span class="text-black mx-1">|</span>
            <a href="#" class="hover:text-brand-red transition-colors">ลงทะเบียน</a>`;

const newBlock = `<a href="#" class="hover:text-brand-red transition-colors ml-1">
              เข้าสู่ระบบ
            </a>`;

if (content.includes(oldBlock)) {
    content = content.replace(oldBlock, newBlock);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Register and separator removed.");
} else {
    console.log("Block not found.");
}
