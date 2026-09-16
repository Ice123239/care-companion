'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'companion';
  time: string;
}

function ChatContent() {
  const searchParams = useSearchParams();
  const companionName = searchParams.get('companionName') || 'คุณสมชาย';
  const location = searchParams.get('location') || 'รพ.จุฬาลงกรณ์';
  const time = searchParams.get('time') || '09:00';
  const hours = searchParams.get('hours') || '2';

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: `สวัสดีครับ ยินดีให้บริการครับ นัดหมายที่ ${location} เวลา ${time} น. ใช่ไหมครับ?`,
      sender: 'companion',
      time: time,
    },
  ]);
  const [inputText, setInputText] = useState('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMsg: Message = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
  };

  const handleEmergencyCall = () => {
    alert(`กำลังโทรออกหา ${companionName} (เบอร์ติดต่อฉุกเฉิน: 081-XXX-XXXX)`);
  };

  return (
    <div className="w-full max-w-[360px] sm:max-w-[400px] h-[640px] bg-[#F7F0E4] text-[#221F19] rounded-[28px] sm:rounded-[34px] shadow-2xl overflow-hidden flex flex-col relative">
      
      {/* Dynamic Header */}
      <div className="bg-[#204A42] text-white p-3 shadow flex flex-col gap-1.5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-xs">
            <Link href="/" className="hover:opacity-80 text-base">←</Link>
            <span>แชตกับ {companionName}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Emergency Phone Button */}
            <button 
              onClick={handleEmergencyCall}
              className="bg-[#B85B42] hover:bg-[#a04e37] text-white p-1.5 rounded-full transition text-xs flex items-center justify-center"
              title="ติดต่อฉุกเฉิน"
            >
              📞
            </button>
            <span className="text-[9px] bg-[#D88A34] px-1.5 py-0.5 rounded-full font-semibold">ออนไลน์</span>
          </div>
        </div>
        
        {/* Dynamic Job Summary Header */}
        <div className="bg-[#15332d] p-1.5 rounded-lg text-[10px] flex justify-between items-center text-white/90">
          <span className="truncate max-w-[200px]">📍 นัดหมาย: {location}</span>
          <span>⏰ {time} น. ({hours} ชม.)</span>
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
              {msg.text}
            </div>
            <span className="text-[9px] text-[#5B5648] px-1 mt-0.5">{msg.time}</span>
          </div>
        ))}
        <div ref={chatBottomRef} />
      </div>

      {/* Input Bar */}
      <div className="p-2.5 bg-white border-t border-[#DED2B8] flex items-center gap-2">
        <input
          type="text"
          placeholder="พิมพ์ข้อความ..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 text-xs p-2 rounded-xl border border-[#DED2B8] bg-[#F7F0E4] outline-none text-[#221F19]"
        />
        <button
          onClick={handleSend}
          className="bg-[#204A42] hover:bg-[#15332d] text-white p-2 rounded-xl transition shrink-0"
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
      <Suspense fallback={<div>Loading...</div>}>
        <ChatContent />
      </Suspense>
    </div>
  );
}