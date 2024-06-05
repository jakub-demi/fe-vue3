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

export type DataTableColT = {
  field: string
  header: string
}

export type OrderT = {
  id: number
  order_number: number
  due_date: Date | string
  payment_date: Date | string | null
  created_at: Date | string
  has_access: boolean
  customer_name: string
  customer_address: string
  order_users: UserT[]
  category?: OrderCategoryT
  current_status?: OrderStatusT
}

export type OrderDataTableT = {
  id: number
  order_number: number
  due_date: Date | string
  payment_date: Date | string | null
  created_at: Date | string
  has_access: boolean
  order_users: UserT[]
}

export type OrdersTableSlotPropsT = {
  data: OrderDataTableT
}

export type OrderDataCreateT = {
  due_date: Date | string
  order_users: number[]
  customer_name: string
  customer_address: string
  category_id?: number
  status?: string
}

export type OrderDataUpdateT = {
  due_date: Date | string
  payment_date: Date | string | null
  created_at: Date | string
  order_users: number[]
  customer_name: string
  customer_address: string
  category_id?: number
  status?: string
}

export type OrderCategoryT = {
  id: number
  name: string
  slug: string
}

export type OrderStatusT = {
  name: string
  value: string
  color: string
  slug: string
}

export type ActionsMenuPermissions = {
  view: boolean
  edit: boolean
  delete: boolean
}
