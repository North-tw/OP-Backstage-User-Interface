import { ref } from 'vue'

export function usePagination(defaultPerPage = 50) {
  const pageInfo = ref({
    page: 1,
    perPage: defaultPerPage,
    total: 0,
    totalPage: 0
  })

  // 重設分頁
  function resetPagination() {
    pageInfo.value.page = 1
    pageInfo.value.perPage = defaultPerPage
    pageInfo.value.total = 0
    pageInfo.value.totalPage = 0
  }

  // 從 API 回傳更新分頁
  function updatePaginationFromResponse(responsePage) {
    pageInfo.value.page = responsePage.page || 1
    pageInfo.value.perPage = responsePage.perPage || defaultPerPage
    pageInfo.value.total = responsePage.total || 0
    pageInfo.value.totalPage = responsePage.totalPage || 0
  }

  return {
    pageInfo,
    resetPagination,
    updatePaginationFromResponse
  }
}