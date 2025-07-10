<template>
  <div>
    <div class="card border-0 shadow">
      <div class="card-header bg-primary text-white border-0">
        Information
      </div>
      <div class="card-body row">
        <div
          v-for="field in fieldList"
          :key="field"
          class="col-12 mb-3"
        >
          <label> {{ labelMap[field].label }}：</label>
          <!-- userRole -->
          <div
            v-if="field === 'userRoles'"
            class="d-flex flex-column"
          >
            <span
              v-for="role in state.userRoles"
              :key="role"
            >
              {{ role }}
            </span>
          </div>
          <!-- else -->
          <div v-else>
            <a
              v-if="field.includes('Url') && state[field]"
              :href="state[field]"
              target="_blank"
            >{{ state[field] }}</a>
            <span v-else>{{ state[field] || '-' }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'
export default {
  name: 'AccountInfoDetail',
  async setup () {

    const userStore = useUserStore()

    const state = computed(() => ({
      account: userStore.getAccount,
      userID: userStore.getUserID,
      name: userStore.getUserName,
      userRoles: userStore.getUserRoles,
    }))

    const fieldList = [
      'userID',
      'account',
      'name',
      'userRoles'
    ]

    const labelMap = {
      userID: {
        label: 'ID'
      },
      account: {
        label: 'Account'
      },
      name: {
        label: 'Name'
      },
      userRoles: {
        label: 'Roles'
      }
    }

    return {
      state,
      fieldList,
      labelMap
    }
  }
}
</script>
<style lang="scss" module>

</style>
