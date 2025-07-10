import { defineStore } from 'pinia'
import { useUserAPI, useValidateAPI } from '@/helpers/useApi'

export const useUserStore = defineStore('user', {
  state: () => ({
    userID: null,
    account: null,
    userName: null,
    userRoles: [],
    token: null
  }),
  actions: {
    async readUser(payload) {
      const method = 'post'
      const path = '/sign-in'
      const data = payload

      try {
        const response = await useValidateAPI({ method, path, data })
        const responseData = response.data
        this.account = payload.account || null
        this.userID = responseData?.memberID || null
        this.userName = responseData?.memberName || null
        this.userRoles = Array.isArray(responseData?.roleName)
          ? responseData.roleName
          : responseData?.roleName
            ? [responseData.roleName]
            : []
        this.token = responseData?.token || null
        return response
      } catch (error) {
        this.account = null
        this.userID = null
        this.userRoles = []
        this.userName = null
        this.token = null
        return Promise.reject(error)
      }
    },
    async updatePassword(payload) {
      const method = 'post'
      const path = `/password-reset`
      const data = payload
      
      try {
        const response = await useUserAPI({ method, path, data })
        console.log(response)
        return response
      } catch (error) {
        console.error(error)
        return Promise.reject(error)
      }
    }
  },
  getters: {
    getAccount: (state) => state.account,
    getUserID: (state) => state.userID,
    getUserName: (state) => state.userName,
    getUserRoles: (state) => state.userRoles,
    getToken: (state) => state.token || {}
  },
  persist: true // 持久化 user 狀態
})