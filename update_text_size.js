const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const oldClass = "text-[18px] md:text-[20px] lg:text-[22px]";
const newClass = "text-[20px] md:text-[22px] lg:text-[24px]";

content = content.split(oldClass).join(newClass);

fs.writeFileSync('frontend/src/main.js', content, 'utf8');
console.log("Text size increased to 24px for lg.");
