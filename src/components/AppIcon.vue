<template>
  <svg>
    <use :xlink:href="`#icon-${name}`" />
  </svg>
</template>
<script>
export default {
  name: 'AppIcon',
  props: {
    name: {
      type: String,
      default: ''
    }
  }

}
</script>
