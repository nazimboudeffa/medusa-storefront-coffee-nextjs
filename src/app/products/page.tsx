"use client"
import { useState, useEffect } from 'react'
import { medusaClient } from '@/utils/medusa-client'
import ProductCard from '@/components/ProductCard'

export default function Products () {

    const [products, setProducts] = useState<any[]>([])

    const getProducts = async () => {
        try {
            const results = await medusaClient.products.list();
            console.log(results)
            setProducts(results.products)
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
      getProducts()
    }, []);

    return (
        <main>
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 mb-10">
            <div className="sm:py-15 mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <p className="mt-1 text-4xl font-bold uppercase text-gray-900 sm:text-5xl sm:tracking-tight lg:text-5xl">
                Crafted by us, for you
                </p>
            </div>
            </div>
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
                <ProductCard product={product} key={product.id} />
                ))}
            </div>
        </div>
        </main>
    )
}