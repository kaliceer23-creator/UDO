const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

// User Icon: change from 1.5 to 1.2
content = content.replace(
  '<svg xmlns="http://www.w3.org/2000/svg" class="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">',
  '<svg xmlns="http://www.w3.org/2000/svg" class="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">'
);

// Heart Icon: change from 1.5 to 1.2
content = content.replace(
  '<svg xmlns="http://www.w3.org/2000/svg" class="w-[25px] h-[25px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">',
  '<svg xmlns="http://www.w3.org/2000/svg" class="w-[25px] h-[25px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">'
);

// Cart Icon: change from 1.5 to 1.2
content = content.replace(
  '<svg xmlns="http://www.w3.org/2000/svg" class="w-[26px] h-[26px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">',
  '<svg xmlns="http://www.w3.org/2000/svg" class="w-[26px] h-[26px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">'
);

fs.writeFileSync('frontend/src/main.js', content, 'utf8');
console.log("Stroke widths made thin (1.2)");
