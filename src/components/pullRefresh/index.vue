<template>
  <div
    class="v-pull-refresh"
    @touchstart="pointerdown"
    @touchmove="pointermove"
    @touchend="pointerup"
    @mousedown="onMousedown"
  >
    <div class="v-pull-refresh-main" :style="style">
      <div class="v-pull-refresh-head" :class="pullRefreshClass">
        <slot name="head">
          <!-- 上下拉状态 -->
          <div class="v-pull-refresh-arrow"></div>
          <!-- 刷新中 -->
          <transition name="v-fade">
            <Loading v-show="pullRefreshClass === loadingClass" size="32" />
          </transition>
          <!-- 刷新成功 -->
          <div class="v-pull-refresh-checkmark"></div>
          <!-- 加载失败 -->
          <div class="v-pull-refresh-failed-content">刷新失败</div>
        </slot>
      </div>
      <slot />
    </div>
  </div>
</template>

<script>
import Loading from '../../components/loading'
import { Handler, mouseMove } from '../../utils/event'
import {
  getScrollEventTarget,
  getScrollTop,
  sleep,
  isTouchDevice
} from '../../utils/shared'

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
    waiting: {
      type: Number,
      default: 600
    },
    loadingDuration: {
      type: Number,
      default: 200
    },
    threshold: {
      type: Number,
      default: 40
    },
    failed: {
      type: Boolean,
      default: false
    },
    downClass: {
      type: String,
      default: 'v-pull-refresh-down'
    },
    upClass: {
      type: String,
      default: 'v-pull-refresh-up'
    },
    loadingClass: {
      type: String,
      default: 'v-pull-refresh-loading'
    },
    successClass: {
      type: String,
      default: 'v-pull-refresh-success'
    },
    failedClass: {
      type: String,
      default: 'v-pull-refresh-failed'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      duration: 0,
      translateY: 0,
      pullRefreshClass: '',
      isLoading: false,
      scrollTop: 0
    }
  },
  computed: {
    style() {
      return {
        transitionDuration: `${this.duration}ms`,
        transform: `translate3d(0,${this.translateY}px, 0)`
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
    this.handler = new Handler({
      isPreventDefault: this.isPreventDefault,
      isStopPropagation: this.isStopPropagation,
      onDown: this.update,
      onUp: this.update
    })
  },
  mounted() {
    this.scrollEl = getScrollEventTarget(this.$el)
  },
  beforeDestroy() {
    this.handler = null
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
      if (!this.shouldUpdate()) return
      if (this.sholudLoad) {
        this.load()
        this.duration = this.animationDuration
      } else {
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
      return this.scrollTop <= 0 && this.handler.is('Down')
    },
    isStopPropagation() {
      return this.handler.is('Down')
    },
    update(x, y) {
      if (!this.shouldUpdate()) return
      this.pullRefreshClass = this.sholudLoad ? this.upClass : this.downClass
      this.translateY += y / 2
    },
    async load() {
      if (this.isLoading) return
      this.isLoading = true
      this.translateY = this.threshold
      this.pullRefreshClass = this.loadingClass
      await sleep(this.loadingDuration)
      this.$emit('input', true)
      this.$emit('refresh', this.loaded)
    },
    async loaded() {
      if (this.isLoading) {
        this.pullRefreshClass = this.failed
          ? this.failedClass
          : this.successClass
        await sleep(this.waiting)
        this.reset()
        this.$emit('input', false)
      }
    },
    shouldUpdate() {
      return !this.isLoading && this.handler.moved && this.scrollTop === 0
    },
    reset() {
      this.translateY = 0
      this.duration = this.animationDuration
      this.pullRefreshClass = ''
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
.v-pull-refresh-main {
  position: relative;
  height: 100%;
  transition-property: transform;
}
.v-pull-refresh-head {
  position: absolute;
  top: -50px;
  width: 100%;
  min-height: 50px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
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
.v-pull-refresh-down .v-pull-refresh-arrow {
  opacity: 1;
}
.v-pull-refresh-up .v-pull-refresh-arrow {
  opacity: 1;
  transform: rotate(45deg);
}
.v-pull-refresh-loading {
  & .v-pull-refresh-arrow {
    opacity: 0;
    transform: rotate(45deg);
  }
}
.v-pull-refresh-success {
  & .v-pull-refresh-checkmark {
    display: block;
  }
}
.v-pull-refresh-failed {
  & .v-pull-refresh-failed-content {
    opacity: 1;
  }
}
.v-pull-refresh-failed-content {
  opacity: 0;
  transition: opacity 0.3s ease;
}
.v-pull-refresh-arrow {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: 20px auto auto;
  width: 12px;
  height: 12px;
  border-top: 3px solid var(--gray);
  border-left: 3px solid var(--gray);
  transform: rotate(225deg);
  opacity: 0;
  transition: 0.3s ease;
}
.v-pull-refresh-checkmark {
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
    border-right: 3px solid var(--gray);
    border-top: 3px solid var(--gray);
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
</style>
