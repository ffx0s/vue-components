<template>
  <div
    class="v-scroll-toggle-wrap"
    :class="[
      { 'v-scroll-toggle-visible': visible },
      'v-scroll-toggle-' + position
    ]"
    :style="{ height: this.containerHeight + 'px' }"
  >
    <div
      class="v-scroll-toggle"
      :class="[
        initialClass,
        toggleClass && transitionClass,
        toggleClass,
        { 'v-scroll-toggle-notransition': noTransition }
      ]"
      ref="scrollToggle"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import Debouncer from '../../utils/debouncer'
import {
  addListener,
  removeListener,
  getScrollTop,
  getScrollEventTarget
} from '../../utils/shared'

export default {
  name: 'ScrollToggle',
  props: {
    // 禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 元素位置，默认头部，可选 top / bottom
    position: {
      type: String,
      default: 'top'
    },
    // 元素高度
    height: {
      type: Number,
      default: 0
    },
    // 滚动时的阻力
    resistance: {
      type: Number,
      default: 10
    },
    visible: {
      type: Boolean,
      default: true
    },
    pinnedClass: {
      type: String,
      default: 'v-scroll-toggle-pinned'
    },
    unpinnedClass: {
      type: String,
      default: 'v-scroll-toggle-unpinned'
    },
    transitionClass: {
      type: String,
      default: 'v-scroll-toggle-fixed'
    },
    initialClass: {
      type: String,
      default: 'v-scroll-toggle-initial'
    }
  },
  data() {
    const isTop = this.position === 'top'
    return {
      isTop,
      noTransition: isTop,
      isBind: false,
      toggleClass: '',
      lastScrollTop: 0,
      containerHeight: this.height
    }
  },
  mounted() {
    this.containerHeight =
      this.height || this.$refs.scrollToggle.firstChild.offsetHeight
    this.bind()
  },
  activated() {
    this.bind()
  },
  deactivated() {
    this.unbind()
  },
  beforeDestroy() {
    this.unbind()
  },
  methods: {
    bind() {
      if (this.isBind) return
      this.$nextTick(() => {
        this.scrollEl = getScrollEventTarget(this.$el)
        this.onscroll = new Debouncer(this.scrollHandler)
        addListener(this.scrollEl, 'scroll', this.onscroll)
      })
      this.isBind = true
    },
    unbind() {
      removeListener(this.scrollEl, 'scroll', this.onscroll)
      this.isBind = false
      this.scrollEl = null
    },
    scrollHandler() {
      if (this.disabled) return
      const scrollTop = getScrollTop(this.scrollEl)
      if (scrollTop <= 0) return this.restore()
      if (
        scrollTop < this.containerHeight &&
        this.toggleClass === this.unpinnedClass
      ) {
        this.pinned()
      } else if (
        Math.abs(this.lastScrollTop - scrollTop) >= this.resistance &&
        scrollTop > this.containerHeight
      ) {
        const action = scrollTop > this.lastScrollTop ? 'unpinned' : 'pinned'
        this[action]()
      }
      this.lastScrollTop = scrollTop
    },
    pinned() {
      this.toggleClass = this.pinnedClass
      this.noTransition = false
    },
    unpinned() {
      this.toggleClass = this.unpinnedClass
    },
    restore() {
      this.toggleClass = ''
      this.noTransition = this.isTop
    }
  }
}
</script>

<style lang="postcss">
.v-scroll-toggle-wrap {
  width: 100%;
  z-index: 99996;
  opacity: 0;
  transition: opacity 0.2s;
}
.v-scroll-toggle-visible {
  opacity: 1;
}
.v-scroll-toggle-pinned {
  transform: translateZ(0) translateY(0);
}
.v-scroll-toggle-top {
  position: relative;
}
.v-scroll-toggle-bottom {
  position: fixed;
  bottom: 0;
  transform: translateZ(0);
  & .v-scroll-toggle-unpinned {
    transform: translateZ(0) translateY(100%);
  }
}
.v-scroll-toggle-top {
  & .v-scroll-toggle-unpinned {
    transform: translateZ(0) translateY(-100%);
  }
}
.v-scroll-toggle-fixed {
  position: fixed;
  left: 0;
  width: 100%;
  z-index: 5;
  transition: 0.3s transform ease-in-out;
}
.v-scroll-toggle-notransition {
  transition-duration: 0s;
}
</style>
