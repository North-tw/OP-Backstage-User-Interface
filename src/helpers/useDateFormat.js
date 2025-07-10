export function formatDateTime(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const pad = (n) => n.toString().padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} `
    + `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

// Vue plugin 寫法
export const useDateFormat = {
  install(app) {
    app.config.globalProperties.$formatDateTime = formatDateTime
  }
}