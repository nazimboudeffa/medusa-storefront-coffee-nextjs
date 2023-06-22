"use client"
import Hero from '@/components/Hero'
import { useCart } from 'medusa-react'
import { useEffect } from 'react'

export default function Home() {

  const { cart, createCart } = useCart()

  const handleCreateCart = () => {
    createCart.mutate(
      {},
      {
        onSuccess: ({ cart }) => {
          localStorage.setItem("cart_id", cart.id)
        },
      }
    )
  }

  useEffect(() => {
    if (!localStorage.getItem("cart_id")) {
      handleCreateCart()
    }
  }, [])

  return (
    <main>
      <Hero />
    </main>
  )
}

