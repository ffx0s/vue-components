<template>
  <div
    class="v-scroll-view"
    :class="[
      { 'v-scroll-view-hideBar': !scrollBar },
      { 'v-scroll-view-disabled': !scrollable }
    ]"
  >
    <!-- 垂直滚动 -->
    <template v-if="vertical">
      <div
        class="v-scroll-view-scroller v-scroll-view-vertical"
        @touchmove.stop="() => {}"
        ref="scroller"
      >
        <div class="v-scroll-view-slot"><slot /></div>
      </div>
      <template v-if="gradient">
        <div
          class="v-scroll-view-overlay-vertical"
          :style="{
            top: 0,
            background: setStyle('bottom')
          }"
        />
        <div
          class="v-scroll-view-overlay-vertical"
          :style="{
            bottom: 0,
            background: setStyle('top')
          }"
        />
      </template>
    </template>
    <!-- 水平滚动 -->
    <template v-else>
      <div
        class="v-scroll-view-scroller v-scroll-view-horizontal"
        @touchmove.stop="() => {}"
        ref="scroller"
      >
        <div :style="{ width }">
          <div class="v-scroll-view-slot" :style="slotStyle"><slot /></div>
        </div>
      </div>
      <template v-if="gradient">
        <div
          class="v-scroll-view-overlay-horizontal"
          :style="{
            left: 0,
            background: setStyle('right')
          }"
        />
        <div
          class="v-scroll-view-overlay-horizontal"
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
import animate from '../../utils/animate'

export default {
  name: 'ScrollView',
  props: {
    // 水平滚动
    horizontal: {
      type: Boolean,
      default: true
    },
    // 垂直滚动
    vertical: {
      type: Boolean,
      default: false
    },
    // 最大宽度，只作用于水平滚动
    maxWidth: {
      type: String,
      required: false,
      default: '5000px'
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
      return this.flex ? '100%' : this.maxWidth
    },
    slotStyle() {
      return this.flex ? { width: '100%' } : { float: 'left' }
    },
    scrollProps() {
      return this.horizontal ? 'scrollLeft' : 'scrollTop'
    }
  },
  methods: {
    setStyle(position) {
      return `linear-gradient(to ${position}, ${
        this.gradient
      }, rgba(255, 255, 255, 0))`
    },
    scrollTo(targetValue, transition = true) {
      const currentValue = this.getScrollValue()

      if (currentValue === targetValue) return

      this.animate && this.animate.stop()
      if (transition) {
        this.animate = animate({
          targets: [[currentValue, targetValue]],
          running: values => {
            this.$refs.scroller[this.scrollProps] = values[0]
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
          this.$refs.scroller[this.scrollProps] = values[0]
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

.v-scroll-view-scroller {
  width: 100%;
  height: 100%;
  user-select: none;
  -webkit-overflow-scrolling: touch;
}

.v-scroll-view-vertical {
  overflow-y: auto;
  overflow-x: hidden;
  & .v-scroll-view-slot {
    padding: 16px 0;
  }
}

.v-scroll-view-horizontal {
  overflow-x: auto;
  overflow-y: hidden;
  & .v-scroll-view-slot {
    padding: 0 16px;
  }
}

.v-scroll-view-disabled {
  & .v-scroll-view-scroller {
    overflow: hidden;
  }
}

.v-scroll-view-hideBar {
  overflow: hidden;
  & .v-scroll-view-scroller::-webkit-scrollbar {
    display: none;
  }
  & .v-scroll-view-vertical {
    padding-right: 15px;
  }
  & .v-scroll-view-horizontal {
    padding-bottom: 15px;
  }
}

.v-scroll-view-overlay-horizontal {
  position: absolute;
  top: 0;
  height: 100%;
  padding: 0 8px;
  pointer-events: none;
}

.v-scroll-view-overlay-vertical {
  position: absolute;
  left: 0;
  width: 100%;
  padding: 8px 0;
  pointer-events: none;
}
</style>
