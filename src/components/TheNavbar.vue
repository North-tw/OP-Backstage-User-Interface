<template>
  <div>
    <transition>
      <div
        v-if="navbarActive"
        class="position-absolute"
        :class="[$style.shadow]"
        @click.self="setNavbarActive(false)"
      />
    </transition>
    <transition>
      <nav
        v-if="navbarActive"
        class="position-absolute bg-gray-200"
        :class="[$style.navbar]"
      >
        <ul class="list-unstyled p-4 mb-0">
          <li
            v-for="main in activeNavMap"
            :key="main"
            class="mb-4"
          >
            <h5
              v-if="main.link"
              class="d-flex align-items-center fw-bold mb-3"
            >
              <a
                :href="main.link"
                class="text-dark text-decoration-none"
                target="_blank"
              > {{ main.title }}
                <AppIcon
                  name="link"
                  class="icon-sm"
                /></a>
            </h5>
            <h5
              v-else
              class="d-flex align-items-center justify-content-between fw-bold mb-3"
              role="button"
              @click="setNavActive(main.title, !(navActive?.[main.title]))"
            >
              {{ main.title }}
              <AppIcon
                name="chevron-down"
                class="icon-sm"
                :class="[$style.chevron, {[$style.active]: navActive?.[main.title]}]"
              />
            </h5>
            <transition>
              <ul
                v-if="navActive?.[main.title]"
                class="py-1 ps-0"
                :class="$style.list"
              >
                <template
                  v-for="sub in main.childrens"
                  :key="sub"
                >
                  <li
                    v-if="sub.active"
                    class="list-unstyled mb-2"
                  >
                    <router-link
                      :to="sub.link"
                      class="text-decoration-none px-3 py-1"
                      :class="[$style.link, {[$style.active]: path === sub.link}]"
                    >
                      {{ sub.title }}
                    </router-link>
                  </li>
                </template>
              </ul>
            </transition>
          </li>
        </ul>
      </nav>
    </transition>
  </div>
</template>
<script>
import { watch, computed, ref, toRef } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/index'
import { useUserStore } from '@/stores/user'

export default {
  name: 'TheNavbar',
  setup () {
    const appStore = useAppStore()
    const userStore = useUserStore()
    const route = useRoute()

    const path = toRef(route, 'path')

    const navbarActive = computed(() => appStore.getNavbarActive)

    const setNavbarActive = (active) => {
      appStore.setNavbarActive(active)
    }

    const userRoles = computed(() => userStore.getUserRoles || [])

    const navMap = ref([
      {
        title: 'My Account',
        active: true,
        childrens: [
          {
            title: 'Account Info',
            link: '/account-info',
            active: true
          }
        ]
      },
      {
        title: 'Table',
        active: true,
        childrens: [
          {
            title: 'Table Condition',
            link: '/table-condition',
            active: true
          }
        ]        
      },
      {
        title: 'Result Management',
        active: true,
        childrens: [
          {
            title: 'Add Result',
            link: '/add-result',
            active: true
          },
          {
            title: 'Void Round Driectly',
            link: '/void-round-directly',
            active: true
          }
        ]        
      },
      {
        title: 'Result Query',
        active: true,
        childrens: [
          {
            title: 'Result History',
            link: '/result-history',
            active: true
          },
          {
            title: 'Unsettle Result History',
            link: '/unsettle-result-history',
            active: true
          },
          {
            title: 'Result Video Link',
            link: '/result-video-link',
            active: true
          }
        ]        
      },
      {
        title: 'System',
        active: true,
        childrens: [
          {
            title: 'Global Maintentance',
            link: '/global-maintenance',
            active: true
          }
        ]        
      },
      {
        title: 'Logs',
        active: true,
        childrens: [
          {
            title: 'Table Conditon Log',
            link: '/logs/table-condition-log',
            active: true
          },          
          {
            title: 'Add Result Log',
            link: '/logs/add-result-log',
            active: true
          },
          {
            title: 'Void Round Directly Log',
            link: '/logs/void-round-directly-log',
            active: true
          },
          {
            title: 'Global Maintenance Log',
            link: '/logs/global-maintenance-log',
            active: true
          }
        ]        
      }
      //   title: '系統管理',
      //   auth: ['SYSTEM', 'DEVELOPER'],
      //   active: computed(() => userRoles.value.includes('SYSTEM') ||
      //   userRoles.value.includes('DEVELOPER')),
      //   childrens: [
      //     {
      //       title: 'Server列表',
      //       link: '/server-list',
      //       active: computed(() => userRoles.value.includes('SYSTEM') ||
      //       userRoles.value.includes('DEVELOPER'))
      //     },
      //     {
      //       title: '排程更新列表',
      //       link: '/task-list',
      //       active: computed(() => userRoles.value.includes('SYSTEM') ||
      //       userRoles.value.includes('DEVELOPER'))
      //     }
      //   ]
      // }
    ])

    const activeNavMap = computed(() => navMap.value.filter((item) => item.active))

    const navActive = ref({})
    const setNavActive = (title, active) => {
      navActive.value[title] = active
    }

    // 當 navbarActive 變 true，自動展開所有主選單
    watch(navbarActive, (val) => {
      if (val) {
        // 展開所有主選單
        activeNavMap.value.forEach(item => {
          navActive.value[item.title] = true
        })
      } else {
        // 關閉所有主選單
        Object.keys(navActive.value).forEach(key => {
          navActive.value[key] = false
        })
      }
    })    

    return {
      setNavActive,
      navActive,
      userRoles,
      activeNavMap,
      path,
      navbarActive,
      setNavbarActive
    }
  }
}
</script>
<style lang="scss" module>
.shadow {
  top: 0;
  left: 0;
  z-index: $zindex-navbar-backdrop;
  width: 100%;
  height: 100%;
  background-color: rgba($dark, 0.5);
  opacity: 1;
  transition: opacity 0.3s;

  &:global(.v-enter-from),
  &:global(.v-leave-to) {
    opacity: 0;
  }
}

.navbar {
  top: 0;
  left: 0;
  z-index: $zindex-navbar;
  overflow-y: hidden;
  width: $navbar-width;
  height: 100%;
  transition: width 0.3s, left 0.3s;

  &:global(.v-enter-from),
  &:global(.v-leave-to) {
    left: -$navbar-width;
  }
}

.link {
  color: $gray-700;
  border-radius: 5px;
  transition: color 0.3s, background-color 0.3s;
  white-space: nowrap;

  &:hover {
    color: $primary;
  }

  &.active {
    color: $white;
    background-color: $primary;
  }
}

.list {
  overflow: hidden;
  max-height: 500px;
  transition: all 0.3s;

  &:global(.v-enter-from),
  &:global(.v-leave-to) {
    max-height: 0;
  }
}

.chevron {
  transition: all 0.3s;

  &.active {
    transform: rotate(180deg);
  }
}
</style>
