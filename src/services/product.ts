import httpClient from '@/lib/api'
import { BASE_URL_API } from '@/lib/api'

export class ProductService {
  static async getAll(): Promise<unknown> {
    const products = await httpClient.get(BASE_URL_API + '/products')

    return products.data
  }

  static async getById(id: string | number): Promise<unknown> {
    const products = await httpClient.get(BASE_URL_API + '/products/' + id)

    return products.data
  }
}
