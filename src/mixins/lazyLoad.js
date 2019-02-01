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
  created() {
    let unwatch = this.$watch(
      'value',
      function(show) {
        if (!this.loaded && show) {
          this.loaded = true
          this.$emit('loaded')
        }
        if (this.loaded) {
          setTimeout(() => {
            unwatch()
            unwatch = null
          })
        }
      },
      { immediate: true }
    )
  }
}
