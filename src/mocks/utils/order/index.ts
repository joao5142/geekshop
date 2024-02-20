import { ICartItem } from '@/types/globals/checkout'
import { ICupom } from '@/types/globals/cupons'

export function calculateTotalPriceWithDiscounts(products: ICartItem[], cupons: ICupom[]): number {
  const totalDiscount = cupons.reduce((acc, current) => {
    return acc + current.discount
  }, 0)

  const total = products.reduce((total: number, product: ICartItem) => {
    return total + product.price * product.quantity
  }, 0)

  if (totalDiscount) {
    return total - totalDiscount * 100
  } else {
    return total
  }
}

export function calculateTotalPrice(products: ICartItem[]): number {
  const total = products.reduce((total: number, product: ICartItem) => {
    return total + product.price * product.quantity
  }, 0)

  return total
}
