<template>
  <div class="v-drawer" v-if="loaded" v-show="show" :style="drawerStyle">
    <div class="v-drawer-content"><slot /></div>
    <div
      class="v-drawer-overlay"
      :style="overlayStyle"
      @click="close"
      @touchmove.prevent
    ></div>
  </div>
</template>

<script>
import { addListener, removeListener } from '../../utils/shared'

export default {
  name: 'Drawer',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    left: {
      type: Boolean,
      default: true
    },
    right: {
      type: Boolean,
      default: false
    },
    selector: {
      type: String,
      required: true
    },
    transitionClass: {
      type: String,
      default: 'v-drawer-transition'
    },
    width: {
      type: [String, Number],
      default: 260
    },
    lazy: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      show: false,
      running: false,
      loaded: !this.lazy
    }
  },
  computed: {
    drawerStyle() {
      const style = { width: this.width + 'px' }
      if (this.left) style.left = 0
      else style.right = 0
      return style
    },
    overlayStyle() {
      if (this.left) return { left: this.width + 'px' }
      return { right: this.width + 'px' }
    }
  },
  watch: {
    value(value, oldValue) {
      if (value !== oldValue) {
        value ? this.open() : this.close()
      }
    }
  },
  mounted() {
    if (this.value) {
      this.open()
      this.$nextTick(() => {
        this.running = false
      })
    }
  },
  methods: {
    open() {
      this.loaded = true
      if (this.running) return
      const el = document.querySelector(this.selector)
      if (el) {
        this.show = true
        this.bind(el)
        this.$nextTick(() => {
          this.animate(
            el,
            `translate3d(${this.left ? this.width : -this.width}px,0,0)`
          )
        })
      }
    },
    close() {
      if (this.running) return
      const el = document.querySelector(this.selector)
      if (el) {
        this.animate(el, null)
      }
      this.$emit('input', false)
    },
    bind(el) {
      if (this.isBind) return
      addListener(el, 'transitionend', this.transitionend)
      addListener(el, 'webkitTransitionEnd', this.transitionend)
      this.isBind = true
    },
    unbind(el) {
      removeListener(el, 'transitionend', this.transitionend)
      removeListener(el, 'webkitTransitionEnd', this.transitionend)
      this.isBind = false
    },
    transitionend(event) {
      const el = event.target
      if (!this.value && el.classList.contains(this.transitionClass)) {
        this.unbind(el)
        el.classList.remove(this.transitionClass)
        this.show = false
      }
      this.running = false
    },
    animate(el, value) {
      this.running = true
      el.classList.add(this.transitionClass)
      el.style.transform = el.style.webkitTransform = value
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
.v-drawer-content {
  overflow: auto;
  height: 100%;
  -webkit-overflow-scrolling: touch;
}
.v-drawer-transition {
  transition: transform 0.4s;
}
.v-drawer-overlay {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
  background-color: transparent;
}
</style>
