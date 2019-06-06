<template>
  <div>
    <div class="page-navbar-background"></div>
    <Headroom
      class="demo-navbar-headroom"
      :visible="visible"
      v-transfer-dom="transfer"
      pinnedClass="demo-navbar-pinned"
      unpinnedClass="demo-navbar-unpinned"
      transitionClass="demo-navbar-transition"
      @unpinned="unpinned"
      @restore="restore"
    >
      <Navbar
        class="demo-navbar"
        title="NavBar 固定+过渡"
        :backIconColor="backIconColor"
        :border="false"
        fixed
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
        src="../../assets/icon-delete.svg"
        style="width:20px;height:20px;"
      />
    </Navbar>
    <br />
    <Navbar title="高度修改" height="60" />
    <div class="page-navbar-space"></div>
  </div>
</template>

<script>
import Headroom from 'vue-components/headroom'

export default {
  name: 'page-navbar',
  components: {
    Headroom
  },
  data() {
    return {
      visible: false,
      transfer: true,
      backIconColor: '#ffffff'
    }
  },
  beforeRouteLeave(to, from, next) {
    this.visible = false
    next()
  },
  activated() {
    const self = this
    this.$animatedRoute.$once('afterEnter', function() {
      self.visible = true
    })
    this.transfer = true
  },
  deactivated() {
    this.transfer = false
  },
  methods: {
    unpinned() {
      this.backIconColor = '#000000'
    },
    restore() {
      this.backIconColor = '#ffffff'
    }
  }
}
</script>

<style>
.page-navbar-space {
  height: 1000px;
}
.page-navbar-background {
  height: 300px;
  background-image: url('https://static.webfed.cn/o_1d9u7gc8cnpnke014pnu1g25ch.jpg?imageView2/0/w/700');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.demo-navbar {
  color: transparent;
  background-color: transparent;
  transition: 0.3s background, 0.3s color;
}
.demo-navbar-pinned .demo-navbar,
.demo-navbar-unpinned .demo-navbar {
  color: #000;
  background-color: #fff;
}
.demo-navbar-headroom {
  position: fixed;
  top: 0;
}
</style>
