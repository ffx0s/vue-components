<template>
  <div>
    <h4 class="text-center">Swpie 横向</h4>
    <Swipe v-model="index" class="demo-swipe" @change="change">
      <SwipeItem v-for="(img, index) in imgs" :key="index">
        <img class="img" :src="img" />
      </SwipeItem>
    </Swipe>
    <h4 class="text-center">Swpie 垂直</h4>
    <Swipe v-model="index2" class="demo-swipe" @change="change" vertical>
      <SwipeItem v-for="img in imgs" :key="img">
        <img class="img" :src="img" />
      </SwipeItem>
    </Swipe>
  </div>
</template>

<script>
import Swipe from '../../components/swipe/swipe'
import SwipeItem from '../../components/swipe/item'

export default {
  components: {
    Swipe,
    SwipeItem
  },
  data() {
    return {
      index: 0,
      index2: 0,
      imgs: [
        require('../../assets/timg1.jpeg'),
        require('../../assets/timg2.jpeg'),
        require('../../assets/timg3.jpeg'),
        require('../../assets/timg4.jpeg'),
        require('../../assets/timg5.jpeg')
      ]
    }
  },
  methods: {
    change(index) {
      console.log(index)
    }
  }
}
</script>

<style lang="postcss">
.demo-swipe {
  margin: 0 auto;
  width: 100%;
  height: 200px;
  background: #efefef;
  & .img {
    max-width: 100%;
  }
}
</style>
