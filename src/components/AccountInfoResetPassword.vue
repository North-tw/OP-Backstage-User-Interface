<template>
  <div>
    <div class="card border-0 shadow">
      <div class="card-header bg-primary text-white border-0">
        Reset Password
      </div>
      <div class="card-body row">
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
            @focus="v$[field].$touch"
            @enter="updatePassword"
          />
        </div>
        <div class="d-flex justify-content-center">
          <button
            type="button"
            class="btn btn-primary w-100"
            @click="updatePassword"
          >
            Reset
          </button>
        </div>
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
      checkPassword: { requiredHelper, passwordHelper, sameAsRef: helpers.withMessage('Please make sure the two passwords match!', sameAs(resetPassword)) }

    }

    const v$ = useVuelidate(rules, state)

    const updatePassword = async () => {
      v$.value.$touch()
      if (!v$.value.$error) {
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
            logout()
            push('/login')
          } else {
            setAlert(true, false, getErrorMessage(response))
          }

          return response
        } catch (error) {
          setAlert(true, false, `Password reset failed: ${error}`)
          return Promise.reject(error)
        }
      }
    }
    return {
      fieldList,
      state,
      labelMap,
      styleMap,
      updatePassword,
      v$
    }
  }
}
</script>
<style lang="scss" module>

</style>
