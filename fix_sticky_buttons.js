const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

// 1. Remove the two buttons I just added
const wrongButtonsRegex = /<!-- Floating "Why buy with UDO" Button \(Bottom Left\) -->[\s\S]*?<!-- Floating LINE Button \(Bottom Right\) -->[\s\S]*?<\/a>\n\n/g;
content = content.replace(wrongButtonsRegex, '');

// 2. Insert the LINE button into the existing Sticky Right Buttons container
const containerRegex = /<!-- Main Circle Button \(ย่อลงมานิดนึง เป็น 108px\) -->\n\s*<a href="#" class="w-\[90px\] h-\[90px\] md:w-\[108px\] md:h-\[108px\] bg-\[#E12427\] hover:bg-\[#c41f22\] rounded-full flex flex-col items-center justify-center shadow-\[0_10px_20px_rgba\(181,56,50,0\.25\)\] transition-transform hover:scale-105 duration-300">\n\s*<span class="text-white text-\[14px\] md:text-\[17px\] leading-\[1\.3\] text-center font-medium">ทำไมต้อง<br>ซื้อกับ<br>UDO<\/span>\n\s*<\/a>\n\s*<\/div>\n\s*<\/div>/;

const newContainer = `<!-- Main Circle Button (ย่อลงมานิดนึง เป็น 108px) -->
      <a href="#" class="w-[90px] h-[90px] md:w-[108px] md:h-[108px] bg-[#E12427] hover:bg-[#c41f22] rounded-full flex flex-col items-center justify-center shadow-[0_10px_20px_rgba(181,56,50,0.25)] transition-transform hover:scale-105 duration-300">
        <span class="text-white text-[14px] md:text-[17px] leading-[1.3] text-center font-medium">ทำไมต้อง<br>ซื้อกับ<br>UDO</span>
      </a>
    </div>
    
    <!-- Floating LINE Button (Bottom Right) -->
    <a href="#" class="w-[54px] h-[54px] md:w-[60px] md:h-[60px] bg-[#E12427] rounded-full border-[3px] border-white shadow-[0_8px_24px_rgba(225,36,39,0.4)] flex items-center justify-center hover:scale-110 hover:shadow-[0_12px_32px_rgba(225,36,39,0.5)] transition-all duration-300 cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-8 h-8 md:w-9 md:h-9 text-white" fill="currentColor">
        <path d="M448 240.2c0-98.8-100.5-179.2-224-179.2S0 141.4 0 240.2c0 88.5 78.4 162.7 181.8 176.4 11.2 2.3 26 7.2 29.8 16.6 2.9 7 1.4 18 1 24.3-.4 6-2 19.3 16.9 11.3 18.9-7.9 102.1-60 140.9-104 30-34.1 77.6-80.1 77.6-124.6zm-175.9 35.1v71.1c0 1.8-1.4 3.2-3.2 3.2h-11.4c-1.1 0-2.1-.6-2.6-1.3l-32.6-44v42.2c0 1.8-1.4 3.2-3.2 3.2h-11.4c-1.8 0-3.2-1.4-3.2-3.2v-71.1c0-1.8 1.4-3.2 3.2-3.2H219c1 0 2.1.5 2.6 1.4l32.6 44v-42.2c0-1.8 1.4-3.2 3.2-3.2h11.4c1.8-.1 3.3 1.4 3.3 3.1zm-82-3.2h-11.4c-1.8 0-3.2 1.4-3.2 3.2v71.1c0 1.8 1.4 3.2 3.2 3.2h11.4c1.8 0 3.2-1.4 3.2-3.2v-71.1c0-1.7-1.4-3.2-3.2-3.2zm-27.5 59.6h-31.1v-56.4c0-1.8-1.4-3.2-3.2-3.2h-11.4c-1.8 0-3.2 1.4-3.2 3.2v71.1c0 .9.3 1.6.9 2.2.6.5 1.3.9 2.2.9h45.7c1.8 0 3.2-1.4 3.2-3.2v-11.4c0-1.7-1.4-3.2-3.1-3.2zM332.1 201h-45.7c-1.7 0-3.2 1.4-3.2 3.2v71.1c0 1.7 1.4 3.2 3.2 3.2h11.4c1.8 0 3.2-1.4 3.2-3.2v-20h31.1c1.8 0 3.2-1.4 3.2-3.2v-11.4c0-1.8-1.4-3.2-3.2-3.2h-31.1v-14h31.1c1.8 0 3.2-1.4 3.2-3.2v-11.4c-.1-1.7-1.5-3.1-3.2-3.1z"/>
      </svg>
    </a>
  </div>`;

if (content.match(containerRegex)) {
    content = content.replace(containerRegex, newContainer);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Updated sticky buttons successfully.");
} else {
    console.log("Could not find container regex.");
}
