<template>
  <div class="v-picker">
    <slot name="toolbar">
      <div class="v-picker__toolbar v-bd-bottom">
        <VButton text type="primary" @click="cancel">
          {{ cancelText }}
        </VButton>
        <h4 class="v-picker__title">{{ title }}</h4>
        <VButton text type="primary" @click="confirm">
          {{ confirmText }}
        </VButton>
      </div>
    </slot>
    <div class="v-picker__main">
      <div class="v-picker__columns" ref="touchTarget">
        <Column
          v-for="(column, index) in columns"
          :key="index"
          :column="column"
          :columnIndex="index"
          @change="change"
          ref="columns"
        />
      </div>
      <div class="v-picker__select v-bd-top-bottom"></div>
      <Delay class="v-picker__loading" v-model="loading" :delay="loadingDelay">
        <Loading size="30" />
      </Delay>
    </div>
  </div>
</template>

<script>
import ETouch from '../utils/etouch'
import Column from './column'
import Loading from '../loading'
import VButton from '../button'
import Delay from '../delay'

export default {
  name: 'Picker',
  components: {
    Column,
    Loading,
    VButton,
    Delay
  },
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    animationDuration: {
      type: Number,
      default: 400
    },
    // 快速切换阀值
    threshold: {
      type: Number,
      default: 5
    },
    loading: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    valueKey: {
      type: String,
      default: ''
    },
    loadingDelay: {
      type: Number,
      default: 0
    }
  },
  data() {
    const valueKey = this.valueKey
    return {
      getValue: valueKey ? value => value[valueKey] : value => value
    }
  },
  mounted() {
    this.currentColumnIndex = 0

    this.touch = new ETouch({
      el: this.$refs.touchTarget,
      threshold: this.threshold,
      lockDirection: ETouch.VERTICAL
    })
      .on('down', this.down)
      .on('panstart', this.panstart)
      .on('panup pandown', this.panmove)
      .on('panend', this.panend)
      .on('tap', this.tap)
  },
  beforeDestroy() {
    this.touch.destroy()
    this.touch = null
  },
  methods: {
    down(event) {
      ETouch.preventDefault(event)
      this.currentColumnIndex = +event.target.dataset.index
    },
    panstart() {
      if (this.isEmptyColumn()) return

      const column = this.getCurrentColumn()

      column.setTranslate(column.translate, 0)
    },
    panmove(event, { vy }) {
      if (this.isEmptyColumn()) return

      ETouch.preventDefault(event)

      const column = this.getCurrentColumn()

      column.setTranslate(column.translate + vy, 0)
    },
    panend(event, { vy }) {
      if (this.isEmptyColumn()) return

      const column = this.getCurrentColumn()

      let translate = column.translate

      if (this.touch.isSwipe) {
        translate += vy * 10
      }

      const selectedIndex = Math.abs(
        Math.round(
          Math.min(translate, column.itemHeight * 2) / column.itemHeight - 2
        )
      )

      column.select(selectedIndex, this.animationDuration)
    },
    tap() {
      if (this.isEmptyColumn()) return

      const column = this.getCurrentColumn()
      column.select(column.selectedIndex + 1, this.animationDuration)
    },
    change() {
      const values = this.getValues()
      this.$emit('change', this, values, this.currentColumnIndex)
    },
    cancel() {
      this.$emit('cancel')
    },
    confirm() {
      this.$emit('confirm', this.getValues())
    },
    isEmptyColumn() {
      return !this.columns[this.currentColumnIndex].values.length
    },
    getCurrentColumn() {
      return this.$refs.columns[this.currentColumnIndex]
    },
    getValues() {
      return this.columns.map((column, index) => {
        const selectedIndex = this.$refs.columns[index].selectedIndex
        return column.values[selectedIndex]
      })
    },
    getIndexes() {
      return this.columns.map((column, index) => {
        return this.$refs.columns[index].selectedIndex
      })
    },
    getIndex(columnIndex) {
      return this.$refs.columns[columnIndex].selectedIndex
    },
    getColumnValue(columnIndex) {
      const selectedIndex = this.getIndex(columnIndex)
      return this.columns[columnIndex].values[selectedIndex]
    },
    setIndexes(indexes) {
      indexes.forEach((selectedIndex, columnIndex) => {
        this.$refs.columns[columnIndex].select(
          selectedIndex,
          this.animationDuration,
          false
        )
      })
    },
    setIndex(columnIndex, selectedIndex) {
      this.$refs.columns[columnIndex].select(
        selectedIndex,
        this.animationDuration,
        false
      )
    },
    setValues(values) {
      values.forEach((value, columnIndex) => {
        const selectedIndex = this.findValueIndex(
          value,
          this.columns[columnIndex].values
        )

        if (selectedIndex !== -1) {
          this.setColumnValue(columnIndex, value, selectedIndex)
        }
      })
    },
    setColumnValue(columnIndex, value, selectedIndex) {
      selectedIndex =
        typeof selectedIndex === 'number'
          ? selectedIndex
          : this.findValueIndex(value, this.columns[columnIndex].values)

      if (selectedIndex !== -1) {
        if (typeof value === 'object') {
          this.columns[columnIndex].values[selectedIndex] = value
        }

        this.$refs.columns[columnIndex].select(
          selectedIndex,
          this.animationDuration,
          false
        )
      }
    },
    setColumnValues(columnIndex, values, selectedIndex) {
      this.columns[columnIndex].values = values
      this.setIndex(columnIndex, selectedIndex || 0)
    },
    findValueIndex(value, values) {
      value = value.hasOwnProperty(this.valueKey) ? value[this.valueKey] : value

      const length = values.length

      for (let i = 0; i < length; i++) {
        if (value === this.getValue(values[i])) return i
      }

      return -1
    }
  }
}
</script>

<style lang="postcss">
.v-picker {
  background-color: white;
}
.v-picker__main {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}
.v-picker__columns {
  position: relative;
  display: flex;
  height: 100%;
  overflow: hidden;
  -webkit-mask-box-image: linear-gradient(
    to top,
    transparent,
    transparent 0%,
    white 15%,
    white 85%,
    transparent 100%,
    transparent
  );
}
.v-picker__select {
  position: absolute;
  top: 50%;
  margin-top: -20px;
  width: 100%;
  height: 40px;
  pointer-events: none;
}
.v-picker__loading {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  line-height: 200px;
  z-index: 2;
  color: var(--primary);
  background-color: rgba(255, 255, 255, 0.9);
  & .v-circle-loading {
    margin: 0 auto;
  }
}
.v-picker__toolbar {
  padding: 2px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.v-picker__title {
  padding: 0;
  font-size: 17px;
  font-weight: 400;
}
</style>
