const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

// 1. Fix Cancel Button (<)
content = content.replace(
    '<button id="dock-cancel-btn" class="text-gray-500 hover:text-black p-2 transition-colors shrink-0 rounded-full mr-1">\n          <svg xmlns="http://www.w3.org/2000/svg" class="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">',
    '<button id="dock-cancel-btn" class="text-gray-900 hover:text-black p-2 transition-colors shrink-0 rounded-full mr-1">\n          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">'
);

// 2. Fix AI Icon (Magnifying Glass)
content = content.replace(
    '<div class="relative flex items-center justify-center shrink-0 mr-1.5 md:mr-2">\n          <svg xmlns="http://www.w3.org/2000/svg" class="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke-width="1.2">',
    '<div class="relative flex items-center justify-center shrink-0 mr-1.5 md:mr-2">\n          <svg xmlns="http://www.w3.org/2000/svg" class="w-[20px] h-[20px]" fill="none" viewBox="0 0 24 24" stroke-width="1.8">'
);

// 3. Fix Placeholder
content = content.replace(
    'placeholder="ถาม UDO AI..."',
    'placeholder="ถาม UDO AI"'
);

// 4. Fix Mic Icon (Make it black/gray-900)
content = content.replace(
    '<button id="dock-mic-btn" class="absolute flex items-center justify-center w-full h-full text-gray-400 hover:text-black transition-all duration-300 opacity-100 scale-100 pointer-events-auto">',
    '<button id="dock-mic-btn" class="absolute flex items-center justify-center w-full h-full text-gray-900 hover:text-black transition-all duration-300 opacity-100 scale-100 pointer-events-auto">'
);


fs.writeFileSync('frontend/src/main.js', content, 'utf8');
console.log("Updated icons and placeholder successfully.");
