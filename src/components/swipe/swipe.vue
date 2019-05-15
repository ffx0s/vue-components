<template>
  <div
    class="v-swipe"
    :class="{ 'v-swipe-vertical': vertical }"
    @touchstart="pointerdown"
    @touchmove="pointermove"
    @touchend="pointerup"
    @mousedown="onMousedown"
  >
    <div
      class="v-swipe-items"
      :style="style"
      @webkitTransitionEnd.self="transitionend"
      @transitionEnd.self="transitionend"
      ref="items"
    >
      <slot />
    </div>
    <ul class="v-swipe-dots" v-if="dot">
      <li
        :class="{ 'v-swipe-dots-active': index === currentIndex }"
        v-for="(i, index) in items.length"
        :key="i"
      />
    </ul>
  </div>
</template>

<script>
import { Handler, mouseMove } from '../../utils/event'
import { debounce, noop } from '../../utils/shared'

export default {
  name: 'Swipe',
  props: {
    value: {
      type: Number,
      default: 0
    },
    animationDuration: {
      type: Number,
      default: 350
    },
    // 快速切换阀值
    threshold: {
      type: Number,
      default: 10
    },
    // 滑动的距离，超过这个值切换下一张
    distance: {
      type: Number,
      default: 30
    },
    friction: {
      type: Number,
      default: 0.2
    },
    dot: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
    playInterval: {
      type: Number,
      default: 2000
    },
    vertical: {
      type: Boolean,
      default: false
    },
    optimization: {
      type: Boolean,
      default: false
    },
    stopPropagation: {
      type: Boolean,
      default: true
    },
    // 预加载
    preload: {
      type: Boolean,
      default: false
    },
    touchmove: {
      type: Function,
      required: false
    },
    showPrev: {
      type: Function,
      required: false
    },
    showNext: {
      type: Function,
      required: false
    },
    // 滑动的偏移量
    offset: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      translate: 0,
      duration: 0,
      items: [],
      currentIndex: this.value
    }
  },
  computed: {
    style() {
      return {
        transitionDuration: `${this.duration}ms`,
        transform: this.vertical
          ? `translate3d(0, ${this.translate}px, 0)`
          : `translate3d(${this.translate}px, 0, 0)`
      }
    },
    propsMap() {
      return this.vertical
        ? {
            prevAction: 'Down',
            nextAction: 'Up',
            axis: 'y',
            size: 'height'
          }
        : {
            prevAction: 'Right',
            nextAction: 'Left',
            axis: 'x',
            size: 'width'
          }
    }
  },
  watch: {
    value(index) {
      if (!this.isChange) {
        if (this.isVaildIndex(index)) {
          this.slide(index)
        } else {
          this.$emit('input', this.getVaildIndex(index))
        }
      }
    },
    vertical() {
      this.addActions()
    },
    optimization(optimization) {
      optimization ? this.showCurrentItem() : this.showAllItems()
    }
  },
  created() {
    this.sliding = false
    this.items = this.$children
    this.resize = debounce(this.resize)
    this.removeMouseEvents = noop
  },
  mounted() {
    this.handler = new Handler({
      touchDelay: 2,
      isPreventDefault: this.isPrevOrNextAction,
      isStopPropagation: this.isStopPropagation
    })
    this.addActions()
    this.showCurrentItem()
    this.preloadItem(this.currentIndex)
    this.$nextTick(() => {
      this.setTranslate(this.currentIndex)
    })
    this.bindResizeEvent()
  },
  activated() {
    this.bindResizeEvent()
    this.autoPlay && this.play()
  },
  deactivated() {
    clearTimeout(this.playTimer)
    this.removeResizeEvent()
  },
  beforeDestroy() {
    clearTimeout(this.playTimer)
    this.removeResizeEvent()
    this.handler = null
  },
  methods: {
    pointerdown(event) {
      clearTimeout(this.playTimer)
      this.handler.start(event)
      this.vector = 0
      this.duration = 0
      this.sliding = false
      this.startTranslate = this.translate
    },
    pointermove(event) {
      this.handler.move(event)
    },
    pointerup() {
      this.handler.up()
      const action = this.shouldSliding()
      this.$emit('up', action)
      if (!action) return
      if (action.restore) return this.slide(this.currentIndex)
      if (action.swipeNext) return this.swipeNext()
      if (action.swipePrev) return this.swipePrev()
    },
    onMousedown(event) {
      event.preventDefault()
      this.pointerdown(event)
      this.removeMouseEvents = mouseMove(this.pointermove, this.pointerup)
    },
    isPrevOrNextAction() {
      return (
        this.handler.is(this.propsMap.nextAction) ||
        this.handler.is(this.propsMap.prevAction)
      )
    },
    isStopPropagation() {
      return this.stopPropagation && this.isPrevOrNextAction()
    },
    update(x, y) {
      if (this.sliding) return
      const friction = this.hasPrevNext(
        this.handler.is(this.propsMap.nextAction)
      )
        ? 1
        : this.friction
      const vector = this.vertical ? y : x
      const value = vector * friction

      this.showAdjacentItem()

      this.vector = vector
      this.translate += value

      this.touchmove && this.touchmove(this.translate, value)
    },
    slide(nextIndex) {
      nextIndex = this.getVaildIndex(nextIndex)
      this.sliding = true
      this.isChange = nextIndex !== this.currentIndex

      if (this.isChange) {
        this.$emit('beforeChange', nextIndex)
        this.showItem(nextIndex)
        this.preloadItem(nextIndex)
        this.$emit('input', nextIndex)
        this.$emit('change', nextIndex)
        this.currentIndex = nextIndex
        this.isChange = false
      }

      this.duration = this.animationDuration
      this.setTranslate(nextIndex)
    },
    transitionend() {
      this.showCurrentItem()
      this.sliding = false
      this.autoPlay && this.play()
      this.$emit('stop', this.currentIndex)
    },
    setTranslate(index) {
      this.translate =
        -index * (this.getSwipeRect()[this.propsMap.size] + this.offset)
    },
    swipeNext() {
      this.slide(this.currentIndex + 1)
    },
    swipePrev() {
      this.slide(this.currentIndex - 1)
    },
    shouldSliding() {
      const isPrev = this.handler.is(this.propsMap.prevAction)
      const isNext = this.handler.is(this.propsMap.nextAction)

      if (this.sliding || (!isPrev && !isNext)) return false

      const isFastMoving = Math.abs(this.vector) > this.threshold

      if (isFastMoving) {
        return {
          restore: false,
          swipePrev: isPrev,
          swipeNext: isNext
        }
      }

      const slideDistance = this.translate - this.startTranslate
      const restore = Math.abs(slideDistance) < this.distance
      const swipeNext = this.translate < this.startTranslate

      return {
        restore,
        swipeNext,
        swipePrev: !swipeNext
      }
    },
    isVaildIndex(index) {
      return index >= 0 && index < this.items.length
    },
    getVaildIndex(index) {
      return Math.max(Math.min(index || 0, this.items.length - 1), 0)
    },
    getSwipeRect() {
      return (
        this.swipeRect || (this.swipeRect = this.$el.getBoundingClientRect())
      )
    },
    hasPrevNext(isNext) {
      const hasPrev = this.currentIndex - 1 >= 0
      const hasNext = this.currentIndex + 1 < this.items.length
      return (!isNext && hasPrev) || (isNext && hasNext)
    },
    play() {
      clearTimeout(this.playTimer)
      this.playTimer = setTimeout(() => {
        const isLastItem = this.currentIndex === this.items.length - 1
        isLastItem ? this.slide(0) : this.swipeNext()
      }, this.playInterval)
    },
    addActions() {
      const options = this.handler.options
      if (this.vertical) {
        options.onLeft = null
        options.onRight = null
      } else {
        options.onUp = null
        options.onDown = null
      }
      options[`on${this.propsMap.prevAction}`] = this.update
      options[`on${this.propsMap.nextAction}`] = this.update
    },
    preloadItem(mid) {
      if (this.preload) {
        const prevItem = this.items[mid - 1]
        const nextItem = this.items[mid + 1]
        if (prevItem) prevItem.loaded = true
        if (nextItem) nextItem.loaded = true
      }
    },
    showItem(index) {
      const item = this.items[index]
      item.loaded = item.show = true
    },
    showCurrentItem() {
      this.items[this.currentIndex].loaded = true
      if (this.optimization) {
        this.items.forEach((item, i) => {
          item.show = i == this.currentIndex
        })
      }
    },
    showAllItems() {
      this.items.forEach(item => {
        item.show = true
      })
    },
    showAdjacentItem() {
      if (this.handler.is(this.propsMap.prevAction)) {
        const index = this.currentIndex - 1
        const prevItem = this.items[index]
        if (prevItem) {
          this.showPrev && this.showPrev(index)
          prevItem.loaded = prevItem.show = true
        }
      } else if (this.handler.is(this.propsMap.nextAction)) {
        const index = this.currentIndex + 1
        const nextItem = this.items[index]
        if (nextItem) {
          this.showNext && this.showNext(index)
          nextItem.loaded = nextItem.show = true
        }
      }
    },
    bindResizeEvent() {
      if (this.isBindResize) return
      window.addEventListener('resize', this.resize)
      this.isBindResize = true
    },
    removeResizeEvent() {
      window.removeEventListener('resize', this.resize)
      this.isBindResize = false
    },
    resize() {
      this.swipeRect = null
      this.getSwipeRect()
      this.setTranslate(this.currentIndex)
      this.$emit('resize')
    }
  }
}
</script>

<style lang="postcss">
.v-swipe {
  position: relative;
  z-index: 2;
  width: 100%;
  overflow: hidden;
  user-select: none;
}

.v-swipe-items {
  display: flex;
  height: 100%;
  transition-property: transform;
  transition-timing-function: ease;
}

.v-swipe-dots {
  position: absolute;
  bottom: 10px;
  margin: 0;
  padding: 0;
  width: 100%;
  list-style-type: none;
  text-align: center;
  font-size: 0;
  transform: translateZ(0);
  & li {
    margin: 0 3px;
    display: inline-block;
    width: 6px;
    height: 6px;
    background: #efefef;
    border-radius: 50%;
    opacity: 0.5;
    transition: 0.3s opacity;
    &.v-swipe-dots-active {
      opacity: 1;
    }
  }
}

.v-swipe-vertical {
  & .v-swipe-items {
    flex-direction: column;
  }
  & .v-swipe-item {
    height: 100%;
  }
  & .v-swipe-dots {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    bottom: auto;
    left: 10px;
    top: 0;
    height: 100%;
    width: auto;
    & li {
      display: block;
      margin: 3px 0;
    }
  }
}
</style>
