<template>
  <div>
    <div class="page-headroom-space" v-show="shouldTransfer"></div>
    <Headroom :visible="visible" fixed v-transfer-dom="shouldTransfer">
      <Navbar title="Headroom">
        <VButton slot="right" small type="icon" @click="showDrawer">
          <svg viewBox="0 0 1024 1024" style="width:25px;height:25px;">
            <path
              d="M800 320 224 320c-17.664 0-32-14.336-32-32s14.336-32 32-32l576 0c17.696 0 32 14.336 32 32S817.696 320 800 320z"
              fill="currentColor"
            />
            <path
              d="M800 544 224 544c-17.664 0-32-14.336-32-32s14.336-32 32-32l576 0c17.696 0 32 14.336 32 32S817.696 544 800 544z"
              fill="currentColor"
            />
            <path
              d="M800 768 224 768c-17.664 0-32-14.336-32-32s14.336-32 32-32l576 0c17.696 0 32 14.336 32 32S817.696 768 800 768z"
              fill="currentColor"
            />
          </svg>
        </VButton>
      </Navbar>
    </Headroom>

    <h4 class="text-center">在有transform属性的父元素里使用会失效</h4>

    <ul class="page-headeroom-items">
      <li v-for="i in 10" :key="i">{{ i }}</li>
    </ul>

    <Headroom
      :visible="visible"
      v-transfer-dom="shouldTransfer"
      position="bottom"
      initialClass="demo-scrollToTop-initial"
      pinnedClass="demo-scrollToTop-pinned"
      unpinnedClass="demo-scrollToTop-unpinned"
      transitionClass="demo-scrollToTop-transition"
      style="width:45px; bottom:100px; right:20px;"
    >
      <div class="demo-scrollToTop">↑</div>
    </Headroom>

    <Headroom
      :visible="visible"
      v-transfer-dom="shouldTransfer"
      position="bottom"
    >
      <VButton block type="primary" style="border-radius: 0"> Toolbar </VButton>
    </Headroom>
  </div>
</template>

<script>
import Headroom from 'vue-components/headroom'
import VButton from 'vue-components/button'

export default {
  name: 'page-headroom',
  components: {
    Headroom,
    VButton
  },
  data() {
    return {
      visible: true,
      transfer: true
    }
  },
  computed: {
    drawerShow() {
      return this.$store.state.page.drawerShow
    },
    shouldTransfer() {
      return this.transfer && !this.drawerShow
    }
  },
  beforeRouteLeave(to, from, next) {
    this.visible = false
    next()
  },
  activated() {
    this.visible = true
    this.transfer = true
  },
  deactivated() {
    this.transfer = false
  },
  methods: {
    showDrawer() {
      this.$store.commit('page/drawerShow', {
        show: true,
        direction: 'right'
      })
    }
  }
}
</script>

<style lang="postcss">
.demo-scrollToTop {
  width: 45px;
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  background-color: rgba(0, 0, 0, 0.4);
  color: #fff;
  border-radius: 4px;
}

.demo-scrollToTop-initial,
.demo-scrollToTop-unpinned {
  opacity: 0;
}
.demo-scrollToTop-pinned {
  opacity: 1;
}
.demo-scrollToTop-transition {
  transition: 0.3s opacity;
}
.page-headroom-space {
  height: 46px;
}
.page-headeroom-items {
  padding: 0 10px;
  margin: 0;
  margin-top: 10px;
  font-size: 0;
  list-style-type: none;
  & li {
    margin-bottom: 10px;
    width: 100%;
    height: 120px;
    line-height: 120px;
    background: #fff;
    border-radius: 4px;
    font-size: 16px;
    text-align: center;
  }
}
</style>
