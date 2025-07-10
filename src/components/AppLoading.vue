<template>
  <div
    :class="[[$style.loading], {[$style.active]: isLoading}]"
  >
    <div :class="[$style[`loading-wrap`]]">
      <div :class="[$style[`loading-item`]]" />
      <div :class="[$style[`loading-item`]]" />
      <div :class="[$style[`loading-item`]]" />
      <div :class="[$style[`loading-item`]]" />
    </div>
  </div>
</template>
<script>
import { computed } from 'vue-demi'
import { useAppStore } from '@/stores/index'

export default {
  name: 'AppLoading',
  setup () {
    const appStore = useAppStore()
    
    const isLoading = computed(() => appStore.getIsLoading)

    return { isLoading }
  }
}
</script>
<style lang="scss" module>

/* loading */
.loading{
  z-index: 2000;
  top: -100vw;
  left: 0;
  position: fixed;
  width: 0;
  height: 0;
  background-color: rgba(255,255,255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity .3s;
  opacity: 0;
}

.loading.active {
  top: 0;
  width: 100vw;
  height: 100vh;
  opacity: 1;
}

.loading .loading-wrap {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.loading .loading-wrap .loading-item {
  position: absolute;
  top: 33px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: $dark;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
@keyframes loading-animation1 {
  0% {
     transform: scale(0);
  }
  100% {
     transform: scale(1);
  }
}

@keyframes loading-animation2 {
  0% {
     transform: translate(0, 0);
  }
  100% {
     transform: translate(40px, 0);
  }
}

@keyframes loading-animation3 {
  0% {
     transform: scale(1);
  }
  100% {
     transform: scale(0);
  }
}
.loading .loading-wrap .loading-item:nth-child(1) {
  left: calc(0% - 7px);
  animation: loading-animation1 0.6s infinite;
}
.loading .loading-wrap .loading-item:nth-child(2) {
  left: calc(0% - 7px);
  animation: loading-animation2 0.6s infinite;
}
.loading .loading-wrap .loading-item:nth-child(3) {
  left: calc(50% - 7px);
  animation: loading-animation2 0.6s infinite;
}
.loading .loading-wrap .loading-item:nth-child(4) {
  left: calc(100% - 7px);
  animation: loading-animation3 0.6s infinite;
}

</style>
