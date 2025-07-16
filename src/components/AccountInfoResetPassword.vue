<template>
  <div>
    <div class="card border-0 shadow">
      <div class="card-header bg-primary text-white border-0">
        Reset Password
      </div>
      <div class="card-body">
        <form @submit.prevent="updatePassword" novalidate>
          <div class="row">
            <div
              v-for="field in fieldList"
              :key="field"
              class="mb-3"
              :class="styleMap[field]"
            >
              <AppInputPassword
                :id="field"
                v-model:input="state[field]"
                :type="field"
                :required="!!(v$[field]?.requiredHelper)"
                :label="labelMap[field].label"
                :placeholder="labelMap[field].placeholder"
                :err-message="v$[field]?.$errors[0]?.$message || ''"
                :autocomplete="getAutocomplete(field)"
                @focus="v$[field].$touch"
                @enter="updatePassword"
              />
            </div>
            <div class="col-12 d-flex justify-content-center">
              <button
                type="submit"
                class="btn btn-primary w-100"
                :disabled="isLoading || !isFormValid"
                :class="{ 'btn-secondary': !isFormValid }"
              >
                <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status"></span>
                <i v-if="!isFormValid && !isLoading" class="fas fa-lock me-2"></i>
                Reset Password
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useVuelidate, requiredHelper, passwordHelper, helpers, sameAs } from '@/helpers/useVuelidate.js'
import AppInputPassword from '@/components/AppInputPassword.vue'
import { useErrorMessage } from '@/helpers/useApiMessage.js'
import { useUser } from '@/helpers/useUser.js'
import { useMixin } from '@/helpers/useMixin.js'

export default {
  name: 'AccountInfoResetPassword',
  components: {
    AppInputPassword
  },
  async setup () {
    const { logout } = useUser()
    const { push } = useRouter()
    const userStore = useUserStore()
    const { setAlert } = useMixin()
    const { getErrorMessage, isResponseSuccess } = useErrorMessage()

    const account = computed(() => userStore.getAccount)

    const fieldList = [
      'originPassword', 'resetPassword', 'checkPassword'
    ]

    const resetPassword = ref('')
    const isLoading = ref(false)

    const state = ref({
      originPassword: '',
      resetPassword,
      checkPassword: ''
    })

    const labelMap = {
      originPassword: {
        label: 'Original Password',
        placeholder: 'Enter your original password'
      },
      resetPassword: {
        label: 'New Password',
        placeholder: 'Enter your new password'
      },
      checkPassword: {
        label: 'Confirm New Password',
        placeholder: 'Enter your new password again'
      }
    }

    const styleMap = {
      originPassword: 'col-12',
      resetPassword: 'col-12',
      checkPassword: 'col-12'
    }

    const rules = {
      originPassword: { requiredHelper },
      resetPassword: { requiredHelper, passwordHelper },
      checkPassword: { 
        requiredHelper, 
        passwordHelper, 
        sameAsRef: helpers.withMessage('Please make sure the two passwords match!', sameAs(resetPassword)) 
      }
    }

    const v$ = useVuelidate(rules, state)

    // 計算表單是否有效 - 主要的防呆機制
    const isFormValid = computed(() => {
      // 檢查所有欄位是否有值
      const hasAllValues = fieldList.every(field => {
        const value = state.value[field]
        return value && value.toString().trim() !== ''
      })

      // 如果沒有所有值，直接返回 false
      if (!hasAllValues) {
        return false
      }

      // 檢查是否有任何驗證錯誤
      // 先觸發所有驗證
      v$.value.$touch()
      
      // 檢查每個欄位是否通過驗證
      const isValid = !v$.value.$error && fieldList.every(field => {
        const fieldValidation = v$.value[field]
        return fieldValidation && !fieldValidation.$error
      })

      return isValid
    })

    // 為不同的密碼欄位提供適當的 autocomplete 屬性
    const getAutocomplete = (field) => {
      switch (field) {
        case 'originPassword':
          return 'current-password'
        case 'resetPassword':
          return 'new-password'
        case 'checkPassword':
          return 'new-password'
        default:
          return 'off'
      }
    }

    const resetForm = () => {
      state.value.originPassword = ''
      state.value.resetPassword = ''
      state.value.checkPassword = ''
      v$.value.$reset()
    }

    const updatePassword = async () => {
      // 雙重檢查：即使按鈕被禁用，也要確保表單有效
      if (!isFormValid.value) {
        setAlert(true, false, 'Please complete all fields correctly before submitting.')
        return
      }

      v$.value.$touch()
      if (!v$.value.$error) {
        isLoading.value = true

        const payload = {
          account: account.value,
          oldPassword: state.value.originPassword,
          newPassword: state.value.resetPassword
        }

        try {
          const response = await userStore.updatePassword(payload)

          // getErrorMessage
          if (isResponseSuccess(response)) {
            setAlert(true, true, 'Password reset successful, please log in again')
            resetForm()
            logout()
            push('/login')
          } else {
            setAlert(true, false, getErrorMessage(response))
          }

          return response
        } catch (error) {
          setAlert(true, false, `Password reset failed: ${error.message || error}`)
          return Promise.reject(error)
        } finally {
          isLoading.value = false
        }
      }
    }

    return {
      fieldList,
      state,
      labelMap,
      styleMap,
      updatePassword,
      getAutocomplete,
      isLoading,
      isFormValid,
      v$
    }
  }
}
</script>

<style lang="scss" module>

</style>