<template>
  <div>
    <Navbar title="Popup" />
    <br />
    <Group>
      <Cell title="默认" isLink @click.native="toggle('bottom')" />
      <Cell title="顶部滑入" isLink @click.native="toggle('top')" />
      <Cell title="左侧滑入" isLink @click.native="toggle('left')" />
      <Cell title="右侧滑入" isLink @click.native="toggle('right')" />
    </Group>
    <Popup
      v-transfer-dom
      v-model="show"
      :position="position"
      :overlay="overlay"
    >
      <div class="popup__content">Popup</div>
    </Popup>
  </div>
</template>

<script>
import Group from 'muvc/cell/group'
import Cell from 'muvc/cell'
import Popup from 'muvc/popup'

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
      position: 'bottom'
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
</style>
