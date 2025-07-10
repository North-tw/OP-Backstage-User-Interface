<template>
  <div class="position-relative d-flex flex-column">
    <div class="position-relative d-flex flex-column">
      <!-- input -->
      <input
        :id="id"
        v-model="inputValue"
        class="form-control"
        :class="[$style.input, {'border-danger': errMessage!==''}]"
        :type="[showPassword ? 'text' : 'password']"
        :maxlength="maxlength"
        :placeholder="placeholder"
        @input="updateInput($event)"
        @focus="$emit('focus')"
        @keydown.enter="$emit('enter')"
      >
      <!-- label -->
      <div
        v-if="label !== ''"
        class="order-first d-flex align-items-center text-gray-600 small"
      >
        <span :for="id">{{ label }}
          <span
            v-if="required"
            class="text-danger"
          >*</span>：</span>
      </div>
      <!-- eyeIcon -->
      <div
        class="position-absolute end-0 text-primary me-3"
        :class="$style.eyeIcon"
      >
        <div
          v-if="showPassword"
          role="button"
          class="d-flex align-items-center justify-content-center"
          @click="setShowPassword(false)"
        >
          <AppIcon
            name="eye"
            class="icon-sm"
          />
        </div>
        <div
          v-if="!showPassword"
          role="button"
          class="d-flex align-items-center justify-content-center"
          @click="setShowPassword(true)"
        >
          <AppIcon
            name="eye-close"
            class="icon-sm"
          />
        </div>
      </div>
    </div>
    <!-- errorText -->
    <small
      class="text-danger position-absolute bottom-0 end-0"
      :class="[$style.errorText,{[$style.show]: errMessage!==''}]"
    >{{ errMessage }}</small>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'

export default {
  name: 'AppInputPassword',
  props: {
    input: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: 'text'
    },
    errMessage: {
      type: String,
      default: ''
    },
    maxlength: {
      type: Number,
      default: 100
    }
  },
  emits: ['focus', 'enter', 'update:input'],
  setup (props, { emit }) {
    const showPassword = ref(false)
    const setShowPassword = (show) => {
      showPassword.value = show
    }

    const inputValue = ref(props.input)
    const setInputValue = value => {
      inputValue.value = value
    }
    const updateInput = event => {
      emit('update:input', event.target.value)
    }

    watch(() => props.input, () => {
      if (props.input !== inputValue.value) {
        setInputValue(props.input)
      }
    })

    return {
      inputValue, updateInput, showPassword, setShowPassword
    }
  }
}
</script>

<style lang="scss" module>

.input {
  padding-right: calc(map-get($spacers, 3) * 2 + $icon-size-sm);
  }

.errorText {
  opacity: 0;
  transition: opacity 0.3s;
  transform: translateY(100%);

  &.show {
    opacity: 1;
  }
}

.eyeIcon {
  bottom: calc($input-padding-y + $input-border-width + ($input-font-size * $input-line-height) / 2 - $icon-size-sm / 2);
}
</style>
