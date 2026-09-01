const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const regex = /<!-- Floating LINE Button \(Bottom Right\) -->[\s\S]*?<\/a>/;

const newButton = `<!-- Floating LINE Button (Bottom Right) -->
    <a href="#" class="w-[54px] h-[54px] md:w-[60px] md:h-[60px] bg-[#E12427] rounded-full border-[3px] border-white shadow-[0_6px_16px_rgba(225,36,39,0.15)] flex items-center justify-center hover:scale-110 hover:shadow-[0_8px_20px_rgba(225,36,39,0.2)] transition-all duration-300 cursor-pointer relative">
      <div class="relative w-full h-full flex items-center justify-center">
        <!-- White Speech Bubble -->
        <svg viewBox="0 0 24 24" class="w-[34px] h-[34px] md:w-[38px] md:h-[38px] text-white" fill="currentColor">
          <path d="M12 2.5C6.48 2.5 2 6.1 2 10.5c0 2.45 1.35 4.63 3.48 5.97.44.28.53.82.39 1.31l-.42 1.59c-.11.41.34.73.69.49 1.32-.89 3.75-2.56 5.08-3.2.26-.13.54-.19.82-.19h.26C16.92 16.47 22 13.08 22 10.5 22 6.1 17.52 2.5 12 2.5z"/>
        </svg>
        <!-- Centered LINE text -->
        <span class="absolute top-[43%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-black text-[#E12427] text-[10.5px] md:text-[11.5px] tracking-tight">LINE</span>
      </div>
    </a>`;

if (content.match(regex)) {
    content = content.replace(regex, newButton);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Updated LINE button alignment.");
} else {
    console.log("Could not find the target HTML block.");
}
