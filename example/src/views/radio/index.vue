<template>
  <div>
    <Navbar title="Radio" />
    <Group title="默认">
      <Cell title="性别">
        <Radio name="sex" v-model="sex" label="男" />
        <Radio name="sex" v-model="sex" label="女" />
      </Cell>
      <Cell title="禁用">
        <Radio name="sex" v-model="sex2" disabled label="男" />
        <Radio name="sex" v-model="sex2" disabled label="女" />
      </Cell>
    </Group>
    <RadioGroup v-model="payType">
      <Group title="RadioGroup">
        <Cell tag="label" clickable v-for="type in payTypes" :key="type.id">
          <Radio slot="title" tag="div" name="payType" :label="type.id">
            {{ type.name }}
          </Radio>
        </Cell>
      </Group>
      <Group>
        <Cell tag="label" clickable v-for="type in payTypes" :key="type.id">
          <div slot="title">{{ type.name }}</div>
          <Radio tag="div" textAlign="left" name="payType" :label="type.id">
            &nbsp;
          </Radio>
        </Cell>
      </Group>
    </RadioGroup>
  </div>
</template>

<script>
import Radio from 'lvan/radio'
import RadioGroup from 'lvan/radio/group'
import Group from 'lvan/cell/group'
import Cell from 'lvan/cell'

export default {
  name: 'page-radio',
  components: {
    Radio,
    RadioGroup,
    Group,
    Cell
  },
  data() {
    return {
      sex: '男',
      sex2: '男',
      payType: 1,
      payTypes: [
        { id: 1, name: '微信' },
        { id: 2, name: '支付宝' },
        { id: 3, name: '银联' }
      ]
    }
  }
}
</script>
