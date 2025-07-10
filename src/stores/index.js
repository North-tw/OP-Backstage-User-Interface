import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js'

const cryptoKey = 'b$#I^#$ADyiVITj'

export const useAppStore = defineStore('app', {
  state: () => ({
    alert: {
      success: false,
      show: false,
      text: ''
    },
    navbarActive: true,
    isLoading: false,
    isMobile: false
  }),
  actions: {
    setAlert(data) {
      this.alert.show = data.show || false
      if (data?.success !== undefined) {
        this.alert.success = data.success
      }
      if (data?.text !== undefined) {
        this.alert.text = data.text
      }
    },
    setIsLoading(data) {
      this.isLoading = data
    },
    setNavbarActive(data) {
      this.navbarActive = data
    },
    setIsMobile(data) {
      this.isMobile = data
    }
  },
  getters: {
    getAlert: (state) => state.alert,
    getNavbarActive: (state) => state.navbarActive,
    getIsLoading: (state) => state.isLoading,
    getIsMobile: (state) => state.isMobile
  },
  persist: {
    key: 'NorthOP_State_Pinia',
    storage: {
      getItem: (key) => {
        try {
          const value = Cookies.get(key)
          if (!value) return null
          return CryptoJS.AES.decrypt(value, cryptoKey).toString(CryptoJS.enc.Utf8)
        } catch (e) {
          Cookies.remove(key)
          return null
        }
      },
      setItem: (key, value) =>
        Cookies.set(key, CryptoJS.AES.encrypt(String(value), cryptoKey).toString(), { expires: 365, secure: false }),
      removeItem: (key) => Cookies.remove(key)
    }
  }
})