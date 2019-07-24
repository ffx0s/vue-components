<template>
  <div class="v-checkbox__group"><slot /></div>
</template>

<script>
const name = 'CheckboxGroup'

export default {
  name,
  props: {
    value: {
      type: Array,
      default: () => []
    },
    max: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      name
    }
  }
}
</script>
