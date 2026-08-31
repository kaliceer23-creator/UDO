const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const oldSocialBlock = `          <!-- ติดตามเรา -->
          <h3 class="font-bold text-gray-900 text-[14px] mb-3">ติดตามเรา</h3>
          <div class="flex items-center gap-2 mb-8">
            <a href="#" class="hover:opacity-80 transition-opacity"><img src="/images/footer-logos/facebook.webp" alt="Facebook" class="w-8 h-8 md:w-9 md:h-9 object-contain" /></a>
            <a href="#" class="hover:opacity-80 transition-opacity"><img src="/images/footer-logos/instagram.webp" alt="Instagram" class="w-8 h-8 md:w-9 md:h-9 object-contain" /></a>
            <a href="#" class="hover:opacity-80 transition-opacity"><img src="/images/footer-logos/line.webp" alt="Line" class="w-8 h-8 md:w-9 md:h-9 object-contain" /></a>
            <a href="#" class="hover:opacity-80 transition-opacity"><img src="/images/footer-logos/tiktok.webp" alt="TikTok" class="w-8 h-8 md:w-9 md:h-9 object-contain" /></a>
            <a href="#" class="hover:opacity-80 transition-opacity"><img src="/images/footer-logos/x.webp" alt="X" class="w-8 h-8 md:w-9 md:h-9 object-contain" /></a>
            <a href="#" class="hover:opacity-80 transition-opacity block w-8 h-8 md:w-9 md:h-9">
              <svg class="w-full h-full text-[#FF0000]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="12" fill="currentColor"/>
                <path d="M16.5 12l-6 3.5v-7l6 3.5z" fill="white"/>
              </svg>
            </a>
          </div>`;

const newSocialBlock = `          <!-- ติดตามเรา -->
          <h3 class="font-bold text-gray-900 text-[14px] mb-3">ติดตามเรา</h3>
          <div class="flex items-center gap-2.5 md:gap-3 mb-8">
            <a href="#" class="hover:opacity-80 transition-opacity"><img src="/images/footer-logos/facebook.webp" alt="Facebook" class="w-10 h-10 md:w-11 md:h-11 object-contain" /></a>
            <a href="#" class="hover:opacity-80 transition-opacity"><img src="/images/footer-logos/instagram.webp" alt="Instagram" class="w-10 h-10 md:w-11 md:h-11 object-contain" /></a>
            <a href="#" class="hover:opacity-80 transition-opacity"><img src="/images/footer-logos/line.webp" alt="Line" class="w-10 h-10 md:w-11 md:h-11 object-contain" /></a>
            <a href="#" class="hover:opacity-80 transition-opacity"><img src="/images/footer-logos/tiktok.webp" alt="TikTok" class="w-10 h-10 md:w-11 md:h-11 object-contain" /></a>
            <a href="#" class="hover:opacity-80 transition-opacity"><img src="/images/footer-logos/x.webp" alt="X" class="w-10 h-10 md:w-11 md:h-11 object-contain" /></a>
            <a href="#" class="hover:opacity-80 transition-opacity"><img src="/images/footer-logos/youtube.webp" alt="YouTube" class="w-10 h-10 md:w-11 md:h-11 object-contain" /></a>
          </div>`;

if (content.includes(oldSocialBlock)) {
    content = content.replace(oldSocialBlock, newSocialBlock);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Social icons updated.");
} else {
    console.log("Could not find the old social block.");
}
