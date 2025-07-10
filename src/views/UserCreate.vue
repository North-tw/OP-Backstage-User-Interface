<template>
  <div>
    <AppBreadcrumb :bread-crumbs="breadCrumbs" />
    <div class="d-flex align-items-center justify-content-between mb-3">
      <h3>新增使用者</h3>
    </div>
    <div class="container-fluid gx-0">
      <div class="row">
        <div
          v-for="field in fieldList"
          :key="field"
          class="mb-3"
          :class="styleMap[field]"
        >
          <div v-if="field==='groupID'">
            <div class="d-flex flex-row">
              <div class="col-4 position-relative">
                <div
                  class="d-flex align-items-center justify-content-start text-dark pe-2"
                  :class="$style['label']"
                >
                  <span
                    :for="field"
                  >{{ labelMap[field].label }}
                    <span
                      v-if="!!(v$[field]?.requiredHelper)"
                      class="required"
                    >*</span>：</span>
                </div>
                <small
                  class="text-danger position-absolute start-0 error-text"
                  :class="{'show': v$[field]?.$error}"
                >{{ v$[field]?.$errors[0]?.$message }}</small>
              </div>
              <div
                class="col-8 d-flex flex-column"
              >
                <div
                  v-for="group in groups"
                  :key="group.groupID"
                  class="form-check form-switch mb-2"
                >
                  <label
                    class="form-check-label"
                  >
                    <input
                      v-model="state.groupID"
                      :value="group.groupID"
                      type="checkbox"
                      class="form-check-input"
                    >
                    {{ group.groupName }}
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="v$[field]?.passwordHelper">
            <AppInputPassword
              :id="field"
              v-model:input="state[field]"
              :type="field"
              :required="!!(v$[field]?.requiredHelper)"
              :direction="'column'"
              :label="labelMap[field].label"
              :placeholder="labelMap[field].placeholder"
              :err-message="v$[field]?.$errors[0]?.$message || ''"
              :maxlength="15"
              @focus="v$[field].$touch"
              @enter="createUser"
            />
          </div>
          <div v-else>
            <AppInput
              :id="field"
              v-model:input="state[field]"
              :type="field"
              :required="!!(v$[field]?.requiredHelper)"
              :direction="'column'"
              :label="labelMap[field].label"
              :placeholder="labelMap[field].placeholder"
              :err-message="v$[field]?.$errors[0]?.$message || ''"
              :maxlength="field==='name' || field==='account' ? 20 : null"
              @focus="v$[field].$touch"
              @enter="createUser"
            />
          </div>
        </div>
        <div class="d-flex justify-content-center">
          <button
            type="button"
            class="btn btn-primary mx-2"
            @click="createUser"
          >
            新增使用者
          </button>
          <router-link
            class="btn btn-outline-danger mx-2"
            to="/user-list"
          >
            取消
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useMixin } from '@/helpers/useMixin'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import AppInput from '@/components/AppInput.vue'
import AppInputPassword from '@/components/AppInputPassword.vue'
import { requiredHelper, passwordHelper, helpers, sameAs, emailHelper, useVuelidate } from '@/helpers/useVuelidate.js'
import AppBreadcrumb from '@/components/AppBreadcrumb.vue'
import { useErrorMessage } from '@/helpers/useApiMessage.js'

export default {
  name: 'UserCreate',
  components: {
    AppInput, AppInputPassword, AppBreadcrumb
  },
  async setup () {
    const { setAlert } = useMixin()
    const { push } = useRouter()
    const { getters, dispatch } = useStore()
    const { getErrorMessage, isResponseSuccess, getSuccessMessage } = useErrorMessage()

    const groups = computed(() => getters['user/getGroups'])

    const breadCrumbs = ref([{ title: '用戶管理' }, { title: '新增使用者' }])

    const fieldList = [
      'account', 'pwd', 'checkPwd', 'name', 'mail', 'groupID'
    ]

    const pwd = ref('')

    const state = ref({
      account: '',
      pwd,
      checkPwd: '',
      name: '',
      mail: '',
      groupID: []
    })

    const labelMap = {
      account: {
        label: '使用者帳號',
        placeholder: '請輸入使用者帳號'
      },
      pwd: {
        label: '密碼',
        placeholder: '請輸入密碼'
      },
      checkPwd: {
        label: '確認密碼',
        placeholder: '請再次輸入密碼'
      },
      name: {
        label: '使用者名稱',
        placeholder: '請輸入使用者名稱'
      },
      mail: {
        label: 'E-mail',
        placeholder: '請輸入E-mail'
      },
      groupID: {
        label: '使用者權限',
        placeholder: '請輸入使用者權限'
      }
    }

    const styleMap = {
      account: 'col-12',
      pwd: 'col-6',
      checkPwd: 'col-6',
      name: 'col-6',
      mail: 'col-6',
      groupID: 'col-6'
    }

    const rules = {
      account: { requiredHelper },
      name: { requiredHelper },
      mail: { emailHelper },
      groupID: { requiredHelper },
      pwd: { requiredHelper, passwordHelper },
      checkPwd: { requiredHelper, passwordHelper, sameAsRef: helpers.withMessage('請確認兩次密碼是否一致', sameAs(pwd)) }

    }

    const v$ = useVuelidate(rules, state)

    const createUser = async () => {
      v$.value.$touch()
      if (!v$.value.$error) {
        const payload = {
          account: state.value.account,
          pwd: state.value.pwd,
          name: state.value.name,
          mail: state.value.mail,
          groupID: state.value.groupID
        }

        try {
          const response = await dispatch('user/createUser', { payload })

          // getErrorMessage
          if (isResponseSuccess(response)) {
            setAlert(true, true, getSuccessMessage(response))
            push('/user-list')
          } else {
            setAlert(true, false, getErrorMessage(response))
          }

          return response
        } catch (error) {
          setAlert(true, false, `更新失敗: ${error}`)
          return Promise.reject(error)
        }
      }
    }

    const readGroups = async () => {
      const payload = {
        offset: 0,
        pageSize: 100
      }

      try {
        const response = await dispatch('user/readGroups', { payload })

        // getErrorMessage
        if (!isResponseSuccess(response)) {
          setAlert(true, false, getErrorMessage(response))
        }

        return response
      } catch (error) {
        return Promise.reject(error)
      }
    }

    await readGroups()

    return {
      breadCrumbs,
      groups,
      fieldList,
      state,
      labelMap,
      styleMap,
      createUser,
      v$
    }
  }
}
</script>
<style lang="scss" module>
.label {
  color: $gray-600;
  transition: opacity 0.3s;
}

.number {
  width: 50px;
}

.auth {
  width: 180px;
}

.buttons {
  width: 140px;
}

</style>
