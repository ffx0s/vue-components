<template>
  <Popup v-transfer-dom v-model="show" @loaded="init">
    <Picker
      ref="picker"
      :title="title"
      :columns="columns"
      :loading="loading"
      :loadingDelay="1000"
      @change="change"
      @cancel="cancel"
      @confirm="confirm"
      valueKey="fullname"
    />
  </Popup>
</template>

<script>
import Picker from '../picker'
import Popup from '../popup'

const cities = {}

export default {
  name: 'City',
  components: {
    Picker,
    Popup
  },
  props: {
    value: Boolean,
    cityId: {
      type: [String, Number],
      default: ''
    },
    title: String,
    // 级联调用最大层级数，从0开始算
    maxHierarchy: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      loading: false,
      columns: [
        {
          values: []
        },
        {
          values: []
        },
        {
          values: []
        }
      ]
    }
  },
  computed: {
    show: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    init() {
      const ids = this.findIds(this.cityId)
      this.loadCity(-1, '', (currentHierarchy, values) => {
        return ids[currentHierarchy] ? this.findIndex(ids, values) : 0
      })
    },
    findIds(id) {
      id = '' + id
      if (!id) return []
      const provinceNum = id.slice(0, 2)
      const cityNum = id.slice(2, 4)
      const ids = [
        provinceNum + '0000',
        provinceNum + cityNum + '00',
        id.slice(0, 6)
      ]
      return [...new Set(ids)]
    },
    findIndex(ids, data) {
      const length = data.length
      for (let i = 0; i < length; i++) {
        const currentId = '' + data[i].id
        if (ids.indexOf(currentId) !== -1) {
          return i
        }
      }
      return 0
    },
    loadCity(hierarchy, id, getSelectedIndex) {
      if (hierarchy >= this.maxHierarchy) return
      let currentHierarchy = hierarchy
      this.loading = true
      this.getChildrenList(id)
        .then(values => {
          currentHierarchy++
          const selectedIndex = getSelectedIndex
            ? getSelectedIndex(currentHierarchy, values)
            : 0
          this.$refs.picker.setColumnValues(
            currentHierarchy,
            values,
            selectedIndex
          )
          if (currentHierarchy < this.maxHierarchy) {
            this.loadCity(
              currentHierarchy,
              values[selectedIndex].id,
              getSelectedIndex
            )
          } else {
            this.loading = false
          }
        })
        .catch(() => {
          this.loading = false
        })
    },

    cancel() {
      this.$emit('input', false)
    },
    confirm(values) {
      this.$emit('confirm', values)
    },
    change(picker, values, index) {
      const item = values[index]
      this.loadCity(index, item.id)
    },
    getChildrenList(id) {
      return cities[id]
        ? Promise.resolve(cities[id])
        : new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            const query =
              'key=UTRBZ-XNYKR-BCBWB-WKH4C-BDBNQ-LEF5Q' +
              (id ? `&id=${id}` : '')

            xhr.timeout = 10000
            xhr.open('GET', `/district/v1/getchildren?${query}`)
            xhr.onerror = function() {
              reject()
            }
            xhr.onreadystatechange = function() {
              if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                  const data = JSON.parse(xhr.responseText)
                  if (data.status == 0) {
                    const result = data.result[0].map(item => ({
                      id: item.id,
                      fullname: item.fullname
                    }))
                    if (id) cities[id] = result
                    resolve(result)
                  }
                } else {
                  reject()
                }
              }
            }
            xhr.send()
          })
    }
  }
}
</script>
