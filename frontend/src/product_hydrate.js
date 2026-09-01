// product_hydrate.js
// This file simulates fetching the JSON data and hydrating the DOM

export function hydrateProduct() {
  const geminiData = {
    "name": "ลวดเชื่อมสเตนเลสไฟฟ้า GEMINI 308L (E308L-16)",
    "brand": "GEMINI",
    "sku": "GEM-308L-26",
    "category": "ลวดเชื่อมสเตนเลส",
    "price": "305.00",
    "unit": "กก.",
    "description": "ลวดเชื่อมเจมินี่ 308L เป็นลวดเชื่อมสเตนเลสออสเทนนิติก สารพอกหุ้มประเภทไทเทเนีย มีธาตุคาร์บอนผสมในปริมาณต่ำ ใช้สำหรับงานเชื่อมสเตนเลสทั่วไป สามารถเชื่อมเหล็กที่มีส่วนผสมของธาตุโครเมียม-นิเกิล แนวเชื่อมทนต่อการกัดกร่อนได้ดี ในสภาวะอากาศปกติ และทนต่อการกัดกร่อนของกรดอ่อนๆได้ เหมาะกับงานเชื่อมสเตนเลส AISI 302, 304, 304L และ 304LN",
    "image": "https://via.placeholder.com/600x600/f5f5f5/9ca3af?text=GEMINI+308L" // Placeholder until user uploads image
  };

  setTimeout(() => {
    // 1. Update Texts
    const titleEl = document.getElementById('product-name');
    if(titleEl) titleEl.innerText = geminiData.name;

    const brandEl = document.getElementById('product-brand');
    if(brandEl) brandEl.innerText = geminiData.brand;

    const skuEl = document.getElementById('product-sku');
    if(skuEl) skuEl.innerText = `SKU: ${geminiData.sku}`;

    const priceEl = document.getElementById('product-price');
    if(priceEl) priceEl.innerText = `฿${geminiData.price}`;

    const unitEl = document.getElementById('product-unit');
    if(unitEl) unitEl.innerText = `/${geminiData.unit}`;

    const descEl = document.getElementById('product-desc');
    if(descEl) descEl.innerText = geminiData.description;

    const bNameEl = document.getElementById('breadcrumb-name');
    if(bNameEl) bNameEl.innerText = geminiData.name;

    const bCatEl = document.getElementById('breadcrumb-category');
    if(bCatEl) bCatEl.innerText = geminiData.category;

    // 2. Update Image
    const imgEl = document.getElementById('product-image');
    if(imgEl) {
      imgEl.src = geminiData.image;
    }
  }, 100); // 0.1s delay to simulate load
}
