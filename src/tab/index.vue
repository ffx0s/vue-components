<template>
  <div class="v-tab">
    <slot name="header" />
    <TabNav
      v-bind="$attrs"
      :index="value"
      :tabs="tabs"
      @itemClick="itemClick"
      ref="nav"
    />
    <Swipe
      class="v-tab__content"
      :style="{
        top: navHeight + 'px',
        bottom: offset + 'px'
      }"
      :dot="false"
      :stopPropagation="false"
      :animationDuration="swipeAnimationDuration"
      v-model="index"
      @showPrev="scrollToTop"
      @showNext="scrollToTop"
      @panmove="lineMove"
      @panend="lineMoveTo"
      @beforeChange="beforeChange"
      @change="change"
      optimization
    >
      <SwipeItem
        class="v-tab__item"
        v-for="(tab, i) in $slots.default"
        :key="i"
        ref="swipeItem"
      >
        <VNode :node="tab" />
      </SwipeItem>
    </Swipe>
  </div>
</template>

<script>
import TabNav from './nav'
import VNode from '../vnode'
import Swipe from '../swipe'
import SwipeItem from '../swipe/item'
import Navbar from './handler/navbar'
import Header from './handler/header'
import { noBounce } from '../utils/scroll'

export default {
  name: 'Tab',
  components: {
    TabNav,
    VNode,
    Swipe,
    SwipeItem
  },
  props: {
    value: {
      type: Number,
      default: 0
    },
    offset: {
      type: Number,
      default: 0
    },
    // 是否有头部导航栏，有的话滑动的时候会隐藏头部导航栏
    navbar: {
      type: Boolean,
      default: false
    },
    // 是否有头部视图
    header: {
      type: Boolean,
      default: false
    },
    swipeAnimationDuration: Number
  },
  computed: {
    index: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
        return value
      }
    }
  },
  data() {
    return {
      tabs: [],
      navHeight: this.$attrs.navHeight || TabNav.props.navHeight.default
    }
  },
  mounted() {
    this.tabs = this.$refs.swipeItem.map(tab => tab.$children[0])
    this.tabs[this.value].load()

    let Handler

    if (this.header) {
      Handler = Header
    } else if (this.navbar) {
      Handler = Navbar
    }

    if (Handler) {
      this.handler = new Handler(this.$el, this.$refs.swipeItem, {
        offset: this.offset,
        tabIndex: this.value
      })
      noBounce()
    }
  },
  beforeDestroy() {
    if (this.handler) {
      this.handler.unbind()
      this.handler = null
    }
  },
  methods: {
    beforeChange(index) {
      if (this.handler) {
        this.handler.tabIndex = index
        this.handler.tabScrollToTop(index)
      }
    },
    change(index) {
      this.tabs[index].load()
      this.$refs.nav.select(index)
      this.handler && this.handler.resetState()
      this.$emit('change', index)
    },
    lineMove(current, x) {
      this.$refs.nav.lineMove(x)
    },
    lineMoveTo() {
      this.$refs.nav.lineMoveTo(this.value)
    },
    itemClick(index) {
      if (index === this.value) return
      this.$emit('input', index)
    },
    scrollToTop(index) {
      this.handler && this.handler.tabScrollToTop(index)
    }
  }
}
</script>

<style lang="postcss">
.v-tab {
  position: relative;
  height: 100%;
}
.v-tab__content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
}
.v-tab__item {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  & > .v-swipe__content {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
