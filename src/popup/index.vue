<template>
  <transition :name="transitionName">
    <div class="v-popup" v-if="loaded" v-show="value">
      <div
        class="v-popup__content"
        :class="['v-popup--' + position, contentClass]"
      >
        <slot />
      </div>
      <div
        class="v-popup__overlay"
        v-if="overlay"
        @click="close"
        @touchmove.prevent
      />
    </div>
  </transition>
</template>

<script>
import lazyLoad from '../mixins/lazyLoad'

export default {
  name: 'Popup',
  mixins: [lazyLoad],
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
    },
    contentClass: {
      type: String,
      default: ''
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
:root {
  --duration: 300ms;
}
.v-popup {
  transition-duration: var(--duration);
}
.v-popup__content {
  position: fixed;
  z-index: 10000;
  width: 100%;
  transition: transform var(--duration);
  user-select: none;
}

.v-popup--top {
  left: 0;
  top: 0;
}
.v-popup--right {
  right: 0;
  bottom: 0;
}
.v-popup--bottom {
  left: 0;
  bottom: 0;
}
.v-popup--left {
  left: 0;
  bottom: 0;
}

.v-popup__overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.7);
  transition: opacity var(--duration);
}

.v-popup-enter .v-popup__overlay,
.v-popup-leave-active .v-popup__overlay {
  opacity: 0;
}

.v-popup-enter .v-popup--bottom,
.v-popup-leave-active .v-popup--bottom {
  transform: translateY(100%);
}

.v-popup-enter .v-popup--top,
.v-popup-leave-active .v-popup--top {
  transform: translateY(-100%);
}

.v-popup-enter .v-popup--left,
.v-popup-leave-active .v-popup--left {
  transform: translateX(-100%);
}

.v-popup-enter .v-popup--right,
.v-popup-leave-active .v-popup--right {
  transform: translateX(100%);
}
</style>
