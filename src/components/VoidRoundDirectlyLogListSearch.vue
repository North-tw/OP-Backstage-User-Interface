<template>
  <div>
    <div
      class="bg-gray-200 rounded-3 container-fluid mb-2"
      :class="[$style[`collapse`], {[$style[`active`]]: isSearchActive}]"
    >
      <div class="row py-3">
        <div
          v-for="field in fieldList"
          :key="field"
          class="mb-3"
          :class="styleMap?.[field] || ''"
        >
          <div>
              <label class="col-12 text-start"> {{ labelMap[field].label }}<span
                v-if="!!(v$[field]?.requiredHelper)"
                class="required"
              >*</span>：</label>

              <!-- dealerDomainSelect -->
              <div v-if="inputMap[field].input==='dealerDomainSelect'">
                <div class="col-12 position-relative">
                  <div class="d-flex flex-column">
                    <select
                      :id="field"
                      v-model="state[field]"
                      class="form-select"
                      :class="[{'border-danger': v$.county?.$error}]"
                      :placeholder="labelMap[field].placeholder"
                      @focus="v$[field].$touch"
                    >
                      <option disabled="disabled">
                        {{ labelMap[field].placeholder }}
                      </option>
                      <option
                        v-for="dealerDomain in dealerDomainList"
                        :key="dealerDomain"
                        :value="dealerDomain"
                      >
                        {{ dealerDomain }}
                      </option>
                    </select>
                  </div>
                  <small
                    class="text-danger position-absolute end-0 error-text"
                    :class="[{'show': v$[field]?.$error}]"
                  >{{ v$[field]?.$errors[0]?.$message || '' }}</small>
                </div>
              </div>
              <!-- hallTypeSelect -->
              <div v-else-if="inputMap[field].input==='hallTypeSelect'">
                <select
                  :id="field"
                  v-model="state[field]"
                  class="form-select"
                  :class="[{'border-danger': v$[field]?.$error}]"
                  :placeholder="labelMap[field].placeholder"
                  @focus="v$[field].$touch"
                >
                  <option disabled="disabled">
                    {{ labelMap[field].placeholder }}
                  </option>
                  <option :value="null">
                    All
                  </option>                  
                  <option
                    v-for="hall in hallList"
                    :key="hall"
                    :value="hall"
                  >
                    {{ hall }}
                  </option>
                </select>
              </div>  
              <!-- gameSelect -->
              <div v-else-if="inputMap[field].input==='gameSelect'">
                <div class="col-12 position-relative">
                  <div class="d-flex flex-column">
                    <select
                      :id="field"
                      v-model="state[field]"
                      class="form-select"
                      :class="[{'border-danger': v$.county?.$error}]"
                      :placeholder="labelMap[field].placeholder"
                      @focus="v$[field].$touch"
                    >
                      <option disabled="disabled">
                        {{ labelMap[field].placeholder }}
                      </option>
                      <option :value="null">
                        All Games
                      </option>                      
                      <option
                        v-for="game in gameList"
                        :key="game"
                        :value="game"
                      >
                        {{ game }}
                      </option>
                    </select>
                  </div>
                  <small
                    class="text-danger position-absolute end-0 error-text"
                    :class="[{'show': v$[field]?.$error}]"
                  >{{ v$[field]?.$errors[0]?.$message || '' }}</small>
                </div>
              </div>
              <!-- tableIDSelect -->
              <div v-else-if="inputMap[field].input==='tableIDSelect'">
                <div class="col-12 position-relative">
                  <div class="d-flex flex-column">
                    <select
                      :id="field"
                      v-model="state[field]"
                      class="form-select"
                      :class="[{'border-danger': v$.county?.$error}]"
                      :placeholder="labelMap[field].placeholder"
                      :disabled="state.hallType === null"
                      @focus="v$[field].$touch"
                    >
                      <option disabled="disabled">
                        {{ labelMap[field].placeholder }}
                      </option>
                      <option :value="null">
                        All Tables
                      </option>                       
                      <option
                        v-for="tableID in tableIDList"
                        :key="tableID"
                        :value="tableID"
                      >
                        {{ tableID }}
                      </option>
                    </select>
                  </div>
                  <small
                    class="text-danger position-absolute end-0 error-text"
                    :class="[{'show': v$[field]?.$error}]"
                  >{{ v$[field]?.$errors[0]?.$message || '' }}</small>
                </div>
              </div>              

              <FlatPickr
                v-else-if="inputMap[field].input === 'time'"
                :id="field"
                v-model="state[field]"
                :config="datePickerConfig"
                :required="true"
                :label="labelMap[field].label"
                :placeholder="labelMap[field].placeholder"
                :err-message="v$[field]?.$errors[0]?.$message || ''"
                class="form-control"
              />              
              <!-- 一般 input -->
              <div v-else>
                <input
                  v-if="field === 'shoe' || field === 'round'"
                  :id="field"
                  v-model="state[field]"
                  type="number"
                  min="0"
                  step="1"
                  class="form-control"
                  :placeholder="labelMap[field].placeholder"
                  @focus="v$[field].$touch"
                />
                <input
                  v-else
                  :id="field"
                  v-model="state[field]"
                  class="form-control"
                  :placeholder="labelMap[field].placeholder"
                  @focus="v$[field].$touch"
                />
                <small
                  class="text-danger position-absolute end-0 error-text"
                  :class="[{'show': v$[field]?.$error}]"
                >{{ v$[field]?.$errors[0]?.$message || '' }}</small>
              </div>
            
          </div>
        </div>
        <div class="col-12 d-flex">
          <button
            type="button"
            class="btn btn-outline-primary flex-grow-1 me-1"
            @click="resetState"
          >
            Reset
          </button>
          <button
            type="button"
            class="btn btn-primary flex-grow-1"
            @click="updateSearchState"
          >
            Search
          </button>
        </div>
      </div>
    </div>

    <div
      v-for="field in fieldList"
      :key="field"
      class="d-inline"
    >
      <div
        v-if="searchState[field] || searchState[field] === 0 || searchState[field] === false"
        class="d-inline-flex bg-gray-200 rounded-3 px-2 py-1 me-2 mb-2"
      >
        <span>{{ labelMap[field].label }}：</span>
        <span>{{ searchState[field] }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, computed, inject, watch } from 'vue'
import { useCommonStore } from '@/stores/common'
import { requiredHelper, numericHelper , useVuelidate } from '@/helpers/useVuelidate.js'
import FlatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import 'flatpickr/dist/themes/material_green.css'
import AppInput from '@/components/AppInput'

export default {
  name: 'VoidRoundDirectlyLogListSearch',
  components: {
    AppInput, FlatPickr
  },
  props: {
    searchState: {
      type: Object,
      default: () => {}
    }
  },
  emits: ['update:searchState', 'setSearchState'],
  setup (props, { emit }) {

    const commonStore = useCommonStore()
    
    const dealerDomainList = computed(() => commonStore.getDealerDomainList)
    const hallList = computed(() => commonStore.getHallList)
    const gameList = computed(() => commonStore.getGameList)
    const tableIDList = computed(() => commonStore.getTableIDList)

    const isSearchActive = inject('isSearchActive')

    const today = new Date()
    const halfYearAgo = new Date()
    halfYearAgo.setMonth(today.getMonth() - 6)
    const datePickerConfig = ref({
      enableTime: true,
      dateFormat: 'Y-m-d H:i:S', // 與 yyyy-MM-dd HH:mm:ss 對應
      time_24hr: true, // 使用 24 小時制
      minDate: halfYearAgo, // 今天往回半年前
      maxDate: today,       // 今天
      defaultDate: null // 初始化值
    })

    const state = ref({
      dealerDomain: props.searchState.dealerDomain ?? null,
      hallType: props.searchState.hallType ?? null,
      gameType: props.searchState.gameType ?? null,
      tableID: props.searchState.tableID ?? null,      
      shoe: props.searchState.shoe ?? null,
      round: props.searchState.round ?? null, 
      startTime: props.searchState.startTime ?? null,
      endTime: props.searchState.endTime ?? null
    })

    watch(
      () => [state.value.dealerDomain, state.value.hallType],
      async ([dealerDomain, hallType]) => {
        if (dealerDomain && hallType) {
          await commonStore.readTableIDList({ dealerDomain, hallType })
          state.value.tableID = null // 清空已選 tableID
        } else {
          commonStore.tableIDList = []
          state.value.tableID = null
        }
        // 新增：如果 hallType 為 null（All），tableID 也設為 null（All Tables）
        if (hallType === null) {
          state.value.tableID = null
        }
      },
      { immediate: true }
    )      
   
    const fieldList = [
      'dealerDomain',
      'hallType',
      'gameType',
      'tableID',      
      'shoe',
      'round',
      'startTime',
      'endTime'
    ]

    const labelMap = {
      dealerDomain: {
        label: 'Dealer Domain',
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
        placeholder: 'Enter Game Shoe'
      },
      round: {
        label: 'Game Round',
        placeholder: 'Enter Game Round'
      },
      startTime: {
        label: 'Start Time',
        placeholder: 'Select Start Time'
      },
      endTime: {
        label: 'End Time',
        placeholder: 'Select End Time'
      }
    }

    const resetState = () => {
      state.value.dealerDomain = dealerDomainList.value[0] || null
      state.value.hallType = null
      state.value.gameType = null
      state.value.tableID = null      
      state.value.shoe = null
      state.value.round = null
      state.value.startTime = null
      state.value.endTime = null
    }

    const updateSearchState = () => {
      emit('update:searchState', JSON.parse(JSON.stringify(state.value)))
      emit('setSearchState', true) // 傳遞 isSearch = true
    }

    const inputMap = {
      dealerDomain: {
        input: 'dealerDomainSelect'
      },
      hallType: {
        input: 'hallTypeSelect'
      },
      gameType: {
        input: 'gameSelect'
      },
      tableID: {
        input: 'tableIDSelect'
      },       
      shoe: {
        input: 'input'
      },
      round: {
        input: 'input'
      },
      startTime: {
        input: 'time'
      },
      endTime: {
        input: 'time'
      }
    }

    const styleMap = {
      dealerDomain: 'col-12 col-sm-6 col-md-6',
      hallType: 'col-12 col-sm-6 col-md-6',
      gameType: 'col-12 col-sm-6 col-md-6',
      tableID: 'col-12 col-sm-6 col-md-6',      
      shoe: 'col-12 col-sm-6 col-md-6',
      round: 'col-12 col-sm-6 col-md-6',
      startTime: 'col-12 col-sm-6 col-md-6',
      endTime: 'col-12 col-sm-6 col-md-6'
    }

    const rules = {
      dealerDomain: { requiredHelper },
      hallType: {},
      gameType: {},
      tableID: {},
      shoe: { numericHelper },
      round: { numericHelper},
      startTime: {},
      endTime: {}
    }

    const v$ = useVuelidate(rules, state)

    return {
      v$,
      state,
      labelMap,
      inputMap,
      styleMap,
      fieldList,
      resetState,
      updateSearchState,
      isSearchActive,
      dealerDomainList,
      hallList,
      gameList,
      tableIDList,      
      datePickerConfig
    }
  }
}
</script>
<style lang="scss" module>

.collapse{
  max-height: 0;
  transition: max-height .3s;
  overflow: hidden;
}

.collapse.active{
  max-height: 100vh;
  overflow: visible;
}

</style>
