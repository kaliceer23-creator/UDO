const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const target = `              เข้าสู่ระบบ
            </a>
          </div>`;

const restored = `              เข้าสู่ระบบ
            </a>
            <span class="text-black mx-1">|</span>
            <a href="#" class="hover:text-brand-red transition-colors">ลงทะเบียน</a>
          </div>`;

if (content.includes(target)) {
    content = content.replace(target, restored);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Restored 'ลงทะเบียน' and '|'.");
} else {
    console.log("Could not find the target code to restore.");
}
