<template>
  <div class="d-flex flex-column align-items-center justify-content-center h-100">
    <div class="d-flex flex-column align-items-start">
      <div class="mb-5">
        <h5
          class="display-3 fw-normal"
          :class="$style.gradientText"
        >
          Oops!
          <p class="display-6 mb-0">
            Page Not Found
          </p>
        </h5>
      </div>
      <div>
        <p class="mb-2">
          Perpehp u r looking for：
        </p>
        <div class="d-flex flex-column flex-md-row mb-3">
          <router-link
            to="/table-condition"
            class="text-decoration-none fw-bold d-flex align-items-center"
            :class="$style.gradientText"
          >
            Table Condition
            <AppIcon
              name="link"
              class="icon ms-1"
            />
          </router-link>
          <router-link
            to="/add-result"
            class="text-decoration-none fw-bold d-flex align-items-center ms-md-3"
            :class="$style.gradientText"
          >
            Add Result
            <AppIcon
              name="link"
              class="icon ms-1"
            />
          </router-link>
          <router-link
            to="/void-round-directly"
            class="text-decoration-none fw-bold ms-md-3"
            :class="$style.gradientText"
          >
            Void Round Directly
            <AppIcon
              name="link"
              class="icon ms-1"
            />
          </router-link>
          <router-link
            to="/result-history"
            class="text-decoration-none fw-bold ms-md-3"
            :class="$style.gradientText"
          >
            Result History
            <AppIcon
              name="link"
              class="icon ms-1"
            />
          </router-link>
        </div>
        <p
          class="small"
          :class="$style.hint"
        >
          If there is no activity, you will be redirected to the homepage in {{ countdown }} seconds.
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { onBeforeUnmount, ref } from 'vue-demi'
import { useRouter } from 'vue-router'
export default {
  name: 'NotFound',
  setup () {
    const { push } = useRouter()

    const countdown = ref(60)
    const countdownInterval = setInterval(() => {
      countdown.value -= 1

      if (countdown.value === 0) {
        clearInterval(countdownInterval)
        push('/')
      }
    }, 1000)

    onBeforeUnmount(() => {
      clearInterval(countdownInterval)
    })

    return {
      countdown
    }
  }
}
</script>
<style lang="scss" module>
.gradientText {
  background: linear-gradient(155deg, #249ba3, #82ca9a);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hint {
  color: rgba($dark, 0.6);
}

</style>
