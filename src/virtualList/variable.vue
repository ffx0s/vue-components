<template>
  <WithScroll @scroll="handleScroll" :wait="50" ref="withScroll">
    <component :is="tag" class="v-virtual-variable" :style="style">
      <slot
        :visibleData="visibleData"
        :getVisibleItemRect="getVisibleItemRect"
      />
    </component>
  </WithScroll>
</template>

<script>
import WithScroll from '../withScroll'
import common from './common'

export default {
  name: 'VirtualListVariable',
  components: {
    WithScroll
  },
  mixins: [common],
  props: {
    itemSizeGetter: Function
  },
  data() {
    return {
      listScrollSize: 0
    }
  },
  computed: {
    style() {
      return {
        paddingTop: this.startOffset + 'px',
        height: this.listScrollSize + 'px'
      }
    }
  },
  created() {
    this.lastIndex = -1
    this.itemRects = []
  },
  beforeDestroy() {
    this.itemRects = null
  },
  methods: {
    handleScroll(scrollTop) {
      const offset = scrollTop - this.scrollOffset
      const index = this.getStartIndex(offset)
      if (
        offset + this.listVisibleHeight >=
        this.getItemRect(this.end - 1).offset
      ) {
        this.start = index
        this.updateVisibleData()
      } else if (index < this.start) {
        this.start = Math.max(index - 1, 0)
        this.updateVisibleData()
      }
    },
    getStartIndex(offset) {
      const lastOffset = this.getItemRect(this.lastIndex).offset
      return lastOffset > offset // 大于 offset 则 index 的值在 0~this.lastIndex 中，使用二分查找
        ? this.binarySearch(0, this.lastIndex, offset)
        : this.exponentialSearch(this.lastIndex, offset)
    },
    // Forked from react-virtualized 💖
    exponentialSearch(index, offset) {
      const dataLength = this.data.length
      let interval = 1

      while (index < dataLength && this.getItemRect(index).offset < offset) {
        index += interval
        interval *= 2
      }

      return this.binarySearch(
        Math.floor(index / 2),
        Math.min(index, dataLength - 1),
        offset
      )
    },
    // Forked from react-virtualized 💖
    binarySearch(low, high, offset) {
      let middle = 0
      let currentOffset = 0

      while (low <= high) {
        middle = low + Math.floor((high - low) / 2)
        currentOffset = this.getItemRect(middle).offset

        if (currentOffset === offset) {
          return middle
        } else if (currentOffset < offset) {
          low = middle + 1
        } else if (currentOffset > offset) {
          high = middle - 1
        }
      }
      if (low > 0) {
        return low - 1
      }

      return 0
    },
    updateVisibleData() {
      const total = this.data.length
      if (!total) return
      this.end = Math.min(this.start + this.renderCount, total)
      this.startOffset = this.getItemRect(this.start).offset
      this.listScrollSize = this.getListScrollSize()
      this.visibleData = JSON.parse(
        JSON.stringify(this.data.slice(this.start, this.end))
      )
    },
    getItemRect(index) {
      if (this.itemRects[index]) return this.itemRects[index]
      const data = this.data
      const lastIndex = this.lastIndex
      if (lastIndex < index) {
        const lastItemRect = this.itemRects[lastIndex] || { size: 0, offset: 0 }
        let offset = lastItemRect.size + lastItemRect.offset
        let i = lastIndex + 1
        for (i; i <= index; i++) {
          const size = this.itemSizeGetter(data[i], i)
          this.itemRects[i] = { offset, size }
          offset += size
        }
        this.lastIndex = index
        return this.itemRects[index]
      }
    },
    getVisibleItemRect(visibleIndex) {
      return this.itemRects[this.start + visibleIndex]
    },
    getListScrollSize() {
      const endItemRect = this.getItemRect(this.end - 1)
      return (
        endItemRect.offset +
        endItemRect.size +
        (this.data.length - this.end) * this.itemSize
      )
    },
    remove(visibleIndex) {
      if (visibleIndex < 0 || visibleIndex > this.visibleData.length) return
      const dataIndex = this.start + visibleIndex
      const size = this.itemRects[dataIndex].size
      this.itemRects.splice(dataIndex, 1)
      this.data.splice(dataIndex, 1)
      this.lastIndex -= 1
      this.updateItemsOffset(dataIndex, -size)
      this.updateVisibleData()
    },
    updateItemsOffset(index, offset) {
      const itemRects = this.itemRects
      const itemLength = itemRects.length
      for (index; index < itemLength; index++) {
        itemRects[index].offset += offset
      }
    },
    scrollToIndex(index) {
      const itemRect = this.getItemRect(
        Math.max(Math.min(index, this.data.length - 1), 0)
      )
      this.setScrollOffset(itemRect.offset - this.scrollOffset)
    }
  }
}
</script>

<style lang="postcss">
.v-virtual-variable {
  box-sizing: border-box;
}
</style>
