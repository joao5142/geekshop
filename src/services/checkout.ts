import httpClient from '@/lib/api'
import { BASE_URL_API } from '@/lib/api'
import { ICheckoutData } from '@/types/globals/checkout'
import { IProduct } from '@/types/globals/products'

interface OrderData extends ICheckoutData {
  products: IProduct[]
}

export class CheckoutService {
  static async saveOrder(
    offerCode: string | number,
    order: OrderData
  ): Promise<{ orderId: string; total: string }> {
    const products = await httpClient.post(`${BASE_URL_API}/offers/${offerCode}/create_order`, {
      ...order,
    })

    return products.data
  }
}
