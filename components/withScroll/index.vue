<template>
  <div><slot /></div>
</template>

<script>
import {
  throttle,
  rAFThrottle,
  addListener,
  removeListener,
  setScrollTop,
  getScrollTop,
  getScrollEventTarget
} from '../utils/shared'

export default {
  name: 'WithScroll',
  props: {
    rAF: Boolean,
    wait: Number,
    onscroll: {
      type: Function,
      default: () => {}
    }
  },
  mounted() {
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
    this.handleScroll = null
  },
  methods: {
    bind() {
      if (this.isBind) return
      this.handleScroll = this.rAF
        ? rAFThrottle(this.handleScroll)
        : throttle(this.handleScroll, this.wait)
      this.scrollEl = getScrollEventTarget(this.$el)
      addListener(this.scrollEl, 'scroll', this.handleScroll)
      this.isBind = true
    },
    unbind() {
      removeListener(this.scrollEl, 'scroll', this.handleScroll)
      this.isBind = false
      this.scrollEl = null
    },
    handleScroll() {
      this.scrollTop = getScrollTop(this.scrollEl)
      this.onscroll(this.scrollTop)
    },
    setScrollTop(scrollTop) {
      setScrollTop(this.scrollEl, scrollTop)
    }
  }
}
</script>
