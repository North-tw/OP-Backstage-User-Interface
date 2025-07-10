import { useAlertStore } from '@/stores/alert'

const getThousands = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+$)/g, ',')
}

const setAlert = (show, success, text) => {
  const alertStore = useAlertStore()
  alertStore.setAlert({ show, success, text })

  if (show) {
    setTimeout(() => {
      alertStore.setAlert({ show: false })
    }, 2000)
  }
}

const imageLoadError = (e) => {
  e.target.src = require('@/assets/imgs/nopic.gif')
}

const useMixin = () => {
  return {
    imageLoadError,
    getThousands,
    setAlert
  }
}

export {
  useMixin
}