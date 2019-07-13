<template>
  <div>
    <Navbar title="Checkbox" />

    <CheckboxGroup v-model="selectCitys">
      <Group title="多选 - 左对齐">
        <Cell
          v-for="(city, index) in citys"
          :key="index"
          :clickable="city.id !== 3"
        >
          <template slot="title">
            <Checkbox :label="city.name" :disabled="city.id === 3" />
          </template>
        </Cell>
      </Group>
    </CheckboxGroup>

    <CheckboxGroup v-model="selectCitys">
      <Group title="多选 - 右对齐">
        <Cell
          v-for="(city, index) in citys"
          :key="index"
          :clickable="city.id !== 3"
        >
          <Checkbox
            :label="city.name"
            :disabled="city.id === 3"
            textAlign="left"
          />
        </Cell>
      </Group>
    </CheckboxGroup>

    <div class="app--spacing" style="background-color: #fff">
      <p>多选 - 平铺 - 最多选<strong style="color: red;">2</strong>个</p>
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
import CheckboxGroup from 'vue-components/checkbox/group'
import Checkbox from 'vue-components/checkbox'
import Group from 'vue-components/cell/group'
import Cell from 'vue-components/cell'

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
      this.$toast(value)
    }
  }
}
</script>
