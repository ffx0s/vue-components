<template>
  <transition :name="transitionName">
    <div class="v-popup" v-if="loaded" v-show="value">
      <div class="v-popup-content" :class="'v-popup-content-' + position">
        <slot />
      </div>
      <div
        class="v-popup-overlay"
        v-if="overlay"
        @click="close"
        @touchmove.prevent
      />
    </div>
  </transition>
</template>

<script>
import LazyLoad from '../../mixins/lazyLoad'

export default {
  name: 'Popup',
  mixins: [LazyLoad],
  props: {
    value: {
      type: Boolean,
      default: false
    },
    overlay: {
      type: Boolean,
      default: true
    },
    overlayClick: {
      type: Boolean,
      default: true
    },
    transitionName: {
      type: String,
      default: 'v-popup'
    },
    position: {
      type: String,
      default: 'bottom'
    }
  },
  methods: {
    close() {
      if (this.overlayClick) {
        this.$emit('input', false)
        this.$emit('close')
      }
    }
  }
}
</script>

<style lang="postcss">
.v-popup {
  transition-duration: 300ms;
}
.v-popup-content {
  position: fixed;
  z-index: 10000;
  width: 100%;
  transition: transform 300ms;
  user-select: none;
}

.v-popup-content-top {
  left: 0;
  top: 0;
}
.v-popup-content-right {
  right: 0;
  bottom: 0;
}
.v-popup-content-bottom {
  left: 0;
  bottom: 0;
}
.v-popup-content-left {
  left: 0;
  bottom: 0;
}

.v-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.7);
  transition: opacity 300ms;
}

.v-popup-enter .v-popup-overlay,
.v-popup-leave-active .v-popup-overlay {
  opacity: 0;
}

.v-popup-enter .v-popup-content-bottom,
.v-popup-leave-active .v-popup-content-bottom {
  transform: translateY(100%);
}

.v-popup-enter .v-popup-content-top,
.v-popup-leave-active .v-popup-content-top {
  transform: translateY(-100%);
}

.v-popup-enter .v-popup-content-left,
.v-popup-leave-active .v-popup-content-left {
  transform: translateX(-100%);
}

.v-popup-enter .v-popup-content-right,
.v-popup-leave-active .v-popup-content-right {
  transform: translateX(100%);
}
</style>
