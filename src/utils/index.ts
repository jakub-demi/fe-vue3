import type { ErrorResponseDataT, SeverityT, UserT } from "@/types"
import type { AxiosError, AxiosResponse } from "axios"
import type { Ref } from "vue"
import authStore from "@/stores/authStore"
import log from "@/utils/log"
import toastServiceStore from "@/stores/toastServiceStore"
import texts from "@/texts"

export const setToast = (message: string, severity?: SeverityT, title?: string, life?: number) => {
  const toast = toastServiceStore().toast
  if (!toast) return

  toast.add({
    severity: severity ?? "success",
    summary: title ?? severity === "error" ? "Failure" : "Info",
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

export const handleResData = <T>(
  response: AxiosResponse,
  ref: Ref<T>,
  showToast: boolean = false
) => {
  ref.value = response.data.data

  showToast && setToast(response.data.message)
}

export const handleInputErrors = <T>(error: AxiosError, ref: Ref<T>, showToast: boolean = true) => {
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

  showToast && setToast(message, "error")
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

export const intParseWithCheck = (param: number | string): number | undefined => {
  if (typeof param === "number") return param

  const parsed = Number.parseInt(param)

  return Number.isNaN(parsed) ? undefined : parsed
}
