<template>
  <div class="v-group">
    <div v-if="title || $slots.title" class="v-group__title">
      <slot name="title">{{ title }}</slot>
    </div>
    <components
      :is="tag"
      class="v-group__cells"
      :class="{ 'v-bd-top-bottom': border }"
    >
      <slot />
    </components>
  </div>
</template>

<script>
const name = 'Group'

export default {
  name,
  props: {
    title: String,
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
  -webkit-tap-highlight-color: transparent;
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
