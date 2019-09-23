<template>
  <div class="v-picker__column" :class="column.className">
    <ul class="v-picker__items" ref="column">
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
    <div class="v-picker__overlay" :data-index="columnIndex"></div>
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
    columnIndex: Number,
    itemHeight: {
      type: Number,
      default: 40
    }
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
    this.select(this.selectedIndex, 0)
  },
  methods: {
    select(index, duration, emit = true) {
      if (typeof index !== 'number') return

      const selectedIndex = this.selectedIndex
      const maxIndex = Math.max(this.column.values.length - 1, 0)

      index = Math.min(Math.max(index, 0), maxIndex)

      if (
        this.column.values[index] !== undefined &&
        this.column.values[index].disabled
      ) {
        index = selectedIndex
      }

      this.setTranslate(-(index - 2) * this.itemHeight, duration)
      this.selectedIndex = index

      if (index !== selectedIndex && emit) this.$emit('change')
    },
    setTranslate(translate, duration) {
      const style = this.$refs.column.style

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
  height: 40px;
  line-height: 40px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  transition: 0.3s color;
}
.v-picker__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}
.v-picker--selected {
  color: var(--textPrimary);
}
.v-picker--disabled {
  color: var(--lightGray);
}
</style>
