"use client"
import { medusaClient } from '@/utils/medusa-client'
import { useEffect, useMemo, useState } from 'react'
import { canBuy } from "@/utils/can-buy"
import { findCheapestPrice } from "@/utils/prices"
import isEqual from "lodash/isEqual"
import { formatVariantPrice, useCart } from "medusa-react"
import { useStore } from "@/context/store-context"
import useProductPrice from '@/hooks/use-product-price'
import clsx from "clsx"
import Image from 'next/image'

function cn(...classes : any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Product(context : any) {

  const handle = context.params.handle

  const [product, setProduct] = useState<any>('')
  const [options, setOptions] = useState<Record<string, string>>({})
  const [inStock, setInStock] = useState<boolean>(true)
  const [isLoading, setLoading] = useState(true)
  const [variants, setVariants] = useState<any[]>([])
  const [cart_id, setCartId] = useState<any>('')

  const fetchProduct = async (handle: string) => {
    try {
      const results = await medusaClient.products.list({ handle });
      setProduct(results.products[0])
      console.log(results.products[0])
      setVariants(results.products[0].variants)
      console.log(results.products[0].variants)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProduct(handle)
  }, []);

  const { addItem } = useStore()
  const { cart } = useCart()

  useEffect(() => {
    // initialize the option state
    const optionObj: Record<string, string> = {}
    for (const option of (product.options || [])) {
      Object.assign(optionObj, { [option.id]: undefined })
    }
    setOptions(optionObj)
  }, [product])

  // memoized record of the product's variants
  const variantRecord = useMemo(() => {
    const map: Record<string, Record<string, string>> = {}

    for (const variant of variants) {
      const tmp: Record<string, string> = {}

      for (const option of variant.options) {
        tmp[option.option_id] = option.value
      }

      map[variant.id] = tmp
    }

    return map
  }, [variants])

  // memoized function to check if the current options are a valid variant
  const variant = useMemo(() => {
    let variantId: string | undefined = undefined

    for (const key of Object.keys(variantRecord)) {
      if (isEqual(variantRecord[key], options)) {
        variantId = key
      }
    }

    return variants.find((v) => v.id === variantId)
  }, [options, variantRecord, variants])

  // if product only has one variant, then select it
  useEffect(() => {
    if (variants.length === 1) {
      setOptions(variantRecord[variants[0].id])
    }
  }, [variants, variantRecord])

  // const disabled = useMemo(() => {
  //   return !variant
  // }, [variant])

  // memoized function to get the price of the current variant
  const formattedPrice = useMemo(() => {
    if (variant && cart?.region) {
      return formatVariantPrice({ variant, region: cart.region })
    } else if (cart?.region) {
      return findCheapestPrice(variants, cart.region)
    } else {
      // if no variant is selected, or we couldn't find a price for the region/currency
      return "N/A"
    }
  }, [variant, variants, cart])

  useEffect(() => {
    if (variant) {
      setInStock(canBuy(variant))
    }
  }, [variant])

  // const updateOptions = (update: Record<string, string>) => {
  //   setOptions({ ...options, ...update })
  // }

  const addToCart = () => {
    if (variant) {
      addItem({
        variantId: variant.id,
        quantity: 1,
      })
    }
  }

  const price = useProductPrice({ id: product.id!, variantId: variant?.id })

  const selectedPrice = useMemo(() => {
      const { variantPrice, cheapestPrice } = price

      return variantPrice || cheapestPrice || null
  }, [price])

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
                <div className="mt-3 text-4xl font-bold text-gray-500 sm:text-3xl sm:tracking-tight lg:text-3xl">
                <div className="mb-4">
                    {selectedPrice ? (
                    <div className="flex flex-col text-gray-700">
                        <span
                        className={clsx("text-xl-semi", {
                            "text-rose-600": selectedPrice.price_type === "sale",
                        })}
                        >
                        {selectedPrice.calculated_price}
                        </span>
                        {selectedPrice.price_type === "sale" && (
                        <>
                            <p>
                            <span className="text-gray-500">Original: </span>
                            <span className="line-through">
                                {selectedPrice.original_price}
                            </span>
                            </p>
                            <span className="text-rose-600">
                            -{selectedPrice.percentage_diff}%
                            </span>
                        </>
                        )}
                    </div>
                    ) : (
                    <div></div>
                    )}
                </div>
                </div>
                <div className="mt-5 mb-5 border-t border-gray-200 pt-10 font-bold">
                Description
                </div>
                <p className="max-w-xl">{product.description}</p>
                <button className="inline-block h-10 w-32 rounded-lg text-orange-500 bg-white hover:bg-orange-500 hover:text-white mt-5" onClick={addToCart}>{!inStock ? "Out of stock" : "Add to cart"}</button>
            </div>
            </div>
        </div>
    </div>
    
  )
}