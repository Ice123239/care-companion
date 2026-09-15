/* ในส่วนของการ์ด "รายงานที่ต้องตรวจสอบ" เพิ่มโค้ดปุ่มต่อท้ายข้อความ */
<div className="bg-[#3D2523] border border-[#8B3A34] p-3 rounded-xl text-xs space-y-2">
  <div className="flex items-center gap-1.5 text-amber-400 font-bold">
    <span>⚠️</span>
    <span>มีการายงานบัญชี “คุณสมชาย”</span>
  </div>
  <p className="text-[10px] text-gray-300 leading-relaxed">
    ลูกค้าแจ้งว่าแชทออกนอกเรื่องงานที่ตกลงไว้ ทีมงานควรตรวจสอบบทสนทนาก่อนตัดสินใจ
  </p>
  
  {/* เพิ่มปุ่ม Action เพิ่มเติมให้แอดมินจัดการได้ง่ายขึ้น */}
  <div className="flex gap-2 pt-1">
    <button 
      onClick={() => alert('กำลังเปิดประวัติการสนทนาของ คุณสมชาย')}
      className="flex-1 bg-amber-500 hover:bg-amber-600 text-black font-bold text-[10px] py-1.5 rounded transition"
    >
      💬 ตรวจสอบแชท
    </button>
    <button 
      onClick={() => alert('ส่งคำเตือนไปยัง คุณสมชาย เรียบร้อย')}
      className="flex-1 bg-[#8B3A34] hover:bg-[#722F2A] text-white font-bold text-[10px] py-1.5 rounded transition"
    >
      🛑 ระงับสิทธิ์ชั่วคราว
    </button>
  </div>
</div>