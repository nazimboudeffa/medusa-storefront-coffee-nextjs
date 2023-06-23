"use client"
import CartItem from "@/components/CartItem"
import CartTotal from "@/components/CartTotal"
import { useGetCart } from "medusa-react"
import { useEffect, useState } from "react"
import { Cart } from "@medusajs/medusa"

export default function Cart () {

  const [cart_id, setCartId] = useState<any>('')
  const { cart, isLoading } = useGetCart(cart_id)
  console.log(cart?.items)

  useEffect(() => {
    setCartId(localStorage.getItem("medusa_cart_id"))
  }, [])
  
  return (
    <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="mx-auto max-w-3xl">
            <header className="text-center">
                <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Your Cart</h1>
            </header>
            <div className="mt-8">
                <ul className="space-y-4">
                {cart?.items?.map((item) => {
                    return (
                    <li key={item.id} >
                        <CartItem item={item} />
                    </li>
                )})}
                </ul>

                <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                 <CartTotal cart={cart as Cart} />
                </div>
            </div>
            </div>
        </div>
    </section>
  )
}