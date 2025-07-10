<template>
  <div>
    <AppBreadcrumb :bread-crumbs="breadCrumbs" />
    <div class="d-flex align-items-center justify-content-between mb-3">
      <h3>使用者列表</h3>
      <router-link
        class="btn btn-primary d-flex align-items-center"
        type="button"
        to="/user-create"
      >
        <AppIcon
          name="plus"
          class="icon-sm me-2"
        />
        新增使用者
      </router-link>
    </div>
    <table class="table table-hover rounded-3 overflow-hidden">
      <thead class="table-primary-light">
        <tr>
          <th
            class="text-center"
            :class="$style.number"
          >
            編號
          </th>
          <th>帳號</th>
          <th>名稱</th>
          <th>E-mail</th>
          <th :class="$style[`auth`]">
            權限
          </th>
          <th
            class="text-center"
            :class="$style[`status`]"
          >
            狀態
          </th>
          <th
            class="text-center"
            :class="$style.buttons"
          >
            管理
          </th>
        </tr>
      </thead>
      <tbody class="border-top">
        <UserListItem
          v-for="(item, index) in users"
          :key="item.groupID"
          :item="item"
          :item-index="page.offset + index + 1"
        />
      </tbody>
    </table>

    <div class="d-flex align-items-center justify-content-between">
      <span class="small pr-2">
        {{ page.offset }} -
        {{ page.current * page.pageSize }} 筆資料 / 共
        {{ page.totalPage }} 頁</span>

      <!-- page nav -->
      <AppPagination
        :current-page="page?.current"
        :total-page="page?.totalPage"
        @setPage="readUsers"
      />
    </div>
  </div>
</template>
<script>
import { useMixin } from '@/helpers/useMixin'
import { computed, provide, ref } from 'vue'
import { useStore } from 'vuex'
import AppBreadcrumb from '@/components/AppBreadcrumb.vue'
import AppPagination from '@/components/AppPagination'
import UserListItem from '@/components/UserListItem'
import { useErrorMessage } from '@/helpers/useApiMessage.js'

export default {
  name: 'UserList',
  components: {
    AppBreadcrumb,
    AppPagination,
    UserListItem
  },
  async setup () {
    const { setAlert } = useMixin()
    const { getters, dispatch } = useStore()
    const { getErrorMessage, isResponseSuccess } = useErrorMessage()

    const users = computed(() => getters['user/getUsers'])

    const breadCrumbs = ref([{ title: '用戶管理' }, { title: '使用者列表' }])

    const page = ref({
      current: 1,
      offset: 0,
      pageSize: 20,
      pageElement: 0,
      totalPage: 0
    })

    const readGroups = async () => {
      const payload = {
        offset: 0,
        pageSize: 100
      }

      try {
        const response = await dispatch('user/readGroups', { payload })

        // getErrorMessage
        if (!isResponseSuccess(response)) {
          setAlert(true, false, getErrorMessage(response))
        }
        return response
      } catch (error) {
        return Promise.reject(error)
      }
    }

    const readUsers = async (newPage) => {
      if (newPage) {
        page.value.current = newPage
      }
      const payload = {
        offset: page.value.pageSize * (page.value.current - 1),
        pageSize: page.value.pageSize
      }

      try {
        const response = await dispatch('user/readUsers', { payload })
        const responseData = response?.data?.data || {}
        const responsePage = responseData?.page || {}

        page.value.offset = responsePage.offset || 0
        page.value.totalPage = responsePage.totalPage || 0
        page.value.totalElement = responsePage.totalElement || 0
        return response
      } catch (error) {
        page.value.offset = 0
        page.value.totalPage = 0
        page.value.totalElement = 0
        return Promise.reject(error)
      }
    }
    provide('readUsers', readUsers)

    await Promise.all([readUsers(), readGroups()])

    return {
      breadCrumbs,
      users,
      page,
      readUsers
    }
  }
}
</script>
<style lang="scss" module>
.number {
  width: 50px;
}

.status {
  width: 100px;
}

.auth {
  width: 180px;
}

.buttons {
  width: 140px;
}

</style>
