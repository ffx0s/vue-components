<template>
  <li class="v-timeline__item">
    <div class="v-timeline__item-border">
      <span
        class="v-timeline__item-circle"
        :class="'v-timeline__item-circle_' + size"
      />
    </div>
    <slot />
  </li>
</template>

<script>
export default {
  name: 'TimeLineItem',
  props: {
    size: {
      type: String,
      default: 'large'
    }
  }
}
</script>

<style lang="postcss">
.v-timeline__item {
  position: relative;
  padding-left: 30px;
  padding-bottom: 30px;
  &:last-child .v-timeline__item-border {
    background-color: transparent;
  }
}
.v-timeline__item-border {
  position: absolute;
  left: 6px;
  top: 5px;
  background-color: var(--border);
  width: 2px;
  height: 100%;
}
.v-timeline__item-circle {
  position: absolute;
  content: '';
  border-radius: 50%;
  background-color: var(--border);
}
.v-timeline__item-circle_large {
  left: -5px;
  width: 12px;
  height: 12px;
}
.v-timeline__item-circle_small {
  left: -3px;
  width: 8px;
  height: 8px;
}
</style>
