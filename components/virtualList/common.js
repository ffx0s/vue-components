import { view } from '../utils/shared'

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
    this.start = 0
  },
  mounted() {
    if (this.data.length) {
      this.updateVisibleData()
    }
  },
  methods: {
    setScrollOffset(offset) {
      this.$refs.withScroll.setScrollTop(offset)
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
