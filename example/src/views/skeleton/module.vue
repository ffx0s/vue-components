<template>
  <div class="page-spacing">
    <Card1 v-once loading v-if="loading" />
    <Card1 :item="item" v-else />
    <br />
    <Card2 v-once loading v-if="loading" />
    <Card2 :item="item2" v-else />
    <br />
    <Card3 v-once loading v-if="loading" />
    <Card3 :item="item3" v-else />
    <br />
    <Card4 v-once loading v-if="loading" />
    <Card4 :item="item4" v-else>
      <template slot="btns">
        <VButton small outline>查看物流</VButton>
        <VButton small outline>延长收货</VButton>
        <VButton small outline type="warning">确认收货</VButton>
      </template>
    </Card4>
  </div>
</template>

<script>
import Card1 from 'vue-components/card/c1'
import Card2 from 'vue-components/card/c2'
import Card3 from 'vue-components/card/c3'
import Card4 from 'vue-components/card/c4'

export default {
  components: {
    Card1,
    Card2,
    Card3,
    Card4
  },
  props: {
    value: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    loading: {
      get: function() {
        return this.value
      },
      set: function(value) {
        this.$emit('input', value)
      }
    }
  },
  data() {
    return {
      item: {
        image:
          'https://static.webfed.cn/o_1dcbbpm8510miv7h1b0i1qvn1tln9.jpeg?imageView2/0/w/700',
        title: '江苏省',
        description:
          '江苏省，简称苏，是中华人民共和国省级行政区，位于华东地区，省会南京市。“江苏”之名可追溯至清初设置的江苏布政使司，是当时江宁府和苏州府两府首字之合称。'
      },
      item2: {
        image:
          'http://static.webfed.cn/Fv3hleoT5ts5kNSrqWpXTV6mrztB?imageView2/0/w/300',
        title: '江苏省',
        description:
          '江苏省，简称苏，是中华人民共和国省级行政区，位于华东地区，省会南京市。“江苏”之名可追溯至清初设置的江苏布政使司，是当时江宁府和苏州府两府首字之合称。'
      },
      item3: {
        image:
          'https://static.webfed.cn/o_1d9uckkvb1e8m1dd71ir2e95krh.jpg?imageView2/0/w/300',
        name: '在沙漠里打滚',
        date: '2018-08-18',
        content: '卖家超级好，有问题反馈了，很快就给解决，东西好评，还会再来。'
      },
      item4: {
        image:
          'https://static.webfed.cn/o_1dcbc380up531sgu178aebf62ph.jpg?imageView2/0/w/300',
        title: '安岳黄柠檬新鲜12个当季水果一二级小果皮薄多汁包邮非青香水柠檬',
        price: 23,
        number: 1,
        status: '卖家已发货',
        shopname: '润宁生鲜旗舰店'
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 2000)
  }
}
</script>
