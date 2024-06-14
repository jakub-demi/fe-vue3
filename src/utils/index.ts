import type {
  ErrorResponseDataT,
  SeverityT,
  UserT,
  ButtonSubmitTypeT,
  StrKeyAnyValT,
} from "@/types"
import type { AxiosError as AxiosErrorT, AxiosResponse } from "axios"
import { AxiosError } from "axios"
import type { Ref } from "vue"
import authStore from "@/stores/authStore"
import log from "@/utils/log"
import toastServiceStore from "@/stores/toastServiceStore"
import texts from "@/texts"
import router from "@/router"
import type { RouteParamsRaw } from "vue-router"
import { HttpStatusE } from "@/types/enums"
import { isRef } from "vue"
import isEqual from "lodash.isequal"

export const setToast = (message: string, severity?: SeverityT, title?: string, life?: number) => {
  const toast = toastServiceStore().toast
  if (!toast) return

  toast.add({
    severity: severity ?? "success",
    summary: title ?? (severity === "error" ? "Failure" : "Info"),
    detail: message,
    life: life && life > 0 ? life : 3000,
  })
}

export const setErrorToast = (message: string, life?: number, title?: string) => {
  setToast(message, "error", title, life)
}

export const setAccessDeniedToast = () => {
  setErrorToast(texts.toast.errors.accessDenied)
}

export const setAxiosErrorToast = (error: AxiosError) => {
  if (!error.response) {
    log(error, "setAxiosErrorToast - non-response error value", "lightRed", true)
    return
  }

  const errData = error.response.data as ErrorResponseDataT
  const { message } = errData
  setErrorToast(message)
}

export const setAxiosSuccessToast = (res: AxiosResponse) => {
  setToast(res.data.message)
}

export const handleResData = <T>(response: AxiosResponse, ref: Ref<T>) => {
  ref.value = response.data.data
}

export const handleInputErrors = <T>(
  error: AxiosError,
  ref: Ref<T>,
  showToast: boolean = true,
  toastTitle?: string
) => {
  const errData = error.response?.data as ErrorResponseDataT

  if (!error.response?.data) return

  const { errors } = errData
  const { message } = errData

  if (!errors) return

  if ("password" in errors) {
    errors["password_confirmation"] = errors["password"].filter((str) =>
      str.toLowerCase().includes("confirm")
    )
    errors["password"] = errors["password"].filter((str) => !str.toLowerCase().includes("confirm"))
  }

  ref.value = errors as T

  showToast && setToast(message, "error", toastTitle)
}

export const formatDate = (datetime: Date | string): string => {
  if (typeof datetime === "string") {
    datetime = new Date(datetime)
  }

  const year = datetime.getFullYear().toString().padStart(4, "0")
  const month = (datetime.getMonth() + 1).toString().padStart(2, "0")
  const day = datetime.getDate().toString().padStart(2, "0")

  const hours = datetime.getHours().toString().padStart(2, "0")
  const minutes = datetime.getMinutes().toString().padStart(2, "0")
  const seconds = datetime.getSeconds().toString().padStart(2, "0")

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export const getUserInitials = (): string => {
  const user = authStore().getUser
  if (!user) return ""

  return getInitialsForUser(user)
}

export const getInitialsForUser = (user: UserT): string => {
  const parts = user.fullName.split(" ")
  const initials = parts.map((part) => {
    return part.substring(0, 1).toUpperCase()
  })
  return initials.toString().replace(/,/g, "")
}

export const getUserAvatar = () => {
  const user = authStore().getUser

  return getAvatarForUser(user)
}

export const getAvatarForUser = (user: UserT | null) => {
  return user?.avatar?.image && import.meta.env.VITE_PUBLIC_API_BASE_URL
    ? import.meta.env.VITE_PUBLIC_API_BASE_URL + "/" + user.avatar.image
    : undefined
}

export const buildFilesFormData = (data: object, ignoredFileKeys?: string[]): FormData => {
  const formData = new FormData()

  if (ignoredFileKeys) {
    for (const key in data) {
      const value = (data as Record<string, any>)[key]

      if (!(ignoredFileKeys.includes(key) && !(value instanceof File))) {
        formData.append(key, value)
      }
    }
  } else {
    for (const key in data) {
      const value = (data as Record<string, any>)[key]
      formData.append(key, value)
    }
  }

  return formData
}

export const getAppName = (): string => {
  return import.meta.env.VITE_PUBLIC_APP_NAME ?? "App"
}

export const tomorrowDate = (): Date => {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)

  return tomorrow
}

export const unset = <T extends { [key: string]: any }>(
  obj: T,
  key: keyof T | (keyof T)[]
): void => {
  if (Array.isArray(key)) {
    key.forEach((key) => {
      delete obj[key]
    })
  } else {
    delete obj[key]
  }
}

export const unsetExcept = <T extends { [key: string]: any }>(
  obj: T,
  key: keyof T | (keyof T)[]
): void => {
  const keysToKeep = Array.isArray(key) ? key : [key]
  Object.keys(obj).forEach((key) => {
    if (!keysToKeep.includes(key as keyof T)) {
      delete obj[key]
    }
  })
}

export const intParseWithCheck = (
  param: number | string | null | undefined
): number | undefined => {
  if (typeof param === "number") return param

  const parsed = Number.parseInt(`${param}`)

  return Number.isNaN(parsed) ? undefined : parsed
}

export const dateIfNotEmpty = (value: Date | string | null | undefined): Date | undefined => {
  return value ? (value instanceof Date ? value : new Date(value)) : undefined
}

export const getKeyValObjectFromArray = <T>(
  data: T[],
  keyName: string = "id",
  valueName: string = "name"
) => {
  return data.reduce((item: Record<number | string, any>, obj: T) => {
    const key = obj[keyName as keyof T] as number | string

    item[key] = obj[valueName as keyof T]
    return item
  }, {})
}

export const capitalizeFirstLetter = (str: string): string => {
  if (str.length === 0) return str
  const lowerCasedStr = str.toLowerCase()

  return lowerCasedStr.charAt(0).toUpperCase() + lowerCasedStr.slice(1)
}

export const strLen = (value: number | string | null | undefined): number => {
  return value ? value.toString().length : -1
}

export const getSubmitBtnType = (id?: number): ButtonSubmitTypeT => (id ? "update" : "create")

export const accessDeniedRedirect = (route: string, routeParams?: RouteParamsRaw) => {
  router.replace({ name: route, params: routeParams }).then(() => {
    setAccessDeniedToast()
  })
}

export const handleAccessDenied = (
  errorOrResponse: AxiosErrorT | AxiosResponse,
  route: string,
  routeParams?: RouteParamsRaw
) => {
  const isError = errorOrResponse instanceof AxiosError

  if (isError && errorOrResponse.response?.status === HttpStatusE.FORBIDDEN) {
    const errData = errorOrResponse.response.data as { message: string }
    router.replace({ name: route, params: routeParams }).then(() => {
      setErrorToast(errData.message)
    })
  } else if (!isError) {
    const hasAccess: boolean | null = errorOrResponse.data.data?.has_access
      ? errorOrResponse.data.data.has_access
      : null

    if (hasAccess) return

    accessDeniedRedirect(route, routeParams)
  }
}

export const handleWrongRequest = (route: string, routeParams?: RouteParamsRaw) => {
  router.replace({ name: route, params: routeParams }).then(() => {
    setErrorToast(texts.toast.errors.wrongRequest)
  })
}

export const getCostWithVat = (
  cost: number | undefined,
  vat: number | undefined
): number | undefined => {
  return cost && vat ? cost + cost * vat : cost
}

export const getCostWithoutVat = (costWithVat: number, vat: number): number => {
  return costWithVat / (1 + vat)
}

export const numerize = (value: string | number): number => {
  return typeof value === "number"
    ? value
    : Number.parseFloat(value.replace(/\s+/g, "").replace(/,+/g, "."))
}

export const getKeyboardEventInputStrVal = (event: KeyboardEvent): string => {
  return (event.target as HTMLInputElement).value
}

export const getKeyboardEventInputNumVal = (event: KeyboardEvent): number => {
  return numerize((event.target as HTMLInputElement).value)
}

export const calcCost = (
  vat: number,
  event: KeyboardEvent,
  cost?: Ref<number | undefined>
): number | undefined => {
  const value = getKeyboardEventInputNumVal(event)
  const assignment = Number.isNaN(value) ? undefined : getCostWithoutVat(value, vat)

  if (cost && isRef(cost)) {
    cost.value = assignment
  }

  return assignment
}

export const calcCostWithVat = (
  cost: number | undefined,
  vat: number,
  event?: KeyboardEvent,
  costWithVat?: Ref<number | undefined>
): number | undefined => {
  if (event) {
    const value = getKeyboardEventInputNumVal(event)
    const assignment = Number.isNaN(value) ? undefined : getCostWithVat(value, vat)

    if (costWithVat && isRef(costWithVat)) {
      costWithVat.value = assignment
    }

    return assignment
  } else {
    const gotCostWithVat = getCostWithVat(cost, vat)

    if (costWithVat && isRef(costWithVat)) {
      costWithVat.value = gotCostWithVat
    }

    return gotCostWithVat
  }
}

export const areObjectsEqual = (object1: object, object2: object): boolean => {
  return isEqual(object1, object2)
}

export const objectToFormData = (obj: StrKeyAnyValT): FormData => {
  const formData = new FormData()
  Object.keys(obj).forEach((key) => {
    formData.append(key, obj[key] instanceof Blob ? obj[key] : obj[key].toString())
  })
  return formData
}
