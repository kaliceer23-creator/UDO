const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

// Step 1: Update Left Sidebar
// Add group/sidebar to the container
content = content.replace(
  '<div class="w-[280px] bg-white border-r border-gray-200 overflow-y-auto custom-scrollbar py-6 pr-4 pl-4 md:pl-8 lg:pl-12">',
  '<div class="w-[280px] bg-white border-r border-gray-200 overflow-y-auto custom-scrollbar py-6 pr-4 pl-4 md:pl-8 lg:pl-12 group/sidebar">'
);

// Update First Item
const firstItemOld = '<a href="#" class="flex items-center justify-between px-4 py-2.5 mb-1.5 bg-brand-green text-white font-semibold text-[16px] rounded-lg">\n          <span class="flex items-center gap-2">🔥 โปรโมชั่นพิเศษ</span>\n          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>\n        </a>';
const firstItemNew = `<a href="#" class="flex items-center justify-between px-4 py-2.5 mb-1.5 font-semibold text-[16px] rounded-lg transition-colors bg-brand-green text-white group-hover/sidebar:bg-transparent group-hover/sidebar:text-[#252525] hover:!bg-brand-green hover:!text-white group">
          <span class="flex items-center gap-2">🔥 โปรโมชั่นพิเศษ</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-white group-hover/sidebar:text-gray-400 hover:!text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
        </a>`;
content = content.replace(firstItemOld, firstItemNew);

// Update other items: change hover:bg-gray-100 to hover:bg-brand-green hover:text-white
content = content.replace(/class="flex items-center justify-between px-4 py-2.5 mb-1.5 text-\[#252525\] hover:bg-gray-100 font-normal text-\[16px\] rounded-lg transition-colors"/g, 
                          'class="flex items-center justify-between px-4 py-2.5 mb-1.5 text-[#252525] hover:bg-brand-green hover:text-white font-normal text-[16px] rounded-lg transition-colors group"');
                          
// Update the SVG arrow inside the other items to turn white on hover
content = content.replace(/<svg xmlns="http:\/\/www.w3.org\/2000\/svg" class="w-4 h-4 text-gray-400" fill="none"/g, 
                          '<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="none"');


// Step 2: Update Right Side headers to be links
// Find all <h3> inside the right content area and turn them into <a> tags with hover
// We only want to target the headers inside the mega menu.
// The headers look like: <h3 class="text-[#252525] font-semibold text-[16px] mb-3">...</h3>
content = content.replace(/<h3 class="text-\[#252525\] font-semibold text-\[16px\] mb-3">([^<]+)<\/h3>/g, 
                          '<a href="#" class="block text-[#252525] font-semibold text-[16px] mb-3 hover:text-brand-red transition-colors">$1</a>');

fs.writeFileSync('frontend/src/main.js', content, 'utf8');
console.log("Mega Menu updated successfully.");
