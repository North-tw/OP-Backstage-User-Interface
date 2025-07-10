<template>
  <section
    class="container-lg d-flex align-items-center flex-wrap flex-grow-1 overflow-auto p-3"
    :class="$style.body"
  >
    <div class="d-flex flex-column align-items-start p-0 p-md-5">
      <div class="mb-5">
        <h5
          class="display-3 fw-normal"
          :class="$style.gradientText"
        >
          系統維護中
          <p class="display-6 mb-0">
            請稍後再試
          </p>
        </h5>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'SystemMaintenance'
}
</script>
<style lang="scss" module>
.header {
  height: $header-height;
}

.body {
  height: calc(100vh - #{$header-height});
  max-width: 700px;
}

.gradientText {
  background: linear-gradient(155deg, #249ba3, #82ca9a);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

</style>
