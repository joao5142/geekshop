import httpClient from '@/lib/api'
import { BASE_URL_API } from '@/lib/api'
import { ICupom } from '@/types/globals/cupons'

export class CuponsService {
  static async getAll(): Promise<ICupom[] | []> {
    const cupons = await httpClient.get(BASE_URL_API + '/cupons')

    return cupons.data
  }
}
