<template>
  <div class="animated-route" :class="{ 'animated-3d': translate3d }">
    <transition
      :name="transitionName"
      @afterEnter="afterEnter"
      @afterLeave="afterLeave"
      @enterCancelled="enterCancelled"
      @leaveCancelled="leaveCancelled"
    >
      <keep-alive v-bind="$attrs">
        <router-view class="animated-route-view" />
      </keep-alive>
    </transition>
    <div class="animated-overlay"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import { fixedSwipeBack, isForward, scroller } from './helpers'
import { fixedSpringback } from '../utils/shared'

const pageStatus = {}
const events = new Vue()

export default {
  name: 'AnimatedRoute',
  inheritAttrs: false,
  props: {
    effect: {
      type: String,
      default: 'ios'
    },
    translate3d: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      direction: ''
    }
  },
  computed: {
    transitionName() {
      return this.direction
        ? 'animated-' +
            (this.direction === 'forward'
              ? `${this.effect}-in`
              : `${this.effect}-out`)
        : 'animated-no-transition'
    }
  },
  created() {
    events.$on('updateDirection', this.updateDirection)
  },
  methods: {
    // 页面切换方向控制
    updateDirection(to, from) {
      this.direction = isForward(to, from)
        ? pageStatus.go
          ? ''
          : 'forward'
        : pageStatus.back
        ? ''
        : 'reverse'

      pageStatus.reset()
    },
    afterEnter(el) {
      events.$emit('afterEnter', el)
    },
    afterLeave(el) {
      events.$emit('afterLeave', el)
    },
    enterCancelled(el) {
      events.$emit('enterCancelled', el)
    },
    // leaveCancelled 只用于 v-show 中
    leaveCancelled(el) {
      events.$emit('leaveCancelled', el)
    }
  },
  install(Vue) {
    // 设置和保存滚动位置
    Vue.mixin({
      beforeRouteEnter(to, from, next) {
        events.$emit('updateDirection', to, from)
        next(vm => {
          // 进入当前页面的路由时，滚动到之前的位置
          scroller.scrollTo(vm.$el, to)
        })
      },
      beforeRouteLeave(to, from, next) {
        // 离开当前页面的路由时，保存页面滚动位置
        scroller.saveScrollTop(this.$el, from)
        next()
      }
    })

    Vue.prototype.$animatedRoute = events

    // 解决 safari 回弹效果无法滚动问题
    fixedSpringback(document.body)
    // 解决 IOS 两边手动测滑问题
    fixedSwipeBack(pageStatus)
  }
}
</script>

<style lang="postcss">
:root {
  --duration: 400ms;
}

/*ios <= 9 bug fixed*/
html,
body {
  overflow-x: hidden;
}

.animated-route {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9998;
  background-color: white;
}

.animated-route-view {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: inherit;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

.animated-3d {
  transform: translate3d(0, 0, 0);
}

/* 渐隐切换效果 */
.animated-fade-out-enter-active,
.animated-fade-out-leave-active,
.animated-fade-in-enter-active,
.animated-fade-in-leave-active {
  position: absolute;
  will-change: transform;
  transition: transform var(--duration) cubic-bezier(0.25, 0.46, 0.45, 0.94),
    opacity var(--duration);
  backface-visibility: hidden;
  perspective: 1000;
}

.animated-fade-out-enter-to,
.animated-fade-in-leave {
  transform: translate3d(0, 0, 0);
  opacity: 1;
}

.animated-fade-out-enter,
.animated-fade-in-leave-to {
  transform: translate3d(-80px, 0, 0);
  opacity: 0.3;
}

.animated-fade-out-leave-to,
.animated-fade-in-enter {
  opacity: 0.3;
  transform: translate3d(80px, 0, 0);
}

.animated-fade-out-leave,
.animated-fade-in-enter-to {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

/* IOS 切换效果 */
.animated-overlay {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  opacity: 0;
  display: none;
  z-index: 2;
  transition: opacity var(--duration);
}

.animated-ios-out-enter-active,
.animated-ios-out-leave-active,
.animated-ios-in-enter-active,
.animated-ios-in-leave-active {
  position: absolute;
  top: 0;
  will-change: transform;
  transition: transform var(--duration);
  backface-visibility: hidden;
  perspective: 1000;
}

.animated-ios-out-leave,
.animated-ios-out-leave-to {
  z-index: 4;
}

.animated-ios-out-leave,
.animated-ios-out-enter-to,
.animated-ios-in-leave,
.animated-ios-in-enter-to {
  transform: translate3d(0, 0, 0);
}

.animated-ios-out-leave-to,
.animated-ios-in-enter {
  transform: translate3d(100%, 0, 0);
}

.animated-ios-out-enter,
.animated-ios-in-leave-to {
  transform: translate3d(-30%, 0, 0);
}

.animated-ios-out-enter,
.animated-ios-in-enter-to {
  & + .animated-overlay {
    opacity: 1;
  }
}

.animated-ios-out-enter-to {
  & + .animated-overlay {
    opacity: 0;
    z-index: 3;
  }
}

.animated-ios-out-enter-active,
.animated-ios-in-enter-active {
  z-index: 3;
  & + .animated-overlay {
    display: block;
  }
}

.animated-no-transition-leave {
  display: none;
}

/* Android 切换效果 */
.animated-android-out-leave-active,
.animated-android-in-enter-active {
  position: absolute;
  top: 0;
  z-index: 2;
  will-change: transform;
  transition: transform var(--duration), opacity var(--duration);
  backface-visibility: hidden;
  perspective: 1000;
}
.animated-android-out-enter-active,
.animated-android-in-leave-active {
  transition-duration: var(--duration);
}
.animated-android-out-leave-to,
.animated-android-in-enter {
  opacity: 0;
  transform: translate3d(0, 46px, 0);
}
.animated-android-out-leave,
.animated-android-in-enter-to {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}
</style>
