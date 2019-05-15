<template>
  <div>
    <div class="page-scrollToggle-space"></div>
    <ScrollToggle :visible="visible" v-transfer-dom="transfer">
      <Navbar title="ScrollToggle">
        <VButton
          slot="right"
          small
          type="icon"
          @click="
            $store.commit('page/drawerShow', { show: true, direction: 'right' })
          "
        >
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
    </ScrollToggle>

    <h4 class="text-center">在有transform属性的父元素里使用会失效</h4>

    <ul class="items">
      <li v-for="i in 10" :key="i">{{ i }}</li>
    </ul>

    <ScrollToggle
      :visible="visible"
      v-transfer-dom="transfer"
      position="bottom"
      initialClass="demo-scrollToTop-initial"
      pinnedClass="demo-scrollToTop-pinned"
      unpinnedClass="demo-scrollToTop-unpinned"
      transitionClass="demo-scrollToTop-transition"
      style="width:45px; bottom:100px; right:20px;"
    >
      <div class="demo-scrollToTop">↑</div>
    </ScrollToggle>

    <ScrollToggle
      :visible="visible"
      v-transfer-dom="transfer"
      position="bottom"
    >
      <VButton class="demo-scrollToggle-bottom" block type="primary">
        Bottom
      </VButton>
    </ScrollToggle>
  </div>
</template>

<script>
import ScrollToggle from '@/components/scrollToggle'
import VButton from '@/components/button'

export default {
  name: 'page-scroll-toggle',
  components: {
    ScrollToggle,
    VButton
  },
  data() {
    return {
      visible: false,
      transfer: true
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
  }
}
</script>

<style>
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
.demo-scrollToggle-bottom {
  border-radius: 0;
}

.page-scrollToggle-space {
  height: 46px;
}
</style>
