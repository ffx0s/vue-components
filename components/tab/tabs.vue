<template>
  <div class="v-tab">
    <TabNav
      v-bind="$attrs"
      :index="value"
      :tabs="tabs"
      @itemClick="tabNavItemClick"
      ref="nav"
    />
    <Swipe
      class="v-tab-content"
      :style="{
        top: navHeight + 'px'
      }"
      :dot="false"
      :stopPropagation="false"
      :touchmove="tabMove"
      v-model="index"
      @up="tabUp"
      @change="tabChange"
      optimization
    >
      <SwipeItem
        class="v-tab-item"
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
import Swipe from '../swipe/swipe'
import SwipeItem from '../swipe/item'
import ScrollHandler from './scrollHandler'

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
    header: {
      type: Boolean,
      default: true
    }
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
    if (this.header) {
      this.scrollHandler = new ScrollHandler(this.$el, this.$refs.swipeItem)
    }
  },
  beforeDestroy() {
    this.scrollHandler && this.scrollHandler.unbind()
    this.scrollHandler = null
  },
  methods: {
    tabChange(index) {
      this.tabs[index].load()
      this.$refs.nav.select(index)
      this.scrollHandler && this.scrollHandler.resetState()
      this.$emit('change', index)
    },
    tabMove(current, x) {
      this.$refs.nav.lineMove(x)
    },
    tabUp() {
      this.$refs.nav.lineMoveTo(this.value)
    },
    tabNavItemClick(index) {
      if (index === this.value) return
      this.$emit('input', index)
    }
  }
}
</script>

<style lang="postcss">
.v-tab {
  position: relative;
  height: 100%;
}
.v-tab-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
}
.v-tab-item {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  & > .v-swipe-item-content {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
