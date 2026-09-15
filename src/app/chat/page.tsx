'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'สวัสดีครับ ผมกำลังเดินทางไปครับ ถึงประมาณ 08:30 น.', sender: 'them', time: '08:12 น.' },
    { id: 2, text: 'ขอบคุณค่ะ คุณแม่รอที่ประตู 2 นะคะ ใส่เสื้อสีฟ้าค่ะ', sender: 'me', time: '08:13 น.', read: true },
    { id: 3, text: 'รับทราบครับ เดี๋ยวถึงแล้วผมโทรแจ้งอีกทีนะครับ', sender: 'them', time: '08:14 น.' },
    { id: 4, text: 'ได้ค่ะ ขอบคุณมากค่ะ 🙏', sender: 'me', time: '08:15 น.', read: true },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim()) return;
    setMessages([
      ...messages,
      { id: Date.now(), text: inputText, sender: 'me', time: 'ตอนนี้', read: false },
    ]);
    setInputText('');
  };

  return (
    <div className="min-h-screen bg-[#132420] text-white font-sans p-4 flex flex-col items-center justify-center">
      <div className="w-[308px] h-[640px] bg-[#F7F0E4] text-[#221F19] rounded-[34px] shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header - เพิ่มรูปโปรไฟล์ตรงวงกลม */}
        <div className="bg-[#204A42] text-white p-3 flex items-center gap-3">
          <Link href="/booking" className="text-sm font-bold">←</Link>
          <div className="w-10 h-10 bg-[#DCE7E1] rounded-full flex items-center justify-center text-xl shadow-inner border border-white/20">
            🧑
          </div>
          <div>
            <h3 className="font-bold text-xs">คุณสมชาย</h3>
            <p className="text-[10px] text-emerald-200">กำลังเดินทางมา • ห่างออกไป 5 นาที</p>
          </div>
        </div>

        {/* Status Step Bar */}
        <div className="bg-white px-3 py-2 border-b border-[#DED2B8] flex justify-between items-center text-[10px] text-[#5B5648]">
          <span className="text-[#204A42] font-bold">✓ รับงานแล้ว</span>
          <span className="text-[#204A42] font-bold">✓ กำลังเดินทาง</span>
          <span className="bg-[#B85B42] text-white px-1.5 py-0.5 rounded font-bold">3 อยู่ระหว่างทำธุระ</span>
          <span className="opacity-50">4 สิ้นสุด</span>
        </div>

        {/* Banner ความปลอดภัย */}
        <div className="bg-[#F2E8D5] px-3 py-1.5 text-[9px] text-[#5B5648] text-center border-b border-[#DED2B8]">
          🛡️ ข้อความในแชทนี้ถูกบันทึกไว้ เพื่อความปลอดภัยของทั้งสองฝ่าย
        </div>

        {/* Chat Message List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[80%] p-2.5 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'me'
                    ? 'bg-[#204A42] text-white rounded-br-none'
                    : 'bg-white text-[#221F19] border border-[#DED2B8] rounded-bl-none shadow-sm'
                }`}
              >
                {msg.text}
              </div>
              
              {/* เวลา + คำว่า "อ่านแล้ว" สำหรับข้อความฝั่งเรา */}
              <div className="flex items-center gap-1 text-[9px] text-[#5B5648] mt-0.5 px-1">
                {msg.sender === 'me' && msg.read && (
                  <span className="text-[#204A42] font-semibold">อ่านแล้ว •</span>
                )}
                <span>{msg.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Complete Job Button */}
        <div className="px-3 pt-1">
          <Link href="/review">
            <button className="w-full bg-[#6B8E68] hover:bg-[#567553] text-white py-2 rounded-xl text-xs font-bold transition shadow flex items-center justify-center gap-1">
              ✓ กดเพื่อจบการทำงาน (Complete Job)
            </button>
          </Link>
        </div>

        {/* Input Bar - เพิ่มปุ่มแนบรูปและโลเคชั่น */}
        <div className="p-2.5 bg-white border-t border-[#DED2B8] flex items-center gap-1.5">
          {/* ปุ่มแนบไฟล์/รูปภาพ */}
          <button 
            title="ส่งรูปภาพ"
            onClick={() => alert('เลือกรูปภาพสำหรับส่ง')}
            className="w-8 h-8 rounded-full bg-[#F7F0E4] text-[#204A42] hover:bg-[#E2D7C3] flex items-center justify-center text-sm transition"
          >
            📷
          </button>
          
          {/* ปุ่มส่งตำแหน่ง/โลเคชั่น */}
          <button 
            title="ส่งตำแหน่งปัจจุบัน"
            onClick={() => alert('แชร์ตำแหน่งปัจจุบันของคุณแล้ว')}
            className="w-8 h-8 rounded-full bg-[#F7F0E4] text-[#204A42] hover:bg-[#E2D7C3] flex items-center justify-center text-sm transition"
          >
            📍
          </button>

          {/* ช่องพิมพ์ข้อความ */}
          <input
            type="text"
            placeholder="พิมพ์ข้อความ..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-[#F7F0E4] text-xs px-3 py-2 rounded-full outline-none text-[#221F19] placeholder-[#5B5648]"
          />

          {/* ปุ่มกดส่ง */}
          <button
            onClick={handleSend}
            className="w-8 h-8 rounded-full bg-[#B85B42] hover:bg-[#9E4A33] text-white flex items-center justify-center text-xs transition shadow"
          >
            ➔
          </button>
        </div>

      </div>
    </div>
  );
}