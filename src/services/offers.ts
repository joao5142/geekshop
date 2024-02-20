import httpClient from '@/lib/api'
import { BASE_URL_API } from '@/lib/api'
import { IOffer } from '@/types/globals/offers'

export class OffersService {
  static async getAll(): Promise<IOffer[] | []> {
    const offers = await httpClient.get(BASE_URL_API + '/offers')

    return offers.data
  }
  static async getById(id: number | string): Promise<IOffer | null> {
    const offers = await httpClient.get(BASE_URL_API + '/offers/' + id)

    return offers.data
  }
}
