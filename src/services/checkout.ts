import httpClient from '@/lib/api'
import { BASE_URL_API } from '@/lib/api'
import { ICheckoutData } from '@/types/globals/checkout'
import { ICupom } from '@/types/globals/cupons'
import { IProduct } from '@/types/globals/products'

interface IOrderData extends ICheckoutData {
  products: IProduct[]
  cupons: ICupom[] | []
}

export class CheckoutService {
  static async saveOrderWithOffer(
    offerCode: string | number,
    order: IOrderData
  ): Promise<{ orderId: string; total: string }> {
    const products = await httpClient.post(`${BASE_URL_API}/offers/${offerCode}/create_order`, {
      ...order,
    })

    return products.data
  }

  static async saveOrder(
    order: IOrderData
  ): Promise<{ orderId: string; total: string | number; subtotal: string | number }> {
    const products = await httpClient.post(`${BASE_URL_API}/orders`, {
      ...order,
    })

    return products.data
  }
}
