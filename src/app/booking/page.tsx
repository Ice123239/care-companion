'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
  const [bookingDate, setBookingDate] = useState('');
  const [todayStr, setTodayStr] = useState('');
  const [tomorrowStr, setTomorrowStr] = useState('');
  
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0]);
  const [customLocation, setCustomLocation] = useState('');
  const [selectedTime, setSelectedTime] = useState('09:00');
  const [hours, setHours] = useState(2);
  const [taskNote, setTaskNote] = useState('');

  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState('ชาย');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [medicalCondition, setMedicalCondition] = useState('');
  const [allergies, setAllergies] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [step, setStep] = useState<'form' | 'payment' | 'completed'>('form');
  const [paymentMethod, setPaymentMethod] = useState<'qr' | 'credit'>('qr');
  const [slipImage, setSlipImage] = useState<string | null>(null);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    setTodayStr(today);
    setTomorrowStr(tomorrow);
    setBookingDate(today);
  }, []);

  const hourlyRate = 350;
  const totalPrice = hourlyRate * hours;
  const finalLocation = selectedLocation === 'อื่นๆ (ระบุเอง)' ? customLocation : selectedLocation;

  const handleGoToPayment = () => {
    if (selectedLocation === 'อื่นๆ (ระบุเอง)' && !customLocation.trim()) {
      setErrorMsg('กรุณาระบุสถานที่เพิ่มเติมก่อนดำเนินการต่อ');
      return;
    }
    if (!patientName.trim()) {
      setErrorMsg('กรุณาระบุชื่อผู้รับบริการ');
      return;
    }
    if (!emergencyPhone.trim()) {
      setErrorMsg('กรุณาระบุเบอร์ติดต่อฉุกเฉิน');
      return;
    }
    setErrorMsg('');
    setStep('payment');
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (slipImage) {
        URL.revokeObjectURL(slipImage);
      }
      setSlipImage(URL.createObjectURL(file));
    }
  };

  const handleCompletePayment = () => {
    const newBooking = {
      id: Date.now(),
      companionName: 'คุณสมชาย',
      location: finalLocation,
      date: bookingDate,
      time: selectedTime,
      hours: hours,
      price: totalPrice,
      taskNote: taskNote || 'พาไปรับยา / ทำธุระ',
      userName: patientName,
      userAge: patientAge || '-',
      userGender: patientGender,
      phone: emergencyPhone,
      disease: medicalCondition || 'ไม่มี',
      allergy: allergies || 'ไม่มี',
      status: 'กำลังดำเนินการ',
    };

    const existingBookings = JSON.parse(localStorage.getItem('care_bookings') || '[]');
    const updatedBookings = [newBooking, ...existingBookings];
    localStorage.setItem('care_bookings', JSON.stringify(updatedBookings));

    setStep('completed');
  };

  return (
    <div className="min-h-screen bg-[#132420] text-white font-sans p-2 sm:p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-[360px] sm:max-w-[400px] h-[660px] bg-[#F7F0E4] text-[#221F19] rounded-[28px] sm:rounded-[34px] shadow-2xl overflow-hidden flex flex-col relative">
        
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
          <span className="text-[10px] bg-white/20 px-2.5 py-1 rounded-full text-white">Google Auth</span>
        </div>

        {/* Step 1: Booking Form */}
        {step === 'form' && (
          <div className="flex-1 overflow-y-auto p-3 space-y-3 text-xs">
            <div className="bg-white p-2.5 rounded-xl border border-[#DED2B8] flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-[#DCE7E1] rounded-full flex items-center justify-center text-base">🧑</div>
                <div>
                  <h3 className="font-bold text-xs text-[#221F19]">ผู้ช่วย: คุณสมชาย</h3>
                  <p className="text-[10px] text-[#5B5648]">ค่าบริการ: {hourlyRate} บาท / ชม.</p>
                </div>
              </div>
            </div>

            {errorMsg && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-1.5 rounded-xl text-[10px] text-center font-bold">
                {errorMsg}
              </div>
            )}

            <div className="bg-white p-3 rounded-xl border border-[#DED2B8] space-y-2 shadow-sm">
              <h4 className="font-semibold text-xs text-[#204A42] border-b pb-1">📅 รายละเอียดการนัดหมาย</h4>
              
              <div>
                <div className="flex justify-between items-center mb-0.5">
                  <label className="text-[10px] text-[#5B5648]">วันที่นัดหมาย</label>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => setBookingDate(todayStr)}
                      className={`text-[9px] px-2 py-0.5 rounded cursor-pointer ${bookingDate === todayStr ? 'bg-[#204A42] text-white' : 'bg-[#E9F0EC] text-[#204A42]'}`}
                    >
                      วันนี้
                    </button>
                    <button
                      type="button"
                      onClick={() => setBookingDate(tomorrowStr)}
                      className={`text-[9px] px-2 py-0.5 rounded cursor-pointer ${bookingDate === tomorrowStr ? 'bg-[#204A42] text-white' : 'bg-[#E9F0EC] text-[#204A42]'}`}
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
                    className="w-full text-[11px] p-1.5 border border-[#DED2B8] rounded bg-white outline-none"
                  />
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

            <div className="bg-white p-3 rounded-xl border border-[#DED2B8] space-y-2 shadow-sm">
              <h4 className="font-semibold text-xs text-[#B85B42] border-b pb-1">🩺 ข้อมูลผู้รับบริการ & ข้อควรระวัง</h4>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-[#5B5648] block mb-0.5">ชื่อ/สรรพนาม *</label>
                  <input 
                    type="text" 
                    placeholder="เช่น คุณตาซ่อน / ยายมล" 
                    value={patientName}
                    onChange={(e) => { setPatientName(e.target.value); setErrorMsg(''); }}
                    className="w-full text-[11px] p-1.5 border border-[#DED2B8] rounded bg-[#F7F0E4] outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-[#5B5648] block mb-0.5">เบอร์ติดต่อฉุกเฉิน *</label>
                  <input 
                    type="tel" 
                    placeholder="08X-XXX-XXXX" 
                    value={emergencyPhone}
                    onChange={(e) => { setEmergencyPhone(e.target.value); setErrorMsg(''); }}
                    className="w-full text-[11px] p-1.5 border border-[#DED2B8] rounded bg-[#F7F0E4] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-[#5B5648] block mb-0.5">อายุ (ปี)</label>
                  <input 
                    type="number" 
                    placeholder="เช่น 75" 
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    className="w-full text-[11px] p-1.5 border border-[#DED2B8] rounded bg-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-[#5B5648] block mb-0.5">เพศ</label>
                  <select 
                    value={patientGender}
                    onChange={(e) => setPatientGender(e.target.value)}
                    className="w-full text-[11px] p-1.5 border border-[#DED2B8] rounded bg-white outline-none"
                  >
                    <option value="ชาย">ชาย</option>
                    <option value="หญิง">หญิง</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] text-[#5B5648] block mb-0.5">โรคประจำตัว / ข้อควรระวังพิเศษ</label>
                <input 
                  type="text" 
                  placeholder="เช่น ความดันสูง, นั่งรถเข็น, ห้ามลุกเดินเอง" 
                  value={medicalCondition}
                  onChange={(e) => setMedicalCondition(e.target.value)}
                  className="w-full text-[11px] p-1.5 border border-[#DED2B8] rounded bg-white outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] text-[#5B5648] block mb-0.5">ประวัติการแพ้ยา / แพ้อาหาร</label>
                <input 
                  type="text" 
                  placeholder="เช่น แพ้ยาพารา, แพ้กุ้ง (ไม่มีใส่ 'ไม่มี')" 
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                  className="w-full text-[11px] p-1.5 border border-[#DED2B8] rounded bg-white outline-none"
                />
              </div>
            </div>

            <div className="bg-[#E9F0EC] p-2.5 rounded-xl border border-[#B8D1C5] flex justify-between items-center text-xs">
              <span className="font-semibold text-[#204A42]">ราคารวม ({hours} ชม.)</span>
              <span className="font-bold text-[#B85B42] text-sm">{totalPrice} บาท</span>
            </div>

            <button 
              onClick={handleGoToPayment}
              className="w-full bg-[#204A42] hover:bg-[#15332d] text-white py-2.5 rounded-lg text-xs font-bold transition shadow active:scale-95 cursor-pointer"
            >
              ดำเนินการต่อ (ไปหน้าชำระเงิน)
            </button>
          </div>
        )}

        {/* Step 2: Payment */}
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
                      <div className="mt-2 relative max-h-24 h-24 w-full">
                        <Image src={slipImage} alt="Slip Preview" fill className="object-contain rounded-lg border" />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <button 
                onClick={handleCompletePayment}
                disabled={paymentMethod === 'qr' && !slipImage}
                className={`w-full py-2.5 rounded-lg text-xs font-bold transition shadow ${
                  paymentMethod === 'qr' && !slipImage
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#204A42] hover:bg-[#15332d] text-white active:scale-95 cursor-pointer'
                }`}
              >
                ยืนยันการชำระเงิน
              </button>
              <button 
                onClick={() => setStep('form')}
                className="w-full bg-white text-[#5B5648] py-2 rounded-lg text-xs font-semibold border border-[#DED2B8] cursor-pointer"
              >
                ย้อนกลับไปแก้ไขข้อมูล
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Completed */}
        {step === 'completed' && (
          <div className="flex-1 p-4 flex flex-col items-center justify-between text-center overflow-y-auto">
            <div className="space-y-3 my-auto w-full">
              <div className="w-14 h-14 bg-[#204A42] text-white rounded-full flex items-center justify-center text-2xl mx-auto shadow">
                ✓
              </div>
              <h2 className="font-bold text-base text-[#204A42]">ส่งคำขอและชำระเงินสำเร็จ!</h2>
              
              <div className="bg-white p-3 rounded-xl border border-[#DED2B8] text-left text-xs space-y-1 shadow-sm">
                <p><strong>ผู้รับบริการ:</strong> {patientName} ({patientGender}, {patientAge} ปี)</p>
                <p><strong>เบอร์ฉุกเฉิน:</strong> {emergencyPhone}</p>
                <p><strong>สถานที่:</strong> {finalLocation}</p>
                <p><strong>เวลานัด:</strong> {bookingDate} | {selectedTime} น. ({hours} ชม.)</p>
                <p><strong>ยอดชำระแล้ว:</strong> <span className="text-[#B85B42] font-bold">{totalPrice} บาท</span></p>
              </div>
            </div>

            <div className="w-full space-y-2 pt-2">
              <Link 
                href={`/chat?companionName=${encodeURIComponent('คุณสมชาย')}&location=${encodeURIComponent(finalLocation)}&time=${encodeURIComponent(selectedTime)}&hours=${hours}`} 
                className="block w-full"
              >
                <button className="w-full bg-[#204A42] hover:bg-[#15332d] text-white py-2.5 rounded-lg text-xs font-bold transition shadow cursor-pointer">
                  💬 พูดคุยกับผู้ช่วย (เปิดแชต)
                </button>
              </Link>
              <Link href="/history" className="block w-full">
                <button className="w-full bg-[#D88A34] hover:bg-[#c27a2b] text-white py-2 rounded-lg text-xs font-bold transition shadow cursor-pointer">
                  📋 ดูประวัติการจองทั้งหมด
                </button>
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}