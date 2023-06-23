import { Cart } from "@medusajs/medusa"
import { formatAmount } from "medusa-react"

export default function CartTotal ({ cart } : { cart: Cart }) {

    if (!cart) {
        return null
    }
    
    const {
        subtotal,
        discount_total,
        gift_card_total,
        tax_total,
        shipping_total,
        total,
      } = cart
    
      const getAmount = (amount: number | null | undefined) => {
        return formatAmount({
          amount: amount || 0,
          region: cart.region,
          includeTaxes: false,
        })
      }

    return (
    <div className="w-screen max-w-lg space-y-4">
      <div className="text-small-regular text-gray-700">
        <div className="flex items-center justify-between text-base-regular text-gray-900 mb-2">
          <span>Subtotal</span>
          <span>{getAmount(subtotal)}</span>
        </div>
        <div className="flex flex-col gap-y-1">
          {!!discount_total && (
            <div className="flex items-center justify-between">
              <span>Discount</span>
              <span>- {getAmount(discount_total)}</span>
            </div>
          )}
          {!!gift_card_total && (
            <div className="flex items-center justify-between">
              <span>Gift card</span>
              <span>- {getAmount(gift_card_total)}</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span>Shipping</span>
            <span>{getAmount(shipping_total)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Taxes</span>
            <span>{getAmount(tax_total)}</span>
          </div>
        </div>
        <div className="h-px w-full border-b border-gray-200 border-dashed my-4" />
        <div className="flex items-center justify-between text-base-regular text-gray-900 mb-2">
          <span>Total</span>
          <span>{getAmount(total)}</span>
        </div>
      </div>
      <div className="flex justify-end">
        <a
            href="#"
            className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
        >
            Checkout
        </a>
      </div>
    </div>
    )
}