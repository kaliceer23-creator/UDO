const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

// 1. Thinner Chevron (<)
content = content.replace(
    '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">',
    '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">'
);

// 2. Change AI Icon to Black
content = content.replace(
    '<path stroke="#E12427" stroke-linecap="round" stroke-linejoin="round" d="M19.128 6.554l-.45-1.554-.45 1.554a2.25 2.25 0 00-1.554 1.554l-1.554.45 1.554.45a2.25 2.25 0 001.554 1.554l.45 1.554.45-1.554a2.25 2.25 0 001.554-1.554l1.554-.45-1.554-.45a2.25 2.25 0 00-1.554-1.554z" />',
    '<path stroke="#1d1d1f" stroke-linecap="round" stroke-linejoin="round" d="M19.128 6.554l-.45-1.554-.45 1.554a2.25 2.25 0 00-1.554 1.554l-1.554.45 1.554.45a2.25 2.25 0 001.554 1.554l.45 1.554.45-1.554a2.25 2.25 0 001.554-1.554l1.554-.45-1.554-.45a2.25 2.25 0 00-1.554-1.554z" />'
);
content = content.replace(
    '<path stroke="#E12427" stroke-linecap="round" stroke-linejoin="round" d="M11 14l-1-3-3-1 3-1 1-3 1 3 3 1-3 1-1 3z" opacity="0.5"/>',
    '<path stroke="#1d1d1f" stroke-linecap="round" stroke-linejoin="round" d="M11 14l-1-3-3-1 3-1 1-3 1 3 3 1-3 1-1 3z" opacity="0.5"/>'
);

// 3. Remove "เพื่อหาสินค้า..." from placeholder
content = content.replace(
    'placeholder="ถาม UDO AI เพื่อหาสินค้า..."',
    'placeholder="ถาม UDO AI..."'
);

// 4. Update Send Button (Red and Smaller)
content = content.replace(
    'class="bg-[#1d1d1f] hover:bg-[#333336] active:scale-95 text-white w-[34px] h-[34px] md:w-[38px] md:h-[38px] rounded-full flex items-center justify-center transition-all shadow-md shrink-0 ml-2"',
    'class="bg-brand-red hover:bg-[#c91d20] active:scale-95 text-white w-[28px] h-[28px] md:w-[32px] md:h-[32px] rounded-full flex items-center justify-center transition-all shadow-md shrink-0 ml-2"'
);

// 5. Update Send Icon size
content = content.replace(
    '<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">',
    '<svg xmlns="http://www.w3.org/2000/svg" class="w-[14px] h-[14px] md:w-4 md:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">'
);


fs.writeFileSync('frontend/src/main.js', content, 'utf8');
console.log("Updated input state successfully.");
