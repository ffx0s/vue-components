<template>
  <footer class="v-tab-bar v-bd-top"><slot /></footer>
</template>

<script>
export default {
  name: 'TabBar',
  props: {
    value: {
      type: Number,
      default: -1,
      required: false
    },
    activeClass: {
      type: String,
      default: 'v-tab-bar--active'
    }
  },
  mounted() {
    this.$children.forEach((item, index) => {
      item.index = index
    })
  }
}
</script>

<style lang="postcss">
.v-tab-bar {
  display: flex;
  height: 52px;
  background-color: #f7f7f8;
}
</style>
