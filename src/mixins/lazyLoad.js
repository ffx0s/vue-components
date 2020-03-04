export default {
  props: {
    lazy: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      loaded: !this.lazy
    }
  },
  watch: {
    value: {
      handler: function(show) {
        if (show && !this.loaded) {
          this.loaded = true
          this.$emit('loaded')
        }
      },
      immediate: true
    }
  }
}
