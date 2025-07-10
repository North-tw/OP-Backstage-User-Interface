import { defineStore } from 'pinia'
import { useTableAPI } from '@/helpers/useApi'

export const useTableStore = defineStore('table', {
  state: () => ({
    tableConditionList: []
  }),
  actions: {
    async readTableConditionList(payload = {}) {
      const method = 'get'
      const path = '/games/tables'
      const data = { params: { ...payload } }
      try {
        const response = await useTableAPI({ method, path, data })
        const responseData = Array.isArray(response.data?.data?.tables)
          ? response.data.data.tables
          : []        
        this.tableConditionList = responseData
        return response
      } catch (error) {
        this.tableConditionList = []
        return Promise.reject(error)
      }
    },
    async switchTableStatus(payload = {}) {
      const method = 'patch'
      const path = '/games/tables/1/status'
      const data = { params: { ...payload } }
      try {
        const response = await useTableAPI({ method, path, data })
        const responseData = Array.isArray(response.data?.data?.tables)
          ? response.data.data.tables
          : []        
        this.tableConditionList = responseData
        return response
      } catch (error) {
        this.tableConditionList = []
        return Promise.reject(error)
      }
    },
    async addResult(payload = {}) {
      const method = 'post'
      const path = '/games/results'
      const data = payload
      try {
        const response = await useTableAPI({ method, path, data })
        console.log(response)
        return response
      } catch (error) {
        console.error(error)
        return Promise.reject(error)
      }
    },
    async voidRoundDirectly(payload = {}) {
      const method = 'post'
      const path = '/games/void-rounds'
      const data = payload
      try {
        const response = await useTableAPI({ method, path, data })
        console.log(response)
        return response
      } catch (error) {
        console.error(error)
        return Promise.reject(error)
      }
    }    
  },
  getters: {
    getTableConditionList: (state) => state.tableConditionList
  }
})