const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

// 1. Update height, width, and shape of the wrapper
content = content.replace(
    'w-fit min-w-[320px] h-[56px] md:h-[60px] overflow-hidden',
    'w-fit min-w-[350px] md:min-w-[380px] h-[64px] md:h-[68px] overflow-hidden'
);

// 2. Adjust dividers to be slightly taller to match the new height
content = content.replace(/h-\[24px\] bg-gray-200/g, 'h-[32px] bg-gray-200');

// 3. Fix Thai text clipping by removing `leading-none` and optionally making text/icons larger
// We'll replace the span classes for all 3 buttons
content = content.replace(/class="text-\[13px\] md:text-\[14px\] font-semibold text-gray-800 group-hover:text-brand-red transition-colors whitespace-nowrap tracking-tight leading-none"/g, 
                          'class="text-[13px] md:text-[14px] mt-1 font-semibold text-gray-800 group-hover:text-brand-red transition-colors whitespace-nowrap tracking-tight leading-normal"');

// 4. Increase icon sizes slightly for the "ใหญ่กว่านี้อีกนิด" request
content = content.replace(/class="w-6 h-6 md:w-\[26px\] md:h-\[26px\] group-hover:-translate-y-0\.5 transition-transform duration-300"/g,
                          'class="w-[26px] h-[26px] md:w-[28px] md:h-[28px] group-hover:-translate-y-0.5 transition-transform duration-300"');


fs.writeFileSync('frontend/src/main.js', content, 'utf8');
console.log("Fixed clipping and enlarged dock successfully.");
