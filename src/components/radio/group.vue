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
  & .v-cell-content {
    padding: 0;
  }
  & .v-cell-left {
    width: 100%;
  }
  & .v-cell-left .v-radio,
  & .v-cell-right .v-radio {
    padding-top: 11px;
    padding-bottom: 11px;
    width: 100%;
  }
  & .v-radio-text {
    font-size: 16px;
  }
  & .v-cell-right .v-radio {
    text-align: justify;
    color: var(--textPrimary);
  }
  & .v-cell-right .v-radio:after {
    display: inline-block;
    overflow: hidden;
    width: 100%;
    height: 0;
    content: '';
    vertical-align: top;
  }
}
</style>
