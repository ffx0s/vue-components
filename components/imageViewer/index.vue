<template>
  <transition
    name="v-image-viewer"
    @afterEnter="afterEnter"
    @beforeLeave="beforeLeave"
  >
    <div
      class="v-image-viewer"
      :class="{ 'v-image-viewer--lock': lock }"
      v-if="loaded"
      v-show="value"
    >
      <div
        class="v-image-viewer__toolbar"
        :class="{ [toolbarShowClass]: showToolbar }"
      >
        <slot name="toolbar" :index="index" :item="images[index] || {}">
          <div class="v-image-viewer__topbar">
            <span>{{ index + 1 }}/{{ images.length }}</span>
          </div>
        </slot>
      </div>
      <div
        class="v-image-viewer__touch"
        @touchstart.capture="touchstart"
        @touchmove.capture="touchmove"
        @touchend.capture="touchend"
        @mousedown.capture="mousedown"
      >
        <Swipe
          class="v-image-viewer__swipe"
          ref="swipe"
          v-model="index"
          :showPrev="showPrevOrNext"
          :showNext="showPrevOrNext"
          @beforeChange="beforeSwipeChange"
          @change="showLoading"
          @resize="resize"
          @up="restore"
          :preload="preload"
          :dot="false"
          :offset="20"
          optimization
        >
          <SwipeItem
            class="v-image-viewer__item"
            v-for="(item, i) in items"
            :key="item.uid"
            lazy
          >
            <div
              class="v-image-viewer__zoom"
              :id="'v-image-viewer__zoom-' + item.uid"
            >
              <img
                v-if="!item.loaded || item.error"
                class="v-image-viewer__img"
                :src="images[i].thumbnail"
              />
              <img
                class="v-image-viewer__img"
                :src="images[i].src"
                @load="onload(i)"
                @error="onerror(i)"
                v-if="!item.error"
              />
            </div>
          </SwipeItem>
        </Swipe>
      </div>
      <!-- loading -->
      <slot name="loading">
        <Delay
          class="v-image-viewer__loading"
          v-model="loading"
          :delay="loadingDelay"
        >
          <Ring
            v-model="progress"
            :size="45"
            :strokeWidth="0"
            :innerStrokeWidth="6"
            color="#fff"
            textColor="#fff"
            backgroundColor="rgba(0,0,0,.5)"
            outerColor="rgba(0,0,0,.5)"
          />
        </Delay>
      </slot>
      <!-- overlay -->
      <div class="v-image-viewer__overlay" ref="overlay" />
    </div>
  </transition>
</template>

<script>
import LazyLoad from '../mixins/lazyLoad'
import Swipe from '../swipe/swipe'
import SwipeItem from '../swipe/item'
import Ring from '../ring'
import Delay from '../delay'
import { view, isTouchDevice, toFixed } from '../utils/shared'
import { mouseMove } from '../utils/event'
import { imgContain, originZoom } from './helpers'
import Handler from './handler'

let uid = 0

export default {
  name: 'ImageViewer',
  components: {
    Swipe,
    SwipeItem,
    Ring,
    Delay
  },
  mixins: [LazyLoad],
  props: {
    images: {
      type: Array,
      default: () => []
    },
    zoomAnimationDuration: {
      type: Number,
      default: 350
    },
    preload: {
      type: Boolean,
      default: false
    },
    toolbarShowClass: {
      type: String,
      default: 'v-image-viewer__toolbar--show'
    },
    clickHidden: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      index: 0,
      value: false,
      lock: false,
      items: [],
      loading: false,
      loadingDelay: 500,
      progress: 0,
      showToolbar: false
    }
  },
  watch: {
    images: {
      handler: function(images) {
        // 标记更换了 images 的状态
        if (this.$refs.swipe) {
          this.isChange = true
        }

        const items = []
        const styles = []

        images.forEach(() => {
          items.push({
            loaded: false,
            error: false,
            uid: ++uid
          })
          styles.push({})
        })

        this.styles = styles
        this.items = items
      },
      immediate: true
    }
  },
  created() {
    this.handler = new Handler({
      hide: this.hide,
      setStyle: this.setStyle,
      scaleTo: this.scaleTo,
      click: this.click,
      dobuleClick: this.dobuleClick,
      getCurrentStyle: this.getCurrentStyle,
      updateOverlayOpcity: this.updateOverlayOpcity
    })
  },
  methods: {
    touchstart(event) {
      this.handler.start(event)
    },
    touchmove(event) {
      if (this.handler.disabled) return
      event.stopPropagation()
      this.handler.move(event)
    },
    touchend(event) {
      this.$refs.swipe.removeMouseEvents()
      if (this.handler.disabled) return
      event.stopPropagation()
      this.handler.up(event)
    },
    mousedown(event) {
      if (isTouchDevice()) return
      this.touchstart(event)
      mouseMove(this.touchmove, this.touchend, true)
    },
    showLoading() {
      if (this.getCurrentItem().loaded) {
        this.loading = false
      } else {
        // 假进度
        this.progress = Math.floor(Math.random() * 80)
        this.loading = true
      }
    },
    show({ selector, index }) {
      if (this.value) return

      this.lock = true
      this.showing = true

      this.setCurrentEl(-1)

      const swipe = this.$refs.swipe

      // 修复当前的项没有加载和显示的问题
      if (this.isChange && index === this.index) {
        swipe.showItem(index)
        this.isChange = false
      }

      // 显示的时候不需要 swipe 组件的切换动画，但是需要触发它的 transitionend 事件，所以设置动画时间为1ms
      if (swipe) {
        const swipeAnimationDuration = 1
        swipe.slide(index, swipeAnimationDuration)
      } else {
        this.index = index
      }

      this.selector = selector
      this.items[index].error = false

      this.value = true
      this.showing = false

      this.$nextTick(() => {
        // 放大效果
        const thumbnail = selector && this.getThumbnail(index)

        if (thumbnail) {
          const thumbnailRect = thumbnail.getBoundingClientRect()
          const style = {
            x: thumbnailRect.left,
            y: thumbnailRect.top,
            scale: thumbnailRect.width / this.images[index].w,
            duration: 0
          }

          this.setStyle(style, index)

          setTimeout(() => {
            this.setInitStyle(index, this.zoomAnimationDuration)
          }, 50)
        } else {
          this.setInitStyle(index)
        }

        this.showLoading()

        if (this.overlayOpacity < 1) {
          this.updateOverlayOpcity(1)
        }
      })
    },
    hide() {
      this.lock = true

      let x, y, scale
      const thumbnail = this.selector && this.getThumbnail(this.index)

      if (thumbnail) {
        const rect = thumbnail.getBoundingClientRect()
        x = rect.left
        y = rect.top
        scale = rect.width / this.images[this.index].w
      } else {
        x = view.width() / 2
        y = view.height() / 2
        scale = 0
      }

      this.setStyle({
        x,
        y,
        scale,
        duration: this.zoomAnimationDuration
      })

      this.value = false
    },
    getThumbnail(index) {
      return document.querySelectorAll(this.selector)[index]
    },
    getCurrentItem() {
      return this.items[this.index]
    },
    getCurrentStyle() {
      return this.styles[this.index]
    },
    getInitStyle(index) {
      if (!this.styles[index].initStyle) {
        const image = this.images[index]
        this.styles[index].initStyle = imgContain(
          image.w,
          image.h,
          view.width(),
          view.height()
        )
      }
      return this.styles[index].initStyle
    },
    setInitStyle(index, duration = 0) {
      const style = this.styles[index].style
      const { x, y, scale } = this.getInitStyle(index)

      if (!style || style.x !== x || style.y !== y || style.scale !== scale) {
        this.setStyle({ x, y, duration, scale }, index)
      }
    },
    setStyle(style, index) {
      if (index === undefined) index = this.index

      const currentStyle = this.styles[index].style || {}

      const {
        x = currentStyle.x,
        y = currentStyle.y,
        scale = currentStyle.scale,
        duration = currentStyle.duration,
        width = currentStyle.width || this.images[index].w,
        height = currentStyle.height || this.images[index].h
      } = style

      this.styles[index].style = {
        x,
        y,
        scale,
        duration,
        width,
        height
      }

      if (!this.currentEl) this.setCurrentEl(index)

      const elStyle = this.currentEl.style

      // eslint-disable-next-line prettier/prettier
      elStyle.transitionDuration =
      elStyle.webkitTransitionDuration = duration + 'ms'
      elStyle.transform = elStyle.webkitTransform = `
        translate3d(${toFixed(x, 3)}px, ${toFixed(y, 3)}px, 0)
        scale(${toFixed(scale, 4)})
      `
      elStyle.width = width + 'px'
      elStyle.height = height + 'px'
    },
    setCurrentEl(index) {
      this.currentEl =
        index >= 0
          ? this.$el.querySelector(
              '#v-image-viewer__zoom-' + this.items[index].uid
            )
          : null
    },
    updateOverlayOpcity(value) {
      this.$refs.overlay.style.opacity = toFixed(value, 4)
      this.overlayOpacity = value
    },
    scaleTo(point, scale, transition = true, check = true) {
      const style = this.getCurrentStyle().style

      if (scale === style.scale) return

      let { x, y } = originZoom(style, point, scale)

      if (check) {
        const position = this.handler.checkPosition({
          x,
          y,
          scale,
          width: style.width,
          height: style.height
        })
        x = position.x
        y = position.y
      }

      this.setStyle({
        x,
        y,
        scale,
        duration: transition ? this.zoomAnimationDuration : 0
      })
    },
    click() {
      if (this.clickHidden) {
        this.hide()
      }
      this.$emit('singleClick')
    },
    dobuleClick(point) {
      const style = this.getCurrentStyle().style
      const { x, y, scale } = this.getInitStyle(this.index)
      if (style.scale !== scale) {
        this.setStyle({
          x,
          y,
          scale,
          duration: this.zoomAnimationDuration
        })
      } else {
        const { w, h } = this.images[this.index]
        const fillWidth = false
        let scale =
          w / h > 1
            ? imgContain(w, h, view.width(), view.height(), fillWidth).scale
            : 1
        this.scaleTo(point, scale, true)
      }
      this.$emit('dobuleClick', style.scale)
    },
    onload(index) {
      const current = this.items[index]
      current.loaded = true
      current.error = false
      this.progress = 100
      this.loading = false
    },
    onerror(index) {
      const current = this.items[index]
      current.error = true
      this.loading = false
      this.$emit('error', index)
    },
    showPrevOrNext(index) {
      if (!this.styles[index].style) {
        clearTimeout(this.showTimer)
        this.showTimer = setTimeout(() => {
          this.setCurrentEl(-1)
          this.setInitStyle(index)
        }, 10)
      } else {
        this.setCurrentEl(-1)
        this.setInitStyle(index)
      }
    },
    beforeSwipeChange(index) {
      if (this.showing) return
      this.setCurrentEl(-1)
      this.setInitStyle(index)
      this.items[index].error = false
    },
    restore(action) {
      if (!action || action.restore) {
        this.setCurrentEl(-1)
        this.handler.validation(null, true)
      }
    },
    resize() {
      this.items.forEach(item => {
        item.initStyle = null
      })
      this.getInitStyle(this.index)
      this.handler.validation(null, true)
    },
    afterEnter() {
      this.lock = false
      this.showToolbar = true
    },
    beforeLeave() {
      this.showToolbar = false
    }
  }
}
</script>

<style lang="postcss">
.v-image-viewer {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  width: 100%;
  height: 100%;
}
.v-image-viewer--lock {
  pointer-events: none;
}
.v-image-viewer__touch {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
.v-image-viewer__swipe {
  height: 100%;
}
.v-image-viewer__item {
  margin-right: 20px;
  overflow: hidden;
  width: 100%;
}
.v-image-viewer__zoom {
  position: absolute;
  left: 0;
  top: 0;
  transition-timing-function: ease;
  transition-property: transform;
  transform-origin: left top;
}
.v-image-viewer__img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.v-image-viewer__toolbar {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  visibility: hidden;
  opacity: 0;
  transition: visibility 300ms, opacity 300ms;
  z-index: 3;
  pointer-events: none;
  user-select: none;
}
.v-image-viewer__toolbar > div {
  pointer-events: auto;
}
.v-image-viewer__toolbar--show {
  opacity: 1;
  visibility: visible;
}
.v-image-viewer__topbar {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 10px;
  width: 100%;
  height: 40px;
  & span {
    font-size: 14px;
    color: var(--lightGray);
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.8);
    letter-spacing: 2px;
  }
}
.v-image-viewer__loading {
  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 45px;
  height: 45px;
  z-index: 2;
}
.v-image-viewer__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
}
.v-image-viewer-enter-active,
.v-image-viewer-leave-active,
.v-image-viewer-enter-active .v-image-viewer__overlay,
.v-image-viewer-leave-active .v-image-viewer__overlay {
  transition: opacity 350ms;
}
.v-image-viewer-enter .v-image-viewer__overlay,
.v-image-viewer-leave-to .v-image-viewer__overlay {
  opacity: 0 !important;
}
</style>
