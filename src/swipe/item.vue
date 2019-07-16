<template>
  <div class="v-swipe__item">
    <div class="v-swipe__content" v-if="loaded" v-show="show">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SwipeItem',
  props: {
    lazy: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: !this.$parent.optimization,
      loaded: !this.lazy
    }
  }
}
</script>

<style lang="postcss">
.v-swipe__item {
  position: relative;
  flex: 0 0 100%;
}
.v-swipe__content {
  height: 100%;
}
</style>
