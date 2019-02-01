<template>
  <div class="v-navbar-wrap">
    <div
      class="v-navbar v-bd-y-bottom"
      :class="{ 'v-navbar-fixed': fixed }"
      :style="{ backgroundColor: background, height: height + 'px' }"
    >
      <div class="v-navbar-left v-navbar-center">
        <slot name="left">
          <VButton
            small
            type="icon"
            class="v-navbar-back"
            :style="{ color: backIconColor }"
            @click="back"
          >
            <svg viewBox="0 0 1024 1024" class="v-navbar-back-icon">
              <path
                d="M312.4 488.624L668.8 152.976a29.36 29.36 0 0 1 42.352 0 31.408 31.408 0 0 1 0 43.552L376.24 512l334.912 315.36a31.408 31.408 0 0 1 0 43.552 29.36 29.36 0 0 1-42.352 0L312.4 535.264a36.32 36.32 0 0 1 0-46.64z"
                fill="currentColor"
              />
            </svg>
          </VButton>
        </slot>
      </div>
      <div class="v-navbar-middle v-navbar-center">
        <div class="v-navbar-title" :style="{ color: titleColor }">
          <slot>{{ title }}</slot>
        </div>
      </div>
      <div class="v-navbar-right v-navbar-center"><slot name="right" /></div>
    </div>
    <div
      class="v-navbar-span"
      v-if="fixed"
      :style="{ height: height + 'px' }"
    />
  </div>
</template>

<script>
import { properties } from '../../styles/variables'

export default {
  name: 'Navbar',
  props: {
    fixed: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: false
    },
    titleColor: {
      type: String,
      default: properties.textPrimary
    },
    backIconColor: {
      type: String,
      default: properties.primary
    },
    background: {
      type: String
    },
    height: {
      type: [String, Number],
      default: 46
    }
  },
  methods: {
    back() {
      history.back()
    }
  }
}
</script>

<style lang="postcss">
.v-navbar-wrap {
  position: relative;
}
.v-navbar {
  width: 100%;
  height: 46px;
  box-sizing: border-box;
  font-size: 17px;
  background-color: #fff;
  & .v-navbar-back-icon {
    width: 22px;
    height: 22px;
    vertical-align: middle;
  }
}
.v-navbar-fixed {
  position: fixed;
  top: 0;
  z-index: 99997;
}
.v-navbar-span {
  width: 100%;
  height: 46px;
}
.v-navbar-center {
  display: flex;
  align-items: center;
}
.v-navbar-left {
  position: absolute;
  top: 0;
  left: 15px;
  height: 100%;
  & .v-button {
    margin-left: -14px;
  }
}
.v-navbar-middle {
  margin-left: 80px;
  margin-right: 80px;
  font-weight: 500;
  height: 100%;
  justify-content: center;
}
.v-navbar-right {
  position: absolute;
  top: 0;
  right: 15px;
  height: 100%;
  justify-content: flex-end;
  & .v-button {
    margin-right: -14px;
  }
}
.v-navbar-title {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
