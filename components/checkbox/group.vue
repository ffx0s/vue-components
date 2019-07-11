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

<style lang="postcss">
.v-checkbox__group {
  & .v-cell__content {
    padding: 0;
  }
  & .v-cell__left {
    width: 100%;
  }
  & .v-cell__left .v-checkbox,
  & .v-cell__right .v-checkbox {
    padding-top: 11px;
    padding-bottom: 11px;
    width: 100%;
  }
  & .v-checkbox__text {
    font-size: 16px;
  }
  & .v-cell__right .v-checkbox {
    text-align: justify;
    color: var(--textPrimary);
  }
  & .v-cell__right .v-checkbox:after {
    display: inline-block;
    overflow: hidden;
    width: 100%;
    height: 0;
    content: '';
    vertical-align: top;
  }
}
</style>
