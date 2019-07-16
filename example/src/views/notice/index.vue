<template>
  <div>
    <Navbar title="Notice" />
    <Notice :title="title" @click.native="showDetail">
      <div slot="right" class="v-color-primary">详情</div>
    </Notice>
    <br />
    <Notice type="primary" :title="title" />
    <br />
    <Notice type="success" :showIcon="false" :title="title" />
    <br />
    <Notice
      type="error"
      :showIcon="false"
      :showCloseIcon="false"
      :title="title"
    />
  </div>
</template>

<script>
import Notice from 'muvc/notice'

export default {
  name: 'page-notice',
  components: {
    Notice
  },
  data() {
    return {
      title:
        '春节将至，各交易所均发布了休市安排，由于国内休市，但国际方面交易照常，请投资者注意风险。各个市场休市安排如下:'
    }
  },
  methods: {
    showDetail() {
      this.$modal({
        body: this.title + '...',
        confirmText: '我已了解'
      })
    }
  }
}
</script>
