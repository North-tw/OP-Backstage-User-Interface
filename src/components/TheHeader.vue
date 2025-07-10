<template>
  <header
    id="header"
    class="bg-primary text-white px-3 px-md-4 py-3 d-flex justify-content-between align-items-center w-100"
  >
    <div class="mb-0 d-flex align-items-center">
      <div
        v-if="isLogin(false, false)"
        role="button"
        @click="setNavbarActive(true)"
      >
        <AppIcon
          v-if="navbarActive"
          name="cross"
          class="icon me-3 mb-0"
        />
        <AppIcon
          v-else
          name="hamburger"
          class="icon me-3 mb-0"
        />
      </div>
      <router-link
        class="d-flex align-items-center text-white text-decoration-none fs-4 me-3"
        to="/"
        :class="$style.headerHeight"
      >
        <img
          class="h-100 me-2"
          src="~@/assets/imgs/logo-57w.png"
        >
        OP Backstage
      </router-link>
      <div class="border-start px-3 my-2">
        <!-- <a
          :href="entranceDomain"
          target="_blank"
          class="d-flex align-items-center link-light text-decoration-none"
        >
          OP Backstage
          <AppIcon
            name="link"
            class="ms-2 icon"
          />
        </a> -->
      </div>
    </div>
    <div
      v-if="isLogin(false, false)"
      class="position-relative"
      @mouseleave="setBtnsActive(false)"
    >
      <div
        class="d-flex align-items-center text-white"
      >
        <router-link
          to="/account-info"
          class="text-white"
        >
          <AppIcon
            name="user"
            class="icon-lg mb-0"
          />
        </router-link>
        <div
          class="my-2"
          role="button"
          @mouseenter="setBtnsActive(true)"
        >
          <span
            class="d-none d-md-inline-block mx-2 fw-bold"
          >{{ userName }}</span>
          <AppIcon
            name="chevron-down"
            class="icon"
          />
        </div>
      </div>
      <ul
        class="position-absolute end-0 me-2 list-unstyled shadow-sm"
        :class="[$style.btns, {[$style.active]: btnsActive}]"
      >
        <li
          class="text-center px-5 py-2 user-select-none text-nowrap"
          :class="$style.btn"
          role="button"
          @click="push('/account-info')"
        >
          Reset Password
        </li>
        <li
          class="text-center px-5 py-2 user-select-none text-nowrap"
          :class="$style.btn"
          role="button"
          @click="logoutAndRedirect"
        >
          Sign Out
        </li>
      </ul>
    </div>
  </header>
</template>
<script>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUser } from '@/helpers/useUser.js'
import { useAppStore } from '@/stores/index'
import { useUserStore } from '@/stores/user'

export default {
  name: 'TheHeader',
  setup () {
    const { logout, isLogin } = useUser()
    const appStore = useAppStore()
    const userStore = useUserStore()
    const { push } = useRouter()
    const userID = computed(() => userStore.getUserID)
    const userName = computed(() => userStore.getUserName)
    const navbarActive = computed(() => appStore.getNavbarActive)

    const btnsActive = ref(false)
    const setBtnsActive = (active) => {
      btnsActive.value = active
    }

    const setNavbarActive = () => {
      appStore.setNavbarActive(!navbarActive.value)
    }

    const logoutAndRedirect = () => {
      logout()
      push({ path: '/login', replace: true })
    }

    const entranceDomain = process.env.VUE_APP_ENTRANCE_DOMAIN

    return {
      entranceDomain,
      userName,
      isLogin,
      userID,
      logoutAndRedirect,
      btnsActive,
      setBtnsActive,
      setNavbarActive,
      push,
      navbarActive
    }
  }
}
</script>
<style lang="scss" module>
.headerHeight {
  height: $header-height;
}

.btns {
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  transition: max-height 0.3s, opacity 0.3s;

  &.active {
    z-index: $zindex-navbar;
    max-height: 100vh;
    opacity: 1;
  }
}

.btn {
  color: $primary;
  background-color: $white;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    color: $white;
    background-color: $primary-light;
  }
}

</style>
