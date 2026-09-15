import React from 'react';
import Link from 'next/link';

export default function CompanionPage() {
  return (
    <div className="min-h-screen bg-[#132420] text-white font-sans p-4 flex flex-col items-center justify-center">
      <div className="w-[308px] h-[640px] bg-[#F7F0E4] text-[#221F19] rounded-[34px] shadow-2xl overflow-hidden flex flex-col">
        
        {/* Appbar */}
        <div className="bg-[#204A42] text-white p-3 flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-sm">
            <Link href="/" className="hover:opacity-80 text-base">←</Link>
            <span>โปรไฟล์ผู้ช่วย</span>
          </div>
          <span className="text-xs bg-white/20 px-2 py-1 rounded-full text-white cursor-pointer hover:bg-white/30">G Sign in</span>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            {/* Profile Header */}
            <div className="text-center space-y-1">
              <div className="w-16 h-16 bg-[#DCE7E1] rounded-full mx-auto flex items-center justify-center text-3xl shadow">
                🧑
              </div>
              <h2 className="font-bold text-sm text-[#221F19]">คุณสมชาย (ชาย) · 28 ปี</h2>
              <p className="text-xs text-[#B97722] font-semibold">★ 4.9/5.0 (24 รีวิว)</p>
              <p className="text-[11px] text-[#5B5648]">📍 ปทุมวัน, บางกะปิ</p>
            </div>

            {/* Badges */}
            <div className="bg-white p-3 rounded-xl border border-[#DED2B8] space-y-1">
              <h3 className="font-semibold text-xs text-[#221F19]">🏅 Badge / ความถนัด</h3>
              <div className="flex flex-wrap gap-1 text-[10px]">
                <span className="bg-[#FCE8E6] text-[#B85B42] px-2 py-0.5 rounded font-medium">🏆 เทพแห่งการต่อคิว รพ. (18)</span>
                <span className="bg-[#DCE7E1] text-[#204A42] px-2 py-0.5 rounded font-medium">เก่งรถเข็น (12)</span>
                <span className="bg-[#F7F0E4] text-[#5B5648] px-2 py-0.5 rounded font-medium">ตรงเวลามาก (20)</span>
              </div>
            </div>

            {/* About */}
            <div className="bg-white p-3 rounded-xl border border-[#DED2B8] space-y-1">
              <h3 className="font-semibold text-xs text-[#221F19]">เกี่ยวกับฉัน</h3>
              <p className="text-[11px] text-[#5B5648] leading-relaxed">
                มีประสบการณ์พาคุณตาคุณยายไปโรงพยาบาลจุฬาฯ และศิริราชครับ ชำนาญขั้นตอนการรับคิว เจาะเลือด และรับยา
              </p>
            </div>
          </div>

          {/* Action Button */}
          <Link href="/booking" className="block">
            <button className="w-full bg-[#204A42] hover:bg-[#15332d] text-white py-2.5 rounded-lg text-xs font-bold transition shadow active:scale-95">
              เช็กวันและจองบริการ
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}