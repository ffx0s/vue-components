<template>
  <div>
    <div class="navbar-background"></div>
    <Headroom
      pinnedClass="navbar--pinned"
      unpinnedClass="navbar--unpinned"
      transitionClass=""
      transformFixed
    >
      <Navbar
        class="navbar-fixed-header"
        title="NavBar 固定+过渡"
        :border="false"
      />
    </Headroom>
    <br />
    <Navbar
      title="颜色修改"
      titleColor="#ffffff"
      backgroundColor="#444"
      backIconColor="#ffffff"
    >
    </Navbar>
    <br />
    <Navbar title="两侧内容修改">
      <div @click="$toast('返回')" slot="left">返回</div>
      <img
        @click="$toast('删除')"
        slot="right"
        src="../../assets/images/icon-delete.svg"
        style="width:20px;height:20px;"
      />
    </Navbar>
    <br />
    <Navbar title="高度修改" height="60" />
    <div style="height: 1000px"></div>
  </div>
</template>

<script>
import Headroom from 'lvan/headroom'

export default {
  name: 'page-navbar',
  components: {
    Headroom
  }
}
</script>

<style lang="postcss">
.navbar-background {
  height: 300px;
  background-image: url('https://static.webfed.cn/ceddJB493dB4A.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.navbar-fixed-header {
  color: transparent;
  background-color: transparent;
  transition: 0.3s background, 0.3s color;
  & .v-button {
    color: #fff;
  }
}
.navbar--pinned .navbar-fixed-header,
.navbar--unpinned .navbar-fixed-header {
  color: #000;
  background-color: #fff;
  & .v-button {
    color: #000;
  }
}
</style>
