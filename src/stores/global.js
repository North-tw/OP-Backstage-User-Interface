import { defineStore } from 'pinia'
import { useGlobalAPI } from '@/helpers/useApi'

export const useGlobalStore = defineStore('global', {
  state: () => ({
    globalList: [],
  }),
  actions: {
    async readGlobalList(payload = {}) {
      const method = 'get'
      const path = '/global-maintenance'
      const data = { params: { ...payload } }
      try {
        const response = await useGlobalAPI({ method, path, data })
        const responseData = response.data.data.maintenance_config || []
        this.globalList = responseData
        return response
      } catch (error) {
        this.globalList = []
        return Promise.reject(error)
      }
    },          
    async switchSiteStatus(payload = {}) {
      const method = 'patch'
      const path = `/global-maintenance/${payload.ID}`
      const data = payload
      try {
        const response = await useGlobalAPI({ method, path, data })
        return response
      } catch (error) {
        return Promise.reject(error)
      }
    },
  },
  getters: {
    getGlobalList: (state) => state.globalList,
  }
})