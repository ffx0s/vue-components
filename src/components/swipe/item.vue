<template>
  <div class="v-swipe-item">
    <div class="v-swipe-item-content" ref="swipeItemContent" v-show="show">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SwipeItem',
  data() {
    return {
      show: true
    }
  },
  created() {
    if (this.$parent.optimization) {
      this.show = false
    }
  }
}
</script>

<style lang="postcss">
.v-swipe-item {
  position: relative;
  flex: 0 0 100%;
}
.v-swipe-item-content {
  height: 100%;
}
</style>
