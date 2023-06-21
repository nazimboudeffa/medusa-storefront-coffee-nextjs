"use client"
import { useCart } from 'medusa-react'
import React from 'react'
import { useEffect } from 'react'

const StoreContext = React.createContext<StoreContext | null>(null)

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
    const { cart, createCart } = useCart()

    const handleCreateCart = () => {
      createCart.mutate(
        {}, // create an empty cart
        {
          onSuccess: ({ cart }) => {
            localStorage.setItem("cart_id", cart.id)
          },
        }
      )
    }
  
    useEffect(() => {
      handleCreateCart()
    }, []);

    return (
        <StoreContext.Provider value={{ cart }}>
            {children}
        </StoreContext.Provider>
    )
}