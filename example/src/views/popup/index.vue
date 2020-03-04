<template>
  <div>
    <Navbar title="Popup" />
    <br />
    <Group>
      <Cell title="默认" isLink @click="toggle('bottom')" />
      <Cell title="顶部滑入" isLink @click="toggle('top')" />
      <Cell title="左侧滑入" isLink @click="toggle('left')" />
      <Cell title="右侧滑入" isLink @click="toggle('right')" />
      <Cell title="Drawer" isLink @click="showDrawer = true" />
    </Group>
    <Popup
      v-transfer-dom
      v-model="show"
      :position="position"
      :overlay="overlay"
    >
      <div class="popup__content">Popup</div>
    </Popup>

    <Popup
      v-transfer-dom
      v-model="showDrawer"
      position="right"
      contentClass="popup__drawer"
    >
      <div class="popup__content" style="height:100%">Drawer</div>
    </Popup>
  </div>
</template>

<script>
import Group from 'lvan/cell/group'
import Cell from 'lvan/cell'
import Popup from 'lvan/popup'

export default {
  name: 'page-popup',
  components: {
    Group,
    Cell,
    Popup
  },
  data() {
    return {
      show: false,
      overlay: true,
      position: 'bottom',
      showDrawer: false
    }
  },
  methods: {
    toggle(position) {
      this.position = position
      this.show = true
    }
  }
}
</script>

<style lang="postcss">
.popup__content {
  padding: 10px;
  width: 100%;
  height: 100px;
  background-color: white;
  box-sizing: border-box;
}
.popup__drawer {
  width: 280px;
  height: 100%;
}
</style>
