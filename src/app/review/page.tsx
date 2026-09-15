'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const TAGS = [
  'เป็นมิตร',
  'ตรงต่อเวลา',
  'สุภาพเรียบร้อย',
  'ดูแลใส่ใจดีมาก',
  'ชำนาญเส้นทาง',
  'ช่วยยื่นเอกสารไว',
];

export default function ReviewPage() {
  const [rating, setRating] = useState(5);
  const [selectedTags, setSelectedTags] = useState<string[]>(['เป็นมิตร', 'ตรงต่อเวลา']);
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#132420] text-white font-sans p-4 flex flex-col items-center justify-center">
        <div className="w-[308px] h-[640px] bg-[#F7F0E4] text-[#221F19] rounded-[34px] shadow-2xl overflow-hidden flex flex-col items-center justify-center p-6 text-center space-y-4">
          <div className="w-16 h-16 bg-[#204A42] text-white rounded-full flex items-center justify-center text-3xl shadow-lg">
            ❤️
          </div>
          <h2 className="font-bold text-lg text-[#204A42]">ขอบคุณสำหรับรีวิว!</h2>
          <p className="text-xs text-[#5B5648] leading-relaxed">
            คะแนนและคำติชมของคุณจะช่วยให้เราและผู้ช่วยพัฒนาการบริการให้ดียิ่งขึ้นครับ
          </p>
          <Link href="/" className="w-full pt-4">
            <button className="w-full bg-[#204A42] hover:bg-[#15332d] text-white py-2.5 rounded-lg text-xs font-bold transition shadow">
              กลับสู่หน้าหลัก
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#132420] text-white font-sans p-4 flex flex-col items-center justify-center">
      <div className="w-[308px] h-[640px] bg-[#F7F0E4] text-[#221F19] rounded-[34px] shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-[#204A42] text-white p-3 flex justify-between items-center">
          <span className="font-bold text-sm">ให้คะแนนบริการ</span>
          <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">งานสำเร็จแล้ว</span>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          
          {/* Companion Info */}
          <div className="bg-white p-3 rounded-xl border border-[#DED2B8] text-center space-y-1">
            <div className="w-12 h-12 bg-[#DCE7E1] rounded-full flex items-center justify-center text-2xl mx-auto shadow-inner">
              🧑
            </div>
            <h3 className="font-bold text-xs text-[#221F19]">คุณสมชาย</h3>
            <p className="text-[10px] text-[#5B5648]">ให้บริการเรียบร้อยแล้ว</p>
          </div>

          {/* Star Rating */}
          <div className="bg-white p-3 rounded-xl border border-[#DED2B8] text-center space-y-2">
            <p className="text-xs font-semibold text-[#204A42]">
              {rating === 5 ? 'สมบูรณ์แบบ!' : rating >= 4 ? 'ดีมาก!' : 'ควรปรับปรุง'}
            </p>
            <div className="flex justify-center gap-1.5 text-2xl">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`transition-transform active:scale-125 ${
                    star <= rating ? 'text-amber-400' : 'text-gray-300'
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          {/* Service Tags */}
          <div className="bg-white p-3 rounded-xl border border-[#DED2B8] space-y-2">
            <p className="text-[11px] font-semibold text-[#5B5648]">คุณชอบอะไรในการให้บริการครั้งนี้?</p>
            <div className="flex flex-wrap gap-1.5">
              {TAGS.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`text-[10px] px-2.5 py-1 rounded-full border transition ${
                      isSelected
                        ? 'bg-[#204A42] text-white border-[#204A42]'
                        : 'bg-[#F7F0E4] text-[#5B5648] border-[#DED2B8]'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Comment Box */}
          <div className="bg-white p-3 rounded-xl border border-[#DED2B8]">
            <p className="text-[11px] font-semibold text-[#5B5648] mb-1">ความคิดเห็นเพิ่มเติม</p>
            <textarea
              rows={3}
              placeholder="อธิบายเพิ่มเติม (ไม่บังคับ)..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full text-[11px] p-1 border-none outline-none resize-none bg-transparent"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={() => setIsSubmitted(true)}
            className="w-full bg-[#204A42] hover:bg-[#15332d] text-white py-2.5 rounded-lg text-xs font-bold transition shadow active:scale-95"
          >
            ส่งข้อเสนอแนะ
          </button>

        </div>

      </div>
    </div>
  );
}