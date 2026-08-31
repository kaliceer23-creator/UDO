const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const oldNav = `<a href="#" class="h-full flex items-center text-white hover:text-brand-red font-medium transition-colors text-[13.5px] md:text-[14px]">
          บล็อก
        </a>`;

const newNav = `<a href="#" class="h-full flex items-center text-white hover:text-brand-red font-medium transition-colors text-[13.5px] md:text-[14px]">
          ข่าวสารและกิจกรรม
        </a>`;

if (content.includes(oldNav)) {
    content = content.replace(oldNav, newNav);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Nav updated to ข่าวสารและกิจกรรม.");
} else {
    console.log("Could not find the target link.");
}
