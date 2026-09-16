'use client';

import React, { useState, ChangeEvent } from 'react';
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
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [bookingDate, setBookingDate] = useState(todayStr);
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0]);
  const [customLocation, setCustomLocation] = useState('');
  const [selectedTime, setSelectedTime] = useState('09:00');
  const [hours, setHours] = useState(2);
  const [taskNote, setTaskNote] = useState('');
  
  // Validation Error State
  const [errorMsg, setErrorMsg] = useState('');

  // Step State: 'form' -> 'payment' -> 'completed'
  const [step, setStep] = useState<'form' | 'payment' | 'completed'>('form');
  const [paymentMethod, setPaymentMethod] = useState<'qr' | 'credit'>('qr');
  
  // Slip Upload State
  const [slipImage, setSlipImage] = useState<string | null>(null);

  const hourlyRate = 350;
  const totalPrice = hourlyRate * hours;

  // ตรวจสอบข้อมูลก่อนไปหน้าชำระเงิน
  const handleGoToPayment = () => {
    if (selectedLocation === 'อื่นๆ (ระบุเอง)' && !customLocation.trim()) {
      setErrorMsg('กรุณาระบุสถานที่เพิ่มเติมก่อนดำเนินการต่อ');
      return;
    }
    setErrorMsg('');
    setStep('payment');
  };

  // จัดการอัปโหลดไฟล์สลิป
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSlipImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-[#132420] text-white font-sans p-2 sm:p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-[360px] sm:max-w-[400px] h-[640px] bg-[#F7F0E4] text-[#221F19] rounded-[28px] sm:rounded-[34px] shadow-2xl overflow-hidden flex flex-col relative">
        
        {/* Appbar */}
        <div className="bg-[#204A42] text-white p-3 flex justify-between items-center shadow">
          <div className="flex items-center gap-2 font-bold text-sm">
            <Link href="/" className="hover:opacity-80 text-base">←</Link>
            <span>
              {step === 'form' && 'ยื่นคำขอรับบริการ'}
              {step === 'payment' && 'ชำระเงิน'}
              {step === 'completed' && 'ส่งคำขอเรียบร้อย'}
            </span>
          </div>
          <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full text-white">Google Auth</span>
        </div>

        {/* Step 1: Booking Form */}
        {step === 'form' && (
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            <div className="bg-white p-2.5 rounded-xl border border-[#DED2B8] flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 bg-[#DCE7E1] rounded-full flex items-center justify-center text-lg">🧑</div>
                <div>
                  <h3 className="font-bold text-xs text-[#221F19]">ผู้ช่วย: คุณสมชาย</h3>
                  <p className="text-[10px] text-[#5B5648]">ค่าบริการ: {hourlyRate} บาท / ชม.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-3 rounded-xl border border-[#DED2B8] space-y-2.5 shadow-sm">
              <h4 className="font-semibold text-xs text-[#204A42] border-b pb-1">รายละเอียดการนัดหมาย</h4>
              
              <div>
                <div className="flex justify-between items-center mb-0.5">
                  <label className="text-[10px] text-[#5B5648]">วันที่นัดหมาย</label>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => setBookingDate(todayStr)}
                      className={`text-[9px] px-2 py-0.5 rounded ${bookingDate === todayStr ? 'bg-[#204A42] text-white' : 'bg-[#E9F0EC] text-[#204A42]'}`}
                    >
                      วันนี้
                    </button>
                    <button
                      type="button"
                      onClick={() => setBookingDate(tomorrowStr)}
                      className={`text-[9px] px-2 py-0.5 rounded ${bookingDate === tomorrowStr ? 'bg-[#204A42] text-white' : 'bg-[#E9F0EC] text-[#204A42]'}`}
                    >
                      พรุ่งนี้
                    </button>
                  </div>
                </div>
                <input 
                  type="date" 
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full text-[11px] p-1.5 border border-[#DED2B8] rounded bg-[#F7F0E4] outline-none" 
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-[#5B5648] block mb-0.5">เวลานัดหมาย</label>
                  <input 
                    type="time" 
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full text-[11px] p-1.5 border border-[#DED2B8] rounded bg-[#F7F0E4] outline-none" 
                  />
                </div>
                <div>
                  <label className="text-[10px] text-[#5B5648] block mb-0.5">จำนวนชั่วโมง</label>
                  <select 
                    value={hours}
                    onChange={(e) => setHours(Number(e.target.value))}
                    className="w-full text-[11px] p-1.5 border border-[#DED2B8] rounded bg-[#F7F0E4] outline-none"
                  >
                    <option value={1}>1 ชม.</option>
                    <option value={2}>2 ชม.</option>
                    <option value={3}>3 ชม.</option>
                    <option value={4}>4 ชม. (ครึ่งวัน)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] text-[#5B5648] block mb-0.5">สถานที่นัดพบ / จุดหมาย</label>
                <select 
                  value={selectedLocation} 
                  onChange={(e) => {
                    setSelectedLocation(e.target.value);
                    setErrorMsg('');
                  }}
                  className="w-full text-[11px] p-1.5 border border-[#DED2B8] rounded bg-[#F7F0E4] outline-none"
                >
                  {LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              {selectedLocation === 'อื่นๆ (ระบุเอง)' && (
                <div>
                  <input 
                    type="text" 
                    placeholder="ระบุสถานที่เพิ่มเติม..." 
                    value={customLocation}
                    onChange={(e) => {
                      setCustomLocation(e.target.value);
                      setErrorMsg('');
                    }}
                    className={`w-full text-[11px] p-1.5 border rounded bg-white outline-none ${errorMsg ? 'border-red-500' : 'border-[#DED2B8]'}`}
                  />
                  {errorMsg && <p className="text-red-500 text-[10px] mt-0.5">{errorMsg}</p>}
                </div>
              )}

              <div>
                <label className="text-[10px] text-[#5B5648] block mb-0.5">รายละเอียดธุระที่ต้องทำ</label>
                <textarea 
                  rows={2}
                  placeholder="เช่น ช่วยพาเข็นรถเข็น, ช่วยต่อคิวรับยา..." 
                  value={taskNote}
                  onChange={(e) => setTaskNote(e.target.value)}
                  className="w-full text-[11px] p-1.5 border border-[#DED2B8] rounded bg-white outline-none resize-none"
                />
              </div>
            </div>

            <div className="bg-[#E9F0EC] p-2.5 rounded-xl border border-[#B8D1C5] flex justify-between items-center text-xs">
              <span className="font-semibold text-[#204A42]">ราคารวม ({hours} ชม.)</span>
              <span className="font-bold text-[#B85B42] text-sm">{totalPrice} บาท</span>
            </div>

            <button 
              onClick={handleGoToPayment}
              className="w-full bg-[#204A42] hover:bg-[#15332d] text-white py-2.5 rounded-lg text-xs font-bold transition shadow active:scale-95"
            >
              ดำเนินการต่อ (ไปหน้าชำระเงิน)
            </button>
          </div>
        )}

        {/* Step 2: Payment Gateway + Slip Upload */}
        {step === 'payment' && (
          <div className="flex-1 overflow-y-auto p-4 space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-xl border border-[#DED2B8] text-center space-y-1">
                <p className="text-[11px] text-[#5B5648]">ยอดชำระทั้งสิ้น</p>
                <h3 className="text-xl font-bold text-[#B85B42]">{totalPrice} บาท</h3>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-[#204A42]">เลือกช่องทางชำระเงิน</label>
                <div 
                  onClick={() => setPaymentMethod('qr')}
                  className={`p-3 rounded-xl border text-xs cursor-pointer flex justify-between items-center ${paymentMethod === 'qr' ? 'border-[#204A42] bg-[#E9F0EC]' : 'border-[#DED2B8] bg-white'}`}
                >
                  <span>📲 Thai QR PromptPay</span>
                  {paymentMethod === 'qr' && '✓'}
                </div>
                <div 
                  onClick={() => setPaymentMethod('credit')}
                  className={`p-3 rounded-xl border text-xs cursor-pointer flex justify-between items-center ${paymentMethod === 'credit' ? 'border-[#204A42] bg-[#E9F0EC]' : 'border-[#DED2B8] bg-white'}`}
                >
                  <span>💳 บัตรเครดิต / เดบิต</span>
                  {paymentMethod === 'credit' && '✓'}
                </div>
              </div>

              {paymentMethod === 'qr' && (
                <div className="bg-white p-3 rounded-xl border border-[#DED2B8] text-center space-y-2">
                  <div className="w-24 h-24 bg-[#204A42] text-white mx-auto flex items-center justify-center rounded-lg text-xs font-mono">
                    [ QR CODE ]
                  </div>
                  
                  {/* ปุ่มแนบสลิปการโอนเงิน */}
                  <div className="border-dashed border-2 border-[#DED2B8] p-2 rounded-xl bg-[#F7F0E4]">
                    <label className="cursor-pointer block text-xs font-semibold text-[#204A42]">
                      {slipImage ? '✓ เปลี่ยนรูปสลิป' : '＋ แนบสลิปการโอนเงิน'}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                    {slipImage && (
                      <img src={slipImage} alt="Slip Preview" className="mt-2 max-h-24 mx-auto rounded-lg border" />
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <button 
                onClick={() => setStep('completed')}
                disabled={paymentMethod === 'qr' && !slipImage}
                className={`w-full py-2.5 rounded-lg text-xs font-bold transition shadow ${
                  paymentMethod === 'qr' && !slipImage
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#204A42] hover:bg-[#15332d] text-white active:scale-95'
                }`}
              >
                ยืนยันการชำระเงิน
              </button>
              <button 
                onClick={() => setStep('form')}
                className="w-full bg-white text-[#5B5648] py-2 rounded-lg text-xs font-semibold border border-[#DED2B8]"
              >
                ย้อนกลับไปแก้ไขข้อมูล
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Completion */}
        {step === 'completed' && (
          <div className="flex-1 p-4 flex flex-col items-center justify-between text-center">
            <div className="space-y-3 my-auto w-full">
              <div className="w-14 h-14 bg-[#204A42] text-white rounded-full flex items-center justify-center text-2xl mx-auto shadow">
                ✓
              </div>
              <h2 className="font-bold text-base text-[#204A42]">ส่งคำขอและชำระเงินสำเร็จ!</h2>
              
              <div className="bg-white p-3 rounded-xl border border-[#DED2B8] text-left text-xs space-y-1 shadow-sm">
                <p><strong>วันที่:</strong> {bookingDate}</p>
                <p><strong>สถานที่:</strong> {selectedLocation === 'อื่นๆ (ระบุเอง)' ? customLocation : selectedLocation}</p>
                <p><strong>เวลานัด:</strong> {selectedTime} น. ({hours} ชม.)</p>
                <p><strong>ยอดชำระแล้ว:</strong> <span className="text-[#B85B42] font-bold">{totalPrice} บาท</span></p>
              </div>
            </div>

            <div className="w-full space-y-2 pt-2">
              <Link href="/chat" className="block w-full">
                <button className="w-full bg-[#204A42] hover:bg-[#15332d] text-white py-2.5 rounded-lg text-xs font-bold transition shadow">
                  💬 พูดคุยกับผู้ช่วย (เปิดแชต)
                </button>
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}