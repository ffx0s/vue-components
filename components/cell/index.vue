<template>
  <div
    class="v-cell"
    :class="{
      'v-cell--clickable': isLink || clickable
    }"
    @click="click"
  >
    <div class="v-cell__icon" v-if="$slots.icon"><slot name="icon" /></div>
    <div class="v-cell__content v-bd-bottom" :class="['v-cell--' + alignItems]">
      <div
        v-if="title || $slots.title"
        class="v-cell__left"
        :style="[
          labelWidth && { width: labelWidth + 'px' },
          { 'text-align': labelAlign }
        ]"
      >
        <div class="v-cell__title" :class="{ 'v-cell--required': required }">
          <slot name="title">{{ title }}</slot>
        </div>
      </div>
      <div class="v-cell__right" :class="['v-cell--' + valueAlign]">
        <slot>{{ value }}</slot>
        <slot name="arrow"> <i v-if="isLink" class="v-cell__arrow"></i> </slot>
      </div>
    </div>
    <slot name="bottom" />
  </div>
</template>

<script>
import { getVMParent } from '../utils/shared'

export default {
  name: 'Cell',
  props: {
    title: {
      type: [String, Number],
      required: false
    },
    isLink: {
      type: Boolean,
      default: false
    },
    link: {
      type: String,
      required: false
    },
    to: {
      type: [String, Object],
      required: false
    },
    value: {
      type: [String, Number],
      required: false
    },
    clickable: {
      type: Boolean,
      default: false
    },
    alignItems: {
      type: String,
      default: 'center'
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    labelWidth() {
      return this.parent.labelWidth
    },
    labelAlign() {
      return this.parent.labelAlign
    },
    valueAlign() {
      return this.parent.valueAlign
    }
  },
  data() {
    return {
      parent: getVMParent(this, 'Group') || {}
    }
  },
  methods: {
    click() {
      if (this.to && this.$router) {
        this.$router.push(this.to)
      } else if (this.link) {
        location.href = this.link
      } else {
        this.$emit('click')
      }
    }
  }
}
</script>

<style lang="postcss">
.v-cell {
  position: relative;
  padding-left: 14px;
  font-size: 16px;
  word-break: break-all;
  display: flex;
}
.v-cell__left {
  min-width: 65px;
  color: var(--textPrimary);
}
.v-cell__content {
  padding: 11px 0;
  flex: 1;
  display: flex;
  justify-content: space-between;
  min-height: 46px;
  box-sizing: border-box;
}
.v-cell__right {
  display: flex;
  flex: 1;
  margin-right: 14px;
  color: var(--textRegular);
  align-items: center;
  & input[type='text'],
  & input[type='password'],
  & input[type='number'],
  & input[type='tel'],
  & select {
    appearance: none;
    border: none;
    padding: 0;
    width: 100%;
    font-size: 16px;
    height: 24px;
    line-height: 21px;
    background-color: transparent;
    &:disabled {
      background-color: transparent;
    }
    &::placeholder {
      color: var(--textRegular);
    }
  }
  & textarea {
    height: 24px;
    line-height: 24px;
    resize: none;
    vertical-align: middle;
    &::placeholder {
      color: var(--textRegular);
    }
  }
}
.v-cell__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 14px;
  min-width: 25px;
  font-size: 22px;
}
.v-cell__arrow {
  margin-left: 6px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024'%3E%3Cpath d='M321.5 990.025L225.828 905.4l393.325-392.192-388.205-389.34L319.78 34.67l478.683 478.427-476.965 476.928z' fill='%23c7c7c8'/%3E%3C/svg%3E");
  background-position: 2px center;
  background-repeat: no-repeat;
  width: 15px;
  height: 15px;
  display: block;
}
.v-cell--clickable {
  user-select: none;
  transition: background 200ms;
  &:active {
    background-color: var(--border);
  }
}
.v-cell--center {
  align-items: center;
}
.v-cell--start {
  align-items: flex-start;
}
.v-cell--end {
  align-items: flex-end;
}
.v-cell--left {
  margin-left: 20px;
  justify-content: flex-start;
}
.v-cell--right {
  text-align: right;
  justify-content: flex-end;
}
.v-cell--required {
  margin-left: -6px;
  &::before {
    content: '*';
    font-size: 14px;
    font-family: sans-serif;
    color: var(--error);
  }
}
</style>
