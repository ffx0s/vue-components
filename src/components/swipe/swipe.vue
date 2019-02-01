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
        :class="{ 'v-swipe-dots-active': index === value }"
        v-for="(i, index) in items.length"
        :key="i"
      />
    </ul>
  </div>
</template>

<script>
import { Handler, mouseMove } from '../../utils/event'
import { isTouchDevice, intersects } from '../../utils/shared'

export default {
  name: 'Swipe',
  props: {
    value: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: 'easeOutStrong'
    },
    animationDuration: {
      type: Number,
      default: 500
    },
    // 快速切换阀值
    threshold: {
      type: Number,
      default: 10
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
    }
  },
  data() {
    return {
      translate: 0,
      duration: 0,
      sliding: false,
      items: []
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
    value(index, prevIndex) {
      if (!this.isChange) {
        if (this.isVaildIndex(index)) {
          this.showPrevNextItem(this.getVaildIndex(prevIndex), index)
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
    this.items = this.$children
  },
  mounted() {
    this.handler = new Handler({
      touchDelay: 2,
      isPreventDefault: this.isPrevOrNextAction,
      isStopPropagation: this.isStopPropagation
    })
    this.addActions()
    this.showCurrentItem()
    this.$nextTick(() => {
      this.setTranslate(this.value)
    })
  },
  activated() {
    this.autoPlay && this.play()
  },
  deactivated() {
    clearTimeout(this.playTimer)
  },
  beforeDestroy() {
    clearTimeout(this.playTimer)
    this.handler = null
  },
  methods: {
    pointerdown(event) {
      this.handler.start(event)
      clearTimeout(this.playTimer)
      if (this.sliding) {
        this.sliding = false
        this.duration = 0
      }
      this.startTranslate = this.translate
      this.vector = 0
    },
    pointermove(event) {
      this.handler.move(event)
    },
    pointerup() {
      this.handler.up()
      const action = this.shouldSliding()
      if (!action) return
      if (action.restore) return this.slide(this.value)
      if (action.swipeNext) return this.swipeNext()
      if (action.swipePrev) return this.swipePrev()
    },
    onMousedown(event) {
      if (isTouchDevice()) return
      event.preventDefault()
      this.pointerdown(event)
      mouseMove(this.pointermove, this.pointerup)
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

      this.showAdjacentItems()

      this.vector = vector
      this.translate += value
      this.$emit('sliding', this.translate, value)
    },
    slide(nextIndex) {
      nextIndex = this.getVaildIndex(nextIndex)
      this.sliding = true
      this.isChange = nextIndex !== this.value

      this.$emit('beforeSlide', nextIndex)

      if (this.isChange) {
        this.showPrevNextItem(this.value, nextIndex)
        this.$emit('input', nextIndex)
      }

      this.duration = this.animationDuration
      this.setTranslate(nextIndex)
    },
    transitionend() {
      this.showCurrentItem()
      this.sliding = false
      this.duration = 0

      if (this.isChange) {
        this.$emit('change', this.value)
        this.isChange = false
      }
      this.autoPlay && this.play()
      this.$emit('slideStop', this.value)
    },
    setTranslate(index) {
      this.translate = -index * this.getSwipeRect()[this.propsMap.size]
    },
    swipeNext() {
      this.slide(this.value + 1)
    },
    swipePrev() {
      this.slide(this.value - 1)
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

      const minSlideDistance = this.getSwipeRect()[this.propsMap.size] / 4
      const slideDistance = this.translate - this.startTranslate
      const restore = Math.abs(slideDistance) < minSlideDistance
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
    getItemRect(index) {
      const wrapRect = this.getSwipeRect()
      const rect = {
        width: wrapRect.width,
        height: wrapRect.height
      }
      if (this.vertical) {
        rect.left = wrapRect.left
        rect.top = index * wrapRect.height + this.translate + wrapRect.top
      } else {
        rect.left = index * wrapRect.width + this.translate + wrapRect.left
        rect.top = wrapRect.top
      }
      return rect
    },
    hasPrevNext(isNext) {
      const hasPrev = this.value - 1 >= 0
      const hasNext = this.value + 1 < this.items.length
      return (!isNext && hasPrev) || (isNext && hasNext)
    },
    play() {
      clearTimeout(this.playTimer)
      this.playTimer = setTimeout(() => {
        const isLastItem = this.value === this.items.length - 1
        isLastItem ? this.$emit('input', 0) : this.swipeNext()
      }, this.playInterval)
    },
    addActions() {
      if (this.vertical) {
        this.handler.onLeft = null
        this.handler.onRight = null
      } else {
        this.handler.onUp = null
        this.handler.onDown = null
      }
      this.handler[`on${this.propsMap.prevAction}`] = this.update
      this.handler[`on${this.propsMap.nextAction}`] = this.update
    },
    showPrevNextItem(prevIndex, nextIndex) {
      if (!this.optimization) return
      this.items[nextIndex].show = true
      this.items[prevIndex].show = true
    },
    showCurrentItem() {
      if (!this.optimization) return
      this.items.forEach((item, i) => {
        item.show = i == this.value
      })
    },
    showAllItems() {
      this.items.forEach(item => (item.show = true))
    },
    showAdjacentItems() {
      if (!this.optimization) return
      const prevIndex = this.value - 1
      const nextIndex = this.value + 1
      const prevItem = this.items[prevIndex]
      const nextItem = this.items[nextIndex]
      let showPrevItem =
        prevItem && intersects(this.getSwipeRect(), this.getItemRect(prevIndex))
      let showNextItem =
        nextItem && intersects(this.getSwipeRect(), this.getItemRect(nextIndex))

      if (showPrevItem) {
        prevItem.show = true
      }
      if (showNextItem) {
        nextItem.show = true
      }
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
