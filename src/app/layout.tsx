"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CartProvider, MedusaProvider } from "medusa-react"
import { queryClient } from '@/utils/medusa-client'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MedusaProvider 
      baseUrl={process.env.BACKEND_URL!}
      queryClientProviderProps={{
        client: queryClient,
      }}
    >
      <CartProvider>
        <html lang="en">
          <body className={inter.className}>
            <Header />
            {children}
            <Footer />
          </body>
        </html>
      </CartProvider>
    </MedusaProvider>
  )
}
