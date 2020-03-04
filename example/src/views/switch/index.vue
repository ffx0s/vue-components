<template>
  <div>
    <Navbar title="Switch" />
    <br />
    <Group>
      <Cell title="默认">
        <VSwitch v-model="checked" />
      </Cell>
      <Cell title="修改颜色">
        <VSwitch color="#2196f3" v-model="checked" />
      </Cell>
      <Cell title="修改大小">
        <VSwitch color="pink" size="20" v-model="checked" />
      </Cell>
      <Cell title="禁用">
        <VSwitch disabled v-model="checked" />
      </Cell>
    </Group>
  </div>
</template>

<script>
import Group from 'lvan/cell/group'
import Cell from 'lvan/cell'
import VSwitch from 'lvan/switch'

export default {
  name: 'page-switch',
  components: {
    VSwitch,
    Group,
    Cell
  },
  data() {
    return {
      checked: true
    }
  }
}
</script>
