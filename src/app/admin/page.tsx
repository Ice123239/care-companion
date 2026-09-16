'use client';

import React, { useState } from 'react';

export default function AdminPage() {
  const [users, setUsers] = useState([
    { id: 1, name: 'คุณสมชาย', role: 'ผู้ให้บริการ', status: 'ใช้งานอยู่' },
    { id: 2, name: 'คุณสมหญิง', role: 'ผู้ให้บริการ', status: 'ใช้งานอยู่' },
    { id: 3, name: 'คุณสมศักดิ์', role: 'ลูกค้า', status: 'ใช้งานอยู่' },
    { id: 4, name: 'คุณมานะ', role: 'ผู้ให้บริการ', status: 'รอตรวจสอบ' },
  ]);

  const handleApprove = (id: number) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, status: 'ใช้งานอยู่' } : user))
    );
    alert('อนุมัติผู้ให้บริการเรียบร้อยแล้ว');
  };

  const handleSuspend = (name: string) => {
    alert(`ระงับสิทธิ์บัญชีของ ${name} เรียบร้อยแล้ว`);
  };

  return (
    <div className="min-h-screen bg-[#11241C] text-white p-4 font-sans max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl border border-emerald-900/30">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 pt-2 px-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-black font-extrabold flex items-center justify-center text-xl shadow-lg shadow-amber-500/20">
            C
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">Care Companion</h1>
            <p className="text-xs text-emerald-400 font-medium">แอดมิน</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-emerald-900/40 border border-emerald-700/30 px-3 py-1.5 rounded-full text-xs text-emerald-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          ทีมดูแลระบบ
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        <div className="bg-[#1A3329] p-3 rounded-2xl text-center border border-emerald-800/40">
          <div className="text-2xl font-black text-amber-400">142</div>
          <div className="text-[10px] text-gray-300 mt-1">ผู้ใช้ทั้งหมด</div>
        </div>
        <div className="bg-[#1A3329] p-3 rounded-2xl text-center border border-emerald-800/40">
          <div className="text-2xl font-black text-amber-400">48</div>
          <div className="text-[10px] text-gray-300 mt-1">รายการรอบริการ</div>
        </div>
        <div className="bg-[#1A3329] p-3 rounded-2xl text-center border border-emerald-800/40">
          <div className="text-2xl font-black text-amber-400">36</div>
          <div className="text-[10px] text-gray-300 mt-1">งานเสร็จสิ้นแล้ว</div>
        </div>
      </div>

      {/* User Management */}
      <div className="mb-6">
        <h2 className="text-base font-bold mb-3 px-1 text-emerald-100">บริหารจัดการผู้ใช้งาน</h2>
        <div className="bg-[#1A3329] rounded-2xl overflow-hidden border border-emerald-800/40">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#214034] text-gray-300 text-[11px]">
              <tr>
                <th className="p-3">ชื่อผู้ใช้</th>
                <th className="p-3">บทบาท</th>
                <th className="p-3">สถานะ</th>
                <th className="p-3 text-right">การจัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-800/30">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-emerald-900/20 transition">
                  <td className="p-3 font-semibold">{u.name}</td>
                  <td className="p-3 text-gray-300 text-[10px]">{u.role}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        u.status === 'ใช้งานอยู่'
                          ? 'bg-emerald-900/80 text-emerald-300 border border-emerald-600/50'
                          : 'bg-amber-900/80 text-amber-300 border border-amber-600/50'
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-1">
                      {u.status === 'รอตรวจสอบ' && (
                        <button
                          onClick={() => handleApprove(u.id)}
                          className="bg-emerald-700 hover:bg-emerald-600 text-white px-2 py-1 rounded text-[10px] font-medium transition"
                        >
                          อนุมัติ
                        </button>
                      )}
                      <button
                        onClick={() => handleSuspend(u.name)}
                        className="bg-[#4A322C] hover:bg-[#5C3E37] text-amber-200/90 px-2 py-1 rounded text-[10px] font-medium border border-amber-800/40 transition"
                      >
                        ระงับสิทธิ์
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Alert Card */}
      <div>
        <h2 className="text-base font-bold mb-3 px-1 text-emerald-100">รายงานที่ต้องตรวจสอบ</h2>
        <div className="bg-[#3D2523] border border-[#8B3A34] p-3.5 rounded-2xl text-xs space-y-2 shadow-lg">
          <div className="flex items-center gap-1.5 text-amber-400 font-bold">
            <span>⚠️</span>
            <span>มีการายงานบัญชี “คุณสมชาย”</span>
          </div>
          <p className="text-[10px] text-gray-300 leading-relaxed">
            ลูกค้าแจ้งว่าแชทออกนอกเรื่องงานที่ตกลงไว้ ทีมงานควรตรวจสอบบทสนทนาก่อนตัดสินใจ
          </p>
          
          {/* ปุ่ม Action */}
          <div className="flex gap-2 pt-1">
            <button 
              onClick={() => alert('กำลังเปิดประวัติการสนทนาของ คุณสมชาย')}
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-black font-bold text-[10px] py-1.5 rounded-lg transition shadow-md"
            >
              💬 ตรวจสอบแชท
            </button>
            <button 
              onClick={() => alert('ส่งคำเตือนและระงับสิทธิ์ คุณสมชาย เรียบร้อยแล้ว')}
              className="flex-1 bg-[#8B3A34] hover:bg-[#722F2A] text-white font-bold text-[10px] py-1.5 rounded-lg transition shadow-md"
            >
              🛑 ระงับสิทธิ์ชั่วคราว
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}