<template>
  <teleport to="#modalWrap">
    <div>
      <div
        :class="$style[`shadow`]"
        @click="setIsModalActive(false)"
      />
      <div
        class="modal-lg position-fixed top-50 start-50 translate-middle"
        :class="$style[`modal`]"
      >
        <div class="modal-content pop-up rounded-0">
          <div class="d-flex align-items-center justify-content-end">
            <slot
              name="header"
            />
            <div
              class="position-absolute d-flex p-3"
              role="button"
              aria-label="Close"
              @click="setIsModalActive(false)"
            >
              <AppIcon
                role="button"
                name="cross"
                class="icon-sm"
              />
            </div>
          </div>
          <div
            class="modal-body text-center py-3"
            :class="$style[`modal-body`]"
          >
            <div class="container-fluid">
              <div class="row">
                <slot name="body" />
              </div>
              <div
                class="row"
              >
                <div class="col-6">
                  <button
                    id="contactBtn"
                    type="button"
                    class="w-100 btn bg-primary text-white"
                    @click="setIsModalActive(false); callback()"
                  >
                    Yes
                  </button>
                </div>
                <div class="col-6">
                  <button
                    id="contactBtn"
                    type="button"
                    class="w-100 btn btn-outline-danger"
                    @click="setIsModalActive(false)"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>
<script>
export default {
  name: 'ConfirmModal',
  props: {
    callback: {
      type: Function,
      default: () => {}
    },
    setIsModalActive: {
      type: Function,
      default: () => {}
    }
  },
  setup () {
    return {
    }
  }
}
</script>
<style lang="scss" module>

.shadow {
  background-color: rgba($dark, 0.5);
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: calc(#{$zindex-modal} - 1);
}

.modal {
  max-width: 600px;
  width: 80vw;
  z-index: $zindex-modal;
}

.modal-body {
  max-height: 80vh;
  overflow-y: auto;
}

</style>
