"use client"
import Hero from '@/components/Hero'
import { useEffect } from 'react'

export default function Home() {

  useEffect(() => {
    console.log(localStorage.getItem("medusa_cart_id"))
  }, [])

  return (
    <main>
      <Hero />
    </main>
  )
}

