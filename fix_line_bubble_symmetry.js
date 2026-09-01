const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const regex = /<!-- Floating LINE Button \(Bottom Right\) -->[\s\S]*?<\/a>/;

const newButton = `<!-- Floating LINE Button (Bottom Right) -->
    <a href="#" class="w-[54px] h-[54px] md:w-[60px] md:h-[60px] bg-[#E12427] rounded-full border-[3px] border-white shadow-[0_6px_16px_rgba(225,36,39,0.15)] flex items-center justify-center hover:scale-110 hover:shadow-[0_8px_20px_rgba(225,36,39,0.2)] transition-all duration-300 cursor-pointer relative">
      <div class="relative w-full h-full flex items-center justify-center">
        <!-- Mathematically Perfect Ellipse Speech Bubble -->
        <svg viewBox="0 0 24 24" class="w-[34px] h-[34px] md:w-[38px] md:h-[38px] text-white" fill="currentColor">
          <path d="M22 10.5C22 6.36 17.52 3 12 3S2 6.36 2 10.5c0 2.37 1.34 4.48 3.44 5.82l-.8 2.6a.5.5 0 0 0 .63.62l3.2-1.3c1.1.36 2.32.56 3.53.56 5.48 0 10-3.36 10-7.5z"/>
        </svg>
        <!-- Centered LINE text with whitespace-nowrap to prevent distortion -->
        <span class="absolute top-[44%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-black text-[#E12427] text-[10px] md:text-[11.5px] tracking-tight whitespace-nowrap">LINE</span>
      </div>
    </a>`;

if (content.match(regex)) {
    content = content.replace(regex, newButton);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Updated LINE button to perfect symmetry.");
} else {
    console.log("Could not find the target HTML block.");
}
