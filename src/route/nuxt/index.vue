<template>
  <div class="v-route" :class="{ 'v-route--3d': translate3d }">
    <nuxt class="v-route__view" :class="routerViewClass" v-bind="$attrs" />
    <div class="v-route__overlay"></div>
  </div>
</template>

<script>
import { pageState } from '../helpers'
import { noBounce } from '../../utils/scroll'

export default {
  name: 'VRoute',
  inheritAttrs: false,
  props: {
    translate3d: {
      type: Boolean,
      default: true
    },
    routerViewClass: {
      type: String,
      default: ''
    }
  },
  mounted() {
    pageState.saveToStorage()
    // 解决 IOS 两边手动测滑问题
    pageState.fixedSwipeBack()
    // 解决 safari 回弹效果无法滚动问题
    noBounce()
  }
}
</script>

<style lang="postcss">
@import '../route.css';
</style>
