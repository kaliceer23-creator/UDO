import{n as e,t}from"./mock_database-B1e0KBVt.js";import{t as n}from"./markdown_parser-DoO8PuNu.js";var r=[{id:`udo-art-cast-iron`,title:`คู่มือวิศวกรรมการซ่อมเหล็กหล่อแตกร้าวและมาตรฐาน AWS`,category:`เทคนิคงานเชื่อมและซ่อมบำรุง`,summary:`แนวทางการควบคุมอุณหภูมิ Interpass การเลือกใช้ลวดเชื่อมนิเกิล ENi-CI กับ ENiFe-CI และเทคนิค Peening เคาะคลายความเค้น`,content:`เหล็กหล่อมีปริมาณคาร์บอนสูง 2-4% ส่งผลให้แนวเชื่อมแข็งเปราะและแตกร้าวซ้ำได้ง่ายมาก การซ่อมแซมจึงต้องใช้ลวดเชื่อมนิเกิลพิเศษ

1. ลวดเชื่อมนิเกิลบริสุทธิ์ Ni 98% (AWS ENi-CI): เช่น GEMINI NI-CAST 98 เนื้อโลหะนิ่ม กลึงแต่งขึ้นรูปง่าย เหมาะกับเสื้อสูบ แคร้งเครื่องยนต์ และเหล็กหล่อสีเทาทั่วไป
2. ลวดเชื่อมนิเกิล-เหล็ก Ni 55% (AWS ENiFe-CI): เช่น GEMINI NI-CAST 55 ให้ความแข็งแรงและทนแรงดึงสูงกว่า เหมาะกับเหล็กหล่อเหนียว (Ductile) และการเชื่อมต่อเหล็กหล่อเข้ากับเหล็กกล้า

ขั้นตอนการทำงานสำคัญ:
- เจาะรูดักรอยร้าวที่ปลายทั้งสองข้างเพื่อหยุดการลาม
- เซาะร่องตัว U หรือ V เพื่อให้ลวดเชื่อมซึมลึก
- อบอุ่นชิ้นงาน 150-300 องศาเซลเซียส เพื่อลดความเครียดทางความร้อน
- เดินแนวเชื่อมสั้นครั้งละ 20-30 มม. แล้วเคาะคลายความเค้นด้วยค้อนหัวมนทันทีขณะรอยเชื่อมยังร้อนแดง
- คลุมผ้ากันไฟให้เย็นตัวช้าๆ ห้ามใช้น้ำหรือลมเป่าให้เย็นเด็ดขาด`,target_problems:[`เหล็กหล่อแตก`,`เสื้อสูบร้าว`,`แคร้งแตก`,`ซ่อมเหล็กหล่อ`,`เชื่อมเหล็กหล่อไม่ให้แตก`,`ลวดเชื่อมเหล็กหล่อ`,`NI-CAST`,`CI-A1`,`CI-A2`],recommended_products:[`GMN9826`,`GMN5526`,`PWMNI5512`,`HDSNCI26`,`HDSNFC26`,`PW100N26`],source:`UDO Engineering Knowledge`,slug:`howtoweldcastiron`,image:`/images/bg-welding.jpeg`,badge:`Verified`},{id:`udo-art-stainless-grades`,title:`คู่มือการเลือกลวดเชื่อมสแตนเลส 308L, 309L และ 316L ตามการใช้งาน`,category:`การเลือกเกรดวัสดุและเคมีโลหะ`,summary:`เจาะลึกความแตกต่างระหว่างลวดเชื่อมสแตนเลสเกรด 308L, 309L และ 316L สำหรับงานอาหาร เคมีภัณฑ์ และงานเชื่อมโลหะต่างชนิด`,content:`ลวดเชื่อมสแตนเลสกลุ่มออสเทนนิติกแต่ละเกรดมีคุณสมบัติเฉพาะตัว:

1. เกรด 308L (E308L): เหมาะสำหรับเชื่อมสแตนเลสทั่วไป เช่น SUS 302, 304, 304L ทนต่อการกัดกร่อนทั่วไป งานท่ออาหาร เครื่องครัว และงานสถาปัตยกรรม
2. เกรด 316L (E316L): ผสมธาตุโมลิบดีนัม Mo 2-3% เพื่อทนการกัดกร่อนจากสารเคมี กรด-ด่าง และไอเกลือทะเล เหมาะกับงานโรงงานปิโตรเคมี ถังกรด และอุตสาหกรรมทางทะเล
3. เกรด 309L (E309L): ออกแบบพิเศษสำหรับเชื่อมต่อโลหะต่างชนิด (Dissimilar Welding) เช่น เชื่อมสแตนเลสเข้ากับเหล็กคาร์บอน (SUS เข้ากับ SS400) มีธาตุผสม Cr-Ni สูงเป็นพิเศษเพื่อป้องกันการแตกร้าวจากการเจือจางของเนื้อเหล็ก`,target_problems:[`ลวดเชื่อมสแตนเลส`,`308L`,`316L`,`309L`,`เชื่อมเหล็กติดกับสแตนเลส`,`งานอาหาร`,`ฟู้ดเกรด`,`ทนสารเคมี`,`ทนน้ำเค็ม`],recommended_products:[`GM308L20`,`GM309L26`,`GM316L26`],source:`UDO Technical Guide`,image:`/images/bg-welding.jpeg`,badge:`AWS Spec`},{id:`udo-art-mma-amperage`,title:`หลักการปรับกระแสไฟเชื่อม (Amperage) และระยะอาร์กในงานเชื่อมไฟฟ้า MMA`,category:`เทคนิคและพารามิเตอร์งานเชื่อม`,summary:`สูตรคำนวณกระแสไฟอย่างง่าย เทคนิคการรักษาระยะอาร์ก และเกณฑ์การฟังเสียงเดินแนวเชื่อมแบบฉีกผ้า`,content:`การปรับกระแสไฟ MMA ขึ้นอยู่กับขนาดเส้นผ่านศูนย์กลางแกนลวดเชื่อมเป็นหลัก

สูตรคิดเร็วหน้างาน:
- กระแสไฟ (Amp) = ขนาดลวด (มม.) x 40 แล้วปรับบวกลบ 10-20 แอมป์ตามความหนาชิ้นงานและท่าเชื่อม

ตารางแนะนำ:
- ลวด 2.0 มม. ใช้ 40-70A (เหล็กหนา 1.5-2.0 มม.)
- ลวด 2.6 มม. ใช้ 60-100A (เหล็กหนา 2.0-3.0 มม.)
- ลวด 3.2 มม. ใช้ 90-140A (เหล็กหนา 3.0-5.0 มม.)
- ลวด 4.0 มม. ใช้ 140-190A (เหล็ก 5 มม. ขึ้นไป)

ระยะอาร์กที่ดีที่สุด: ควรเท่ากับขนาดเส้นผ่านศูนย์กลางแกนลวด (ประมาณ 2-3 มม.) ให้ฟลักซ์เกือบๆ แตะน้ำโลหะ เสียงอาร์กที่ดีต้องสม่ำเสมอคล้ายเสียงฉีกผ้า (Smooth Crackle)`,target_problems:[`ปรับไฟกี่แอมป์`,`กระแสไฟเชื่อม`,`ลวดติด`,`ไฟแรงไป`,`ไฟเบาไป`,`ระยะอาร์ก`,`สูตรปรับไฟ`,`ลวด 2.6 ปรับไฟเท่าไหร่`,`ลวด 3.2 ใช้ไฟกี่แอมป์`],recommended_products:[`GM20020`,`RB2626`,`L5532`],source:`UDO Technical Guide`,image:`/images/bg-welding.jpeg`,badge:`Technique`},{id:`udo-art-porosity-defects`,title:`สาเหตุและการแก้ไขข้อบกพร่องความพรุนตัว (Porosity) และตามดในแนวเชื่อม`,category:`การแก้ปัญหาข้อบกพร่องแนวเชื่อม`,summary:`การวิเคราะห์สาเหตุของฟองอากาศและตามดในเนื้อโลหะเชื่อม พร้อมมาตรการแก้ไขและปรับตั้งระบบแก๊สปกป้อง`,content:`ความพรุนตัว (Porosity) หรือฟองอากาศ/ตามด เกิดจากแก๊สไฮโดรเจน ไนโตรเจน หรือออกซิเจนถูกกักขังอยู่ในบ่อหลอมละลายขณะโลหะแข็งตัว

สาเหตุหลักและวิธีแก้ไข:
1. ผิวชิ้นงานสกปรก มีน้ำมัน สนิม สี หรือความชื้น: ต้องเจียรเปิดผิวเหล็กให้เห็นเนื้อขาวสะอาดก่อนเชื่อมเสมอ
2. ลวดเชื่อมชื้น: สารพอกหุ้มดูดความชื้นในอากาศ โดยเฉพาะลวดกลุ่มไฮโดรเจนต่ำ E7018 ต้องอบลวดที่ 300-350 องศาเซลเซียสก่อนใช้งาน
3. ปัญหาแก๊สปกป้องในงาน MIG/TIG: อัตราการไหลของแก๊สเบาเกินไป (ต่ำกว่า 10 ลิตร/นาที) หรือมีลมพัดหน้างานทำให้แก๊สคลุมปลิว ควรใช้ม่านกันลมและปรับอัตราไหลแก๊สที่ 12-18 ลิตร/นาที
4. ระยะอาร์กยาวเกินไป (Long Arc): เปลวอาร์กแผ่กว้าง แก๊สคลุมป้องกันน้ำโลหะไม่ทั่วถึง ควรรักษาระยะอาร์กให้สั้นและคงที่`,target_problems:[`ตามด`,`ฟองอากาศ`,`พรุนตัว`,`porosity`,`แนวเชื่อมเป็นรู`,`รอยเชื่อมเป็นฟอง`,`เชื่อมแล้วมีรู`,`แก๊สคลุมไม่พอ`],recommended_products:[`E7018`,`TIGS50`,`MG50`],source:`UDO Engineering Knowledge`,image:`/images/bg-welding.jpeg`,badge:`QC Guide`},{id:`udo-art-inverter-selection`,title:`การเลือกระบบตู้เชื่อม Inverter: ความแตกต่างระหว่าง MMA, MIG/CO2 และ TIG`,category:`เครื่องเชื่อมและอุปกรณ์ไฟฟ้า`,summary:`เปรียบเทียบระบบตู้เชื่อมไฟฟ้า ลวดธูป มิก ทิก จุดเด่น ข้อจำกัด และความเหมาะสมกับประเภทโรงงานและอู่ซ่อม`,content:`การเปรียบเทียบระบบตู้เชื่อมไฟฟ้า 3 แบบหลัก:

1. ตู้เชื่อมไฟฟ้าลวดธูป (MMA): ต้นทุนเครื่องและอุปกรณ์ต่ำสุด พกพาสะดวก เชื่อมกลางแจ้งและงานที่มีลมพัดได้ดี เชื่อมเหล็กหนาได้สบาย แต่ความเร็วการเดินแนวต่ำและต้องเคาะสแล็ก
2. ตู้เชื่อมมิก (MIG/MAG/CO2): เดินแนวเชื่อมได้ต่อเนื่องด้วยลวดม้วนอัตโนมัติ ความเร็วในการผลิตสูงกว่า MMA ถึง 3-4 เท่า ไม่มีสแล็ก แนวเชื่อมสวย สะเก็ดไฟน้อย เหมาะสำหรับโรงงานผลิต ชิ้นส่วนยานยนต์ เฟอร์นิเจอร์ และงานประกอบโครงสร้าง
3. ตู้เชื่อมทิก (TIG/อาร์กอน): ให้แนวเชื่อมที่ประณีต สวยงาม เกล็ดละเอียด ไร้สะเก็ดไฟ ควบคุมความร้อนได้แม่นยำ เหมาะกับงานสแตนเลส อลูมิเนียม ท่อแรงดันสูง และงานตกแต่ง แต่ต้องใช้ทักษะช่างเชื่อมสูงและความเร็วในการเชื่อมช้ากว่า`,target_problems:[`เลือกตู้เชื่อม`,`ตู้เชื่อมอินเวอร์เตอร์`,`ความต่าง mig กับ tig`,`ตู้เชื่อม co2`,`ตู้เชื่อมอาร์กอน`,`ตู้เชื่อม welpro`,`ซื้อตู้เชื่อมแบบไหนดี`,`MMA MIG TIG ต่างกันยังไง`],recommended_products:[`WELPRO MMA`,`WELPRO MIG`,`WELPRO TIG`],source:`UDO Catalog & Datasheet`,image:`/images/bg-welding.jpeg`,badge:`Inverter`},{id:`udo-art-gas-cutting-safety`,title:`ความปลอดภัยในการใช้อุปกรณ์เชื่อมตัดแก๊สและเทคนิคการปรับเปลวไฟ`,category:`อุปกรณ์เชื่อมตัดเผาแก๊สและความปลอดภัย`,summary:`ขั้นตอนการตรวจเช็คชุดตัดแก๊ส การติดตั้งวาล์วกันย้อน (Flashback Arrestor) และการปรับเปลวไฟ Neutral Flame`,content:`การตัดโลหะด้วยแก๊สออกซิเจนและแก๊สเชื้อเพลิง (LPG หรือ Acetylene) ต้องคำนึงถึงความปลอดภัยสูงสุด:

1. การติดตั้งอุปกรณ์ป้องกันไฟย้อนกลับ (Flashback Arrestor): ต้องติดตั้งทั้งที่ตัวเกจ์ปรับแรงดันและด้ามตัดแก๊สเสมอ เพื่อป้องกันเปลวไฟลามย้อนเข้าถังแก๊ส
2. การปรับเปลวไฟ Neutral Flame: ปรับสัดส่วนออกซิเจนและแก๊สให้สมดุล เปลวไฟชั้นในเป็นทรงกรวยมนสีฟ้าใส ไร้ควันดำ ให้ความร้อนสูงประมาณ 3,100 องศาเซลเซียส เหมาะสำหรับเผาชิ้นงานให้ร้อนแดงก่อนกดไกตัดออกซิเจน
3. การเลือกเบอร์หัวตัดแก๊ส (Cutting Tip): ต้องเลือกขนาดรูหัวตัดให้ตรงกับความหนาของแผ่นเหล็ก เช่น เบอร์ 0 สำหรับเหล็กหนา 10-15 มม., เบอร์ 1 สำหรับเหล็กหนา 15-30 มม.
4. การตรวจรอยรั่ว: ใช้ฟองสบู่ตรวจเช็คข้อต่อทุกจุด ห้ามใช้เปลวไฟทดสอบรอยรั่วเด็ดขาด`,target_problems:[`ชุดตัดแก๊ส`,`ตัดแก๊ส`,`ด้ามตัดแก๊ส`,`หัวตัดแก๊ส`,`เกจ์แก๊ส`,`กันไฟย้อน`,`flashback arrestor`,`ไฟย้อน`,`ตัดเหล็กหนา`],recommended_products:[`CH623F`,`W62-3FS623F`,`CH623FL`,`WSTFBACJ`,`WSTFBACU`],source:`UDO Engineering Knowledge`,image:`/images/gas-cutting-torch.jpg`,badge:`Safety`},{id:`udo-art-anti-spatter-chemicals`,title:`การใช้น้ำยาและสเปรย์เคมีภัณฑ์ป้องกันสะเก็ดไฟและทำความสะอาดแนวเชื่อม`,category:`เคมีภัณฑ์และน้ำยาสำหรับงานเชื่อม`,summary:`วิธีลดต้นทุนการขัดแต่งแนวเชื่อมด้วยสเปรย์ป้องกันสะเก็ดไฟ (Anti-Spatter) และน้ำยาล้างคราบไหม้สแตนเลส (Pickling Gel)`,content:`สะเก็ดไฟเชื่อม (Spatter) ที่เกาะแน่นบนผิวชิ้นงาน ทำให้เสียเวลาและต้นทุนในการเจียรขัดแต่งอย่างมาก:

1. สเปรย์ป้องกันสะเก็ดไฟ (Anti-Spatter Spray): ฉีดพ่นบางๆ บนผิวชิ้นงานรอบแนวเชื่อมและภายในหัวนอซเซิลปืนเชื่อมมิกก่อนเริ่มเชื่อม สะเก็ดไฟจะไม่สามารถยึดเกาะกับผิวเหล็กได้ เมื่อเชื่อมเสร็จเพียงใช้ผ้าหรือแปรงปัดเบาๆ สะเก็ดไฟจะหลุดออกทันที ประหยัดเวลาขัดแต่งได้มากกว่า 70%
2. น้ำยาล้างคราบไหม้สแตนเลส (Stainless Pickling Gel): หลังเชื่อมสแตนเลสจะเกิดคราบไหม้สีดำและรอยออกไซด์ความร้อน ทาน้ำยาเจลทิ้งไว้ 15-30 นาที แล้วล้างออกด้วยน้ำสะอาด ผิวสแตนเลสจะกลับมาขาวเงางามเหมือนใหม่ และฟื้นฟูชั้นฟิล์มโครเมียมออกไซด์ป้องกันสนิม
3. สเปรย์เช็ครอยร้าว (Non-Destructive Dye Penetrant): ชุดน้ำยา 3 กระป๋อง (Cleaner, Penetrant, Developer) สำหรับตรวจสอบรอยร้าวและตามดที่มองไม่เห็นด้วยตาเปล่า`,target_problems:[`สะเก็ดไฟ`,`ขัดสะเก็ดไม่ออก`,`สเปรย์กันสะเก็ด`,`anti spatter`,`ล้างรอยเชื่อมสแตนเลส`,`น้ำยาล้างแนวเชื่อม`,`pickling`,`เช็ครอยร้าว`,`น้ำยาตรวจรอยร้าว`],recommended_products:[`WELDSTAR ANTI-SPATTER`,`PICKLING PASTE`,`DYE PENETRANT`],source:`UDO Engineering Knowledge`,image:`/images/bg-welding.jpeg`,badge:`Chemical`},{id:`udo-art-auto-darkening-helmets`,title:`คู่มือมาตรฐานหน้ากากเชื่อมปรับแสงอัตโนมัติ OPTECH และระดับเฉดความมืด (DIN Shade)`,category:`อุปกรณ์เซฟตี้และความปลอดภัย`,summary:`เทคนิคการเลือกระดับเฉด DIN 9-13 ความเร็วเซ็นเซอร์ตัดแสง 1/25,000 วินาที มาตรฐานความปลอดภัย EN379 และ ANSI Z87.1`,content:`หน้ากากเชื่อมปรับแสงอัตโนมัติ (Auto-Darkening Welding Helmet) เป็นอุปกรณ์คุ้มครองความปลอดภัยส่วนบุคคล (PPE) ที่สำคัญที่สุดสำหรับช่างเชื่อม ทำหน้าที่ปกป้องดวงตาและใบหน้าจากรังสีอัลตราไวโอเลต (UV) รังสีอินฟราเรด (IR) ความร้อน และสะเก็ดไฟจากการอาร์ก

คุณสมบัติหลักของหน้ากากปรับแสงอัตโนมัติ OPTECH:
1. ความเร็วในการตัดแสง (Switching Time): เซ็นเซอร์ตรวจจับการอาร์กจะตัดระดับความมืดลงมาสู่ Shade ที่ตั้งไว้ภายใน 1/25,000 วินาที ช่วยป้องกันอาการตาอักเสบจากแสงอาร์ก (Flash Burn) ได้อย่างเด็ดขาด
2. ระดับเฉดความมืด (Shade Level): ปรับระดับความเข้มได้ตั้งแต่ DIN 9 ถึง DIN 13 เหมาะสำหรับงานเชื่อมไฟฟ้า (MMA) อาร์กอน (TIG) และเชื่อมมิก (MIG/MAG) พร้อมโหมดเจียร (Grind Mode DIN 4)
3. รุ่นยอดนิยม: OPTECH S777A และ OPTECH S998E น้ำหนักเบา สายรัดปรับได้ 4 ทิศทาง ผ่านการรับรองมาตรฐานสากล EN379 และ ANSI Z87.1`,target_problems:[`หน้ากากเชื่อม`,`หน้ากากปรับแสงออโต้`,`ตัดแสง`,`ตัดแสงไว`,`แสบตา`,`ป้องกันสะเก็ดไฟ`,`OPTECH`,`S777a`,`S998e`,`DIN`,`เซฟตี้`,`อุปกรณ์เซฟตี้`,`แว่นตาเชื่อม`,`หมวกเชื่อม`,`ปรับแสงอัตโนมัติ`],recommended_products:[`OPTS777A`,`OPTS998E`,`OPTCHB`,`OPTLENS7`,`OPTLENS`],source:`UDO Safety Engineering`,image:`/images/bg-welding.jpeg`,badge:`EN379 Standard`}];function i(e=``){if(!e)return null;let t=String(e).toLowerCase().trim();return r.find(e=>e.id.toLowerCase()===t)||r.find(e=>e.title.toLowerCase().includes(t)||t.includes(e.title.toLowerCase()))||r.find(e=>(e.target_problems||[]).some(e=>t.includes(e.toLowerCase())||e.toLowerCase().includes(t)))||null}var a=``,o=null;function s(e=`ลวดเชื่อมมิก`){return`
  <section id="udo-ai-overview-wrapper" class="relative w-full bg-white pt-4 pb-8 mb-4">
    <div class="relative z-20 w-full bg-white">
      
      <!-- AI Header (Sparkle Icon + Title) -->
      <div class="flex items-center gap-2 mb-4">
        <svg class="w-5 h-5 text-[#e7151a] shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L14.4 8.6L21 11L14.4 13.4L12 20L9.6 13.4L3 11L9.6 8.6L12 2Z" />
        </svg>
        <h2 class="text-[17px] font-semibold text-gray-900 tracking-tight">
          ข้อมูลภาพรวมโดย UDO AI
        </h2>
      </div>

      <!-- 2-Column Responsive Layout: Left Content + Right Citation Card -->
      <div class="flex flex-col lg:flex-row items-start gap-10 lg:gap-16 xl:gap-24 2xl:gap-28">
        
        <!-- Left Column: Skeleton Loading Lines -->
        <div class="flex-1 w-full min-w-0 max-w-[730px]">
          <!-- Lead sentence skeleton -->
          <div class="space-y-3 mb-6 animate-pulse">
            <div class="h-4 bg-gray-200/90 rounded-full w-full"></div>
            <div class="h-4 bg-gray-200/75 rounded-full w-[94%]"></div>
            <div class="h-4 bg-gray-200/60 rounded-full w-[78%]"></div>
          </div>

          <!-- Section 1 skeleton -->
          <div class="mt-6 mb-5 animate-pulse">
            <div class="h-4.5 bg-gray-200/90 rounded-md w-44 mb-3.5"></div>
            <div class="space-y-2.5 pl-4">
              <div class="h-3.5 bg-gray-200/75 rounded-full w-[92%]"></div>
              <div class="h-3.5 bg-gray-200/65 rounded-full w-[84%]"></div>
            </div>
          </div>

          <!-- Section 2 skeleton -->
          <div class="mt-5 mb-5 animate-pulse">
            <div class="h-4.5 bg-gray-200/90 rounded-md w-36 mb-3.5"></div>
            <div class="space-y-2.5 pl-4">
              <div class="h-3.5 bg-gray-200/75 rounded-full w-[80%]"></div>
              <div class="h-3.5 bg-gray-200/60 rounded-full w-[65%]"></div>
            </div>
          </div>

        </div>

        <!-- Right Column: Citation Card Skeleton (Sticky in viewport) -->
        <div class="w-full lg:w-[350px] xl:w-[390px] 2xl:w-[410px] shrink-0 lg:sticky lg:top-[125px] self-start transition-all duration-300">
          <div class="bg-white rounded-[24px] border border-gray-200/90 shadow-[0_2px_14px_rgba(0,0,0,0.04)] p-4 sm:p-5 animate-pulse">
            <div class="flex items-start justify-between gap-3 py-1.5">
              <div class="flex-1 space-y-2">
                <div class="h-3 bg-gray-200/80 rounded w-24 mb-1"></div>
                <div class="h-3.5 bg-gray-200/90 rounded w-[90%]"></div>
                <div class="h-3 bg-gray-200/60 rounded w-[75%]"></div>
              </div>
              <div class="w-14 h-14 rounded-lg bg-gray-200/70 shrink-0"></div>
            </div>
            <div class="border-t border-gray-100 my-3"></div>
            <div class="flex items-start justify-between gap-3 py-1.5">
              <div class="flex-1 space-y-2">
                <div class="h-3 bg-gray-200/80 rounded w-20 mb-1"></div>
                <div class="h-3.5 bg-gray-200/90 rounded w-[88%]"></div>
                <div class="h-3 bg-gray-200/60 rounded w-[70%]"></div>
              </div>
              <div class="w-14 h-14 rounded-lg bg-gray-200/70 shrink-0"></div>
            </div>
            <div class="w-full mt-4 h-9 bg-gray-100 rounded-full"></div>
          </div>
        </div>

      </div>

    </div>

    <!-- Clean Bottom Divider -->
    <div class="w-full border-b border-gray-200 mt-8 mb-4"></div>
  </section>
  `}function c(e=``,t=`ลองถามอะไรก็ได้`){return`
  <div class="mt-6 relative inline-block w-full">
    <!-- Main Form Card (Auto-expanding Multiline Pill matching chat.html) -->
    <form id="aiFloatingForm" class="chat-form-grid relative z-10 w-full bg-white rounded-[28px] sm:rounded-[30px] border border-gray-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:border-gray-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.07)] px-4 sm:px-5 py-2.5 sm:py-3 transition-all">
      <!-- Left Action: Plus Button (+) -->
      <div class="chat-plus-wrapper">
        <button type="button" class="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center shrink-0 transition-colors cursor-pointer" title="เพิ่มข้อมูล">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </div>

      <!-- Text Input (Auto-resizing Textarea) -->
      <div class="chat-input-wrapper">
        <textarea 
          id="aiFloatingInput"
          rows="1"
          placeholder="${t}" 
          autocomplete="off"
          class="w-full bg-transparent text-[15px] sm:text-[15.5px] text-gray-900 placeholder-gray-500 outline-none border-none focus:ring-0 px-2 py-0.5 resize-none leading-relaxed transition-all"
        ></textarea>
      </div>

      <!-- Right Actions: Mic & Submit Arrow Button -->
      <div class="chat-actions-right">
        <button type="button" id="btnAiMic" class="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full hover:bg-gray-100 text-gray-600 flex items-center justify-center transition-colors cursor-pointer" title="ค้นหาด้วยเสียง">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15a3 3 0 003-3V6a3 3 0 00-3-3 3 3 0 00-3 3v6a3 3 0 003 3z" />
          </svg>
        </button>

        <!-- Submit Button: Appears with green #90DE3C when typing -->
        <button type="submit" id="btnAiSubmit" class="hidden w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full bg-[#90DE3C] hover:bg-[#82c936] text-black items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95 shrink-0" title="ส่งคำถาม">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
          </svg>
        </button>
      </div>
    </form>
  </div>
  `}function l(e){return e?String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`):``}function u(t={},n={}){let r=t.matched_products||n.matched_products||[];if(!Array.isArray(r)||r.length===0)return e.slice(0,2);let i=[],a=new Set;return r.forEach(t=>{let n=String(t).toLowerCase().trim();if(!n)return;let r=e.find(e=>{if(a.has(e.id))return!1;let t=(e.sku||``).toLowerCase(),r=(e.name||``).toLowerCase(),i=(e.brand||``).toLowerCase();return t.includes(n)||r.includes(n)||i.includes(n)});r&&(a.add(r.id),i.push(r))}),i.length>0?i:e.slice(0,2)}function d(e=[],t={}){let n=e&&e.length>0?e:t&&t.sources&&t.sources.length>0?t.sources:[],a=[],o=new Set;return n.forEach(e=>{let t=e.id||``,n=e.title||``;if(!n||n.toLowerCase().includes(`catalog product`))return;let r=i(t)||i(n)||e,s=r.id||r.title||String(Math.random());o.has(s)||(o.add(s),a.push(r))}),a.length===0&&a.push(r[0]),a}function f(e=[],t={}){let n=u(t,t),r=d(e,t),i=r.length,a=n.length,o=``;if(i>0){let e=r[0],t=e.slug?`/article.html?slug=${encodeURIComponent(e.slug)}`:`/article.html`;o=`
      <div class="citation-source-item group relative rounded-xl p-1.5 -mx-1.5 transition-all duration-300">
        <!-- Top line: Favicon + Source name with count + Link icon -->
        <div class="flex items-center justify-between gap-2 mb-1.5">
          <div class="flex items-center gap-1.5 min-w-0">
            <img src="/images/logos/logo.svg" alt="UDO" class="w-3.5 h-3.5 object-contain shrink-0" onerror="this.src='/images/logos/logo.svg'" />
            <span class="text-[12px] font-medium text-gray-500 truncate">บทความวิศวกรรม (${i})</span>
          </div>
          <a href="${t}" target="_blank" class="text-gray-400 hover:text-black p-0.5 shrink-0 transition-colors" title="อ่านบทความฉบับเต็ม">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        <!-- Middle & Bottom row: Text on left + Single relevant image on right -->
        <a href="${t}" target="_blank" class="flex items-start justify-between gap-3 group/art cursor-pointer block">
          <div class="flex-1 min-w-0 text-left">
            <h4 class="text-[13px] font-semibold text-gray-900 group-hover/art:text-[#e7151a] leading-snug line-clamp-2 transition-colors" title="${l(e.title)}">
              ${l(e.title)}
            </h4>
            <p class="text-[11.5px] text-gray-500 line-clamp-2 mt-1 leading-relaxed">
              ${l(e.summary||e.desc||`คู่มือและคำแนะนำทางวิศวกรรมมาตรฐานจากฝ่ายเทคนิค UDO`)}
            </p>
          </div>
          ${e.image?`
            <div class="relative w-14 h-14 rounded-xl bg-gray-100 border border-gray-200/80 shrink-0 overflow-hidden flex items-center justify-center">
              <img src="${e.image}" alt="Thumbnail" class="w-full h-full object-cover group-hover/art:scale-105 transition-transform duration-300" onerror="this.src='/images/logos/logo.svg'" />
            </div>
          `:``}
        </a>
      </div>
    `}let s=``;if(a>0){let e=n[0],t=e.images&&e.images[0]&&(e.images[0].thumb||e.images[0].card)?e.images[0].thumb||e.images[0].card:`/images/logos/logo.svg`;s=`
      <div class="citation-source-item group relative rounded-xl p-1.5 -mx-1.5 transition-all duration-300 mt-2.5 pt-2.5 border-t border-gray-100">
        <!-- Top line: Favicon + Source name with count + 3 dots -->
        <div class="flex items-center justify-between gap-2 mb-1.5">
          <div class="flex items-center gap-1.5 min-w-0">
            <img src="/images/logos/logo.svg" alt="UDO" class="w-3.5 h-3.5 object-contain shrink-0" onerror="this.src='/images/logos/logo.svg'" />
            <span class="text-[12px] font-medium text-gray-500 truncate">แคตตาล็อกสินค้า (${a})</span>
          </div>
          <button type="button" class="text-gray-400 hover:text-gray-600 p-0.5 shrink-0 transition-colors" title="ตัวเลือกเพิ่มเติม">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
            </svg>
          </button>
        </div>

        <!-- Middle & Bottom row: Text on left + Thumbnail on right -->
        <div class="flex items-start justify-between gap-3">
          <div class="flex-1 min-w-0 text-left">
            <div class="text-[12.5px] font-medium text-gray-800 leading-snug line-clamp-2">
              ${n.slice(0,2).map(e=>`<a href="/product.html?id=${e.id}" target="_blank" rel="noopener noreferrer" class="text-gray-900 hover:text-[#e7151a] hover:underline font-semibold inline-block">${l(e.brand||``)} ${l(e.name||``)}</a>`).join(`<span class="text-gray-400 font-normal">, </span>`)}${a>2?`<span class="text-gray-500 font-normal"> และอีก ${a-2} รายการ</span>`:``}
            </div>
            <p class="text-[11.5px] text-gray-500 line-clamp-2 mt-1 leading-relaxed">
              ${e.category?`สเปกทางการ ${l(e.category)} พร้อมข้อมูลมาตรฐานและสต็อกส่งตรงจาก UDO`:`สเปกทางการและสต็อกพร้อมส่งตรงจากคลังสินค้า UDO Trading`}
            </p>
          </div>
          ${t?`
            <div class="relative w-14 h-14 rounded-xl bg-gray-100 border border-gray-200/80 shrink-0 overflow-hidden flex items-center justify-center">
              <img src="${t}" alt="Thumbnail" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='/images/logos/logo.svg'" />
            </div>
          `:``}
        </div>
      </div>
    `}return`
    ${o}
    ${s}

    <!-- Full-width Pill Button: แสดงทั้งหมด (1:1 with chat.html) -->
    <button type="button" id="btnShowAllSources" class="btn-toggle-all-citations w-full mt-3 py-2 px-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-[13px] font-semibold text-center transition-all select-none cursor-pointer flex items-center justify-center gap-1.5 active:scale-[0.99]">
      <span class="btn-toggle-label font-semibold">แสดงทั้งหมด</span>
      <svg class="w-3.5 h-3.5 transition-transform duration-200 btn-toggle-icon text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    </button>
  `}function p(e){e.query;let t=``,r=e.metadata||{},i=e.followUps||r.followUps||[];if(typeof e==`string`)t=e;else if(e.markdown||e.content)t=e.markdown||e.content;else if(e.lead||e.sections){let n=e.lead||{},r=e.sections||[];(n.keyword||n.summary)&&(t+=`## ${n.keyword||``}\n${n.highlight?`**${n.highlight}** `:``}${n.summary||``}\n\n`),r.forEach(e=>{t+=`### ${e.title}\n`,(e.items||[]).forEach(e=>{e.title?t+=`- **${e.title}**: ${e.desc}\n`:t+=`- ${e.desc}\n`}),t+=`
`})}let a=n(t),o=a.html;return a.metadata&&a.metadata.followUps&&(i=a.metadata.followUps),`
    <div class="ai-turn-body text-[15px] sm:text-[15.5px] leading-[1.8] text-gray-800">
      <div class="ai-markdown-content space-y-4">
        ${o}
      </div>
      ${i&&i.length>0?`
    <div class="mt-5 mb-4">
      <p class="text-[14.5px] text-gray-800 font-normal mb-2">
        หากคุณต้องการคำแนะนำเพิ่มเติม ช่วยบอกหน่อยว่า:
      </p>
      <ul class="space-y-1.5 list-disc pl-5 marker:text-gray-800 text-[14.5px] text-gray-800">
        ${i.map(e=>`
          <li class="cursor-pointer hover:text-[#e7151a] transition-colors ai-followup-bullet" data-query="${l(e)}">
            ${l(e)}
          </li>
        `).join(``)}
      </ul>
    </div>`:``}
      
    <div class="mt-6 flex items-center gap-1 text-gray-500 pt-2 border-t border-gray-100">
      <button type="button" class="btn-action-copy p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer" title="คัดลอกคำตอบ">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        </svg>
      </button>
      <button type="button" class="btn-action-share p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer" title="แชร์">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
        </svg>
      </button>
      <button type="button" class="btn-action-like p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer" title="มีประโยชน์">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
        </svg>
      </button>
      <button type="button" class="btn-action-dislike p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer" title="ไม่ตรงที่ต้องการ">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3" />
        </svg>
      </button>
      <button type="button" class="btn-action-more p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer" title="เพิ่มเติม">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
      </button>
    </div>
  
    </div>
  `}function m(e){let t=e.query||`ลวดเชื่อมมิก`,n=e.citations||[];return e.is_out_of_scope||e.markdown&&e.markdown.trim()===`ฉันไม่สามารถช่วยเหลือในเรื่องนี้ได้`?`
    <section id="udo-ai-overview-wrapper" class="relative w-full bg-white pt-4 pb-4 mb-2">
      <div class="relative z-20 w-full bg-white">
        <!-- AI Header (Sparkle Icon + Title) -->
        <div class="flex items-center gap-2 mb-3">
          <svg class="w-5 h-5 text-[#e7151a] shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L14.4 8.6L21 11L14.4 13.4L12 20L9.6 13.4L3 11L9.6 8.6L12 2Z" />
          </svg>
          <h2 class="text-[17px] font-semibold text-gray-900 tracking-tight">
            ข้อมูลภาพรวมโดย UDO AI
          </h2>
        </div>

        <!-- Clean Out-of-Scope Refusal Card -->
        <div class="rounded-2xl border border-gray-200/90 bg-[#fafafa] p-5 sm:p-6 max-w-[730px]">
          <p class="text-[15px] sm:text-[16px] text-gray-800 font-medium leading-relaxed">
            ฉันไม่สามารถช่วยเหลือในเรื่องนี้ได้
          </p>
          <p class="text-[13px] text-gray-500 mt-2 leading-relaxed">
            ระบบ UDO AI ให้บริการข้อมูลและคำแนะนำเฉพาะผลิตภัณฑ์งานเชื่อม อุปกรณ์ช่าง และวิศวกรรมของ UDO เท่านั้น
          </p>
        </div>
      </div>
      <!-- Clean Bottom Divider -->
      <div class="w-full border-b border-gray-200 mt-6 mb-2"></div>
    </section>
    `:`
  <section id="udo-ai-overview-wrapper" class="relative w-full bg-white pt-4 pb-8 mb-4">
    <div class="relative z-20 w-full bg-white">
      
      <!-- AI Header (Sparkle Icon + Title) -->
      <div class="flex items-center gap-2 mb-4">
        <svg class="w-5 h-5 text-[#e7151a] shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L14.4 8.6L21 11L14.4 13.4L12 20L9.6 13.4L3 11L9.6 8.6L12 2Z" />
        </svg>
        <h2 class="text-[17px] font-semibold text-gray-900 tracking-tight">
          ข้อมูลภาพรวมโดย UDO AI
        </h2>
      </div>

      <!-- 2-Column Responsive Layout: Left Multi-Turn Thread + Right Sticky Citation Card -->
      <div class="flex flex-col lg:flex-row items-start gap-10 lg:gap-16 xl:gap-24 2xl:gap-28">
        
        <!-- Left Column: Multi-turn Conversation Thread (Optimal Reading Width ~730px) -->
        <div class="flex-1 w-full min-w-0 max-w-[730px]">
          
          <!-- Collapsible Container for Initial Truncated Preview (Default Collapsed) -->
          <div id="ai-overview-collapsible" class="relative max-h-[260px] overflow-hidden transition-all duration-500 ease-in-out">
            <!-- Continuous Conversation Thread Container -->
            <div id="ai-conversation-thread" class="space-y-6">
              <div class="ai-turn-item" data-turn="1">
                ${p(e)}
              </div>
            </div>

            <!-- Floating Question Box (Sits naturally inside the expanded view) -->
            ${c(t)}

            <!-- Gradient Fade Mask for Collapsed State -->
            <div id="ai-overview-fade-mask" class="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none transition-opacity duration-300 z-10"></div>
          </div>

          <!-- Pill Button: แสดงเพิ่มเติม (Show More) -->
          <div id="ai-expand-wrapper" class="w-full flex justify-center mt-3 mb-3">
            <button type="button" id="btnToggleAiExpand" class="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-gray-200/90 bg-white hover:bg-gray-50 text-gray-800 text-[13.5px] font-medium shadow-xs hover:border-gray-300 transition-all cursor-pointer active:scale-98">
              <span id="aiExpandBtnText">แสดงเพิ่มเติม</span>
              <svg id="aiExpandIcon" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-600 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
          </div>

          <!-- Pending Turn Loading Skeleton Container -->
          <div id="ai-pending-turn-container" class="hidden"></div>

        </div>

        <!-- Right Column: Sticky Citation & Product Card Container -->
        <div class="w-full lg:w-[350px] xl:w-[390px] 2xl:w-[410px] shrink-0 lg:sticky lg:top-[125px] self-start transition-all duration-300">
          <div id="udo-ai-citations-list" class="bg-white rounded-[24px] border border-gray-200/90 shadow-[0_2px_14px_rgba(0,0,0,0.04)] p-4 sm:p-5 transition-all duration-300">
            ${f(n,e.metadata||{})}
          </div>
        </div>

      </div>

    </div>

    <!-- Clean Bottom Divider separating AI section from Product Catalog -->
    <div class="w-full border-b border-gray-200 mt-8 mb-4"></div>
  </section>
  `}function h(e=`ลวดเชื่อมมิก`){return{query:e,is_out_of_scope:!1,markdown:`## ข้อมูลภาพรวมเกี่ยวกับ ${e}
ระบบกำลังปรับปรุงการเชื่อมต่อกับ UDO AI ชั่วคราว ท่านสามารถค้นหาและเลือกดูผลิตภัณฑ์จริงจากแคตตาล็อกด้านล่าง หรือติดต่อสอบถามเจ้าหน้าที่ผู้เชี่ยวชาญผ่านทาง LINE ได้ตลอดเวลา`,lead:{keyword:e,highlight:`ผู้เชี่ยวชาญผลิตภัณฑ์งานเชื่อมและเครื่องมือช่าง`,summary:`สามารถเลือกดูผลิตภัณฑ์จริงได้จากหมวดหมู่และรายการสินค้าด้านล่าง`},sections:[],followUps:[],citations:[],related_category:null,matched_products:[]}}async function g(e,t=[]){let n=null,r={q:e,history:Array.isArray(t)?t:[]};try{let e=await fetch(`/api/ai_search.php`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(r)});if(e.ok){let t=await e.text();try{let e=JSON.parse(t);e.success&&e.data&&(n=e.data)}catch{}}}catch(e){console.warn(`Native PHP API search unreachable:`,e)}if(!n)try{let e=await fetch(`https://udo-ai-service-330377476882.asia-southeast1.run.app/api/ai-search`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(r)});if(e.ok){let t=await e.json();t.success&&t.data&&(n=t.data)}}catch(e){console.warn(`Cloud Run direct fetch error:`,e)}return n||=h(e),n}function _(){let e=document.getElementById(`aiHandoffLoadingOverlay`);e||(e=document.createElement(`div`),e.id=`aiHandoffLoadingOverlay`,e.className=`fixed inset-0 z-[200] flex items-center justify-center bg-black/10 backdrop-blur-[2px] opacity-0 transition-opacity duration-300 pointer-events-auto`,e.innerHTML=`
      <div class="relative inline-flex items-center transform scale-110 sm:scale-125 transition-transform duration-300">
        <!-- Ambient Glow Aura behind the Pill -->
        <div class="absolute -inset-3 -z-10 pointer-events-none overflow-hidden rounded-full flex items-center justify-center">
          <div class="pill-ambient-laser-glow pointer-events-none"></div>
        </div>

        <!-- Outer Glass Frame with Orbiting Laser Beam -->
        <div class="relative p-[3.5px] rounded-full overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
          <!-- Orbiting Light Beam Layer -->
          <div class="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
            <div class="pill-beam-laser-spinner pointer-events-none"></div>
          </div>

          <!-- Frosted Glass Trench / Bevel Layer -->
          <div class="absolute inset-[1px] rounded-full bg-white/30 backdrop-blur-md border border-white/70 pointer-events-none shadow-[inset_0_1px_2px_rgba(255,255,255,0.8)]"></div>

          <!-- Inner White Pill Content: 3 Animated Typing Dots (NO text) -->
          <div class="relative z-10 px-5 py-3 bg-white/95 rounded-full flex items-center justify-center gap-2 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
            <span class="w-2.5 h-2.5 rounded-full bg-gray-600 udo-dot-1"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-gray-600 udo-dot-2"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-gray-600 udo-dot-3"></span>
          </div>
        </div>
      </div>
    `,document.body.appendChild(e)),requestAnimationFrame(()=>{e.classList.remove(`opacity-0`),e.classList.add(`opacity-100`)})}async function v(e){let t=(e||``).trim();if(!t)return;let n=document.getElementById(`aiFloatingInput`),r=document.getElementById(`btnAiSubmit`);n&&(n.disabled=!0),r&&r.classList.add(`opacity-50`,`pointer-events-none`),_();let i=[];if(a&&i.push({role:`user`,text:a}),o){let e=o.markdown||(o.lead?`${o.lead.keyword||``} ${o.lead.summary||``}`:``);e&&i.push({role:`model`,text:e})}let s=null;try{s=await g(t,i)}catch(e){console.warn(`Background prefetch failed, will fallback in chat:`,e)}let c={initialQuery:a||`ค้นหา`,initialAnswer:o||null,followUpQuery:t,followUpAnswer:s||null,timestamp:Date.now()};try{sessionStorage.setItem(`udo_ai_chat_handoff`,JSON.stringify(c))}catch(e){console.warn(`Failed to save handoff data to sessionStorage:`,e)}document.body.classList.add(`page-fade-out`),setTimeout(()=>{window.location.href=`/chat.html?handoff=true`},220)}async function y(e){v(e)}function b(){let e=document.getElementById(`ai-overview-collapsible`),t=document.getElementById(`ai-overview-fade-mask`),n=document.getElementById(`btnToggleAiExpand`),r=document.getElementById(`aiExpandBtnText`),i=document.getElementById(`aiExpandIcon`),a=document.getElementById(`aiFloatingInput`);if(!e||!n)return;let o=!1,s=n=>{if(o=n,o)e.style.maxHeight=`${e.scrollHeight+60}px`,t&&t.classList.add(`opacity-0`,`pointer-events-none`),r&&(r.textContent=`ย่อเนื้อหา`),i&&i.classList.add(`rotate-180`);else{e.style.maxHeight=`260px`,t&&t.classList.remove(`opacity-0`,`pointer-events-none`),r&&(r.textContent=`แสดงเพิ่มเติม`),i&&i.classList.remove(`rotate-180`);let n=document.getElementById(`udo-ai-overview-wrapper`);n&&n.scrollIntoView({behavior:`smooth`,block:`nearest`})}};n.onclick=e=>{e.preventDefault(),s(!o)},a&&a.addEventListener(`focus`,()=>{o||s(!0)})}async function x(n,r=`ลวดเชื่อมมิก`){if(!n)return null;a=r,n.innerHTML=s(r),n.classList.remove(`hidden`),C();let[i]=await Promise.all([g(r),e.length===0?t():Promise.resolve()]);return o=i||h(r),n.innerHTML=m(o),C(),b(),o}function S(){let e=e=>{let t=document.getElementById(`category-product-grid`);t&&(t.scrollIntoView({behavior:`smooth`,block:`start`}),e&&t.querySelectorAll(`[data-product-id]`).forEach(t=>{t.textContent.toLowerCase().includes(e.toLowerCase())&&(t.classList.add(`ring-2`,`ring-[#90DE3C]`,`transition-all`),setTimeout(()=>{t.classList.remove(`ring-2`,`ring-[#90DE3C]`)},2500))}))};document.querySelectorAll(`.udo-citation-pill`).forEach(t=>{t.dataset.bound||(t.dataset.bound=`true`,t.addEventListener(`click`,()=>{let n=t.getAttribute(`data-target-brand`);e(n)}))}),document.querySelectorAll(`.udo-citation-card`).forEach(t=>{t.dataset.bound||(t.dataset.bound=`true`,t.addEventListener(`click`,()=>{let n=t.getAttribute(`data-brand`);e(n)}))});let t=document.getElementById(`btnShowAllSources`);t&&!t.dataset.bound&&(t.dataset.bound=`true`,t.addEventListener(`click`,()=>{e()}))}function C(){let e=document.getElementById(`ai-input-beam-glow`);e&&setTimeout(()=>{e.style.opacity=`0`,setTimeout(()=>{e.remove()},400)},850),document.querySelectorAll(`.ai-followup-bullet`).forEach(e=>{e.dataset.bound||(e.dataset.bound=`true`,e.addEventListener(`click`,t=>{t.preventDefault();let n=e.getAttribute(`data-query`);n&&y(n)}))});let t=document.getElementById(`aiFloatingForm`),n=document.getElementById(`aiFloatingInput`),r=document.getElementById(`btnAiSubmit`),i=document.getElementById(`btnAiMic`);function a(){if(!n||!t)return;n.style.height=`auto`;let e=n.scrollHeight;if((n.value.includes(`
`)||e>34)&&n.value.trim().length>0){t.classList.add(`is-multiline`);let r=Math.min(e,180);n.style.height=`${r}px`,n.style.overflowY=e>180?`auto`:`hidden`}else t.classList.remove(`is-multiline`),n.style.height=`28px`,n.style.overflowY=`hidden`}n&&(n.addEventListener(`input`,()=>{a(),n.value.trim().length>0?(r&&(r.classList.remove(`hidden`),r.classList.add(`flex`)),i&&i.classList.add(`hidden`)):(r&&(r.classList.add(`hidden`),r.classList.remove(`flex`)),i&&i.classList.remove(`hidden`))}),n.addEventListener(`keydown`,e=>{if((e.metaKey||e.ctrlKey)&&e.key===`Enter`){e.preventDefault();let t=n.selectionStart,r=n.selectionEnd;n.value=n.value.substring(0,t)+`
`+n.value.substring(r),n.selectionStart=n.selectionEnd=t+1,a(),n.dispatchEvent(new Event(`input`));return}if(e.key===`Enter`&&e.shiftKey){setTimeout(a,0);return}if(e.key===`Enter`&&!e.shiftKey&&!e.metaKey&&!e.ctrlKey&&!e.altKey){e.preventDefault();let t=n.value.trim();t.length>0&&y(t)}})),t&&n&&t.addEventListener(`submit`,e=>{e.preventDefault();let t=n.value.trim();t.length>0&&y(t)}),r&&n&&r.addEventListener(`click`,e=>{e.preventDefault();let t=n.value.trim();t.length>0&&y(t)}),S(),document.querySelectorAll(`.btn-action-copy`).forEach(e=>{e.dataset.bound||(e.dataset.bound=`true`,e.addEventListener(`click`,()=>{let t=e.closest(`.ai-turn-body`)||e.closest(`.ai-markdown-content`)||e.closest(`#udo-ai-overview-wrapper`),n=t?t.innerText:``;n&&navigator.clipboard.writeText(n).then(()=>{alert(`คัดลอกเนื้อหาเรียบร้อยแล้ว`)}).catch(()=>{})}))}),document.querySelectorAll(`.btn-action-like, .btnAiLike`).forEach(e=>{e.dataset.bound||(e.dataset.bound=`true`,e.addEventListener(`click`,()=>{e.classList.toggle(`text-emerald-600`),e.classList.toggle(`bg-emerald-50`)}))}),document.querySelectorAll(`.btn-action-dislike, .btnAiDislike`).forEach(e=>{e.dataset.bound||(e.dataset.bound=`true`,e.addEventListener(`click`,()=>{e.classList.toggle(`text-red-600`),e.classList.toggle(`bg-red-50`)}))}),document.querySelectorAll(`.btn-action-share, .btnAiShare`).forEach(e=>{e.dataset.bound||(e.dataset.bound=`true`,e.addEventListener(`click`,()=>{navigator.clipboard.writeText(window.location.href).then(()=>{alert(`คัดลอกลิงก์ผลการค้นหา AI เรียบร้อยแล้ว`)}).catch(()=>{})}))}),document.querySelectorAll(`.btn-action-more, .btnAiMore`).forEach(e=>{e.dataset.bound||(e.dataset.bound=`true`,e.addEventListener(`click`,()=>{alert(`ขอบคุณสำหรับข้อเสนอแนะ ระบบจะนำข้อมูลไปพัฒนาคุณภาพของคำตอบ AI ต่อไป`)}))})}export{i as a,r as i,h as n,x as r,g as t};