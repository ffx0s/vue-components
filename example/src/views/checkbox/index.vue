<template>
  <div>
    <Navbar title="Checkbox" />

    <CheckboxGroup v-model="selectCitys">
      <Group title="CheckboxGroup">
        <Cell
          v-for="(city, index) in citys"
          :key="index"
          :clickable="city.id !== 3"
          tag="label"
        >
          <Checkbox
            slot="title"
            tag="div"
            :label="city.name"
            :disabled="city.id === 3"
          />
        </Cell>
      </Group>
    </CheckboxGroup>

    <div class="app--spacing" style="background-color: #fff">
      <p>限制可选数，max：<strong style="color: red;">2</strong></p>
      <CheckboxGroup v-model="selectCitys2" :max="2" @change="change">
        <Checkbox v-for="city in citys" :key="city.id" :label="city.name" />
      </CheckboxGroup>
      <br />
      <p>颜色</p>
      <Checkbox v-model="value" color="#4caf50">
        我已阅读和接受 <span style="color: red;">《用户服务协议》</span>
      </Checkbox>
      <br />
      <br />
      <p>禁用</p>
      <Checkbox v-model="value3" disabled> 禁用状态 </Checkbox>
      <Checkbox v-model="value4" disabled> 禁用状态 </Checkbox>
      <br />
      <br />
    </div>
  </div>
</template>

<script>
import CheckboxGroup from 'lvan/checkbox/group'
import Checkbox from 'lvan/checkbox'
import Group from 'lvan/cell/group'
import Cell from 'lvan/cell'

export default {
  name: 'page-checkbox',
  components: {
    CheckboxGroup,
    Checkbox,
    Group,
    Cell
  },
  data() {
    return {
      value: true,
      value2: false,
      value3: true,
      value4: false,
      citys: [
        { id: 1, name: '北京' },
        { id: 2, name: '上海' },
        { id: 3, name: '广州' },
        { id: 4, name: '深圳' }
      ],
      selectCitys: ['北京', '深圳', '广州'],
      selectCitys2: ['深圳']
    }
  },
  methods: {
    change(values, value) {
      this.$toast(value.label)
    }
  }
}
</script>
