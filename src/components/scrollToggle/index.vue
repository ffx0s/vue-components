<!-- 元素上滑收起，下滑显示 -->
<template>
<div class="scroll-toggle-wrap" :style="style">
  <div class="scroll-toggle"
    :class="{
      'scroll-show': show,
      'fixed': status,
      'position-top': status && position === 'top',
      'position-bottom': status && position === 'bottom'
    }"
  >
    <slot></slot>
  </div>
</div>
</template>

<script>
// utils，下面的方法可保存到公共文件里，提供给其他模块复用

// 是否支持 passive 属性
export let supportsPassive = false

try {
  const options = Object.defineProperty({}, 'passive', {
    get: function () {
      supportsPassive = true
    }
  })
  window.addEventListener('testPassive', null, options)
  window.removeEventListener('testPassive', null, options)
} catch (err) {
  // ...
}

function addListener (element, type, fn, options) {
  element.addEventListener(
    type,
    fn,
    supportsPassive ? {
      capture: false,
      passive: true,
      once: false,
      ...options
    }
      : !!options
  )
}

function removeListener (element, type, fn, options) {
  element.removeEventListener(type, fn, options)
}

function getScrollTop () {
  return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
}

export default {
  name: 'ScrollToggle',
  props: {
    // 禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 元素位置，默认头部，可选 top / bottom
    position: {
      type: String,
      default: 'top'
    },
    // 元素高度
    height: {
      type: [Number, String],
      default: 0
    }
  },
  data () {
    return {
      show: false,
      status: '',
      isBind: false,
      lastScrollTop: 0,
      style: {}
    }
  },
  mounted () {
    const style = {
      height: (this.height || this.$el.firstChild.getBoundingClientRect().height) + 'px'
    }
    if (this.position === 'bottom') {
      style.position = 'fixed'
      style.bottom = 0
    }
    this.style = style
    this.bind()
  },
  activated () {
    this.bind()
  },
  deactivated () {
    this.unbind()
  },
  destroyed () {
    this.unbind()
  },
  methods: {
    bind () {
      if (this.isBind) return
      this.isBind = true
      addListener(window, 'scroll', (this.scrollHandle = this.scrollHandle.bind(this)))
    },
    unbind () {
      this.isBind = false
      removeListener(window, 'scroll', this.scrollHandle)
    },
    scrollHandle () {
      if (this.disabled) return

      const scrollTop = getScrollTop()

      if (scrollTop > this.lastScrollTop) {
        this.status = 'down'
        this.show = false
      } else {
        this.status = 'up'
        this.show = true
      }

      if (scrollTop <= 0) {
        this.show = false
        this.status = ''
      }

      this.lastScrollTop = scrollTop
    }
  }
}
</script>

<style scoped>
.scroll-toggle {
  transition: .3s transform;
}
.scroll-toggle-wrap {
  width: 100%;
}
.scroll-toggle.position-top {
  top: 0;
  transform: translate3d(0, -100%, 0);
}
.scroll-toggle.position-bottom {
  bottom: 0;
  transform: translate3d(0, 100%, 0);
}
.scroll-toggle.fixed {
  position: fixed;
  left: 0;
  width: 100%;
  z-index: 5;
}
.scroll-toggle.scroll-show {
  transform: translate3d(0, 0, 0);
}
</style>
