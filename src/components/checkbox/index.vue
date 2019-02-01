<template>
  <label
    class="v-checkbox"
    :class="{
      'v-checkbox-active': checked,
      'v-checkbox-disbled': disabled
    }"
  >
    <template v-if="textAlign === 'left'">
      <span class="v-checkbox-text">
        <slot>{{ label }}</slot>
      </span>
      &nbsp;
    </template>
    <input
      type="checkbox"
      class="v-checkbox-input"
      :checked="checked"
      :style="inputStyle"
      :disabled="disabled"
      @change="change($event.target.checked)"
    />
    <template v-if="textAlign === 'right'">
      &nbsp;
      <span class="v-checkbox-text">
        <slot>{{ label }}</slot>
      </span>
    </template>
  </label>
</template>

<script>
import { getVMParent } from '../../utils/shared'
import { properties } from '../../styles/variables'

export default {
  name: 'Checkbox',
  props: {
    value: null,
    label: {
      type: [String, Number],
      default: ''
    },
    color: {
      type: String,
      default: properties.primary
    },
    disabled: {
      type: Boolean,
      default: false
    },
    textAlign: {
      type: String,
      default: 'right'
    }
  },
  computed: {
    checked: {
      get() {
        return this.parent
          ? this.parent.value.indexOf(this.label) !== -1
          : this.value
      },
      set(value) {
        this.change(value)
      }
    },
    inputStyle() {
      if (this.checked) {
        return { backgroundColor: this.color, borderColor: this.color }
      }
      return { backgroundColor: 'transparent' }
    }
  },
  data() {
    return {
      parent: getVMParent(this, 'CheckboxGroup')
    }
  },
  methods: {
    change(checked) {
      if (this.parent) {
        if (checked) {
          const max = this.parent.max
          if (max < 0 || max > this.parent.value.length) {
            this.parent.value.push(this.label)
            this.emitChange(checked)
          }
        } else {
          const index = this.parent.value.indexOf(this.label)
          if (index !== -1) {
            this.parent.value.splice(index, 1)
            this.emitChange(checked)
          }
        }
      } else {
        this.$emit('input', checked)
      }
    },
    emitChange(checked) {
      this.parent.$emit('change', this.parent.value, {
        checked,
        label: this.label
      })
    }
  }
}
</script>

<style lang="postcss">
.v-checkbox {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  font-size: 0;
  cursor: pointer;
  user-select: none;
  & + .v-checkbox {
    margin-left: 15px;
  }
}
.v-checkbox-disbled {
  cursor: default;
  & .v-checkbox-input {
    background-color: var(--lightGray) !important;
    border-color: var(--gray) !important;
  }
  & .v-checkbox-text {
    color: var(--textSecondary);
  }
}
.v-checkbox-input {
  margin: 0;
  outline: 0;
  z-index: 0;
  appearance: none;
  background-color: transparent;
  -webkit-touch-callout: none;
  -webkit-text-size-adjust: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-user-select: none;
  box-sizing: border-box;
  position: relative;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid var(--gray);
  vertical-align: middle;
  opacity: 1;
  transition: 0.3s;
  &::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 1px;
    width: 16px;
    height: 16px;
    display: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024'%3E%3Cpath d='M870.4 332.8l-89.6-89.6L416 601.6 243.2 435.2l-89.6 89.6 262.4 256z' fill='%23ffffff'/%3E%3C/svg%3E");
    background-position: center;
    background-repeat: no-repeat;
    z-index: 2;
    display: none;
  }
  &:checked::before {
    display: block;
  }
}
.v-checkbox-text {
  padding-left: 6px;
  font-size: 14px;
  display: inline-block;
  vertical-align: middle;
}
</style>
