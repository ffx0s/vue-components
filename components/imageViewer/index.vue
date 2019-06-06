<template>
  <transition
    name="v-image-viewer"
    @afterEnter="afterEnter"
    @beforeLeave="beforeLeave"
  >
    <div
      class="v-image-viewer"
      :class="{ 'v-image-viewer-lock': lock }"
      v-if="loaded"
      v-show="value"
    >
      <div
        class="v-image-viewer-toolbar"
        :class="{ [toolbarShowClass]: showToolbar }"
      >
        <slot name="toolbar" :index="index" :item="images[index] || {}">
          <div class="v-image-viewer-topbar">
            <span>{{ index + 1 }}/{{ images.length }}</span>
          </div>
        </slot>
      </div>
      <div
        class="v-image-viewer-touch"
        @touchstart.capture="touchstart"
        @touchmove.capture="touchmove"
        @touchend.capture="touchend"
        @mousedown.capture="mousedown"
      >
        <Swipe
          class="v-image-viewer-swipe"
          ref="swipe"
          v-model="index"
          :showPrev="setInitStyle"
          :showNext="setInitStyle"
          @beforeChange="beforeSwipeChange"
          @change="showLoading"
          @resize="resize"
          :animationDuration="swipeAnimationDuration"
          :preload="preload"
          :dot="false"
          :offset="20"
          optimization
        >
          <SwipeItem
            class="v-image-viewer-item"
            v-for="(item, i) in items"
            :key="item.uid"
            lazy
          >
            <div
              class="v-image-viewer-transform"
              :style="{
                transitionDuration: `${item.style.duration}ms`,
                transform: `
                  translate3d(${item.style.x}px, ${item.style.y}px, 0)
                  scale(${item.style.scale})
                `,
                width: `${item.style.width}px`,
                height: `${item.style.height}px`
              }"
            >
              <img
                v-if="!item.loaded || item.error"
                class="v-image-viewer-img"
                :src="images[i].thumbnail"
              />
              <img
                class="v-image-viewer-img"
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
          class="v-image-viewer-center"
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
      <div
        class="v-image-viewer-overlay"
        :style="{ opacity: overlayOpacity }"
      />
    </div>
  </transition>
</template>

<script>
import LazyLoad from '../mixins/lazyLoad'
import Swipe from '../swipe/swipe'
import SwipeItem from '../swipe/item'
import Ring from '../ring'
import Delay from '../delay'
import { view } from '../utils/shared'
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
    swipeAnimationDuration: {
      type: Number,
      default: 350
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
      default: 'v-image-viewer-toolbar-show'
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
      styles: [],
      overlayOpacity: null,
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
        this.items = images.map(() => ({
          style: {},
          loaded: false,
          error: false,
          uid: uid++
        }))
      },
      immediate: true
    }
  },
  created() {
    this.handler = new Handler({
      hide: this.hide,
      move: this.move,
      moveTo: this.moveTo,
      scaleTo: this.scaleTo,
      click: this.click,
      dobuleClick: this.dobuleClick,
      getCurrentItem: this.getCurrentItem,
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

      // 放大效果
      const thumbnail = selector && this.getThumbnail(index)

      if (thumbnail) {
        const thumbnailRect = thumbnail.getBoundingClientRect()

        this.setStyle({
          x: thumbnailRect.left,
          y: thumbnailRect.top,
          scale: +(thumbnailRect.width / this.images[index].w).toFixed(4),
          duration: 0
        })

        setTimeout(() => {
          this.setInitStyle(index, this.zoomAnimationDuration)
        }, 50)
      } else {
        this.setInitStyle(index)
      }

      this.showLoading()
      this.updateOverlayOpcity(1)
      this.value = true
      this.showing = false
    },
    hide() {
      this.lock = true

      let x, y, scale
      const thumbnail = this.selector && this.getThumbnail(this.index)

      if (thumbnail) {
        const rect = thumbnail.getBoundingClientRect()
        x = rect.left
        y = rect.top
        scale = +(rect.width / this.images[this.index].w).toFixed(4)
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
    getInitStyle(index) {
      if (!this.items[index].initStyle) {
        const image = this.images[index]
        this.items[index].initStyle = imgContain(
          image.w,
          image.h,
          view.width(),
          view.height()
        )
      }
      return this.items[index].initStyle
    },
    setInitStyle(index, duration = 0) {
      const style = this.items[index].style
      const initStyle = this.getInitStyle(index)
      if (
        style.x !== initStyle.x ||
        style.y !== initStyle.y ||
        style.scale !== initStyle.scale
      ) {
        initStyle.duration = duration
        this.setStyle(initStyle, index)
      }
    },
    setStyle({ x, y, scale, duration }, index) {
      if (index === undefined) index = this.index
      this.items[index].style = {
        x,
        y,
        scale,
        duration,
        width: this.images[index].w,
        height: this.images[index].h
      }
    },
    updateOverlayOpcity(value) {
      this.overlayOpacity = value
    },
    move(x, y, transition = true) {
      const style = this.getCurrentItem().style
      style.duration = transition ? this.zoomAnimationDuration : 0
      style.x += x
      style.y += y
    },
    moveTo(x, y, transition = true) {
      const style = this.getCurrentItem().style
      style.duration = transition ? this.zoomAnimationDuration : 0
      style.x = x
      style.y = y
    },
    scaleTo(point, scale, transition = true, check = true) {
      const current = this.getCurrentItem()
      const style = current.style
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
      style.scale = scale
      this.moveTo(x, y, transition)
    },
    click() {
      if (this.clickHidden) {
        this.hide()
      }
      this.$emit('singleClick')
    },
    dobuleClick(point) {
      const current = this.getCurrentItem()
      const { x, y, scale } = this.getInitStyle(this.index)
      if (current.style.scale !== scale) {
        current.style.scale = scale
        this.moveTo(x, y, true)
      } else {
        const { w, h } = this.images[this.index]
        const fillWidth = false
        let scale =
          w / h > 1
            ? imgContain(w, h, view.width(), view.height(), fillWidth).scale
            : 1
        this.scaleTo(point, scale, true)
      }
      this.$emit('dobuleClick', current.style.scale)
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
      current.loaded = current.error = true
      this.loading = false
      this.$emit('error', index)
    },
    beforeSwipeChange(index) {
      if (this.showing) return
      this.setInitStyle(index)
      this.items[index].error = false
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
.v-image-viewer-lock {
  pointer-events: none;
}
.v-image-viewer-touch {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
.v-image-viewer-swipe {
  height: 100%;
}
.v-image-viewer-item {
  margin-right: 20px;
  overflow: hidden;
  width: 100%;
}
.v-image-viewer-transform {
  position: absolute;
  left: 0;
  top: 0;
  transition-timing-function: ease;
  transition-property: transform;
  transform-origin: left top;
}
.v-image-viewer-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.v-image-viewer-toolbar {
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
.v-image-viewer-toolbar > div {
  pointer-events: auto;
}
.v-image-viewer-toolbar-show {
  opacity: 1;
  visibility: visible;
}
.v-image-viewer-topbar {
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
.v-image-viewer-center {
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
.v-image-viewer-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
}
.v-image-viewer-enter-active,
.v-image-viewer-leave-active,
.v-image-viewer-enter-active .v-image-viewer-overlay,
.v-image-viewer-leave-active .v-image-viewer-overlay {
  transition: opacity 350ms;
}
.v-image-viewer-enter .v-image-viewer-overlay,
.v-image-viewer-leave-to .v-image-viewer-overlay {
  opacity: 0 !important;
}
</style>
