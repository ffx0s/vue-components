<template>
  <Popup v-model="show" :lazy="lazy" :overlayClick="overlayClick">
    <div class="v-actionsheet">
      <slot name="header">
        <header
          v-if="title || describe"
          class="v-actionsheet__header v-bd-bottom"
        >
          <h4 class="v-actionsheet__title">{{ title }}</h4>
          <p class="v-actionsheet__describe">{{ describe }}</p>
        </header>
      </slot>
      <slot>
        <ul class="v-actionsheet__items">
          <li
            class="v-actionsheet__item v-bd-top"
            v-for="(action, index) in actions"
            :key="index"
            :class="[
              'v-actionsheet--' + align,
              'v-actionsheet--' + (action.type || 'default'),
              { 'v-actionsheet--disabled': action.loading },
              action.className
            ]"
            @click="clickHandler(action)"
          >
            <Loading size="22" v-if="action.loading" />
            <span v-else>{{ action.name }}</span>
          </li>
          <li
            class="v-actionsheet__item v-actionsheet--center v-actionsheet__cancel"
            v-if="cancelText"
            @click="cancel"
          >
            取消
          </li>
        </ul>
      </slot>
    </div>
  </Popup>
</template>

<script>
import Popup from '../popup'
import Loading from '../loading'

export default {
  name: 'Actionsheet',
  components: {
    Popup,
    Loading
  },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    describe: {
      type: String,
      default: ''
    },
    actions: {
      type: Array,
      default: () => []
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    overlayClick: {
      type: Boolean,
      default: true
    },
    lazy: {
      type: Boolean,
      default: true
    },
    align: {
      type: String,
      default: 'center'
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
    clickHandler(action) {
      if (action.type === 'disabled' || action.loading) return
      this.$emit('click', action)
    },
    cancel() {
      this.$emit('input', false)
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="postcss">
.v-actionsheet {
  background-color: var(--background);
  color: var(--textPrimary);
}

.v-actionsheet__header {
  padding: 12px;
  background-color: white;
  text-align: center;
}
.v-actionsheet__title {
  font-size: 17px;
  margin: 0;
  padding: 0;
  font-weight: 400;
}
.v-actionsheet__describe {
  margin: 4px 0 0;
  color: var(--textRegular);
  font-size: 14px;
}

.v-actionsheet__items {
  margin: 0;
  padding: 0;
  list-style: none;
}

.v-actionsheet__item {
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  height: 48px;
  font-size: 16px;
  background-color: #fff;
  &:first-child.v-bd-top:before {
    display: none;
  }
  &:active {
    background-color: var(--border);
  }
}

.v-actionsheet--default {
  color: var(--textPrimary);
}

.v-actionsheet--primary {
  color: var(--primary);
}

.v-actionsheet--warning {
  color: var(--error);
}

.v-actionsheet--disabled {
  color: var(--textSecondary);
  &:active {
    background-color: #fff;
  }
}

.v-actionsheet--center {
  justify-content: center;
}

.v-actionsheet--left {
  justify-content: left;
}

.v-actionsheet__cancel {
  margin-top: 10px;
}
</style>
