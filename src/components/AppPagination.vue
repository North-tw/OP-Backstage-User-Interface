<template>
  <div class="d-flex align-items-center justify-content-center">
    <div
      class="d-flex"
      :class="[$style.prevPage, {[$style.disabled]: currentPage === 1}]"
      @click="setPrevPage"
    >
      <AppIcon
        name="prev"
        class="icon-xs text-primary"
      />
    </div>
    <div
      v-for="page in pageList"
      :key="page"
      :class="[$style.page, {[$style.currentPage]: page+1 === currentPage}]"
      @click="setPage(page+1)"
    >
      {{ page+1 }}
    </div>
    <div
      class="d-flex"
      :class="[$style.nextPage, {[$style.disabled]: currentPage === totalPage}]"
      @click="setNextPage"
    >
      <AppIcon
        name="next"
        class="icon-xs text-primary"
      />
    </div>
  </div>
</template>
<script>
import { toRef, computed } from 'vue'
export default {
  name: 'AppPagination',
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    totalPage: {
      type: Number,
      default: 1
    }
  },
  emits: ['setPage'],
  setup (props, { emit }) {
    const currentPage = toRef(props, 'currentPage')
    const totalPage = toRef(props, 'totalPage')

    const pageList = computed(() => {
      const totalPageList = [...Array(totalPage.value).keys()]
      const start = currentPage.value - 2 >= 0 ? currentPage.value - 2 : 0
      const end = currentPage.value + 2
      return totalPageList.slice(start, end)
    })

    const setPage = (page) => {
      emit('setPage', page)
    }

    const setPrevPage = () => {
      if (currentPage.value !== 1) {
        setPage(currentPage.value - 1)
      }
    }

    const setNextPage = () => {
      if (currentPage.value !== totalPage.value) {
        setPage(currentPage.value + 1)
      }
    }

    return { pageList, setPrevPage, setNextPage, setPage }
  }
}
</script>
<style lang="scss" module>
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.5rem;
  width: 1.2rem;
  height: 1.2rem;
  font-size: 12px;
  color: $dark;
  cursor: pointer;
  user-select: none;
}

.page.currentPage {
  color: $white;
  background-color: $primary;
  cursor: unset;
}

.prevPage,
.nextPage {
  cursor: pointer;
  margin: 0 0.8rem;
}

.prevPage.disabled,
.nextPage.disabled {
  cursor: unset;
  opacity: 0.5;
}

</style>
