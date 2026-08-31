const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const oldCol5 = `        <!-- Col 5 -->
        <div class="flex flex-col">
          <!-- Verified By -->
          <h3 class="font-bold text-gray-900 text-[14px] mb-3">Verified by</h3>
          <div class="flex items-center gap-2.5 md:gap-3 mb-8">
            <img src="/images/footer-logos/dbd.png" alt="DBD Registered" class="h-5 md:h-7 w-auto object-contain" />
            <img src="/images/footer-logos/mastercard.png" alt="Mastercard" class="h-4 md:h-5 w-auto object-contain" />
            <img src="/images/footer-logos/visa.png" alt="Visa" class="h-3 md:h-4 w-auto object-contain" />
          </div>

          <!-- ติดตามเรา -->
          <h3 class="font-bold text-gray-900 text-[14px] mb-3">ติดตามเรา</h3>
          <div class="flex items-center gap-2.5 md:gap-3 mb-8">
            <a href="#" class="hover:opacity-80 transition-opacity"><img src="/images/footer-logos/facebook.webp" alt="Facebook" class="w-10 h-10 md:w-11 md:h-11 object-contain" /></a>
            <a href="#" class="hover:opacity-80 transition-opacity"><img src="/images/footer-logos/instagram.webp" alt="Instagram" class="w-10 h-10 md:w-11 md:h-11 object-contain" /></a>
            <a href="#" class="hover:opacity-80 transition-opacity"><img src="/images/footer-logos/line.webp" alt="Line" class="w-10 h-10 md:w-11 md:h-11 object-contain" /></a>
            <a href="#" class="hover:opacity-80 transition-opacity"><img src="/images/footer-logos/tiktok.webp" alt="TikTok" class="w-10 h-10 md:w-11 md:h-11 object-contain" /></a>
            <a href="#" class="hover:opacity-80 transition-opacity"><img src="/images/footer-logos/x.webp" alt="X" class="w-10 h-10 md:w-11 md:h-11 object-contain" /></a>
            <a href="#" class="hover:opacity-80 transition-opacity"><img src="/images/footer-logos/youtube.webp" alt="YouTube" class="w-10 h-10 md:w-11 md:h-11 object-contain" /></a>
          </div>

          <!-- บริการจัดส่ง -->
          <h3 class="font-bold text-gray-900 text-[14px] mb-3">บริการจัดส่ง</h3>
          <div class="flex items-center gap-3">
            <img src="/images/footer-logos/kerry.webp" alt="Kerry Express" class="h-4 md:h-5 w-auto object-contain" />
            <img src="/images/footer-logos/dhl.webp" alt="DHL" class="h-3.5 md:h-[18px] w-auto object-contain" />
            <img src="/images/footer-logos/thai-post.png" alt="Thailand Post" class="h-5 md:h-6 w-auto object-contain" />
          </div>
        </div>`;

const newCol5 = `        <!-- Col 5 -->
        <div class="flex flex-col">
          <!-- Verified By -->
          <h3 class="font-bold text-gray-900 text-[15px] mb-3">Verified by</h3>
          <div class="flex items-center gap-4 md:gap-5 mb-8">
            <img src="/images/footer-logos/dbd.png" alt="DBD Registered" class="h-9 md:h-12 w-auto object-contain" />
            <img src="/images/footer-logos/mastercard.png" alt="Mastercard" class="h-7 md:h-9 w-auto object-contain" />
            <img src="/images/footer-logos/visa.png" alt="Visa" class="h-6 md:h-8 w-auto object-contain" />
          </div>

          <!-- ติดตามเรา -->
          <h3 class="font-bold text-gray-900 text-[15px] mb-3">ติดตามเรา</h3>
          <div class="flex items-center gap-3 md:gap-4 mb-8 flex-wrap">
            <a href="#" class="hover:opacity-80 transition-opacity"><img src="/images/footer-logos/facebook.webp" alt="Facebook" class="w-12 h-12 md:w-14 md:h-14 object-contain" /></a>
            <a href="#" class="hover:opacity-80 transition-opacity"><img src="/images/footer-logos/instagram.webp" alt="Instagram" class="w-12 h-12 md:w-14 md:h-14 object-contain" /></a>
            <a href="#" class="hover:opacity-80 transition-opacity"><img src="/images/footer-logos/line.webp" alt="Line" class="w-12 h-12 md:w-14 md:h-14 object-contain" /></a>
            <a href="#" class="hover:opacity-80 transition-opacity"><img src="/images/footer-logos/tiktok.webp" alt="TikTok" class="w-12 h-12 md:w-14 md:h-14 object-contain" /></a>
            <a href="#" class="hover:opacity-80 transition-opacity"><img src="/images/footer-logos/x.webp" alt="X" class="w-12 h-12 md:w-14 md:h-14 object-contain" /></a>
            <a href="#" class="hover:opacity-80 transition-opacity"><img src="/images/footer-logos/youtube.webp" alt="YouTube" class="w-12 h-12 md:w-14 md:h-14 object-contain" /></a>
          </div>

          <!-- บริการจัดส่ง -->
          <h3 class="font-bold text-gray-900 text-[15px] mb-3">บริการจัดส่ง</h3>
          <div class="flex items-center gap-4 md:gap-6">
            <img src="/images/footer-logos/kerry.webp" alt="Kerry Express" class="h-7 md:h-9 w-auto object-contain" />
            <img src="/images/footer-logos/dhl.webp" alt="DHL" class="h-5 md:h-[26px] w-auto object-contain" />
            <img src="/images/footer-logos/thai-post.png" alt="Thailand Post" class="h-8 md:h-10 w-auto object-contain" />
          </div>
        </div>`;

if (content.includes(oldCol5)) {
    content = content.replace(oldCol5, newCol5);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Enlarged all footer icons heavily.");
} else {
    console.log("Could not find Col 5.");
}
