<template>
  <div class="v-pull-refresh">
    <div class="v-pull-refresh__main" ref="main">
      <div class="v-pull-refresh__head" :class="stateClass">
        <slot name="head">
          <div
            class="v-pull-refresh__wave"
            v-if="showWave"
            :style="{ color: waveColor }"
            ref="wave"
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
import ETouch from '../utils/etouch'
import {
  sleep,
  browser,
  getScrollEventTarget,
  getScrollTop
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
      default: true
    }
  },
  data() {
    return {
      stateClass: '',
      isLoading: false,
      showWave: false
    }
  },
  watch: {
    value: {
      handler: function(isLoading) {
        isLoading ? this.$nextTick(this.load) : this.loaded()
      },
      immediate: true
    }
  },
  created() {
    this.scrollTop = 0
    this.duration = 0
    this.mainOffset = 0
    this.waveOffset = 0
  },
  mounted() {
    const { android, ios } = browser()
    if (ios || (android && parseFloat(android) >= 5.1)) {
      this.showWave = this.wave
    }

    this.updateElement = ETouch.rAFThrottle(this.updateElement)

    this.touch = new ETouch({
      el: this.$el,
      lockDirection: ETouch.VERTICAL
    })
      .on('pandown panup', this.panmove)
      .on('panend', this.panend)

    this.scrollEl = getScrollEventTarget(this.$el)
  },
  beforeDestroy() {
    this.touch.destroy()
    this.touch = null
    this.scrollEl = null
  },
  methods: {
    panmove(event) {
      if (this.disabled) return

      this.scrollTop = getScrollTop(this.scrollEl)

      if (!this.isLoading) {
        if (this.touch.is('pandown') && this.scrollTop === 0) {
          ETouch.preventDefault(event)
        }

        if (this.stopPropagation && this.mainOffset > 0) {
          event.stopPropagation()
        }
      }

      this.updateElement()
    },
    panend() {
      if (this.disabled) return

      if (this.sholudLoad() && this.shouldUpdate()) {
        this.load()
      } else if (!this.isLoading && this.mainOffset !== 0) {
        this.reset()
      }
    },
    updateElement() {
      if (!this.shouldUpdate()) return

      const value = Math.max(this.mainOffset + this.touch.data.vy / 2, 0)

      if (this.duration) {
        this.setDuration(0)
      }

      this.setTranslate('main', value).setTranslate('wave', Math.min(value, 50))
      this.stateClass = this.sholudLoad() ? this.upClass : this.downClass
    },
    async load() {
      if (this.isLoading) return

      this.isLoading = true

      this.setDuration(this.animationDuration)
        .setTranslate('main', this.threshold)
        .setTranslate('wave', 0)
      this.stateClass = this.loadingClass

      await sleep(this.loadingDuration)

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
    sholudLoad() {
      return this.mainOffset > this.threshold
    },
    shouldUpdate() {
      return !this.isLoading && this.touch.moved && this.scrollTop <= 0
    },
    reset() {
      this.setDuration(this.animationDuration)
        .setTranslate('main', 0)
        .setTranslate('wave', 0)
      this.stateClass = ''
      this.isLoading = false
    },
    setTranslate(name, value) {
      const el = this.$refs[name]

      if (el) {
        const style = el.style
        const transform = value === 0 ? null : `translate3d(0, ${value}px, 0)`

        style.transform = style.webkitTransform = transform
        this[`${name}Offset`] = value
      }

      return this
    },
    setDuration(duration) {
      ;['main', 'wave'].forEach(name => {
        const el = this.$refs[name]

        if (el) {
          const style = el.style
          // eslint-disable-next-line prettier/prettier
          style.transitionDuration =
          style.webkitTransitionDuration = `${duration}ms`
        }
      })

      this.duration = duration

      return this
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
