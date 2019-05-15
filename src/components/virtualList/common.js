import {
  view,
  throttle,
  getScrollEventTarget,
  addListener,
  removeListener,
  setScrollTop
} from '../../utils/shared'

export default {
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    data: {
      type: Array,
      default: () => []
    },
    itemSize: {
      type: Number,
      default: 100
    },
    multiple: {
      type: Number,
      default: 2
    },
    minMultiple: {
      type: Number,
      default: 2
    },
    visibleHeight: Number,
    scrollOffset: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      startOffset: 0,
      endOffset: 0,
      visibleData: []
    }
  },
  created() {
    this.listVisibleHeight = this.visibleHeight || view.height()
    this.visibleCount = Math.ceil(this.listVisibleHeight / this.itemSize)
    this.renderCount =
      this.visibleCount * Math.max(this.multiple, this.minMultiple) + 1
    this.isBind = false
    this.start = 0
  },
  mounted() {
    this.bind()
    if (this.data.length) {
      this.updateVisibleData()
    }
  },
  activated() {
    this.bind()
  },
  deactivated() {
    this.unbind()
  },
  beforeDestroy() {
    this.unbind()
  },
  methods: {
    bind() {
      if (this.isBind) return
      this.isBind = true
      this.scrollEl = getScrollEventTarget(this.$el)
      this.scrollHandler = throttle(this.scrollHandler, 50)
      addListener(this.scrollEl, 'scroll', this.scrollHandler)
    },
    unbind() {
      removeListener(this.scrollEl, 'scroll', this.scrollHandler)
      this.isBind = false
      this.scrollEl = null
    },
    setScrollOffset(offset) {
      setScrollTop(this.scrollEl, offset)
    },
    reload(clearCache) {
      if (clearCache) {
        this.itemRects = []
        this.visibleData = []
        this.lastIndex = -1
      }
      this.$nextTick(this.updateVisibleData)
    }
  }
}
