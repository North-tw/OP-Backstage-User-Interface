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

  <div v-if="state.gameType && state.tableID" class="row">
    <div class="col-12">
      <div class="mb-2">Game Result</div>
    </div>

    <!-- ExtraAndarBahar 專屬排版 -->
    <template v-if="state.gameType === 'ExtraAndarBahar'">
      <!-- Main Card -->
      <div class="col-4 mb-3">
        <label class="order-first d-flex align-items-center text-gray-600 small">
          {{ labelMap.mainCard.label }}
          <span v-if="v$.mainCard?.requiredHelper" class="text-danger">*</span>：
        </label>
        <select
          v-model="state.mainCard"
          class="form-control"
          :class="{ 'is-invalid': v$.mainCard?.$error }"
          :placeholder="labelMap.mainCard.placeholder"
          @blur="v$.mainCard?.$touch()"
        >
          <option disabled>{{ labelMap.mainCard.placeholder }}</option>
          <option v-for="card in cardList" :key="card" :value="card">{{ card }}</option>
        </select>
        <div v-if="v$.mainCard?.$error" class="text-danger small text-end">
          {{ v$.mainCard.$errors[0]?.$message || 'Required' }}
        </div>
      </div>

      <!-- Andar Cards 區塊 -->
      <div class="col-12">
        <div class="mb-2">Andar Cards</div>
      </div>
      <div class="col-4 mb-3">
        <label class="order-first d-flex align-items-center text-gray-600 small">
          {{ labelMap.totalAndarCard.label }}
          <span v-if="v$.totalAndarCard?.requiredHelper" class="text-danger">*</span>：
        </label> 
        <input
          v-model="state.totalAndarCard"        
          type="number"
          min="1"
          max="25"          
          class="form-control"
          :class="{ 'is-invalid': v$.totalAndarCard?.$error }"
          :placeholder="labelMap.totalAndarCard.placeholder"
          @blur="v$.totalAndarCard?.$touch()"
        />
          <div v-if="v$.totalAndarCard?.$error" class="text-danger small text-end">
            <span class="text-danger small">{{ v$.totalAndarCard.$errors[0]?.$message || 'Required' }}</span>
          </div>
      </div>
      
      <template v-for="i in 25" :key="'andarCard'+i">
        <div class="col-1 mb-3">
          <label class="order-first d-flex align-items-center text-gray-600 small">
            {{ i }}
          <span
            v-if="state.totalAndarCard && i <= Math.min(Number(state.totalAndarCard), 25)"
            class="text-danger"
          >*</span>：
          </label>
          <select
            v-model="state[`andarCard${i}`]"
            class="form-select"
            :class="{ 'is-invalid': v$[`andarCard${i}`]?.$error }"
            :placeholder="labelMap[`andarCard${i}`].placeholder"
            @blur="v$[`andarCard${i}`]?.$touch()"
            :disabled="!state.totalAndarCard || i > Math.min(Number(state.totalAndarCard), 25)"
          >
            <option disabled>{{ labelMap[`andarCard${i}`].placeholder }}</option>
            <option v-for="card in cardList" :key="card" :value="card">{{ card }}</option>
          </select>
        </div>
      </template>


      <!-- Bahar Cards 區塊 -->
      <div class="col-12">
        <div class="mb-2">Bahar Cards</div>
      </div>
      <div class="col-4 mb-3">
        <label class="order-first d-flex align-items-center text-gray-600 small">
          {{ labelMap.totalBaharCard.label }}
          <span v-if="v$.totalBaharCard?.requiredHelper" class="text-danger">*</span>：
        </label> 
        <input
          v-model="state.totalBaharCard"
          min="1"
          max="25"          
          type="number"
          class="form-control"
          :class="{ 'is-invalid': v$.totalBaharCard?.$error }"
          :placeholder="labelMap.totalBaharCard.placeholder"
          @blur="v$.totalBaharCard?.$touch()"
        />
          <div v-if="v$.totalBaharCard?.$error" class="text-danger small text-end">
            <span class="text-danger small">{{ v$.totalBaharCard.$errors[0]?.$message || 'Required' }}</span>
          </div>
      </div>

      <template v-for="i in 25" :key="'baharCard'+i">
        <div class="col-1 mb-3">
          <label class="order-first d-flex align-items-center text-gray-600 small">
            {{ i }}
          <span
            v-if="state.totalBaharCard && i <= Math.min(Number(state.totalBaharCard), 25)"
            class="text-danger"
          >*</span>：
          </label>
          <select
            v-model="state[`baharCard${i}`]"
            class="form-select"
            :class="{ 'is-invalid': v$[`baharCard${i}`]?.$error }"
            :placeholder="labelMap[`baharCard${i}`].placeholder"
            @blur="v$[`baharCard${i}`]?.$touch()"
            :disabled="!state.totalBaharCard || i > Math.min(Number(state.totalBaharCard), 25)"          
          >
            <option disabled>{{ labelMap[`baharCard${i}`].placeholder }}</option>
            <option v-for="card in cardList" :key="card" :value="card">{{ card }}</option>
          </select>
        </div>
      </template> 

    </template>

    <!-- 其他遊戲維持原本渲染 -->
    <template v-else>
      <template v-for="field in gameFieldList" :key="field">
        <div class="col-4 mb-3">
          <label class="order-first d-flex align-items-center text-gray-600 small">
            {{ labelMap[field].label }}
            <span v-if="v$[field]?.requiredHelper" class="text-danger">*</span>：
          </label>
          <input
            v-if="field === 'totalAndarCard' || field === 'totalBaharCard'"
            v-model="state[field]"
            type="number"
            class="form-control"
            :class="{ 'is-invalid': v$[field]?.$error }"
            :placeholder="labelMap[field].placeholder"
            @blur="v$[field]?.$touch()"
          />
          <select
            v-else
            v-model="state[field]"
            class="form-select"
            :class="{ 'is-invalid': v$[field]?.$error }"
            :placeholder="labelMap[field].placeholder"
            @blur="v$[field]?.$touch()"
          >
            <option disabled>{{ labelMap[field].placeholder }}</option>
            <option v-for="card in cardList" :key="card" :value="card">{{ card }}</option>
          </select>
          <div v-if="v$[field]?.$error" class="text-danger small text-end">
            {{ v$[field].$errors[0]?.$message || 'Required' }}
          </div>
        </div>
      </template>
    </template>
  </div>

</template>
<script>
import { inject, computed } from 'vue'
import { useCommonStore } from '@/stores/common'

export default {
  name: 'AddResultComponents',
  setup() {
    const commonStore = useCommonStore()
    const dealerDomainList = computed(() => commonStore.getDealerDomainList)
    const hallList = computed(() => commonStore.getHallList)
    const gameList = computed(() => commonStore.getGameList)
    const tableIDList = computed(() => commonStore.getTableIDList)
    const cardList = computed(() => commonStore.getCardList)
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

    // 動態產生遊戲專屬欄位
    const gameFieldList = computed(() => {
      switch (state.gameType) {
        case 'Baccarat':
          return ['playerCard1', 'playerCard2', 'playerCard3', 'bankerCard1', 'bankerCard2', 'bankerCard3']
        case 'DragonTiger':
          return ['dragonCard', 'tigerCard']
        case 'Sicbo':
        case 'ExtraSicbo':
        case 'ThaiHiLo':
        case 'FishPrawnCrab':
        case 'ThaiFishPrawnCrab':
          return ['dice1', 'dice2', 'dice3']
        case 'Roulette':
        case 'ExtraRoulette':
          return ['ball']
        case 'Twenty':
          return ['playerACard1', 'playerACard2', 'playerACard3', 'playerBCard1', 'playerBCard2', 'playerBCard3']
        case 'RBSicbo':
          return ['red', 'blue']
        case 'Sedie':
          return ['playerHandValue']
        case 'PokDeng':
          return ['playerACard1', 'playerACard2', 'playerACard3', 'playerBCard1', 'playerBCard2', 'playerBCard3', 'bankerCard1', 'bankerCard2', 'bankerCard3']
        case 'ExtraAndarBahar':
          return [
            'totalAndarCard',
            'totalBaharCard',
            'mainCard',
            ...Array.from({ length: 25 }, (_, i) => `andarCard${i + 1}`),
            ...Array.from({ length: 25 }, (_, i) => `baharCard${i + 1}`)
          ]        
          default:
          return []
      }
    })    

    return {
      v$, state, labelMap,
      dealerDomainList, hallList, gameList, tableIDList, cardList,
      inputFields,
      gameFieldList
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
