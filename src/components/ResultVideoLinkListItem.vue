<template>
  <tr class="align-middle">
    <td v-for="field in fieldList" :key="field" class="py-3 small text-center">
      <template v-if="field === 'linkList'">
        <template v-if="Array.isArray(linkList) && linkList.length">
          <span v-for="(url, idx) in linkList" :key="idx" class="me-2">
            <a :href="url" target="_blank">Re{{ idx + 1 }}</a>
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
  name: 'ResultVideoLinkListItem',
  components: {
    
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
    dateTime: {
      type: String,
      default: ''
    },
    linkList: { 
      type: Array, 
      default: () => [] 
    } ,
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

    const readResultVideoLinkList = inject('readResultVideoLinkList')

    const domainList = computed(() => tableStore.getDomainList)
    const gameList = computed(() => tableStore.getGameList)

    const fieldList = [
      'dealerDomain',
      'hallType',  
      'gameType',
      'tableID',
      'shoe',
      'round',
      'dateTime',
      'linkList'
    ]  

    const state = ref({
      ...props
    })

    const labelMap = {

    }

    const rules = {

    }

    const v$ = useVuelidate(rules, state)

    provide('readResultVideoLinkList', readResultVideoLinkList)

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
