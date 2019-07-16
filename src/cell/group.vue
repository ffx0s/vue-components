<template>
  <components :is="tag" class="v-group">
    <div v-if="title || $slots.title" class="v-group__title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="v-group__cells" :class="{ 'v-bd-top-bottom': border }">
      <slot />
    </div>
  </components>
</template>

<script>
const name = 'Group'

export default {
  name,
  props: {
    title: {
      type: String,
      required: false
    },
    labelWidth: {
      type: [String, Number],
      default: 0
    },
    labelAlign: {
      type: String,
      default: 'left'
    },
    valueAlign: {
      type: String,
      default: 'right'
    },
    border: {
      type: Boolean,
      default: true
    },
    tag: {
      type: String,
      default: 'div'
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
.v-group {
  margin-bottom: 15px;
  overflow: hidden;
}
.v-group__cells {
  background-color: #fff;
}
.v-group .v-cell:last-child .v-cell__content.v-bd-bottom:after {
  display: none;
}
.v-group__title {
  padding: 10px 14px;
  font-size: 16px;
  color: var(--textRegular);
}
</style>
