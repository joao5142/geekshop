import { HttpResponse, http } from 'msw'
import products from './items/products.json'
import cupons from './items/cupons.json'
import offers from './items/offers.json'
import { v4 as uuidv4 } from 'uuid'
import { BASE_URL_API } from '@/lib/api'
import { ICheckoutData } from '@/types/globals/checkout'
import { IProduct } from '@/types/globals/products'

interface OrderData extends ICheckoutData {
  products: IProduct[]
}
export const handlers = [
  //PRODUCTS
  http.get(BASE_URL_API + '/products', () => {
    return HttpResponse.json(products)
  }),

  //CUPONS
  http.get(BASE_URL_API + '/cupons', ({ params }) => {
    console.log(params)

    return HttpResponse.json(cupons)
  }),

  //OFFERS
  http.get(BASE_URL_API + '/offers', ({ params }) => {
    console.log(params)

    return HttpResponse.json(offers)
  }),

  http.get(BASE_URL_API + '/offers/:id', ({ params }) => {
    const { id } = params as { id: string | number }

    const offer = offers.find((item) => item.id === Number(id))

    console.log(offer)
    return HttpResponse.json(offer)
  }),

  http.post<never, OrderData, never>(
    BASE_URL_API + '/offers/:offer_id/create_order',
    async ({ request }) => {
      const { userInfo } = await request.json()

      console.log(userInfo)
      const invalidCpf = /^0{3}\.0{3}\.0{3}-0{2}$/

      if (userInfo.cpf.match(invalidCpf)) {
        return HttpResponse.json(
          {
            error: {
              message: 'Cpf informado não é valido',
            },
          },
          { status: 400 }
        )
      }

      return HttpResponse.json({
        orderId: uuidv4(),
        total: 444.33,
      })
    }
  ),
]
