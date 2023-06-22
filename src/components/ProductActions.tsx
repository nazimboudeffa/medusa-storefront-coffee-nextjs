import Image from 'next/image'
import clsx from "clsx"
import useProductPrice from '@/hooks/use-product-price'
import { useProductActions } from '@/context/product-context'
import { useMemo, useState } from 'react'

function cn(...classes : any[]) {
    return classes.filter(Boolean).join(' ')
  }

export default function ProductActions({ product } : { product : any }) {

    const [isLoading, setLoading] = useState(true)
    
    const { updateOptions, addToCart, options, inStock, variant } =
    useProductActions()

    const price = useProductPrice({ id: product.id!, variantId: variant?.id })

    const selectedPrice = useMemo(() => {
        const { variantPrice, cheapestPrice } = price

        return variantPrice || cheapestPrice || null
    }, [price])

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