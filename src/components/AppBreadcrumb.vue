<template>
  <ul class="small list-unstyled d-inline-flex bg-gray-200 px-3 py-1 mb-3 rounded-3">
    <li>
      <router-link
        to="/"
        class="text-decoration-none text-secondary"
      >
        Home
      </router-link>
    </li>
    <li
      v-for="link in breadCrumbs"
      :key="link"
      :class="link?.class"
    >
      <span class="text-gray mx-2">/</span>
      <router-link
        :to="link?.to || ''"
        class="text-decoration-none"
        :class="[link?.to ? 'text-secondary' : 'text-gray-700']"
      >
        {{ link.title }}
      </router-link>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'AppBreadcrumb',
  props: {
    breadCrumbs: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style lang="scss" module>

</style>
