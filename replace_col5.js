const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const oldCol5Start = `        <!-- Col 5 (เดิม Col 4) -->
        <div class="flex flex-col">
          <h3 class="font-bold text-gray-900 text-[14px] mb-3">Verified by</h3>`;
          
const oldCol5End = `            <div class="bg-[#FFCC00] text-[#D40511] font-black text-sm px-1.5 py-0.5 tracking-tight italic">DHL</div>
          </div>
        </div>`;

const startIndex = content.indexOf(oldCol5Start);
const endIndex = content.indexOf(oldCol5End) + oldCol5End.length;

if (startIndex !== -1 && content.indexOf(oldCol5End) !== -1) {
    const newCol5 = `        <!-- Col 5 (เดิม Col 4) -->
        <div class="flex flex-col">
          <!-- Verified By -->
          <h3 class="font-bold text-gray-900 text-[14px] mb-3">Verified by</h3>
          <div class="flex items-center gap-3 mb-8">
            <img src="/images/footer-logos/dbd.png" alt="DBD Registered" class="h-8 md:h-10 w-auto object-contain" />
            <img src="/images/footer-logos/mastercard.png" alt="Mastercard" class="h-6 md:h-8 w-auto object-contain" />
            <img src="/images/footer-logos/visa.png" alt="Visa" class="h-4 md:h-5 w-auto object-contain" />
          </div>

          <!-- ติดตามเรา -->
          <h3 class="font-bold text-gray-900 text-[14px] mb-3">ติดตามเรา</h3>
          <div class="flex items-center gap-2.5 mb-8">
            <a href="#" class="hover:opacity-80 transition-opacity"><img src="/images/footer-logos/facebook.webp" alt="Facebook" class="w-7 h-7 md:w-8 md:h-8 object-contain" /></a>
            <a href="#" class="hover:opacity-80 transition-opacity"><img src="/images/footer-logos/instagram.webp" alt="Instagram" class="w-7 h-7 md:w-8 md:h-8 object-contain" /></a>
            <a href="#" class="hover:opacity-80 transition-opacity"><img src="/images/footer-logos/line.webp" alt="Line" class="w-7 h-7 md:w-8 md:h-8 object-contain" /></a>
            <a href="#" class="hover:opacity-80 transition-opacity"><img src="/images/footer-logos/tiktok.webp" alt="TikTok" class="w-7 h-7 md:w-8 md:h-8 object-contain" /></a>
            <a href="#" class="hover:opacity-80 transition-opacity"><img src="/images/footer-logos/x.webp" alt="X" class="w-7 h-7 md:w-8 md:h-8 object-contain" /></a>
            <a href="#" class="w-7 h-7 md:w-8 md:h-8 bg-[#FF0000] rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity"><svg class="w-3.5 h-3.5 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.015 3.015 0 00-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 002.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
          </div>

          <!-- บริการจัดส่ง -->
          <h3 class="font-bold text-gray-900 text-[14px] mb-3">บริการจัดส่ง</h3>
          <div class="flex items-center gap-4">
            <img src="/images/footer-logos/kerry.webp" alt="Kerry Express" class="h-5 md:h-6 w-auto object-contain" />
            <img src="/images/footer-logos/dhl.webp" alt="DHL" class="h-4 md:h-5 w-auto object-contain" />
            <img src="/images/footer-logos/thai-post.png" alt="Thailand Post" class="h-6 md:h-8 w-auto object-contain" />
          </div>
        </div>`;

    content = content.substring(0, startIndex) + newCol5 + content.substring(endIndex);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Replaced Col 5 with uploaded images.");
} else {
    console.log("Could not find the target text limits.");
}
