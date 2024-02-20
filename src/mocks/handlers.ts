import { HttpResponse, http } from 'msw'
import products from './items/products.json'
import cupons from './items/cupons.json'
import offers from './items/offers.json'
import { v4 as uuidv4 } from 'uuid'
import { BASE_URL_API } from '@/lib/api'

import { checkCpfIsInvalid } from '@/utils/checkout'
import { IOrderData } from '@/types/globals/checkout'
import { calculateTotalPrice, calculateTotalPriceWithDiscounts } from './utils/order'

export const handlers = [
  //PRODUCTS
  http.get(BASE_URL_API + '/products', () => {
    return HttpResponse.json(products)
  }),

  http.get(BASE_URL_API + '/products/:id', ({ params }) => {
    const { id } = params as { id: string | number }

    const product = products.find((product) => product.id === Number(id))

    if (product) {
      return HttpResponse.json(product)
    } else {
      return HttpResponse.json({})
    }
  }),

  //CUPONS
  http.get(BASE_URL_API + '/cupons', ({ params }) => {
    console.log(params)

    return HttpResponse.json(cupons)
  }),

  //ORDERS
  http.post<never, IOrderData, never>(BASE_URL_API + '/orders', async ({ request }) => {
    const { userInfo, products, cupons } = await request.json()

    console.log(userInfo)

    if (checkCpfIsInvalid(userInfo.cpf)) {
      return HttpResponse.json(
        {
          error: {
            message: 'Cpf informado não é valido',
          },
        },
        { status: 400 }
      )
    }
    const subtotal = calculateTotalPrice(products)
    const totalPrice = calculateTotalPriceWithDiscounts(products, cupons)

    return HttpResponse.json({
      orderId: uuidv4(),
      total: totalPrice,
      subtotal,
    })
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

  http.post<never, IOrderData, never>(
    BASE_URL_API + '/offers/:offer_id/create_order',
    async ({ request }) => {
      const { userInfo, products, cupons } = await request.json()

      console.log(userInfo)

      if (checkCpfIsInvalid(userInfo.cpf)) {
        return HttpResponse.json(
          {
            error: {
              message: 'Cpf informado não é valido',
            },
          },
          { status: 400 }
        )
      }
      const totalPrice = calculateTotalPriceWithDiscounts(products, cupons)
      const subtotal = calculateTotalPrice(products)

      return HttpResponse.json({
        orderId: uuidv4(),
        total: totalPrice,
        subtotal,
      })
    }
  ),
]
