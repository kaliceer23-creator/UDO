const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

// 1. Revert Wrapper
content = content.replace(
    'bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12),0_1px_3px_rgba(0,0,0,0.05)] border border-gray-200 hover:shadow-[0_12px_40px_rgba(138,195,83,0.2)] transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] w-fit min-w-[320px] h-[54px] md:h-[58px] overflow-hidden',
    'bg-white/95 backdrop-blur-xl rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.12),0_1px_3px_rgba(0,0,0,0.05)] border border-white/50 hover:shadow-[0_12px_40px_rgba(138,195,83,0.2)] transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] w-fit min-w-[320px] h-[56px] md:h-[60px] overflow-hidden'
);

// 2. Revert Icons and text
// AI Icon
content = content.replace('class="w-[22px] h-[22px] md:w-6 md:h-6 group-hover:-translate-y-0.5 transition-transform duration-300"', 'class="w-6 h-6 md:w-[26px] md:h-[26px] group-hover:-translate-y-0.5 transition-transform duration-300"');
content = content.replace('class="text-[12px] md:text-[13px] mt-1 font-semibold text-gray-800 group-hover:text-brand-red transition-colors whitespace-nowrap tracking-tight leading-none">ถาม UDO AI</span>', 'class="text-[13px] md:text-[14px] font-semibold text-gray-800 group-hover:text-brand-red transition-colors whitespace-nowrap tracking-tight leading-none">ถาม UDO AI</span>');

// Phone Icon
content = content.replace('class="w-[22px] h-[22px] md:w-6 md:h-6 group-hover:-translate-y-0.5 transition-transform duration-300"', 'class="w-6 h-6 md:w-[26px] md:h-[26px] group-hover:-translate-y-0.5 transition-transform duration-300"');
content = content.replace('class="text-[12px] md:text-[13px] mt-1 font-semibold text-gray-800 group-hover:text-brand-red transition-colors whitespace-nowrap tracking-tight leading-none">โทรเช็กสต็อก</span>', 'class="text-[13px] md:text-[14px] font-semibold text-gray-800 group-hover:text-brand-red transition-colors whitespace-nowrap tracking-tight leading-none">โทรเช็กสต็อก</span>');

// Quote Icon
content = content.replace('class="w-[22px] h-[22px] md:w-6 md:h-6 group-hover:-translate-y-0.5 transition-transform duration-300"', 'class="w-6 h-6 md:w-[26px] md:h-[26px] group-hover:-translate-y-0.5 transition-transform duration-300"');
content = content.replace('class="text-[12px] md:text-[13px] mt-1 font-semibold text-gray-800 group-hover:text-brand-red transition-colors whitespace-nowrap tracking-tight leading-none">ขอใบเสนอราคา</span>', 'class="text-[13px] md:text-[14px] font-semibold text-gray-800 group-hover:text-brand-red transition-colors whitespace-nowrap tracking-tight leading-none">ขอใบเสนอราคา</span>');


fs.writeFileSync('frontend/src/main.js', content, 'utf8');
console.log("Reverted to Pill shape and original sizing successfully.");
