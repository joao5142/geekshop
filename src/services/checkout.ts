import httpClient from '@/lib/api'
import { BASE_URL_API } from '@/lib/api'
import { CheckoutData } from '@/store/modules/cartStore'
import { Product } from '@/store/modules/productsStore'

interface OrderData extends CheckoutData {
  products: Product[]
}

export class CheckoutService {
  static async saveOrder(offerCode: string | number, order: OrderData): Promise<unknown> {
    const products = await httpClient.post(`${BASE_URL_API}/offers/${offerCode}/create_order`, {
      order,
    })

    return products.data
  }
}
