export interface ICupom {
  id: string | number
  discount: number
  image: string
  description: string
  isActive?: boolean
}
