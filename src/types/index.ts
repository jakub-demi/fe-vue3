export type CredentialsT = {
  email: string
  password: string
}

export type InteractEventT = KeyboardEvent | MouseEvent | TouchEvent

export type UserAvatarT = {
  image: string | null
  thumb: string | null
}

export type UserT = {
  id: number
  email: string
  firstname: string
  lastname: string
  fullName: string
  is_admin: boolean
  avatar?: UserAvatarT
}
