<template>
  <div>
    <Navbar title="Cell" />
    <Group title="默认">
      <Cell title="标题" value="值" />
      <Cell title="点击反馈" value="clickable" clickable />
      <Cell>
        <div slot="title" style="color: red">标题样式修改</div>
        <div style="color: red">右边样式修改</div>
      </Cell>
      <Cell title="显示箭头" value="isLink" isLink />
      <Cell title="显示箭头" isLink />
      <Cell title="路由跳转" isLink :to="{ name: 'swipe' }"> Swipe </Cell>
      <Cell title="链接跳转" isLink link="//127.0.0.1"> 127.0.0.1 </Cell>
      <Cell title="左边自适应左边自适应左边自适应"> 值 </Cell>
      <Cell
        title="左边自适应左边自适应左边自适应左边自适应左边自适应左边自适应左边自适应左边自适应左边自适应左边自适应左边自适应左边自适应"
      />
      <Cell
        value="右边自适应右边自适应右边自适应右边自适应右边自适应右边自适应右边自适应右边自适应右边自适应右边自适应右边自适应右边自适应"
      />
      <Cell title="标题居上" alignItems="start">
        右边自适应右边自适应右边自适应右边自适应右边自适应右边自适应
      </Cell>
      <Cell title="标题居中">
        右边自适应右边自适应右边自适应右边自适应右边自适应右边自适应
      </Cell>
      <Cell title="标题居下" alignItems="end">
        右边自适应右边自适应右边自适应右边自适应右边自适应右边自适应
      </Cell>
      <Cell title="消息" isLink><Badge value="999" size="14"/></Cell>
    </Group>
    <Group
      tag="form"
      labelAlign="right"
      labelWidth="80"
      valueAlign="left"
      title="表单"
    >
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
      <Cell title="单选">
        <Radio name="sex" v-model="sex" label="男" />
        <Radio name="sex" v-model="sex" label="女" />
      </Cell>
    </Group>
    <Group title="图标">
      <Cell title="标题">
        <div slot="icon">图标</div>
        值
      </Cell>
      <Cell title="左边自适应左边自适应左边自适应">
        <div slot="icon">图标</div>
        值
      </Cell>
      <Cell title="标题">
        <div slot="icon">图标</div>
        右边自适应右边自适应右边自适应右边自适应右边自适应右边自适应
      </Cell>
    </Group>
  </div>
</template>

<script>
import Group from '../../components/cell/group'
import Cell from '../../components/cell'
import Badge from '../../components/badge'
import Radio from '../../components/radio'
import VTextarea from '../../components/textarea'

export default {
  name: 'page-cell',
  components: {
    Group,
    Cell,
    Badge,
    Radio,
    VTextarea
  },
  data() {
    return {
      clickable: true,
      sex: '男',
      value: ''
    }
  }
}
</script>
