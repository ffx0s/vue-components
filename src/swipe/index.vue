<template>
  <div class="v-swipe" :class="{ 'v-swipe--vertical': vertical }">
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
import ETouch from '../utils/etouch'
import {
  debounce,
  toFixed,
  addListener,
  removeListener,
  isHidden
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
    // 滑动的距离，超过这个值切换下一项
    distance: {
      type: Number,
      default: 30
    },
    // 第一项和最后一项滑动时的阻力
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
    // 优化模式，设置当前项 display 为 block，其它为 none
    optimization: {
      type: Boolean,
      default: false
    },
    // 滑动的时候是否阻止冒泡
    stopPropagation: {
      type: Boolean,
      default: true
    },
    // 滑动的时候是否阻止默认事件
    preventDefault: {
      type: Boolean,
      default: true
    },
    // 预加载
    preload: {
      type: Boolean,
      default: false
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
      this.initEvents()
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
    this.rAFUpdateElement = ETouch.rAFThrottle(this.updateElement)
    this.touch = new ETouch({
      el: this.$el,
      threshold: this.threshold
    })
    this.initEvents()
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
    this.touch.destroy()
    this.touch = null
  },
  methods: {
    down(event) {
      this.$emit('down', event)
      clearTimeout(this.playTimer)
    },
    panstart() {
      this.duration = 0
      this.startTranslate = this.translate
      this.$emit('panstart')
    },
    panmove(event, { vx, vy }) {
      this.setPreventStop(event)

      const friction = this.hasPrevNext(this.isNextAction()) ? 1 : this.friction
      const vector = this.vertical ? vy : vx
      const value = vector * friction

      this.translate += value

      this.showAdjacentItem()
      this.rAFUpdateElement()

      this.$emit('panmove', this.translate, value)
    },
    panend() {
      const action = this.shouldSlide()

      this.$emit('panend', action)

      if (action.restore) return this.slide(this.currentIndex)
      if (action.next) return this.next()
      if (action.prev) return this.prev()
    },
    setPreventStop(event) {
      if (this.isPrevAction() || this.isNextAction()) {
        if (this.stopPropagation) {
          event.stopPropagation()
        }
        if (this.preventDefault) {
          ETouch.preventDefault(event)
        }
      }
    },
    isNextAction() {
      return this.touch.is(this.directionMap.nextAction)
    },
    isPrevAction() {
      return this.touch.is(this.directionMap.prevAction)
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

      this.duration = duration || this.swipeRect ? this.animationDuration : 0
      this.translateTo(nextIndex)
    },
    next() {
      this.slide(this.currentIndex + 1)
    },
    prev() {
      this.slide(this.currentIndex - 1)
    },
    transitionend() {
      this.play()
      this.showCurrentItem(this.currentIndex)
      this.$emit('stop', this.currentIndex)
    },
    translateTo(index) {
      this.translate =
        -index * (this.getSwipeRect()[this.directionMap.size] + this.offset)
      this.updateElement()
    },
    updateElement() {
      const style = this.$refs.items.style
      const translate = toFixed(this.translate, 3)

      // eslint-disable-next-line prettier/prettier
      style.transitionDuration =
      style.webkitTransitionDuration = `${this.duration}ms`

      style.transform = style.webkitTransform = this.vertical
        ? `translate3d(0, ${translate}px, 0)`
        : `translate3d(${translate}px, 0, 0)`
    },
    shouldSlide() {
      const isPrev = this.isPrevAction()
      const isNext = this.isNextAction()
      const hasPrev = this.isVaildIndex(this.currentIndex - 1)
      const hasNext = this.isVaildIndex(this.currentIndex + 1)

      if (this.touch.isSwipe) {
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
      return Math.max(Math.min(index, this.items.length - 1), 0)
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
    initEvents() {
      this.touch.off()

      let data = []
      let lockDirection = ''

      if (this.vertical) {
        data = ['panup', 'pandown', 'height']
        lockDirection = ETouch.VERTICAL
      } else {
        data = ['panleft', 'panright', 'width']
        lockDirection = ETouch.HORIZONTAL
      }

      this.directionMap = directionMap(data)

      const { prevAction, nextAction } = this.directionMap

      this.touch
        .setOptions({ lockDirection })
        .on('down', this.down)
        .on('panstart', this.panstart)
        .on(prevAction + ' ' + nextAction, this.panmove)
        .on('panend', this.panend)
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
    showCurrentItem(index) {
      if (this.optimization) {
        this.items.forEach((item, i) => {
          item.show = i == index
        })
      }
    },
    showAdjacentItem() {
      if (this.isPrevAction()) {
        const index = this.currentIndex - 1
        const prevItem = this.items[index]
        if (prevItem) {
          this.$emit('showPrev', index)
          prevItem.loaded = prevItem.show = true
        }
      } else if (this.isNextAction()) {
        const index = this.currentIndex + 1
        const nextItem = this.items[index]
        if (nextItem) {
          this.$emit('showNext', index)
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
      const hidden = isHidden(this.$el)

      this.swipeRect = null

      if (!hidden) {
        this.translateTo(this.currentIndex)
      }

      this.$emit('resize', hidden)
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
