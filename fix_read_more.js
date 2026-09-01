const fs = require('fs');
let js = fs.readFileSync('frontend/src/product.js', 'utf8');

const oldLogic = `      if (isExpanded) {
        // Collapse
        container.style.maxHeight = '500px';
        fade.classList.remove('h-[80px]', 'from-transparent', 'via-transparent');
        fade.classList.add('h-[200px]', 'from-white', 'via-white/80');
        text.innerText = 'อ่านรายละเอียดเพิ่มเติม';
        icon.classList.remove('rotate-180');
      } else {
        // Expand
        container.style.maxHeight = container.scrollHeight + 'px';
        fade.classList.remove('h-[200px]', 'from-white', 'via-white/80');
        fade.classList.add('h-[80px]', 'from-transparent', 'via-transparent');
        // After transition, set to none so it responds to window resize
        setTimeout(() => {
          if(container.style.maxHeight !== '500px') {
             container.style.maxHeight = 'none';
          }
        }, 500);
      }`;

const newLogic = `      if (isExpanded) {
        // Collapse
        container.style.maxHeight = '500px';
        fade.classList.remove('h-[80px]', 'from-transparent', 'via-transparent');
        fade.classList.add('h-[200px]', 'from-white', 'via-white/80');
        text.innerText = 'อ่านรายละเอียดเพิ่มเติม';
        icon.classList.remove('rotate-180');
      } else {
        // Expand
        container.style.maxHeight = container.scrollHeight + 'px';
        fade.classList.remove('h-[200px]', 'from-white', 'via-white/80');
        fade.classList.add('h-[80px]', 'from-transparent', 'via-transparent');
        text.innerText = 'ย่อรายละเอียด';
        icon.classList.add('rotate-180');
        // After transition, set to none so it responds to window resize
        setTimeout(() => {
          if(container.style.maxHeight !== '500px') {
             container.style.maxHeight = 'none';
          }
        }, 500);
      }`;

js = js.replace(oldLogic, newLogic);
fs.writeFileSync('frontend/src/product.js', js, 'utf8');
console.log("Fixed read more button text and icon toggle");
