import axios, { AxiosHeaders } from "axios"
import type { AxiosPromise, ResponseType } from "axios"
import { HttpStatusE } from "@/types/enums"
import log from "@/utils/log"
import router from "@/router"

const doAxios = (
  url: string,
  method:
    | "get"
    | "GET"
    | "post"
    | "POST"
    | "put"
    | "PUT"
    | "patch"
    | "PATCH"
    | "delete"
    | "DELETE" = "GET",
  api: boolean = false,
  data?: object,
  headers?: AxiosHeaders,
  responseType?: ResponseType
): AxiosPromise => {
  return axios({
    baseURL: (import.meta.env.VITE_PUBLIC_API_BASE_URL ?? "//localhost") + (api ? "/api" : ""),
    withCredentials: true,
    withXSRFToken: true,
    method,
    url,
    data,
    headers: headers,
    responseType: responseType,
  }).catch((error) => {
    if (error.response?.status == HttpStatusE.NOT_FOUND) {
      router.replace({ name: "404" })
    }

    log(error, "doAxios error", "lightRed", true)

    throw error
  })
}

export default doAxios
