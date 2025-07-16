<template>
  <tr class="align-middle">
    <td
      v-for="field in fieldList"
      :key="field"
      class="py-3 small text-center"
      :class="field === 'status'
        ? (state[field] === 'Open'
            ? 'text-success'
            : state[field] === 'Close'
              ? 'text-danger'
              : '') 
        : ''"      
    >
      {{ field === 'updateTime' ? $formatDateTime(state[field]) : state[field] }}
    </td>

    <td>
      <div class="d-flex justify-content-center">
        <!-- 維護按鈕 -->
        <button
          type="button"
          class="btn"
          :class="state.status === 'Open' ? 'btn-outline-danger' : 'btn-outline-success'"
          :disabled="isLoading"
          @click="switchTableStatusCheck"
        >
          <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status"></span>
          {{ state.status === 'Open' ? 'Close' : 'Open' }}
        </button>
      </div>
    </td>
  </tr>

  <!-- Switch Status Modal -->
  <ConfirmModal
    v-if="isSwitchModalActive"
    :callback="callback"
    :set-is-modal-active="setIsSwitchModalActive"
  >
    <template #header>
      <h5 class="col-12 font-weight-bold text-center p-3">
        {{ state.status === 'Open' ? 'This site is currently Open.' : 'This site is currently Closed.' }}
      </h5>
    </template>
    <template #body>
      <div class="d-flex flex-column align-items-center">
        <h6 class="mb-4">
          You are about to change the status to
          <span :class="state.status === 'Open' ? 'text-danger' : 'text-success'">
            {{ state.status === 'Open' ? 'Close' : 'Open' }}
          </span>.
        </h6>
        <h6 class="mb-4 text-danger">
          Are you sure you want to proceed?
        </h6>
      </div>
    </template>
  </ConfirmModal>
</template>

<script>
import { computed, provide, ref, inject, watch } from 'vue'
import { useGlobalStore } from '@/stores/global'
import AppInput from '@/components/AppInput.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'
import { requiredHelper, numericHelper, useVuelidate } from '@/helpers/useVuelidate.js'
import { useErrorMessage } from '@/helpers/useApiMessage.js'
import { useMixin } from '@/helpers/useMixin.js'

export default {
  name: 'GlobalMaintenanceListItem',
  components: {
    AppInput, ConfirmModal
  },
  props: {
    id: {
      type: [String, Number],
      default: null
    },    
    dealerDomain: {
      type: String,
      default: ''
    },
    hallType: {
      type: String,
      default: ''
    },
    updateTime: {
      type: String,
      default: ''
    },
    updateID: {
      type: [String, Number],
      default: ['', 0]
    },
    updateName: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      default: ''
    }, 
    itemIndex: {
      type: Number,
      default: 1
    }
  },
  emits: [
    'update:status'
  ],
  async setup (props, { emit }) {
    const { setAlert } = useMixin()
    const { getErrorMessage, isResponseSuccess, getSuccessMessage } = useErrorMessage()
    const globalStore = useGlobalStore()

    const readGlobalList = inject('readGlobalList')

    const callback = ref('')
    const isLoading = ref(false)

    const isSwitchModalActive = ref(false)
    const setIsSwitchModalActive = (active) => {
      isSwitchModalActive.value = active
    }

    const isModalActive = ref(false)
    const setIsModalActive = (active) => {
      isModalActive.value = active
    }

    const fieldList = [
      'dealerDomain',
      'hallType', 
      'updateTime',
      'updateID',
      'updateName',
      'status'
    ]

    const state = ref({
      ...props
    })

    // 監聽 props 變化並同步更新 state
    watch(() => props, (newProps) => {
      state.value = { ...newProps }
    }, { deep: true })

    const labelMap = {}

    const rules = {}

    const v$ = useVuelidate(rules, state)

    const switchTableStatusCheck = () => {
      callback.value = async () => {
        await switchSiteStatus()
      }

      setIsSwitchModalActive(true)
    }

    const switchSiteStatus = async () => {
      v$.value.$touch()
      if (state.value.id && state.value.dealerDomain && state.value.hallType) {
        const newStatus = state.value.status === 'Open' ? 'Close' : 'Open'
        const payload = {
          ID: state.value.id,
          dealerDomain: state.value.dealerDomain,
          hallType: state.value.hallType,
          status: newStatus
        }

        isLoading.value = true

        try {
          const response = await globalStore.switchSiteStatus(payload)
          
          // 關閉彈跳視窗
          setIsSwitchModalActive(false)

          // 檢查回應
          if (isResponseSuccess(response)) {
            // 立即更新本地狀態
            state.value.status = newStatus
            state.value.updateTime = new Date().toISOString()
            
            // 通知父組件更新
            emit('update:status', {
              id: state.value.id,
              status: newStatus,
              updateTime: state.value.updateTime
            })

            setAlert(true, true, getSuccessMessage(response) || 'Chanege Successful')
            
            // 重新讀取列表以確保數據同步
            await readGlobalList()
          } else {
            setAlert(true, false, getErrorMessage(response))
          }

          return response
        } catch (error) {
          setAlert(true, false, `Change Failed: ${error.message || error}`)
          setIsSwitchModalActive(false)
          return Promise.reject(error)
        } finally {
          isLoading.value = false
        }
      } else {
        setAlert(true, false, 'No required paramters found：ID、Dealer Domain or Hall Type')
        setIsSwitchModalActive(false)
      }
    }

    provide('readGlobalList', readGlobalList)
    provide('isModalActive', isModalActive)
    provide('setIsModalActive', setIsModalActive)

    return {
      v$,
      state,
      labelMap,
      fieldList,
      callback,
      isLoading,
      isSwitchModalActive,
      setIsSwitchModalActive,
      isModalActive,
      setIsModalActive,
      switchTableStatusCheck,
      switchSiteStatus,
    }
  }
}
</script>

<style lang="scss" module>
.smallerInput {
  font-size: 0.875em !important;
}

.domainSelect {
  max-width: 300px;
  font-size: 0.875em !important;
}

.gameSelect {
  max-width: 350px;
  font-size: 0.875em !important;
}

.enable{
  width: 110% !important;
  font-size: 0.875em !important;
}
</style>