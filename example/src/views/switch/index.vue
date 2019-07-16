<template>
  <div>
    <Navbar title="Switch" />
    <br />
    <Group>
      <Cell title="默认">
        <div class="switch"><VSwitch v-model="checked" /></div>
      </Cell>
      <Cell title="修改颜色">
        <div class="switch">
          <VSwitch color="#2196f3" v-model="checked" />
        </div>
      </Cell>
      <Cell title="修改大小">
        <div class="switch">
          <VSwitch color="pink" size="20" v-model="checked" />
        </div>
      </Cell>
      <Cell title="禁用">
        <div class="switch"><VSwitch disabled v-model="checked" /></div>
      </Cell>
    </Group>
  </div>
</template>

<script>
import Group from 'muvc/cell/group'
import Cell from 'muvc/cell'
import VSwitch from 'muvc/switch'

export default {
  name: 'page-switch',
  components: {
    VSwitch,
    Group,
    Cell
  },
  data() {
    return {
      checked: false
    }
  }
}
</script>

<style lang="postcss">
.switch {
  font-size: 0;
}
</style>
