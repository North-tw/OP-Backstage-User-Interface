<template>
  <tr class="align-middle">
    <td
      v-for="field in fieldList"
      :key="field"
      class="py-3 small text-center"
      :class="field === 'status'
        ? ($props[field] === 'Open'
            ? 'text-success'
            : $props[field] === 'Close'
              ? 'text-danger'
              : '') 
        : ''"      
    >
      {{ field === 'updateTime' ? $formatDateTime($props[field]) : $props[field] }}
    </td>

    <td>
      <div class="d-flex justify-content-center">
        <!-- 維護按鈕 -->
        <button
          type="button"
          class="btn"
          :class="status === 'Open' ? 'btn-outline-danger' : 'btn-outline-success'"
          @click="switchTableStatusCheck"
        >
          {{ status === 'Open' ? 'Close' : 'Open' }}
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
        {{ status === 'Open' ? 'This table is currently Open.' : 'This table is currently Closed.' }}
      </h5>
    </template>
    <template #body>
      <div class="d-flex flex-column align-items-center">
        <h6 class="mb-4">
          You are about to change the status to
          <span :class="status === 'Open' ? 'text-danger' : 'text-success'">
            {{ status === 'Open' ? 'Close' : 'Open' }}
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
import { computed, provide, ref, inject } from 'vue'
import { useTableStore } from '@/stores/table'
import AppInput from '@/components/AppInput.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'
import { requiredHelper, numericHelper, useVuelidate } from '@/helpers/useVuelidate.js'
import { useErrorMessage } from '@/helpers/useApiMessage.js'
import { useMixin } from '@/helpers/useMixin.js'

export default {
  name: 'TableConditionListItem',
  components: {
    AppInput, ConfirmModal
  },
  props: {
    dealerDomain: {
      type: String,
      default: ''
    },
    hallType: {
      type: String,
      default: ''
    },
    gameType: {
      type: String,
      default: ''
    },
    tableID: {
      type: [String, Number],
      default: ''
    },
    shoe: {
      type: Number,
      default: 0
    },
    round: {
      type: Number,
      default: 0 
    },
    updateTime: {
      type: String,
      default: ''
    },
    updateID: {
      type: Number,
      default: 0
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
    const tableStore = useTableStore()

    const readTableConditionList = inject('readTableConditionList')

    const domainList = computed(() => tableStore.getDomainList)
    const gameList = computed(() => tableStore.getGameList)

    const callback = ref('')

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
      'gameType', 
      'tableID', 
      'shoe', 
      'round', 
      'updateTime', 
      'updateID', 
      'updateName',
      'status'
    ]

    const state = ref({
      ...props
    })

    const labelMap = {

    }

    const rules = {

    }

    const v$ = useVuelidate(rules, state)

    const switchTableStatusCheck = () => {
      callback.value = async () => {
        await switchTableStatus()
      }

      setIsSwitchModalActive(true)
    }

    const switchTableStatus = async () => {
      v$.value.$touch()
      if (state.value.tableID != null && state.value.tableID !== '') {
        const payload = {
          tableID: state.value.tableID,
          dealerDomain: state.value.dealerDomain,
          hallType: state.value.hallType,
          status: state.value.status
        }

        try {
          const response = await tableStore.switchTableStatus(payload)
          readTableConditionList()

          // getErrorMessage
          if (isResponseSuccess(response)) {
            setAlert(true, true, getSuccessMessage(response))
          } else {
            setAlert(true, false, getErrorMessage(response))
          }

          return response
        } catch (error) {
          setAlert(true, false, `Change Failed: ${error}`)
          readTableConditionList()
          return Promise.reject(error)
        }
      }
    }

    provide('readTableConditionList', readTableConditionList)
    provide('isModalActive', isModalActive)
    provide('setIsModalActive', setIsModalActive)
 

    return {
      v$,
      state,
      labelMap,
      fieldList,
      domainList,
      gameList,
      callback,
      isSwitchModalActive,
      setIsSwitchModalActive,
      isModalActive,
      setIsModalActive,
      switchTableStatusCheck,
      switchTableStatus,
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
