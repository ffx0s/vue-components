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

<style lang="postcss">
.v-radio-group {
  & .v-radio + .v-radio {
    margin-left: 0;
  }
  & > .v-radio {
    margin-right: 15px;
    margin-bottom: 15px;
  }
}
</style>
