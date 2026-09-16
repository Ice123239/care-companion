'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function CompanionPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#132420] text-white font-sans p-2 sm:p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-[360px] sm:max-w-[400px] h-[640px] bg-[#F7F0E4] text-[#221F19] rounded-[28px] sm:rounded-[34px] shadow-2xl overflow-hidden flex flex-col relative">
        
        {/* Appbar */}
        <div className="bg-[#204A42] text-white p-3 flex justify-between items-center shadow">
          <div className="flex items-center gap-2 font-bold text-sm">
            <Link href="/" className="hover:opacity-80 text-base">←</Link>
            <span>โปรไฟล์ผู้ช่วย</span>
          </div>
          <button 
            onClick={() => setShowAuthModal(true)}
            className="text-xs bg-white/20 hover:bg-white/30 px-2.5 py-1 rounded-full text-white transition cursor-pointer"
          >
            {isLoggedIn ? '👤 โปรไฟล์' : 'G Sign in'}
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            
            {/* Profile Header */}
            <div className="text-center space-y-1">
              <div className="w-16 h-16 bg-[#DCE7E1] rounded-full mx-auto flex items-center justify-center text-3xl shadow-inner">
                🧑
              </div>
              <h2 className="font-bold text-sm text-[#221F19]">คุณสมชาย (ชาย) · 28 ปี</h2>
              <p className="text-xs text-[#B97722] font-semibold">★ 4.9/5.0 (24 รีวิว)</p>
              <p className="text-[11px] text-[#5B5648]">📍 ปทุมวัน, บางกะปิ, สามย่าน</p>
            </div>

            {/* Service Area & Availability */}
            <div className="bg-white p-3 rounded-xl border border-[#DED2B8] space-y-1">
              <h3 className="font-semibold text-xs text-[#204A42]">📅 ช่วงเวลาและพื้นที่บริการ</h3>
              <p className="text-[11px] text-[#5B5648]">• <strong>วันสะดวก:</strong> จันทร์ - ศุกร์ (08:00 - 17:00 น.)</p>
              <p className="text-[11px] text-[#5B5648]">• <strong>พื้นที่หลัก:</strong> รพ.จุฬาฯ, รพ.รามาฯ, รพ.ศิริราช</p>
            </div>

            {/* Badges */}
            <div className="bg-white p-3 rounded-xl border border-[#DED2B8] space-y-1">
              <h3 className="font-semibold text-xs text-[#221F19]">🏅 Badge / ความถนัด</h3>
              <div className="flex flex-wrap gap-1 text-[10px]">
                <span className="bg-[#FCE8E6] text-[#B85B42] px-2 py-0.5 rounded font-medium">🏆 เทพแห่งการต่อคิว รพ. (18)</span>
                <span className="bg-[#DCE7E1] text-[#204A42] px-2 py-0.5 rounded font-medium">เข็นรถเข็นคล่อง (12)</span>
                <span className="bg-[#F7F0E4] text-[#5B5648] px-2 py-0.5 rounded font-medium">ตรงเวลามาก (20)</span>
              </div>
            </div>

            {/* About */}
            <div className="bg-white p-3 rounded-xl border border-[#DED2B8] space-y-1">
              <h3 className="font-semibold text-xs text-[#221F19]">เกี่ยวกับฉัน</h3>
              <p className="text-[11px] text-[#5B5648] leading-relaxed">
                มีประสบการณ์พาคุณตาคุณยายไปโรงพยาบาลจุฬาฯ และศิริราชครับ ชำนาญขั้นตอนการรับคิว เจาะเลือด และรับยา พร้อมดูแลอย่างใจเย็น
              </p>
            </div>
          </div>

          {/* Action Button */}
          <Link href="/booking" className="block pt-2">
            <button className="w-full bg-[#204A42] hover:bg-[#15332d] text-white py-2.5 rounded-lg text-xs font-bold transition shadow active:scale-95">
              เช็กวันและจองบริการ (350 บาท/ชม.)
            </button>
          </Link>
        </div>

        {/* Modal จำลอง Google Auth */}
        {showAuthModal && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white p-4 rounded-2xl w-full max-w-[280px] text-center space-y-3 shadow-xl">
              <h3 className="font-bold text-sm text-[#204A42]">
                {isLoggedIn ? 'จัดการบัญชีผู้ใช้งาน' : 'เข้าสู่ระบบด้วย Google'}
              </h3>
              <p className="text-[11px] text-[#5B5648]">
                {isLoggedIn ? 'คุณล็อกอินในชื่อ Customer แล้ว' : 'ใช้ Google Account เพื่อเริ่มใช้งาน Care Companion'}
              </p>
              
              <button
                onClick={() => {
                  setIsLoggedIn(!isLoggedIn);
                  setShowAuthModal(false);
                }}
                className="w-full bg-[#204A42] text-white py-2 rounded-lg text-xs font-semibold hover:bg-[#15332d] transition"
              >
                {isLoggedIn ? 'ออกจากระบบ' : ' Sign in with Google'}
              </button>

              <button
                onClick={() => setShowAuthModal(false)}
                className="w-full text-[11px] text-[#5B5648] hover:underline"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}