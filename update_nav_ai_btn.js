const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

// 1. Button Size
content = content.replace(
    'class="bg-brand-red hover:bg-[#c91d20] text-white px-3 md:px-3.5 py-0.5 h-[26px] md:h-[28px] rounded-full flex items-center justify-center gap-1 transition-all duration-200 shrink-0 cursor-pointer active:scale-[0.98]"',
    'class="bg-brand-red hover:bg-[#c91d20] text-white px-3.5 md:px-4 py-0.5 h-[28px] md:h-[30px] rounded-full flex items-center justify-center gap-1.5 transition-all duration-200 shrink-0 cursor-pointer active:scale-[0.98]"'
);

// 2. Icon Wrapper
content = content.replace(
    '<div class="relative flex items-center justify-center w-3.5 h-3.5 mr-0.5">',
    '<div class="relative flex items-center justify-center w-[15px] h-[15px]"> // removed mr-0.5 because we added gap-1.5 above'
);
// wait actually replace it correctly
content = content.replace(
    '<div class="relative flex items-center justify-center w-[15px] h-[15px]"> // removed mr-0.5 because we added gap-1.5 above',
    '<div class="relative flex items-center justify-center w-4 h-4 mr-0.5">'
); // Let's just fix the whole block using regex or exact replace.
