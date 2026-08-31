const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

// 1. User Icon: currently 1.5, let's keep it 1.5. 
// <svg xmlns="http://www.w3.org/2000/svg" class="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">

// 2. Heart Icon: change from 1.6 to 1.5
content = content.replace(
  '<svg xmlns="http://www.w3.org/2000/svg" class="w-[25px] h-[25px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6">',
  '<svg xmlns="http://www.w3.org/2000/svg" class="w-[25px] h-[25px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">'
);

// 3. Cart Icon: change from 1.2 to 1.5
content = content.replace(
  '<svg xmlns="http://www.w3.org/2000/svg" class="w-[26px] h-[26px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">',
  '<svg xmlns="http://www.w3.org/2000/svg" class="w-[26px] h-[26px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">'
);

fs.writeFileSync('frontend/src/main.js', content, 'utf8');
console.log("Stroke widths unified to 1.5");
