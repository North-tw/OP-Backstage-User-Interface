<template>
  <div
    class="position-relative"
  >
    <div class="d-flex flex-column">
      <div
        v-if="label !== ''"
        class="d-flex align-items-center order-first"
      >
        <span
          :for="id"
        >{{ label }}
          <span
            v-if="required"
            class="required"
          >*</span>：</span>
      </div>
      <Datepicker
        :id="id"
        v-model="inputValue"
        class="form-control"
        :class="[{'border-danger': errMessage!==''}, [disabled ? [$style[`bg-gray-300`]] : 'bg-light']]"
        :input-format="'yyyy-MM-dd'"
        :lower-limit="lowerLimit"
        :upper-limit="upperLimit"
        :clearable="false"
        :placeholder="placeholder"
        :disabled="disabled"
        :style="{'--vdp-selected-bg-color': '#82ca9a',
                 '--vdp-hover-bg-color': '#C0E4CC'}"
        @focus="$emit('focus')"
        @keydown.enter="$emit('enter')"
      />
    </div>
    <small
      class="text-danger position-absolute end-0 error-text"
      :class="{'show': errMessage!==''}"
    >{{ errMessage }}</small>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
import Datepicker from 'vue3-datepicker'

export default {
  name: 'AppInputDatePicker',
  components: { Datepicker },
  props: {
    input: {
      type: Object,
      default: null
    },
    lowerLimit: {
      type: Object,
      default: null
    },
    upperLimit: {
      type: Object,
      default: null
    },
    id: {
      type: String,
      default: ''
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
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['focus', 'enter', 'update:input'],
  setup (props, { emit }) {
    const inputValue = ref(props.input)
    const setInputValue = value => {
      inputValue.value = value
    }

    watch(inputValue, () => {
      emit('update:input', inputValue.value)
    })

    watch(() => props.input, () => {
      if (props.input !== inputValue.value) {
        setInputValue(props.input)
      }
    })

    return {
      inputValue
    }
  }
}
</script>

<style lang="scss" module>
.bg-gray-300{
  background-color: $gray-300;
}
</style>
