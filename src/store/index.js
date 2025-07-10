import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js'

const cryptoKey = 'b$#I^#$ADyiVITj'

export default createStore({
  state: {
    alert: {
      success: false,
      show: false,
      text: ''
    },
    navbarActive: true,
    isLoading: false,
    isMobile: false
  },
  mutations: {
    setAlert: (state, { data }) => {
      state.alert.show = data.show || false
      if (data?.success !== undefined) {
        state.alert.success = data.success
      }
      if (data?.text !== undefined) {
        state.alert.text = data.text
      }
    },
    setIsLoading: (state, { data }) => {
      state.isLoading = data
    },
    setNavbarActive: (state, { data }) => {
      state.navbarActive = data
    },
    setIsMobile: (state, { data }) => {
      state.isMobile = data
    }
  },
  actions: {
  },
  getters: {
    getAlert: state => state.alert,
    getNavbarActive: state => state.navbarActive,
    getIsLoading: state => state.isLoading,
    getIsMobile: state => state.isMobile
  },
  modules: {
    
  },
  plugins: [
    createPersistedState({
      key: 'NorthOP_State',
      storage: {
        getItem: (key) => Cookies.get(key) ? CryptoJS.AES.decrypt(Cookies.get(key), cryptoKey).toString(CryptoJS.enc.Utf8) : null,
        setItem: (key, value) =>
          Cookies.set(key, CryptoJS.AES.encrypt(String(value), cryptoKey).toString(), { expires: 365, secure: false }),
        removeItem: (key) => Cookies.remove(key)
      }
    })
  ]
})
