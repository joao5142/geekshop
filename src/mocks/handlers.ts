import { HttpResponse, http } from 'msw'
import products from './items/products.json'

import { BASE_URL_API } from '@/lib/api'

export const handlers = [
  http.get(BASE_URL_API + '/products', () => {
    return HttpResponse.json(products)
  }),
]
