<template>
  <component v-if="!loading" :is="tag" class="v-c2">
    <div class="v-c2__image">
      <img v-if="item.image" :src="item.image" />
    </div>
    <div class="v-c2__detail">
      <div class="v-c2__title">{{ item.title }}</div>
      <div class="v-c2__description">
        {{ item.description }}
      </div>
    </div>
  </component>
  <component v-else :is="tag" class="v-c2 v-skeleton--animate">
    <div class="v-c2__image v-skeleton"></div>
    <div class="v-c2__detail">
      <div class="v-c2__title v-skeleton"></div>
      <div class="v-c2__description v-skeleton"></div>
    </div>
  </component>
</template>

<script>
export default {
  name: 'v-card-c2',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    loading: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default: function() {
        return {
          image: '',
          title: '',
          description: ''
        }
      }
    }
  }
}
</script>

<style lang="postcss">
.v-c2 {
  display: flex;
  padding: 10px;
  background-color: #fff;
}
.v-c2__image {
  width: 100px;
  height: 100px;
  background-color: var(--background);
  border-radius: 5px;
  & img {
    max-width: 100%;
    border-radius: inherit;
  }
}
.v-c2__detail {
  margin-left: 10px;
  flex: 1;
}
.v-c2__title {
  display: flex;
  align-items: center;
  font-size: 16px;
  min-height: 26px;
  font-weight: 450;
}
.v-c2__description {
  margin-top: 5px;
  height: 62px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  font-size: 14px;
}
</style>
