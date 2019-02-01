<template>
  <div>
    <Navbar title="Switch" />
    <br />
    <Group>
      <Cell title="默认">
        <div class="demo-switch"><VSwitch v-model="checked" /></div>
      </Cell>
      <Cell title="修改颜色">
        <div class="demo-switch">
          <VSwitch color="#2196f3" v-model="checked" />
        </div>
      </Cell>
      <Cell title="修改大小">
        <div class="demo-switch">
          <VSwitch color="pink" size="20" v-model="checked" />
        </div>
      </Cell>
      <Cell title="禁用">
        <div class="demo-switch"><VSwitch disabled v-model="checked" /></div>
      </Cell>
    </Group>
  </div>
</template>

<script>
import Group from '../../components/cell/group'
import Cell from '../../components/cell'
import VSwitch from '../../components/switch'

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
.demo-switch {
  font-size: 0;
}
</style>
