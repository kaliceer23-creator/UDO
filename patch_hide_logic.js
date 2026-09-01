const fs = require('fs');
let js = fs.readFileSync('frontend/src/product_hydrate.js', 'utf8');

// The logic inside renderSizeButtons
const oldSizeRender = `const renderSizeButtons = () => {
      const container = document.getElementById('size-buttons');
      if(!container) return;
      container.innerHTML = uniqueSizes.map(sizeStr => {`;

const newSizeRender = `const renderSizeButtons = () => {
      const container = document.getElementById('size-buttons');
      const wrapper = document.getElementById('size-section-wrapper');
      
      // Auto-hide size section if it's not a wire or only has a generic "มาตรฐาน" size
      if (uniqueSizes.length === 1 && (uniqueSizes[0] === "มาตรฐาน" || uniqueSizes[0] === "" || uniqueSizes[0] === "N/A")) {
         if (wrapper) wrapper.style.display = 'none';
      } else {
         if (wrapper) wrapper.style.display = 'block';
      }

      if(!container) return;
      container.innerHTML = uniqueSizes.map(sizeStr => {`;

js = js.replace(oldSizeRender, newSizeRender);

const oldPkgRender = `const renderPackageButtons = () => {
      const container = document.getElementById('package-buttons');
      if(!container) return;
      container.innerHTML = uniquePackages.map(pkgStr => {`;

const newPkgRender = `const renderPackageButtons = () => {
      const container = document.getElementById('package-buttons');
      const wrapper = document.getElementById('package-section-wrapper');
      
      // We can also rename the label dynamically if it's not wire
      const pkgLabelTop = document.querySelector('#package-section-wrapper span:first-child');
      if (pkgLabelTop && uniquePackages.length === 1 && uniquePackages[0].includes("ตัว")) {
         pkgLabelTop.innerText = "รูปแบบ (บรรจุ)";
      } else if (pkgLabelTop) {
         pkgLabelTop.innerText = "บรรจุ"; // fallback default
      }

      // If we only have 1 package option and it's "1 ตัว", we might want to hide it too for a cleaner UI, but let's just keep it or let user decide.
      // We will hide the package block ONLY if instructed, but for now we'll just rename it if it's pieces.

      if(!container) return;
      container.innerHTML = uniquePackages.map(pkgStr => {`;

js = js.replace(oldPkgRender, newPkgRender);

fs.writeFileSync('frontend/src/product_hydrate.js', js, 'utf8');
console.log("Patched dynamic hiding logic into JS");
