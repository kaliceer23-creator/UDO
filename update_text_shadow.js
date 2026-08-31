const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

// The h3 classes are currently:
// class="text-white font-semibold text-[18px] md:text-[20px] lg:text-[22px] leading-tight absolute top-4 left-4 md:top-5 md:left-5 z-10"
// and some have " pr-4" for line 519.

const targetClassBase = "text-white font-semibold text-[18px] md:text-[20px] lg:text-[22px] leading-tight absolute top-4 left-4 md:top-5 md:left-5 z-10";
const newClassBase = "text-white font-semibold text-[18px] md:text-[20px] lg:text-[22px] leading-tight absolute top-4 left-4 md:top-5 md:left-5 z-10 [text-shadow:_0_1px_4px_rgb(0_0_0_/_60%)]";

// We need to carefully replace just the targetClassBase with newClassBase globally.
// However, note that JS string replace with global flag is easy if we just split/join.

content = content.split(targetClassBase).join(newClassBase);

fs.writeFileSync('frontend/src/main.js', content, 'utf8');
console.log("Text shadow added to headings.");
