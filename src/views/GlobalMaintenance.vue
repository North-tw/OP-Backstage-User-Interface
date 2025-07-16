<template>
  <div>
    <AppBreadcrumb :bread-crumbs="breadCrumbs" />
    <div class="d-flex align-items-center justify-content-between mb-3">
      <h3>Global Maintenance</h3>
    </div>

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
          <th
            class="text-center small"
          >
            Update Time
          </th>        
          <th
            class="text-center small"
          >
            Update ID
          </th>                     
          <th
            class="text-center small"
          >
            Update Name
          </th>            
          <th
            class="text-center small"
            :class="$style.status"
          >
            Status
          </th>
          <th
            class="text-center small"
            :class="$style.buttons"
          >
            Maintenance
          </th>
        </tr>
      </thead>
      <tbody class="border-top">
        <GlobalMaintenanceListItem
          v-for="(item, index) in globalMaintenanceList"
          :key="item.ID"
          :id="item.ID"
          :dealer-domain="item.DealerDomain"
          :hall-type="item.HallType"
          :update-time="item.UpdateTime"
          :update-i-d="item.UpdateByMemberID"
          :update-name="item.UpdateByMemberName"
          :status="item.GameTableStatus"
          :item-index="(pageInfo.page - 1) * pageInfo.perPage + index + 1"
        />
        <tr v-if="!globalMaintenanceList.length">
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
import { useGlobalStore } from '@/stores/global'
import AppBreadcrumb from '@/components/AppBreadcrumb.vue'
import AppPagination from '@/components/AppPagination'
import GlobalMaintenanceListItem from '@/components/GlobalMaintenanceListItem'
import { useErrorMessage } from '@/helpers/useApiMessage.js'
import { useMixin } from '@/helpers/useMixin.js'
import { requiredHelper, useVuelidate } from '@/helpers/useVuelidate.js'
import { usePagination } from '@/helpers/usePagination'

export default {
  name: 'GlobalMaintenance',
  components: {
    AppBreadcrumb,
    AppPagination,
    GlobalMaintenanceListItem
  },

  emits: ['update:status'],
  async setup (props, { emit }) {
    const { setAlert } = useMixin()
    const globalStore = useGlobalStore()

    const { getErrorMessage, isResponseSuccess } = useErrorMessage()
    const { getThousands } = useMixin()

    const globalMaintenanceList = computed(() => globalStore.getGlobalList || [])

    const breadCrumbs = ref([{ title: 'System', class: 'd-none d-sm-inline' }, { title: 'Global Maintenance' }])

    const searchState = ref({
      dealerDomain: null,
      hallType: null,
      gameType: null,
      tableID: null
    })

    const callback = ref(null)

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

    const readGlobalList = async (newPage, isSearch = false) => {
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

      try {
        const response = await globalStore.readGlobalList(payload)
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

    // 處理狀態更新
    const onStatusUpdate = (updateData) => {
      // 在 store 中更新對應的項目
      const list = globalStore.globalList
      const index = list.findIndex(item => item.ID === updateData.id)
      if (index !== -1) {
        list[index].GameTableStatus = updateData.status
        list[index].UpdateTime = updateData.updateTime
        // 觸發響應式更新
        globalStore.globalList = [...list]
      }
    }    

    // 分頁切換
    const onSetPage = (newPage) => {
      readGlobalList(newPage)
    }    

    provide('readGlobalList', readGlobalList)
    provide('isSearchActive', isSearchActive)

    // 再查詢主資料
    await readGlobalList()

    return {
      breadCrumbs,
      callback,
      globalMaintenanceList,
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
      readGlobalList,
      onSetPage,
      onStatusUpdate
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
