<template>
  <component
    :is="tag"
    class="v-tab-bar__item"
    :class="{ [activeClass]: isActive }"
    v-bind="$attrs"
    @click="click"
  >
    <div class="v-tab-bar__icon">
      <i :class="iconClass" v-if="iconClass" /><slot v-else name="icon" />
      <Badge v-if="badge !== undefined" :value="badge" />
    </div>
    <div class="v-tab-bar__title">
      <slot name="title">{{ title }}</slot>
    </div>
    <slot />
  </component>
</template>

<script>
import Badge from '../badge'

export default {
  name: 'TabBarItem',
  components: {
    Badge
  },
  inheritAttrs: false,
  props: {
    title: String,
    link: String,
    badge: String,
    tag: {
      type: String,
      default: 'div'
    },
    iconClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      index: 0
    }
  },
  computed: {
    currentIndex() {
      return this.$parent.value
    },
    isActive() {
      return this.currentIndex === this.index
    },
    activeClass() {
      return this.$parent.activeClass
    }
  },
  methods: {
    click() {
      if (this.link) {
        location.href = this.link
      } else {
        this.$parent.$emit('input', this.index)
        this.$emit('click', this.index)
      }
    }
  }
}
</script>

<style lang="postcss">
.v-tab-bar__item {
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 12px;
  color: var(--textPrimary);
  cursor: pointer;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
}
.v-tab-bar--active {
  color: var(--primary);
}
.v-tab-bar__icon {
  position: relative;
  width: 28px;
  height: 28px;
  font-size: 24px;
  text-align: center;
  & + .v-tab-bar__title {
    margin-bottom: -2px;
  }
  & .v-badge__number {
    position: absolute;
    top: -2px;
    left: 60%;
    display: table;
  }
  & .v-badge__circle {
    position: absolute;
    top: -2px;
    left: 70%;
  }
}
</style>
