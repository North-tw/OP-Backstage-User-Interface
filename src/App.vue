<template>
  <router-view v-slot="{Component}">
    <template v-if="Component">
      <Suspense>
        <component :is="Component" />
      </Suspense>
    </template>
  </router-view>
  <AppLoading />
  <AppAlert />
</template>
<script>
import { useAppStore } from '@/stores/index'
import { useUserStore } from '@/stores/user'
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import AppAlert from '@/components/AppAlert.vue'
import AppLoading from '@/components/AppLoading.vue'
import { useMixin } from '@/helpers/useMixin.js'
export default {
  name: 'App',
  components: {
    AppAlert, AppLoading
  },
  setup () {
    const { setAlert } = useMixin()
    const appStore = useAppStore()
    const userStore = useUserStore()
    const router = useRouter()

    const userID = computed(() => userStore.getUserID)

    const scrollToTop = () => {
      if (document.getElementById('main')) {
        document.getElementById('main').scroll({ top: 0, behavior: 'smooth' })
      }
    }


    router.beforeEach((to, from) => {
      scrollToTop()
      appStore.setNavbarActive(false)

      if (to.meta.requiresAuth) {
        if (to.meta.requiresAuthKey) {
          const requiresAuthKey = to.meta.requiresAuthKey
          requiresAuthKey.forEach((auth) => {
            switch (auth) {
              case 'LOGIN':
                if (!userID.value) {
                  setAlert(true, false, '請先登入')
                  router.push('/login')
                }
            }
          })
        }
        if (to.meta.OptionalAuthKey) {
          const OptionalAuthKey = to.meta.OptionalAuthKey

          const authIndex = OptionalAuthKey.findIndex((item) => userAuthsCodes.value.includes(item))

          if (authIndex === -1) {
            setAlert(true, false, '您未擁有瀏覽頁面的權限')
            router.push('/')
          }
        }
        return true
      } else {
        return true
      }
    })

    onMounted(() => {
      window.addEventListener('resize', () => {
        const innerWidth = window.innerWidth
        appStore.setIsMobile(innerWidth < 768)
      })
    })

    return {}
  }
}
</script>
<style lang="scss">

</style>
