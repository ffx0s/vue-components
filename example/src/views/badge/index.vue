<template>
  <div>
    <Navbar title="Badge" />
    <Group title="属性">
      <Cell title="默认" isLink><Badge value="1"/></Cell>
      <Cell title="大小" isLink><Badge value="999+" size="14"/></Cell>
      <Cell title="圆点" isLink><Badge value=""/></Cell>
    </Group>
    <Group title="类型">
      <Cell title="Primary" isLink><Badge type="primary" value="1"/></Cell>
      <Cell title="Success" isLink><Badge type="success" value="999+"/></Cell>
      <Cell title="Warning" isLink><Badge type="warning" value=""/></Cell>
    </Group>
  </div>
</template>

<script>
import Group from 'vue-components/cell/group'
import Cell from 'vue-components/cell'
import Badge from 'vue-components/badge'

export default {
  name: 'page-badge',
  components: {
    Group,
    Cell,
    Badge
  }
}
</script>
