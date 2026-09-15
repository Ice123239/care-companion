'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const LOCATIONS = [
  'รพ.จุฬาลงกรณ์ (ปทุมวัน)',
  'รพ.รามาธิบดี (พญาไท)',
  'รพ.ศิริราช (บางกอกน้อย)',
  'กรุงเทพมหานคร - บางกะปิ',
  'กรุงเทพมหานคร - ห้วยขวาง',
  'นนทบุรี',
  'ปทุมธานี',
  'อื่นๆ (ระบุเอง)',
];

export default function BookingPage() {
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0]);
  const [customLocation, setCustomLocation] = useState('');
  const [selectedTime, setSelectedTime] = useState('09:00');
  const [hours, setHours] = useState(2);
  const [medicationNote, setMedicationNote] = useState('');
  const [taskNote, setTaskNote] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const hourlyRate = 350;
  const totalPrice = hourlyRate * hours;

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-[#132420] text-white font-sans p-4 flex flex-col items-center justify-center">
        <div className="w-[308px] h-[640px] bg-[#F7F0E4] text-[#221F19] rounded-[34px] shadow-2xl overflow-hidden flex flex-col items-center justify-center p-6 text-center space-y-4">
          <div className="w-16 h-16 bg-[#204A42] text-white rounded-full flex items-center justify-center text-3xl shadow-lg">
            ✓
          </div>
          <h2 className="font-bold text-lg text-[#204A42]">ส่งคำขอจองเรียบร้อย!</h2>
          <p className="text-xs text-[#5B5648] leading-relaxed">
            ระบบได้บันทึกการนัดหมายแล้ว ผู้ช่วยจะติดต่อกลับเพื่อยืนยันรายละเอียดเพิ่มเติมครับ
          </p>
          <div className="bg-white p-3 rounded-xl border border-[#DED2B8] text-left text-xs space-y-1.5 w-full">
            <p><strong>เวลานัด:</strong> {selectedTime} น. ({hours} ชม.)</p>
            <p><strong>ยอดรวม:</strong> <span className="text-[#B85B42] font-bold">{totalPrice} บาท</span></p>
          </div>
          
          {/* ลิงก์นำทางไปยังหน้ารีวิวหลังจากจองสำเร็จ */}
          <Link href="/review" className="w-full">
            <button className="w-full bg-[#204A42] hover:bg-[#15332d] text-white py-2.5 rounded-lg text-xs font-bold transition shadow">
              ให้คะแนนการบริการ
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#132420] text-white font-sans p-4 flex flex-col items-center justify-center">
      <div className="w-[308px] h-[640px] bg-[#F7F0E4] text-[#221F19] rounded-[34px] shadow-2xl overflow-hidden flex flex-col">
        
        {/* Appbar */}
        <div className="bg-[#204A42] text-white p-3 flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-sm">
            <Link href="/companion" className="hover:opacity-80 text-base">←</Link>
            <span>ยืนยันการจอง</span>
          </div>
          <span className="text-xs bg-white/20 px-2 py-1 rounded-full text-white">G Sign in</span>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          
          {/* Companion Info & Rate */}
          <div className="bg-white p-3 rounded-xl border border-[#DED2B8] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-[#DCE7E1] rounded-full flex items-center justify-center text-lg">🧑</div>
              <div>
                <h3 className="font-bold text-xs text-[#221F19]">ผู้ช่วย: คุณสมชาย</h3>
                <p className="text-[10px] text-[#5B5648]">เรทบริการ: {hourlyRate} บาท / ชม.</p>
              </div>
            </div>
          </div>

          {/* Appointment Form */}
          <div className="bg-white p-3 rounded-xl border border-[#DED2B8] space-y-2.5">
            <h4 className="font-semibold text-xs text-[#204A42] border-b pb-1">รายละเอียดการนัดหมาย</h4>
            
            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-[#5B5648] block mb-0.5">วันที่นัดหมาย</label>
                <input 
                  type="date" 
                  className="w-full text-[11px] p-1.5 border border-[#DED2B8] rounded bg-[#F7F0E4] outline-none" 
                />
              </div>
              <div>
                <label className="text-[10px] text-[#5B5648] block mb-0.5">เวลานัดหมาย</label>
                <input 
                  type="time" 
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full text-[11px] p-1.5 border border-[#DED2B8] rounded bg-[#F7F0E4] outline-none" 
                />
              </div>
            </div>

            {/* Hours selection */}
            <div>
              <label className="text-[10px] text-[#5B5648] block mb-0.5">จำนวนชั่วโมงที่ใช้บริการ</label>
              <select 
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="w-full text-[11px] p-1.5 border border-[#DED2B8] rounded bg-[#F7F0E4] outline-none"
              >
                <option value={1}>1 ชั่วโมง</option>
                <option value={2}>2 ชั่วโมง</option>
                <option value={3}>3 ชั่วโมง</option>
                <option value={4}>4 ชั่วโมง (ครึ่งวัน)</option>
                <option value={8}>8 ชั่วโมง (เต็มวัน)</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="text-[10px] text-[#5B5648] block mb-0.5">สถานที่นัดพบ / โรงพยาบาล</label>
              <select 
                value={selectedLocation} 
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full text-[11px] p-1.5 border border-[#DED2B8] rounded bg-[#F7F0E4] outline-none text-[#221F19]"
              >
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            {selectedLocation === 'อื่นๆ (ระบุเอง)' && (
              <input 
                type="text" 
                placeholder="ระบุสถานที่เพิ่มเติม..." 
                value={customLocation}
                onChange={(e) => setCustomLocation(e.target.value)}
                className="w-full text-[11px] p-1.5 border border-[#DED2B8] rounded bg-white outline-none"
              />
            )}

            {/* Scope of Work */}
            <div>
              <label className="text-[10px] text-[#5B5648] block mb-0.5">สิ่งที่ให้ผู้ช่วยทำ (ขอบเขตงาน)</label>
              <textarea 
                rows={2}
                placeholder="เช่น ช่วยต่อคิว ยื่นเอกสาร รับยา เข็นรถเข็น..." 
                value={taskNote}
                onChange={(e) => setTaskNote(e.target.value)}
                className="w-full text-[11px] p-1.5 border border-[#DED2B8] rounded bg-white outline-none resize-none"
              />
            </div>

            {/* Medication Notes */}
            <div>
              <label className="text-[10px] text-[#5B5648] block mb-0.5">ข้อมูลยา / โรคประจำตัวที่ต้องระวัง</label>
              <input 
                type="text" 
                placeholder="เช่น มียาหลังอาหารทันที, แพ้ยา..." 
                value={medicationNote}
                onChange={(e) => setMedicationNote(e.target.value)}
                className="w-full text-[11px] p-1.5 border border-[#DED2B8] rounded bg-white outline-none"
              />
            </div>
          </div>

          {/* Price Summary */}
          <div className="bg-[#E9F0EC] p-2.5 rounded-xl border border-[#B8D1C5] flex justify-between items-center text-xs">
            <span className="font-semibold text-[#204A42]">ราคารวมทั้งสิ้น ({hours} ชม.)</span>
            <span className="font-bold text-[#B85B42] text-sm">{totalPrice} บาท</span>
          </div>

          {/* Submit Button */}
          <button 
            onClick={() => setIsCompleted(true)}
            className="w-full bg-[#204A42] hover:bg-[#15332d] text-white py-2.5 rounded-lg text-xs font-bold transition shadow active:scale-95"
          >
            เสร็จสิ้น / ยืนยันส่งคำขอจอง
          </button>

        </div>

      </div>
    </div>
  );
}