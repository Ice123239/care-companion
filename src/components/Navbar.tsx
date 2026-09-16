'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'

export default function Navbar() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // 1. เช็กสถานะ user ปัจจุบัน
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()

    // 2. ฟัง event เวลาล็อกอิน/ล็อกเอาต์
    const { data: authListener } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      setUser(session?.user ?? null)
    })

    return () => authListener.subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    }