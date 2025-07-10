<template>
  <div>
    <AppBreadcrumb :bread-crumbs="breadCrumbs" />
    <div class="d-flex align-items-center justify-content-between mb-3">
      <h3>Void Round Directly</h3>
    </div>
    <div class="container-fluid gx-0">
      <VoidRoundDirectlyComponents />

      <div class="row">
        <div class="col-12 d-flex">
          <button
            type="button"
            class="btn btn-primary w-50 me-1"
            @click="voidRoundDirectlyCheck"
            :disabled="v$.$invalid"
          >
            Save
          </button>
          <button
            type="button"
            class="btn btn-outline-danger w-50"
            @click="resetForm"
          >
            Cancel
          </button>          
        </div>
      </div>
    </div>
  </div>

  <!-- Confirm Void Game Modal -->
  <ConfirmModal
    v-if="isSwitchModalActive"
    :callback="callback"
    :set-is-modal-active="setIsSwitchModalActive"
  >
    <template #header>
      <h5 class="col-12 font-weight-bold text-center p-3">
        This action will void the game.
      </h5>
    </template>
    <template #body>
      <div class="d-flex flex-column align-items-center">
        <h6 class="mb-4 text-danger">
          Are you sure you want to proceed?
        </h6>
      </div>
    </template>
  </ConfirmModal>

</template>
<script>
import { useMixin } from '@/helpers/useMixin'
import { provide, reactive, ref, computed, watch, onMounted } from 'vue'
import { useTableStore } from '@/stores/table'
import { useCommonStore } from '@/stores/common'
import { requiredHelper, numericHelper, useVuelidate, helpers } from '@/helpers/useVuelidate.js'
import AppBreadcrumb from '@/components/AppBreadcrumb.vue'
import { useRouter } from 'vue-router'
import { useErrorMessage } from '@/helpers/useApiMessage.js'
import VoidRoundDirectlyComponents from '../components/VoidRoundDirectlyComponents.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'

export default {
  name: 'VoidRoundDirectly',
  components: {
    VoidRoundDirectlyComponents, AppBreadcrumb, ConfirmModal
  },
  setup () {
    const { setAlert } = useMixin()
    const tableStore = useTableStore()
    const commonStore = useCommonStore()
    const { push } = useRouter()
    const { getErrorMessage, isResponseSuccess } = useErrorMessage()

    const breadCrumbs = ref([{ title: 'Result Management', class: 'd-none d-sm-inline' }, { title: 'Void Round Directly' }])

    const state = reactive({
      dealerDomain: null,
      hallType: null,
      gameType: null,
      tableID: null,
      shoe: 0,
      round: 0,
    })

    const resetForm = () => {
      // dealerDomain、hallType 選第一個
      state.dealerDomain = commonStore.getDealerDomainList[0] ?? null
      state.hallType = commonStore.getHallList[0] ?? null

      // 其餘欄位清空
      state.gameType = null
      state.tableID = null
      state.shoe = 0
      state.round = 0

      // 重設驗證狀態
      v$.value.$reset()      
    }    

    // 監聽 dealerDomain, hallType, gameType 的變化
    watch(
      () => [state.dealerDomain, state.hallType, state.gameType],
      async ([dealerDomain, hallType, gameType]) => {
        if (dealerDomain && hallType && gameType) {
          await readTableIDList()
        }
      }
    )

    const callback = ref('')

    const isSwitchModalActive = ref(false)
    const setIsSwitchModalActive = (active) => {
      isSwitchModalActive.value = active
    }    

    const voidRoundDirectlyCheck = () => {
      callback.value = async () => {
        await voidRoundDirectly()
      }

      setIsSwitchModalActive(true)
    }     

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
          dealerDomain: state.dealerDomain,
          hallType: state.hallType
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

    const labelMap = {
      dealerDomain: {
        label: 'Delaer Domain',
        placeholder: 'Select Dealer Domain'
      },
      hallType: {
        label: 'Hall Type',
        placeholder: 'Select Hall Type'
      },      
      gameType: {
        label: 'Game Type',
        placeholder: 'Select Game Type'
      },
      tableID: {
        label: 'Table ID',
        placeholder: 'Select Table ID'
      },      
      shoe: {
        label: 'Game Shoe',
        placeholder: 'Enter Shoe Number'
      },
      round: {
        label: 'Game Round',
        placeholder: 'Enter Round Number'
      }
    }

    const cardList = computed(() => commonStore.getCardList)

    const rules = computed(() => {
        return {
          dealerDomain: { requiredHelper },
          hallType: { requiredHelper },
          gameType: { requiredHelper },
          tableID: { requiredHelper },
          shoe: { numericHelper, requiredHelper },
          round: { numericHelper, requiredHelper }
        }      
    })

    const v$ = useVuelidate(rules, state)

    const voidRoundDirectly = async () => {
      v$.value.$touch()

      if (!v$.value.$error) {
        let payload = {
          dealerDomain: state.dealerDomain,
          hallType: state.hallType,
          gameType: state.gameType,
          tableID: state.tableID,
          shoe: state.shoe,
          round: state.round
        }

        console.log(payload)

        try {
          const response = await tableStore.voidRoundDirectly({ payload })

          // getErrorMessage
          if (isResponseSuccess(response)) {
            setAlert(true, true, '遊戲結果新增成功')
            resetForm()
          } else {
            setAlert(true, false, getErrorMessage(response))
          }

          return response
        } catch (error) {
          setAlert(true, false, `遊戲結果新增失敗: ${error}`)
          return Promise.reject(error)
        }
      }
    }

    provide('v$', v$)
    provide('state', state)
    provide('labelMap', labelMap)
    provide('cardList', cardList)

    // 初始化選單資料
    const initOptions = async () => {
      await readDealerDomainList()
      await readHallList()
      await readGameList()
      if (commonStore.getDealerDomainList.length > 0) {
        state.dealerDomain = commonStore.getDealerDomainList[0]
      }
      if (commonStore.getHallList.length > 0) {
        state.hallType = commonStore.getHallList[0]
      }
    }
    onMounted(() => { initOptions() })

    return {
      breadCrumbs,
      state,
      labelMap,
      v$,
      voidRoundDirectly,
      resetForm,
      callback,
      isSwitchModalActive,
      setIsSwitchModalActive,   
      voidRoundDirectlyCheck        
    }
  }
}
</script>
<style lang="scss" module>
.label {
  color: $gray-600;
  transition: opacity 0.3s;
}

.number {
  width: 50px;
}

.auth {
  width: 180px;
}

.buttons {
  width: 140px;
}

</style>
