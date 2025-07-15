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
                        Select Hall Type
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
                  <small
                    class="text-danger position-absolute end-0 error-text"
                    :class="[{'show': v$[field]?.$error}]"
                  >{{ v$[field]?.$errors[0]?.$message || '' }}</small>
                </div>
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
                        Select Game Type
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
                        Select Table ID (Select Hall Type First)
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
                        
              <!-- 一般 input -->
              <div v-else>
                <div class="col-12 position-relative">
                  <input
                    v-if="field === 'shoeNo' || field === 'roundNo'"
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
            :disabled="v$.$invalid"
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
import AppInput from '@/components/AppInput'

export default {
  name: 'UnsettleResultHistoryListSearch',
  components: {
    AppInput
  },
  props: {
    searchState: {
      type: Object,
      default: () => {}
    }
  },
  emits: ['update:searchState', 'setSearchState', 'resetList'],
  setup (props, { emit }) {

    const commonStore = useCommonStore()
    
    const dealerDomainList = computed(() => commonStore.getDealerDomainList)
    const hallList = computed(() => commonStore.getHallList)
    const gameList = computed(() => commonStore.getGameList)
    const tableIDList = computed(() => commonStore.getTableIDList)

    const isSearchActive = inject('isSearchActive')

    const state = ref({
      dealerDomain: props.searchState.dealerDomain ?? null,
      hallType: props.searchState.hallType ?? null,
      gameType: props.searchState.gameType ?? null,
      tableID: props.searchState.tableID ?? null,      
      shoeNo: props.searchState.shoeNo ?? null,
      roundNo: props.searchState.roundNo ?? null
    })

    watch(
      () => [state.value.dealerDomain, state.value.hallType],
      async ([dealerDomain, hallType]) => {
        if (dealerDomain && hallType) {
          await commonStore.readTableIDList({ dealerDomain, hallType })
          // 只在 tableID 不在新清單時才清空
          if (!commonStore.getTableIDList.includes(state.value.tableID)) {
            state.value.tableID = null
          }
        } else {
          commonStore.tableIDList = []
          state.value.tableID = null
        }
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
      'shoeNo',
      'roundNo'
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
      shoeNo: {
        label: 'Game Shoe',
        placeholder: 'Enter Game Shoe'
      },
      roundNo: {
        label: 'Game Round',
        placeholder: 'Enter Game Round'
      }
    }

    const resetState = () => {
      state.value.dealerDomain = dealerDomainList.value[0] || null
      state.value.hallType = null
      state.value.gameType = null
      state.value.tableID = null      
      state.value.shoeNo = null
      state.value.roundNo = null
      emit('update:searchState', JSON.parse(JSON.stringify(state.value)))
      emit('resetList')       
    }

    const updateSearchState = () => {
      const params = {
        dealerDomain: state.value.dealerDomain,
        hallType: state.value.hallType,
        gameType: state.value.gameType,
        tableID: state.value.tableID,
        shoeNo: state.value.shoeNo
      }
      if (state.value.roundNo) {
        params.roundNo = state.value.roundNo
      }
      emit('update:searchState', params)
      emit('setSearchState', true)
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
      shoeNo: {
        input: 'input'
      },
      roundNo: {
        input: 'input'
      }
    }

    const styleMap = {
      dealerDomain: 'col-12 col-sm-6 col-md-6',
      hallType: 'col-12 col-sm-6 col-md-6',
      gameType: 'col-12 col-sm-6 col-md-6',
      tableID: 'col-12 col-sm-6 col-md-6',      
      shoeNo: 'col-12 col-sm-6 col-md-6',
      roundNo: 'col-12 col-sm-6 col-md-6'
    }

    const rules = {
      dealerDomain: { requiredHelper },
      hallType: { requiredHelper },
      gameType: { requiredHelper },
      tableID: { requiredHelper },
      shoeNo: { requiredHelper, numericHelper },
      roundNo: { requiredHelper, numericHelper}
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
      tableIDList
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
