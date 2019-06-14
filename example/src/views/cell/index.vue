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
      <Cell title="通讯录" isLink>
        <div class="icon-address-book-o" slot="icon" />
      </Cell>
      <Cell title="我的收藏" isLink>
        <div class="icon-star-empty" slot="icon" />
      </Cell>
      <Cell title="礼物" isLink>
        <svg slot="icon" viewBox="0 0 1024 1024" width="25" height="25">
          <path
            d="M880 310H732.4c13.6-21.4 21.6-46.8 21.6-74 0-76.1-61.9-138-138-138-41.4 0-78.7 18.4-104 47.4-25.3-29-62.6-47.4-104-47.4-76.1 0-138 61.9-138 138 0 27.2 7.9 52.6 21.6 74H144c-17.7 0-32 14.3-32 32v200c0 4.4 3.6 8 8 8h40v344c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V550h40c4.4 0 8-3.6 8-8V342c0-17.7-14.3-32-32-32z m-334-74c0-38.6 31.4-70 70-70s70 31.4 70 70-31.4 70-70 70h-70v-70z m-138-70c38.6 0 70 31.4 70 70v70h-70c-38.6 0-70-31.4-70-70s31.4-70 70-70zM180 482V378h298v104H180z m48 68h250v308H228V550z m568 308H546V550h250v308z m48-376H546V378h298v104z"
            fill="currentColor"
          />
        </svg>
        <Badge value="" />
      </Cell>
    </Group>
  </div>
</template>

<script>
import Group from 'vue-components/cell/group'
import Cell from 'vue-components/cell'
import Badge from 'vue-components/badge'
import Radio from 'vue-components/radio'
import VTextarea from 'vue-components/textarea'

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
