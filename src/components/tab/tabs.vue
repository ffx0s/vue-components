<template>
  <div class="v-tab">
    <ScrollView
      class="v-tab-title v-bd-y-bottom"
      :style="tabBarStyle"
      :scrollable="scrollable"
      :scrollBar="false"
      flex
      ref="tabBar"
    >
      <dl class="v-tab-title-inner" :class="{ 'v-tab-scrollable': scrollable }">
        <dt
          :class="{ 'v-tab-active': index === value }"
          v-for="(tabBarItem, index) in tabBarItems"
          :key="index"
          :style="{ color: index === value ? activeTextColor : null }"
          @click="tabClick(index)"
          ref="tabBarItem"
        >
          <span class="v-tab-title" v-if="tabBarItem.title">
            {{ tabBarItem.title }}
          </span>
          <VNode
            v-else-if="tabBarItem.$slots.title"
            :node="tabBarItem.$slots.title[0]"
          />
        </dt>
        <dd class="v-tab-line" :style="lineStyle" ref="line"></dd>
      </dl>
    </ScrollView>

    <Swipe
      class="v-tab-content"
      :style="tabContentStyle"
      :dot="false"
      :stopPropagation="false"
      optimization
      v-model="swipeIndex"
      :touchmove="touchmove"
      @change="slideChange"
      @stop="$emit('stop', value)"
    >
      <SwipeItem
        class="v-tab-item"
        v-for="(tab, index) in $slots.default"
        :key="index"
        ref="tabs"
      >
        <VNode :node="tab" />
      </SwipeItem>
    </Swipe>
  </div>
</template>

<script>
import VNode from '../vnode'
import ScrollView from '../scrollView'
import Swipe from '../swipe/swipe'
import SwipeItem from '../swipe/item'
import { view } from '../../utils/shared'
import { properties } from '../../styles/variables'

export default {
  name: 'Tab',
  components: {
    VNode,
    ScrollView,
    Swipe,
    SwipeItem
  },
  props: {
    value: {
      type: Number,
      default: 0
    },
    scrollThreshold: {
      type: Number,
      default: 4
    },
    lineColor: {
      type: String,
      default: properties.primary
    },
    activeTextColor: {
      type: String,
      default: properties.primary
    },
    lineAnimationDuration: {
      type: Number,
      default: 500
    },
    tabBarHeight: {
      type: Number,
      default: 44
    }
  },
  computed: {
    scrollable() {
      return this.tabs.length > this.scrollThreshold
    },
    swipeIndex: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
        return value
      }
    },
    lineStyle() {
      return {
        width: this.lineWidth + 'px',
        transitionDuration: `${this.duration}ms`,
        transform: `translateX(${this.translate}px)`,
        backgroundColor: this.lineColor
      }
    },
    tabBarStyle() {
      return {
        height: this.tabBarHeight + 'px',
        lineHeight: this.tabBarHeight + 'px'
      }
    },
    tabContentStyle() {
      return {
        top: this.tabBarHeight + 'px'
      }
    }
  },
  data() {
    return {
      tabs: [],
      tabBarItems: [],
      translate: 0,
      duration: 0,
      lineWidth: 0
    }
  },
  mounted() {
    this.tabs = this.$refs.tabs
    this.tabBarItems = this.tabs.map(tab => tab.$children[0])
    this.$nextTick(() => {
      setTimeout(() => {
        this.tabBarScrollTo(this.value, false)
        this.lineScrollTo(this.value, false)
        this.tabBarItems[this.value].load()
      })
    })
  },
  methods: {
    getBarItemWidth() {
      return (
        this.tabBarItemWidth ||
        (this.tabBarItemWidth = this.$refs.tabBarItem[0].getBoundingClientRect().width)
      )
    },
    getBarItemTextWidth(index) {
      const textEl = this.$refs.tabBarItem[index].querySelector('.v-tab-title')
      const itemWidth = this.getBarItemWidth()
      return textEl ? Math.min(textEl.offsetWidth, itemWidth) : itemWidth
    },
    getMaxScrollValue() {
      return this.tabs.length * this.getBarItemWidth() - view.getWidth()
    },
    tabBarScrollTo(index, transition) {
      if (!this.scrollable) return
      const width = this.getBarItemWidth()
      const offsetLeft = width * index + 8 // 数值8为样式边距
      const value = offsetLeft - view.getWidth() / 2 + width / 2
      const scrollValue = Math.max(Math.min(this.getMaxScrollValue(), value), 0)
      const tabBar = this.$refs.tabBar
      tabBar.scrollTo(scrollValue, transition)
    },
    lineScrollTo(index, transition = true) {
      const width = this.getBarItemWidth()
      const textWidth = this.getBarItemTextWidth(index)
      const value = (width - textWidth) / 2
      this.lineWidth = textWidth
      this.duration = transition ? this.lineAnimationDuration : 0
      this.translate = index * width + value
    },
    slideChange(index) {
      this.lineScrollTo(index)
      this.tabBarItems[index].load()
      if (index !== this.value) {
        this.tabBarScrollTo(index)
        this.$emit('change', index)
      }
    },
    touchmove(targetValue, x) {
      this.duration = 0
      this.translate -= x * 0.1
    },
    tabClick(index) {
      if (index === this.value) return
      this.tabBarScrollTo(index)
      this.$emit('input', index)
      this.$emit('change', index)
    }
  }
}
</script>

<style lang="postcss">
.v-tab {
  position: relative;
  height: 100%;
}
.v-tab-title-inner {
  display: flex;
  position: relative;
  left: -8px;
  margin: 0;
  padding: 0;
  list-style: none;
  height: 44px;
  line-height: 44px;
  text-align: center;
  &.v-tab-scrollable {
    & dt {
      flex: 0 0 22%;
      width: 22%;
    }
  }
  & dt {
    flex: 1;
    box-sizing: border-box;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    transition: 0.3s color;
    &.v-tab-active .v-tab-line {
      display: block;
    }
  }
}
.v-tab-line {
  position: absolute;
  left: 0;
  bottom: 0;
  margin: 0;
  width: 40px;
  height: 3px;
  transition-property: transform, width;
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
