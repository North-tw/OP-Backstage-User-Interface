<template>
  <div>
    <AppBreadcrumb :bread-crumbs="breadCrumbs" />
    <div class="d-flex align-items-center justify-content-between mb-4">
      <h3>Accoount Info</h3>
    </div>
    <div class="container-fluid gx-0">
      <div class="row mb-4">
        <section class="col-12 col-lg-6 col-xl-4">
          <AccountInfoDetail class="mb-3" />
        </section>
        <section class="col-12 col-lg-6 col-xl-8">
          <AccountInfoResetPassword class="col-12" />
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
import AppBreadcrumb from '@/components/AppBreadcrumb.vue'
import AccountInfoDetail from '@/components/AccountInfoDetail'
import AccountInfoResetPassword from '@/components/AccountInfoResetPassword'

export default {
  name: 'AccountInfo',
  components: {
    AppBreadcrumb,
    AccountInfoDetail,
    AccountInfoResetPassword
  },
  async setup () {
    const breadCrumbs = ref([{ title: 'My Account' }, { title: 'Account Info' }])

    return {
      breadCrumbs
    }
  }
}
</script>
<style lang="scss" module>

</style>
