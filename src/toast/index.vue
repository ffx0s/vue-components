<template>
  <Delay
    :class="{ 'v-toast--overlay': overlay }"
    :delay="delay"
    :duration="duration"
    transitionName="v-toast"
    v-model="value"
    @show="show"
  >
    <div
      class="v-toast"
      :class="{ 'v-toast--large': type !== 'text' && title }"
      :style="{ top: top, left: left }"
    >
      <div class="v-toast__icon" v-if="type !== 'text'">
        <slot name="icon">
          <Loading v-if="type === 'loading'" size="40" />
          <i v-else class="v-toast__icon-image" :class="'v-toast--' + type" />
        </slot>
      </div>
      <div class="v-toast__title">
        <slot>{{ title }}</slot>
      </div>
    </div>
  </Delay>
</template>

<script>
import Delay from '../delay'
import Loading from '../loading'

export default {
  name: 'Toast',
  components: {
    Delay,
    Loading
  },
  props: {
    title: String,
    value: {
      type: Boolean,
      required: true
    },
    delay: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 1500
    },
    top: {
      type: String,
      default: '40%'
    },
    left: {
      type: String,
      default: '50%'
    },
    type: {
      type: String,
      default: 'text'
    },
    overlay: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    show() {
      if (this.duration > 0) {
        this.hide()
      }
    },
    hide() {
      this.$emit('input', false)
    }
  }
}
</script>

<style lang="postcss">
.v-toast {
  position: fixed;
  padding: 12px;
  transform: translate3d(-50%, -50%, 0);
  color: #fff;
  font-size: 16px;
  border-radius: 4px;
  background-color: rgb(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100000;
  transition: opacity 300ms;
}
.v-toast--large {
  min-width: 94px;
  min-height: 94px;
  & .v-toast__title {
    padding-top: 8px;
  }
}
.v-toast__icon {
  width: 40px;
  height: 40px;
  color: #fff;
  align-items: center;
  justify-content: center;
  display: flex;
}
.v-toast__icon-image {
  display: block;
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
}
.v-toast--success {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 1025 1024' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M511.68 1023.16c-68.66 0-135.4-13.565-198.37-40.317-60.752-25.81-115.374-62.713-162.346-109.686-46.972-46.972-83.876-101.593-109.686-162.346C14.527 647.84.962 581.1.962 512.442s13.565-135.4 40.316-198.37c25.81-60.752 62.714-115.373 109.686-162.346 46.972-46.971 101.594-83.875 162.346-109.685C376.28 15.29 443.02 1.725 511.68 1.725S647.078 15.29 710.048 42.041c60.752 25.81 115.375 62.714 162.346 109.685 46.973 46.973 83.877 101.594 109.687 162.347 26.752 62.97 40.317 129.71 40.317 198.37S1008.833 647.84 982.08 710.81c-25.81 60.753-62.713 115.374-109.686 162.346-46.971 46.973-101.594 83.877-162.346 109.686-62.97 26.752-129.712 40.316-198.37 40.316zm0-972.288c-62.02 0-122.294 12.247-179.153 36.403-54.923 23.333-104.317 56.71-146.81 99.204s-75.872 91.889-99.205 146.811C62.357 390.148 50.11 450.424 50.11 512.442c0 62.018 12.248 122.293 36.403 179.153 23.333 54.923 56.71 104.317 99.204 146.811 42.494 42.494 91.889 75.871 146.811 99.205 56.859 24.155 117.134 36.403 179.153 36.403 62.017 0 122.293-12.248 179.153-36.403 54.923-23.334 104.317-56.711 146.81-99.205 42.495-42.494 75.873-91.888 99.206-146.811 24.155-56.859 36.403-117.134 36.403-179.153s-12.248-122.294-36.404-179.152c-23.333-54.923-56.711-104.318-99.204-146.81-42.495-42.494-91.889-75.872-146.812-99.205-56.86-24.156-117.135-36.403-179.152-36.403z' fill='%23fff'/%3E%3Cpath d='M451.78 689.849a25.513 25.513 0 0 1-17.365-6.795l-181.22-167.396c-10.384-9.592-11.027-25.787-1.434-36.171 9.593-10.387 25.787-11.027 36.172-1.435L451.08 628.756 740.833 339c9.997-9.996 26.204-9.996 36.2 0 9.996 9.996 9.996 26.204 0 36.2l-307.15 307.151a25.532 25.532 0 0 1-18.103 7.497z' fill='%23fff'/%3E%3C/svg%3E");
}
.v-toast--error {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 1025 1024' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M982.669 313.75c-25.81-60.753-62.714-115.374-109.686-162.347C826.01 104.43 771.39 67.527 710.637 41.717c-62.97-26.75-129.711-40.315-198.369-40.315s-135.4 13.564-198.37 40.315c-60.752 25.81-115.373 62.714-162.346 109.686-46.971 46.973-83.875 101.594-109.685 162.346C15.116 376.72 1.55 443.46 1.55 512.12s13.565 135.398 40.316 198.368c25.81 60.754 62.714 115.375 109.685 162.347 46.972 46.972 101.593 83.876 162.347 109.685 62.97 26.752 129.71 40.317 198.37 40.317s135.398-13.565 198.368-40.317c60.753-25.809 115.374-62.713 162.346-109.685 46.973-46.972 83.877-101.593 109.686-162.347 26.752-62.97 40.316-129.71 40.316-198.368s-13.565-135.4-40.316-198.37zM937.436 691.27c-23.334 54.923-56.711 104.318-99.205 146.812-42.494 42.493-91.888 75.87-146.811 99.204-56.859 24.156-117.134 36.403-179.153 36.403-62.019 0-122.294-12.247-179.152-36.403-54.923-23.333-104.318-56.71-146.81-99.204-42.494-42.494-75.872-91.889-99.205-146.812-24.156-56.858-36.402-117.134-36.402-179.152 0-62.019 12.247-122.294 36.403-179.153 23.333-54.923 56.71-104.317 99.204-146.81s91.889-75.871 146.811-99.205c56.858-24.155 117.133-36.403 179.152-36.403 62.018 0 122.293 12.248 179.153 36.403 54.923 23.334 104.317 56.71 146.81 99.205 42.495 42.493 75.871 91.888 99.206 146.81 24.155 56.859 36.403 117.135 36.403 179.153S961.59 634.413 937.436 691.27z' fill='%23fff'/%3E%3Cpath d='M704.625 319.77c-9.998-9.997-26.204-9.997-36.2 0L512.383 475.81 356.342 319.77c-9.996-9.997-26.205-9.997-36.2 0-9.996 9.996-9.996 26.203 0 36.2l156.041 156.04-156.04 156.042c-9.997 9.998-9.997 26.205 0 36.2 4.997 4.998 11.549 7.497 18.1 7.497s13.101-2.499 18.1-7.497L512.384 548.21l156.04 156.04c4.999 5 11.548 7.498 18.1 7.498s13.102-2.499 18.1-7.497c9.997-9.996 9.997-26.203 0-36.2l-156.04-156.04 156.04-156.042c9.997-9.996 9.997-26.204 0-36.2z' fill='%23fff'/%3E%3C/svg%3E");
}

.v-toast--overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  width: 100%;
  height: 100%;
  display: table;
  background-color: transparent;
}

.v-toast-enter-active,
.v-toast-leave-active {
  transition-duration: 300ms;
}
.v-toast-enter .v-toast,
.v-toast-leave-to .v-toast {
  opacity: 0;
}
</style>
