'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

interface Booking {
  id: string | number;
  companionName?: string;
  companion_name?: string;
  location: string;
  date: string;
  time: string;
  hours: number | string;
  userName?: string;
  user_name?: string;
  userGender?: string;
  user_gender?: string;
  userAge?: string;
  user_age?: string;
  phone: string;
  disease: string;
  allergy: string;
  price: number;
  status: string;
  taskNote?: string;
  task_note?: string;
}

export default function HistoryPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      // 1. ถ้ามี User ให้ดึงข้อมูลจาก Supabase ที่ตรงกับ user_id
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        // Map คอลัมน์จาก DB ให้เข้ากับ UI
        const mappedData = data.map((b: any) => ({
          ...b,
          companionName: b.companion_name || b.companionName,
          userName: b.user_name || b.userName,
          userGender: b.user_gender || b.userGender,
          userAge: b.user_age || b.userAge,
          taskNote: b.task_note || b.taskNote,
        }));
        setBookings(mappedData);
        setLoading(false);
        return;
      }
    }

    // 2. ถ้าไม่มีข้อมูลใน Supabase หรือไม่ได้ล็อกอิน ให้ fallback มาใช้ localStorage
    const saved = localStorage.getItem('care_bookings');
    if (saved) {
      try {
        setBookings(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse local bookings:', e);
      }
    }
    setLoading(false);
  };

  const handleDeleteBooking = async (id: string | number) => {
    if (confirm('คุณต้องการลบประวัติการจองนี้ใช่หรือไม่?')) {
      // ลบจาก Supabase (ถ้าเป็น id ของ DB)
      await supabase.from('bookings').delete().eq('id', id);

      // ลบจาก State & LocalStorage
      const updated = bookings.filter((b) => b.id !== id);
      setBookings(updated);
      localStorage.setItem('care_bookings', JSON.stringify(updated));
    }
  };

  const handleClearAll = async () => {
    if (confirm('คุณต้องการลบประวัติการจองทั้งหมดใช่หรือไม่?')) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('bookings').delete().eq('user_id', user.id);
      }
      setBookings([]);
      localStorage.removeItem('care_bookings');
    }
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-[#132420] text-white p-4 flex justify-center items-center font-sans">
      <div className="w-full max-w-[400px] h-[680px] bg-[#204A42] rounded-[32px] shadow-2xl flex flex-col overflow-hidden border border-[#2e6258]">
        
        {/* Header */}
        <div className="p-4 bg-[#15332d] flex items-center justify-between border-b border-[#2e6258]">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-xl hover:opacity-80">←</Link>
            <h1 className="font-bold text-base">ประวัติการจองของคุณ</h1>
          </div>
          {bookings.length > 0 && (
            <button
              onClick={handleClearAll}
              className="text-xs text-red-300 hover:text-red-100 bg-red-900/40 px-2.5 py-1 rounded-lg transition border border-red-500/30 cursor-pointer"
            >
              ล้างทั้งหมด
            </button>
          )}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-[#F7F0E4] text-[#221F19]">
          {loading ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 text-sm">
              <p>กำลังโหลดข้อมูลประวัติการจอง...</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 text-sm gap-2">
              <span className="text-3xl">📋</span>
              <p>ไม่มีประวัติการจอง</p>
              <Link href="/booking" className="mt-2 text-xs bg-[#204A42] text-white px-4 py-2 rounded-xl hover:bg-[#15332d] transition">
                ไปหน้านัดหมาย
              </Link>
            </div>
          ) : (
            bookings.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-3.5 shadow-sm border border-[#E8DCC4] relative">
                
                {/* Status Badge & Delete Button */}
                <div className="flex justify-between items-center mb-2 pb-2 border-b border-gray-100">
                  <span className="font-bold text-xs text-[#204A42]">
                    ผู้ช่วย: {item.companionName || item.companion_name || 'คุณสมชาย'}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="bg-[#D88A34] text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
                      {item.status || 'กำลังดำเนินการ'}
                    </span>
                    <button
                      onClick={() => handleDeleteBooking(item.id)}
                      className="text-gray-400 hover:text-red-500 text-xs px-1 cursor-pointer"
                      title="ลบรายการนี้"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                {/* Booking Info */}
                <div className="space-y-1 text-[11px] text-gray-700">
                  <p className="flex items-center gap-1 font-semibold text-gray-900">
                    📍 {item.location || 'ไม่ระบุสถานที่'}
                  </p>
                  <p className="text-gray-600">
                    ⏰ {item.date} | {item.time} น. ({item.hours} ชม.)
                  </p>
                  {(item.taskNote || item.task_note) && (
                    <p className="text-gray-500 italic text-[10px]">
                      📝 Note: {item.taskNote || item.task_note}
                    </p>
                  )}
                </div>

                {/* Patient Box */}
                <div className="mt-2 bg-[#F7F0E4]/60 p-2.5 rounded-xl border border-[#E8DCC4] text-[10px] space-y-0.5 text-gray-700">
                  <p className="font-bold text-[#204A42]">
                    🩺 ผู้รับบริการ: {item.userName || item.user_name || '-'} ({item.userGender || item.user_gender || '-'}, {item.userAge || item.user_age || '-'} ปี)
                  </p>
                  <p>📞 เบอร์ฉุกเฉิน: {item.phone || '-'}</p>
                  <p>• โรค/ข้อควรระวัง: {item.disease || '-'}</p>
                  <p>• ประวัติแพ้ยา/อาหาร: {item.allergy || '-'}</p>
                </div>

                {/* Footer Action */}
                <div className="mt-3 pt-2 border-t border-gray-100 flex justify-between items-center">
                  <span className="font-bold text-xs text-[#204A42]">
                    ราคารวม: {item.price} บาท
                  </span>
                  <div className="flex gap-1.5">
                    <Link
                      href={`/chat?companionName=${encodeURIComponent(item.companionName || item.companion_name || 'คุณสมชาย')}&location=${encodeURIComponent(item.location || '')}&time=${encodeURIComponent(item.time || '')}&hours=${encodeURIComponent(String(item.hours || ''))}`}
                      className="bg-[#204A42] text-white text-[10px] px-3 py-1.5 rounded-xl font-medium hover:bg-[#15332d] transition"
                    >
                      💬 คุยต่อ
                    </Link>
                    <Link
                      href={`/review?companionName=${encodeURIComponent(item.companionName || item.companion_name || 'คุณสมชาย')}`}
                      className="bg-[#D88A34] text-white text-[10px] px-3 py-1.5 rounded-xl font-medium hover:bg-[#c27a2b] transition"
                    >
                      ⭐ รีวิว
                    </Link>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}