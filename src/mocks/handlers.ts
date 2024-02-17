import { HttpResponse, http } from 'msw'

export const handlers = [
  http.get('/ping', () => {
    return HttpResponse.text('pong')
  }),
]
