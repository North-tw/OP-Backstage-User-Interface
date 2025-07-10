<template>
  <div>
    <AppBreadcrumb :bread-crumbs="breadCrumbs" />
    <div class="d-flex align-items-center justify-content-between mb-3">
      <h3>Add Result</h3>
    </div>
    <div class="container-fluid gx-0">
      <AddResultComponents />

      <div class="row">
        <div class="col-12 d-flex">
          <button
            type="button"
            class="btn btn-primary w-50 me-1"
            @click="addResult"
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
import AddResultComponents from '../components/AddResultComponents.vue'

export default {
  name: 'AddResult',
  components: {
    AddResultComponents, AppBreadcrumb
  },
  setup () {
    const { setAlert } = useMixin()
    const tableStore = useTableStore()
    const commonStore = useCommonStore()
    const { push } = useRouter()
    const { getErrorMessage, isResponseSuccess } = useErrorMessage()

    const breadCrumbs = ref([{ title: 'Result Management', class: 'd-none d-sm-inline' }, { title: 'Add Result' }])

    const state = reactive({
      dealerDomain: null,
      hallType: null,
      gameType: null,
      tableID: null,
      shoe: 0,
      round: 0,
      playerCard1: null,
      playerCard2: null,
      playerCard3: null,
      bankerCard1: null,
      bankerCard2: null,
      bankerCard3: null,
      dragonCard: null,
      tigerCard: null,
      dicd1: null,
      dice2: null,
      dice3: null,
      ball: null,
      playerACard1: null,
      playerACard2: null,
      playerACard3: null,
      playerBCard1: null,
      playerBCard2: null,
      playerBCard3: null,    
      red: null,
      blue: null,
      playerHandValue: null,    
      totalAndarCard: null,
      totalBaharCard: null,
      mainCard: null,
      // andarCard1~andarCard25
      ...Array.from({ length: 25 }, (_, i) => ({ [`andarCard${i + 1}`]: null })).reduce((a, b) => ({ ...a, ...b }), {}),
      // baharCard1~baharCard25
      ...Array.from({ length: 25 }, (_, i) => ({ [`baharCard${i + 1}`]: null })).reduce((a, b) => ({ ...a, ...b }), {}),       
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

      // 其他所有欄位都回復原狀
      state.playerCard1 = null
      state.playerCard2 = null
      state.playerCard3 = null
      state.bankerCard1 = null
      state.bankerCard2 = null
      state.bankerCard3 = null
      state.dragonCard = null
      state.tigerCard = null
      state.dice1 = null
      state.dice2 = null
      state.dice3 = null
      state.ball = null
      state.playerACard1 = null
      state.playerACard2 = null
      state.playerACard3 = null
      state.playerBCard1 = null
      state.playerBCard2 = null
      state.playerBCard3 = null
      state.red = null
      state.blue = null
      state.playerHandValue = null
      state.totalAndarCard = null
      state.totalBaharCard = null
      state.mainCard = null

      // andarCard1~25、baharCard1~25
      for (let i = 1; i <= 25; i++) {
        state[`andarCard${i}`] = null
        state[`baharCard${i}`] = null
      }
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

    // 監聽 gameType 和 tableID 的變化
    watch(
      () => [state.gameType, state.tableID],
      async ([gameType, tableID]) => {
        if (gameType && tableID) {
          await readCardList()
        }
      }
    )

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

    const readCardList = async () => {
      try {
        const response = await commonStore.readCardList({
          gameType: state.gameType
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
      },
      playerCard1: {
        label: 'P1',
        placeholder: 'Select P1 Card'
      },
      playerCard2: {
        label: 'P2',
        placeholder: 'Select P2 Card'
      },
      playerCard3: {
        label: 'P3',
        placeholder: 'Select P3 Card'
      },
      bankerCard1: {
        label: 'B1',
        placeholder: 'Select B1 Card'
      },
      bankerCard2: {
        label: 'B2',
        placeholder: 'Select B2 Card'
      },
      bankerCard3: {
        label: 'B3',
        placeholder: 'Select B3 Card'
      },
      dragonCard: {
        label: 'Dragon',
        placeholder: 'Select Dragon Card'
      },
      tigerCard: {
        label: 'Tiger',
        placeholder: 'Select Tiger Card'
      },
      dice1: {
        label: 'Dice 1',
        placeholder: 'Select Dice 1'
      },
      dice2: {
        label: 'Dice 2',
        placeholder: 'Select Dice 2'
      },
      dice3: {
        label: 'Dice 3',
        placeholder: 'Select Dice 3'
      },
      ball: {
        label: 'Ball',
        placeholder: 'Select Ball'
      },
      playerACard1: {
        label: 'Player A Card 1',
        placeholder: 'Select Player A Card 1'
      },
      playerACard2: {
        label: 'Player A Card 2',
        placeholder: 'Select Player A Card 2'
      },
      playerACard3: {
        label: 'Player A Card 3',
        placeholder: 'Select Player A Card 3'
      },
      playerBCard1: {
        label: 'Player B Card 1',
        placeholder: 'Select Player B Card 1'
      },
      playerBCard2: {
        label: 'Player B Card 2',
        placeholder: 'Select Player B Card 2'
      },
      playerBCard3: {
        label: 'Player B Card 3',
        placeholder: 'Select Player B Card 3'
      },
      red: {
        label: 'Red Dice',
        placeholder: 'Select Red Dice'
      }, 
      blue: {
        label: 'Blue Dice',
        placeholder: 'Select Blue Dice'
      },
      playerHandValue: {
        label: 'Player Hand Value',
        placeholder: 'Select Player Hand Value'
      },
      totalAndarCard: { 
        label: 'Total Andar Card Count', 
        placeholder: 'Enter Count' 
      },
      totalBaharCard: { 
        label: 'Total Bahar Card Count', 
        placeholder: 'Enter Count' 
      },
      mainCard: { 
        label: 'Main Card', 
        placeholder: 'Select Main Card' 
      },
      // andarCard1~andarCard25
      ...Array.from({ length: 25 }, (_, i) => ({
        [`andarCard${i + 1}`]: { label: `Andar Card ${i + 1}`, placeholder: `Select Andar Card ${i + 1}` }
      })).reduce((a, b) => ({ ...a, ...b }), {}),
      // baharCard1~baharCard25
      ...Array.from({ length: 25 }, (_, i) => ({
        [`baharCard${i + 1}`]: { label: `Bahar Card ${i + 1}`, placeholder: `Select Bahar Card ${i + 1}` }
      })).reduce((a, b) => ({ ...a, ...b }), {}),      
    }

    const cardList = computed(() => commonStore.getCardList)

    const rules = computed(() => {
      if (state.gameType === 'Baccarat') {
        return {
          dealerDomain: { requiredHelper },
          hallType: { requiredHelper },
          gameType: { requiredHelper },
          tableID: { requiredHelper },
          shoe: { numericHelper, requiredHelper },
          round: { numericHelper, requiredHelper },
          playerCard1: { requiredHelper },
          playerCard2: { requiredHelper },
          bankerCard1: { requiredHelper },
          bankerCard2: { requiredHelper },
        }
      } else if (state.gameType === 'DragonTiger') {
        return {
          dealerDomain: { requiredHelper },
          hallType: { requiredHelper },
          gameType: { requiredHelper },
          tableID: { requiredHelper },
          shoe: { numericHelper, requiredHelper },
          round: { numericHelper, requiredHelper },
          dragonCard: { requiredHelper },
          tigerCard: { requiredHelper }
        }
      } else if (state.gameType === 'Sicbo' || state.gameType === 'ExtraSicbo' || state.gameType === 'ThaiHiLo') {
        return {
          dealerDomain: { requiredHelper },
          hallType: { requiredHelper },
          gameType: { requiredHelper },
          tableID: { requiredHelper },
          shoe: { numericHelper, requiredHelper },
          round: { numericHelper, requiredHelper },
          dice1: { requiredHelper },
          dice2: { requiredHelper },
          dice3: { requiredHelper }
        }
      } else if (state.gameType === 'Roulette' || state.gameType === 'ExtraRoulette') {
        return {
          dealerDomain: { requiredHelper },
          hallType: { requiredHelper },
          gameType: { requiredHelper },
          tableID: { requiredHelper },
          shoe: { numericHelper, requiredHelper },
          round: { numericHelper, requiredHelper },
          ball: { requiredHelper }
        }
      } else if (state.gameType === 'Twenty') {
        return {
          dealerDomain: { requiredHelper },
          hallType: { requiredHelper },
          gameType: { requiredHelper },
          tableID: { requiredHelper },
          shoe: { numericHelper, requiredHelper },
          round: { numericHelper, requiredHelper },
          playerACard1: { requiredHelper },
          playerACard2: { requiredHelper },
          playerACard3: { requiredHelper },
          playerBCard1: { requiredHelper },
          playerBCard2: { requiredHelper },
          playerBCard3: { requiredHelper }
        }
      } else if (state.gameType === 'RBSicbo') {
        return {
          dealerDomain: { requiredHelper },
          hallType: { requiredHelper },
          gameType: { requiredHelper },
          tableID: { requiredHelper },
          shoe: { numericHelper, requiredHelper },
          round: { numericHelper, requiredHelper },
          red: { requiredHelper },
          blue: { requiredHelper }
        }
      } else if (state.gameType === 'ExtraAndarBahar'){
        // Andar Cards
        const andarCards = Array.from({ length: 25 }, (_, i) => {
          const idx = i + 1
          return {
            [`andarCard${idx}`]: {
              requiredHelper: helpers.withMessage(
                'This field is required.',
                (value) => {
                  let count = Number(state.totalAndarCard)
                  if (isNaN(count) || count < 1) count = 0
                  if (count > 25) count = 25
                  if (idx > count) return true
                  return !!value
                }
              )
            }
          }
        }).reduce((a, b) => ({ ...a, ...b }), {})

        // Bahar Cards
        const baharCards = Array.from({ length: 25 }, (_, i) => {
          const idx = i + 1
          return {
            [`baharCard${idx}`]: {
              requiredHelper: helpers.withMessage(
                'This field is required.',
                (value) => {
                  let count = Number(state.totalBaharCard)
                  if (isNaN(count) || count < 1) count = 0
                  if (count > 25) count = 25
                  if (idx > count) return true
                  return !!value
                }
              )
            }
          }
        }).reduce((a, b) => ({ ...a, ...b }), {})

        return {
          dealerDomain: { requiredHelper },
          hallType: { requiredHelper },
          gameType: { requiredHelper },
          tableID: { requiredHelper },
          shoe: { numericHelper, requiredHelper },
          round: { numericHelper, requiredHelper },
          totalAndarCard: {
            requiredHelper,
            numericHelper,
            integer: helpers.withMessage('Must be an integer', value => value !== null && value !== '' ? Number(value) % 1 === 0 : true),
            min: helpers.withMessage('Minimum is 1', value => value !== null && value !== '' ? Number(value) >= 1 : true),
            max: helpers.withMessage('Maximum is 25', value => value !== null && value !== '' ? Number(value) <= 25 : true)
          },
          totalBaharCard: {
            requiredHelper,
            numericHelper,
            integer: helpers.withMessage('Must be an integer', value => value !== null && value !== '' ? Number(value) % 1 === 0 : true),
            min: helpers.withMessage('Minimum is 1', value => value !== null && value !== '' ? Number(value) >= 1 : true),
            max: helpers.withMessage('Maximum is 25', value => value !== null && value !== '' ? Number(value) <= 25 : true)
          },
          mainCard: { requiredHelper },
          ...andarCards,
          ...baharCards
        }       
      }
      else {
        // 預設共同欄位
        return {
          dealerDomain: { requiredHelper },
          hallType: { requiredHelper },
          gameType: { requiredHelper },
          tableID: { requiredHelper },
          shoe: { numericHelper, requiredHelper },
          round: { numericHelper, requiredHelper }
        }
      }
    })

    const v$ = useVuelidate(rules, state)

    const addResult = async () => {
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

        if (state.gameType === 'Baccarat') {
          payload = {
            ...payload,
            playerCard1: state.playerCard1,
            playerCard2: state.playerCard2,
            playerCard3: state.playerCard3,
            bankerCard1: state.bankerCard1,
            bankerCard2: state.bankerCard2,
            bankerCard3: state.bankerCard3
          }
        } else if (state.gameType === 'DragonTiger') {
          payload = {
            ...payload,
            dragonCard: state.dragonCard,
            tigerCard: state.tigerCard
          }
        } else if (state.gameType === 'Sicbo' || state.gameType === 'ExtraSicbo' || state.gameType === 'ThaiHiLo') {
          payload = {
            ...payload,
            dice1: state.dice1,
            dice2: state.dice2,
            dice3: state.dice3
          }
        } else if (state.gameType === 'Roulette' || state.gameType === 'ExtraRoulette') {
          payload = {
            ...payload,
            ball: state.ball,
          }
        } else if (state.gameType === 'Twenty') {
          payload = {
            ...payload,
            playerACard1: state.playerACard1,
            playerACard2: state.playerACard2,
            playerACard3: state.playerACard3,
            playerBCard1: state.playerBCard1,
            playerBCard2: state.playerBCard2,
            playerBCard3: state.playerBCard3
          }
        } else if (state.gameType === 'RBSicbo') {
          payload = {
            ...payload,
            red: state.red,
            blue: state.blue
          }
        } else if (state.gameType === 'ExtraAndarBahar') {
          // payload = {
          //   ...payload,
          //   totalAndarCard: state.totalAndarCard,
          //   totalBaharCard: state.totalBaharCard,
          //   mainCard: state.mainCard,
          //   ...Array.from({ length: 25 }, (_, i) => ({ [`andarCard${i + 1}`]: state[`andarCard${i + 1}`] })).reduce((a, b) => ({ ...a, ...b }), {}),
          //   ...Array.from({ length: 25 }, (_, i) => ({ [`baharCard${i + 1}`]: state[`baharCard${i + 1}`] })).reduce((a, b) => ({ ...a, ...b }), {})
          // }          
          payload = {
            ...payload,
            totalAndarCard: state.totalAndarCard,
            totalBaharCard: state.totalBaharCard,
            mainCard: state.mainCard,
            ...Object.fromEntries(
              Array.from({ length: 25 }, (_, i) => [`andarCard${i + 1}`, state[`andarCard${i + 1}`]])
                .filter(([_, v]) => v !== null && v !== undefined && v !== '')
            ),
            ...Object.fromEntries(
              Array.from({ length: 25 }, (_, i) => [`baharCard${i + 1}`, state[`baharCard${i + 1}`]])
                .filter(([_, v]) => v !== null && v !== undefined && v !== '')
            )
          }          
        }

        console.log(payload)

        try {
          const response = await tableStore.addResult({ payload })

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
      addResult,
      resetForm
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
