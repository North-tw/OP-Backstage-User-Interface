<template>
  <tr class="align-middle">
    <!-- 固定欄位 -->
    <td class="py-3 small text-center">{{ gameType }}</td>
    <td class="py-3 small text-center">{{ gameID }}</td>
    <td class="py-3 small text-center">{{ tableID }}</td>
    <td class="py-3 small text-center">{{ shoe }}</td>
    <td class="py-3 small text-center">{{ round }}</td>
    <td class="py-3 small text-center">{{ $formatDateTime(roundStartTime) }}</td>
    <td class="py-3 small text-center">{{ calculate }}</td>
    <td class="py-3 small text-center">{{ voided }}</td>
    <td class="py-3 small text-center">{{ result }}</td>
    <td class="py-3 small text-center">
      <template v-if="linkArray.length">
        <span v-for="item in linkArray" :key="item.url" class="me-2">
          <a :href="item.url" target="_blank">{{ item.label }}</a>
        </span>
      </template>
      <span v-else>-</span>
    </td>
    <!-- 動態欄位 -->
    <td
      v-for="field in resultDetailFields"
      :key="field"
      class="py-3 small text-center"
    >
      <!-- AndarCards/BaharCards 換行顯示 -->
      <template v-if="gameType === 'ExtraAndarBahar' && (field === 'AndarCards' || field === 'BaharCards')">
        <template v-if="Array.isArray(normalizedResultDetail[field]) && normalizedResultDetail[field].length">
          <span v-for="(card, idx) in normalizedResultDetail[field].slice(0, 20)" :key="idx">
            {{ card }}<span v-if="(idx + 1) % 10 === 0"><br/></span>
            <span v-else-if="idx < normalizedResultDetail[field].length - 1">, </span>
          </span>
        </template>
        <span v-else>-</span>
      </template>
      <!-- 其他欄位 -->
      <template v-else-if="Array.isArray(normalizedResultDetail[field])">
        {{ normalizedResultDetail[field].join(', ') }}
      </template>
      <template v-else>
        {{ normalizedResultDetail[field] !== undefined ? normalizedResultDetail[field] : '-' }}
      </template>
    </td>
  </tr>
</template>

<script>
import { computed, provide, ref, inject } from 'vue'
import { requiredHelper, numericHelper, useVuelidate } from '@/helpers/useVuelidate.js'
import { useErrorMessage } from '@/helpers/useApiMessage.js'
import { useMixin } from '@/helpers/useMixin.js'

export default {
  name: 'ResultHistoryListItem',
  components: {
    
  },
  props: {
    gameType: {
      type: String,
      default: ''
    },    
    gameID: {
      type: Number,
      default: 0
    },     
    tableID: {
      type: String,
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
    roundStartTime: {
      type: String,
      default: ''
    },
    calculate: {
      type: String,
      default: ''
    },
    voided: {
      type: String,
      default: ''
    },    
    result: {
      type: String,
      default: ''
    }, 
    link: {
      type: Object,
      default: () => ({})
    },
    resultDetailFields: {
      type: Array,
      default: () => []
    },
    resultDetail: {
      type: Object,
      default: () => ({})
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

    const readResultHistoryList = inject('readResultHistoryList')

    const domainList = computed(() => tableStore.getDomainList)
    const gameList = computed(() => tableStore.getGameList)

    const fieldList = [ 
      'gameType',
      'gameID',
      'tableID',
      'shoe',
      'round',
      'roundStartTime', 
      'calculate',
      'voided',
      'result',
      'link'
    ]  

    const state = ref({
      ...props
    })


    const normalizedResultDetail = computed(() => {
      const result = {}
      const fields = props.resultDetailFields
      const detail = props.resultDetail || {}
      const gameType = props.gameType

      // 依照欄位對應表合併資料
      fields.forEach(field => {
        // Baccarat 特殊處理
        if (gameType === 'Baccarat' && (field === 'Player' || field === 'Banker')) {
          // 例如: playerCard1, playerCard2, playerCard3
          const prefix = field.toLowerCase() + 'Card'
          const cards = []
          Object.keys(detail).forEach(key => {
            if (key.startsWith(prefix)) {
              cards.push(detail[key])
            }
          })
          // 按照 card 編號排序
          cards.sort((a, b) => {
            const numA = parseInt(a.match(/\d+/)?.[0] || '0')
            const numB = parseInt(b.match(/\d+/)?.[0] || '0')
            return numA - numB
          })
          result[field] = cards
        }
        // Teenpatti 20-20 特殊處理
        else if (gameType === 'Teenpatti 20-20' && (field === 'PlayerA' || field === 'PlayerB')) {
          // 例如: playerA: [D07, D05, D09]
          result[field] = Array.isArray(detail[field]) ? detail[field] : [detail[field]].filter(Boolean)
        }
        // DragonTiger 特殊處理
        else if (gameType === 'DragonTiger' && (field === 'Dragon' || field === 'Tiger')) {
          result[field] = detail[field.toLowerCase()] ? [detail[field.toLowerCase()]] : []
        }
        // ExtraAndarBahar 特殊處理
        else if (gameType === 'ExtraAndarBahar') {
          if (field === 'MaindCard') {
            result[field] = detail.maindCard || '-'
          } else if (field === 'AndarCards') {
            result[field] = Array.isArray(detail.andarCards) ? detail.andarCards : []
          } else if (field === 'BaharCards') {
            result[field] = Array.isArray(detail.baharCards) ? detail.baharCards : []
          } else if (field === 'TotalCardCount') {
            result[field] = detail.totalCardCount !== undefined ? detail.totalCardCount : '-'
          } else if (field === 'WithRandomPay') {
            result[field] = detail.withRandomPay !== undefined ? detail.withRandomPay : '-'
          } else {
            result[field] = detail[field] !== undefined ? detail[field] : '-'
          }
        }   
        // Pok Deng 特殊處理
        else if (gameType === 'Pok Deng' && (field === 'PlayerA' || field === 'PlayerB' || field === 'Banker')) {
          // 例如: playerA: [D07, D05, D09]
          result[field] = Array.isArray(detail[field]) ? detail[field] : [detail[field]].filter(Boolean)
        }             
        // 其他遊戲
        else {
          result[field] = detail[field] !== undefined ? detail[field] : '-'
        }
      })
      return result
    })    

    const labelMap = {

    }

    const rules = {

    }

    const linkArray = computed(() => {
      if (!props.link || typeof props.link !== 'object') return []
      return Object.entries(props.link).map(([key, url], idx) => ({
        label: `Re${idx + 1}`,
        url
      }))
    })    

    const v$ = useVuelidate(rules, state)

    provide('readResultHistoryList', readResultHistoryList)

    return {
      v$,
      state,
      labelMap,
      fieldList,
      domainList,
      gameList,
      linkArray,
      normalizedResultDetail
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
