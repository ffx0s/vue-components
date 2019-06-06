<template>
  <div style="background-color: #fff;">
    <Navbar title="1像素边框" />
    <div class="page-spacing">
      <div class="page-1px-item v-bd-y-top">上边框</div>
      <div class="page-1px-item v-bd-y-bottom">下边框</div>
      <div class="page-1px-item v-bd-y-top-bottom">上下边框</div>
      <div class="page-1px-item v-bd-x-left">左边框</div>
      <div class="page-1px-item v-bd-x-right">右边框</div>
      <div class="page-1px-item v-bd-x-left-right">左右边框</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page-1px'
}
</script>

<style lang="postcss">
.page-1px-item {
  margin: 40px auto;
  width: 200px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background-color: rgba(195, 236, 255, 0.12);
}
</style>
