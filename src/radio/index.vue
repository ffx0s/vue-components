<template>
  <component
    :is="tag"
    class="v-radio"
    :class="{ 'v-radio--disabled': disabled }"
  >
    <span v-if="textAlign === 'left'" class="v-radio__text">
      <slot>{{ label }}</slot>
    </span>

    <input
      class="v-radio__input"
      type="radio"
      :checked="checked"
      :value="label"
      :disabled="disabled"
      @change="change($event.target.checked)"
    />

    <span v-if="textAlign === 'right'" class="v-radio__text">
      <slot>{{ label }}</slot>
    </span>
  </component>
</template>

<script>
import { getVMParent } from '../utils/shared'

export default {
  name: 'Radio',
  props: {
    value: null,
    tag: {
      type: String,
      default: 'label'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: [String, Number],
      default: ''
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
          ? this.parent.value === this.label
          : this.value === this.label
      },
      set(checked) {
        this.change(checked)
      }
    }
  },
  data() {
    return {
      parent: getVMParent(this, 'RadioGroup')
    }
  },
  methods: {
    change() {
      if (this.parent) {
        this.parent.$emit('input', this.label)
      } else {
        this.$emit('input', this.label)
      }
    }
  }
}
</script>

<style lang="postcss">
.v-radio {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  & + .v-radio {
    margin-left: 15px;
  }
}
.v-radio--disabled {
  cursor: default;
}
.v-radio__input {
  margin: 0;
  outline: 0;
  appearance: none;
  background-color: transparent;
  -webkit-touch-callout: none;
  -webkit-text-size-adjust: none;
  -webkit-tap-highlight-color: transparent;
  box-sizing: border-box;
  position: relative;
  z-index: 99997;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid var(--primary);
  vertical-align: middle;
  transform: translateZ(0);
  cursor: pointer;
  &:disabled {
    cursor: default;
    border-color: var(--border);
    &::before {
      background-color: var(--border);
    }
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    background-color: var(--primary);
    transform: scale(0);
    transition: transform 0.3s;
    transform-origin: center 50%;
    z-index: 3;
  }
  &:checked::before {
    transform: scale(1);
  }
}
.v-radio__text {
  padding-left: 6px;
  display: inline-block;
  vertical-align: middle;
}
</style>
