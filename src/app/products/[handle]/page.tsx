"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { medusa } from '@/utils/medusa-client'
import logo from '../../../../public/logo.png'

function cn(...classes : any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Product(context : any) {
  const [isLoading, setLoading] = useState(true)
  const [product, setProduct] = useState<any>('')

  const fetchProduct = async (handle: string) => {
    try {
      const results = await medusa.products.list({ handle });
      console.log(results.products[0])
      setProduct(results.products[0])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProduct(context.params.handle)
  }, []);

  return (
    <div className="flex h-screen flex-col justify-between">
      <div className="mx-auto mt-16 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mx-auto flex flex-col sm:flex-row">
          { product.thumbnail && (
            <Image
              alt="product image"
              src={product.thumbnail}
              width={640}
              height={800}
              className={cn(
                'object-cover duration-700 ease-in-out group-hover:opacity-75	',
                isLoading
                  ? 'scale-110 blur-2xl grayscale'
                  : 'scale-100 blur-0 grayscale-0'
              )}
              onLoadingComplete={() => setLoading(false)}
            />
          )}
          <div className="mt-10 flex flex-col sm:mt-0 sm:ml-10">
            <h1 className="mt-1 text-4xl font-bold uppercase text-gray-900 sm:text-5xl sm:tracking-tight lg:text-5xl">
              {product.title}
            </h1>
            <h1 className="mt-3 text-4xl font-bold text-gray-500 sm:text-3xl sm:tracking-tight lg:text-3xl">
              PRICE
            </h1>
            <div className="mt-10 mb-5 border-t border-gray-200 pt-10 font-bold">
              Description
            </div>
            <p className="max-w-xl">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}