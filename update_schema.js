const fs = require('fs');
let schemaStr = fs.readFileSync('frontend/src/product_schema_master.json', 'utf8');
let schema = JSON.parse(schemaStr);

// อัปเดตคำอธิบายและโครงสร้าง Variants เป็นแบบใหม่ (Two-Tier)
schema["_comment_8_Variants"] = "8. ตัวเลือกสินค้า (Variants) - ระบบ 2 มิติ ต้องมีฟิลด์ size และ package คู่กันเสมอ";
schema.variants = [
  { "size": "2.0 mm", "package": "1 ห่อ (1 กก.)", "price": 370.00, "original_price": null, "stock": 10 },
  { "size": "2.6 mm", "package": "1 ห่อ (1 กก.)", "price": 305.00, "original_price": 350.00, "stock": 100 }
];

// ลบระบบ Packages แบบเก่าทิ้งถาวร
delete schema["_comment_9_Packages"];
delete schema.packages;

// เลื่อนตัวเลขข้อถัดไปขึ้นมา
schema["_comment_9_Specs"] = schema["_comment_10_Specs"].replace("10.", "9.");
delete schema["_comment_10_Specs"];

schema["_comment_10_RichContent"] = schema["_comment_11_RichContent"].replace("11.", "10.");
delete schema["_comment_11_RichContent"];

fs.writeFileSync('frontend/src/product_schema_master.json', JSON.stringify(schema, null, 2), 'utf8');
console.log("Master schema updated successfully!");
