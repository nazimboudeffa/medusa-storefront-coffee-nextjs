"use client"
import { useCart } from 'medusa-react'
import React from 'react'
import { useEffect } from 'react'

interface VariantInfoProps {
  variantId: string
  quantity: number
}

interface LineInfoProps {
  lineId: string
  quantity: number
}
interface StoreContext {
  countryCode: string | undefined
  setRegion: (regionId: string, countryCode: string) => void
  addItem: (item: VariantInfoProps) => void
  updateItem: (item: LineInfoProps) => void
  deleteItem: (lineId: string) => void
  resetCart: () => void
}

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