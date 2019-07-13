<template>
  <div>
    <h4 class="text-center">Swpie 横向</h4>
    <Swipe v-model="index" class="swipe" preload :vertical="vertical">
      <SwipeItem v-for="(img, index) in imgs" :key="index" lazy>
        <img class="img" :src="img" />
      </SwipeItem>
    </Swipe>
    <h4 class="text-center">Swpie 垂直</h4>
    <Swipe v-model="index2" class="swipe" vertical optimization preload>
      <SwipeItem v-for="img in imgs" :key="img" lazy>
        <img class="img" :src="img" />
      </SwipeItem>
    </Swipe>
  </div>
</template>

<script>
import Swipe from 'vue-components/swipe/swipe'
import SwipeItem from 'vue-components/swipe/item'

export default {
  components: {
    Swipe,
    SwipeItem
  },
  data() {
    return {
      vertical: false,
      index: 0,
      index2: 0,
      imgs: [
        'https://static.webfed.cn/o_1d9u7gc8cedal1q1nhuc8g243d.jpg?imageView2/0/w/700',
        'https://static.webfed.cn/o_1d9u7gc8c8ip1u35n111i46ehce.jpg?imageView2/0/w/700',
        'https://static.webfed.cn/o_1d9u7gc8cnpnke014pnu1g25ch.jpg?imageView2/0/w/700',
        'https://static.webfed.cn/o_1d9u7gc8ceef1kip1f6kg0jb67g.jpg?imageView2/0/w/700'
      ]
    }
  }
}
</script>

<style lang="postcss">
.swipe {
  margin: 0 auto;
  width: 100%;
  height: 200px;
  background: #fff;
  & .img {
    max-width: 100%;
  }
}
</style>
