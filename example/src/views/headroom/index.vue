<template>
  <div>
    <div class="headroom__space">
      <Headroom transformFixed>
        <Navbar title="Headroom" />
      </Headroom>
    </div>

    <ul class="headeroom__items">
      <li v-for="i in 10" :key="i">{{ i }}</li>
    </ul>

    <Headroom
      transformFixed="100"
      position="bottom"
      class="headeroom__toTop--initial"
      pinnedClass="headeroom__toTop--pinned"
      unpinnedClass="headeroom__toTop--unpinned"
      transitionClass="headeroom__toTop--transition"
    >
      <div class="headeroom__toTop" @click="$toast('toTop')">↑</div>
    </Headroom>

    <Headroom position="bottom" transformFixed>
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
import Headroom from 'muvc/headroom'
import VButton from 'muvc/button'

export default {
  name: 'page-headroom',
  components: {
    Headroom,
    VButton
  }
}
</script>

<style lang="postcss">
.headeroom__toTop {
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
.headeroom__toTop--initial {
  opacity: 0;
  width: 45px;
  bottom: 100px;
  right: 20px;
}
.headeroom__toTop--unpinned {
  opacity: 0;
}
.headeroom__toTop--pinned {
  opacity: 1;
}
.headeroom__toTop--transition {
  transition: 0.3s opacity;
}

.headroom__space {
  height: 46px;
}
.headeroom__items {
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
