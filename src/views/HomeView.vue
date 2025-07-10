<template>
  <!-- <div class="container-fluid">
    <div class="row g-2">
      <div
        v-for="(key,index) in dashboardDataList"
        :key="key"
        class="col-12 col-sm-6 col-md-3"
      >
        <router-link
          :to="{name: dashboardDataMap[key].routeName}"
          class="d-block h-100 text-decoration-none rounded-2 p-3"
          :class="[[dashboardDataMap[key].isInfo ? $style.dataOutlineBlock : $style.dataFillBlock], {[$style.odd]: index % 2 === 0}]"
        >
          <h5>{{ dashboardDataMap[key].text }}</h5>
          <span class="display-2">{{ getThousands(dashboardData[key] || 0) }}</span>
        </router-link>
      </div>
    </div>
  </div> -->
  <div class="d-flex flex-column align-items-center justify-content-center my-5">
    <h5 class="display-4 fw-normal mb-3">
      Welcome
    </h5>
    <p>
      You are now at OP backstage！
    </p>
  </div>
</template>
<script>
import { useDashboardStore } from '@/stores/dashboard'
import { useErrorMessage } from '@/helpers/useApiMessage.js'
import { computed, ref } from 'vue-demi'
import { useMixin } from '@/helpers/useMixin'

export default {
  name: 'HomeView',
  async setup () {
    const dashboardStore = useDashboardStore()
    const { getErrorMessage, isResponseSuccess } = useErrorMessage()
    const { setAlert, getThousands } = useMixin()

    const dashboardData = computed(() => dashboardStore.getDashboardData)

    const dashboardDataList = [
      'qtyOfServers',
      'qtyOfTasks',
      'qtyOfUsers',
      'qtyOfGroups',
      'qtyOfGames',
      'qtyOfDomains',
      'qtyOfTargetServerInfos',
      'qtyOfTables'
    ]

    const dashboardDataMap = ref({
      qtyOfServers: {
        key: 'qtyOfServers',
        text: '本區域Proxy Server數量',
        routeName: 'ServerList',
        isInfo: false
      },
      qtyOfTasks: {
        key: 'qtyOfTasks',
        text: '排程更新中',
        routeName: 'TaskList',
        isInfo: false
      },
      qtyOfUsers: {
        key: 'qtyOfUsers',
        text: '目前使用者',
        routeName: 'UserList',
        isInfo: false
      },
      qtyOfGroups: {
        key: 'qtyOfGroups',
        text: '目前群組',
        routeName: 'GroupList',
        isInfo: false
      },
      qtyOfGames: {
        key: 'qtyOfGames',
        text: '目前遊戲種類',
        routeName: 'GameList',
        isInfo: true
      },
      qtyOfDomains: {
        key: 'qtyOfDomains',
        text: '目前遊戲場地',
        routeName: 'DomainList',
        isInfo: true
      },
      qtyOfTargetServerInfos: {
        key: 'qtyOfTargetServerInfos',
        text: '目前發送群組數量',
        routeName: 'TargetServerInfoList',
        isInfo: true
      },
      qtyOfTables: {
        key: 'qtyOfTables',
        text: '目前遊戲桌數量',
        routeName: 'TableList',
        isInfo: true
      }
    }
    )

    // 取得 dashboard 資料
    // const readDashboardData = async () => {
    //   try {
    //     const response = await dashboardStore.readDashboardData({})
    //     if (!isResponseSuccess(response)) {
    //       setAlert(true, false, getErrorMessage(response))
    //     }
    //     return response
    //   } catch (error) {
    //     return Promise.reject(error)
    //   }
    // }

    // await readDashboardData()

    return {
      dashboardDataMap,
      dashboardDataList,
      dashboardData,
      getThousands
    }
  }
}
</script>
<style lang="scss" module>
.dataFillBlock,
.dataOutlineBlock {
  transition: opacity 0.3s;
}

.dataFillBlock {
  color: $white;
  background: linear-gradient(155deg, #82ca9a, #249ba3);

  &.odd {
    background: linear-gradient(155deg, #249ba3, #82ca9a);
  }

  &:hover {
    color: $white;
    opacity: 0.6;
  }
}

.dataOutlineBlock {
  color: $gray-600;
  background: linear-gradient(155deg, rgba(#249ba3, 0.3), rgba(#82ca9a, 0.3));

  &.odd {
    background: linear-gradient(155deg, rgba(#82ca9a, 0.3), rgba(#249ba3, 0.3));
  }

  &:hover {
    color: $gray-600;
    opacity: 0.6;
  }
}

</style>
