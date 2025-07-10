import { defineStore } from 'pinia'
import { useCommonAPI } from '@/helpers/useApi'

export const useCommonStore = defineStore('common', {
  state: () => ({
    dealerDomainList: [],
    hallList: [],
    gameList: [],
    tableIDList: [],
    cardList:[]
  }),
  actions: {
    async readDealerDomainList() {
      this.dealerDomainList = ['Mexico']
      return this.dealerDomainList
    },      
    async readHallList(payload = {}) {
      const method = 'get'
      const path = '/games/halls'
      const data = { params: { ...payload } }
      try {
        const response = await useCommonAPI({ method, path, data })
        const responseData = response.data.data.halls || []
        this.hallList = responseData
        return response
      } catch (error) {
        this.hallList = []
        return Promise.reject(error)
      }
    },
    async readGameList(payload = {}) {
      const method = 'get'
      const path = '/games/game-types'
      const data = { params: { ...payload } }
      try {
        const response = await useCommonAPI({ method, path, data })
        const responseData = response.data.data.games || []
        this.gameList = responseData
        return response
      } catch (error) {
        this.gameList = []
        return Promise.reject(error)
      }
    },
    async readTableIDList(payload = {}) {
      const method = 'get'
      const path = '/games/tables/dropdown'
      const data = { params: { ...payload } }
      try {
        const response = await useCommonAPI({ method, path, data })
        const responseData = response.data.data.tables || []
        this.tableIDList = responseData
        return response
      } catch (error) {
        this.tableIDList = []
        return Promise.reject(error)
      }
    },
    async readCardList(payload = {}) {
      const method = 'get'
      const path = `/games/game-types/${payload.gameType}/combinations`
      const data = { params: { ...payload } }
      try {
        const response = await useCommonAPI({ method, path, data })
        const responseData = response.data.data.combinations || []
        this.cardList = responseData
        return response
      } catch (error) {
        this.cardList = []
        return Promise.reject(error)
      }
    }            

  },
  getters: {
    getDealerDomainList: (state) => state.dealerDomainList,
    getHallList: (state) => state.hallList,
    getGameList: (state) => state.gameList,
    getTableIDList: (state) => state.tableIDList,
    getCardList: (state) => state.cardList
  }
})