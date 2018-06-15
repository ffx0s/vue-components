<!-- 滚动视图 -->
<template>
<div @touchmove.stop="() => {}" class="scroll-view" :class="this.scrollX ? 'x' : 'y'">
  <template v-if="this.scrollX">
    <div :style="{ width: this.maxWidth + 'px' }">
      <div class="left">
        <slot></slot>
      </div>
    </div>
  </template>
  <template v-else>
    <slot></slot>
  </template>
</div>
</template>

<script>
export default {
  name: 'ScrollView',
  props: {
    // 最大宽度，只作用于横向滚动
    maxWidth: {
      type: Number,
      required: false,
      default: 5000
    },
    // 是否横向滚动，默认是垂直滚动
    scrollX: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style scoped>
.scroll-view {
  width: 100%;
  height: 100%;
  -webkit-overflow-scrolling: touch;
}
.scroll-view.x {
  overflow-x: auto;
  overflow-y: hidden;
}
.scroll-view.y {
  overflow-y: auto;
  overflow-x: hidden;
}
.left {
  float: left;
}
</style>
