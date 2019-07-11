<template>
  <div class="scroll-view">
    <Navbar title="ScrollView" />
    <div class="app--spacing">
      <h4 class="text-center">ScrollView X</h4>
      <ScrollView class="scroll-view__x" ref="x">
        <div class="scroll-view__item" v-for="i in items" :key="i">{{ i }}</div>
      </ScrollView>
      <br />
      <div class="text-center">
        <VButton outline @click="scroll">滚100像素</VButton>
        <VButton type="primary" @click="scrollTo">滚到300像素</VButton>
      </div>
      <h4 class="text-center">ScrollView Y</h4>
      <ScrollView class="scroll-view__y" vertical ref="y">
        <div class="scroll-view__item" v-for="i in items" :key="i">{{ i }}</div>
      </ScrollView>
    </div>
  </div>
</template>

<script>
import ScrollView from 'vue-components/scrollView'

export default {
  name: 'page-scroll-view',
  components: {
    ScrollView
  },
  data() {
    return {
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  },
  methods: {
    scrollTo() {
      this.$refs.x.scrollTo(300)
      this.$refs.y.scrollTo(300)
    },
    scroll() {
      this.$refs.x.scroll(100)
      this.$refs.y.scroll(100)
    }
  }
}
</script>

<style lang="postcss">
.scroll-view {
  background-color: #fff;
}
.scroll-view__x {
  margin: 0 auto;
  max-width: 500px;
  width: 90%;
  height: 100px;
  & .scroll-view__item {
    margin-right: 10px;
    float: left;
  }
}
.scroll-view__y {
  margin: 0 auto;
  width: 100px;
  height: 300px;
  & .scroll-view__item {
    margin-bottom: 10px;
  }
}
.scroll-view__item {
  width: 100px;
  height: 100px;
  line-height: 100px;
  background: #eaeaea;
  text-align: center;
  &:last-child {
    margin-right: 0;
    margin-bottom: 0;
  }
}
</style>
