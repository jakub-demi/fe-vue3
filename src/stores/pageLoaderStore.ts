import { defineStore } from "pinia"

const pageLoaderStore = defineStore("pageLoaderStore", {
  state: () => ({
    loading: true as boolean,
  }),
  actions: {
    setLoading(loading: boolean): void {
      this.loading = loading
    },
  },
})

export default pageLoaderStore
