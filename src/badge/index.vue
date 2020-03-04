<template>
  <span
    :class="[
      'v-badge--' + type,
      'v-badge__' + (value === '' ? 'circle' : 'number')
    ]"
    :style="style"
  >
    <slot>{{ value }}</slot>
  </span>
</template>

<script>
export default {
  name: 'Badge',
  props: {
    value: [Number, String],
    size: [Number, String],
    type: {
      type: String,
      default: 'default'
    }
  },
  computed: {
    style() {
      return this.size ? { fontSize: this.size + 'px' } : {}
    }
  }
}
</script>

<style lang="postcss">
.v-badge__number {
  padding: 2px 3px;
  min-width: 10px;
  min-height: 10px;
  font-size: 12px;
  line-height: 1;
  font-family: Arial;
  border-radius: 20px;
  color: white;
  text-align: center;
  white-space: nowrap;
}
.v-badge__circle {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.v-badge--default {
  background-color: var(--error);
}
.v-badge--primary {
  background-color: var(--primary);
}
.v-badge--success {
  background-color: var(--success);
}
.v-badge--warning {
  background-color: var(--warning);
}
</style>
