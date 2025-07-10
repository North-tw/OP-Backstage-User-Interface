<template>
  <transition>
    <div
      v-if="alert.show"
      :class="[$style.alert, {[$style.failed]: !alert.success}]"
      class="d-flex flex-row align-items-center justify-content-between p-3 shadow-lg"
    >
      <div
        :class="$style.iconWrap"
        class="text-white"
      >
        <AppIcon
          v-if="alert.success"
          class="icon-xs m-1"
          name="check"
        />
        <AppIcon
          v-if="!alert.success"
          class="icon-xs m-1"
          name="exclamation"
        />
      </div>
      <p class="flex-grow-1 fw-bold text-start text-break mx-3 mb-0">
        {{ alert.text || '' }}
      </p>
      <button
        type="button"
        class="btn p-0 text-gray-500"
        @click="closeAlert"
      >
        <AppIcon
          name="cross"
          class="icon-sm"
        />
      </button>
    </div>
  </transition>
</template>
<script>
import { computed } from 'vue'
import { useAppStore } from '@/stores/index'
import { useMixin } from '@/helpers/useMixin'

export default {
  name: 'AppAlert',
  setup () {
    const appStore = useAppStore()
    const { setAlert } = useMixin()

    const alert = computed(() => appStore.getAlert)
    const closeAlert = () => {
      setAlert(false)
      setTimeout(() => {
        setAlert(false)
      }, 100)
    }

    return { alert, closeAlert }
  }
}
</script>
<style lang="scss" module>
  .alert {
    position: fixed;
    top: $header-height + 20px;
    right: 20px;
    z-index: 2000;
    min-width: 300px;
    max-width: 40%;
    color: $dark;
    background-color: $white;
    opacity: 1;
    transition: opacity 0.3s, transform 0.3s;
    border-top: solid 3px rgba($success, 0.8);
    transform: translate(0%, 10%);
    user-select: none;

    .iconWrap {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba($success, 0.8);
      border-radius: 50%;
    }

    &:global(.v-enter-from),
    &:global(.v-leave-to) {
      opacity: 0;
      transform: translate(0%, 0);
    }

    &.failed {
      border-top: solid 3px rgba($danger, 0.8);

      .iconWrap {
        background-color: rgba($danger, 0.8);
      }
    }
  }

</style>
