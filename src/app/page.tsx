'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const COMPANION_DATA = [
  {
    id: '1',
    name: 'คุณสมชาย',
    age: 28,
    rating: 4.9,
    reviewsCount: 24,
    service: 'พาไปโรงพยาบาล',
    location: 'บางกะปิ',
    area: 'ปทุมวัน, บางกะปิ',
    badge: '🏆 ฉายา “เทพแห่งการต่อคิว รพ.”',
    badgeColor: 'text-[#B85B42]',
    avatarBg: 'bg-[#DCE7E1]',
    icon: '🧑',
    link: '/companion',
  },
  {
    id: '2',
    name: 'คุณวิภา',
    age: 32,
    rating: 5.0,
    reviewsCount: 18,
    service: 'ชวนคุย/เดินเล่น',
    location: 'ห้วยขวาง',
    area: 'ห้วยขวาง, ดินแดง',
    badge: '🏆 ฉายา “นักฟังตัวยง”',
    badgeColor: 'text-[#204A42]',
    avatarBg: 'bg-[#FCE8E6]',
    icon: '👩',
    link: '/reviews',
  },
];

export default function HomePage() {
  const [serviceFilter, setServiceFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [filteredCompanions, setFilteredCompanions] = useState(COMPANION_DATA);

  const handleSearch = () => {
    const result = COMPANION_DATA.filter((item) => {
      const matchService = item.service.includes(serviceFilter) || serviceFilter === '';
      const matchLocation = item.area.includes(locationFilter) || locationFilter === '';
      return matchService && matchLocation;
    });
    setFilteredCompanions(result);
  };

  const handleReset = () => {
    setServiceFilter('');
    setLocationFilter('');
    setFilteredCompanions(COMPANION_DATA);
  };

  return (
    <div className="min-h-screen bg-[#132420] text-white font-sans p-4 flex flex-col items-center justify-center">
      <div className="w-[308px] h-[640px] bg-[#F7F0E4] text-[#221F19] rounded-[34px] shadow-2xl overflow-hidden flex flex-col">
        
        {/* Appbar */}
        <div className="bg-[#204A42] text-white p-3 flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-sm">
            <span className="w-5 h-5 bg-[#E19A3C] text-[#123029] rounded flex items-center justify-center text-xs">C</span>
            Care Companion
          </div>
          <span className="text-xs bg-white/20 px-2 py-1 rounded-full text-white cursor-pointer hover:bg-white/30">G Sign in</span>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          <div>
            <h1 className="font-semibold text-sm text-[#221F19]">ต้องการเพื่อนไปด้วยวันนี้ไหม?</h1>
            <p className="text-xs text-[#5B5648]">เลือกประเภทธุระ วันเวลา แล้วเราจะแนะนำคนที่เหมาะกับคุณ</p>
          </div>

          {/* Search Inputs */}
          <div className="space-y-2">
            <input 
              type="text" 
              placeholder="📋 พาไปโรงพยาบาล" 
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="w-full text-xs p-2 border border-[#DED2B8] rounded-lg bg-white outline-none focus:border-[#204A42]" 
            />
            <input 
              type="text" 
              placeholder="📍 บางกะปิ" 
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full text-xs p-2 border border-[#DED2B8] rounded-lg bg-white outline-none focus:border-[#204A42]" 
            />
            <div className="flex gap-2">
              <button 
                onClick={handleSearch}
                className="flex-1 bg-[#204A42] hover:bg-[#15332d] text-white py-2 rounded-lg text-xs font-semibold transition active:scale-95"
              >
                ค้นหาผู้ช่วย
              </button>
              {(serviceFilter || locationFilter) && (
                <button 
                  onClick={handleReset}
                  className="bg-[#DED2B8] hover:bg-[#c8ba9d] text-[#221F19] px-3 py-2 rounded-lg text-xs font-semibold transition"
                >
                  ล้าง
                </button>
              )}
            </div>
          </div>

          {/* Companion List */}
          <div className="space-y-2">
            {filteredCompanions.length > 0 ? (
              filteredCompanions.map((item) => (
                <Link key={item.id} href={item.link} className="block">
                  <div className="bg-white p-3 rounded-xl border border-[#DED2B8] flex gap-3 cursor-pointer hover:border-[#204A42] transition shadow-sm">
                    <div className={`w-12 h-12 ${item.avatarBg} rounded-lg flex items-center justify-center text-xl`}>
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <span className="font-semibold text-xs text-[#221F19]">
                          {item.name} <span className="font-normal text-[#5B5648]">· {item.age} ปี</span>
                        </span>
                        <span className="text-xs text-[#B97722] font-semibold">★ {item.rating} ({item.reviewsCount})</span>
                      </div>
                      <p className="text-[11px] text-[#5B5648]">📍 {item.area}</p>
                      <p className={`text-[10px] ${item.badgeColor} mt-1 font-semibold`}>{item.badge}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-6 space-y-2">
                <p className="text-xs text-[#5B5648]">ไม่พบผู้ช่วยตามเงื่อนไขที่ค้นหา</p>
                <button 
                  onClick={handleReset}
                  className="text-xs text-[#204A42] font-bold underline"
                >
                  แสดงผู้ช่วยทั้งหมด
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}