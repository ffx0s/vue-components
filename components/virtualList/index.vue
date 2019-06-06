<template>
  <WithScroll :onscroll="handleScroll" :wait="50" ref="withScroll">
    <component :is="tag" class="v-virtual-list">
      <div :style="style"><slot :visibleData="visibleData" /></div>
    </component>
  </WithScroll>
</template>

<script>
import WithScroll from '../withScroll'
import common from './common'

export default {
  name: 'VirtualList',
  components: {
    WithScroll
  },
  mixins: [common],
  computed: {
    style() {
      return {
        paddingTop: this.startOffset + 'px',
        paddingBottom: this.endOffset + 'px'
      }
    }
  },
  methods: {
    handleScroll(scrollTop) {
      const offset = scrollTop - this.scrollOffset
      const index = Math.max(Math.floor(offset / this.itemSize), 0)
      if (index + this.visibleCount >= this.end) {
        this.start = index
        this.updateVisibleData()
      } else if (index < this.start) {
        this.start = Math.max(index - this.visibleCount, 0)
        this.updateVisibleData()
      }
    },
    updateVisibleData() {
      const total = this.data.length
      this.end = Math.min(this.start + this.renderCount, total)
      this.startOffset = this.start * this.itemSize
      this.endOffset = (total - this.end) * this.itemSize
      this.visibleData = JSON.parse(
        JSON.stringify(this.data.slice(this.start, this.end))
      )
    },
    remove(visibleIndex) {
      if (visibleIndex < 0 || visibleIndex > this.visibleData.length) return
      const dataIndex = this.start + visibleIndex
      this.data.splice(dataIndex, 1)
      this.updateVisibleData()
    },
    scrollToIndex(index) {
      this.setScrollOffset(index * this.itemSize + this.scrollOffset)
    }
  }
}
</script>
