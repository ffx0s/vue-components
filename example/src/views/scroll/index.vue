<template>
  <div style="overflow: hidden">
    <Navbar title="Scroll" />
    <div class="scroll" ref="scroll">
      <div
        class="scroll-item"
        v-for="i in items"
        :key="i"
        :style="{ background: i }"
      >
        {{ i }}
      </div>
    </div>
  </div>
</template>

<script>
import ETouch from 'lvan/utils/etouch'
import { getTransform, view } from 'lvan/utils/shared'

const easeOutCubic = 'cubic-bezier(0.215, 0.61, 0.355, 1)'
const easeOutBack = 'cubic-bezier(.17,.88,.29,1.13)'

const getRandomColor = function() {
  return (
    '#' + ('00000' + ((Math.random() * 0x1000000) << 0).toString(16)).slice(-6)
  )
}

export default {
  name: 'page-scroll',
  data() {
    return {
      items: Array.from({ length: 30 }, () => getRandomColor())
    }
  },
  mounted() {
    this.transform = { y: 0, duration: 0 }

    this.rafUpdateElement = ETouch.rAFThrottle(this.updateElement)

    this.touch = new ETouch({
      el: this.$refs.scroll,
      lockDirection: true,
      position: () => this.transform
    })
      .on('down', this.down)
      .on('pandown panup', this.move)
      .on('panend', this.up)
  },
  beforeDestroy() {
    this.touch.destroy()
    this.touch = null
  },
  methods: {
    down(event) {
      ETouch.preventDefault(event)
      this.rafUpdateElement.cancel()

      const { y } = getTransform(this.$refs.scroll)
      this.updateElement(y, 0)
    },
    move(event, { position }) {
      ETouch.preventDefault(event)
      if (this.isTop()) {
        position.y *= 0.1
      }
      this.rafUpdateElement(position.y)
    },
    up(event, data) {
      const { direction, isSwipe } = this.touch
      if (direction === 'horizontal') return

      this.rafUpdateElement.cancel()

      if (isSwipe) {
        this.updateElement(this.transform.y + data.vy * 50, 2000, easeOutCubic)
      } else {
        if (this.isTop()) {
          this.updateElement(0, 500)
        } else {
          const value = this.isBottom()
          if (value) {
            this.updateElement(value, 500)
          }
        }
      }
    },
    updateElement(y, duration = 0, timing = null) {
      const style = this.$refs.scroll.style

      style.transform = style.webkitTransform = `
        translate3d(0, ${y}px, 0)
      `

      style.transitionTimingFunction = style.webkitTransitionTimingFunction = timing
      style.transitionDuration = style.webkitTransitionDuration = `${duration}ms`

      this.transform = { y, duration }
    },
    checkPosition(y) {
      const duration = 500 + Math.abs(this.touch.data.vy) * 10
      const timing = easeOutBack
      if (y >= 0) return { y: 0, duration, timing }

      const maxY = -(this.$refs.scroll.scrollHeight - view.height() + 56)
      if (y < maxY) return { y: maxY, duration, timing }
    },
    isTop() {
      return this.transform.y >= 0
    },
    isBottom() {
      const max = -(this.$refs.scroll.scrollHeight - view.height() + 56)
      return this.transform.y < max ? max : this.transform.y
    }
  }
}
</script>

<style lang="postcss">
.scroll {
  position: relative;
  z-index: -1;
}
.scroll-item {
  height: 150px;
  line-height: 150px;
  text-align: center;
  background-color: #fff;
}
</style>
