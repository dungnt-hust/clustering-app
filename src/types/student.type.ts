export type Gender = 'male' | 'female' | 'other'

export interface Person {
  avatar?: string
  fullName: string
  address: string
  phone: string
  email: string
  age: number
  gender: Gender
  stars: number
}
