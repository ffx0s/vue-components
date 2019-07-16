<template>
  <div class="v-drawer" v-if="loaded" v-show="show" :style="drawerStyle">
    <div class="v-drawer__content"><slot /></div>
    <div
      class="v-drawer__overlay"
      :style="overlayStyle"
      @click="close"
      @touchmove.prevent
    />
  </div>
</template>

<script>
import { addListener, removeListener } from '../utils/shared'
import LazyLoad from '../mixins/lazyLoad'

export default {
  name: 'Drawer',
  mixins: [LazyLoad],
  props: {
    value: {
      type: Boolean,
      required: true
    },
    direction: {
      type: String,
      default: 'left'
    },
    selector: {
      type: String,
      required: true
    },
    transitionClass: {
      type: String,
      default: 'v-drawer--transition'
    },
    width: {
      type: [String, Number],
      default: 260
    }
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    drawerStyle() {
      return { [this.direction]: 0, width: this.width + 'px' }
    },
    overlayStyle() {
      return { [this.direction]: this.width + 'px' }
    }
  },
  watch: {
    value(value) {
      value ? this.open() : this.close()
    }
  },
  mounted() {
    if (this.value) {
      this.open()
      this.$nextTick(() => {
        this.isMoving = false
      })
    }
  },
  methods: {
    open() {
      if (this.isMoving) return
      const page = document.querySelector(this.selector)
      if (page) {
        this.show = true
        this.bind(page)
        this.$nextTick(() => {
          const style = `translate3d(${
            this.direction === 'left' ? this.width : -this.width
          }px,0,0)`
          this.animate(page, style)
        })
      }
    },
    close() {
      if (this.isMoving) return
      const page = document.querySelector(this.selector)
      if (page) {
        this.animate(page, null)
      }
      this.$emit('input', false)
      this.$emit('close')
    },
    bind(page) {
      if (this.isBind) return
      addListener(page, 'transitionend', this.transitionend)
      addListener(page, 'webkitTransitionEnd', this.transitionend)
      this.isBind = true
    },
    unbind(page) {
      removeListener(page, 'transitionend', this.transitionend)
      removeListener(page, 'webkitTransitionEnd', this.transitionend)
      this.isBind = false
    },
    transitionend(event) {
      const page = event.target
      const isRemoveEvent =
        !this.value && page.classList.contains(this.transitionClass)

      if (isRemoveEvent) {
        this.unbind(page)
        page.classList.remove(this.transitionClass)
        this.show = false
      }
      this.isMoving = false
    },
    animate(page, value) {
      this.isMoving = true
      page.classList.add(this.transitionClass)
      page.style.transform = page.style.webkitTransform = value
    }
  }
}
</script>

<style lang="postcss">
.v-drawer {
  position: absolute;
  top: 0;
  width: 260px;
  height: 100%;
}
.v-drawer__content {
  overflow: auto;
  height: 100%;
  -webkit-overflow-scrolling: touch;
}
.v-drawer--transition {
  transition: transform 0.4s;
}
.v-drawer__overlay {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
  background-color: transparent;
}
</style>
