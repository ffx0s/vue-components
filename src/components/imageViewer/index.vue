<template>
  <transition
    name="v-image-viewer"
    @afterEnter="afterEnter"
    @beforeLeave="beforeLeave"
    @afterLeave="afterLeave"
  >
    <div class="v-image-viewer" v-if="loaded" v-show="value">
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
          @beforeChange="showItem"
          @change="showLoading"
          @resize="resize"
          :showPrev="showItem"
          :showNext="showItem"
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
                v-if="!item.loaded"
                class="v-image-viewer-img"
                :src="images[i].thumbnail"
              />
              <img
                class="v-image-viewer-img"
                :src="images[i].src"
                @load="onload(i)"
                @error="onerror(i)"
              />
            </div>
          </SwipeItem>
        </Swipe>
      </div>
      <!-- loading -->
      <slot name="loading">
        <Delay
          class="v-image-viewer-loading"
          v-model="loading"
          :delay="loadingDelay"
        >
          <Ring
            v-model="progress"
            :size="45"
            :strokeWidth="0"
            :innerStrokeWidth="5"
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
import LazyLoad from '../../mixins/lazyLoad'
import Swipe from '../../components/swipe/swipe'
import SwipeItem from '../../components/swipe/item'
import Ring from '../../components/ring'
import Delay from '../../components/delay'
import { view } from '../../utils/shared'
import { mouseMove } from '../../utils/event'
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
    animationDuration: {
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
    hideByClick: {
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
        this.items = images.map(() => {
          return {
            style: {},
            loaded: false,
            error: false,
            uid: uid++
          }
        })
      },
      immediate: true
    }
  },
  mounted() {},
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
      if (this.lock) {
        event.stopPropagation()
        return
      }
      this.handler.start(event)
    },
    touchmove(event) {
      if (this.lock) {
        event.stopPropagation()
        return
      }
      if (this.handler.disabled) return
      event.stopPropagation()
      this.handler.move(event)
    },
    touchend(event) {
      this.$refs.swipe.removeMouseEvents()
      if (this.lock) {
        event.stopPropagation()
        return
      }
      if (this.handler.disabled) return
      event.stopPropagation()
      this.handler.up(event)
    },
    mousedown(event) {
      this.touchstart(event)
      mouseMove(this.touchmove, this.touchend, true)
    },
    show({ selector, index }) {
      // 修复当前的项没有加载和显示的问题
      if (this.isChange && index === this.index) {
        const swipe = this.$refs.swipe
        swipe.showItem(index)
        swipe.preloadItem(index)
        this.isChange = false
      }
      this.index = index
      this.selector = selector
      // 放大效果
      const thumbnail = selector && this.getThumbnail(index)
      if (thumbnail) {
        this.selector = selector
        this.flag = true
        const thumbnailRect = thumbnail.getBoundingClientRect()
        this.setStyle({
          x: thumbnailRect.left,
          y: thumbnailRect.top,
          scale: +(thumbnailRect.width / this.images[index].w).toFixed(4),
          duration: 0
        })

        setTimeout(() => {
          const style = this.getInitStyle(index)
          style.duration = this.animationDuration
          this.setStyle(style)
        }, 50)
      } else {
        this.showItem(index)
      }
      this.showLoading()
      this.updateOverlayOpcity(1)
      this.value = true
      this.lock = true
    },
    hide() {
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
        duration: this.animationDuration
      })
      this.value = false
      this.lock = true
    },
    onload(index) {
      this.items[index].loaded = true
      this.progress = 100
      this.loading = false
    },
    onerror(index) {
      this.items[index].loaded = true
      this.loading = false
      this.$emit('error', index)
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
    showItem(index) {
      if (this.flag) {
        this.flag = false
        return
      }
      const currentStyle = this.items[index].style
      const style = this.getInitStyle(index)
      if (
        currentStyle.x !== style.x ||
        currentStyle.y !== style.y ||
        currentStyle.scale !== style.scale
      ) {
        style.duration = 0
        this.setStyle(style, index)
      }
    },
    getThumbnail(index) {
      return document.querySelectorAll(this.selector)[index]
    },
    move(x, y, transition = true) {
      const style = this.getCurrentItem().style
      style.duration = transition ? this.animationDuration : 0
      style.x += x
      style.y += y
    },
    moveTo(x, y, transition = true) {
      const style = this.getCurrentItem().style
      style.duration = transition ? this.animationDuration : 0
      style.x = x
      style.y = y
    },
    scaleTo(point, scale, transition = true, check = true) {
      const current = this.items[this.index]
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
      if (this.hideByClick) {
        this.hide()
      }
      this.$emit('singleClick')
    },
    dobuleClick(point) {
      const current = this.getCurrentItem()
      if (current.style.scale === 1) {
        const { x, y, scale } = this.getInitStyle(this.index)
        current.style.scale = scale
        this.moveTo(x, y, true)
      } else {
        this.scaleTo(point, 1, true)
      }
      this.$emit('dobuleClick', current.style.scale)
    },
    getCurrentItem() {
      return this.items[this.index]
    },
    showLoading() {
      if (!this.items[this.index].loaded) {
        // 假进度
        this.progress = Math.floor(Math.random() * 80)
        this.loading = true
      } else {
        this.loading = false
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
    },
    afterLeave() {
      this.lock = false
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
.v-image-viewer-loading {
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
