import httpClient from '@/lib/api'
import { IFieldData, IState } from '@/types/globals/address'

export class AddressService {
  static async getStates(): Promise<IState[]> {
    const { data } = await httpClient.get(`https://brasilapi.com.br/api/ibge/uf/v1`)

    return data
  }

  static async getInfosByCep(cep: string | number): Promise<IFieldData> {
    const { data } = await httpClient.get(`https://viacep.com.br/ws/${cep}/json`)

    return data
  }
}
