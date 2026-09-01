const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

// 1. Update height, width of the wrapper
content = content.replace(
    'w-fit min-w-[350px] md:min-w-[380px] h-[64px] md:h-[68px] overflow-hidden',
    'w-fit min-w-[330px] md:min-w-[360px] h-[60px] md:h-[64px] overflow-hidden'
);

// 2. Adjust dividers back to 28px
content = content.replace(/h-\[32px\] bg-gray-200/g, 'h-[28px] bg-gray-200');

// 3. Decrease icon sizes back to normal pill size
content = content.replace(/class="w-\[26px\] h-\[26px\] md:w-\[28px\] md:h-\[28px\] group-hover:-translate-y-0\.5 transition-transform duration-300"/g,
                          'class="w-6 h-6 md:w-[26px] md:h-[26px] group-hover:-translate-y-0.5 transition-transform duration-300"');

fs.writeFileSync('frontend/src/main.js', content, 'utf8');
console.log("Shrank dock successfully.");
