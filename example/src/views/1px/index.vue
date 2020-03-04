<template>
  <div style="background-color: #fff;">
    <Navbar title="1像素边框" />
    <div class="app--spacing">
      <div class="px__item v-bd-top">上边框</div>
      <div class="px__item v-bd-bottom">下边框</div>
      <div class="px__item v-bd-top-bottom">上下边框</div>
      <div class="px__item v-bd-left">左边框</div>
      <div class="px__item v-bd-right">右边框</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page-1px'
}
</script>

<style lang="postcss">
.px__item {
  margin: 40px auto;
  width: 200px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background-color: rgba(195, 236, 255, 0.12);
}
</style>
