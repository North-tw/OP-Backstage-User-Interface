<template>
  <tr class="align-middle">
    <td
      v-for="field in fieldList"
      :key="field"
      class="py-3 small text-center"  
    >
      {{ field === 'updateTime'
          ? $formatDateTime($props[field])
            : $props[field]
      }}
    </td>

  </tr>

</template>
<script>
import { computed, provide, ref, inject } from 'vue'
import { requiredHelper, numericHelper, useVuelidate } from '@/helpers/useVuelidate.js'
import { useErrorMessage } from '@/helpers/useApiMessage.js'
import { useMixin } from '@/helpers/useMixin.js'

export default {
  name: 'VoidRoundDirectlyLogListItem',
  components: {
    
  },
  props: {
    logID: {
      type: Number,
      default: 0
    },
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

    const readVoidRoundLogList = inject('readVoidRoundLogList')

    const domainList = computed(() => tableStore.getDomainList)
    const gameList = computed(() => tableStore.getGameList)

    const fieldList = [
      'logID',
      'dealerDomain',
      'hallType',  
      'gameType',
      'tableID',
      'shoe',
      'round',
      'updateTime', 
      'updateID', 
      'updateName'
    ]  

    const state = ref({
      ...props
    })

    const labelMap = {

    }

    const rules = {

    }

    const v$ = useVuelidate(rules, state)

    provide('readVoidRoundLogList', readVoidRoundLogList)

    return {
      v$,
      state,
      labelMap,
      fieldList,
      domainList,
      gameList
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
