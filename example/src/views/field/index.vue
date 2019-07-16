<template>
  <div>
    <Navbar title="Field" />
    <br />
    <Group tag="form" labelWidth="85" valueAlign="left">
      <Cell title="文本框"> <input type="text" placeholder="请输入值" /> </Cell>
      <Cell title="密码框">
        <input type="password" placeholder="请输入密码" autocomplete />
      </Cell>
      <Cell title="必填项" required>
        <input type="text" placeholder="请输入值" />
      </Cell>
      <Cell title="禁用">
        <input type="text" placeholder="Disabled" disabled />
      </Cell>
      <Cell title="下拉框">
        <select>
          <option>请选择</option>
          <option> option1 </option>
          <option> option2 </option>
        </select>
      </Cell>
      <Cell alignItems="start" title="多行文本框">
        <VTextarea v-model="value" placeholder="根据内容自适应高度" />
      </Cell>
    </Group>
  </div>
</template>

<script>
import Group from 'muvc/cell/group'
import Cell from 'muvc/cell'
import VTextarea from 'muvc/textarea'

export default {
  components: {
    Group,
    Cell,
    VTextarea
  },
  data() {
    return {
      value: ''
    }
  }
}
</script>
