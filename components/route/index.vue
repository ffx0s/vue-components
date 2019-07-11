<template>
  <div class="v-route" :class="{ 'v-route--3d': translate3d }">
    <transition
      :name="transitionName"
      @afterEnter="afterEnter"
      @afterLeave="afterLeave"
      @enterCancelled="enterCancelled"
      @leaveCancelled="leaveCancelled"
    >
      <keep-alive v-bind="$attrs">
        <router-view class="v-route__view" />
      </keep-alive>
    </transition>
    <div class="v-route__overlay"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import { fixedSwipeBack, isForward, scroller } from './helpers'
import { fixedSpringback } from '../utils/shared'

const pageStatus = {}

export default {
  name: 'VRoute',
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
        ? 'v-route-' +
            (this.direction === 'forward'
              ? `${this.effect}-in`
              : `${this.effect}-out`)
        : 'v-route--notransition'
    }
  },
  created() {
    const $animatedRoute = this

    $animatedRoute.scroller = scroller

    // 设置和保存滚动位置
    Vue.mixin({
      beforeRouteEnter(to, from, next) {
        $animatedRoute.updateDirection(to, from)

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

    Vue.prototype.$animatedRoute = $animatedRoute

    // 解决 safari 回弹效果无法滚动问题
    fixedSpringback(document.body)
    // 解决 IOS 两边手动测滑问题
    fixedSwipeBack(pageStatus)
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
      this.$emit('afterEnter', el)
    },
    afterLeave(el) {
      this.$emit('afterLeave', el)
    },
    enterCancelled(el) {
      this.$emit('enterCancelled', el)
    },
    // leaveCancelled 只用于 v-show 中
    leaveCancelled(el) {
      this.$emit('leaveCancelled', el)
    },
    getPageScrollData(pagePath) {
      return this.scroller.historyPage[pagePath]
    }
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

.v-route {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9998;
  background-color: white;
}

.v-route__view {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: inherit;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

.v-route--3d {
  transform: translate3d(0, 0, 0);
}

/* 渐隐切换效果 */
.v-route-fade-out-enter-active,
.v-route-fade-out-leave-active,
.v-route-fade-in-enter-active,
.v-route-fade-in-leave-active {
  position: absolute;
  will-change: transform;
  transition: transform var(--duration) cubic-bezier(0.25, 0.46, 0.45, 0.94),
    opacity var(--duration);
  backface-visibility: hidden;
  perspective: 1000;
}

.v-route-fade-out-enter-to,
.v-route-fade-in-leave {
  transform: translate3d(0, 0, 0);
  opacity: 1;
}

.v-route-fade-out-enter,
.v-route-fade-in-leave-to {
  transform: translate3d(-80px, 0, 0);
  opacity: 0.3;
}

.v-route-fade-out-leave-to,
.v-route-fade-in-enter {
  opacity: 0.3;
  transform: translate3d(80px, 0, 0);
}

.v-route-fade-out-leave,
.v-route-fade-in-enter-to {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

/* IOS 切换效果 */
.v-route__overlay {
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

.v-route-ios-out-enter-active,
.v-route-ios-out-leave-active,
.v-route-ios-in-enter-active,
.v-route-ios-in-leave-active {
  position: absolute;
  top: 0;
  will-change: transform;
  transition: transform var(--duration);
  backface-visibility: hidden;
  perspective: 1000;
}

.v-route-ios-out-leave,
.v-route-ios-out-leave-to {
  z-index: 4;
}

.v-route-ios-out-leave,
.v-route-ios-out-enter-to,
.v-route-ios-in-leave,
.v-route-ios-in-enter-to {
  transform: translate3d(0, 0, 0);
}

.v-route-ios-out-leave-to,
.v-route-ios-in-enter {
  transform: translate3d(100%, 0, 0);
}

.v-route-ios-out-enter,
.v-route-ios-in-leave-to {
  transform: translate3d(-30%, 0, 0);
}

.v-route-ios-out-enter,
.v-route-ios-in-enter-to {
  & + .v-route__overlay {
    opacity: 1;
  }
}

.v-route-ios-out-enter-to {
  & + .v-route__overlay {
    opacity: 0;
    z-index: 3;
  }
}

.v-route-ios-out-enter-active,
.v-route-ios-in-enter-active {
  z-index: 3;
  & + .v-route__overlay {
    display: block;
  }
}

.v-route--notransition-leave {
  display: none;
}

/* Android 切换效果 */
.v-route-android-out-leave-active,
.v-route-android-in-enter-active {
  position: absolute;
  top: 0;
  z-index: 2;
  will-change: transform;
  transition: transform var(--duration), opacity var(--duration);
  backface-visibility: hidden;
  perspective: 1000;
}
.v-route-android-out-enter-active,
.v-route-android-in-leave-active {
  transition-duration: var(--duration);
}
.v-route-android-out-leave-to,
.v-route-android-in-enter {
  opacity: 0;
  transform: translate3d(0, 46px, 0);
}
.v-route-android-out-leave,
.v-route-android-in-enter-to {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}
</style>
