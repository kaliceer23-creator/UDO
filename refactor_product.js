const fs = require('fs');

let productJs = fs.readFileSync('frontend/src/product.js', 'utf8');

// 1. Extract HTML String
const htmlStartIndex = productJs.indexOf('document.querySelector(\'#app\').innerHTML = `');
const htmlStartMarkerLen = 'document.querySelector(\'#app\').innerHTML = `'.length;
const htmlEndIndex = productJs.indexOf('`;', htmlStartIndex);

let rawHtml = productJs.substring(htmlStartIndex + htmlStartMarkerLen, htmlEndIndex);

// 2. Replace Nav
// Start: <!-- Mega Menu Overlay -->
// End: right before <!-- 3. พื้นที่เนื้อหาหลัก (Main Content) -->
const navStartIndex = rawHtml.indexOf('<!-- Mega Menu Overlay -->');
const mainContentIndex = rawHtml.indexOf('<!-- 3. พื้นที่เนื้อหาหลัก (Main Content) -->');
if(navStartIndex !== -1 && mainContentIndex !== -1) {
    rawHtml = rawHtml.substring(0, navStartIndex) + 
              '  <!-- 1. Nav Component (โหลดจากไฟล์ศูนย์รวม) -->\n  <load src="./src/components/nav.html" />\n\n  ' + 
              rawHtml.substring(mainContentIndex);
}

// 3. Replace Footer, Floating Buttons, Dock
// Start: <footer
// End: End of the HTML string
const footerStartIndex = rawHtml.lastIndexOf('<footer');
if (footerStartIndex !== -1) {
    rawHtml = rawHtml.substring(0, footerStartIndex) + 
              '  <!-- 4. Footer & Floating UI (โหลดจากไฟล์ศูนย์รวม) -->\n' +
              '  <load src="./src/components/footer.html" />\n' +
              '  <load src="./src/components/floating-buttons.html" />\n' +
              '  <load src="./src/components/dock.html" />\n';
}

// 4. Update Product Cards in Similar Products (Related Products Section)
// We look for <!-- Related Products Section (BaNANA Style Slider) -->
// We want to clear out the hardcoded <a>...</a> cards inside the scroll container, 
// and leave it empty for ProductCard.js to populate.
// Wait, doing this via regex might be brittle. I will just leave the user's hardcoded cards for now, 
// OR I can use a simple replace if I can find the container. 
// The user's exact design has a slider. If I replace it with CSS Grid, it breaks their slider.
// Let's NOT touch the Similar Products cards inside the slider just yet to be 100% safe on their layout. 
// We will just do Nav and Footer first to fulfill step 1 & 2 safely as requested.

// 5. Build product.html
const productHtmlTemplate = `<!doctype html>
<html lang="th">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>รายละเอียดสินค้า - UDO</title>
    <!-- Prompt Font for Windows fallback -->
    <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body class="bg-white font-['Prompt',sans-serif] antialiased text-gray-900 selection:bg-[#5EBB1E] selection:text-white pb-[80px] md:pb-0">
    <div id="app">
${rawHtml}
    </div>
    <script type="module" src="/src/product.js"></script>
  </body>
</html>`;

fs.writeFileSync('frontend/product.html', productHtmlTemplate, 'utf8');

// 6. Update product.js
// Remove the innerHTML block and the setTimeout wrappers (since HTML is statically loaded now)
let newProductJs = productJs.substring(0, htmlStartIndex) + productJs.substring(htmlEndIndex + 2);

// Remove the setTimeouts that wrapped the logic because elements are now immediately in DOM
newProductJs = newProductJs.replace(/setTimeout\(\(\) => \{/g, '');
newProductJs = newProductJs.replace(/\}, 100\);/g, '');

fs.writeFileSync('frontend/src/product.js', newProductJs, 'utf8');
console.log("Successfully refactored product.html and product.js");
