<template>
  <transition
    name="v-image-viewer"
    @beforeEnter="beforeEnter"
    @afterEnter="afterEnter"
    @beforeLeave="beforeLeave"
    @afterLeave="afterLeave"
  >
    <div class="v-image-viewer" v-if="loaded" v-show="value">
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
      <div class="v-image-viewer__touch" ref="touch">
        <Swipe
          class="v-image-viewer__swipe"
          ref="swipe"
          v-model="index"
          @showPrev="setInitStyle"
          @showNext="setInitStyle"
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
            class="v-image-viewer__item"
            ref="swipeItems"
            v-for="(item, i) in items"
            :key="item.uid"
            lazy
          >
            <img
              v-if="!item.loaded || item.error"
              class="v-image-viewer__img"
              :src="images[i].thumbnail"
            />
            <img
              v-if="!item.error"
              class="v-image-viewer__img"
              :src="images[i].src"
              @load="onload(i)"
              @error="onerror(i)"
            />
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
import lazyLoad from '../mixins/lazyLoad'
import touch from './touch'
import Swipe from '../swipe/swipe'
import SwipeItem from '../swipe/item'
import Ring from '../ring'
import Delay from '../delay'
import ETouch from '../utils/etouch'
import { view, toFixed } from '../utils/shared'
import { imgContain } from './helpers'

let uid = 0

export default {
  name: 'ImageViewer',
  components: {
    Swipe,
    SwipeItem,
    Ring,
    Delay
  },
  mixins: [lazyLoad, touch],
  props: {
    images: {
      type: Array,
      default: () => []
    },
    zoomAnimationDuration: {
      type: Number,
      default: 350
    },
    swipeAnimationDuration: {
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
    },
    hideScale: {
      type: Number,
      default: 0.8
    }
  },
  data() {
    return {
      index: 0,
      value: false,
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
        this.imagesChange = true

        const items = []
        const styles = []

        images.forEach(image => {
          items.push({
            loaded: false,
            error: false,
            uid: ++uid
          })
          styles.push({
            style: {
              width: image.w,
              height: image.h
            }
          })
        })

        this.styles = styles
        this.items = items
      },
      immediate: true
    }
  },
  created() {
    this.rafSetStyle = ETouch.rAFThrottle(this.setStyle)
  },
  beforeDestroy() {
    if (this.touch) {
      this.touch.destroy()
      this.touch = null
    }
  },
  methods: {
    showLoading() {
      if (this.items[this.index].loaded) {
        this.loading = false
      } else {
        // 假进度
        this.progress = Math.floor(Math.random() * 80)
        this.loading = true
      }
    },
    show({ selector, index }) {
      if (this.value) return

      this.value = true
      this.showing = true
      this.selector = selector
      this.items[index].error = false

      const swipe = this.$refs.swipe

      if (swipe) {
        if (this.imagesChange && index === this.index) {
          swipe.showItem(index)
          this.imagesChange = false
        }
        swipe.showCurrentItem(index)
      }

      this.index = index
    },
    hide() {
      this.zoomOutAnimation()
      this.value = false
    },
    getThumbnail(index) {
      return document.querySelectorAll(this.selector)[index]
    },
    getCurrentStyle() {
      return this.styles[this.index].style
    },
    getCurrentInitStyle() {
      return this.styles[this.index].initStyle
    },
    getInitStyle(index) {
      const current = this.styles[index]

      if (!current.initStyle) {
        current.initStyle = imgContain(
          current.style.width,
          current.style.height,
          view.width(),
          view.height()
        )
      }

      return current.initStyle
    },
    setInitStyle(index, duration = 0) {
      const style = this.styles[index].style
      const { x, y, scale } = this.getInitStyle(index)

      if (style.x !== x || style.y !== y || style.scale !== scale) {
        this.rafSetStyle.cancel()
        this.updateElement({ x, y, duration, scale }, index)
      }
    },
    setStyle(style, index) {
      const { x, y, scale, duration, width, height } = style
      const elStyle = this.$refs.swipeItems[index].$el.children[0].style

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
    updateElement(style, index) {
      if (index === undefined) index = this.index

      this.rafSetStyle(Object.assign(this.styles[index].style, style), index)
    },
    updateoverlayOpacity(value) {
      this.$refs.overlay.style.opacity = toFixed(value, 4)
      this.overlayOpacity = value
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
      this.validation(null, true)
    },
    zoomInAnimation() {
      const index = this.index
      const thumbnail = this.selector && this.getThumbnail(index)

      if (thumbnail) {
        const position = thumbnail.getBoundingClientRect()
        const style = this.getCurrentStyle()

        Object.assign(style, {
          x: position.left,
          y: position.top,
          scale: position.width / style.width,
          duration: 0
        })

        this.setStyle(style, index)

        setTimeout(() => {
          this.setInitStyle(index, this.zoomAnimationDuration)
        }, 50)
      } else {
        this.setInitStyle(index)
      }
    },
    zoomOutAnimation() {
      let x, y, scale
      const thumbnail = this.selector && this.getThumbnail(this.index)

      if (thumbnail) {
        const rect = thumbnail.getBoundingClientRect()
        x = rect.left
        y = rect.top
        scale = rect.width / this.getCurrentStyle().width
      } else {
        x = view.width() / 2
        y = view.height() / 2
        scale = 0
      }

      this.updateElement({
        x,
        y,
        scale,
        duration: this.zoomAnimationDuration
      })
    },
    beforeEnter() {
      this.lock = true

      this.zoomInAnimation()
      this.showLoading()

      if (this.overlayOpacity < 1) {
        this.updateoverlayOpacity(1)
      }

      if (!this.touch) {
        this.createTouch()
      }
    },
    afterEnter() {
      this.lock = false
      this.showing = false
      this.showToolbar = true
    },
    beforeLeave() {
      this.lock = true
      this.showToolbar = false
    },
    afterLeave() {
      this.lock = true
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
.v-image-viewer .v-swipe__content {
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
