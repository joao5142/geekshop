import { IProduct } from './products'

export interface IOffer {
  id: number
  percentage: number
  offerPrice: number
  product: IProduct
}
