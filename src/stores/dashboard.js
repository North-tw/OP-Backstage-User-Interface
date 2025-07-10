import { defineStore } from 'pinia'
import { useDashboardAPI } from '@/helpers/useApi'

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    dashboardData: {}
  }),
  actions: {
    async readDashboardData(payload = {}) {
      const method = 'get'
      const path = '/static/general'
      const data = { params: { ...payload } }
      try {
        const response = await useDashboardAPI({ method, path, data })
        const responseData = response.data?.data || {}
        this.dashboardData = responseData
        return response
      } catch (error) {
        this.dashboardData = {}
        return Promise.reject(error)
      }
    }
  },
  getters: {
    getDashboardData: (state) => state.dashboardData
  }
})