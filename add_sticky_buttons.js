const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const regex = /<!-- Modern Fluid Bottom Dock \(UDO Custom Framer-style\) -->/;

const floatingButtons = `
  <!-- Floating "Why buy with UDO" Button (Bottom Left) -->
  <a href="#" class="fixed z-[90] bottom-[90px] md:bottom-8 left-4 md:left-8 bg-white rounded-full p-1.5 pr-4 md:pr-5 shadow-[0_8px_24px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center gap-2.5 hover:scale-105 hover:shadow-[0_12px_32px_rgba(0,0,0,0.15)] transition-all duration-300 cursor-pointer">
    <div class="bg-gradient-to-br from-[#71C04C] to-[#599e3a] text-white w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center shadow-inner">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 md:w-4 md:h-4">
        <path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
      </svg>
    </div>
    <span class="text-gray-800 font-semibold text-[13px] md:text-[14px] tracking-tight">ทำไมต้องซื้อกับ UDO?</span>
  </a>

  <!-- Floating LINE Button (Bottom Right) -->
  <a href="#" class="fixed z-[90] bottom-[86px] md:bottom-8 right-4 md:right-8 w-[54px] h-[54px] md:w-[60px] md:h-[60px] bg-brand-red rounded-full border-[3px] border-white shadow-[0_8px_24px_rgba(225,36,39,0.4)] flex items-center justify-center hover:scale-110 hover:shadow-[0_12px_32px_rgba(225,36,39,0.5)] transition-all duration-300 cursor-pointer">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-8 h-8 md:w-9 md:h-9 text-white" fill="currentColor">
      <path d="M448 240.2c0-98.8-100.5-179.2-224-179.2S0 141.4 0 240.2c0 88.5 78.4 162.7 181.8 176.4 11.2 2.3 26 7.2 29.8 16.6 2.9 7 1.4 18 1 24.3-.4 6-2 19.3 16.9 11.3 18.9-7.9 102.1-60 140.9-104 30-34.1 77.6-80.1 77.6-124.6zm-175.9 35.1v71.1c0 1.8-1.4 3.2-3.2 3.2h-11.4c-1.1 0-2.1-.6-2.6-1.3l-32.6-44v42.2c0 1.8-1.4 3.2-3.2 3.2h-11.4c-1.8 0-3.2-1.4-3.2-3.2v-71.1c0-1.8 1.4-3.2 3.2-3.2H219c1 0 2.1.5 2.6 1.4l32.6 44v-42.2c0-1.8 1.4-3.2 3.2-3.2h11.4c1.8-.1 3.3 1.4 3.3 3.1zm-82-3.2h-11.4c-1.8 0-3.2 1.4-3.2 3.2v71.1c0 1.8 1.4 3.2 3.2 3.2h11.4c1.8 0 3.2-1.4 3.2-3.2v-71.1c0-1.7-1.4-3.2-3.2-3.2zm-27.5 59.6h-31.1v-56.4c0-1.8-1.4-3.2-3.2-3.2h-11.4c-1.8 0-3.2 1.4-3.2 3.2v71.1c0 .9.3 1.6.9 2.2.6.5 1.3.9 2.2.9h45.7c1.8 0 3.2-1.4 3.2-3.2v-11.4c0-1.7-1.4-3.2-3.1-3.2zM332.1 201h-45.7c-1.7 0-3.2 1.4-3.2 3.2v71.1c0 1.7 1.4 3.2 3.2 3.2h11.4c1.8 0 3.2-1.4 3.2-3.2v-20h31.1c1.8 0 3.2-1.4 3.2-3.2v-11.4c0-1.8-1.4-3.2-3.2-3.2h-31.1v-14h31.1c1.8 0 3.2-1.4 3.2-3.2v-11.4c-.1-1.7-1.5-3.1-3.2-3.1z"/>
    </svg>
  </a>

  <!-- Modern Fluid Bottom Dock (UDO Custom Framer-style) -->`;

if (content.match(regex)) {
    content = content.replace(regex, floatingButtons);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Added floating buttons.");
} else {
    console.log("Could not find insertion point.");
}
