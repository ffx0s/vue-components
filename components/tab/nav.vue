<template>
  <ScrollView
    class="v-bd-y-bottom"
    :style="navStyle"
    :scrollable="scrollable"
    :scrollBar="false"
    flex
    ref="scrollView"
  >
    <dl class="v-tab-nav" :class="{ 'v-tab-nav-scrollable': scrollable }">
      <dt
        v-for="(tab, i) in tabs"
        :key="i"
        :class="{ [activeClass]: i === index }"
        @click="$emit('itemClick', i)"
        ref="item"
      >
        <span :class="titleClass" v-if="tab.title"> {{ tab.title }} </span>
        <VNode v-else-if="tab.$slots.title" :node="tab.$slots.title[0]" />
      </dt>
      <dd class="v-tab-nav-line" :style="lineStyle"></dd>
    </dl>
  </ScrollView>
</template>

<script>
import ScrollView from '../scrollView'
import VNode from '../vnode'
import { view } from '../utils/shared'
import { properties } from '../styles/variables'

export default {
  name: 'TabNav',
  components: {
    ScrollView,
    VNode
  },
  props: {
    tabs: Array,
    index: Number,
    lineAnimationDuration: {
      type: Number,
      default: 500
    },
    lineColor: {
      type: String,
      default: properties.primary
    },
    navHeight: {
      type: Number,
      default: 44
    },
    scrollThreshold: {
      type: Number,
      default: 4
    },
    activeClass: {
      type: String,
      default: 'v-tab-nav-active'
    },
    titleClass: {
      type: String,
      default: 'v-tab-nav-title'
    }
  },
  data() {
    return {
      lineWidth: 0,
      translate: 0,
      duration: 0
    }
  },
  computed: {
    scrollable() {
      return this.tabs.length > this.scrollThreshold
    },
    lineStyle() {
      return {
        width: this.lineWidth + 'px',
        transitionDuration: `${this.duration}ms`,
        transform: `translateX(${this.translate}px)`,
        backgroundColor: this.lineColor
      }
    },
    navStyle() {
      return {
        height: this.navHeight + 'px',
        lineHeight: this.navHeight + 'px'
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.select(this.index, false)
    })
  },
  methods: {
    getItemWidth() {
      return (
        this.itemWidth ||
        (this.itemWidth = this.$refs.item[0].getBoundingClientRect().width)
      )
    },
    getTitleWidth(index) {
      const title = this.$refs.item[index].querySelector('.' + this.titleClass)
      const itemWidth = this.getItemWidth()
      return title ? Math.min(title.offsetWidth, itemWidth) : itemWidth
    },
    getMaxScrollValue() {
      return this.tabs.length * this.getItemWidth() - view.getWidth()
    },
    select(index, transition) {
      this.scrollTo(index, transition)
      this.lineMoveTo(index, transition)
    },
    scrollTo(index, transition) {
      if (!this.scrollable) return
      const width = this.getItemWidth()
      const offsetLeft = width * index + 8 // 数值8为样式边距
      const value = offsetLeft - view.getWidth() / 2 + width / 2
      const scrollValue = Math.max(Math.min(this.getMaxScrollValue(), value), 0)
      this.$refs.scrollView.scrollTo(scrollValue, transition)
    },
    lineMoveTo(index, transition = true) {
      const width = this.getItemWidth()
      const titleWidth = this.getTitleWidth(index)
      const value = (width - titleWidth) / 2
      this.lineWidth = titleWidth
      this.duration = transition ? this.lineAnimationDuration : 0
      this.translate = index * width + value
    },
    lineMove(x) {
      this.duration = 0
      this.translate -= x * 0.1
    }
  }
}
</script>

<style lang="postcss">
.v-tab-nav {
  display: flex;
  position: relative;
  left: -8px;
  margin: 0;
  padding: 0;
  list-style: none;
  height: 44px;
  line-height: 44px;
  text-align: center;
  & dt {
    flex: 1;
    box-sizing: border-box;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    transition: 0.3s color;
  }
}
.v-tab-nav-scrollable {
  & dt {
    flex: 0 0 22%;
    width: 22%;
  }
}
.v-tab-nav-line {
  position: absolute;
  left: 0;
  bottom: 0;
  margin: 0;
  width: 40px;
  height: 3px;
  transition-property: transform, width;
}
.v-tab-nav-active {
  color: var(--primary);
}
</style>
