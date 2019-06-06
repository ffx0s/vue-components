<template>
  <div>
    <Navbar title="Picker" />
    <br />
    <Group>
      <Cell
        title="选择城市"
        @click="showCity = !showCity"
        :value="cityValue"
        isLink
      />
      <Cell
        title="选择日期"
        @click="showDate = !showDate"
        :value="dateValue"
        isLink
      />
    </Group>
    <Popup v-transfer-dom v-model="showDate">
      <Picker
        title="选择日期"
        :columns="date"
        @cancel="showDate = false"
        @confirm="confirmDate"
      />
    </Popup>
    <City v-model="showCity" title="选择城市" @confirm="confirmCity" />
  </div>
</template>

<script>
import Picker from 'vue-components/picker'
import City from 'vue-components/city'
import Group from 'vue-components/cell/group'
import Cell from 'vue-components/cell'
import Popup from 'vue-components/popup'

export default {
  name: 'page-picker',
  components: {
    Picker,
    City,
    Group,
    Cell,
    Popup
  },
  data() {
    return {
      showDate: false,
      dateValue: '',
      date: [
        {
          values: [2019, 2018, 2017]
        },
        {
          values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        },
        {
          values: [8, 18, 28]
        }
      ],
      showCity: false,
      cityValue: '',
      cities: [{ values: [] }, { values: [] }, { values: [] }]
    }
  },
  methods: {
    confirmDate(values) {
      this.dateValue = values.join('-')
      this.showDate = false
    },
    confirmCity(values) {
      this.cityValue = values.map(value => value.fullname).join(' ')
      this.showCity = false
    }
  }
}
</script>
