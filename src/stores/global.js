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
        console.log('API 請求:', { method, path, data })
        const response = await useGlobalAPI({ method, path, data })
        
        // 成功後更新本地狀態
        if (response.status === 200) {
          this.updateLocalStatus(payload.ID, payload.status)
        }
        
        return response
      } catch (error) {
        console.error('API 錯誤:', error)
        return Promise.reject(error)
      }
    },
    
    // 新增：更新本地狀態的方法
    updateLocalStatus(id, newStatus) {
      const index = this.globalList.findIndex(item => item.ID === id)
      if (index !== -1) {
        this.globalList[index].GameTableStatus = newStatus
        this.globalList[index].UpdateTime = new Date().toISOString()
        // 觸發響應式更新
        this.globalList = [...this.globalList]
      }
    }
  },
  getters: {
    getGlobalList: (state) => state.globalList,
  }
})