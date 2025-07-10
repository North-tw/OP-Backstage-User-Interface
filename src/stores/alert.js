import { defineStore } from 'pinia'

export const useAlertStore = defineStore('alert', {
  state: () => ({
    data: {
      show: false,
      success: false,
      text: ''
    }
  }),
  actions: {
    setAlert(payload) {
      this.data = { ...this.data, ...payload }
    }
  }
})