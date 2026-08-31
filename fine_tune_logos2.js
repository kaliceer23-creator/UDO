const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const oldCol5 = `          <!-- บริการจัดส่ง -->
          <h3 class="font-bold text-gray-900 text-[14px] mb-3">บริการจัดส่ง</h3>
          <div class="flex items-center gap-3.5">
            <img src="/images/footer-logos/kerry.webp" alt="Kerry Express" class="h-4 md:h-[20px] w-auto object-contain" />
            <img src="/images/footer-logos/dhl.webp" alt="DHL" class="h-3.5 md:h-[16px] w-auto object-contain" />
            <img src="/images/footer-logos/thai-post.png" alt="Thailand Post" class="h-5 md:h-[26px] w-auto object-contain" />
          </div>`;

const newCol5 = `          <!-- บริการจัดส่ง -->
          <h3 class="font-bold text-gray-900 text-[14px] mb-3">บริการจัดส่ง</h3>
          <div class="flex items-center gap-4">
            <img src="/images/footer-logos/kerry.webp" alt="Kerry Express" class="h-5 md:h-[24px] w-auto object-contain" />
            <img src="/images/footer-logos/dhl.webp" alt="DHL" class="h-4 md:h-[20px] w-auto object-contain" />
            <img src="/images/footer-logos/thai-post.png" alt="Thailand Post" class="h-6 md:h-[30px] w-auto object-contain" />
          </div>`;

if (content.includes(oldCol5)) {
    content = content.replace(oldCol5, newCol5);
    
    // Also update Visa
    content = content.replace(
        '<img src="/images/footer-logos/visa.png" alt="Visa" class="h-3.5 md:h-[18px] w-auto object-contain" />',
        '<img src="/images/footer-logos/visa.png" alt="Visa" class="h-4 md:h-[22px] w-auto object-contain" />'
    );
    
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Fine tuned shipping and Visa.");
} else {
    console.log("Could not find Shipping block.");
}
