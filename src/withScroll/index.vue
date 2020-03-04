<template>
  <div><slot /></div>
</template>

<script>
import {
  throttle,
  rAFThrottle,
  addListener,
  removeListener
} from '../utils/shared'

import {
  setScrollTop,
  getScrollTop,
  getScrollEventTarget
} from '../utils/scroll'

export default {
  name: 'WithScroll',
  props: {
    rAF: Boolean,
    wait: Number
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
      if (!this.isBind) return
      removeListener(this.scrollEl, 'scroll', this.handleScroll)
      this.isBind = false
      this.scrollEl = null
    },
    handleScroll() {
      this.scrollTop = getScrollTop(this.scrollEl)
      this.$emit('scroll', this.scrollTop)
    },
    setScrollTop(scrollTop) {
      setScrollTop(this.scrollEl, scrollTop)
    }
  }
}
</script>
