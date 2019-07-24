<template>
  <component v-if="!loading" :is="tag" class="v-c3">
    <div class="v-c3__head">
      <div class="v-c3__head-image">
        <img v-if="item.image" :src="item.image" />
      </div>
      <p class="v-c3__head-name">{{ item.name }}</p>
    </div>
    <p class="v-c3__head-type">{{ item.date }}</p>
    <div class="v-c3__head-content">
      {{ item.content }}
    </div>
  </component>
  <component v-else :is="tag" class="v-c3 v-skeleton--animate">
    <div class="v-c3__head">
      <div class="v-c3__head-image v-skeleton"></div>
      <p class="v-c3__head-name v-skeleton"></p>
    </div>
    <p class="v-c3__head-type v-skeleton"></p>
    <div class="v-c3__head-content v-skeleton"></div>
  </component>
</template>

<script>
export default {
  name: 'v-card-c3',
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
          name: '',
          date: '',
          content: ''
        }
      }
    }
  }
}
</script>

<style lang="postcss">
.v-c3 {
  padding: 10px;
  background-color: #fff;
}
.v-c3__head {
  display: flex;
  align-items: center;
}
.v-c3__head-image {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: var(--background);
  & img {
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }
}
.v-c3__head-name {
  margin: 0 0 0 10px;
  min-width: 100px;
  min-height: 20px;
  font-size: 14px;
  font-weight: 450;
}
.v-c3__head-type {
  margin: 10px 0 0;
  min-height: 14px;
  font-size: 12px;
  color: var(--textRegular);
}
.v-c3__head-content {
  margin-top: 10px;
  font-size: 14px;
  min-height: 50px;
}
</style>
