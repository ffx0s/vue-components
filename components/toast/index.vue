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
      :class="{ 'v-toast--width': type !== 'text' }"
      :style="{ top: top, left: left }"
    >
      <div class="v-toast__icon" v-if="type !== 'text'">
        <slot name="icon">
          <Loading v-if="type === 'loading'" />
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
    value: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: false
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
  position: absolute;
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
.v-toast--width {
  width: 94px;
  height: 94px;
}
.v-toast__icon {
  width: 45px;
  height: 45px;
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
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024'%3E%3Cpath d='M508.249 953.897c-60.083 0-118.382-11.772-173.276-34.992-53.01-22.42-100.612-54.513-141.484-95.385-40.873-40.873-72.965-88.475-95.387-141.485-23.218-54.895-34.99-113.193-34.99-173.276s11.773-118.381 34.99-173.275c22.422-53.01 54.514-100.613 95.387-141.485 40.872-40.872 88.475-72.964 141.484-95.386 54.895-23.219 113.194-34.991 173.276-34.991 60.082 0 118.38 11.773 173.275 34.99 53.01 22.423 100.611 54.515 141.484 95.387 40.872 40.872 72.965 88.475 95.386 141.485 23.219 54.895 34.992 113.194 34.992 173.275s-11.773 118.381-34.992 173.276c-22.42 53.01-54.514 100.612-95.386 141.485-40.873 40.872-88.475 72.965-141.484 95.385-54.895 23.22-113.193 34.992-173.275 34.992zm0-839.844c-217.642 0-394.707 177.064-394.707 394.706 0 217.643 177.065 394.707 394.707 394.707s394.705-177.064 394.705-394.707c.001-217.642-177.064-394.706-394.705-394.706z' fill='%23ffffff'/%3E%3Cpath d='M448.494 738.907a25.485 25.485 0 0 1-16.625-6.148l-180.932-154.87c-10.733-9.188-11.987-25.336-2.8-36.07 9.189-10.732 25.337-11.988 36.072-2.799l161.572 138.298 272.515-315.904c9.229-10.7 25.385-11.89 36.082-2.66 10.698 9.229 11.889 25.383 2.66 36.082L467.877 730.035c-5.058 5.863-12.2 8.872-19.382 8.872z' fill='%23ffffff'/%3E%3C/svg%3E");
}
.v-toast--error {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024'%3E%3Cpath d='M512.162 956.235c-245.843 0-445.104-199.335-445.104-445.12 0-245.902 199.261-445.106 445.104-445.106 245.844 0 445.107 199.204 445.107 445.106 0 245.785-199.263 445.12-445.107 445.12zm0-826.64c-210.362 0-381.505 171.142-381.505 381.52 0 210.392 171.143 381.52 381.505 381.52 210.394 0 381.506-171.128 381.506-381.52 0-210.378-171.112-381.52-381.506-381.52zm-.201 233.118c-16.756 0-30.554-5.03-41.598-15.22-10.929-10.13-16.377-22.653-16.377-37.566 0-15.35 5.391-27.756 16.262-37.438 10.87-9.566 24.841-14.421 41.714-14.421 17.42 0 31.567 4.97 42.264 14.769 10.782 9.841 16.116 22.19 16.116 37.09 0 15.073-5.45 27.683-16.379 37.683-10.987 10.073-24.958 15.103-42.002 15.103zm49.45 401.45h-99.976V420.773h99.977v343.388z' fill='%23ffffff'/%3E%3C/svg%3E");
}

.v-toast__icon + .v-toast__title {
  padding-top: 8px;
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
