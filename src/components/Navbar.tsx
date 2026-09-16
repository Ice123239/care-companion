'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // ดึงข้อมูล user จาก localStorage (ระบบ Mock)
    const checkUser = () => {
      const savedUser = localStorage.getItem('user_session')
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser))
        } catch (e) {
          console.error(e)
        }
      } else {
        setUser(null)
      }
    }

    checkUser()

    // ฟัง event การเปลี่ยนแปลงของ localStorage
    window.addEventListener('storage', checkUser)
    return () => window.removeEventListener('storage', checkUser)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user_session')
    setUser(null)
    window.location.reload()
  }

  return (
    <nav className="bg-[#204A42] text-white p-4 flex justify-between items-center">
      <Link href="/" className="font-bold text-lg">
        Care Companion
      </Link>
      
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-sm">สวัสดี, {user.name || 'ผู้ใช้งาน'}</span>
            <button
              onClick={handleLogout}
              className="bg-[#B85B42] text-white text-xs px-3 py-1.5 rounded-lg hover:bg-[#a04e37] transition"
            >
              ออกจากระบบ
            </button>
          </div>
        ) : (
          <Link
            href="/signin"
            className="bg-[#D88A34] text-white text-xs px-3 py-1.5 rounded-lg font-bold hover:bg-[#c27a2b] transition"
          >
            เข้าสู่ระบบ
          </Link>
        )}
      </div>
    </nav>
  )
}