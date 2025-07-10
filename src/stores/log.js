import { defineStore } from 'pinia'
import { useLogAPI } from '@/helpers/useApi'

export const useLogStore = defineStore('log', {
  state: () => ({
    tableConditionLogList: [],
    voidRoundLogList: [],
    globalLogList: []
  }),
  actions: {
    async readTableConditionLogList(payload = {}) {
      const method = 'get'
      const path = '/tables'
      const data = { params: { ...payload } }
      try {
        const response = await useLogAPI({ method, path, data })
        const responseData = Array.isArray(response.data?.data?.logs)
          ? response.data.data.logs
          : []       
        this.tableConditionLogList = responseData
        return response
      } catch (error) {
        this.tableConditionLogList = []
        return Promise.reject(error)
      }
    },      
    async readVoidRoundLogList(payload = {}) {
      const method = 'get'
      const path = '/void-rounds'
      const data = { params: { ...payload } }
      try {
        const response = await useLogAPI({ method, path, data })
        const responseData = Array.isArray(response.data?.data?.logs)
          ? response.data.data.logs
          : []        
        this.voidRoundLogList = responseData
        return response
      } catch (error) {
        this.voidRoundLogList = []
        return Promise.reject(error)
      }
    },     
    async readGlobalLogList(payload = {}) {
      const method = 'get'
      const path = '/global-maintenance'
      const data = { params: { ...payload } }
      try {
        const response = await useLogAPI({ method, path, data })
        const responseData = Array.isArray(response.data?.data?.logs)
          ? response.data.data.logs
          : []        
        this.globalLogList = responseData
        return response
      } catch (error) {
        this.globalLogList = []
        return Promise.reject(error)
      }
    }, 
  },
  getters: {
    getTableConditionLogList: (state) => state.tableConditionLogList,
    getVoidRoundLogList: (state) => state.voidRoundLogList,
    getGlobalLogList: (state) => state.globalLogList
  }
})