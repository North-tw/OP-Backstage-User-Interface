<template>
  <div class="row">
    <div class="col-12">
      <div class="mb-2">
        Basic Info
      </div>
    </div>
  </div>
  <div class="row">
    <template v-for="item in inputFields" :key="item.key">
      <div class="col-4 mb-3">
        <label class="order-first d-flex align-items-center text-gray-600 small">
          {{ labelMap[item.key].label }}
          <span v-if="item.required" class="text-danger">*</span>：
        </label>
        <select
          v-if="item.type === 'select'"
          v-model="state[item.key]"
          class="form-select"
          :class="{ 'is-invalid': v$[item.key]?.$error }"
          :placeholder="labelMap[item.key].placeholder"
          @blur="v$[item.key]?.$touch()"
          :disabled="item.disabled && item.disabled()"
        >
          <option disabled>{{ labelMap[item.key].placeholder }}</option>
          <option v-for="option in item.options()" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
        <input
          v-else
          v-model="state[item.key]"
          :type="item.inputType"
          class="form-control"
          :class="{ 'is-invalid': v$[item.key]?.$error }"
          :placeholder="labelMap[item.key].placeholder"
          @blur="v$[item.key]?.$touch()"
          :disabled="item.disabled && item.disabled()"
        />
        <div v-if="v$[item.key]?.$error" class="text-danger small text-end">
          {{ v$[item.key].$errors[0]?.$message || 'Required' }}
        </div>
      </div>
    </template>
  </div>

</template>
<script>
import { inject, computed } from 'vue'
import { useCommonStore } from '@/stores/common'

export default {
  name: 'VoidRoundDirectlyComponents',
  setup() {
    const commonStore = useCommonStore()
    const dealerDomainList = computed(() => commonStore.getDealerDomainList)
    const hallList = computed(() => commonStore.getHallList)
    const gameList = computed(() => commonStore.getGameList)
    const tableIDList = computed(() => commonStore.getTableIDList)
    const v$ = inject('v$')
    const state = inject('state')
    const labelMap = inject('labelMap')

    const inputFields = [
      {
        key: 'dealerDomain',
        type: 'select',
        required: true,
        options: () => dealerDomainList.value,
        disabled: () => false
      },
      {
        key: 'hallType',
        type: 'select',
        required: true,
        options: () => hallList.value,
        disabled: () => false
      },
      {
        key: 'gameType',
        type: 'select',
        required: true,
        options: () => gameList.value,
        disabled: () => false
      },
      {
        key: 'tableID',
        type: 'select',
        required: true,
        options: () => tableIDList.value,
        disabled: () => !state.dealerDomain || !state.hallType || !state.gameType
      },
      {
        key: 'shoe',
        type: 'input',
        inputType: 'number',
        required: true,
        options: () => [],
        disabled: () => false
      },
      {
        key: 'round',
        type: 'input',
        inputType: 'number',
        required: true,
        options: () => [],
        disabled: () => false
      }
    ]  

    return {
      v$, state, labelMap,
      dealerDomainList, hallList, gameList, tableIDList,
      inputFields 
    }
  }
}
</script>
<style lang="scss" module>

.is-invalid {
  border: 1px solid red;
  border-radius: 0.25rem;
}

.form-select.is-invalid {
  background-color: #ffe5e5; /* 可選：讓背景更明顯 */
}

</style>
