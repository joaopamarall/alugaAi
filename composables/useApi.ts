import { ofetch } from 'ofetch'

export function useApi() {
  const $api = ofetch.create({ baseURL: 'http://localhost:3001', retry: 0 }) // sem retry pra evitar “loop”
  return { $api }
}