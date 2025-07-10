<template>
  <tr class="align-middle">
    <td
      v-for="field in fieldList"
      :key="field"
      class="py-3 small text-center"
    >
      <template v-if="field === 'roundStartTime'">
        {{ $formatDateTime($props[field]) }}
      </template>
      <template v-else-if="field === 'link'">
        <template v-if="linkArray.length">
          <span v-for="item in linkArray" :key="item.url" class="me-2">
            <a :href="item.url" target="_blank">{{ item.label }}</a>
          </span>
        </template>
        <span v-else>-</span>
      </template>
      <template v-else>
        {{ $props[field] }}
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
      linkArray
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
