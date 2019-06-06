<template>
  <WithScroll
    rAF
    class="v-haedroom"
    :class="[{ 'v-headroom-visible': visible }, 'v-headroom-' + position]"
    :style="{ height: this.containerHeight + 'px' }"
    :onscroll="update"
  >
    <div
      :class="[
        initialClass,
        toggleClass && transitionClass,
        toggleClass,
        { 'v-headroom-notransition': !fixed && noTransition }
      ]"
      ref="headroom"
    >
      <slot />
    </div>
  </WithScroll>
</template>

<script>
import WithScroll from '../withScroll'

export default {
  name: 'Headroom',
  components: {
    WithScroll
  },
  props: {
    // 禁用
    disabled: {
      type: Boolean,
      default: false
    },
    fixed: {
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
      type: Number,
      default: 0
    },
    // 滚动时的阻力
    resistance: {
      type: Number,
      default: 10
    },
    // 开始滚动到结束期间，lastTop - startTop 的绝对值，超过这个值至少触发一次更新
    maxTop: {
      type: Number,
      default: 100
    },
    visible: {
      type: Boolean,
      default: true
    },
    pinnedClass: {
      type: String,
      default: 'v-headroom-pinned'
    },
    unpinnedClass: {
      type: String,
      default: 'v-headroom-unpinned'
    },
    transitionClass: {
      type: String,
      default: 'v-headroom-transition'
    },
    initialClass: {
      type: String,
      default: 'v-headroom-initial'
    }
  },
  data() {
    const isTop = this.position === 'top'
    return {
      isTop,
      noTransition: isTop,
      toggleClass: '',
      containerHeight: this.height
    }
  },
  mounted() {
    this.lastTop = 0
    this.startTop = 0
    this.containerHeight =
      this.height || this.$refs.headroom.firstChild.offsetHeight
  },
  methods: {
    update(scrollTop) {
      if (this.disabled) return
      if (scrollTop <= 0) return this.restore()
      if (this.startTop === 0) {
        this.startTop = scrollTop
      }
      if (
        // 元素出现在可视区并且处于未固定状态则固定它
        scrollTop < this.containerHeight &&
        this.toggleClass === this.unpinnedClass
      ) {
        this.pinned()
      } else if (
        // 两次滚动的差值大于 resistance 才更新，防止频繁更新导致误操作
        (Math.abs(this.lastTop - scrollTop) >= this.resistance ||
          // 开始滚动到最后一次 scrollTop 的绝对值，超过 maxTop 则更新一次
          Math.abs(this.lastTop - this.startTop) > this.maxTop) &&
        scrollTop > this.containerHeight
      ) {
        this[scrollTop > this.lastTop ? 'unpinned' : 'pinned']()
        this.startTop = 0
      }

      this.lastTop = scrollTop
    },
    pinned() {
      this.toggleClass = this.pinnedClass
      this.noTransition = false
      this.$emit('pinned')
    },
    unpinned() {
      this.toggleClass = this.unpinnedClass
      this.$emit('unpinned')
    },
    restore() {
      this.toggleClass = ''
      this.noTransition = this.isTop
      this.$emit('restore')
    }
  }
}
</script>

<style lang="postcss">
.v-haedroom {
  width: 100%;
  z-index: 99996;
  opacity: 0;
  transition: opacity 0.2s;
}
.v-headroom-visible {
  opacity: 1;
}
.v-headroom-pinned {
  transform: translateZ(0) translateY(0);
}
.v-headroom-top {
  position: relative;
}
.v-headroom-bottom {
  position: fixed;
  bottom: 0;
  transform: translateZ(0);
  & .v-headroom-unpinned {
    transform: translateZ(0) translateY(100%);
  }
}
.v-headroom-top {
  & .v-headroom-unpinned {
    transform: translateZ(0) translateY(-100%);
  }
}
.v-headroom-transition {
  position: fixed;
  left: 0;
  width: 100%;
  z-index: 5;
  transition: 0.3s transform ease-in-out;
}
.v-headroom-notransition {
  transition-duration: 0s;
}
</style>
