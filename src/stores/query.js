import { defineStore } from 'pinia'
import { useQueryAPI } from '@/helpers/useApi'

export const useQueryStore = defineStore('query', {
  state: () => ({
    resultHistoryList: [],
    resultVideoLinkObject: {},
    linkList: []
  }),
  actions: {
    async readResultHistoryList(payload = {}) {
      const method = 'get'
      const path = '/games/results'
      const data = { params: { ...payload } }
      try {
        const response = await useQueryAPI({ method, path, data })
        const responseData = Array.isArray(response.data?.data?.results)
          ? response.data.data.results
          : []       
        this.resultHistoryList = responseData
        return response
      } catch (error) {
        this.resultHistoryList = []
        return Promise.reject(error)
      }
    },     
    async readResultVideoLinkList(payload = {}) {
        const method = 'get'
        const path = `/games/tables/${payload.tableID}/streaming-link`
        const data = { params: { ...payload } }
        try {
            const response = await useQueryAPI({ method, path, data })
            const videoData = response.data.data || {}
            const linkList = []
            if ('re1' in videoData) linkList.push(videoData.re1)
            if ('re2' in videoData) linkList.push(videoData.re2)
            this.resultVideoLinkObject = {
                ...payload,
                linkList
            }        
            return response
        } catch (error) {
            this.resultVideoLinkObject = { ...payload, linkList: [] }
            return Promise.reject(error)
        }
    },      
  },
  getters: {
    getResultHistoryList: (state) => state.resultHistoryList,
    getResultVideoLinkObject: (state) => state.resultVideoLinkObject
  }
})