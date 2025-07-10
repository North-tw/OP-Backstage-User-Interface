<template>
  <section
    class="container-lg d-flex align-items-center flex-wrap flex-grow-1 overflow-auto p-3"
    :class="$style.body"
  >
    <form @submit.prevent="readUser" class="row border border-2 border-primary p-3 mx-auto">
      <div class="col-12 mb-4 d-flex align-items-center justify-content-center">
        <img class="img-fluid me-3" src="~@/assets/imgs/logo-57.png">
        <h1 class="mb-0">
          <span class="letter-spacing-s">OP Backstage</span>
        </h1>
      </div>
      <div
        v-for="field in fieldList"
        :key="field"
        :class="styleMap?.[field] || ''"
      >
        <AppInputPassword
          v-if="field.toLowerCase().includes('password')"
          :id="field"
          v-model:input="state[field]"
          :type="field"
          :required="true"
          :label="labelMap[field].label"
          :placeholder="labelMap[field].placeholder"
          :err-message="v$[field]?.$errors[0]?.$message || ''"
          @focus="v$[field].$touch"
          @enter="readUser"
          autocomplete="current-password"
        />
        <AppInput
          v-else
          :id="field"
          v-model:input="state[field]"
          :type="field"
          :required="true"
          :autocomplete="'on'"
          :label="labelMap[field].label"
          :placeholder="labelMap[field].placeholder"
          :err-message="v$[field]?.$errors[0]?.$message || ''"
          @focus="v$[field].$touch"
          @enter="readUser"
        />
      </div>
      <div class="col-12">
        <button
          ref="loginBtn"
          class="btn bg-primary rounded-0 text-white w-100"
          type="submit"
        >
          Sign In
        </button>
      </div>
    </form>
  </section>
</template>
<script>
import AppInput from '@/components/AppInput.vue'
import AppInputPassword from '@/components/AppInputPassword.vue'
import { useMixin } from '@/helpers/useMixin'
import { requiredHelper, useVuelidate } from '@/helpers/useVuelidate.js'
import { reactive, toRef, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { useErrorMessage } from '@/helpers/useApiMessage.js'
import { useUser } from '@/helpers/useUser.js'

export default {
  name: 'LoginView',
  components: {
    AppInput,
    AppInputPassword
  },
  props: {

  },
  async setup (props) {
    const { setAlert } = useMixin()
    const { isLogin } = useUser()
    const userStore = useUserStore() 
    const { push, replace } = useRouter()
    const { getErrorMessage, isResponseSuccess } = useErrorMessage()

    const fieldList = ['account', 'password']

    const labelMap = {
      account: {
        label: 'account',
        placeholder: 'enter your account'
      },
      password: {
        label: 'password',
        placeholder: 'enter your password'
      }
    }

    const styleMap = {
      account: 'mb-4',
      password: 'mb-4',
    }

    if (isLogin(false, false)) {
      push('/')
    } 

    const state = reactive({
      account: '',
      password: '',
    })

    const rules = {
      account: { requiredHelper },
      password: { requiredHelper }
    }

    const v$ = useVuelidate(rules, state)

    const readUser = async () => {
      v$.value.$touch()

      const payload = {
        account: state.account,
        password: state.password
      }

      if (!v$.value.$error) {
        try {
          const response = await userStore.readUser(payload)
          if (isResponseSuccess(response)) {
            push('/')
            v$.value.$reset()
          } else {
            setAlert(true, false, getErrorMessage(response))
          }
        } catch (error) {
          setAlert(true, false, `登入失敗: ${error}`)
        }
      }
    }

    // await readKaptcha()

    return {
      v$,
      fieldList,
      styleMap,
      state,
      labelMap,
      readUser
    }
  }
}
</script>
<style lang="scss" module>
.body {
  max-width: 700px;
}

.height-80px {
  height: 80px;
}

.img-contain {
  width: 100%;
  height: 80px;
  min-height: 80px;
  object-fit: contain;
  object-position: top;
}
</style>
