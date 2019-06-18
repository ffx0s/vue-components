<template>
  <ScrollView
    class="v-bd-y-bottom"
    :style="navStyle"
    :scrollBar="false"
    :scrollWidth="scrollWidth"
    ref="scrollView"
  >
    <dl class="v-tab-nav" ref="nav">
      <dt
        v-for="(tab, i) in tabs"
        :key="i"
        :class="{ [activeClass]: i === index }"
        @click="$emit('itemClick', i)"
        ref="item"
      >
        <span class="v-tab-nav-title" v-if="tab.title"> {{ tab.title }} </span>
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
    lineHeight: {
      type: Number,
      default: 3
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
    }
  },
  data() {
    return {
      lineWidth: 0,
      translate: 0,
      duration: 0,
      scrollWidth: 5000
    }
  },
  computed: {
    lineStyle() {
      return {
        width: this.lineWidth + 'px',
        height: this.lineHeight + 'px',
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
    this.padding = 16
    this.$nextTick(() => {
      this.getScrollWidth()
      this.select(this.index, false)
    })
  },
  methods: {
    getScrollWidth() {
      const scrollWidth =
        this.$refs.nav.getBoundingClientRect().width + this.padding * 2
      this.scrollWidth = scrollWidth
      return scrollWidth
    },
    getItemWidth(index) {
      return this.$refs.item[index].getBoundingClientRect().width
    },
    getItemOffsetLeft(index) {
      return this.$refs.item[index].offsetLeft
    },
    getMaxScrollValue() {
      return this.scrollWidth - view.getWidth()
    },
    select(index, transition) {
      this.scrollTo(index, transition)
      this.lineMoveTo(index, transition)
    },
    scrollTo(index, transition) {
      const width = this.getItemWidth(index)
      const offsetLeft = this.getItemOffsetLeft(index) + this.padding
      const value = offsetLeft - view.getWidth() / 2 + width / 2
      const scrollValue = Math.max(Math.min(this.getMaxScrollValue(), value), 0)
      this.$refs.scrollView.scrollTo(scrollValue, transition)
    },
    lineMoveTo(index, transition = true) {
      const width = this.getItemWidth(index)
      this.lineWidth = width
      this.duration = transition ? this.lineAnimationDuration : 0
      this.translate = this.getItemOffsetLeft(index)
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
  position: relative;
  margin: 0;
  padding: 0;
  list-style: none;
  height: 44px;
  line-height: 44px;
  text-align: center;
  & dt {
    float: left;
    padding: 0 8px;
    box-sizing: border-box;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    transition: 0.3s color;
  }
}
.v-tab-nav-line {
  position: absolute;
  left: 0;
  bottom: 0;
  margin: 0;
  width: 40px;
  transition-property: transform, width;
}
.v-tab-nav-active {
  color: var(--primary);
}
</style>
