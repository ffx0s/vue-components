<template>
  <div>
    <Navbar title="Drawer">
      <VButton slot="right" small type="icon" @click="drawerShow('right')">
        <svg viewBox="0 0 1024 1024" style="width:25px;height:25px;">
          <path
            d="M800 320 224 320c-17.664 0-32-14.336-32-32s14.336-32 32-32l576 0c17.696 0 32 14.336 32 32S817.696 320 800 320z"
            fill="currentColor"
          />
          <path
            d="M800 544 224 544c-17.664 0-32-14.336-32-32s14.336-32 32-32l576 0c17.696 0 32 14.336 32 32S817.696 544 800 544z"
            fill="currentColor"
          />
          <path
            d="M800 768 224 768c-17.664 0-32-14.336-32-32s14.336-32 32-32l576 0c17.696 0 32 14.336 32 32S817.696 768 800 768z"
            fill="currentColor"
          />
        </svg>
      </VButton>
    </Navbar>
    <div class="app--spacing">
      <VButton @click="drawerShow('left')">左侧展开</VButton>
      <VButton @click="drawerShow('right')">右侧展开</VButton>
      <br />
      <div style="line-height: 30px;">
        <h4 class="text-center">沁园春·雪</h4>
        &#12288;&#12288;北方的风光，千里冰封冻，万里雪花飘。望长城内外，只剩下无边无际白茫茫一片；宽广的黄河上下，顿时失去了滔滔水势。山岭好像银白色的蟒蛇在飞舞，高原上的丘陵好像许多白象在奔跑，它们都想与老天爷比比高。要等到晴天的时候，看红艳艳的阳光和白皑皑的冰雪交相辉映，分外美好。
        <br />
        <br />
        &#12288;&#12288;江山如此媚娇，引得无数英雄竞相倾倒。只可惜秦始皇、汉武帝，略差文学才华；唐太宗、宋太祖，稍逊文治功劳。称雄一世的人物成吉思汗，只知道拉弓射大雕。这些人物全都过去了，称得上能建功立业的英雄人物，还要看今天的人们。
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page-drawer',
  methods: {
    drawerShow(direction) {
      this.$store.commit('page/drawerShow', { direction, show: true })
    }
  }
}
</script>
