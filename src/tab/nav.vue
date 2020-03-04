<template>
  <ScrollView
    class="v-bd-bottom"
    :style="navStyle"
    :scrollBar="false"
    :scrollWidth="scrollWidth"
    :scrollable="scrollable"
    :flex="flex"
    ref="scrollView"
  >
    <dl
      class="v-tab__nav"
      ref="nav"
      :class="{ 'v-tab__nav--scrollable': scrollable }"
    >
      <dt
        v-for="(tab, i) in tabs"
        :key="i"
        :class="{ [activeClass]: i === index }"
        @click="$emit('itemClick', i)"
        ref="item"
      >
        <span v-if="tab.title"> {{ tab.title }} </span>
        <VNode v-else-if="tab.$slots.title" :node="tab.$slots.title[0]" />
      </dt>
      <dd class="v-tab__nav-line" :style="lineStyle" ref="line"></dd>
    </dl>
  </ScrollView>
</template>

<script>
import ScrollView from '../scrollView'
import VNode from '../vnode'
import ETouch from '../utils/etouch'
import { view } from '../utils/shared'

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
      default: ''
    },
    lineHeight: {
      type: Number,
      default: 3
    },
    navHeight: {
      type: Number,
      default: 44
    },
    activeClass: {
      type: String,
      default: 'v-tab__nav--active'
    }
  },
  data() {
    return {
      lineWidth: 0,
      scrollWidth: 5000,
      scrollable: true,
      flex: false
    }
  },
  computed: {
    lineStyle() {
      return {
        width: this.lineWidth + 'px',
        height: this.lineHeight + 'px',
        lineColor: this.lineColor
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
    this.translate = 0
    this.duration = 0

    this.touch = new ETouch({
      el: this.$el
    })
      .on('down up', this.stopPropagation)
      .on('panstart panmove', this.panmove)

    this.$nextTick(() => {
      this.getScrollWidth()

      if (this.scrollWidth < view.width()) {
        this.flex = true
        this.scrollable = false
      }

      this.$nextTick(() => {
        this.select(this.index, false)
      })
    })
  },
  beforeDestroy() {
    this.touch.destroy()
    this.touch = null
  },
  methods: {
    panmove(event) {
      const action = this.touch.action

      this.stopPropagation(event)

      if (action === 'panup' || action === 'pandown') {
        ETouch.preventDefault(event)
      }
    },
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

      this.updateLineStyle()
    },
    lineMove(x) {
      this.duration = 0
      this.translate -= x * 0.1

      this.updateLineStyle()
    },
    updateLineStyle() {
      const style = this.$refs.line.style

      // eslint-disable-next-line prettier/prettier
      style.transitionDuration = style.webkitTransitionDuration = `${this.duration}ms`
      // eslint-disable-next-line prettier/prettier
      style.transform = style.webkitTransform = `translateX(${this.translate}px)`
    },
    stopPropagation(event) {
      event.stopPropagation()
    }
  }
}
</script>

<style lang="postcss">
.v-tab__nav {
  position: relative;
  margin: 0;
  padding: 0;
  list-style: none;
  height: 44px;
  line-height: 44px;
  text-align: center;
  background-color: #fff;
  display: flex;
  & dt {
    flex: 1;
    padding: 0 8px;
    min-width: 50px;
    box-sizing: border-box;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    transition: 0.3s color;
  }
}

.v-tab__nav--scrollable {
  display: block;
  & dt {
    float: left;
  }
}

.v-tab__nav--active {
  color: var(--primary);
}

.v-tab__nav-line {
  position: absolute;
  left: 0;
  bottom: 0;
  margin: 0;
  width: 40px;
  transition-property: transform, width;
  background-color: var(--primary);
}
</style>
