<template>
  <div class="v-c1">
    <div class="v-c1__image" :class="loadingClass">
      <img v-if="item.image" :src="item.image" />
    </div>
    <div class="v-c1__detail">
      <div class="v-c1__title" :class="loadingClass">{{ item.title }}</div>
      <div class="v-c1__description" :class="loadingClass">
        {{ item.description }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-card-c1',
  props: {
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
  },
  computed: {
    loadingClass() {
      return this.loading ? 'v-skeleton' : ''
    }
  }
}
</script>

<style lang="postcss">
.v-c1 {
  width: 100%;
  background-color: #fff;
}
.v-c1__image {
  width: 100%;
  height: 130px;
  overflow: hidden;
  & img {
    max-width: 100%;
  }
}
.v-c1__detail {
  padding: 10px 15px;
}
.v-c1__title {
  display: flex;
  align-items: center;
  font-size: 16px;
  min-height: 26px;
  font-weight: 450;
}
.v-c1__description {
  margin-top: 5px;
  min-height: 80px;
  font-size: 14px;
}
</style>
