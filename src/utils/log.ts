import { isRef, toRaw, watch } from "vue"

const logColors = {
  red: "31",
  green: "32",
  yellow: "33",
  blue: "34",
  magenta: "35",
  cyan: "36",
  gray: "37",
  darkGray: "90",
  lightRed: "91",
  lightGreen: "92",
  lightYellow: "93",
  lightBlue: "94",
  lightMagenta: "95",
  lightCyan: "96",
  white: "97",
}

type logColor = keyof typeof logColors

const log = (data: any, message: string = "value", color?: logColor, devOnly: boolean = false) => {
  if (
    devOnly &&
    import.meta.env.VITE_PUBLIC_DEV_ENV &&
    import.meta.env.VITE_PUBLIC_DEV_ENV !== "true"
  )
    return

  const logColor = color ? logColors[color] : message.toLowerCase().includes("store") ? "93" : "32"

  const _data = isRef(data) ? toRaw(data.value) : data

  console.log(
    `\x1b[${logColor}m%s\x1b[0m`,
    "------- <log> -------\n",
    "type:",
    typeof data,
    `\n${message}:`,
    typeof _data === "string" ? `'${_data}'` : _data
  )
}

export const watchLog = (
  data: any,
  message?: string,
  color: logColor = "lightCyan",
  devOnly: boolean = true
) => {
  const dataToWatch = isRef(data) ? data.value : data
  watch(dataToWatch, () => {
    log(data, message, color, devOnly)
  })
}

export default log
