<template>
  <div
    class="v-swipe"
    :class="{ 'v-swipe--vertical': vertical }"
    @touchstart="pointerdown"
    @touchmove="pointermove"
    @touchend="pointerup"
    @mousedown="onMousedown"
  >
    <div
      class="v-swipe__items"
      @webkitTransitionEnd.self="transitionend"
      @transitionEnd.self="transitionend"
      ref="items"
    >
      <slot />
    </div>
    <ul class="v-swipe__dots" v-if="dot">
      <li
        v-for="(item, i) in items.length"
        :key="i"
        :class="{ 'v-swipe__dots-active': i === currentIndex }"
      />
    </ul>
  </div>
</template>

<script>
import { Handler, mouseMove } from '../utils/event'
import {
  debounce,
  noop,
  isTouchDevice,
  toFixed,
  addListener,
  removeListener
} from '../utils/shared'

function directionMap(arr) {
  return {
    nextAction: arr[0],
    prevAction: arr[1],
    size: arr[2]
  }
}

export default {
  name: 'Swipe',
  props: {
    // 切换索引
    value: {
      type: Number,
      default: 0
    },
    // 切换动画的持续时间
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
    // 上一张下一张临界点的滑动阻力
    friction: {
      type: Number,
      default: 0.2
    },
    // 是否需要显示切换圆点
    dot: {
      type: Boolean,
      default: true
    },
    // 是否自动播放
    autoPlay: {
      type: Boolean,
      default: false
    },
    // 播放倒计时
    playInterval: {
      type: Number,
      default: 2000
    },
    // 是否为垂直切换
    vertical: {
      type: Boolean,
      default: false
    },
    // 优化模式，设置当前的 swipeItem display:block，其它为 none
    optimization: {
      type: Boolean,
      default: false
    },
    // 滑动的时候是否阻止冒泡
    stopPropagation: {
      type: Boolean,
      default: true
    },
    // 预加载
    preload: {
      type: Boolean,
      default: false
    },
    // 滑动的回调
    touchmove: {
      type: Function,
      required: false
    },
    // 移动时显示上一张的回调
    showPrev: {
      type: Function,
      required: false
    },
    // 移动时显示下一张的回调
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
      items: [],
      currentIndex: this.value
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
      this.isChange = false
    },
    vertical() {
      this.duration = 0
      this.initActions()
      this.translateTo(this.currentIndex)
    }
  },
  created() {
    this.translate = 0
    this.duration = 0
    this.items = this.$children
  },
  mounted() {
    this.handleResize = debounce(this.handleResize)
    this.removeMouseEvents = noop
    this.handler = new Handler({
      touchDelay: 2,
      threshold: this.threshold,
      isPreventDefault: this.isPrevOrNextAction,
      isStopPropagation: this.isStopPropagation
    })
    this.initActions()
    this.showItem(this.currentIndex)
    this.translateTo(this.currentIndex)
    this.bindResizeEvent()
    this.play()
  },
  activated() {
    this.bindResizeEvent()
  },
  deactivated() {
    clearTimeout(this.playTimer)
    this.removeResizeEvent()
  },
  beforeDestroy() {
    clearTimeout(this.playTimer)
    this.removeResizeEvent()
    this.handler = null
    this.removeMouseEvents = null
  },
  methods: {
    pointerdown(event) {
      this.handler.start(event)
      this.duration = 0
      this.startTranslate = this.translate
      clearTimeout(this.playTimer)
      this.$emit('down')
    },
    pointermove(event) {
      this.handler.move(event)
    },
    pointerup() {
      this.handler.up()

      const action = this.shouldSlide()

      this.$emit('up', action)

      if (!action) return
      if (action.restore) return this.slide(this.currentIndex)
      if (action.next) return this.next()
      if (action.prev) return this.prev()
    },
    onMousedown(event) {
      if (isTouchDevice()) return
      event.preventDefault()
      this.pointerdown(event)
      this.removeMouseEvents = mouseMove(this.pointermove, this.pointerup)
    },
    isPrevOrNextAction() {
      return (
        this.handler.is(this.directionMap.nextAction) ||
        this.handler.is(this.directionMap.prevAction)
      )
    },
    isStopPropagation() {
      return this.stopPropagation && this.isPrevOrNextAction()
    },
    update(x, y) {
      const friction = this.hasPrevNext(
        this.handler.is(this.directionMap.nextAction)
      )
        ? 1
        : this.friction
      const vector = this.vertical ? y : x
      const value = vector * friction

      this.showAdjacentItem()
      this.setStyle(this.translate + value)
      this.touchmove && this.touchmove(this.translate, value)
    },
    slide(nextIndex, duration) {
      nextIndex = this.getVaildIndex(nextIndex)
      this.isChange = nextIndex !== this.currentIndex

      if (this.isChange) {
        this.$emit('beforeChange', nextIndex)
        this.showItem(nextIndex)
        this.$emit('input', nextIndex)
        this.$emit('change', nextIndex)
        this.currentIndex = nextIndex
      }

      this.duration = duration || this.animationDuration
      this.translateTo(nextIndex)
    },
    next() {
      this.slide(this.currentIndex + 1)
    },
    prev() {
      this.slide(this.currentIndex - 1)
    },
    transitionend() {
      if (this.optimization) {
        this.showCurrentItem()
      }
      this.play()
      this.$emit('stop', this.currentIndex)
    },
    translateTo(index) {
      const translate =
        -index * (this.getSwipeRect()[this.directionMap.size] + this.offset)
      this.setStyle(translate)
    },
    setStyle(translate) {
      const el = this.$refs.items

      // eslint-disable-next-line prettier/prettier
      el.style.transitionDuration =
      el.style.webkitTransitionDuration = `${this.duration}ms`

      el.style.transform = el.style.webkitTransform = this.vertical
        ? `translate3d(0, ${toFixed(translate, 3)}px, 0)`
        : `translate3d(${toFixed(translate, 3)}px, 0, 0)`

      this.translate = translate
    },
    shouldSlide() {
      const isPrev = this.handler.is(this.directionMap.prevAction)
      const isNext = this.handler.is(this.directionMap.nextAction)

      if (!isPrev && !isNext) return false

      const hasPrev = this.isVaildIndex(this.currentIndex - 1)
      const hasNext = this.isVaildIndex(this.currentIndex + 1)

      if (this.handler.isFast) {
        const prev = isPrev && hasPrev
        const next = isNext && hasNext
        return {
          prev,
          next,
          restore: !prev && !next
        }
      }

      const slideDistance = this.translate - this.startTranslate
      const shouldSlide = Math.abs(slideDistance) > this.distance
      const _isNext = this.translate < this.startTranslate
      const next = shouldSlide && _isNext && hasNext
      const prev = shouldSlide && !_isNext && hasPrev

      return {
        prev,
        next,
        restore: !prev && !next
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
      if (!this.autoPlay) return
      clearTimeout(this.playTimer)
      this.playTimer = setTimeout(() => {
        const isLastItem = this.currentIndex === this.items.length - 1
        isLastItem ? this.slide(0) : this.next()
      }, this.playInterval)
    },
    initActions() {
      this.handler.removeActions()

      this.directionMap = directionMap(
        this.vertical
          ? ['panup', 'pandown', 'height']
          : ['panleft', 'panright', 'width']
      )

      const { prevAction, nextAction } = this.directionMap
      const options = this.handler.options
      options[prevAction] = options[nextAction] = this.update
    },
    preloadItem(mid) {
      const prevItem = this.items[mid - 1]
      const nextItem = this.items[mid + 1]
      if (prevItem) prevItem.loaded = true
      if (nextItem) nextItem.loaded = true
    },
    showItem(index) {
      const item = this.items[index]
      item.loaded = item.show = true
      if (this.preload) {
        this.preloadItem(index)
      }
    },
    showCurrentItem() {
      this.items.forEach((item, i) => {
        item.show = i == this.currentIndex
      })
    },
    showAdjacentItem() {
      if (this.handler.is(this.directionMap.prevAction)) {
        const index = this.currentIndex - 1
        const prevItem = this.items[index]
        if (prevItem) {
          this.showPrev && this.showPrev(index)
          prevItem.loaded = prevItem.show = true
        }
      } else if (this.handler.is(this.directionMap.nextAction)) {
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
      addListener(window, 'resize', this.handleResize)
      this.isBindResize = true
    },
    removeResizeEvent() {
      if (!this.isBindResize) return
      removeListener(window, 'resize', this.handleResize)
      this.isBindResize = false
    },
    handleResize() {
      this.swipeRect = null
      this.translateTo(this.currentIndex)
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

.v-swipe__items {
  display: flex;
  height: 100%;
  transition-property: transform;
  transition-timing-function: ease;
}

.v-swipe__dots {
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
    &.v-swipe__dots-active {
      opacity: 1;
    }
  }
}

.v-swipe--vertical {
  & .v-swipe__items {
    flex-direction: column;
  }
  & .v-swipe__item {
    height: 100%;
  }
  & .v-swipe__dots {
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
