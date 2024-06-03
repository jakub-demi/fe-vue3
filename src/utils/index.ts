import { useToast } from "primevue/usetoast"
import type { SeverityT } from "@/types"
import type { AxiosError, AxiosResponse } from "axios"
import type { Ref } from "vue"

export const setToast = (message: string, severity?: SeverityT, title?: string) => {
  const toast = useToast()

  toast.add({
    severity: severity,
    summary: title ?? severity === "error" ? "Failure" : "Info",
    detail: message,
    life: 3000,
    group: "br",
  })
}

export const handleResData = <T>(
  response: AxiosResponse,
  ref: Ref<T>,
  showToast: boolean = false
) => {
  ref.value = response.data.data

  showToast && setToast(response.data.message)
}

export const handleInputErrors = <T>(error: AxiosError, ref: Ref<T>) => {
  const errData = error.response?.data as {
    errors: { [key: string]: string[] }
    message: string
  }
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

  setToast(message, "error")
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

export const getUserInitials = (fullName: string): string => {
  const parts = fullName.split(" ")
  const initials = parts.map((part) => {
    return part.substring(0, 1).toUpperCase()
  })
  return initials.toString().replace(/,/g, "")
}
