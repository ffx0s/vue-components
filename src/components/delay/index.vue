<template>
  <transition :name="transitionName">
    <component :is="tag" v-if="loaded" v-show="show"><slot /></component>
  </transition>
</template>

<script>
export default {
  name: 'Delay',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: 'div'
    },
    delay: {
      type: Number,
      default: 300
    },
    duration: {
      type: Number,
      default: 500
    },
    lazy: {
      type: Boolean,
      default: true
    },
    transitionName: {
      type: String,
      default: 'v-fade'
    }
  },
  data() {
    return {
      loaded: !this.lazy,
      show: false
    }
  },
  watch: {
    value: {
      handler: function(value) {
        this.clearTimer()
        if (value) {
          this.showAction()
        } else {
          this.hideAction()
        }
      },
      immediate: true
    }
  },
  methods: {
    showAction() {
      this.showTimer = setTimeout(() => {
        this.loaded = true
        this.show = true
        this.$emit('show')
      }, this.delay)
    },
    hideAction() {
      if (this.show) {
        this.hideTimer = setTimeout(() => {
          this.show = false
          this.$emit('hide')
        }, this.duration)
      }
    },
    clearTimer() {
      clearTimeout(this.showTimer)
      clearTimeout(this.hideTimer)
    }
  }
}
</script>
