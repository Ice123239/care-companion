'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface Message {
  id: number;
  text?: string;
  image?: string;
  sender: 'user' | 'companion';
  time: string;
}

function ChatContent() {
  const searchParams = useSearchParams();

  // State สำหรับเก็บข้อมูลการจอง
  const [jobInfo, setJobInfo] = useState({
    bookingId: '',
    companionName: 'คุณสมชาย',
    location: 'รพ.จุฬาลงกรณ์',
    time: '09:00',
    hours: '2',
  });

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. โหลดข้อมูลงาน และประวัติแชทแยกตามงาน/ผู้ดูแล
  useEffect(() => {
    let currentCompanion = searchParams.get('companionName') || 'คุณสมชาย';
    let currentLocation = searchParams.get('location') || 'รพ.จุฬาลงกรณ์';
    let currentTime = searchParams.get('time') || '09:00';
    let currentHours = searchParams.get('hours') || '2';
    let currentBookingId = searchParams.get('bookingId') || '';

    const savedBookings = localStorage.getItem('care_bookings');
    if (savedBookings) {
      try {
        const bookings = JSON.parse(savedBookings);
        if (bookings && bookings.length > 0) {
          const latest = bookings[0];
          currentBookingId = currentBookingId || latest.id || '';
          currentCompanion = searchParams.get('companionName') || latest.companionName || currentCompanion;
          currentLocation = searchParams.get('location') || latest.location || currentLocation;
          currentTime = searchParams.get('time') || latest.time || currentTime;
          currentHours = searchParams.get('hours') || latest.hours || currentHours;
        }
      } catch (e) {
        console.error('Error loading booking data:', e);
      }
    }

    setJobInfo({
      bookingId: currentBookingId,
      companionName: currentCompanion,
      location: currentLocation,
      time: currentTime,
      hours: currentHours,
    });

    // สร้าง Key สำหรับเก็บแชทแยกตามงาน หรือแยกตามชื่อผู้ดูแล
    const chatStorageKey = currentBookingId 
      ? `care_chat_messages_${currentBookingId}` 
      : `care_chat_messages_${currentCompanion}`;

    const savedChat = localStorage.getItem(chatStorageKey);
    
    if (savedChat) {
      try {
        setMessages(JSON.parse(savedChat));
      } catch (e) {
        console.error('Error loading chat history:', e);
      }
    } else {
      // หากเป็นแชทใหม่ของรายการนี้ ให้เริ่มข้อความใหม่เสมอ
      const initialMsg: Message = {
        id: Date.now(),
        text: `สวัสดีครับ ยินดีให้บริการครับ นัดหมายที่ ${currentLocation} เวลา ${currentTime} น. ใช่ไหมครับ?`,
        sender: 'companion',
        time: currentTime,
      };
      setMessages([initialMsg]);
      localStorage.setItem(chatStorageKey, JSON.stringify([initialMsg]));
    }
  }, [searchParams]);

  // บันทึกข้อความลง LocalStorage และ Auto Scroll
  useEffect(() => {
    if (messages.length > 0) {
      const chatStorageKey = jobInfo.bookingId 
        ? `care_chat_messages_${jobInfo.bookingId}` 
        : `care_chat_messages_${jobInfo.companionName}`;
        
      localStorage.setItem(chatStorageKey, JSON.stringify(messages));
    }
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, jobInfo]);

  // ฟังก์ชันส่งข้อความพร้อม Delay ตอบกลับ
  const handleSendMessage = (textToSend?: string, imageToSend?: string) => {
    const text = textToSend || inputText;
    if ((!text.trim() && !imageToSend) || isTyping) return;

    const currentTimeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const userMsg: Message = {
      id: Date.now(),
      text: text.trim() ? text : undefined,
      image: imageToSend,
      sender: 'user',
      time: currentTimeStr,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    setIsTyping(true);

    // หน่วงเวลา 1.5 วินาทีเพื่อให้ดูเหมือนพิมพ์จริง
    setTimeout(() => {
      setIsTyping(false);

      let replyText = 'รับทราบครับผม เดี๋ยวผมเตรียมตัวและออกเดินทางตามเวลาครับ!';
      const lowerText = (text || '').toLowerCase();

      if (lowerText.includes('ถึง') || lowerText.includes('ไหน')) {
        replyText = 'กำลังเดินทางครับ อีกประมาณ 10-15 นาทีจะถึงจุดนัดพบครับ';
      } else if (lowerText.includes('พร้อม') || lowerText.includes('เสร็จ')) {
        replyText = 'รับทราบครับ ผมพร้อมแสตนด์บายดูแลผู้ป่วยเรียบร้อยครับ';
      } else if (lowerText.includes('ขอบคุณ')) {
        replyText = 'ยินดีมากๆ ครับ เต็มใจให้บริการครับ 😊';
      } else if (imageToSend) {
        replyText = 'ได้รับรูปภาพเรียบร้อยครับ ขอบคุณครับ';
      }

      const replyMsg: Message = {
        id: Date.now() + 1,
        text: replyText,
        sender: 'companion',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, replyMsg]);
    }, 1500);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleSendMessage('', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEmergencyCall = () => {
    alert(`กำลังโทรออกหา ${jobInfo.companionName} (เบอร์ติดต่อฉุกเฉิน: 081-XXX-XXXX)`);
  };

  return (
    <div className="w-full max-w-[360px] sm:max-w-[400px] h-[640px] bg-[#F7F0E4] text-[#221F19] rounded-[28px] sm:rounded-[34px] shadow-2xl overflow-hidden flex flex-col relative border border-[#2e6258]">
      
      {/* Dynamic Header */}
      <div className="bg-[#204A42] text-white p-3 shadow flex flex-col gap-1.5 shrink-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-xs">
            <Link href="/history" className="hover:opacity-80 text-base">←</Link>
            <span>แชตกับ {jobInfo.companionName}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button 
              onClick={handleEmergencyCall}
              className="bg-[#B85B42] hover:bg-[#a04e37] text-white p-1.5 rounded-full transition text-xs flex items-center justify-center cursor-pointer"
              title="ติดต่อฉุกเฉิน"
            >
              📞
            </button>

            <Link
              href={`/review?companionName=${encodeURIComponent(jobInfo.companionName)}`}
              className="bg-[#D88A34] hover:bg-[#c27a2b] text-white px-2 py-1 rounded-lg text-[10px] font-bold transition shadow flex items-center gap-1"
            >
              ⭐ เสร็จสิ้น / ให้คะแนน
            </Link>
          </div>
        </div>
        
        {/* Dynamic Job Summary Header */}
        <div className="bg-[#15332d] p-1.5 rounded-lg text-[10px] flex justify-between items-center text-white/90 border border-[#2e6258]">
          <span className="truncate max-w-[200px]">📍 นัดหมาย: {jobInfo.location}</span>
          <span>⏰ {jobInfo.time} น. ({jobInfo.hours} ชม.)</span>
        </div>
      </div>

      {/* Chat Body */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-[#F2E8D5]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[80%] px-3 py-2 rounded-2xl text-xs leading-relaxed shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-[#204A42] text-white rounded-br-none'
                  : 'bg-white text-[#221F19] rounded-bl-none border border-[#DED2B8]'
              }`}
            >
              {msg.image && (
                <img src={msg.image} alt="Attachment" className="rounded-lg mb-1 max-h-40 object-cover" />
              )}
              {msg.text && <div>{msg.text}</div>}
            </div>
            <span className="text-[9px] text-[#5B5648] px-1 mt-0.5">{msg.time}</span>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex flex-col items-start">
            <div className="bg-white border border-[#DED2B8] text-[#5B5648] px-3 py-1.5 rounded-2xl rounded-bl-none text-xs italic shadow-sm flex items-center gap-1">
              <span>กำลังพิมพ์</span>
              <span className="flex gap-0.5 ml-1">
                <span className="w-1 h-1 bg-gray-500 rounded-full animate-bounce"></span>
                <span className="w-1 h-1 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1 h-1 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </span>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Quick Replies Bar */}
      <div className="px-2 py-1.5 bg-[#EBE0C9] border-t border-[#DED2B8] flex gap-1.5 overflow-x-auto text-[10px] shrink-0 no-scrollbar">
        <button 
          disabled={isTyping}
          onClick={() => handleSendMessage('ผู้ป่วยพร้อมเดินทางแล้วครับ')}
          className="bg-white border border-[#DED2B8] rounded-full px-2.5 py-1 whitespace-nowrap hover:bg-[#204A42] hover:text-white transition text-[#5B5648] disabled:opacity-50 cursor-pointer"
        >
          ผู้ป่วยพร้อมแล้ว
        </button>
        <button 
          disabled={isTyping}
          onClick={() => handleSendMessage('ตอนนี้ถึงจุดนัดพบแล้วครับ')}
          className="bg-white border border-[#DED2B8] rounded-full px-2.5 py-1 whitespace-nowrap hover:bg-[#204A42] hover:text-white transition text-[#5B5648] disabled:opacity-50 cursor-pointer"
        >
          ถึงจุดนัดพบแล้ว
        </button>
        <button 
          disabled={isTyping}
          onClick={() => handleSendMessage('ใกล้ถึงหรือยังครับ?')}
          className="bg-white border border-[#DED2B8] rounded-full px-2.5 py-1 whitespace-nowrap hover:bg-[#204A42] hover:text-white transition text-[#5B5648] disabled:opacity-50 cursor-pointer"
        >
          ใกล้ถึงหรือยัง?
        </button>
      </div>

      {/* Input Bar */}
      <div className="p-2.5 bg-white border-t border-[#DED2B8] flex items-center gap-1.5 shrink-0">
        <input 
          type="file" 
          accept="image/*" 
          ref={fileInputRef} 
          onChange={handleImageUpload} 
          className="hidden" 
        />
        <button
          disabled={isTyping}
          onClick={() => fileInputRef.current?.click()}
          className="text-[#5B5648] hover:bg-[#F7F0E4] p-1.5 rounded-xl transition text-base disabled:opacity-50 cursor-pointer"
          title="แนบรูปภาพ"
        >
          📷
        </button>

        <input
          type="text"
          placeholder={isTyping ? "ผู้ช่วยกำลังตอบกลับ..." : "พิมพ์ข้อความ..."}
          value={inputText}
          disabled={isTyping}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          className="flex-1 text-xs p-2 rounded-xl border border-[#DED2B8] bg-[#F7F0E4] outline-none text-[#221F19] disabled:opacity-60"
        />

        <button
          disabled={isTyping}
          onClick={() => handleSendMessage()}
          className="bg-[#204A42] hover:bg-[#15332d] text-white p-2 rounded-xl transition shrink-0 disabled:opacity-50 cursor-pointer"
        >
          <svg className="w-4 h-4 rotate-90" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </div>

    </div>
  );
}

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-[#132420] text-white font-sans p-2 sm:p-4 flex flex-col items-center justify-center">
      <Suspense fallback={<div className="text-xs text-[#EBE0C9]">กำลังโหลดหน้าแชต...</div>}>
        <ChatContent />
      </Suspense>
    </div>
  );
}