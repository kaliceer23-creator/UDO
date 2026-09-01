const fs = require('fs');
let js = fs.readFileSync('frontend/src/product_hydrate.js', 'utf8');

const richLogic = `
    // --- Logic จัดการ Mockup โซนภาพโปรโมต (Rich Content) ---
    // จำลองข้อมูลมาจาก Database สำหรับโซนโฆษณา
    geminiData.richContent = {
      headline: "ลวดเชื่อมสเตนเลสไฟฟ้า GEMINI 308L คุณภาพมาตรฐานสากล",
      image1: "https://via.placeholder.com/1200x600/e5e7eb/6b7280?text=Mockup+Banner+1+(1200x600)",
      image2: "https://via.placeholder.com/1200x600/e5e7eb/6b7280?text=Mockup+Banner+2+(1200x600)",
      subheadline: "แนวเชื่อมสวยงาม ทนต่อการกัดกร่อนได้อย่างดีเยี่ยม",
      description: "เมื่อเป็นงานเชื่อมสเตนเลส GEMINI 308L คือคำตอบสุดท้าย สามารถเชื่อมเหล็กที่มีส่วนผสมของธาตุโครเมียม-นิเกิล แนวเชื่อมทนต่อการกัดกร่อนได้ดี ในสภาวะอากาศปกติ และทนต่อการกัดกร่อนของกรดอ่อนๆได้ ให้แนวเชื่อมที่เรียบสวย ไม่เกิดตามด",
      image3: "https://via.placeholder.com/1200x600/e5e7eb/6b7280?text=Mockup+Banner+3+(1200x600)"
    };

    const el_rich_headline = document.getElementById('rich-headline');
    if(el_rich_headline) el_rich_headline.innerText = geminiData.richContent.headline;

    const el_rich_img1 = document.getElementById('rich-img-1');
    if(el_rich_img1) el_rich_img1.src = geminiData.richContent.image1;

    const el_rich_img2 = document.getElementById('rich-img-2');
    if(el_rich_img2) el_rich_img2.src = geminiData.richContent.image2;

    const el_rich_subheadline = document.getElementById('rich-subheadline');
    if(el_rich_subheadline) el_rich_subheadline.innerText = geminiData.richContent.subheadline;

    const el_rich_desc = document.getElementById('rich-desc');
    if(el_rich_desc) el_rich_desc.innerText = geminiData.richContent.description;

    const el_rich_img3 = document.getElementById('rich-img-3');
    if(el_rich_img3) el_rich_img3.src = geminiData.richContent.image3;
`;

js = js.replace('// ทำให้ HTML โทรหา JS ได้', richLogic + '\n    // ทำให้ HTML โทรหา JS ได้');

fs.writeFileSync('frontend/src/product_hydrate.js', js, 'utf8');
console.log("Added Rich Content hydration logic");
