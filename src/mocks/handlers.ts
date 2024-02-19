import { HttpResponse, http } from 'msw'
import products from './items/products.json'
import { v4 as uuidv4 } from 'uuid'
import { BASE_URL_API } from '@/lib/api'

export const handlers = [
  http.get(BASE_URL_API + '/products', () => {
    return HttpResponse.json(products)
  }),

  http.post(BASE_URL_API + '/offers/:offer_id/create_order', ({ params }) => {
    console.log(params)

    return HttpResponse.json({
      orderId: uuidv4(),
      total: 444.33,
    })
  }),
]
