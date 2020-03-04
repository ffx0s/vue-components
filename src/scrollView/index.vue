<template>
  <div
    class="v-scroll-view"
    :class="[
      { 'v-scroll-view--hidebar': !scrollBar },
      { 'v-scroll-view--disabled': !scrollable }
    ]"
  >
    <!-- 垂直滚动 -->
    <template v-if="vertical">
      <div class="v-scroll-view__area v-scroll-view--vertical" ref="scroller">
        <div class="v-scroll-view__slot"><slot /></div>
      </div>
      <template v-if="gradient">
        <div
          class="v-scroll-view__voverlay"
          :style="{
            top: 0,
            background: setStyle('bottom')
          }"
        />
        <div
          class="v-scroll-view__voverlay"
          :style="{
            bottom: 0,
            background: setStyle('top')
          }"
        />
      </template>
    </template>
    <!-- 水平滚动 -->
    <template v-else>
      <div class="v-scroll-view__area v-scroll-view--horizontal" ref="scroller">
        <div :style="{ width }">
          <div class="v-scroll-view__slot" :style="slotStyle"><slot /></div>
        </div>
      </div>
      <template v-if="gradient">
        <div
          class="v-scroll-view__hoverlay"
          :style="{
            left: 0,
            background: setStyle('right')
          }"
        />
        <div
          class="v-scroll-view__hoverlay"
          :style="{
            right: 0,
            background: setStyle('left')
          }"
        />
      </template>
    </template>
  </div>
</template>

<script>
import animate from '../utils/animate'

export default {
  name: 'ScrollView',
  props: {
    // 垂直滚动
    vertical: {
      type: Boolean,
      default: false
    },
    // 滚动宽度，只作用于水平滚动
    scrollWidth: {
      type: Number,
      default: 5000
    },
    // 两边遮罩层的渐变颜色
    gradient: {
      type: String,
      default: 'rgba(255, 255, 255, 1)'
    },
    scrollBar: {
      type: Boolean,
      default: true
    },
    // 是否为 flex 布局
    flex: {
      type: Boolean,
      default: false
    },
    scrollable: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    width() {
      return this.flex ? '100%' : this.scrollWidth + 'px'
    },
    slotStyle() {
      return this.flex ? { width: '100%' } : { float: 'left' }
    },
    scrollProps() {
      return this.vertical ? 'scrollTop' : 'scrollLeft'
    }
  },
  methods: {
    setStyle(position) {
      // eslint-disable-next-line
      return `linear-gradient(to ${position}, ${this.gradient}, rgba(255, 255, 255, 0))`
    },
    scrollTo(targetValue, transition = true) {
      const currentValue = this.getScrollValue()

      if (currentValue === targetValue) return

      this.animate && this.animate.stop()
      if (transition) {
        this.animate = animate({
          targets: [[currentValue, targetValue]],
          running: values => {
            this.$refs.scroller[this.scrollProps] = Math.ceil(values[0])
          }
        })
      } else {
        this.$refs.scroller[this.scrollProps] = targetValue
      }
    },
    scroll(value) {
      const currentValue = this.getScrollValue()
      const targetValue = currentValue + value
      this.animate && this.animate.stop()
      this.animate = animate({
        targets: [[currentValue, targetValue]],
        running: values => {
          this.$refs.scroller[this.scrollProps] = Math.ceil(values[0])
        }
      })
    },
    getScrollValue() {
      return this.$refs.scroller[this.scrollProps]
    }
  }
}
</script>

<style lang="postcss">
.v-scroll-view {
  position: relative;
  z-index: 2;
  background-color: #fff;
}

.v-scroll-view__area {
  width: 100%;
  height: 100%;
  user-select: none;
  -webkit-overflow-scrolling: touch;
}

.v-scroll-view--vertical {
  overflow-y: auto;
  overflow-x: hidden;
  touch-action: pan-y;
  & .v-scroll-view__slot {
    padding: 16px 0;
  }
}

.v-scroll-view--horizontal {
  overflow-x: auto;
  overflow-y: hidden;
  touch-action: pan-x;
  & .v-scroll-view__slot {
    padding: 0 16px;
  }
}

.v-scroll-view--disabled {
  & .v-scroll-view__area {
    overflow: hidden;
    touch-action: none;
  }
  & .v-scroll-view__hoverlay,
  & .v-scroll-view__voverlay {
    display: none;
  }
  & .v-scroll-view__slot {
    padding: 0;
  }
}

.v-scroll-view--hidebar {
  overflow: hidden;
  & .v-scroll-view__area::-webkit-scrollbar {
    display: none;
  }
  & .v-scroll-view--vertical {
    padding-right: 15px;
  }
  & .v-scroll-view--horizontal {
    padding-bottom: 15px;
  }
}

.v-scroll-view__hoverlay {
  position: absolute;
  top: 0;
  height: 100%;
  padding: 0 8px;
  pointer-events: none;
}

.v-scroll-view__voverlay {
  position: absolute;
  left: 0;
  width: 100%;
  padding: 8px 0;
  pointer-events: none;
}
</style>
