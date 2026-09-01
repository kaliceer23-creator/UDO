const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

// 1. Update the main wrapper
content = content.replace(
    'bg-white/95 backdrop-blur-xl rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.12),0_1px_3px_rgba(0,0,0,0.05)] border border-white/50 hover:shadow-[0_12px_40px_rgba(138,195,83,0.2)] transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] w-fit min-w-[320px] h-[56px] md:h-[60px] overflow-hidden',
    'bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12),0_1px_3px_rgba(0,0,0,0.05)] border border-gray-200 hover:shadow-[0_12px_40px_rgba(138,195,83,0.2)] transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] w-fit min-w-[310px] h-[48px] md:h-[50px] overflow-hidden'
);

// 2. Adjust icons and text in State 1
// AI Icon
content = content.replace('class="w-6 h-6 md:w-[26px] md:h-[26px] group-hover:-translate-y-0.5 transition-transform duration-300"', 'class="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-300"');
content = content.replace('class="text-[13px] md:text-[14px] font-semibold text-gray-800', 'class="text-[11px] md:text-[12px] mt-0.5 font-semibold text-gray-800');

// Phone Icon
content = content.replace('class="w-6 h-6 md:w-[26px] md:h-[26px] group-hover:-translate-y-0.5 transition-transform duration-300"', 'class="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-300"');
content = content.replace('class="text-[13px] md:text-[14px] font-semibold text-gray-800', 'class="text-[11px] md:text-[12px] mt-0.5 font-semibold text-gray-800');

// Quote Icon
content = content.replace('class="w-6 h-6 md:w-[26px] md:h-[26px] group-hover:-translate-y-0.5 transition-transform duration-300"', 'class="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-300"');
content = content.replace('class="text-[13px] md:text-[14px] font-semibold text-gray-800', 'class="text-[11px] md:text-[12px] mt-0.5 font-semibold text-gray-800');

fs.writeFileSync('frontend/src/main.js', content, 'utf8');
console.log("Updated dock shape and sizing successfully.");
