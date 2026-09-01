const fs = require('fs');
let html = fs.readFileSync('frontend/product.html', 'utf8');

// Headline
html = html.replace(
  '<h3 class="text-[24px] font-semibold text-[#252525] mb-8">\n            เครื่องเล่นเกม Nintendo Switch 2 + Mario Kart World Bundle (TH)\n          </h3>',
  '<h3 id="rich-headline" class="text-[24px] font-semibold text-[#252525] mb-8">\n            เครื่องเล่นเกม Nintendo Switch 2 + Mario Kart World Bundle (TH)\n          </h3>'
);

// Images and Texts
html = html.replace(
  '<img src="/images/bg-welding.jpeg" alt="Product Detail 1" class="w-full h-auto object-cover aspect-[2/1]">',
  '<img id="rich-img-1" src="/images/bg-welding.jpeg" alt="Product Detail 1" class="w-full h-auto object-cover aspect-[2/1]">'
);
html = html.replace(
  '<img src="/images/bg-welding.jpeg" alt="Product Detail 2" class="w-full h-auto object-cover aspect-[2/1]">',
  '<img id="rich-img-2" src="/images/bg-welding.jpeg" alt="Product Detail 2" class="w-full h-auto object-cover aspect-[2/1]">'
);
html = html.replace(
  '<h4 class="text-[19px] font-semibold text-[#252525] mb-4">เมื่อเป็น 2 ทุกอย่างก็ใหม่หมด</h4>',
  '<h4 id="rich-subheadline" class="text-[19px] font-semibold text-[#252525] mb-4">เมื่อเป็น 2 ทุกอย่างก็ใหม่หมด</h4>'
);
html = html.replace(
  '<p class="text-[16px] text-[#252525] leading-relaxed max-w-[800px] mx-auto">\n              New Nintendo Switch พัฒนาขึ้นอีกขั้นเป็น "2" หน้าจอใหญ่ขึ้น สีสันสดใส และลื่นไหล Joy-Con รุ่นใหม่ติดแน่นกับตัวเครื่องด้วยแรงแม่เหล็ก และใช้เป็นเมาส์ได้ สนุกไปกับเกมใหม่ๆ ที่เล่นได้เฉพาะบน Nintendo Switch 2 รวมถึงเล่นเกม Nintendo Switch ได้ด้วย\n            </p>',
  '<p id="rich-desc" class="text-[16px] text-[#252525] leading-relaxed max-w-[800px] mx-auto">\n              New Nintendo Switch พัฒนาขึ้นอีกขั้นเป็น "2" หน้าจอใหญ่ขึ้น สีสันสดใส และลื่นไหล Joy-Con รุ่นใหม่ติดแน่นกับตัวเครื่องด้วยแรงแม่เหล็ก และใช้เป็นเมาส์ได้ สนุกไปกับเกมใหม่ๆ ที่เล่นได้เฉพาะบน Nintendo Switch 2 รวมถึงเล่นเกม Nintendo Switch ได้ด้วย\n            </p>'
);
html = html.replace(
  '<img src="/images/bg-welding.jpeg" alt="Product Detail 3" class="w-full h-auto object-cover aspect-[2/1]">',
  '<img id="rich-img-3" src="/images/bg-welding.jpeg" alt="Product Detail 3" class="w-full h-auto object-cover aspect-[2/1]">'
);

fs.writeFileSync('frontend/product.html', html, 'utf8');
console.log("Injected Rich Content IDs");
