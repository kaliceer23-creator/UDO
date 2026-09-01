const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

// The original Why UDO button
const oldRegex = /<!-- Floating "Why buy with UDO" Button \(Bottom Left\) -->[\s\S]*?<\/a>/;

const newButton = `<!-- Floating "Why buy with UDO" Button (Bottom Left) -->
  <a href="#" class="fixed z-[90] bottom-[86px] md:bottom-8 left-4 md:left-8 bg-white rounded-full p-2 md:p-1.5 md:pr-5 shadow-[0_8px_24px_rgba(0,0,0,0.15)] border border-gray-100 flex items-center md:gap-2.5 hover:scale-105 hover:shadow-[0_12px_32px_rgba(0,0,0,0.2)] transition-all duration-300 cursor-pointer">
    <div class="bg-gradient-to-br from-[#71C04C] to-[#599e3a] text-white w-[40px] h-[40px] md:w-9 md:h-9 rounded-full flex items-center justify-center shadow-inner shrink-0">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 md:w-4 md:h-4">
        <path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
      </svg>
    </div>
    <span class="hidden md:block text-gray-800 font-semibold text-[14px] tracking-tight">ทำไมต้องซื้อกับ UDO?</span>
  </a>`;

if (content.match(oldRegex)) {
    content = content.replace(oldRegex, newButton);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Updated Why UDO button for mobile.");
} else {
    console.log("Could not find Why UDO button.");
}
