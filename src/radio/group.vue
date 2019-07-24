<template>
  <div class="v-radio-group"><slot /></div>
</template>

<script>
const name = 'RadioGroup'

export default {
  name,
  props: {
    value: {
      type: [Number, String],
      default: ''
    }
  },
  data() {
    return {
      name
    }
  }
}
</script>
