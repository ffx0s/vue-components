<template>
  <div
    class="v-switch"
    :class="{ 'v-switch-on': value, 'v-switch-disabled': disabled }"
    :style="style"
    @click="click"
  >
    <div class="v-switch-circle" />
  </div>
</template>

<script>
export default {
  name: 'VSwitch',
  props: {
    value: {
      required: true
    },
    color: {
      type: String,
      default: ''
    },
    size: {
      type: [String, Number],
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    style() {
      const style = {}
      if (this.color && this.value) style.backgroundColor = this.color
      if (this.size) style.fontSize = this.size + 'px'
      return style
    }
  },
  methods: {
    click() {
      if (this.disabled) return
      this.$emit('input', !this.value)
    }
  }
}
</script>

<style lang="postcss">
.v-switch {
  position: relative;
  display: inline-block;
  font-size: 26px;
  width: 2em;
  height: 1em;
  border-radius: 1em;
  border: 1px solid var(--lightGray);
  user-select: none;
  transition: background 0.3s, border-color 0.3s;
  cursor: pointer;
}
.v-switch-circle {
  position: absolute;
  top: 0;
  left: 0;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.25),
    0px 4px 11px 0px rgba(0, 0, 0, 0.08), -1px 2px 2px 0px rgba(0, 0, 0, 0.14);
  transition: transform 0.3s;
}
.v-switch-on {
  background-color: #4dd865;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.v-switch-on .v-switch-circle {
  transform: translateX(1em);
}
.v-switch-disabled {
  opacity: 0.6;
  cursor: default;
}
</style>
