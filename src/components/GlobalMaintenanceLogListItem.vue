<template>
  <tr class="align-middle">
    <td
      v-for="field in fieldList"
      :key="field"
      class="py-3 small text-center"
      :class="field === 'status'
        ? (statusText($props[field]) === 'Set to Open'
            ? 'text-success'
            : statusText($props[field]) === 'Set to Close'
              ? 'text-danger'
              : '') 
        : ''"      
    >
      {{ field === 'updateTime'
          ? $formatDateTime($props[field])
          : field === 'status'
            ? statusText($props[field])
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
  name: 'GlobalMaintenanceLogListItem',
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
      type: [String, Number],
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

    const readGlobalLogList = inject('readGlobalLogList')

    const domainList = computed(() => tableStore.getDomainList)
    const gameList = computed(() => tableStore.getGameList)

    const fieldList = [
      'logID',
      'dealerDomain',
      'hallType',  
      'updateTime', 
      'updateID', 
      'updateName',
      'status'
    ]

    const statusText = (val) => {
      if (val === 1 || val === '1') return 'Set to Open'
      if (val === 2 || val === '2') return 'Set to Close'
      return val
    }    

    const state = ref({
      ...props
    })

    const labelMap = {

    }

    const rules = {

    }

    const v$ = useVuelidate(rules, state)

    provide('readGlobalLogList', readGlobalLogList)

    return {
      v$,
      state,
      labelMap,
      fieldList,
      domainList,
      gameList,
      statusText
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
