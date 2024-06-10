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
  current_status?: OrderStatusT
  has_access: boolean
  order_users: UserT[]
}

export type OrdersTableSlotPropsT = {
  data: OrderDataTableT
}

export type OrderDataT = {
  due_date: Date | string
  order_users: number[]
  customer_name: string
  customer_address: string
  category_id?: number | null

  status?: string | null
  payment_date?: Date | string | null
  created_at: Date | string
}

export type OrderErrorsT = {
  due_date?: string[]
  order_users?: string[]
  customer_name?: string[]
  customer_address?: string[]
  category_id?: string[]
  status?: string[]
  payment_date?: string[]
  created_at?: string[]
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

export type OrderDatesT = {
  due_date: Date | string
  payment_date?: Date | string | null
  created_at: Date | string
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

export type StrKeyStrValT = { [key: string]: string }

export type StrKeyNumValT = { [key: string]: number }

export type StrKeyNumStrValT = { [key: string]: number | string }

export type SelectOptionT = { option: number | string; value: number | string }

export type ErrorResponseDataT = {
  errors: { [key: string]: string[] }
  message: string
}

export type SelectOptionOrValueT = "option" | "value"

export type RouteParamT = number | string

export type ButtonTypeT = "save" | "create" | "update" | "submit" | "button"

export type ButtonSubmitTypeT = "create" | "update"

export type OptionalParamsOnlyT<T> = Partial<
  Pick<
    T,
    {
      [K in keyof T]-?: {} extends { [P in K]: T[K] } ? K : never
    }[keyof T]
  >
>

export type TextSizeT =
  | `text-${"" | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}xl`
  | "text-lg"
  | "text-sm"
  | "text-xs"
