import { defineStore } from "pinia"

type DialogStatesT = {
  current: {
    visible: boolean
    text?: string
    headerText?: string
    confirmFn?: Function
    declineFn?: Function
    confirmBtnText?: string
    declineBtnText?: string
    className?: string
  }
}

const dialogStore = defineStore("dialogStore", {
  state: () =>
    <DialogStatesT>{
      current: {
        visible: false,
        text: undefined,
        headerText: undefined,
        confirmFn: undefined,
        declineFn: undefined,
        confirmBtnText: undefined,
        declineBtnText: undefined,
        className: undefined,
      },
    },
  actions: {
    doReset(): void {
      this.current.visible = false
      this.current.text = undefined
      this.current.headerText = undefined
      this.current.confirmFn = undefined
      this.current.declineFn = undefined
      this.current.confirmBtnText = undefined
      this.current.declineBtnText = undefined
      this.current.className = undefined
    },

    showDialog(
      text: string,
      confirmFn?: Function,
      declineFn?: Function,
      confirmBtnText?: string,
      declineBtnText?: string,
      headerText?: string,
      className?: string
    ): void {
      this.current.visible = true
      this.current.text = text
      this.current.headerText = headerText
      this.current.confirmFn = confirmFn
      this.current.declineFn = declineFn
      this.current.confirmBtnText = confirmBtnText
      this.current.declineBtnText = declineBtnText
      this.current.className = className
    },
  },
})

export default dialogStore
