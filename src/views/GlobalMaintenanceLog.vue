<template>
  <div>
    <AppBreadcrumb :bread-crumbs="breadCrumbs" />
    <div class="d-flex align-items-center justify-content-between mb-3">
      <h3>Global Maintenance Log</h3>
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
    <GlobalMaintenanceLogListSearch
      v-model:searchState="searchState"
      @setSearchState="(isSearch) => readGlobalLogList(null, isSearch)"
    />

    <table class="table table-hover rounded-3 overflow-hidden">
      <thead class="table-primary-light">
        <tr class="align-middle">
          <th
            class="text-center small"
          >
            Log ID
          </th>          
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
            Update Time
          </th>
          <th class="text-center small">
            Update ID
          </th>
          <th class="text-center small">
            Update Name
          </th>          
          <th
            class="text-center small"
            :class="$style.status"
          >
            Status Change
          </th>
        </tr>
      </thead>
      <tbody class="border-top">
        <GlobalMaintenanceLogListItem
          v-for="(item, index) in globalLogList"
          :key="item.id"
          :log-i-d="item.id"
          :dealer-domain="item.dealerDomain"
          :hall-type="item.hallType"
          :status="item.gameTableStatusID"
          :update-time="item.updateTime"
          :update-i-d="item.updateByMemberID"
          :update-name="item.updateByMemberName"
          :item-index="(pageInfo.page - 1) * pageInfo.perPage + index + 1"
        />
        <tr v-if="!globalLogList.length">
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
import { computed, provide, ref } from 'vue'
import { useLogStore } from '@/stores/log'
import { useCommonStore } from '@/stores/common'
import AppBreadcrumb from '@/components/AppBreadcrumb.vue'
import AppPagination from '@/components/AppPagination'
import GlobalMaintenanceLogListItem from '@/components/GlobalMaintenanceLogListItem'
import GlobalMaintenanceLogListSearch from '@/components/GlobalMaintenanceLogListSearch'
import { useErrorMessage } from '@/helpers/useApiMessage.js'
import { useMixin } from '@/helpers/useMixin.js'
import { requiredHelper, useVuelidate } from '@/helpers/useVuelidate.js'
import { usePagination } from '@/helpers/usePagination'

export default {
  name: 'GlobalMaintenanceLog',
  components: {
    AppBreadcrumb,
    AppPagination,
    GlobalMaintenanceLogListItem,
    GlobalMaintenanceLogListSearch
  },

  emits: ['update:status'],
  async setup (props, { emit }) {
    const { setAlert } = useMixin()
    const logStore = useLogStore()
    const commonStore = useCommonStore()

    const { getErrorMessage, isResponseSuccess } = useErrorMessage()
    const { getThousands } = useMixin()

    const globalLogList = computed(() => logStore.getGlobalLogList || [])

    const breadCrumbs = ref([{ title: 'Logs', class: 'd-none d-sm-inline' }, { title: 'Global Maintenance Log' }])

    const searchState = ref({
      dealerDomain: null,
      hallType: null,
      updateID: null,
      status: null,
      startTime: null,
      endTime: null
    })

    const callback = ref(null)
    const changedTable = ref(null)

    const isSearchActive = ref(false)
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

    const v$ = useVuelidate(rules, state)

    const readDealerDomainList = async () => {
      const response = await commonStore.readDealerDomainList({})
      return response
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

    const readGlobalLogList = async (newPage, isSearch = false) => {
      setIsSearchActive(false)
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
        const response = await logStore.readGlobalLogList(payload)
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
      readGlobalLogList(newPage)
    }    

    provide('readGlobalLogList', readGlobalLogList)
    provide('isSearchActive', isSearchActive)

    // 先取得選單資料
    await readDealerDomainList()
    await readHallList()

    // 設定預設值
    if (commonStore.getDealerDomainList.length > 0) {
      searchState.value.dealerDomain = commonStore.getDealerDomainList[0]
    }

    // 再查詢主資料
    await readGlobalLogList()

    return {
      breadCrumbs,
      callback,
      changedTable,
      globalLogList,
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
      readHallList,
      readGlobalLogList,
      onSetPage
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
