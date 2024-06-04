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

export type UpdateProfileFormT = {
  email?: string
  firstname?: string
  lastname?: string
  avatar?: File
}

export type UserErrorT = {
  email?: string
  firstname?: string
  lastname?: string
  avatar?: string
}

export type SeverityT = "success" | "info" | "warn" | "error" | "secondary" | "contrast"

export type ChangePasswordT = {
  current_password: string
  password: string
  password_confirmation: string
}

export type ChangePasswordErrorsT = {
  current_password?: string
  password?: string
  password_confirmation?: string
}
