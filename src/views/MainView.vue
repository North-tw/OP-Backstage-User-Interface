<template>
  <div id="modalWrap" />
  <div class="d-flex flex-column min-vh-100 justify-content-center">
    <TheHeader :class="$style[`header`]" />
    <section
      class="flex-grow-1 d-flex position-relative"
      :class="$style[`body`]"
    >
      <TheNavbar class="flex-shrink-0" />
      <main
        id="main"
        class="flex-grow-1 overflow-auto p-3 p-md-4 pb-5"
      >
        <router-view v-slot="{ Component }">
          <template v-if="Component">
            <Suspense>
              <component :is="Component" />
            </Suspense>
          </template>
        </router-view>
      </main>
    </section>
  </div>
</template>
<script>
import TheHeader from '@/components/TheHeader.vue'
import TheNavbar from '../components/TheNavbar.vue'

export default {
  name: 'MainView',
  components: {
    TheHeader,
    TheNavbar
  },
  setup () {

  }
}
</script>
<style lang="scss" module>
.header {
  height: $header-height;
}

.body {
  height: calc(100vh - #{$header-height});
}

</style>
