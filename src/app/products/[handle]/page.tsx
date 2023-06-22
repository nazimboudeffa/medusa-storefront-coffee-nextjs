"use client"
import { medusaClient } from '@/utils/medusa-client'
import { ProductProvider } from '@/context/product-context'
import ProductActions from '@/components/ProductActions'
import { useQuery } from "@tanstack/react-query"
import { use, useEffect, useState } from 'react'

export default function Product(context : any) {

  const handle = context.params.handle

  // const fetchProduct = async (handle: string) => {
  //   return await medusaClient.products
  //     .list({ handle })
  //     .then(({ products }) => products[0])
  // }

  // const { data, isError, isLoading, isSuccess } = useQuery(
  //   [`get_product`, handle],
  //   () => fetchProduct(handle),
  //   {
  //     enabled: handle.length > 0,
  //     keepPreviousData: true,
  //   }
  // )

  const [product, setProduct] = useState<any>('')

  const fetchProduct = async (handle: string) => {
    try {
      const results = await medusaClient.products.list({ handle });
      console.log(results.products[0])
      setProduct(results.products[0])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProduct(context.params.handle)
    console.log("test "+ product)
  }, []);


  return (
    <ProductProvider product={product}>
      <ProductActions product={product} />
    </ProductProvider>
  )
}