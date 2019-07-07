<template>
  <div>
    <div class="page-headroom-space">
      <Headroom transformFixed="top">
        <Navbar title="Headroom" />
      </Headroom>
    </div>

    <ul class="page-headeroom-items">
      <li v-for="i in 10" :key="i">{{ i }}</li>
    </ul>

    <Headroom
      transformFixed="bottom|100"
      position="bottom"
      initialClass="demo-scrollToTop-initial"
      pinnedClass="demo-scrollToTop-pinned"
      unpinnedClass="demo-scrollToTop-unpinned"
      transitionClass="demo-scrollToTop-transition"
      style="width:45px; bottom:100px; right:20px;"
    >
      <div class="demo-scrollToTop" @click="$toast('toTop')">↑</div>
    </Headroom>

    <Headroom position="bottom" transformFixed="bottom">
      <VButton
        block
        type="primary"
        style="border-radius: 0"
        @click="$toast('toolbar')"
      >
        Toolbar
      </VButton>
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
