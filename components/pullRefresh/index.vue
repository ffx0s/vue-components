<template>
  <div
    class="v-pull-refresh"
    @touchstart="pointerdown"
    @touchmove="pointermove"
    @touchend="pointerup"
    @mousedown="onMousedown"
  >
    <div class="v-pull-refresh__main" :style="style">
      <div class="v-pull-refresh__head" :class="stateClass">
        <slot name="head">
          <div
            class="v-pull-refresh__wave"
            :style="waveStyle"
            v-show="showWave"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentcolor"
              viewBox="0 0 64 5.5"
            >
              <path d="M0 0 Q32 11 64 0"></path>
            </svg>
          </div>
          <!-- 上下拉状态 -->
          <div class="v-pull-refresh__arrow"></div>
          <!-- 刷新中 -->
          <transition name="v-fade">
            <Loading v-show="stateClass === loadingClass" size="32" />
          </transition>
          <!-- 刷新成功 -->
          <div class="v-pull-refresh__checkmark"></div>
          <!-- 加载失败 -->
          <div class="v-pull-refresh__text">{{ failedText }}</div>
        </slot>
      </div>
      <slot />
    </div>
  </div>
</template>

<script>
import Loading from '../loading'
import { Handler, mouseMove } from '../utils/event'
import {
  sleep,
  browser,
  getScrollEventTarget,
  getScrollTop,
  isTouchDevice
} from '../utils/shared'

export default {
  name: 'PullRefresh',
  components: {
    Loading
  },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    animationDuration: {
      type: Number,
      default: 500
    },
    wait: {
      type: Number,
      default: 600
    },
    loadingDuration: {
      type: Number,
      default: 200
    },
    threshold: {
      type: Number,
      default: 50
    },
    failed: {
      type: Boolean,
      default: false
    },
    downClass: {
      type: String,
      default: 'v-pull-refresh--down'
    },
    upClass: {
      type: String,
      default: 'v-pull-refresh--up'
    },
    loadingClass: {
      type: String,
      default: 'v-pull-refresh--loading'
    },
    successClass: {
      type: String,
      default: 'v-pull-refresh--success'
    },
    failedClass: {
      type: String,
      default: 'v-pull-refresh--failed'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    waveColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0)'
    },
    failedText: {
      type: String,
      default: '刷新失败'
    },
    wave: {
      type: Boolean,
      default: true
    },
    // 下拉滑动的时候是否阻止冒泡
    stopPropagation: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      duration: 0,
      translateY: 0,
      waveTranslateY: 0,
      stateClass: '',
      isLoading: false,
      showWave: false
    }
  },
  computed: {
    style() {
      return {
        transitionDuration: `${this.duration}ms`,
        transform: `translate3d(0, ${this.translateY}px, 0)`
      }
    },
    waveStyle() {
      return {
        transitionDuration: `${this.duration}ms`,
        transform: `translate3d(0, ${this.waveTranslateY}px, 0)`,
        color: this.waveColor
      }
    },
    sholudLoad() {
      return this.translateY > this.threshold
    }
  },
  watch: {
    value: {
      handler: function(isLoading) {
        isLoading ? this.load() : this.loaded()
      },
      immediate: true
    }
  },
  created() {
    this.scrollTop = 0
    this.handler = new Handler({
      isPreventDefault: this.isPreventDefault,
      isStopPropagation: this.isStopPropagation,
      pandown: this.update,
      panup: this.update
    })
  },
  mounted() {
    const { android, ios } = browser()
    if (ios || (android && parseFloat(android) >= 5.1)) {
      this.showWave = this.wave
    }
    this.scrollEl = getScrollEventTarget(this.$el)
  },
  beforeDestroy() {
    this.handler = null
    this.scrollEl = null
  },
  methods: {
    pointerdown(event) {
      if (this.disabled) return
      this.duration = 0
      this.handler.start(event)
    },
    pointermove(event) {
      if (this.disabled) return
      this.scrollTop = getScrollTop(this.scrollEl)
      this.handler.move(event)
    },
    pointerup() {
      if (this.disabled) return
      this.handler.up()
      if (this.sholudLoad && this.shouldUpdate()) {
        this.load()
      } else if (this.translateY !== 0) {
        this.reset()
      }
    },
    onMousedown(event) {
      if (isTouchDevice()) return
      event.preventDefault()
      this.pointerdown(event)
      mouseMove(this.pointermove, this.pointerup)
    },
    isPreventDefault() {
      return this.scrollTop <= 0 && this.handler.is('pandown')
    },
    isStopPropagation() {
      return this.stopPropagation && this.handler.is('pandown')
    },
    update(x, y) {
      if (!this.shouldUpdate()) return
      this.stateClass = this.sholudLoad ? this.upClass : this.downClass
      this.translateY += y / 2
      this.waveTranslateY = Math.min(this.translateY, 50)
    },
    async load() {
      if (this.isLoading) return
      this.duration = this.animationDuration
      this.isLoading = true
      this.translateY = this.threshold
      this.waveTranslateY = 0
      this.stateClass = this.loadingClass
      await sleep(this.loadingDuration)
      this.$emit('input', true)
      this.$emit('refresh', this.loaded)
    },
    async loaded() {
      if (this.isLoading) {
        this.stateClass = this.failed ? this.failedClass : this.successClass
        await sleep(this.wait)
        this.reset()
        this.$emit('input', false)
      }
    },
    shouldUpdate() {
      return !this.isLoading && this.handler.moved && this.scrollTop === 0
    },
    reset() {
      this.translateY = this.waveTranslateY = 0
      this.duration = this.animationDuration
      this.stateClass = ''
      this.isLoading = false
    }
  }
}
</script>

<style lang="postcss">
:root {
  --checkWidth: 8px;
  --checkHeight: 16px;
}
.v-pull-refresh {
  min-height: 70%;
  user-select: none;
  overflow: hidden;
}
.v-pull-refresh__main {
  position: relative;
  height: 100%;
  transition-property: transform;
}
.v-pull-refresh__head {
  position: absolute;
  top: -50px;
  width: 100%;
  min-height: 50px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  & .v-loading {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    color: var(--textSecondary);
  }
}

/* 默认加载动画 */
.v-pull-refresh--down .v-pull-refresh__arrow {
  opacity: 1;
}
.v-pull-refresh--up .v-pull-refresh__arrow {
  opacity: 1;
  transform: rotate(45deg);
}
.v-pull-refresh--loading {
  & .v-pull-refresh__arrow {
    opacity: 0;
    transform: rotate(45deg);
  }
}
.v-pull-refresh--success {
  & .v-pull-refresh__checkmark {
    display: block;
  }
}
.v-pull-refresh--failed {
  & .v-pull-refresh__text {
    opacity: 1;
  }
}
.v-pull-refresh__text {
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}
.v-pull-refresh__arrow {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: 20px auto auto;
  width: 12px;
  height: 12px;
  border-top: 3px solid var(--border);
  border-left: 3px solid var(--border);
  transform: rotate(225deg);
  opacity: 0;
  transition: 0.3s ease;
}
.v-pull-refresh__checkmark {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  width: 40px;
  height: 40px;
  display: none;
  &:after {
    position: absolute;
    top: 21px;
    left: 9px;
    animation: v-pull-refresh-checkmark 800ms ease;
    transform: scaleX(-1) rotate(135deg);
    height: var(--checkHeight);
    width: var(--checkWidth);
    transform-origin: left top;
    border-right: 3px solid var(--border);
    border-top: 3px solid var(--border);
    content: '';
  }
}
@keyframes v-pull-refresh-checkmark {
  0% {
    height: 0;
    width: 0;
    opacity: 1;
  }
  20% {
    height: 0;
    width: var(--checkWidth);
    opacity: 1;
  }
  40% {
    height: var(--checkHeight);
    width: var(--checkWidth);
    opacity: 1;
  }
  100% {
    height: var(--checkHeight);
    width: var(--checkWidth);
    opacity: 1;
  }
}
.v-pull-refresh__wave {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  transition-property: transform;
}
</style>
