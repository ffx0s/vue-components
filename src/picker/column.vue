<template>
  <div class="v-picker__column" :class="column.className" ref="column">
    <ul class="v-picker__items" ref="items">
      <li
        class="v-picker__item"
        :class="{
          'v-picker--selected': selectedIndex === index,
          'v-picker--disabled': value.disabled
        }"
        v-for="(value, index) in column.values"
        :key="index"
      >
        {{ getValue(value) }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'PickerColumn',
  props: {
    column: {
      type: Object,
      default: () => {}
    },
    columnIndex: Number
  },
  data() {
    return {
      selectedIndex: this.column.selectedIndex || 0,
      getValue: this.$parent.getValue
    }
  },
  created() {
    this.duration = 0
    this.translate = 0
  },
  mounted() {
    const mainHeight = this.$parent.mainHeight

    if (!mainHeight) {
      this.$parent.mainHeight = this.$refs.column.offsetHeight
    }

    this.select(this.selectedIndex, 0)
  },
  methods: {
    select(index, duration, emit = true) {
      if (typeof index !== 'number') return

      const selectedIndex = this.selectedIndex
      const maxIndex = Math.max(this.column.values.length - 1, 0)
      const columnHeight = this.$parent.mainHeight
      const itemHeight = this.$parent.itemHeight

      index = Math.min(Math.max(index, 0), maxIndex)

      if (
        this.column.values[index] !== undefined &&
        this.column.values[index].disabled
      ) {
        index = selectedIndex
      }

      this.moveTo(
        -(itemHeight * index - (columnHeight - itemHeight) / 2),
        duration
      )

      this.selectedIndex = index

      if (index !== selectedIndex && emit) this.$emit('change')
    },
    moveTo(translate, duration = 0) {
      const style = this.$refs.items.style

      style.transform = style.webkitTransform = `translate3d(0, ${translate}px, 0)`
      // eslint-disable-next-line prettier/prettier
      style.transitionDuration =
      style.webkitTransitionDuration = `${duration}ms`

      this.translate = translate
      this.duration = duration
    }
  }
}
</script>

<style lang="postcss">
:root {
  --itemHeight: 48px;
}

.v-picker__column {
  position: relative;
  flex: 1;
  height: 100%;
  font-size: 16px;
  color: var(--textRegular);
  text-align: center;
  overflow: hidden;
}
.v-picker__items {
  margin: 0;
  padding: 0;
  list-style: none;
  transition-property: transform;
  transition-timing-function: ease;
}
.v-picker__item {
  padding: 0 6px;
  height: var(--itemHeight);
  line-height: var(--itemHeight);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  transition: 0.3s color;
}
.v-picker__select {
  position: absolute;
  top: 50%;
  margin-top: calc(var(--itemHeight) / 2 * -1);
  width: 100%;
  height: var(--itemHeight);
  pointer-events: none;
}
.v-picker--selected {
  color: var(--textPrimary);
}
.v-picker--disabled {
  color: var(--lightGray);
}
</style>
