const fs = require('fs');
let html = fs.readFileSync('frontend/product.html', 'utf8');

const regex = /<div class="w-full flex flex-col text-\[16px\] text-\[\#252525\]">[\s\S]*?<\/div>\n        <\/div>\n      <\/div>\n      <!-- End of Specs Section -->/;

const replacement = `<div id="product-specs-container" class="w-full flex flex-col text-[16px] text-[#252525]">
            <!-- JS will inject specs here -->
          </div>
        </div>
      </div>
      <!-- End of Specs Section -->`;

html = html.replace(regex, replacement);

fs.writeFileSync('frontend/product.html', html, 'utf8');
console.log("Replaced Specs Container");
