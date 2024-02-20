import { ICupom } from './cupons'
import { IProduct } from './products'

export type PaymentTypes = 'CREDIT' | 'BILLET' | 'PIX'
export interface IUserData {
  name: string
  phone: string
  email: string
  cpf: string
}
export interface IAddressData {
  street: string
  streetNumber: number | string
  uf: string
  city: string
  cep: string
}
export interface ICardData {
  user: string
  number: string
  cvv: string
  date: string
}
export interface ICartItem extends IProduct {
  quantity: number
}

export interface IPaymentData {
  type: PaymentTypes | null
  card?: ICardData | null
}
export interface IOrderData {
  orderId: string | number | null
  userInfo: IUserData
  address: IAddressData
  payment: IPaymentData
  products: ICartItem[] | []
  cupons: ICupom[] | []
  total: number
  subtotal: number
}

export interface ICheckoutData {
  userInfo: IUserData
  address: IAddressData
  payment: IPaymentData
}
