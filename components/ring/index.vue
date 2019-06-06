<template>
  <div class="v-ring" :style="style">
    <svg :viewBox="viewBox">
      <circle
        :fill="backgroundColor"
        stroke-linecap="round"
        :stroke="outerColor"
        :stroke-width="strokeWidth"
        :cx="offset"
        :cy="offset"
        :r="radius"
      />
      <circle
        class="v-ring-inner"
        fill="none"
        :stroke-dashoffset="linecap === 'round' ? '1px' : 0"
        :stroke="color"
        :stroke-width="innerWidth"
        :stroke-linecap="linecap"
        :stroke-dasharray="dasharray"
        :cx="offset"
        :cy="offset"
        :r="radius"
        :style="innerStyle"
      />
    </svg>
    <slot name="progress">
      <div
        class="v-ring-progress"
        :style="{
          color: textColor,
          fontSize: fontSize
        }"
      >
        {{ value }}%
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'Ring',
  props: {
    value: {
      type: Number,
      default: 0
    },
    color: {
      type: String,
      default: 'currentColor'
    },
    outerColor: {
      type: String,
      default: '#ffffff'
    },
    backgroundColor: {
      type: String,
      default: 'none'
    },
    size: {
      type: Number,
      default: 100
    },
    linecap: {
      type: String,
      default: 'round'
    },
    strokeWidth: {
      type: Number,
      default: 5
    },
    innerStrokeWidth: {
      type: Number,
      default: 5
    },
    radius: {
      type: Number,
      default: 50
    },
    textColor: {
      type: String,
      default: 'inherit'
    }
  },
  computed: {
    innerStyle() {
      return {
        transformOrigin: `${this.offset}px ${this.offset}px`
      }
    },
    style() {
      return { width: this.size + 'px', height: this.size + 'px' }
    },
    offset() {
      return this.radius * 2 + this.innerStrokeWidth
    },
    viewBox() {
      return `${this.offset / 2},${this.offset / 2},${this.offset},${
        this.offset
      }`
    },
    dasharray() {
      const circleLength = Math.floor(2 * Math.PI * this.radius)
      return `${(circleLength * this.value) / 100},10000`
    },
    innerWidth() {
      return typeof this.innerStrokeWidth === 'number'
        ? this.innerStrokeWidth
        : this.strokeWidth - 1
    },
    fontSize() {
      return Math.max(Math.floor(this.size / 6), 10) + 'px'
    }
  }
}
</script>

<style lang="postcss">
.v-ring {
  position: relative;
  color: var(--primary);
}
.v-ring-inner {
  transform: rotate(-90deg);
  transition: 0.3s stroke-dasharray;
}
.v-ring-progress {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 12px;
}
</style>
