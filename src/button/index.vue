<template>
  <button
    @click.stop="clickHandler"
    class="v-button"
    :class="[
      `v-button--${type}${outline ? '-outline' : ''}`,
      { 'v-button--large': large },
      { 'v-button--small': small },
      { 'v-button--loading': isLoading },
      { 'v-button--fill': fill },
      { 'v-button--block': block },
      { 'v-button--radius': radius },
      { 'v-button--text': text }
    ]"
    :disabled="disabled || isLoading"
  >
    <span class="v-button__content"><slot /></span>
    <span v-if="isLoading" class="v-button__loading">
      <slot name="loading"><Loading :size="loadingSize"/></slot>
    </span>
  </button>
</template>

<script>
import Loading from '../loading'

export default {
  name: 'Button',
  components: {
    Loading
  },
  props: {
    type: {
      type: String,
      default: 'default'
    },
    large: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    outline: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingDelay: {
      type: Number,
      default: 0
    },
    loadingDuration: {
      type: Number,
      default: 500
    },
    loadingSize: {
      type: Number,
      default: 20
    },
    disabled: {
      type: Boolean,
      default: false
    },
    fill: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
    radius: {
      type: Boolean,
      default: false
    },
    text: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isLoading: this.loading
    }
  },
  watch: {
    loading(value) {
      if (this.loadingDelay <= 0) {
        this.isLoading = value
        return
      }

      this.clearTimer()
      if (value) {
        this.showTimer = setTimeout(() => {
          this.isLoading = true
        }, this.loadingDelay)
      } else {
        if (this.isLoading) {
          this.hideTimer = setTimeout(() => {
            this.isLoading = false
          }, this.loadingDuration)
        }
      }
    }
  },
  methods: {
    clickHandler() {
      if (this.loading) return
      this.$emit('click')
    },
    clearTimer() {
      clearTimeout(this.showTimer)
      clearTimeout(this.hideTimer)
    }
  }
}
</script>

<style lang="postcss">
.v-button {
  appearance: none;
  user-select: none;
  cursor: pointer;
  margin: 0;
  padding: 11px 14px;
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  min-width: 50px;
  min-height: 25px;
  font-weight: 400;
  font-size: 16px;
  line-height: 1;
  text-align: center;
  border-radius: 2px;
  border: 1px solid transparent; /*no*/
  background-color: transparent;
  -webkit-tap-highlight-color: transparent;
  outline: none;
  &::before {
    content: ' ';
    position: absolute;
    top: 50%;
    left: 50%;
    opacity: 0;
    width: 100%;
    height: 100%;
    border: inherit;
    border-color: #000;
    background-color: #000;
    border-radius: inherit;
    transform: translate(-50%, -50%);
    z-index: 1;
  }
  &:active::before {
    opacity: 0.15;
  }
  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
}

/* default */
.v-button--default {
  color: var(--textPrimary);
  background-color: #fff;
  border-color: #fff;
}
.v-button--default-outline {
  color: var(--textRegular);
  border-color: var(--textRegular);
}

/* primary */
.v-button--primary {
  color: #fff;
  background-color: var(--primary);
  border-color: var(--primary);
  &.v-button--text {
    color: var(--primary);
  }
}
.v-button--primary-outline {
  color: var(--primary);
  border-color: var(--primary);
}

/* success */
.v-button--success {
  color: #fff;
  background-color: var(--success);
  border-color: var(--success);
  &.v-button--text {
    color: var(--success);
  }
}
.v-button--success-outline {
  color: var(--success);
  border-color: var(--success);
}

/* error */
.v-button--error {
  color: #fff;
  background-color: var(--error);
  border-color: var(--error);
  &.v-button--text {
    color: var(--error);
  }
}
.v-button--error-outline {
  color: var(--error);
  border-color: var(--error);
}

/* warning */
.v-button--warning {
  color: #fff;
  background-color: var(--warning);
  border-color: var(--warning);
  &.v-button--text {
    color: var(--warning);
  }
}
.v-button--warning-outline {
  color: var(--warning);
  border-color: var(--warning);
}

/* icon button */
.v-button--icon {
  min-width: 38px;
  min-height: 31px;
  line-height: 0;
  &::before {
    display: none;
  }
  &:active {
    opacity: 0.6;
  }
}

.v-button--fill {
  background-color: #fff;
}

.v-button--block {
  display: block;
  width: 100%;
}

.v-button--radius {
  border-radius: 20px;
}

.v-button--text {
  border: none;
  background-color: transparent;
  &::before {
    display: none;
  }
  &:active {
    opacity: 0.6;
  }
}

.v-button--small {
  padding: 8px;
  font-size: 12px;
}

.v-button--large {
  padding: 8px 16px;
  font-size: 20px;
  line-height: 1.5;
  border-radius: 3px;
}

.v-button--loading {
  &:disabled {
    opacity: 1;
    cursor: default;
  }
  & .v-button__content {
    opacity: 0;
  }
}

.v-button__loading {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: inherit;
  border-radius: inherit;
}

.v-button + .v-button {
  margin-left: 5px;
}

.v-button--block + .v-button--block {
  margin-left: 0;
  margin-top: 14px;
}
</style>
