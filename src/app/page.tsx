'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { createBrowserClient } from '@supabase/ssr';
import { User } from '@supabase/supabase-js';

export const COMPANION_DATA = [
  {
    id: '1',
    name: 'คุณสมชาย (ผู้ช่วย)',
    age: 28,
    gender: 'ชาย',
    rating: 4.8,
    reviewsCount: 24,
    location: 'ห้วยขวาง',
    area: 'ศิริราช, รามาฯ, จุฬาฯ',
    services: ['พาไปโรงพยาบาล', 'ซื้อของ/ทำธุระ'],
    avatarBg: 'bg-[#DCE7E1]',
    hourlyRate: 350,
    isAvailable: true,
  },
  {
    id: '2',
    name: 'คุณสมศรี (ผู้ช่วย)',
    age: 32,
    gender: 'หญิง',
    rating: 5.0,
    reviewsCount: 18,
    location: 'ห้วยขวาง',
    area: 'ศิริราช, รามาฯ',
    services: ['ช่วยต่อคิว/ทำเอกสาร', 'ดูแลผู้สูญเสีย/ผู้ป่วย', 'ทำเอกสาร'],
    avatarBg: 'bg-[#F2D5CE]',
    hourlyRate: 300,
    isAvailable: true,
  },
  {
    id: '3',
    name: 'คุณวิภา (ผู้ช่วย)',
    age: 29,
    gender: 'หญิง',
    rating: 4.9,
    reviewsCount: 31,
    location: 'ปทุมวัน',
    area: 'จุฬาฯ, ธรรมศาสตร์',
    services: ['พาไปโรงพยาบาล', 'ดูแลผู้สูญเสีย/ผู้ป่วย'],
    avatarBg: 'bg-[#F2D5CE]',
    hourlyRate: 350,
    isAvailable: true,
  },
  {
    id: '4',
    name: 'คุณณัฐพล (ผู้ช่วย)',
    age: 35,
    gender: 'ชาย',
    rating: 4.7,
    reviewsCount: 15,
    location: 'พญาไท',
    area: 'ศิริราช, พระมงกุฎ',
    services: ['ช่วยต่อคิว/ทำเอกสาร', 'ซื้อของ/ทำธุระ', 'ทำเอกสาร'],
    avatarBg: 'bg-[#DCE7E1]',
    hourlyRate: 320,
    isAvailable: true,
  },
];

export default function HomePage() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const [user, setUser] = useState<User | null>(null);

  const [serviceFilter, setServiceFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState<'ทั้งหมด' | 'ชาย' | 'หญิง'>('ทั้งหมด');
  const [filteredCompanions, setFilteredCompanions] = useState(COMPANION_DATA);
  
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(false);

  // ดึงข้อมูล User จาก Supabase Session
  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  // ระบบเข้าสู่ระบบด้วย Google ผ่าน Supabase OAuth
  const handleGoogleSignIn = async () => {
    try {
      setLoadingAuth(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error logging in:', error);
      alert('เกิดข้อผิดพลาดในการเชื่อมต่อ Google Auth');
    } finally {
      setLoadingAuth(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setShowAuthModal(false);
  };

  // ฟังก์ชันค้นหาและคัดกรอง
  const handleSearch = (
    overrideService?: string,
    overrideGender?: 'ทั้งหมด' | 'ชาย' | 'หญิง'
  ) => {
    const currentService = overrideService !== undefined ? overrideService : serviceFilter;
    const currentGender = overrideGender !== undefined ? overrideGender : genderFilter;

    const results = COMPANION_DATA.filter((item) => {
      const matchService = currentService ? item.services.includes(currentService) : true;
      const matchLocation = locationFilter ? item.location.includes(locationFilter) || locationFilter.includes(item.location) : true;
      const matchGender = currentGender === 'ทั้งหมด' ? true : item.gender === currentGender;

      return matchService && matchLocation && matchGender;
    });

    setFilteredCompanions(results);
  };

  const handleClearFilter = () => {
    setServiceFilter('');
    setLocationFilter('');
    setGenderFilter('ทั้งหมด');
    setFilteredCompanions(COMPANION_DATA);
  };

  return (
    <div className="min-h-screen bg-[#132420] text-white font-sans p-2 sm:p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-[360px] sm:max-w-[400px] h-[640px] bg-[#F7F0E4] text-[#221F19] rounded-[28px] sm:rounded-[34px] shadow-2xl overflow-hidden flex flex-col relative">
        
        {/* Header / Navbar */}
        <div className="bg-[#204A42] text-white p-3 flex justify-between items-center shadow shrink-0">
          <h1 className="font-bold text-sm tracking-wide">Care Companion</h1>
          
          <div className="flex items-center gap-1.5">
            {/* ปุ่มประวัติการจอง */}
            <Link
              href="/history"
              className="bg-white/20 hover:bg-white/30 text-white px-2.5 py-1 rounded-full text-xs font-medium transition flex items-center gap-1"
            >
              📋 <span>ประวัติ</span>
            </Link>

            {/* ปุ่ม Auth/Profile */}
            {user ? (
              <button 
                onClick={() => setShowAuthModal(true)} 
                className="flex items-center gap-1.5 bg-white/20 px-2.5 py-1 rounded-full text-xs hover:bg-white/30 transition"
              >
                {user.user_metadata?.avatar_url ? (
                  <img src={user.user_metadata.avatar_url} alt="Profile" className="w-4 h-4 rounded-full" />
                ) : (
                  <span className="w-4 h-4 rounded-full bg-[#D88A34] text-[10px] flex items-center justify-center font-bold">U</span>
                )}
                <span className="truncate max-w-[60px] sm:max-w-[80px]">{user.user_metadata?.full_name || 'ผู้ใช้งาน'}</span>
              </button>
            ) : (
              <button 
                onClick={() => setShowAuthModal(true)} 
                className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold hover:bg-white/30 transition"
              >
                Sign in
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          
          {/* Search Box */}
          <div className="bg-white p-3 rounded-2xl border border-[#DED2B8] space-y-2.5 shadow-sm">
            <h2 className="font-bold text-xs text-[#204A42]">ค้นหาผู้ช่วยที่คุณต้องการแบบไหน?</h2>
            
            {/* เลือกเพศ */}
            <div className="flex items-center justify-between text-[11px] bg-[#F7F0E4] p-1.5 rounded-xl border border-[#DED2B8]">
              <span className="font-semibold text-[#5B5648] px-1">เพศผู้ช่วย:</span>
              <div className="flex gap-1">
                {(['ทั้งหมด', 'ชาย', 'หญิง'] as const).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => {
                      setGenderFilter(g);
                      handleSearch(undefined, g);
                    }}
                    className={`px-2.5 py-1 rounded-lg font-medium text-[10px] transition ${
                      genderFilter === g
                        ? 'bg-[#204A42] text-white shadow-sm'
                        : 'bg-transparent text-[#5B5648] hover:text-black'
                    }`}
                  >
                    {g === 'ชาย' ? '👨 ชาย' : g === 'หญิง' ? '👩 หญิง' : 'ทั้งหมด'}
                  </button>
                ))}
              </div>
            </div>

            {/* Selects */}
            <div className="space-y-1.5">
              <select 
                value={serviceFilter} 
                onChange={(e) => setServiceFilter(e.target.value)}
                className="w-full text-[11px] p-2 border border-[#DED2B8] rounded-xl bg-[#F7F0E4] outline-none text-[#221F19]"
              >
                <option value="">เลือกประเภทบริการทั้งหมด</option>
                <option value="พาไปโรงพยาบาล">พาไปโรงพยาบาล</option>
                <option value="ช่วยต่อคิว/ทำเอกสาร">ช่วยต่อคิว / ทำเอกสาร</option>
                <option value="ดูแลผู้สูญเสีย/ผู้ป่วย">ดูแลผู้สูงอายุ / ผู้ป่วย</option>
                <option value="ซื้อของ/ทำธุระ">ซื้อของ / ทำธุระ</option>
              </select>

              <select 
                value={locationFilter} 
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full text-[11px] p-2 border border-[#DED2B8] rounded-xl bg-[#F7F0E4] outline-none text-[#221F19]"
              >
                <option value="">เลือกพื้นที่ทั้งหมด</option>
                <option value="ห้วยขวาง">ห้วยขวาง, ประชาอุทิศ</option>
                <option value="พญาไท">พญาไท, รามาฯ</option>
                <option value="ปทุมวัน">ปทุมวัน, จุฬาฯ</option>
              </select>
            </div>

            <div className="flex gap-2 pt-0.5">
              <button 
                onClick={() => handleSearch()}
                className="flex-1 bg-[#204A42] hover:bg-[#15332d] text-white py-2 rounded-xl text-xs font-bold transition active:scale-95 shadow-sm"
              >
                ค้นหาผู้ช่วย
              </button>
              {(serviceFilter || locationFilter || genderFilter !== 'ทั้งหมด') && (
                <button 
                  onClick={handleClearFilter}
                  className="px-3 bg-gray-200 hover:bg-gray-300 text-[#5B5648] rounded-xl text-xs font-semibold transition"
                >
                  ล้างค้นหา
                </button>
              )}
            </div>
          </div>

          {/* Quick Filter Badges */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar text-[10px]">
            {['ทั้งหมด', 'พาไปโรงพยาบาล', 'ซื้อของ/ทำธุระ', 'ทำเอกสาร'].map((tag) => {
              const val = tag === 'ทั้งหมด' ? '' : tag;
              const isSelected = (!serviceFilter && tag === 'ทั้งหมด') || serviceFilter === tag;
              return (
                <button
                  key={tag}
                  onClick={() => {
                    setServiceFilter(val);
                    handleSearch(val, undefined);
                  }}
                  className={`px-2.5 py-1 rounded-full whitespace-nowrap transition border ${
                    isSelected
                      ? 'bg-[#204A42] text-white font-bold border-[#204A42]'
                      : 'bg-white text-[#5B5648] border-[#DED2B8] hover:bg-[#F7F0E4]'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>

          {/* List Companions */}
          <div className="space-y-2.5">
            {filteredCompanions.length > 0 ? (
              filteredCompanions.map((comp) => (
                <div key={comp.id} className="bg-white p-3 rounded-2xl border border-[#DED2B8] shadow-sm space-y-2 hover:shadow transition">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-2.5 items-center">
                      <div className={`w-10 h-10 ${comp.avatarBg} rounded-full flex items-center justify-center text-base relative shrink-0`}>
                        {comp.gender === 'ชาย' ? '👨‍⚕️' : '👩‍⚕️'}
                        {/* Status Badge */}
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                      </div>
                      <div>
                        <h3 className="font-bold text-xs text-[#221F19]">{comp.name} - {comp.age} ปี</h3>
                        <p className="text-[10px] text-[#5B5648]">📍 {comp.area}</p>
                      </div>
                    </div>
                    <span className="text-[10px] bg-[#FEF3C7] text-[#D88A34] px-1.5 py-0.5 rounded-md font-bold shrink-0">
                      ★ {comp.rating} ({comp.reviewsCount})
                    </span>
                  </div>

                  {/* Services Tag List */}
                  <div className="flex flex-wrap gap-1">
                    {comp.services.map((s, idx) => (
                      <span key={idx} className="bg-[#E9F0EC] text-[#204A42] text-[9px] px-1.5 py-0.5 rounded border border-emerald-100">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-1.5 border-t border-gray-100">
                    <span className="text-xs font-bold text-[#B85B42]">{comp.hourlyRate} บาท/ชม.</span>
                    <Link href={`/booking?companionId=${comp.id}`}>
                      <button className="bg-[#204A42] text-white px-3.5 py-1.5 rounded-xl text-[11px] font-semibold hover:bg-[#15332d] transition active:scale-95 shadow-sm">
                        นัดหมายผู้ช่วย
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white p-6 rounded-2xl border border-[#DED2B8] text-center space-y-1">
                <span className="text-2xl">🔍</span>
                <p className="text-xs font-semibold text-[#221F19]">ไม่พบผู้ช่วยที่ตรงกับเงื่อนไข</p>
                <p className="text-[10px] text-[#5B5648]">ลองปรับเงื่อนไขการค้นหาใหม่อีกครั้ง</p>
              </div>
            )}
          </div>

        </div>

        {/* Auth Modal */}
        {showAuthModal && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white text-[#221F19] p-4 rounded-2xl w-full max-w-[280px] text-center space-y-3 shadow-xl">
              <h3 className="font-bold text-sm">
                {user ? 'จัดการบัญชีผู้ใช้งาน' : 'เข้าสู่ระบบด้วย Google'}
              </h3>
              <p className="text-[10px] text-[#5B5648]">
                {user ? `ยินดีต้อนรับ ${user.user_metadata?.full_name || user.email}` : 'ใช้ Google Account เพื่อเริ่มใช้งาน Care Companion'}
              </p>
              
              <div className="space-y-1.5">
                {!user ? (
                  <button 
                    onClick={handleGoogleSignIn}
                    disabled={loadingAuth}
                    className="w-full bg-[#204A42] text-white py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#15332d] transition active:scale-95 disabled:opacity-50"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                    {loadingAuth ? 'กำลังเชื่อมต่อ...' : 'Sign in with Google'}
                  </button>
                ) : (
                  <button 
                    onClick={handleSignOut}
                    className="w-full bg-[#B85B42] text-white py-2 rounded-xl text-xs font-bold hover:bg-[#964833] transition"
                  >
                    ออกจากระบบ
                  </button>
                )}
                <button 
                  onClick={() => setShowAuthModal(false)}
                  className="w-full text-xs text-[#5B5648] py-1"
                >
                  ยกเลิก
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}