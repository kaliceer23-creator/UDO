const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const socialBlockRegex = /\s*<h3 class="font-bold text-gray-900 text-\[14px\] mb-3">ติดตามเรา<\/h3>\s*<div class="flex items-center gap-2 mb-8">\s*<a href="#" class="w-7 h-7 bg-\[#1877F2\][\s\S]*?<\/svg><\/a>\s*<\/div>/;

const match = content.match(socialBlockRegex);

if (match) {
  const socialBlock = match[0];
  
  // Remove from original location
  content = content.replace(socialBlockRegex, '');
  
  // Inject into Col 1 right after the logo
  const logoAnchorClose = `          <a href="/" class="shrink-0 mb-4 inline-block hover:opacity-80 transition-opacity">
            <img src="/images/logos/logo.svg" alt="UDO Welding Products" class="h-[42px] md:h-[52px] w-auto object-contain" />
          </a>`;
          
  const replacement = logoAnchorClose + `\n` + socialBlock.replace(/^\s*/, '          ').replace(/\n\s*/g, '\n          ');
  
  content = content.replace(logoAnchorClose, replacement);
  
  fs.writeFileSync('frontend/src/main.js', content, 'utf8');
  console.log('Moved "Follow Us" block successfully.');
} else {
  console.log('Could not find the "Follow Us" block.');
}
