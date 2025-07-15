<template>
  <div>
    <AppBreadcrumb :bread-crumbs="breadCrumbs" />
    <div class="d-flex align-items-center justify-content-between mb-3">
      <h3>Result Video Link</h3>
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
    <ResultVideoLinkListSearch
      v-model:searchState="searchState"
      @setSearchState="(isSearch) => readResultVideoLinkList(null, isSearch)"
      @resetList="onResetList"
    />

    <table class="table table-hover rounded-3 overflow-hidden">
      <thead class="table-primary-light">
        <tr class="align-middle">
          <th
            class="text-center small"
          >
            Dealer Domain
          </th>
          <th
            class="text-center small"
          >
            Hall Type
          </th>
          <th class="text-center small">
            Game Type
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
            Date
          </th>
          <th class="text-center small">
            Link
          </th>         
        </tr>
      </thead>
      <tbody class="border-top">
        <ResultVideoLinkListItem
          v-if="resultVideoLinkObject && resultVideoLinkObject.linkList"
          :dealer-domain="resultVideoLinkObject.dealerDomain"
          :hall-type="resultVideoLinkObject.hallType"
          :game-type="resultVideoLinkObject.gameType"
          :table-i-d="resultVideoLinkObject.tableID"
          :shoe="resultVideoLinkObject.shoeNo"
          :round="resultVideoLinkObject.roundNo"
          :date-time="resultVideoLinkObject.dateTime"
          :link-list="resultVideoLinkObject.linkList"
          :item-index="1"
        />
        <tr v-else>
          <td colspan="9" class="text-center text-secondary">
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
import ResultVideoLinkListItem from '@/components/ResultVideoLinkListItem'
import ResultVideoLinkListSearch from '@/components/ResultVideoLinkListSearch'
import { useErrorMessage } from '@/helpers/useApiMessage.js'
import { useMixin } from '@/helpers/useMixin.js'
import { requiredHelper, useVuelidate } from '@/helpers/useVuelidate.js'
import { usePagination } from '@/helpers/usePagination'

export default {
  name: 'ResultVideoLink',
  components: {
    AppBreadcrumb,
    AppPagination,
    ResultVideoLinkListItem,
    ResultVideoLinkListSearch
  },

  emits: ['update:status'],
  async setup (props, { emit }) {
    const { setAlert } = useMixin()
    const queryStore = useQueryStore()
    const commonStore = useCommonStore()

    const { getErrorMessage, isResponseSuccess } = useErrorMessage()
    const { getThousands } = useMixin()

    const resultVideoLinkObject = computed(() => queryStore.resultVideoLinkObject || {})

    // 新增：包成陣列
    const resultVideoLinkList = computed(() => {
      if (Array.isArray(resultVideoLinkObject.value.linkList)) {
        // 每個 link 都包成一個物件，帶上其他 payload 屬性
        return resultVideoLinkObject.value.linkList.map((link, idx) => ({
          ...resultVideoLinkObject.value,
          link, // 單一影片連結
          linkIndex: idx + 1
        }))
      }
      return []
    }) 

    const breadCrumbs = ref([{ title: 'Logs', class: 'd-none d-sm-inline' }, { title: 'Result Video Link' }])

    const searchState = ref({
      dealerDomain: null,
      hallType: null,
      gameType: null,
      tableID: null,      
      shoeNo: null,
      roundNo: null, 
      dateTime: null
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
      queryStore.resultVideoLinkObject = {}
      // 如果有 resultVideoLinkList 這種 computed 也會自動變空
      // 也可以重設分頁
      resetPagination()
    }    

    // 新增：頁面離開時清除資料
    const onPageLeave = () => {
      // 清空列表資料
      queryStore.resultVideoLinkObject = {}
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

    const readResultVideoLinkList = async (newPage, isSearch = false) => {
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
        const response = await queryStore.readResultVideoLinkList(payload)
        // getErrorMessage
        if (!isResponseSuccess(response)) {
          setAlert(true, false, getErrorMessage(response))
        }

        const responsePage = {
          page: 1,
          perPage: pageInfo.value.perPage, // 或你要的數字
          total: 1,
          totalPage: 1
        }        
        updatePaginationFromResponse(responsePage)
        return response
      } catch (error) {
        resetPagination()
        return Promise.reject(error)
      }
    }

    // 分頁切換
    const onSetPage = (newPage) => {
      readResultVideoLinkList(newPage)
    }    

    provide('readResultVideoLinkList', readResultVideoLinkList)
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
    

    return {
      breadCrumbs,
      callback,
      changedTable,
      resultVideoLinkObject,
      resultVideoLinkList,
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
      readResultVideoLinkList,
      onSetPage,
      onResetList
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
