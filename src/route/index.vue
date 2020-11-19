<template>
  <div class="v-route" :class="{ 'v-route--3d': translate3d }">
    <transition
      :name="transitionName"
      @afterEnter="emit('afterEnter', $el)"
      @afterLeave="emit('afterLeave', $el)"
      @enterCancelled="emit('enterCancelled', $el)"
      @leaveCancelled="emit('leaveCancelled', $el)"
    >
      <slot>
        <keep-alive v-bind="$attrs">
          <router-view class="v-route__view" />
        </keep-alive>
      </slot>
    </transition>
    <div class="v-route__overlay"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import { pageState, scroller } from './helpers'
import { noBounce } from '../utils/scroll'

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
      direction: pageState.direction
    }
  },
  computed: {
    transitionName() {
      const direction = this.direction

      if (!direction) return 'v-route--notransition'

      return `v-route-${this.effect}-${direction === 'forward' ? 'in' : 'out'}`
    }
  },
  created() {
    if (process.server) return

    const $animatedRoute = this

    $animatedRoute.scroller = scroller

    // 设置和保存滚动位置
    Vue.mixin({
      beforeRouteEnter(to, from, next) {
        if (to.fullPath === from.fullPath) return next()

        $animatedRoute.direction = pageState.updateDirection(to.fullPath)
        next(vm => {
          // 进入当前页面的路由时，滚动到之前的位置
          scroller.scrollTo(vm.$el, to.fullPath)
        })
      },
      beforeRouteLeave(to, from, next) {
        // 离开当前页面的路由时，保存页面滚动位置
        scroller.saveScrollTop(this.$el, from.fullPath)
        next()
      }
    })

    Vue.prototype.$animatedRoute = $animatedRoute
  },
  mounted() {
    pageState.saveToStorage()
    // 解决 IOS 两边手动测滑问题
    pageState.fixedSwipeBack()
    // 解决 safari 回弹效果无法滚动问题
    noBounce()
  },
  methods: {
    emit(name, el) {
      this.$emit(name, el)
    },
    getPageScrollData(pagePath) {
      return this.scroller.historyPage[pagePath]
    }
  }
}
</script>

<style lang="postcss">
@import './route.css';
</style>
