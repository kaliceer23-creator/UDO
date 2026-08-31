const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const socialBlockRegex = /\s*<h3 class="font-bold text-gray-900 text-\[14px\] mb-3">ติดตามเรา<\/h3>\s*<div class="flex items-center gap-2 mb-8">\s*<a href="#" class="w-7 h-7 bg-\[#1877F2\][\s\S]*?<\/svg><\/a>\s*<\/div>/;

const match = content.match(socialBlockRegex);

if (match) {
  const socialBlock = match[0];
  
  // Remove from Col 1
  content = content.replace(socialBlockRegex, '');
  
  // Inject back to Col 5 before บริการจัดส่ง
  const targetLocation = `<h3 class="font-bold text-gray-900 text-[14px] mb-2">บริการจัดส่ง</h3>`;
  const formattedSocialBlock = `
          <h3 class="font-bold text-gray-900 text-[14px] mb-3">ติดตามเรา</h3>
          <div class="flex items-center gap-2 mb-8">
            <a href="#" class="w-7 h-7 bg-[#1877F2] rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity"><svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg></a>
            <a href="#" class="w-7 h-7 rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity" style="background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);"><svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.181a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/></svg></a>
            <a href="#" class="w-7 h-7 bg-[#00B900] rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity font-bold text-[12px]">L</a>
            <a href="#" class="w-7 h-7 bg-black rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity"><svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.78-1.15 5.54-3.33 7.37-1.92 1.62-4.52 2.27-6.94 1.83-2.93-.53-5.32-2.73-6.19-5.61-.83-2.72-.11-5.83 1.81-7.91 1.71-1.85 4.32-2.77 6.81-2.5v4.06c-1.37-.15-2.8.21-3.79 1.14-.99.93-1.45 2.37-1.19 3.7.25 1.28 1.25 2.35 2.5 2.73 1.65.5 3.51-.01 4.54-1.35.83-1.07 1.22-2.45 1.19-3.79-.06-4.99-.03-9.98-.03-14.97-.01-.48.01-.96 0-1.44z"/></svg></a>
            <a href="#" class="w-7 h-7 bg-[#FF0000] rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity"><svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.015 3.015 0 00-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 002.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
          </div>\n\n          ` + targetLocation;
          
  content = content.replace(targetLocation, formattedSocialBlock);
  
  fs.writeFileSync('frontend/src/main.js', content, 'utf8');
  console.log('Reverted "Follow Us" block successfully.');
} else {
  console.log('Could not find the "Follow Us" block.');
}
