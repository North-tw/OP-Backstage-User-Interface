<template>
  <div>
    <AppBreadcrumb :bread-crumbs="breadCrumbs" />
    <div class="d-flex align-items-center justify-content-between mb-3">
      <h3>Unsettle Result History</h3>
      <div class="d-flex">
        <button
          class="btn btn-outline-primary d-flex align-items-center me-1"
          type="button"
          @click="setIsSearchActive(!isSearchActive)"
        >
          <AppIcon
            name="filter"
            class="icon-sm me-2"
          />
          Query
        </button>
      </div>
    </div>

    <!-- search -->
    <UnsettleResultHistoryListSearch
      v-model:searchState="searchState"
      @setSearchState="(isSearch) => readUnsettleResultHistoryList(null, isSearch)"
      @resetList="onResetList"
    />

    <table class="table table-hover rounded-3 overflow-hidden">
      <thead class="table-primary-light">
        <tr class="align-middle">
          <th class="text-center small">
            Game Name
          </th>
          <th
            class="text-center small"
          >
            Game ID
          </th>          
          <th class="text-center small">
            Table ID
          </th>          
          <th class="text-center small">
            Shoe  
          </th>
          <th class="text-center small">
            Round
          </th> 
          <th class="text-center small">
            Round Start Time
          </th>
          <th class="text-center small">
            Calculate
          </th>
          <th class="text-center small">
            Voided
          </th>
          <th class="text-center small">
            Result
          </th>
          <th class="text-center small">
            Link
          </th>   
          <!-- 動態欄位 -->
          <th
            v-for="field in allResultDetailFields"
            :key="field"
            class="text-center small"
          >
            {{ field }}
          </th> 
          <th class="text-center small">
            Unsettle
          </th>
          <th class="text-center small">
            Total
          </th>                                            
        </tr>
      </thead>
      <tbody class="border-top">
        <UnsettleResultHistoryListItem
          v-for="(item, index) in unsettleResultHistoryList"
          :key="item.id"
          :game-type="item.gameType"
          :game-i-d="item.id"
          :table-i-d="item.tableID"
          :shoe="item.shoeNo"
          :round="item.roundNo"
          :round-start-time="item.updateTime"
          :calculate="item.calculate"
          :voided="item.voided"
          :result="item.gameResult"
          :link="item.link"
          :unsettle="item.unsettle"
          :total="item.total"            
          :result-detail-fields="allResultDetailFields"
          :result-detail="item.resultDetail"        
          :item-index="(pageInfo.page - 1) * pageInfo.perPage + index + 1"
        />
        <tr v-if="!unsettleResultHistoryList.length">
          <td colspan="12" class="text-center text-secondary">
            No Data.
          </td>
        </tr>
      </tbody>
    </table>

    <!-- pagination -->
    <div class="d-flex align-items-center justify-content-between">
      <span class="small pr-2">
        <template v-if="pageInfo.total > 0">
          {{ (pageInfo.page - 1) * pageInfo.perPage + 1 }} -
          {{ Math.min(pageInfo.page * pageInfo.perPage, pageInfo.total) }} 筆資料 / 共
          {{ pageInfo.totalPage }} 頁
        </template>
        <template v-else>
          0 筆資料 / 共 0 頁
        </template>
      </span>
      <AppPagination
        :current-page="pageInfo.page"
        :total-page="pageInfo.totalPage"
        @setPage="onSetPage"
      />
    </div>
  </div>
</template>
<script>
import { computed, provide, ref, onBeforeUnmount } from 'vue'
import { useQueryStore } from '@/stores/query'
import { useCommonStore } from '@/stores/common'
import AppBreadcrumb from '@/components/AppBreadcrumb.vue'
import AppPagination from '@/components/AppPagination'
import UnsettleResultHistoryListItem from '@/components/UnsettleResultHistoryListItem'
import UnsettleResultHistoryListSearch from '@/components/UnsettleResultHistoryListSearch'
import { useErrorMessage } from '@/helpers/useApiMessage.js'
import { useMixin } from '@/helpers/useMixin.js'
import { requiredHelper, useVuelidate } from '@/helpers/useVuelidate.js'
import { usePagination } from '@/helpers/usePagination'
import { useLink } from 'vue-router'

export default {
  name: 'UnsettleResultHistory',
  components: {
    AppBreadcrumb,
    AppPagination,
    UnsettleResultHistoryListItem,
    UnsettleResultHistoryListSearch
  },

  emits: ['update:status'],
  async setup (props, { emit }) {
    const { setAlert } = useMixin()
    const queryStore = useQueryStore()
    const commonStore = useCommonStore()

    const { getErrorMessage, isResponseSuccess } = useErrorMessage()
    const { getThousands } = useMixin()

    const unsettleResultHistoryList = computed(() => queryStore.getUnsettleResultHistoryList || [])

    const breadCrumbs = ref([{ title: 'Logs', class: 'd-none d-sm-inline' }, { title: 'Unsettle Result History' }])

    const searchState = ref({
      dealerDomain: null,
      hallType: null,
      gameType: null,
      tableID: null,      
      shoeNo: null,
      roundNo: null
    })

    const callback = ref(null)
    const changedTable = ref(null)

    const isSearchActive = ref(true)
    const setIsSearchActive = (active) => {
      isSearchActive.value = active
    }

    const isModalActive = ref(false)
    const setIsModalActive = (active) => {
      isModalActive.value = active
    }

    // 分頁資訊
    const { pageInfo, resetPagination, updatePaginationFromResponse } = usePagination(50)

    const isEdit = ref(false)
    const state = ref({
      ...props
    })

    const setIsEdit = (edit) => {
      if (edit) {
        resetState()
      }
      isEdit.value = edit
    }

    const rules = {
      
    }

    const onResetList = () => {
      // 清空列表資料
      queryStore.unsettleResultHistoryList = []
      resetPagination()
    }  

    // 新增：頁面離開時清除資料
    const onPageLeave = () => {
      // 清空列表資料
      queryStore.unsettleResultHistoryList = []
      // 重置分頁資訊
      resetPagination()
      // 重置搜尋狀態
      searchState.value = {
        dealerDomain: commonStore.getDealerDomainList[0] || null,
        hallType: null,
        gameType: null,
        tableID: null,
        shoeNo: null,
        roundNo: null
      }
    }

    // 監聽頁面離開事件
    onBeforeUnmount(() => {
      onPageLeave()
    })    
    
    const resultDetailFieldMap = {
      Baccarat: ['Player', 'Banker'],
      DragonTiger: ['Dragon', 'Tiger'],
      Sicbo: ['WithRandomPay'],
      ExtraSicbo: ['WithRandomPay'],
      ThaiHiLo: ['WithRandomPay'],
      ThaiFishPrawnCrab: ['WithRandomPay'],
      Sedie: ['WithRandomPay'],
      'Teenpatti 20-20': ['PlayerA', 'PlayerB'],
      RBSicbo: ['Red', 'Blue'],
      ExtraAndarBahar: ['MaindCard', 'AndarCards', 'BaharCards', 'TotalCardCount', 'WithRandomPay'],
      PokDeng: ['PlayerA', 'PlayerB', 'PlayerC', 'Banker']
    }  
    
    const allResultDetailFields = computed(() => {
      // 取得目前頁面所有出現過的 gameType
      const types = new Set(unsettleResultHistoryList.value.map(item => item.gameType))
      // 合併所有遊戲的欄位
      const fields = []
      types.forEach(type => {
        const arr = resultDetailFieldMap[type] || []
        arr.forEach(f => { if (!fields.includes(f)) fields.push(f) })
      })
      return fields
    })    

    const v$ = useVuelidate(rules, state)

    const readDealerDomainList = async () => {
      const response = await commonStore.readDealerDomainList({})
      return response
    }

    const readGameList = async () => {
      try {
        const response = await commonStore.readGameList({})

        // getErrorMessage
        if (!isResponseSuccess(response)) {
          setAlert(true, false, getErrorMessage(response))
        }
        return response
      } catch (error) {
        return Promise.reject(error)
      }
    }    

    const readHallList = async () => {
      try {
        const response = await commonStore.readHallList({})

        // getErrorMessage
        if (!isResponseSuccess(response)) {
          setAlert(true, false, getErrorMessage(response))
        }
        return response
      } catch (error) {
        return Promise.reject(error)
      }
    }

    const readTableIDList = async () => {
      try {
        const response = await commonStore.readTableIDList({
          dealerDomain: searchState.value.dealerDomain,
          hallType: searchState.value.hallType
        })

        // getErrorMessage
        if (!isResponseSuccess(response)) {
          setAlert(true, false, getErrorMessage(response))
        }
        return response
      } catch (error) {
        return Promise.reject(error)
      }
    }    

    const readUnsettleResultHistoryList = async (newPage, isSearch = false) => {
      setIsSearchActive(true)
      if (isSearch) {
        pageInfo.value.page = 1
      } else if (newPage) {
        pageInfo.value.page = newPage
      }

      // 組成 payload，分頁資訊包在 pageInfo
      const payload = {
        pageInfo: {
          page: pageInfo.value.page,
          perPage: pageInfo.value.perPage,
          total: pageInfo.value.total,
          totalPage: pageInfo.value.totalPage
        }
      }
      // 加入搜尋條件
      for (const [key, value] of Object.entries(searchState.value)) {
        if (value || value === 0 || value != null) {
          payload[key] = value
        }
      }

      try {
        const response = await queryStore.readUnsettleResultHistoryList(payload)
        
        // getErrorMessage
        if (!isResponseSuccess(response)) {
          setAlert(true, false, getErrorMessage(response))
        }

        const responsePage = response?.data?.pageInfo || {}
        updatePaginationFromResponse(responsePage)
        return response
      } catch (error) {
        resetPagination()
        return Promise.reject(error)
      }
    }

    // 分頁切換
    const onSetPage = (newPage) => {
      readUnsettleResultHistoryList(newPage)
    }    

    provide('readUnsettleResultHistoryList', readUnsettleResultHistoryList)
    provide('isSearchActive', isSearchActive)

    // 先取得選單資料
    await readDealerDomainList()
    await readHallList()
    await readGameList()

    // 設定預設值
    if (commonStore.getDealerDomainList.length > 0) {
      searchState.value.dealerDomain = commonStore.getDealerDomainList[0]
    }
    // if (commonStore.getHallList.length > 0) {
    //   searchState.value.hallType = commonStore.getHallList[0]
    // }
    

    // 再查詢主資料
    // await readUnsettleResultHistoryList()

    return {
      breadCrumbs,
      callback,
      changedTable,
      unsettleResultHistoryList,
      pageInfo,
      isSearchActive,
      setIsSearchActive,
      isModalActive,
      setIsModalActive,
      isEdit,
      setIsEdit,
      searchState,
      getThousands,
      v$,
      readDealerDomainList,
      readGameList,
      readHallList,
      readTableIDList,
      readUnsettleResultHistoryList,
      onSetPage,
      onResetList,
      resultDetailFieldMap,
      allResultDetailFields
    }
  }
}
</script>
<style lang="scss" module>

.number {
  width: 50px;
}

.buttons {
  width: 140px;
}

.mw15 {
  max-width: 15vw;
}

</style>
