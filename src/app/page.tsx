'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const COMPANION_DATA = [
  {
    id: '1',
    name: 'คุณสมชาย',
    gender: 'ชาย',
    age: 28,
    rating: 4.8,
    reviewsCount: 24,
    service: 'พาไปโรงพยาบาล',
    location: 'สามย่าน',
    area: 'พาไป รพ.จุฬาลงกรณ์ และ รพ.ใกล้เคียง',
    badge: 'ประวัติแจ่ม, ปราศจากประวัติอาชญากรรม',
    badgeColor: 'bg-[#002D12]',
    avatarBg: 'bg-[#DCE7E1]',
    hourlyRate: 350,
    link: '/companion',
  },
  {
    id: '2',
    name: 'คุณสมหญิง',
    gender: 'หญิง',
    age: 32,
    rating: 5.0,
    reviewsCount: 18,
    service: 'ช่วยซื้อมือถือ/อุปกรณ์',
    location: 'ห้วยขวาง',
    area: 'ห้วยขวาง, รัชดา',
    badge: 'นั่งรถตู้เป็น, ชำนาญเส้นทาง',
    badgeColor: 'bg-[#2D1B00]',
    avatarBg: 'bg-[#F2E5D0]',
    hourlyRate: 300,
    link: '/companion',
  },
];

const LOCATIONS = [
  'สามย่าน (รพ.จุฬาฯ)',
  'พญาไท (รพ.พญาไท 1 / รพ.ราชวิถี)',
  'อนุสาวรีย์ฯ (รพ.รามาฯ)',
  'ห้วยขวาง',
  'บางซื่อ',
];

const SERVICES = [
  'พาไปโรงพยาบาล',
  'ช่วยซื้อมือถือ / อุปกรณ์',
  'พาไปธนาคาร / ทำธุรกรรม',
  'เดินเป็นเพื่อน / ซื้อของ',
];

export default function HomePage() {
  const [serviceFilter, setServiceFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [filteredCompanions, setFilteredCompanions] = useState(COMPANION_DATA);

  const handleSearch = () => {
    const result = COMPANION_DATA.filter((item) => {
      const cleanLocation = locationFilter.split(' ')[0];
      const matchService = serviceFilter ? item.service.includes(serviceFilter) : true;
      const matchLocation = locationFilter ? item.area.includes(cleanLocation) || item.location.includes(cleanLocation) : true;
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
        
        {/* Top Bar / Header */}
        <div className="bg-[#204A42] text-white px-4 py-3 flex justify-between items-center border-b border-[#15332d]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#D88A34] text-white rounded font-bold flex items-center justify-center text-xs">
              C
            </div>
            <span className="font-bold text-sm tracking-wide">Care Companion</span>
          </div>
          <button className="text-xs bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-full transition flex items-center gap-1">
            <span>👤</span> Sign in
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          
          {/* Header Title Box */}
          <div className="bg-[#204A42] text-white p-3 rounded-2xl space-y-1 shadow">
            <h2 className="font-bold text-xs leading-tight">ต้องการคนเพื่อนไปทำอะไรบ้าง?</h2>
            <p className="text-[10px] opacity-80 leading-relaxed">
              เลือกบริการและจุดนัดพบ เพื่อค้นหาผู้ช่วยที่คุณไว้วางใจได้
            </p>

            {/* Inputs Form */}
            <div className="space-y-2 pt-2 text-[#221F19]">
              
              {/* Input 1: Hospital/Service with Datalist Auto-complete */}
              <div>
                <input
                  type="text"
                  placeholder="📍 พาไปโรงพยาบาลไหน?"
                  list="services-list"
                  value={serviceFilter}
                  onChange={(e) => setServiceFilter(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-[#DED2B8] bg-white outline-none focus:border-[#204A42]"
                />
                <datalist id="services-list">
                  {SERVICES.map((s, idx) => (
                    <option key={idx} value={s} />
                  ))}
                </datalist>
              </div>

              {/* Input 2: Location/Province with Datalist Auto-complete */}
              <div>
                <input
                  type="text"
                  placeholder="📌 บางซื่อ, ปทุมธานี"
                  list="locations-list"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-[#DED2B8] bg-white outline-none focus:border-[#204A42]"
                />
                <datalist id="locations-list">
                  {LOCATIONS.map((loc, idx) => (
                    <option key={idx} value={loc} />
                  ))}
                </datalist>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-1">
                <button
                  onClick={handleSearch}
                  className="flex-1 bg-[#D88A34] hover:bg-[#b87024] text-white py-1.5 rounded-lg text-xs font-semibold transition active:scale-95 shadow"
                >
                  ค้นหาผู้ช่วย
                </button>
                {(serviceFilter || locationFilter) && (
                  <button
                    onClick={handleReset}
                    className="px-2.5 bg-white/20 hover:bg-white/30 text-white rounded-lg text-xs transition"
                  >
                    ล้าง
                  </button>
                )}
              </div>

            </div>
          </div>

          {/* Companion Cards List */}
          <div className="space-y-2.5">
            {filteredCompanions.length > 0 ? (
              filteredCompanions.map((item) => (
                <Link key={item.id} href={item.link} className="block">
                  <div className="bg-white p-3 rounded-2xl border border-[#DED2B8] shadow-sm hover:border-[#204A42] transition flex gap-3 items-start">
                    <div className={`w-12 h-12 ${item.avatarBg} rounded-full flex items-center justify-center text-xl shrink-0 shadow-inner`}>
                      🧑
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-xs text-[#221F19] truncate">
                          {item.name} ({item.gender}) - {item.age} ปี
                        </h3>
                        <span className="text-[10px] text-amber-600 font-bold shrink-0">
                          ★ {item.rating} ({item.reviewsCount})
                        </span>
                      </div>
                      <p className="text-[10px] text-[#5B5648] truncate">📍 {item.area}</p>
                      <div className={`inline-block ${item.badgeColor} text-white text-[9px] px-2 py-0.5 rounded-full`}>
                        🛡️ {item.badge}
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-6 space-y-2">
                <p className="text-xs text-[#5B5648]">ไม่พบผู้ช่วยตามเงื่อนไขที่คุณเลือก</p>
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