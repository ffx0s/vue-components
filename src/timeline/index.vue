<template>
  <ul class="v-timeline">
    <Item class="v-timeline__title" v-if="title">
      <span class="v-timeline__text">{{ title }}</span>
    </Item>
    <slot />
  </ul>
</template>

<script>
import Item from './item'

export default {
  name: 'TimeLine',
  components: {
    Item
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="postcss">
.v-timeline .v-timeline__title {
  padding-left: 0;
  padding-bottom: 20px;
  & .v-timeline__item-circle {
    display: none;
  }
}
.v-timeline__text {
  position: relative;
  z-index: 2;
  padding: 2px 5px;
  font-size: 13px;
  border-radius: 5px;
  color: #fff;
  background-color: var(--primary);
}
.v-timeline {
  padding: 0;
  margin: 0;
  list-style: none;
}
</style>
