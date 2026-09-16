'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert('กรุณากรอกอีเมลและรหัสผ่าน');
      return;
    }
    // จำลองการบันทึกสถานะการ Login
    localStorage.setItem('user_session', JSON.stringify({ 
      email, 
      name: email.split('@')[0],
      isLoggedIn: true 
    }));
    alert('เข้าสู่ระบบสำเร็จ!');
    router.push('/');
  };

  // Mock Google Login บายพาส OAuth โดยตรง
  const handleGoogleLogin = () => {
    localStorage.setItem('user_session', JSON.stringify({ 
      email: 'user@gmail.com', 
      name: 'Google User',
      isLoggedIn: true 
    }));
    alert('เข้าสู่ระบบด้วย Google สำเร็จ!');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#132420] text-white p-4 flex justify-center items-center font-sans">
      <div className="w-full max-w-[400px] bg-[#F7F0E4] text-[#221F19] p-6 rounded-[32px] shadow-2xl border border-[#2e6258] relative">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Link href="/" className="text-xl text-[#204A42] font-bold">←</Link>
          <h1 className="text-lg font-bold text-[#204A42]">เข้าสู่ระบบ</h1>
          <div className="w-5" />
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block text-[#5B5648] font-semibold mb-1">อีเมล</label>
            <input
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 border border-[#DED2B8] rounded-xl bg-white outline-none focus:border-[#204A42]"
            />
          </div>

          <div>
            <label className="block text-[#5B5648] font-semibold mb-1">รหัสผ่าน</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2.5 border border-[#DED2B8] rounded-xl bg-white outline-none focus:border-[#204A42]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#204A42] hover:bg-[#15332d] text-white py-2.5 rounded-xl font-bold transition shadow cursor-pointer mt-2"
          >
            เข้าสู่ระบบ
          </button>
        </form>

        <div className="relative my-5 text-center">
          <hr className="border-[#DED2B8]" />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#F7F0E4] px-2 text-[10px] text-gray-500">
            หรือ
          </span>
        </div>

        {/* Google Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-2.5 rounded-xl border border-[#DED2B8] text-xs flex items-center justify-center gap-2 transition shadow-sm cursor-pointer"
        >
          <span className="text-base">🌐</span> เข้าสู่ระบบด้วย Google
        </button>

      </div>
    </div>
  );
}