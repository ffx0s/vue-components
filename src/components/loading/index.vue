<template>
  <div class="v-loading" :style="style">
    <svg class="v-loading-svg" :viewBox="viewBox">
      <circle
        class="v-loading-circle"
        :stroke="color"
        :stroke-width="strokeWidth"
        :cx="offset"
        :cy="offset"
        :r="radius"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    color: {
      type: String,
      default: 'currentColor'
    },
    size: {
      type: [String, Number],
      default: 40
    },
    strokeWidth: {
      type: [String, Number],
      default: 3
    },
    radius: {
      type: [String, Number],
      default: 20
    }
  },
  computed: {
    style() {
      return { width: this.size + 'px', height: this.size + 'px' }
    },
    offset() {
      return +this.radius * 2 + +this.strokeWidth
    },
    viewBox() {
      return `${this.offset / 2},${this.offset / 2},${this.offset},${
        this.offset
      }`
    }
  }
}
</script>

<style lang="postcss">
.v-loading {
  position: relative;
  margin: 0 auto;
  z-index: 0;
}
.v-loading-svg {
  width: 100%;
  height: 100%;
  animation: v-loading-rotate 1.4s linear infinite;
}
.v-loading-circle {
  stroke-dasharray: 80 200;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  fill: none;
  animation: v-loading-transform 1.5s ease-in-out infinite;
}

@keyframes v-loading-rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes v-loading-transform {
  0% {
    stroke-dasharray: 1 200;
    stroke-dashoffset: 0;
  }
  65% {
    stroke-dasharray: 100 200;
    stroke-dashoffset: -15px;
  }
  100% {
    stroke-dasharray: 100 200;
    stroke-dashoffset: -125px;
  }
}
</style>
