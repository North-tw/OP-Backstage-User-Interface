import store from '@/store'
import router from '@/router'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { useMixin } from '@/helpers/useMixin'
import Cookies from 'js-cookie'
import { useUserStore } from '@/stores/user'

const logout = () => {

  const userStore = useUserStore()
  userStore.account = null
  userStore.userID = null
  userStore.userRoles = []
  userStore.userName = null
  userStore.token = null  

  // 清空持久化存儲
  Cookies.remove('NorthOP_State_Pinia')
}

const isLogin = (toSetAlert = true, redirectToLogin = true) => {
  const userStore = useUserStore()
  const router = useRouter()
  const { setAlert } = useMixin()
  const { fullPath, name } = router.currentRoute.value

  const userID = computed(() => userStore.getUserID)
  if (!userID.value) {
    if (toSetAlert) {
      setAlert(true, false, 'Please log in first!')
    }
    if (redirectToLogin && name !== 'Login') {
      router.push({ name: 'Login', params: { redirect: fullPath } })
    }
  }
  return !!(userID.value)
}

const useUser = () => {
  return { logout, isLogin }
}

export {
  useUser
}
