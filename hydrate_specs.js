const fs = require('fs');
let js = fs.readFileSync('frontend/src/product_hydrate.js', 'utf8');

const specsLogic = `
    // --- Logic สเปคสินค้าตาราง 12 บรรทัด ---
    // ข้อมูลจำลองตาราง
    geminiData.specsTable = [
      { key: "ส่วนผสมทางเคมี", value: "C: 0.01%, Mn: 0.70%, Si: 0.60%, Ni: 10.0%, Cr: 19.3%" },
      { key: "คุณสมบัติทางกล", value: "Yield stress: 520 N/mm², Tensile strength: 590 N/mm², Elongation: 40%" },
      { key: "กระแสไฟฟ้าที่ใช้เชื่อม", value: "AC หรือ DC±" },
      { key: "กระแสไฟ 2.0x300mm", value: "30-50 A" },
      { key: "กระแสไฟ 2.6x300mm", value: "50-75 A" },
      { key: "กระแสไฟ 3.2x350mm", value: "75-110 A" },
      { key: "กระแสไฟ 4.0x350mm", value: "110-150 A" },
      { key: "กระแสไฟ 5.0x350mm", value: "140-190 A" },
      { key: "สีแต้มปลายลวด", value: "เหลือง" },
      { key: "สีแต้มข้างลวด", value: "ฟ้า" },
      { key: "ชื่อพิมพ์", value: "AWS E308L-16" },
      { key: "มาตรฐานรับรอง", value: "LR, มอก. 730-2530" },
      { key: "ท่าเชื่อม", value: "ท่าราบ, ท่าขนานนอน, ท่าเชื่อมขึ้น, ท่าเชื่อมเหนือศีรษะ" }
    ];

    const specsContainer = document.getElementById('product-specs-container');
    if(specsContainer) {
      specsContainer.innerHTML = geminiData.specsTable.map((row, index) => {
        // บรรทัดแรกมนขอบบน บรรทัดสุดท้ายมนขอบล่าง
        const roundedClass = index === 0 ? "rounded-t-sm" : index === geminiData.specsTable.length - 1 ? "rounded-b-sm" : "";
        // สลับสีพื้นหลัง
        const bgClass = index % 2 === 0 ? "bg-white" : "bg-[#F8F8F8]";
        
        return \`<div class="flex \${bgClass} py-2 px-6 \${roundedClass}">
          <div class="w-[40%] md:w-[30%]">\${row.key}</div>
          <div class="w-[60%] md:w-[70%]">\${row.value}</div>
        </div>\`;
      }).join('');
    }
`;

// Insert it right before "// State ปัจจุบันที่ถูกเลือก"
js = js.replace('// State ปัจจุบันที่ถูกเลือก', specsLogic + '\n    // State ปัจจุบันที่ถูกเลือก');

fs.writeFileSync('frontend/src/product_hydrate.js', js, 'utf8');
console.log("Added specs logic to hydrate script");
