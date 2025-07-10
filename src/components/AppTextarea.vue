
<template>
  <div class="position-relative d-flex flex-column">
    <textarea
      :id="id"
      v-model.trim="inputValue"
      autocomplete="autocomplete"
      class="form-control"
      :class="[$style.input, {'border-danger': errMessage!==''}]"
      :maxlength="maxlength"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="updateInput($event)"
      @focus="$emit('focus')"
    />
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
  name: 'AppTextarea',
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
    autocomplete: {
      type: String,
      default: 'off'
    },
    maxlength: {
      type: Number,
      default: 100
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['focus', 'update:input'],
  setup (props, { emit }) {
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
      inputValue, updateInput
    }
  }
}
</script>

<style lang="scss" module>
.input {
  height: 200px;
  resize: none;
}

.errorText {
  opacity: 0;
  transition: opacity 0.3s;
  transform: translateY(100%);

  &.show {
    opacity: 1;
  }
}

</style>
