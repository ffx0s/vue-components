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
      <Group title="支付方式 - 左对齐">
        <Cell clickable v-for="type in payTypes" :key="type.id">
          <template slot="title">
            <Radio name="payType" :label="type.id">{{ type.name }}</Radio>
          </template>
        </Cell>
      </Group>
      <Group title="支付方式 - 右对齐">
        <Cell clickable v-for="type in payTypes" :key="type.id">
          <template>
            <Radio textAlign="left" name="payType" :label="type.id">
              {{ type.name }}
            </Radio>
          </template>
        </Cell>
      </Group>
    </RadioGroup>
  </div>
</template>

<script>
import Radio from 'muvc/radio'
import RadioGroup from 'muvc/radio/group'
import Group from 'muvc/cell/group'
import Cell from 'muvc/cell'

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
